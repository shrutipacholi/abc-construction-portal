import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteHeader, { SiteFooter } from '../components/SiteChrome';

const initialForm = {
  name: '',
  mobile: '',
  email: '',
  address: '',
};

export default function QuotationPage() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const name = form.name.trim();
    const mobile = form.mobile.trim();
    const email = form.email.trim();
    const address = form.address.trim();

    if (!name || !mobile || !email) {
      setError('Name, mobile number, and email are required.');
      return;
    }

    setBusy(true);
    try {
      const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/quotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, email, address }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.message || 'Could not submit quotation');
      }
      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      setError(err.message || 'Could not reach the Java API.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <SiteHeader />
      <main className="section quotation-page">
        <div className="container quotation-wrap">
          <p className="section-label">Quotations</p>
          <h1 className="section-title">Get Quotation</h1>
          <p className="section-lead">
            Enter your details below and our team will get back to you shortly.
          </p>

          <form className="auth-card quotation-card" onSubmit={onSubmit} noValidate>
            {error ? <div className="form-error">{error}</div> : null}

            <div className="form-stack">
              <label>
                Name <span className="req-star" aria-hidden="true">*</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  placeholder="Your full name"
                  autoComplete="name"
                />
              </label>
              <label>
                Mobile <span className="req-star" aria-hidden="true">*</span>
                <input
                  name="mobile"
                  type="tel"
                  value={form.mobile}
                  onChange={onChange}
                  required
                  placeholder="+91 XXXXX XXXXX"
                  autoComplete="tel"
                />
              </label>
              <label>
                Email 
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>
              <label>
                Address
                <textarea
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  rows={3}
                  placeholder="Site / correspondence address"
                />
              </label>
            </div>

            <button className="btn btn-orange" type="submit" disabled={busy} style={{ width: '100%', marginTop: '1.25rem' }}>
              {busy ? 'Submitting…' : 'Get Quotation'}
            </button>

            {success ? (
              <div className="quotation-success" style={{ marginTop: '1.1rem' }}>
                Your quotation will be sent to your mobile number or email. Our team will connect
                with you shortly for further assistance.
              </div>
            ) : null}

            <p className="quotation-back">
              <Link to="/">← Back to Home</Link>
            </p>
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
