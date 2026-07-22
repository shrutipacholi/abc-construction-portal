import { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/admin', end: true, label: 'Overview' },
  { to: '/admin/assign', label: 'Assign Project' },
  { to: '/admin/projects', label: 'All Projects' },
];

export default function AdminLayout() {
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  const refresh = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [cRes, pRes] = await Promise.all([
      fetch('/api/admin/clients', { headers }),
      fetch('/api/admin/projects', { headers }),
    ]);
    const cData = await cRes.json();
    const pData = await pRes.json();
    if (!cRes.ok) throw new Error(cData.message || 'Failed to load clients');
    if (!pRes.ok) throw new Error(pData.message || 'Failed to load projects');
    setClients(cData.clients || []);
    setProjects(pData.projects || []);
  };

  useEffect(() => {
    if (!user || user.role !== 'admin' || !token) return;
    let cancelled = false;
    refresh()
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id, token]);

  if (loading) {
    return (
      <div className="auth-panel" style={{ minHeight: '100vh' }}>
        <p>Loading admin…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/portal" replace />;

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="logo">
          <div className="logo-mark">ABC</div>
          <div className="logo-text">
            <strong>Admin Console</strong>
            <span>ABC Construction</span>
          </div>
        </div>
        <nav className="portal-nav">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="btn btn-orange"
          type="button"
          onClick={() => {
            logout();
            navigate('/');
          }}
        >
          Log out
        </button>
      </aside>

      <div className="portal-main">
        <div className="portal-top">
          <div>
            <strong>Admin · {user.name}</strong>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{user.email}</div>
          </div>
          <NavLink className="btn btn-outline" to="/">
            View Website
          </NavLink>
        </div>
        <div className="portal-content">
          {error ? <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div> : null}
          {!ready && !error ? <p>Loading…</p> : null}
          {ready ? (
            <Outlet context={{ clients, projects, token, refresh, setProjects, setClients }} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
