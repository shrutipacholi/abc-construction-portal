import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(form);
      navigate(user.role === 'admin' ? '/admin' : '/portal');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <aside className="auth-visual">
        <Link to="/" className="logo">
          <div className="logo-mark">ABC</div>
          <div className="logo-text">
            <strong>ABC Construction</strong>
            <span>Client Portal</span>
          </div>
        </Link>
        <div>
          <p className="hero-eyebrow">Welcome Back</p>
          <h1>Log in to your portal</h1>
          <p style={{ marginTop: '1rem', maxWidth: '36ch' }}>
            Clients track personal projects. Admins manage the portfolio console.
          </p>
        </div>
        <p>Admin demo: admin@abcconstruction.com / Admin@123</p>
      </aside>

      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit}>
          <h2>Log In</h2>
          <p className="sub">Access your construction project dashboard.</p>
          {error ? <div className="form-error">{error}</div> : null}
          <div className="form-stack">
            <label>
              Email
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                placeholder="you@company.com"
              />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                required
                placeholder="Your password"
              />
            </label>
            <button className="btn btn-orange" type="submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Enter Portal'}
            </button>
          </div>
          <p className="auth-switch">
            New client? <Link to="/signup">Create an account</Link>
          </p>
          <p className="auth-switch">
            <Link to="/">← Back to website</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
