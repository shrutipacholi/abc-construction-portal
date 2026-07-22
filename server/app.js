import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import {
  assignProject,
  createStarterPortalRows,
  createUser,
  findUserByEmail,
  findUserById,
  getAdminDashboardStats,
  getDocumentForUser,
  getPortalForUser,
  listAdminInquiries,
  listAdminPayments,
  listAllProjects,
  listClients,
  publicUser,
  saveUploadedDocument,
} from './db/repository.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'abc-construction-dev-secret';
const uploadDir = process.env.VERCEL
  ? path.join('/tmp', 'abc-uploads')
  : path.join(__dirname, 'uploads');

fs.mkdirSync(uploadDir, { recursive: true });

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
});

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

async function adminMiddleware(req, res, next) {
  try {
    const user = await findUserById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    req.admin = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role || 'client' },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
}

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(uploadDir));

  app.get('/api/health', async (_req, res) => {
    try {
      await findUserByEmail('client@test.com');
      res.json({ ok: true, db: 'mysql' });
    } catch (err) {
      res.status(500).json({ ok: false, db: 'mysql', message: err.message });
    }
  });

  app.post('/api/auth/signup', async (req, res) => {
    try {
      const { name, email, phone, password, company } = req.body;
      if (!name?.trim() || !email?.trim() || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
      }
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
      }

      const normalized = email.trim().toLowerCase();
      if (await findUserByEmail(normalized)) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }

      const user = await createUser({
        name: name.trim(),
        email: normalized,
        phone: phone?.trim() || '',
        company: company?.trim() || '',
        passwordHash: await bcrypt.hash(password, 10),
        role: 'client',
      });
      await createStarterPortalRows(user);

      res.status(201).json({ token: signToken(user), user: publicUser(user) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Signup failed', detail: err.message });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email?.trim() || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const user = await findUserByEmail(email.trim().toLowerCase());
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.json({ token: signToken(user), user: publicUser(user) });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Login failed', detail: err.message });
    }
  });

  app.get('/api/auth/me', authMiddleware, async (req, res) => {
    try {
      const user = await findUserById(req.user.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ user: publicUser(user) });
    } catch (err) {
      res.status(500).json({ message: 'Failed to load profile' });
    }
  });

  app.get('/api/portal', authMiddleware, async (req, res) => {
    try {
      const portal = await getPortalForUser(req.user.id);
      if (!portal) return res.status(404).json({ message: 'User not found' });
      res.json(portal);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to load portal', detail: err.message });
    }
  });

  app.post('/api/portal/documents/upload', authMiddleware, upload.single('file'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ message: 'File is required' });

      const safeName = req.file.originalname.replace(/[^\w.\-() ]+/g, '_');
      const storedName = `${Date.now()}-${safeName}`;
      const diskPath = path.join(uploadDir, storedName);
      fs.writeFileSync(diskPath, req.file.buffer);

      const id = await saveUploadedDocument({
        userId: req.user.id,
        projectId: req.body.projectId || null,
        name: safeName,
        docType: req.body.docType || 'Upload',
        mimeType: req.file.mimetype,
        filePath: storedName,
        fileData: req.file.buffer,
      });

      res.status(201).json({
        id,
        name: safeName,
        url: `/api/portal/documents/${id}/download`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Upload failed', detail: err.message });
    }
  });

  app.get('/api/portal/documents/:id/download', authMiddleware, async (req, res) => {
    try {
      const user = await findUserById(req.user.id);
      const doc = await getDocumentForUser(req.params.id, req.user.id, user?.role === 'admin');
      if (!doc) return res.status(404).json({ message: 'Document not found' });

      if (doc.file_data) {
        res.setHeader('Content-Type', doc.mime_type || 'application/octet-stream');
        res.setHeader('Content-Disposition', `inline; filename="${doc.name}"`);
        return res.send(doc.file_data);
      }

      if (doc.file_path) {
        const full = path.join(uploadDir, doc.file_path);
        if (fs.existsSync(full)) return res.sendFile(full);
      }

      return res.status(404).json({ message: 'File content not available' });
    } catch (err) {
      res.status(500).json({ message: 'Download failed' });
    }
  });

  app.get('/api/admin/clients', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
      res.json({ clients: await listClients() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/api/admin/dashboard', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
      res.json({ stats: await getAdminDashboardStats() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/api/admin/projects', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
      res.json({ projects: await listAllProjects() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/api/admin/inquiries', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
      res.json({ inquiries: await listAdminInquiries() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/api/admin/payments', authMiddleware, adminMiddleware, async (_req, res) => {
    try {
      res.json({ payments: await listAdminPayments() });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post('/api/admin/projects', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const { userId, name, type, status, progress, location, manager, startDate, dueDate } = req.body;
      if (!userId || !name?.trim() || !type?.trim()) {
        return res.status(400).json({ message: 'Client, project name, and type are required' });
      }
      const id = await assignProject({
        userId,
        name: name.trim(),
        type: type.trim(),
        status,
        progress,
        location,
        manager,
        startDate,
        dueDate,
      });
      res.status(201).json({ id, message: 'Project assigned' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  return app;
}

export default createApp();
