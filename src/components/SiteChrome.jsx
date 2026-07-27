import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/#home', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#process', label: 'Process' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#blog', label: 'Blog' },
  { to: '/#careers', label: 'Careers' },
];

const footerLinks = [
  { href: '#about', label: 'Ethics / Code of Conduct' },
  { href: '#about', label: 'Privacy Policy' },
  { href: '#services', label: 'Tools & Resources' },
  { to: '/quotation', label: 'Get Quotation' },
];

function SocialIcons() {
  return (
    <div className="footer-socials" aria-label="Social media">
      <a href="#home" aria-label="Instagram" className="footer-social">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
        </svg>
      </a>
      <a href="#home" aria-label="X" className="footer-social">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 4l6.8 8.7L4.4 20h2.5l5.2-5.9L16.8 20H20l-7-8.9L19.5 4H17l-4.8 5.5L7.2 4H4z"
            fill="currentColor"
          />
        </svg>
      </a>
      <a href="#home" aria-label="YouTube" className="footer-social">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="2.5" y="6" width="19" height="12" rx="4" fill="currentColor" />
          <path d="M10.5 9.5v5l5-2.5-5-2.5z" fill="#fff" />
        </svg>
      </a>
      <a href="#home" aria-label="LinkedIn" className="footer-social">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2.5" fill="currentColor" />
          <path
            d="M8.2 10.2v7.1H6V10.2h2.2zm-1.1-3.5c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2zM18 17.3h-2.2v-3.5c0-.9-.3-1.5-1.2-1.5-.7 0-1.1.4-1.3.9-.1.2-.1.4-.1.7v3.4h-2.2v-7.1h2.2v1c.3-.5 1-1.2 2.3-1.2 1.7 0 2.5 1.1 2.5 3.2v4.1z"
            fill="#fff"
          />
        </svg>
      </a>
      <a href="#home" aria-label="Facebook" className="footer-social">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" fill="currentColor" />
          <path
            d="M13.4 17.5v-5.1h1.7l.3-2h-2v-1.1c0-.6.2-1 1-1h1.1V6.4c-.2 0-.9-.1-1.7-.1-1.7 0-2.8 1-2.8 2.9V10.4H9.3v2h1.7v5.1h2.4z"
            fill="#fff"
          />
        </svg>
      </a>
    </div>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <div className="logo-mark">ABC</div>
          <div className="logo-text">
            <strong>ABC Construction</strong>
            <span>Pvt. Ltd.</span>
          </div>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map((link) => (
            <a key={link.to} href={link.to} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="btn btn-orange"
            type="button"
            onClick={() => {
              setOpen(false);
              navigate('/quotation');
            }}
          >
            Get Quotation
          </button>
          <button className="menu-toggle" type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <nav className="footer-legal" aria-label="Footer">
          {footerLinks.map((item) =>
            item.to ? (
              <NavLink key={item.label} to={item.to}>
                {item.label}
              </NavLink>
            ) : (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ),
          )}
        </nav>
        <SocialIcons />
      </div>

      <div className="container footer-bottom">
        <div className="footer-brand">
          <div className="logo">
            <div className="logo-mark">ABC</div>
            <div className="logo-text">
              <strong>ABC Construction</strong>
              <span>Pvt. Ltd.</span>
            </div>
          </div>
          <p className="footer-tagline">
            <span className="footer-tagline-mark" aria-hidden="true" />
            Building a better future, together
          </p>
        </div>
        <span className="footer-copy">
          Copyright © {new Date().getFullYear()} ABC Construction Pvt. Ltd. All rights reserved
        </span>
      </div>
    </footer>
  );
}
