import { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const icons = {
  overview: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  ),
  inquiries: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 4h8a2 2 0 012 2v14l-3-2-3 2-3-2-3 2V6a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 9h6M9 13h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10l4-3 4 3v10M12 20V8l4-3 4 3v12M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  ),
  quotations: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v5h5M9 13h6M9 17h4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  agreements: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v5h5M9 15l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  approvals: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14v9H9l-4 3V6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 9v3M12 14.5h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  payments: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v9M9.5 9.5c.6-1 1.5-1.5 2.5-1.5 1.5 0 2.5.8 2.5 2s-1 2-2.5 2H11c-1.5 0-2.5.8-2.5 2s1 2 2.5 2c1 0 1.9-.5 2.5-1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  expenses: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 8V6a4 4 0 018 0v2M8 13h.01M16 13h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.5v9M9.5 9.5c.6-1 1.5-1.5 2.5-1.5 1.5 0 2.5.8 2.5 2s-1 2-2.5 2H11c-1.5 0-2.5.8-2.5 2s1 2 2.5 2c1 0 1.9-.5 2.5-1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="9" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="15" cy="8" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="14.5" cy="14.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 18.5c1.2-2 3-3 5-3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  vendors: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 19c.8-3 2.8-4.5 5.5-4.5S13.7 16 14.5 19M14 14.5c1.7.2 3.2 1.2 4 3.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  reports: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19V11M10 19V7M15 19v-5M20 19V9" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  admin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 3.5v2.2M12 18.3v2.2M4.9 6.5l1.6 1.6M17.5 15.9l1.6 1.6M3.5 12h2.2M18.3 12h2.2M4.9 17.5l1.6-1.6M17.5 8.1l1.6-1.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

const primaryNav = [
  { to: '/admin', end: true, label: 'Overview', icon: 'overview' },
  { to: '/admin/inquiries', label: 'Inquiries & Visits', icon: 'inquiries' },
  { to: '/admin/projects', label: 'Projects', icon: 'projects' },
  { to: '/admin/quotations', label: 'Quotations', icon: 'quotations' },
  { to: '/admin/agreements', label: 'Agreements', icon: 'agreements' },
  { to: '/admin/approvals', label: 'Approvals', icon: 'approvals' },
  { to: '/admin/payments', label: 'Payments', icon: 'payments' },
  { to: '/admin/expenses', label: 'Company Expenses', icon: 'expenses' },
  { to: '/admin/finance-queue', label: 'Finance Queue', icon: 'finance' },
  { to: '/admin/design', label: 'Design', icon: 'design' },
];

const secondaryNav = [
  { to: '/admin/vendors', label: 'Vendors', icon: 'vendors' },
  { to: '/admin/reports', label: 'Reports', icon: 'reports' },
  { to: '/admin/administration', label: 'Administration', icon: 'admin' },
];

export default function AdminLayout() {
  const { user, token, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [ready, setReady] = useState(false);

  const refresh = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [cRes, pRes, iRes, payRes] = await Promise.all([
      fetch('/api/admin/clients', { headers }),
      fetch('/api/admin/projects', { headers }),
      fetch('/api/admin/inquiries', { headers }),
      fetch('/api/admin/payments', { headers }),
    ]);
    const cData = await cRes.json();
    const pData = await pRes.json();
    const iData = await iRes.json();
    const payData = await payRes.json();
    if (!cRes.ok) throw new Error(cData.message || 'Failed to load clients');
    if (!pRes.ok) throw new Error(pData.message || 'Failed to load projects');
    if (!iRes.ok) throw new Error(iData.message || 'Failed to load inquiries');
    if (!payRes.ok) throw new Error(payData.message || 'Failed to load payments');
    setClients(cData.clients || []);
    setProjects(pData.projects || []);
    setInquiries(iData.inquiries || []);
    setPayments(payData.payments || []);
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
    <div className="portal-shell admin-shell">
      <aside className="portal-sidebar admin-sidebar">
        <div className="logo">
          <div className="logo-mark">ABC</div>
          <div className="logo-text">
            <strong>Admin Console</strong>
            <span>ABC Construction</span>
          </div>
        </div>

        <nav className="portal-nav admin-nav">
          {primaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className="admin-nav-link">
              <span className="admin-nav-icon">{icons[item.icon]}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
          <div className="admin-nav-divider" />
          {secondaryNav.map((item) => (
            <NavLink key={item.to} to={item.to} className="admin-nav-link">
              <span className="admin-nav-icon">{icons[item.icon]}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-profile-card">
            <div className="admin-profile-avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="9" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
                <path d="M5.5 19c1-3.2 3.2-4.8 6.5-4.8s5.5 1.6 6.5 4.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <strong>{user.name || 'Admin User'}</strong>
              <span>Administrator</span>
            </div>
          </div>
          <button
            className="btn btn-orange admin-logout-btn"
            type="button"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="portal-main">
        <div className="portal-top">
          <div>
            <strong>Administrator</strong>
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
            <Outlet
              context={{
                clients,
                projects,
                inquiries,
                payments,
                token,
                refresh,
                setProjects,
                setClients,
                user,
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
