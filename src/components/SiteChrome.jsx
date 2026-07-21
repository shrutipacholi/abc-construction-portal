import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/#home', label: 'Home' },
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#blog', label: 'Blog' },
  { to: '/#careers', label: 'Careers' },
  { to: '/#contact', label: 'Contact' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="topbar-left">
            <span>info@abcconstruction.com</span>
            <span>Mon–Sat, 9:00 AM–6:00 PM</span>
            <span>+91 XXXXX XXXXX</span>
          </div>
          <div className="socials">
            <a href="#contact" aria-label="Facebook">Fb</a>
            <a href="#contact" aria-label="X">X</a>
            <a href="#contact" aria-label="Instagram">Ig</a>
            <a href="#contact" aria-label="YouTube">Yt</a>
          </div>
        </div>
      </div>

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
            <span className="header-phone">+91 XXXXX XXXXX</span>
            {user ? (
              <button className="btn btn-orange" type="button" onClick={() => navigate('/portal')}>
                Client Portal
              </button>
            ) : (
              <button className="btn btn-orange" type="button" onClick={() => navigate('/signup')}>
                Contact Us
              </button>
            )}
            <button className="menu-toggle" type="button" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
              ☰
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="logo" style={{ marginBottom: '1rem' }}>
            <div className="logo-mark">ABC</div>
            <div className="logo-text">
              <strong>ABC Construction</strong>
              <span>Building Quality & Trust</span>
            </div>
          </div>
          <p>
            We deliver residential, commercial, industrial, and infrastructure projects with excellence,
            safety, and timely delivery.
          </p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#process">Our Process</a></li>
          </ul>
        </div>
        <div>
          <h4>Client Access</h4>
          <ul>
            <li><NavLink to="/signup">Create Account</NavLink></li>
            <li><NavLink to="/login">Client Login</NavLink></li>
            <li><NavLink to="/portal">Portal Dashboard</NavLink></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li>info@abcconstruction.com</li>
            <li>+91 XXXXX XXXXX</li>
            <li>Mon–Sat, 9:00 AM–6:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} ABC Construction Pvt. Ltd.</span>
        <span>Quality · Safety · Transparency</span>
      </div>
    </footer>
  );
}
