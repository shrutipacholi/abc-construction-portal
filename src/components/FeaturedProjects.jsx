import { useMemo, useState } from 'react';

const projects = [
  // Residential (6)
  {
    title: 'Luxury Villas',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Modern Residences',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Palm Court Homes',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Garden Estate Villa',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Hillside Family Home',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Urban Townhouse',
    tag: 'Residential',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  // Commercial (3+)
  {
    title: 'Corporate Offices',
    tag: 'Commercial',
    img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Business Hub Tower',
    tag: 'Commercial',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Retail Plaza',
    tag: 'Commercial',
    img: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80',
  },
  // Interior (4)
  {
    title: 'Interior Suites',
    tag: 'Interior',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Dining Lounge',
    tag: 'Interior',
    img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Executive Workspace',
    tag: 'Interior',
    img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Living Lounge',
    tag: 'Interior',
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
  },
  // Industrial (3+)
  {
    title: 'Industrial Warehouses',
    tag: 'Industrial',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Logistics Facility',
    tag: 'Industrial',
    img: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Plant Expansion',
    tag: 'Industrial',
    img: 'https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&w=1200&q=80',
  },
  // Buildings (3+)
  {
    title: 'Concrete Landmark',
    tag: 'Buildings',
    img: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'School Campuses',
    tag: 'Buildings',
    img: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Hospital Buildings',
    tag: 'Buildings',
    img: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
];

const filters = ['All projects', 'Residential', 'Commercial', 'Interior', 'Industrial', 'Buildings'];

export default function FeaturedProjects() {
  const [filter, setFilter] = useState('All projects');
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    if (filter === 'All projects') return projects;
    return projects.filter((p) => p.tag === filter);
  }, [filter]);

  const pageSize = 3;
  const maxPage = Math.max(0, Math.ceil(filtered.length / pageSize) - 1);
  const safePage = Math.min(page, maxPage);
  const visible = filtered.slice(safePage * pageSize, safePage * pageSize + pageSize);

  const setFilterAndReset = (next) => {
    setFilter(next);
    setPage(0);
  };

  return (
    <section className="section featured-projects" id="projects">
      <div className="container">
        <div className="featured-projects-head">
          <div className="featured-projects-title-wrap">
            <p className="section-label">Featured Projects</p>
            <h2 className="featured-projects-title">
              Recent
              <span>projects</span>
            </h2>
          </div>
          <div className="featured-project-filters" role="tablist" aria-label="Project categories">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={filter === item}
                className={`featured-filter-btn${filter === item ? ' is-active' : ''}`}
                onClick={() => setFilterAndReset(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="featured-projects-grid">
          {visible.map((project) => (
            <article className="featured-project-card" key={`${project.title}-${project.img}`}>
              <img src={project.img} alt={project.title} loading="lazy" />
              <div className="featured-project-overlay">
                <p>{project.tag}</p>
                <h3>{project.title}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="featured-projects-nav">
          <button
            type="button"
            className="featured-nav-btn"
            aria-label="Previous projects"
            disabled={safePage <= 0}
            onClick={() => setPage((p) => Math.max(0, p - 1))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="featured-nav-btn"
            aria-label="Next projects"
            disabled={safePage >= maxPage}
            onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
