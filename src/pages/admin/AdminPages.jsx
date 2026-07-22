import { useEffect, useMemo, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good day';
}

const cardIcons = {
  sites: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V10l4-3 4 3v10M12 20V8l4-3 4 3v12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  value: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 7h7.5a3.5 3.5 0 010 7H7V7zm0 7h8.5a3.5 3.5 0 010 7H7v-7z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M10.5 4v16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  requests: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 6h14v9H9l-4 3V6z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M12 9v3M12 14.5h.01" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  finance: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 16l5-5 3.5 3.5L20 7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 7h5v5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  payments: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 10h18M8 14h3" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

const PIE_COLORS = ['#f15a24', '#1f2a37', '#22a06b', '#2563eb', '#7c3aed', '#00acc1'];

function formatLakh(value) {
  return `₹${Number(value || 0).toFixed(1)}L`;
}

function BudgetBarChart({ rows }) {
  const data = rows?.length
    ? rows
    : [{ code: 'No data', budgetL: 0, spentL: 0 }];
  const maxL = Math.max(...data.flatMap((r) => [r.budgetL, r.spentL]), 1);
  const niceMax = Math.ceil(maxL / 5) * 5 || 5;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => niceMax * t);
  const chartH = 220;
  const chartW = Math.max(360, data.length * 110);
  const pad = { top: 16, right: 16, bottom: 42, left: 52 };
  const innerH = chartH - pad.top - pad.bottom;
  const groupW = (chartW - pad.left - pad.right) / data.length;
  const barW = Math.min(28, groupW * 0.28);

  return (
    <div className="admin-chart-scroll">
      <svg className="admin-bar-svg" viewBox={`0 0 ${chartW} ${chartH}`} role="img" aria-label="Budget vs spent chart">
        {ticks.map((tick) => {
          const y = pad.top + innerH - (tick / niceMax) * innerH;
          return (
            <g key={tick}>
              <line
                x1={pad.left}
                x2={chartW - pad.right}
                y1={y}
                y2={y}
                stroke="#e5e7eb"
                strokeDasharray="4 6"
              />
              <text x={pad.left - 8} y={y + 4} textAnchor="end" className="admin-chart-axis">
                {formatLakh(tick)}
              </text>
            </g>
          );
        })}

        {data.map((row, i) => {
          const cx = pad.left + groupW * i + groupW / 2;
          const budgetH = (row.budgetL / niceMax) * innerH;
          const spentH = (row.spentL / niceMax) * innerH;
          return (
            <g key={row.id || row.code}>
              <rect
                x={cx - barW - 4}
                y={pad.top + innerH - budgetH}
                width={barW}
                height={Math.max(budgetH, 0)}
                rx="4"
                fill="#f15a24"
              />
              <rect
                x={cx + 4}
                y={pad.top + innerH - spentH}
                width={barW}
                height={Math.max(spentH, 0)}
                rx="4"
                fill="#1f2a37"
              />
              <text x={cx} y={chartH - 14} textAnchor="middle" className="admin-chart-axis">
                {row.code}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="admin-chart-legend">
        <span><i className="swatch budget" /> Budget</span>
        <span><i className="swatch spent" /> Spent</span>
      </div>
    </div>
  );
}

function StatusPieChart({ rows }) {
  const data = (rows || []).filter((r) => r.value > 0);
  const total = data.reduce((sum, r) => sum + r.value, 0) || 1;
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 68;
  let angle = -Math.PI / 2;

  const slices = data.map((row, index) => {
    const slice = (row.value / total) * Math.PI * 2;
    const start = angle;
    const end = angle + slice;
    angle = end;
    const large = slice > Math.PI ? 1 : 0;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const path =
      data.length === 1
        ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
        : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
    return {
      ...row,
      path,
      color: PIE_COLORS[index % PIE_COLORS.length],
      pct: Math.round((row.value / total) * 100),
    };
  });

  return (
    <div className="admin-pie-wrap">
      <svg className="admin-pie-svg" viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Project status pie chart">
        {slices.length === 0 ? (
          <circle cx={cx} cy={cy} r={r} fill="#e5e7eb" />
        ) : (
          slices.map((slice) => <path key={slice.label} d={slice.path} fill={slice.color} />)
        )}
        <circle cx={cx} cy={cy} r="34" fill="#fff" />
        <text x={cx} y={cy - 2} textAnchor="middle" className="admin-pie-total">
          {total}
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="admin-chart-axis">
          projects
        </text>
      </svg>
      <ul className="admin-pie-legend">
        {slices.map((slice) => (
          <li key={slice.label}>
            <i style={{ background: slice.color }} />
            <span>{slice.label}</span>
            <strong>{slice.pct}%</strong>
          </li>
        ))}
        {slices.length === 0 ? <li><span>No project data yet</span></li> : null}
      </ul>
    </div>
  );
}

export function AdminOverview() {
  const { clients, projects, token, user } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch('/api/admin/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load dashboard');
        if (!cancelled) setStats(data.stats);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  const fallback = useMemo(() => {
    const activeSites = projects.filter((p) => p.status === 'In Progress' || p.status === 'On Hold').length;
    const statusMap = {};
    projects.forEach((p) => {
      statusMap[p.status] = (statusMap[p.status] || 0) + 1;
    });
    return {
      activeSites,
      portfolioValueLabel: '₹—',
      pendingRequests: 0,
      financeQueue: 0,
      pendingPayments: 0,
      budgetVsSpent: [],
      statusPie: Object.entries(statusMap).map(([label, value]) => ({ label, value })),
      notifications: [],
    };
  }, [projects]);

  const view = stats || fallback;
  const firstName = (user?.name || 'Admin').split(' ')[0];

  const cards = [
    {
      key: 'sites',
      label: 'Active Sites',
      value: view.activeSites,
      hint: 'In progress or on hold',
      tone: 'orange',
      icon: cardIcons.sites,
    },
    {
      key: 'value',
      label: 'Portfolio Value',
      value: view.portfolioValueLabel,
      hint: 'Combined site budgets',
      tone: 'green',
      icon: cardIcons.value,
    },
    {
      key: 'requests',
      label: 'Pending Requests',
      value: view.pendingRequests,
      hint: 'Awaiting engineer action',
      tone: 'orange',
      icon: cardIcons.requests,
    },
    {
      key: 'finance',
      label: 'Finance Queue',
      value: view.financeQueue,
      hint: 'Additional work approvals',
      tone: 'blue',
      icon: cardIcons.finance,
    },
    {
      key: 'payments',
      label: 'Pending Payments',
      value: view.pendingPayments,
      hint: 'Milestone dues',
      tone: 'purple',
      icon: cardIcons.payments,
    },
  ];

  return (
    <div className="admin-dash">
      <header className="admin-dash-header">
        <p className="admin-dash-role">Administrator</p>
        <h1>
          {greeting()}, <span className="admin-greet-name">{firstName}</span>.
        </h1>
        <p className="admin-dash-lead">Here&apos;s what&apos;s happening across your construction portfolio.</p>
      </header>

      {error ? <div className="form-error" style={{ marginBottom: '1rem' }}>{error}</div> : null}

      <div className="admin-metric-row">
        {cards.map((card) => (
          <article className={`admin-metric-card tone-${card.tone}`} key={card.key}>
            <div className="admin-metric-top">
              <span>{card.label}</span>
              <span className="admin-metric-icon">{card.icon}</span>
            </div>
            <strong>{card.value}</strong>
            <p>{card.hint}</p>
          </article>
        ))}
      </div>

      <div className="admin-analytics">
        <section className="admin-panel-card admin-budget-card">
          <div className="admin-panel-head">
            <h3>Budget vs spent</h3>
            <p>Active sites — financial overview</p>
          </div>
          <BudgetBarChart rows={view.budgetVsSpent || []} />
        </section>

        <section className="admin-panel-card admin-pie-card">
          <div className="admin-panel-head">
            <h3>Project status</h3>
            <p>Portfolio mix by stage</p>
          </div>
          <StatusPieChart rows={view.statusPie || []} />
        </section>

        <section className="admin-panel-card admin-notify-card">
          <div className="admin-panel-head notify-head">
            <span className="notify-bell" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M6 16h12l-1.2-2.2V10a4.8 4.8 0 10-9.6 0v3.8L6 16z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                <path d="M10 18a2 2 0 004 0" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <h3>Notifications</h3>
              <p>Recent alerts</p>
            </div>
          </div>
          <div className="admin-notify-list">
            {(view.notifications || []).length === 0 ? (
              <p className="admin-notify-empty">No recent alerts.</p>
            ) : (
              (view.notifications || []).map((note) => (
                <article key={note.id} className="admin-notify-item">
                  <h4>{note.title}</h4>
                  <p>{note.body}</p>
                  <time>{note.date}</time>
                </article>
              ))
            )}
          </div>
        </section>
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
            {clients.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ color: 'var(--muted)' }}>No clients yet.</td>
              </tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.company || '—'}</td>
                  <td>{c.phone || '—'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
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
      <div className="admin-section-head">
        <div>
          <h3>Projects</h3>
          <p>All client projects assigned from the admin console.</p>
        </div>
        <Link className="btn btn-orange" to="/admin/assign">
          Assign Project
        </Link>
      </div>
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
          {projects.length === 0 ? (
            <tr>
              <td colSpan={6}>No projects yet. Assign one to get started.</td>
            </tr>
          ) : (
            projects.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>
                  {p.clientName}
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{p.clientEmail}</div>
                </td>
                <td>{p.type}</td>
                <td>
                  <span className="badge badge-progress">{p.status}</span>
                </td>
                <td>{p.progress}%</td>
                <td>{p.location || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

function AdminPlaceholder({ title, lead, children }) {
  return (
    <section className="panel">
      <div className="admin-section-head">
        <div>
          <h3>{title}</h3>
          {lead ? <p>{lead}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

function EmptyState({ text }) {
  return <p className="admin-empty-state">{text}</p>;
}

export function AdminInquiries() {
  const { inquiries } = useOutletContext();
  return (
    <AdminPlaceholder title="Inquiries & Visits" lead="Quote requests and site-visit interest from clients.">
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Company</th>
            <th>Status</th>
            <th>Submitted</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.length === 0 ? (
            <tr>
              <td colSpan={5}>No inquiries yet.</td>
            </tr>
          ) : (
            inquiries.map((row) => (
              <tr key={row.id}>
                <td>
                  {row.clientName}
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{row.clientEmail}</div>
                </td>
                <td>{row.company || '—'}</td>
                <td>
                  <span className="badge badge-progress">{row.status}</span>
                </td>
                <td>{row.submittedAt || '—'}</td>
                <td>{row.note || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminPlaceholder>
  );
}

export function AdminQuotations() {
  const { inquiries } = useOutletContext();
  const quotes = inquiries.filter((q) => /quote|pending|review|sent|assigned/i.test(q.status || ''));
  return (
    <AdminPlaceholder title="Quotations" lead="Track quotation requests and follow-ups.">
      <table className="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Company</th>
            <th>Status</th>
            <th>Submitted</th>
          </tr>
        </thead>
        <tbody>
          {(quotes.length ? quotes : inquiries).length === 0 ? (
            <tr>
              <td colSpan={4}>No quotations in queue.</td>
            </tr>
          ) : (
            (quotes.length ? quotes : inquiries).map((row) => (
              <tr key={row.id}>
                <td>{row.clientName}</td>
                <td>{row.company || '—'}</td>
                <td>
                  <span className="badge badge-progress">{row.status}</span>
                </td>
                <td>{row.submittedAt || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminPlaceholder>
  );
}

export function AdminAgreements() {
  return (
    <AdminPlaceholder title="Agreements" lead="Signed contracts and project agreements.">
      <EmptyState text="Agreement records will appear here once contract workflows are connected." />
    </AdminPlaceholder>
  );
}

export function AdminApprovals() {
  const { inquiries, projects } = useOutletContext();
  const pending = inquiries.filter((q) => /pending|review|await/i.test(q.status || 'Pending'));
  const planning = projects.filter((p) => /planning|hold|review/i.test(p.status || ''));
  return (
    <AdminPlaceholder title="Approvals" lead="Items waiting for admin review or go-ahead.">
      <div className="admin-split-grid">
        <div>
          <h4>Pending inquiries</h4>
          {pending.length === 0 ? (
            <EmptyState text="No pending inquiry approvals." />
          ) : (
            <ul className="admin-simple-list">
              {pending.map((row) => (
                <li key={row.id}>
                  <strong>{row.clientName}</strong>
                  <span>{row.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4>Projects needing attention</h4>
          {planning.length === 0 ? (
            <EmptyState text="No projects waiting on approval." />
          ) : (
            <ul className="admin-simple-list">
              {planning.map((p) => (
                <li key={p.id}>
                  <strong>{p.name}</strong>
                  <span>{p.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminPlaceholder>
  );
}

export function AdminPayments() {
  const { payments } = useOutletContext();
  return (
    <AdminPlaceholder title="Payments" lead="Client payment schedule across all projects.">
      <table className="table">
        <thead>
          <tr>
            <th>Label</th>
            <th>Client</th>
            <th>Project</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Paid on</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={6}>No payments recorded yet.</td>
            </tr>
          ) : (
            payments.map((p) => (
              <tr key={p.id}>
                <td>{p.label}</td>
                <td>
                  {p.clientName}
                  <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{p.clientEmail}</div>
                </td>
                <td>{p.projectName}</td>
                <td>₹{Number(p.amount).toLocaleString('en-IN')}</td>
                <td>
                  <span className="badge badge-progress">{p.status}</span>
                </td>
                <td>{p.paidOn || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </AdminPlaceholder>
  );
}

export function AdminExpenses() {
  return (
    <AdminPlaceholder title="Company Expenses" lead="Internal costs, vendor bills, and operating spend.">
      <EmptyState text="Expense tracking is ready for setup — no company expenses logged yet." />
    </AdminPlaceholder>
  );
}

export function AdminFinanceQueue() {
  const { payments, inquiries } = useOutletContext();
  const due = payments.filter((p) => !/paid|complete|received/i.test(p.status || ''));
  const financeQuotes = inquiries.filter((q) => /pending|review|finance|quote/i.test(q.status || 'Pending'));
  return (
    <AdminPlaceholder title="Finance Queue" lead="Outstanding payments and finance follow-ups.">
      <div className="admin-split-grid">
        <div>
          <h4>Unpaid / due</h4>
          {due.length === 0 ? (
            <EmptyState text="No due payments in queue." />
          ) : (
            <ul className="admin-simple-list">
              {due.map((p) => (
                <li key={p.id}>
                  <strong>{p.label}</strong>
                  <span>
                    ₹{Number(p.amount).toLocaleString('en-IN')} · {p.status}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h4>Quote finance follow-ups</h4>
          {financeQuotes.length === 0 ? (
            <EmptyState text="No finance quote items waiting." />
          ) : (
            <ul className="admin-simple-list">
              {financeQuotes.map((q) => (
                <li key={q.id}>
                  <strong>{q.clientName}</strong>
                  <span>{q.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminPlaceholder>
  );
}

export function AdminDesign() {
  return (
    <AdminPlaceholder title="Design" lead="Drawings, mood boards, and design deliverables.">
      <EmptyState text="Design workspace coming next — upload and review design packs here." />
    </AdminPlaceholder>
  );
}

export function AdminVendors() {
  return (
    <AdminPlaceholder title="Vendors" lead="Suppliers, contractors, and service partners.">
      <EmptyState text="No vendors added yet. Vendor directory will live here." />
    </AdminPlaceholder>
  );
}

export function AdminReports() {
  const { projects, payments, inquiries, clients } = useOutletContext();
  const paidTotal = payments
    .filter((p) => /paid|complete|received/i.test(p.status || ''))
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);
  return (
    <AdminPlaceholder title="Reports" lead="High-level operational snapshot.">
      <div className="admin-metric-row" style={{ marginBottom: 0 }}>
        <article className="admin-metric-card tone-orange">
          <div className="admin-metric-top">
            <span>Clients</span>
          </div>
          <strong>{clients.length}</strong>
          <p>Registered accounts</p>
        </article>
        <article className="admin-metric-card tone-green">
          <div className="admin-metric-top">
            <span>Projects</span>
          </div>
          <strong>{projects.length}</strong>
          <p>Assigned sites</p>
        </article>
        <article className="admin-metric-card tone-blue">
          <div className="admin-metric-top">
            <span>Inquiries</span>
          </div>
          <strong>{inquiries.length}</strong>
          <p>Quote requests</p>
        </article>
        <article className="admin-metric-card tone-purple">
          <div className="admin-metric-top">
            <span>Collected</span>
          </div>
          <strong>₹{Math.round(paidTotal).toLocaleString('en-IN')}</strong>
          <p>Paid amount</p>
        </article>
      </div>
    </AdminPlaceholder>
  );
}

export function AdminAdministration() {
  const { clients, user } = useOutletContext();
  return (
    <AdminPlaceholder title="Administration" lead="Account access and client directory.">
      <div className="admin-split-grid">
        <div>
          <h4>Signed-in admin</h4>
          <ul className="admin-simple-list">
            <li>
              <strong>{user.name || 'Admin User'}</strong>
              <span>{user.email}</span>
            </li>
          </ul>
        </div>
        <div>
          <h4>Client accounts</h4>
          {clients.length === 0 ? (
            <EmptyState text="No client accounts yet." />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>{c.email}</td>
                    <td>{c.phone || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminPlaceholder>
  );
}
