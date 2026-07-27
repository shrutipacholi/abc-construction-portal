import { Link } from 'react-router-dom';
import SiteHeader, { SiteFooter } from '../components/SiteChrome';
import ProcessRoadmap from '../components/ProcessRoadmap';
import FeaturedProjects from '../components/FeaturedProjects';
import HeroShowcase from '../components/HeroShowcase';

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
    q: 'How do I request a quotation?',
    a: 'Use the Get Quotation button in the header to create a quotation request. Our team will follow up with next steps.',
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
        <HeroShowcase />

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
                <Link className="btn btn-orange" to="/quotation">
                  Get Quotation
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
            <div className="grid-3 services-grid" style={{ marginTop: '2.5rem' }}>
              {services.map((service, i) => (
                <article
                  className={`service-card${i === 6 ? ' service-card-center' : ''}`}
                  key={service}
                >
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
            <div className="grid-4 why-grid" style={{ marginTop: '2.5rem' }}>
              {whyUs.map((item, i) => (
                <article
                  className={`why-card${i >= 8 ? ' why-card-bottom' : ''}`}
                  key={item}
                >
                  <h3>{item}</h3>
                  <p>A core promise across sites, teams, and client engagements.</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ProcessRoadmap />

        <FeaturedProjects />

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
            <h2 className="section-title">Testimonials From Real Customers</h2>
            <div className="grid-3 testimonials-grid">
              {[
                {
                  text: 'Professional team with exceptional workmanship. They kept every milestone on schedule and the finish quality exceeded our expectations.',
                  name: 'ananya.sharma',
                  role: 'Residential Client',
                },
                {
                  text: 'Excellent quality and transparent communication throughout. Progress updates, payments, and site photos were always clear in the portal.',
                  name: 'rohan.mehta',
                  role: 'Villa Owner',
                },
                {
                  text: 'Highly recommended for commercial projects. Strong project management, safety standards, and a delivery we could trust.',
                  name: 'meera.iyer',
                  role: 'Corporate Partner',
                },
              ].map((item) => (
                <article className="testimonial-card" key={item.name}>
                  <div className="testimonial-top">
                    <span className="testimonial-quote" aria-hidden="true">
                      “
                    </span>
                    <div className="testimonial-stars" aria-label="5 star rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M10 1.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L10 13.8 5.2 16.4l.9-5.4L2.2 7.2l5.4-.8L10 1.5z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p>{item.text}</p>
                  <footer className="testimonial-author">
                    <span className="testimonial-avatar" aria-hidden="true">
                      {item.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span>
                      By <strong>{item.name}</strong>
                      <small>{item.role}</small>
                    </span>
                  </footer>
                </article>
              ))}
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

        <section className="section cta-band">
          <div className="container">
            <h2>50+ Ongoing Projects. Let’s Add Yours.</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Request a quotation to start planning your next build.
            </p>
            <Link className="btn btn-white" to="/quotation">
              Get Quotation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
