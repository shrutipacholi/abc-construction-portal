import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const SLIDE_MS = 9000;

const slides = [
  {
    id: 'excellence',
    tab: 'Building Excellence',
    eyebrow: 'Excellence In Every Build',
    title: 'Building the Future with Quality & Trust.',
    lead: 'We deliver high-quality residential, commercial, industrial, and infrastructure projects with excellence, safety, and timely delivery.',
    cta: 'Get Quotation',
    ctaTo: '/quotation',
    poster: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-building-construction-site-1591/1080p.mp4',
  },
  {
    id: 'commercial',
    tab: 'Commercial Sites',
    eyebrow: 'Commercial Construction',
    title: 'Complex Sites. Clear Delivery.',
    lead: 'From corporate campuses to retail plazas, our teams keep schedules tight, stakeholders aligned, and quality non-negotiable.',
    cta: 'Our Projects',
    ctaTo: '/#projects',
    poster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-looking-up-at-a-skyscraper-4165/1080p.mp4',
  },
  {
    id: 'industrial',
    tab: 'Industrial Works',
    eyebrow: 'Industrial & Infrastructure',
    title: 'Strength Where It Matters Most.',
    lead: 'Warehouses, plants, and infrastructure built with modern methods, safety discipline, and transparent progress tracking.',
    cta: 'Get Quotation',
    ctaTo: '/quotation',
    poster: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-a-construction-site-with-a-crane-5615/1080p.mp4',
  },
];

export default function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const videoRefs = useRef([]);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goTo = (index) => {
    setActive((index + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && playing && !reduceMotion) {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise?.catch) playPromise.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, playing, reduceMotion]);

  useEffect(() => {
    if (!playing || reduceMotion) return undefined;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [active, playing, reduceMotion, progressKey]);

  const slide = slides[active];

  return (
    <section className="hero hero-showcase" id="home" aria-roledescription="carousel">
      <div className="hero-media" aria-hidden="true">
        {slides.map((item, index) => (
          <div
            key={item.id}
            className={`hero-slide${index === active ? ' is-active' : ''}`}
          >
            {!reduceMotion ? (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="hero-video"
                src={item.video}
                poster={item.poster}
                muted
                playsInline
                preload={index === 0 ? 'auto' : 'metadata'}
              />
            ) : (
              <img className="hero-video" src={item.poster} alt="" />
            )}
          </div>
        ))}
        <div className="hero-media-shade" />
        <div className="hero-media-accent" />
      </div>

      <div className="container hero-content">
        <div key={slide.id} className="hero-copy">
          <p className="hero-eyebrow hero-anim hero-anim-eyebrow">
            <span className="hero-eyebrow-line" aria-hidden="true" />
            {slide.eyebrow}
          </p>
          <h1 className="hero-anim hero-anim-title">{slide.title}</h1>
          <p className="hero-anim hero-anim-lead">{slide.lead}</p>
          <div className="hero-ctas">
            {slide.ctaTo.startsWith('/#') ? (
              <a className="hero-story-link" href={slide.ctaTo}>
                {slide.cta}
                <span aria-hidden="true" />
              </a>
            ) : (
              <Link className="hero-story-link" to={slide.ctaTo}>
                {slide.cta}
                <span aria-hidden="true" />
              </Link>
            )}
            <a className="btn btn-ghost" href="#projects">
              View Work
            </a>
          </div>
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

      <div className="hero-story-bar">
        <div className="container hero-story-inner">
          <div className="hero-story-tabs" role="tablist" aria-label="Featured stories">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                className={`hero-story-tab${index === active ? ' is-active' : ''}`}
                onClick={() => {
                  goTo(index);
                  setPlaying(true);
                }}
              >
                <span className="hero-story-tab-label">{item.tab}</span>
                {index === active && playing && !reduceMotion ? (
                  <span
                    key={progressKey}
                    className="hero-story-progress"
                    style={{ animationDuration: `${SLIDE_MS}ms` }}
                  />
                ) : null}
                {index === active && (!playing || reduceMotion) ? (
                  <span className="hero-story-progress is-solid" />
                ) : null}
              </button>
            ))}
          </div>

          <div className="hero-story-controls">
            <button
              type="button"
              className="hero-play-btn"
              aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
              onClick={() => setPlaying((v) => !v)}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" fill="currentColor" />
                </svg>
              )}
            </button>
            <button
              type="button"
              className="hero-next-btn"
              aria-label="Next story"
              onClick={() => {
                goTo(active + 1);
                setPlaying(true);
              }}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M9 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
