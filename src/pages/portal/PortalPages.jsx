import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  );
}

function ProfileCard({ profile, quoteRequest }) {
  if (!profile) return null;
  return (
    <section className="panel profile-panel">
      <h3>Your Account</h3>
      <dl className="profile-grid">
        <div>
          <dt>Name</dt>
          <dd>{profile.name}</dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>{profile.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{profile.phone || '—'}</dd>
        </div>
        <div>
          <dt>Company / Project</dt>
          <dd>{profile.company || '—'}</dd>
        </div>
        <div>
          <dt>Member since</dt>
          <dd>{profile.createdAt ? new Date(profile.createdAt).toLocaleDateString('en-IN') : '—'}</dd>
        </div>
        <div>
          <dt>Enquiry status</dt>
          <dd>
            <span className="badge badge-progress">
              {quoteRequest?.status || 'Submitted'}
            </span>
          </dd>
        </div>
      </dl>
      {quoteRequest?.note ? (
        <p className="profile-note">{quoteRequest.note}</p>
      ) : null}
    </section>
  );
}

export function PortalDashboard() {
  const { portal, user } = useOutletContext();
  if (!portal) return <p>Loading dashboard…</p>;

  const projects = portal.projects || [];
  const payments = portal.payments || [];
  const notifications = portal.notifications || [];
  const active = projects.filter((p) => p.status === 'In Progress').length;
  const duePayments = payments.filter((p) => p.status === 'Due').length;
  const firstName = (user?.name || 'there').split(' ')[0];

  return (
    <>
      <ProfileCard profile={portal.profile || user} quoteRequest={portal.quoteRequest} />

      <div className="portal-cards">
        <article className="metric-card">
          <span>My Projects</span>
          <strong>{projects.length}</strong>
        </article>
        <article className="metric-card">
          <span>My Active Sites</span>
          <strong>{active}</strong>
        </article>
        <article className="metric-card">
          <span>My Due Payments</span>
          <strong>{duePayments}</strong>
        </article>
        <article className="metric-card">
          <span>My Notifications</span>
          <strong>{notifications.length}</strong>
        </article>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <section className="panel">
          <h3>My Project Progress</h3>
          {projects.length === 0 ? (
            <EmptyState
              title="No projects assigned yet"
              message={`Hi ${firstName}, your enquiry is with our team. Assigned sites will appear here — you will never see other clients’ projects.`}
            />
          ) : (
            projects.map((project) => (
              <div key={project.id} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
                  <strong>{project.name}</strong>
                  <span className="badge badge-progress">{project.progress}%</span>
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                  {project.location} · Manager: {project.manager}
                </div>
                <div className="progress-bar">
                  <span style={{ width: `${project.progress}%` }} />
                </div>
              </div>
            ))
          )}
        </section>

        <section className="panel">
          <h3>My Notifications</h3>
          {notifications.length === 0 ? (
            <EmptyState title="No notifications" message="Updates about your account and projects will show here." />
          ) : (
            <ul style={{ display: 'grid', gap: '0.85rem' }}>
              {notifications.map((n) => (
                <li key={n.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                  <div>{n.text}</div>
                  <small style={{ color: 'var(--muted)' }}>{n.time}</small>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export function PortalProjects() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;
  const projects = portal.projects || [];

  return (
    <section className="panel">
      <h3>My Projects</h3>
      {projects.length === 0 ? (
        <EmptyState
          title="No personal projects yet"
          message="Once ABC Construction assigns a site to your account, it will be listed here."
        />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td><span className="badge badge-progress">{p.status}</span></td>
                <td>{p.progress}%</td>
                <td>{p.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export function PortalMilestones() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;
  const milestones = portal.milestones || [];

  return (
    <section className="panel">
      <h3>My Milestones</h3>
      {milestones.length === 0 ? (
        <EmptyState title="No milestones yet" message="Milestones will appear after a project is assigned to you." />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Milestone</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((m) => (
              <tr key={m.id}>
                <td>{m.title}</td>
                <td>{m.date}</td>
                <td>
                  <span className={`badge ${m.done ? 'badge-paid' : 'badge-due'}`}>
                    {m.done ? 'Complete' : 'Upcoming'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export function PortalPayments() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;
  const payments = portal.payments || [];

  return (
    <section className="panel">
      <h3>My Payments</h3>
      {payments.length === 0 ? (
        <EmptyState title="No payment records" message="Invoices and dues linked to your projects will show here." />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.label}</td>
                <td>₹{p.amount.toLocaleString('en-IN')}</td>
                <td>{p.date}</td>
                <td>
                  <span className={`badge ${p.status === 'Paid' ? 'badge-paid' : 'badge-due'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export function PortalDocuments() {
  const { portal } = useOutletContext();
  const { uploadDocument, token } = useAuth();
  const [file, setFile] = useState(null);
  const [docType, setDocType] = useState('Photo');
  const [projectId, setProjectId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const [docs, setDocs] = useState(portal?.documents || []);

  useEffect(() => {
    setDocs(portal?.documents || []);
  }, [portal]);

  if (!portal) return <p>Loading…</p>;
  const projects = portal.projects || [];

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Choose a file first');
      return;
    }
    setUploading(true);
    setError('');
    setMessage('');
    try {
      const result = await uploadDocument(file, { projectId, docType });
      setMessage(`Uploaded: ${result.name}`);
      setFile(null);
      setDocs((prev) => [
        {
          id: result.id,
          name: result.name,
          type: docType,
          hasFile: true,
          date: new Date().toISOString().slice(0, 10),
        },
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <section className="panel" style={{ marginBottom: '1rem' }}>
        <h3>Upload Photo / Document</h3>
        {message ? <p style={{ color: 'var(--success)' }}>{message}</p> : null}
        {error ? <div className="form-error">{error}</div> : null}
        <form className="form-stack" onSubmit={onUpload} style={{ maxWidth: 520, marginTop: '0.75rem' }}>
          <label>
            File
            <input type="file" accept="image/*,.pdf,.doc,.docx,.zip" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
          <label>
            Type
            <select value={docType} onChange={(e) => setDocType(e.target.value)}>
              <option>Photo</option>
              <option>Video</option>
              <option>Contract</option>
              <option>Drawings</option>
              <option>Certificate</option>
              <option>Upload</option>
            </select>
          </label>
          <label>
            Link to project (optional)
            <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
              <option value="">No project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </label>
          <button className="btn btn-orange" type="submit" disabled={uploading}>
            {uploading ? 'Uploading…' : 'Upload File'}
          </button>
        </form>
      </section>

      <section className="panel">
        <h3>My Documents & Certificates</h3>
        {docs.length === 0 ? (
          <EmptyState title="No documents yet" message="Contracts, drawings, and certificates for your projects will appear here." />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Document</th>
                <th>Type</th>
                <th>Date</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.type}</td>
                  <td>{d.date}</td>
                  <td>
                    {d.hasFile ? (
                      <a href={`/api/portal/documents/${d.id}/download`} target="_blank" rel="noreferrer" onClick={(e) => {
                        e.preventDefault();
                        fetch(`/api/portal/documents/${d.id}/download`, {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                          .then(async (res) => {
                            if (!res.ok) throw new Error('Download failed');
                            const blob = await res.blob();
                            const url = URL.createObjectURL(blob);
                            window.open(url, '_blank');
                          })
                          .catch(() => setError('Could not open file'));
                      }}>
                        Open
                      </a>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

export function PortalMessages() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;
  const messages = portal.messages || [];

  return (
    <section className="panel">
      <h3>Messages</h3>
      {messages.length === 0 ? (
        <EmptyState title="No messages" message="Conversations with your project manager will appear here." />
      ) : (
        <div className="chat-list">
          {messages.map((m) => (
            <article key={m.id} className={`chat-bubble ${m.from === 'You' ? 'mine' : ''}`}>
              <strong>{m.from}</strong> <small style={{ color: 'var(--muted)' }}>({m.role})</small>
              <p style={{ marginTop: '0.35rem' }}>{m.text}</p>
              <small style={{ color: 'var(--muted)' }}>{m.time}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function PortalReports() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;
  const projects = portal.projects || [];
  const certificates = (portal.documents || []).filter((d) => d.type === 'Certificate');

  return (
    <div className="grid-2" style={{ alignItems: 'start' }}>
      <section className="panel">
        <h3>My Progress Reports</h3>
        {projects.length === 0 ? (
          <EmptyState
            title="No reports available"
            message="Weekly digests and site logs will appear after a project is linked to your account."
          />
        ) : (
          <ul style={{ display: 'grid', gap: '0.55rem' }}>
            {projects.map((p) => (
              <li key={p.id}>• Site progress digest — {p.name}</li>
            ))}
          </ul>
        )}
      </section>
      <section className="panel">
        <h3>My Certificates</h3>
        {certificates.length === 0 ? (
          <EmptyState title="No certificates yet" message="Quality and handover certificates for your sites will list here." />
        ) : (
          <ul style={{ display: 'grid', gap: '0.55rem' }}>
            {certificates.map((d) => (
              <li key={d.id}>• {d.name}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
