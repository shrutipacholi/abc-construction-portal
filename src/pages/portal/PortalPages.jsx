import { useOutletContext } from 'react-router-dom';

export function PortalDashboard() {
  const { portal, user } = useOutletContext();
  if (!portal) return <p>Loading dashboard…</p>;

  const active = portal.projects.filter((p) => p.status === 'In Progress').length;
  const duePayments = portal.payments.filter((p) => p.status === 'Due').length;

  return (
    <>
      <div className="portal-cards">
        <article className="metric-card">
          <span>Projects</span>
          <strong>{portal.projects.length}</strong>
        </article>
        <article className="metric-card">
          <span>Active Sites</span>
          <strong>{active}</strong>
        </article>
        <article className="metric-card">
          <span>Due Payments</span>
          <strong>{duePayments}</strong>
        </article>
        <article className="metric-card">
          <span>Notifications</span>
          <strong>{portal.notifications.length}</strong>
        </article>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <section className="panel">
          <h3>Project Progress</h3>
          {portal.projects.map((project) => (
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
          ))}
        </section>

        <section className="panel">
          <h3>Notifications</h3>
          <ul style={{ display: 'grid', gap: '0.85rem' }}>
            {portal.notifications.map((n) => (
              <li key={n.id} style={{ borderBottom: '1px solid var(--line)', paddingBottom: '0.75rem' }}>
                <div>{n.text}</div>
                <small style={{ color: 'var(--muted)' }}>{n.time}</small>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '1rem', color: 'var(--muted)' }}>
            Hi {user.name.split(' ')[0]} — your portal includes photos/videos, milestones, payments, documents,
            chat, reports, and certificates.
          </p>
        </section>
      </div>
    </>
  );
}

export function PortalProjects() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h3>Your Projects</h3>
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
          {portal.projects.map((p) => (
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
    </section>
  );
}

export function PortalMilestones() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h3>Milestones</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {portal.milestones.map((m) => (
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
    </section>
  );
}

export function PortalPayments() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h3>Payments</h3>
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
          {portal.payments.map((p) => (
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
    </section>
  );
}

export function PortalDocuments() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h3>Documents & Certificates</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Document</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {portal.documents.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>{d.type}</td>
              <td>{d.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export function PortalMessages() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <section className="panel">
      <h3>Chat with Managers</h3>
      <div className="chat-list">
        {portal.messages.map((m) => (
          <article key={m.id} className={`chat-bubble ${m.from === 'You' ? 'mine' : ''}`}>
            <strong>{m.from}</strong> <small style={{ color: 'var(--muted)' }}>({m.role})</small>
            <p style={{ marginTop: '0.35rem' }}>{m.text}</p>
            <small style={{ color: 'var(--muted)' }}>{m.time}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PortalReports() {
  const { portal } = useOutletContext();
  if (!portal) return <p>Loading…</p>;

  return (
    <div className="grid-2" style={{ alignItems: 'start' }}>
      <section className="panel">
        <h3>Progress Reports</h3>
        <p>Weekly site summaries, photo/video logs, and quality checkpoints for your active projects.</p>
        <ul style={{ marginTop: '1rem', display: 'grid', gap: '0.55rem' }}>
          <li>• Site progress digest — Palm Estate</li>
          <li>• Safety & quality checklist — Apr 2026</li>
          <li>• Material delivery report — Structure phase</li>
        </ul>
      </section>
      <section className="panel">
        <h3>Certificates</h3>
        <ul style={{ display: 'grid', gap: '0.55rem' }}>
          {portal.documents
            .filter((d) => d.type === 'Certificate')
            .map((d) => (
              <li key={d.id}>• {d.name}</li>
            ))}
          <li>• Occupancy readiness certificate — pending handover</li>
        </ul>
      </section>
    </div>
  );
}
