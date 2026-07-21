import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || 'abc-construction-dev-secret';
const isServerless = Boolean(process.env.VERCEL);
const DATA_DIR = isServerless ? path.join('/tmp', 'abc-construction') : path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

let memoryUsers = null;

const samplePortal = {
  projects: [
    {
      id: 'p1',
      name: 'Luxury Villa — Palm Estate',
      type: 'Residential',
      status: 'In Progress',
      progress: 68,
      location: 'Pune',
      manager: 'Rahul Mehta',
      startDate: '2025-11-01',
      dueDate: '2026-09-30',
    },
    {
      id: 'p2',
      name: 'Corporate Office Tower',
      type: 'Commercial',
      status: 'Planning',
      progress: 22,
      location: 'Mumbai',
      manager: 'Priya Sharma',
      startDate: '2026-02-15',
      dueDate: '2027-06-30',
    },
  ],
  milestones: [
    { id: 'm1', projectId: 'p1', title: 'Foundation Complete', date: '2026-01-20', done: true },
    { id: 'm2', projectId: 'p1', title: 'Structure Framing', date: '2026-04-15', done: true },
    { id: 'm3', projectId: 'p1', title: 'Interior Finishing', date: '2026-07-30', done: false },
    { id: 'm4', projectId: 'p1', title: 'Final Handover', date: '2026-09-30', done: false },
  ],
  payments: [
    { id: 'pay1', projectId: 'p1', label: 'Mobilization Advance', amount: 850000, status: 'Paid', date: '2025-11-05' },
    { id: 'pay2', projectId: 'p1', label: 'Milestone 2 — Structure', amount: 1200000, status: 'Paid', date: '2026-04-18' },
    { id: 'pay3', projectId: 'p1', label: 'Milestone 3 — Interiors', amount: 950000, status: 'Due', date: '2026-08-01' },
  ],
  documents: [
    { id: 'd1', name: 'Contract Agreement.pdf', type: 'Contract', date: '2025-10-28' },
    { id: 'd2', name: 'Architectural Drawings.zip', type: 'Drawings', date: '2025-11-12' },
    { id: 'd3', name: 'Quality Certificate — Foundation.pdf', type: 'Certificate', date: '2026-01-22' },
  ],
  messages: [
    {
      id: 'msg1',
      from: 'Rahul Mehta',
      role: 'Project Manager',
      text: 'Foundation inspection passed. Next week we begin framing.',
      time: '2026-01-21 10:30',
    },
    {
      id: 'msg2',
      from: 'You',
      role: 'Client',
      text: 'Thanks. Please share photos of the site progress.',
      time: '2026-01-21 14:05',
    },
  ],
  notifications: [
    { id: 'n1', text: 'Milestone “Structure Framing” marked complete', time: '2 days ago' },
    { id: 'n2', text: 'New payment invoice uploaded', time: '1 week ago' },
    { id: 'n3', text: 'Quality certificate available for download', time: '3 weeks ago' },
  ],
};

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, '[]');
}

function defaultUsers() {
  return [
    {
      id: 'demo-client',
      name: 'Demo Client',
      email: 'client@test.com',
      phone: '9999999999',
      company: 'Demo Corp',
      passwordHash: bcrypt.hashSync('secret1', 8),
      createdAt: new Date().toISOString(),
    },
  ];
}

function readUsers() {
  try {
    ensureData();
    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    if (Array.isArray(users) && users.length > 0) {
      memoryUsers = users;
      return users;
    }
  } catch {
    // fall through
  }
  if (!memoryUsers) memoryUsers = defaultUsers();
  return memoryUsers;
}

function writeUsers(users) {
  memoryUsers = users;
  try {
    ensureData();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch {
    // ignore
  }
}

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

export function createApp() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true });
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

      const users = readUsers();
      const normalized = email.trim().toLowerCase();
      if (users.some((u) => u.email === normalized)) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }

      const user = {
        id: uuidv4(),
        name: name.trim(),
        email: normalized,
        phone: phone?.trim() || '',
        company: company?.trim() || '',
        passwordHash: await bcrypt.hash(password, 10),
        createdAt: new Date().toISOString(),
      };

      users.push(user);
      writeUsers(users);

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.status(201).json({
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, company: user.company },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Signup failed' });
    }
  });

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email?.trim() || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const users = readUsers();
      const user = users.find((u) => u.email === email.trim().toLowerCase());
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, company: user.company },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Login failed' });
    }
  });

  app.get('/api/auth/me', authMiddleware, (req, res) => {
    const users = readUsers();
    const user = users.find((u) => u.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, company: user.company },
    });
  });

  app.get('/api/portal', authMiddleware, (_req, res) => {
    res.json(samplePortal);
  });

  return app;
}

export default createApp();
