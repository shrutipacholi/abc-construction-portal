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

const process = [
  'Consultation',
  'Site Inspection',
  'Requirement Analysis',
  'Planning & Design',
  'Cost Estimation',
  'Agreement',
  'Construction',
  'Quality Inspection',
  'Project Handover',
  'After-Sales Support',
];

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

        <section className="section process" id="process">
          <div className="container">
            <p className="section-label">Our Process</p>
            <h2 className="section-title">From Consultation to After-Sales.</h2>
            <div className="process-track">
              {process.map((step, index) => (
                <article className="process-step" key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3 style={{ fontSize: '1.2rem', textTransform: 'uppercase' }}>{step}</h3>
                </article>
              ))}
            </div>
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
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.6rem' }}>{item.q}</h3>
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
