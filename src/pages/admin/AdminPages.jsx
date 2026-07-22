import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export function AdminOverview() {
  const { clients, projects } = useOutletContext();
  return (
    <>
      <div className="portal-cards">
        <article className="metric-card">
          <span>Clients</span>
          <strong>{clients.length}</strong>
        </article>
        <article className="metric-card">
          <span>Assigned Projects</span>
          <strong>{projects.length}</strong>
        </article>
        <article className="metric-card">
          <span>In Progress</span>
          <strong>{projects.filter((p) => p.status === 'In Progress').length}</strong>
        </article>
        <article className="metric-card">
          <span>Planning</span>
          <strong>{projects.filter((p) => p.status === 'Planning').length}</strong>
        </article>
      </div>
      <section className="panel">
        <h3>Clients</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.company || '—'}</td>
                <td>{c.phone || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export function AdminAssign() {
  const { clients, token, refresh } = useOutletContext();
  const [form, setForm] = useState({
    userId: '',
    name: '',
    type: 'Residential',
    status: 'Planning',
    progress: 0,
    location: '',
    manager: '',
    startDate: '',
    dueDate: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          progress: Number(form.progress) || 0,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Assign failed');
      setMessage('Project assigned to client portal.');
      setForm((prev) => ({
        ...prev,
        name: '',
        location: '',
        manager: '',
        progress: 0,
        startDate: '',
        dueDate: '',
      }));
      await refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="panel">
      <h3>Assign Project to Client</h3>
      {message ? <p style={{ color: 'var(--success)' }}>{message}</p> : null}
      {error ? <div className="form-error">{error}</div> : null}
      <form className="form-stack" onSubmit={onSubmit} style={{ maxWidth: 560, marginTop: '1rem' }}>
        <label>
          Client
          <select name="userId" value={form.userId} onChange={onChange} required>
            <option value="">Select client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </label>
        <label>
          Project name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Type
          <select name="type" value={form.type} onChange={onChange}>
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Infrastructure</option>
            <option>Interior</option>
          </select>
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={onChange}>
            <option>Planning</option>
            <option>In Progress</option>
            <option>On Hold</option>
            <option>Completed</option>
          </select>
        </label>
        <label>
          Progress %
          <input name="progress" type="number" min="0" max="100" value={form.progress} onChange={onChange} />
        </label>
        <label>
          Location
          <input name="location" value={form.location} onChange={onChange} />
        </label>
        <label>
          Project manager
          <input name="manager" value={form.manager} onChange={onChange} />
        </label>
        <label>
          Start date
          <input name="startDate" type="date" value={form.startDate} onChange={onChange} />
        </label>
        <label>
          Due date
          <input name="dueDate" type="date" value={form.dueDate} onChange={onChange} />
        </label>
        <button className="btn btn-orange" type="submit" disabled={saving}>
          {saving ? 'Assigning…' : 'Assign Project'}
        </button>
      </form>
    </section>
  );
}

export function AdminProjects() {
  const { projects } = useOutletContext();
  return (
    <section className="panel">
      <h3>All Assigned Projects</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Type</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.clientName}<div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{p.clientEmail}</div></td>
              <td>{p.type}</td>
              <td><span className="badge badge-progress">{p.status}</span></td>
              <td>{p.progress}%</td>
              <td>{p.location || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
