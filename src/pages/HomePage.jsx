import { Link } from 'react-router-dom';
import SiteHeader, { SiteFooter } from '../components/SiteChrome';

const services = [
  'Residential Construction',
  'Commercial Construction',
  'Industrial Construction',
  'Infrastructure',
  'Interior Design',
  'Architecture & Planning',
  'Project Management',
];

const whyUs = [
  'Experienced Engineers',
  'Expert Architects',
  'On-Time Delivery',
  'Quality Materials',
  'Transparent Pricing',
  'Safety Standards',
  'Modern Technology',
  'Dedicated Project Manager',
  'Customer-Centric Approach',
  '24×7 Support',
];

const processIcons = {
  consultation: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="8" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 18c.9-2.6 2.4-4 3.5-4s2.6 1.4 3.5 4M12.5 18c.9-2.6 2.4-4 3.5-4s2.6 1.4 3.5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 5.5c1.2-1.4 2.8-1.4 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  inspection: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4.5" y="3" width="11" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.5 7h5M7.5 10.5h5M7.5 14h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.5" cy="15.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18.8 17.8L21 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  analysis: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h7l4 4v14H7z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M14 3v4h4M9 12h6M9 15.5h4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16.5" cy="16.5" r="2.8" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  design: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18l9-9 3 3-9 9H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M11.5 10.5l3 3M5 7h5M5 7v5M16 5l3 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  cost: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.5 8.2h3.2c1.1 0 2 .7 2 1.7s-.9 1.7-2 1.7H11v1.4h1.7c1.1 0 2 .7 2 1.7s-.9 1.7-2 1.7H9.5M12.5 7.2v1M12.5 16.8v1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  agreement: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3.5 13c2.2-1.4 4.5-1.5 6.5.8 2-2.3 4.3-2.4 6.5-.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 13.2v4.3c2-.9 4-.9 6 1 2-1.9 4-1.9 6-1v-4.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8.2 9.2c1-1.6 2.6-2 3.8-.5M15.8 9.2c-1-1.6-2.6-2-3.8-.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  construction: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 20V11l4-3 4 3v9M12 20V9l4-3 4 3v11M3 20h18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M15 3v4M13.2 5h3.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 4h9a2 2 0 012 2v12l-2.2-1.4L12.6 18 10.4 16.6 8.2 18 6 16.6V6a2 2 0 012-2z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 8.2l1.4 2.8 3 .4-2.2 2.2.6 3L12 15.2 9.2 16.6l.6-3-2.2-2.2 3-.4z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  handover: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12.5c0-2.8 2.2-5 5-5h1c2.1 0 3.9 1.3 4.6 3.2L19 12v4.5H5z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="15.8" cy="18" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M15.8 15.8V13.5h2.8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="10" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 13.5v2a2.2 2.2 0 002.2 2.2H10M18 13.5v2a2.2 2.2 0 01-2.2 2.2H14M7.2 11.5A5 5 0 0112 7a5 5 0 014.8 4.5M10.2 17.8h3.6v1.4a1.8 1.8 0 01-3.6 0z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const processSteps = [
  {
    title: 'Consultation',
    text: 'Understanding your needs & expectations.',
    x: 110,
    y: 150,
    card: 'top',
    icon: processIcons.consultation,
  },
  {
    title: 'Site Inspection',
    text: 'Visiting the site & evaluating conditions.',
    x: 240,
    y: 330,
    card: 'bottom',
    icon: processIcons.inspection,
  },
  {
    title: 'Requirement Analysis',
    text: 'Analyzing requirements & project scope.',
    x: 370,
    y: 150,
    card: 'top',
    icon: processIcons.analysis,
  },
  {
    title: 'Planning & Design',
    text: 'Creating smart plans & innovative designs.',
    x: 500,
    y: 330,
    card: 'bottom',
    icon: processIcons.design,
  },
  {
    title: 'Cost Estimation',
    text: 'Providing accurate cost estimates.',
    x: 630,
    y: 150,
    card: 'top',
    icon: processIcons.cost,
  },
  {
    title: 'Agreement',
    text: 'Finalizing terms & signing agreement.',
    x: 760,
    y: 330,
    card: 'bottom',
    icon: processIcons.agreement,
  },
  {
    title: 'Construction',
    text: 'Executing construction with quality & safety.',
    x: 890,
    y: 150,
    card: 'top',
    icon: processIcons.construction,
  },
  {
    title: 'Quality Inspection',
    text: 'Rigorous quality checks at every stage.',
    x: 1020,
    y: 330,
    card: 'bottom',
    icon: processIcons.quality,
  },
  {
    title: 'Project Handover',
    text: 'Delivering the project on time, as promised.',
    x: 1150,
    y: 150,
    card: 'top',
    icon: processIcons.handover,
  },
  {
    title: 'After-Sales Support',
    text: 'Providing ongoing support & complete satisfaction.',
    x: 1280,
    y: 330,
    card: 'bottom',
    icon: processIcons.support,
  },
];

const PROCESS_VB = { w: 1380, h: 480 };
const PROCESS_ROAD =
  'M40 330 C70 330 90 150 110 150 S190 330 240 330 S310 150 370 150 S440 330 500 330 S570 150 630 150 S700 330 760 330 S830 150 890 150 S960 330 1020 330 S1090 150 1150 150 S1220 330 1280 330 L1340 330';


const projects = [
  {
    title: 'Luxury Villas',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Corporate Offices',
    tag: 'Commercial',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Shopping Malls',
    tag: 'Retail',
    img: '/images/shopping-mall.png',
  },
  {
    title: 'Industrial Warehouses',
    tag: 'Industrial',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'School Campuses',
    tag: 'Institutional',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Hospital Buildings',
    tag: 'Healthcare',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80',
  },
];

const blogs = [
  'Construction Trends',
  'Green Buildings',
  'Smart Homes',
  'Cost Saving Tips',
  'Modern Architecture',
  'Construction Safety',
];

const careers = [
  'Civil Engineer',
  'Site Engineer',
  'Project Manager',
  'Quantity Surveyor',
  'Architect',
  'Interior Designer',
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Project duration depends on scope, site conditions, and approvals. After consultation we share a clear timeline.',
  },
  {
    q: 'Do you provide design services?',
    a: 'Yes. We offer architecture & planning, interior design, and full project management support.',
  },
  {
    q: 'Can clients track progress online?',
    a: 'Absolutely. After signup and login, the Client Portal shows milestones, photos, payments, documents, and chat.',
  },
  {
    q: 'Do you provide detailed cost estimates?',
    a: 'Yes. Cost estimation is a core step in our process before agreement and construction begin.',
  },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <p className="hero-eyebrow hero-anim hero-anim-eyebrow">Excellence In Every Build</p>
            <h1 className="hero-anim hero-anim-title">
              Building the Future with <em>Quality & Trust.</em>
            </h1>
            <p className="hero-anim hero-anim-lead">
              We deliver high-quality residential, commercial, industrial, and infrastructure projects with
              excellence, safety, and timely delivery.
            </p>
            <div className="hero-ctas">
              <Link className="btn btn-orange" to="/signup">
                Get a Free Quote
              </Link>
              <a className="btn btn-ghost" href="#projects">
                Our Projects
              </a>
            </div>
            <div className="trust-bar">
              <strong>Trusted by 120+ businesses</strong>
              <div className="trust-logos">
                <span>Atlas Infra</span>
                <span>Northpeak</span>
                <span>Vertex Realty</span>
                <span>UrbanForm</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="container grid-2">
            <div>
              <p className="section-label">About Us</p>
              <h2 className="section-title">Our Reputation Is as Solid as Concrete</h2>
              <p className="section-lead">
                ABC Construction Pvt. Ltd. specializes in residential, commercial, industrial, and infrastructure
                projects with a focus on quality, transparency, and customer satisfaction.
              </p>
              <p className="section-lead">
                From consultation to handover and after-sales support, our engineers, architects, and site teams
                keep every stakeholder aligned.
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Link className="btn btn-orange" to="/signup">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="about-media">
              <img
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1000&q=80"
                alt="Construction engineer on site"
              />
              <div className="about-badge">
                20+
                <small>Years Experience</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <p className="section-label">Company Services</p>
            <h2 className="section-title">Services For Every Project.</h2>
            <div className="grid-3" style={{ marginTop: '2.5rem' }}>
              {services.map((service, i) => (
                <article className="service-card" key={service}>
                  <div className="icon">{String(i + 1).padStart(2, '0')}</div>
                  <h3>{service}</h3>
                  <p>End-to-end delivery with quality materials, safety standards, and dedicated project managers.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="why-us" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <p className="section-label">Why Choose Us</p>
            <h2 className="section-title">Built Around Reliability.</h2>
            <div className="grid-4" style={{ marginTop: '2.5rem' }}>
              {whyUs.map((item) => (
                <article className="why-card" key={item}>
                  <h3>{item}</h3>
                  <p>A core promise across sites, teams, and client engagements.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section process-map" id="process">
          <div className="container">
            <div className="process-map-header">
              <p className="section-label">Our Process</p>
              <h2 className="process-map-title">
                From <span>Consultation</span> to <span>After-Sales.</span>
              </h2>
              <p className="process-map-subtitle">Building with Trust. Delivering Beyond Expectations.</p>
            </div>

            <div className="process-map-board" style={{ aspectRatio: `${PROCESS_VB.w} / ${PROCESS_VB.h}` }}>
              <div className="process-map-decor" aria-hidden="true">
                <svg className="process-decor process-decor-crane" viewBox="0 0 220 160">
                  <path d="M20 140h60l8-40h20l-6 40h50" fill="none" stroke="#cfc8bf" strokeWidth="3" />
                  <path d="M48 100V28h8v20l70-8v8L56 56v44" fill="none" stroke="#b7aea3" strokeWidth="3" />
                  <path d="M120 40v20M120 40h40" fill="none" stroke="#f15a24" strokeWidth="3" strokeLinecap="round" />
                  <rect x="150" y="58" width="18" height="14" fill="#f15a24" opacity="0.55" />
                </svg>
                <svg className="process-decor process-decor-house" viewBox="0 0 260 150">
                  <path d="M30 120 V70 l50-28 50 28v50z" fill="#ebe6df" stroke="#cfc8bf" strokeWidth="2" />
                  <path d="M130 120 V78 l40-22 40 22v42z" fill="#f3efe9" stroke="#cfc8bf" strokeWidth="2" />
                  <rect x="52" y="88" width="18" height="32" fill="#f15a24" opacity="0.35" />
                  <rect x="156" y="92" width="16" height="28" fill="#f15a24" opacity="0.28" />
                  <path d="M20 120h220" stroke="#d9d2c8" strokeWidth="3" />
                </svg>
                <svg className="process-decor process-decor-skyline" viewBox="0 0 280 100">
                  <path
                    d="M10 90V55h18v35M35 90V40h22v50M64 90V58h16v32M88 90V28h28v62M124 90V48h20v42M152 90V36h26v54M186 90V60h18v30M212 90V44h24v46M244 90V52h20v38"
                    fill="none"
                    stroke="#d7d0c7"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <svg
                className="process-map-svg"
                viewBox={`0 0 ${PROCESS_VB.w} ${PROCESS_VB.h}`}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <path className="process-road-edge" d={PROCESS_ROAD} />
                <path className="process-road-base" d={PROCESS_ROAD} />
                <path className="process-road-dash" d={PROCESS_ROAD} />

                <g className="process-cones">
                  <path d="M180 240 l7 18 h-14z" fill="#f15a24" />
                  <path d="M176 248h14" stroke="#fff" strokeWidth="2" />
                  <path d="M690 250 l7 18 h-14z" fill="#f15a24" />
                  <path d="M686 258h14" stroke="#fff" strokeWidth="2" />
                  <path d="M1120 250 l7 18 h-14z" fill="#f15a24" />
                  <path d="M1116 258h14" stroke="#fff" strokeWidth="2" />
                </g>

                <g className="process-start">
                  <circle cx="40" cy="330" r="18" fill="#fff" stroke="#e53935" strokeWidth="4" />
                  <circle cx="40" cy="330" r="10" fill="none" stroke="#e53935" strokeWidth="2.2" />
                  <text x="40" y="364" textAnchor="middle" className="process-start-label">
                    START
                  </text>
                </g>

                <polygon className="process-end-arrow" points="1365,330 1335,312 1335,348" />

                {processSteps.map((step, index) => (
                  <g key={step.title} className="process-pin">
                    <circle cx={step.x} cy={step.y} r="20" fill="#f5c400" stroke="#111" strokeWidth="2.2" />
                    <circle cx={step.x} cy={step.y} r="14" fill="#fff" />
                    <text
                      x={step.x}
                      y={step.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="process-pin-num"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </text>
                  </g>
                ))}
              </svg>

              {processSteps.map((step, index) => (
                <article
                  className={`process-step-card process-card-${step.card}`}
                  key={step.title}
                  style={{
                    left: `${(step.x / PROCESS_VB.w) * 100}%`,
                    top: `${(step.y / PROCESS_VB.h) * 100}%`,
                  }}
                >
                  <span className="process-step-icon">{step.icon}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <ol className="process-map-mobile">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="process-mobile-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="process-step-icon process-mobile-icon">{step.icon}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="projects">
          <div className="container">
            <p className="section-label">Featured Projects</p>
            <h2 className="section-title">Work That Speaks for Itself.</h2>
            <div className="grid-3" style={{ marginTop: '2.5rem' }}>
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <img src={project.img} alt={project.title} />
                  <div className="tag">{project.tag}</div>
                  <h3>{project.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section stats" id="achievements">
          <div className="container grid-4">
            {[
              ['500+', 'Completed Projects'],
              ['20+', 'Years Experience'],
              ['250+', 'Professionals'],
              ['98%', 'Client Satisfaction'],
            ].map(([value, label]) => (
              <div className="stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section testimonials" id="testimonials">
          <div className="container">
            <p className="section-label">Testimonials</p>
            <h2 className="section-title">Clients Who Trust Our Craft.</h2>
            <div className="grid-3" style={{ marginTop: '2.5rem' }}>
              <article className="testimonial-card">
                <p>“Professional team with exceptional workmanship.”</p>
                <footer>— Residential Client</footer>
              </article>
              <article className="testimonial-card">
                <p>“Excellent quality and transparent communication.”</p>
                <footer>— Villa Owner</footer>
              </article>
              <article className="testimonial-card">
                <p>“Highly recommended for commercial projects.”</p>
                <footer>— Corporate Partner</footer>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="safety">
          <div className="container grid-2">
            <div>
              <p className="section-label">Safety & Quality</p>
              <h2 className="section-title">Standards You Can Stand On.</h2>
              <p className="section-lead">
                Strict adherence to national and international quality and safety standards across every site,
                engineer assignment, and handover package.
              </p>
            </div>
            <div className="about-media">
              <img
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1000&q=80"
                alt="Construction safety on site"
              />
            </div>
          </div>
        </section>

        <section className="section" id="careers" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <p className="section-label">Careers</p>
            <h2 className="section-title">Build Your Career With Us.</h2>
            <div className="grid-3" style={{ marginTop: '2.5rem' }}>
              {careers.map((role) => (
                <article className="why-card" key={role}>
                  <h3>{role}</h3>
                  <p>Join teams managing multi-site delivery across residential and commercial work.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="blog">
          <div className="container">
            <p className="section-label">Blog</p>
            <h2 className="section-title">Insights From the Field.</h2>
            <div className="grid-3" style={{ marginTop: '2.5rem' }}>
              {blogs.map((title) => (
                <article className="blog-card" key={title}>
                  <h3>{title}</h3>
                  <p>Practical notes for owners, developers, and project stakeholders.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="faq" style={{ background: 'var(--paper)' }}>
          <div className="container">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Answers Before You Build.</h2>
            <div className="grid-2" style={{ marginTop: '2.5rem', alignItems: 'stretch' }}>
              {faqs.map((item) => (
                <article className="faq-item" key={item.q}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container grid-2">
            <div>
              <p className="section-label">Contact</p>
              <h2 className="section-title">Ready to Start Your Project?</h2>
              <p className="section-lead">
                Phone: +91 XXXXX XXXXX<br />
                Email: info@abcconstruction.com<br />
                Hours: Mon–Sat, 9:00 AM–6:00 PM
              </p>
              <p className="section-lead">
                Click Contact Us to create a client account. After signup and login, you’ll enter the Client Portal
                to track progress, milestones, payments, documents, and messages.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <Link className="btn btn-orange" to="/signup">
                  Contact Us
                </Link>
                <Link className="btn btn-outline" to="/login">
                  Client Login
                </Link>
              </div>
            </div>
            <div className="panel">
              <h3>Client Portal Includes</h3>
              <ul style={{ display: 'grid', gap: '0.65rem' }}>
                {[
                  'Track progress & milestones',
                  'Photos / videos updates',
                  'Payments & invoices',
                  'Documents & certificates',
                  'Chat with managers',
                  'Notifications & reports',
                ].map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section cta-band">
          <div className="container">
            <h2>50+ Ongoing Projects. Let’s Add Yours.</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Create your account to request a quote and access the client portal.
            </p>
            <Link className="btn btn-white" to="/signup">
              Get In Touch
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
