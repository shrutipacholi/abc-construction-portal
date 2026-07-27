import { useState } from 'react';

const steps = [
  {
    n: 1,
    title: 'Consultation',
    text: 'Understanding your needs & expectations.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="9" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="9" r="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4.5 18c.8-2.5 2.2-3.8 3.5-3.8S11 15.5 11.8 18M12.2 18c.8-2.5 2.2-3.8 3.5-3.8S19 15.5 19.5 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 5.2c1-1.2 2.5-1.2 3.5 0" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 2,
    title: 'Site Inspection',
    text: 'Visiting the site & evaluating conditions.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="3" width="11" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7.5 7h5M7.5 10.5h5M7.5 14h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16.5" cy="15.5" r="3.1" fill="none" stroke="#f15a24" strokeWidth="1.6" />
        <path d="M18.8 17.8L21 20" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 3,
    title: 'Requirement Analysis',
    text: 'Analyzing requirements & project scope.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 3h7l4 4v14H7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M14 3v4h4M9 12h5M9 15h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="16.2" cy="16.2" r="2.6" fill="none" stroke="#f15a24" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    n: 4,
    title: 'Planning & Design',
    text: 'Creating smart plans & innovative designs.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 18l9-9 3 3-9 9H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M11.5 10.5l3 3M5 7h5M5 7v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M16 5l3 3" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 5,
    title: 'Cost Estimation',
    text: 'Providing accurate cost estimates.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 8.2h3.2c1.1 0 2 .7 2 1.7s-.9 1.7-2 1.7H11v1.4h1.7c1.1 0 2 .7 2 1.7s-.9 1.7-2 1.7H9.5" fill="none" stroke="#f15a24" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 6,
    title: 'Agreement',
    text: 'Finalizing terms & signing agreement.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3.5 13c2.2-1.4 4.5-1.5 6.5.8 2-2.3 4.3-2.4 6.5-.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M4 13.2v4.3c2-.9 4-.9 6 1 2-1.9 4-1.9 6-1v-4.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8.2 9.2c1-1.6 2.6-2 3.8-.5M15.8 9.2c-1-1.6-2.6-2-3.8-.5" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 7,
    title: 'Construction',
    text: 'Executing construction with quality & safety.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 20V11l4-3 4 3v9M12 20V9l4-3 4 3v11M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M15 3v4M13.2 5h3.6" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 8,
    title: 'Quality Inspection',
    text: 'Rigorous quality checks at every stage.',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h9a2 2 0 012 2v12l-2.2-1.4L12.6 18 10.4 16.6 8.2 18 6 16.6V6a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9.5 11.5l1.8 1.8 3.4-3.6" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: 9,
    title: 'Project Handover',
    text: 'Delivering the project on time, as promised.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 12.5c0-2.8 2.2-5 5-5h1c2.1 0 3.9 1.3 4.6 3.2L19 12v4.5H5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="15.8" cy="18" r="2.2" fill="none" stroke="#f15a24" strokeWidth="1.6" />
        <path d="M15.8 15.8V13.5h2.8" fill="none" stroke="#f15a24" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: 10,
    title: 'After-Sales Support',
    text: 'Providing ongoing support & complete satisfaction.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="10" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M6 13.5v2a2.2 2.2 0 002.2 2.2H10M18 13.5v2a2.2 2.2 0 01-2.2 2.2H14M7.2 11.5A5 5 0 0112 7a5 5 0 014.8 4.5M10.2 17.8h3.6v1.4a1.8 1.8 0 01-3.6 0z" fill="none" stroke="#f15a24" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function ProcessRoadmap() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState(null);
  const shownIndex = hover ?? active;
  const shown = steps[shownIndex];

  return (
    <section className="section process-roadmap" id="process">
      <div className="container">
        <header className="process-interactive-header">
          <p className="section-label">Our Process</p>
          <h2 className="process-interactive-title">
            From <span>Consultation</span> to <span>After-Sales.</span>
          </h2>
          <p className="process-interactive-lead">
            Building with Trust. Delivering Beyond Expectations. Hover or click any step to see that stage.
          </p>
        </header>

        <div className="process-interactive">
          <div className="process-interactive-media" aria-live="polite">
            {steps.map((step, index) => (
              <img
                key={step.n}
                src={step.image}
                alt={step.title}
                className={`process-interactive-img${shownIndex === index ? ' is-active' : ''}`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <div className="process-interactive-caption" key={shown.n}>
              <span className="process-interactive-badge">{String(shown.n).padStart(2, '0')}</span>
              <div>
                <h3>{shown.title}</h3>
                <p>{shown.text}</p>
              </div>
            </div>
          </div>

          <div className="process-interactive-steps" role="list">
            {steps.map((step, index) => (
              <button
                key={step.n}
                type="button"
                role="listitem"
                className={`process-step-btn${active === index ? ' is-active' : ''}${hover === index ? ' is-hover' : ''}`}
                onClick={() => setActive(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                aria-pressed={active === index}
              >
                <span className="process-step-num">{String(step.n).padStart(2, '0')}</span>
                <span className="process-step-icon">{step.icon}</span>
                <span className="process-step-copy">
                  <strong>{step.title}</strong>
                  <em>{step.text}</em>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
