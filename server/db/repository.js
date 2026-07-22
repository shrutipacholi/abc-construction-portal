import { v4 as uuidv4 } from 'uuid';
import { query } from './pool.js';

function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone || '',
    company: row.company || '',
    role: row.role || 'client',
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : null,
  };
}

export async function findUserByEmail(email) {
  const rows = await query('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
  return rows[0] || null;
}

export async function findUserById(id) {
  const rows = await query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
  return rows[0] || null;
}

export async function createUser({ name, email, phone, company, passwordHash, role = 'client' }) {
  const id = uuidv4();
  await query(
    `INSERT INTO users (id, name, email, phone, company, role, password_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [id, name, email, phone || '', company || '', role, passwordHash],
  );
  return findUserById(id);
}

export async function createStarterPortalRows(user) {
  const firstName = (user.name || 'there').split(' ')[0];
  await query(
    `INSERT INTO quote_requests (id, user_id, status, company, note)
     VALUES (?, ?, 'Submitted', ?, 'Awaiting assignment by ABC Construction team.')`,
    [uuidv4(), user.id, user.company || ''],
  );
  await query(
    `INSERT INTO messages (id, user_id, sender_name, sender_role, body)
     VALUES (?, ?, 'ABC Construction', 'Support', ?)`,
    [
      uuidv4(),
      user.id,
      `Welcome ${firstName}. Your client account is ready. A project manager will contact you once your enquiry is assigned.`,
    ],
  );
  await query(
    `INSERT INTO notifications (id, user_id, text, created_label)
     VALUES (?, ?, 'Account created successfully. Only your personal project data will appear here.', 'Just now')`,
    [uuidv4(), user.id],
  );
}

export async function listClients() {
  const rows = await query(
    `SELECT id, name, email, phone, company, role, created_at
     FROM users WHERE role = 'client' ORDER BY created_at DESC`,
  );
  return rows.map(publicUser);
}

export async function listAllProjects() {
  const rows = await query(
    `SELECT p.*, u.name AS client_name, u.email AS client_email
     FROM projects p
     JOIN users u ON u.id = p.user_id
     ORDER BY p.start_date IS NULL, p.start_date DESC`,
  );
  return rows.map((p) => ({
    id: p.id,
    userId: p.user_id,
    clientName: p.client_name,
    clientEmail: p.client_email,
    name: p.name,
    type: p.type,
    status: p.status,
    progress: Number(p.progress) || 0,
    location: p.location || '',
    manager: p.manager || '',
    startDate: p.start_date ? String(p.start_date).slice(0, 10) : null,
    dueDate: p.due_date ? String(p.due_date).slice(0, 10) : null,
  }));
}

export async function assignProject({ userId, name, type, status, progress, location, manager, startDate, dueDate }) {
  const client = await findUserById(userId);
  if (!client || (client.role || 'client') === 'admin') {
    throw new Error('Select a valid client account');
  }

  const id = uuidv4();
  await query(
    `INSERT INTO projects (id, user_id, name, type, status, progress, location, manager, start_date, due_date)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      userId,
      name,
      type,
      status || 'Planning',
      Number(progress) || 0,
      location || '',
      manager || '',
      startDate || null,
      dueDate || null,
    ],
  );

  await query(
    `INSERT INTO notifications (id, user_id, text, created_label)
     VALUES (?, ?, ?, 'Just now')`,
    [uuidv4(), userId, `New project assigned: ${name}`],
  );

  await query(
    `INSERT INTO messages (id, user_id, sender_name, sender_role, body)
     VALUES (?, ?, 'ABC Construction', 'Admin', ?)`,
    [uuidv4(), userId, `A new project "${name}" has been assigned to your portal.`],
  );

  const quoteRows = await query(
    `SELECT id FROM quote_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1`,
    [userId],
  );
  if (quoteRows[0]) {
    await query(`UPDATE quote_requests SET status = 'Assigned', note = ? WHERE id = ?`, [
      `Project assigned: ${name}`,
      quoteRows[0].id,
    ]);
  }

  return id;
}

export async function saveUploadedDocument({
  userId,
  projectId,
  name,
  docType,
  mimeType,
  filePath,
  fileData,
}) {
  const id = uuidv4();
  await query(
    `INSERT INTO documents (id, user_id, project_id, name, doc_type, mime_type, file_path, file_data, uploaded_on)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURDATE())`,
    [id, userId, projectId || null, name, docType || 'Upload', mimeType || null, filePath || null, fileData || null],
  );
  await query(
    `INSERT INTO notifications (id, user_id, text, created_label)
     VALUES (?, ?, ?, 'Just now')`,
    [uuidv4(), userId, `Document uploaded: ${name}`],
  );
  return id;
}

export async function getDocumentForUser(docId, userId, isAdmin = false) {
  if (isAdmin) {
    const rows = await query('SELECT * FROM documents WHERE id = ? LIMIT 1', [docId]);
    return rows[0] || null;
  }
  const rows = await query('SELECT * FROM documents WHERE id = ? AND user_id = ? LIMIT 1', [docId, userId]);
  return rows[0] || null;
}

export async function getPortalForUser(userId) {
  const user = await findUserById(userId);
  if (!user) return null;

  const [quoteRows, projects, milestones, payments, documents, messages, notifications] =
    await Promise.all([
      query(
        `SELECT status, company, note, submitted_at
         FROM quote_requests WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1`,
        [userId],
      ),
      query(
        `SELECT id, name, type, status, progress, location, manager, start_date, due_date
         FROM projects WHERE user_id = ? ORDER BY start_date IS NULL, start_date`,
        [userId],
      ),
      query(
        `SELECT id, project_id, title, due_date, is_done
         FROM milestones WHERE user_id = ? ORDER BY due_date IS NULL, due_date`,
        [userId],
      ),
      query(
        `SELECT id, project_id, label, amount, status, paid_on
         FROM payments WHERE user_id = ? ORDER BY paid_on IS NULL, paid_on`,
        [userId],
      ),
      query(
        `SELECT id, project_id, name, doc_type, mime_type, file_path,
                (file_data IS NOT NULL OR (file_path IS NOT NULL AND file_path != '')) AS has_file,
                uploaded_on
         FROM documents WHERE user_id = ? ORDER BY uploaded_on IS NULL, uploaded_on DESC`,
        [userId],
      ),
      query(
        `SELECT id, sender_name, sender_role, body, sent_at
         FROM messages WHERE user_id = ? ORDER BY sent_at ASC`,
        [userId],
      ),
      query(
        `SELECT id, text, created_label
         FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
        [userId],
      ),
    ]);

  const quote = quoteRows[0];

  return {
    profile: publicUser(user),
    quoteRequest: quote
      ? {
          status: quote.status,
          company: quote.company || '',
          submittedAt: quote.submitted_at ? new Date(quote.submitted_at).toISOString() : null,
          note: quote.note || '',
        }
      : null,
    projects: projects.map((p) => ({
      id: p.id,
      name: p.name,
      type: p.type,
      status: p.status,
      progress: Number(p.progress) || 0,
      location: p.location || '',
      manager: p.manager || '',
      startDate: p.start_date ? String(p.start_date).slice(0, 10) : null,
      dueDate: p.due_date ? String(p.due_date).slice(0, 10) : null,
    })),
    milestones: milestones.map((m) => ({
      id: m.id,
      projectId: m.project_id,
      title: m.title,
      date: m.due_date ? String(m.due_date).slice(0, 10) : null,
      done: Boolean(m.is_done),
    })),
    payments: payments.map((p) => ({
      id: p.id,
      projectId: p.project_id,
      label: p.label,
      amount: Number(p.amount),
      status: p.status,
      date: p.paid_on ? String(p.paid_on).slice(0, 10) : null,
    })),
    documents: documents.map((d) => ({
      id: d.id,
      projectId: d.project_id,
      name: d.name,
      type: d.doc_type,
      mimeType: d.mime_type,
      hasFile: Boolean(d.has_file),
      date: d.uploaded_on ? String(d.uploaded_on).slice(0, 10) : null,
    })),
    messages: messages.map((m) => ({
      id: m.id,
      from: m.sender_name,
      role: m.sender_role,
      text: m.body,
      time: m.sent_at
        ? new Date(m.sent_at).toISOString().slice(0, 16).replace('T', ' ')
        : '',
    })),
    notifications: notifications.map((n) => ({
      id: n.id,
      text: n.text,
      time: n.created_label,
    })),
  };
}

export { publicUser };
