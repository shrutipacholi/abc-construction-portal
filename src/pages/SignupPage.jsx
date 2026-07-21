import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await signup(form);
      navigate('/portal');
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
            <span>Client Access</span>
          </div>
        </Link>
        <div>
          <p className="hero-eyebrow">Start Your Project</p>
          <h1>Create your client account</h1>
          <p style={{ marginTop: '1rem', maxWidth: '36ch' }}>
            After signup you’ll land in the Client Portal to track sites, milestones, payments, and updates.
          </p>
        </div>
        <p>Already registered? Sign in anytime from the login page.</p>
      </aside>

      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <p className="sub">Contact Us leads here — create an account to continue.</p>
          {error ? <div className="form-error">{error}</div> : null}
          <div className="form-stack">
            <label>
              Full name
              <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" />
            </label>
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
              Phone
              <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 ..." />
            </label>
            <label>
              Company / Project
              <input name="company" value={form.company} onChange={onChange} placeholder="Optional" />
            </label>
            <label>
              Password
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                required
                minLength={6}
                placeholder="At least 6 characters"
              />
            </label>
            <button className="btn btn-orange" type="submit" disabled={submitting}>
              {submitting ? 'Creating account…' : 'Create Account'}
            </button>
          </div>
          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
          <p className="auth-switch">
            <Link to="/">← Back to website</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
