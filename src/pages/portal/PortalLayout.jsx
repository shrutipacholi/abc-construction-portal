import { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/portal', end: true, label: 'Dashboard' },
  { to: '/portal/projects', label: 'Projects' },
  { to: '/portal/milestones', label: 'Milestones' },
  { to: '/portal/payments', label: 'Payments' },
  { to: '/portal/documents', label: 'Documents' },
  { to: '/portal/messages', label: 'Messages' },
  { to: '/portal/reports', label: 'Reports' },
];

export default function PortalLayout() {
  const { user, loading, logout, fetchPortal } = useAuth();
  const navigate = useNavigate();
  const [portal, setPortal] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    fetchPortal()
      .then((data) => {
        if (!cancelled) setPortal(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once per authenticated user
  }, [user?.id]);

  if (loading) {
    return (
      <div className="auth-panel" style={{ minHeight: '100vh' }}>
        <p>Loading portal…</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="portal-shell">
      <aside className="portal-sidebar">
        <div className="logo">
          <div className="logo-mark">ABC</div>
          <div className="logo-text">
            <strong>Client Portal</strong>
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
            <strong>Welcome, {user.name}</strong>
            <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{user.email}</div>
          </div>
          <NavLink className="btn btn-outline" to="/">
            View Website
          </NavLink>
        </div>
        <div className="portal-content">
          {error ? <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div> : null}
          <Outlet context={{ portal, user }} />
        </div>
      </div>
    </div>
  );
}
