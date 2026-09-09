import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import gsap from 'gsap';
import { SectionLabel } from '../../ui/SectionLabel';
import { SectionImage } from '../../ui/SectionImage';
import { workFilters, workGridCases, workSections } from '../../../data/work';
import { prefersReducedMotion } from '../../../lib/scrollReveal';
import { useScrollReveal, useScrollRevealStagger } from '../../../lib/useScrollReveal';
import { CaseSparkline } from './CaseSparkline';
import { getCaseSparkline } from '../../../data/workCaseSparklines';

const CATEGORY_META = {
  marketing: { label: 'Marketing' },
  operations: { label: 'Operations' },
  reputation: { label: 'Reputation' },
};

function buildStatColumns(metrics, timeframe) {
  const columns = metrics.slice(0, 3).map(({ value, label }) => ({ value, label }));

  if (columns.length < 3) {
    columns.push({ value: timeframe, label: 'Timeline' });
  }

  return columns.slice(0, 3);
}

function findRatingMetric(metrics) {
  return metrics.find(({ label }) => /rating/i.test(label)) ?? null;
}

export function WorkGrid() {
  const [activeFilter, setActiveFilter] = useState('all');
  const headRef = useRef(null);
  const filtersRef = useRef(null);
  const gridRef = useRef(null);
  const skipFilterMotion = useRef(true);

  const filtered = useMemo(
    () =>
      activeFilter === 'all'
        ? workGridCases
        : workGridCases.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  useScrollReveal(headRef, { variant: 'fade-up', start: 'top 90%' });
  useScrollReveal(filtersRef, { variant: 'fade-up-sm', delay: 0.06, start: 'top 90%' });
  useScrollRevealStagger(gridRef, {
    variant: 'scale-up',
    stagger: 0.1,
    start: 'top 88%',
    targets: '.wrk-card',
    rememberKey: 'work-grid-cards',
  });

  useLayoutEffect(() => {
    if (skipFilterMotion.current) {
      skipFilterMotion.current = false;
      return undefined;
    }

    const list = gridRef.current;
    if (!list || prefersReducedMotion()) return undefined;

    const cards = list.querySelectorAll('.wrk-card');
    if (!cards.length) return undefined;

    const tween = gsap.fromTo(
      cards,
      { autoAlpha: 0, y: 16, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.45,
        stagger: 0.07,
        ease: 'power2.out',
      },
    );

    return () => {
      tween.kill();
    };
  }, [activeFilter, filtered.length]);

  const gridCopy = workSections.grid;

  return (
    <section className="wrk-grid v2-section v2-section--band" aria-labelledby="wrk-grid-title">
      <div className="wrk-grid__head" ref={headRef}>
        <SectionLabel>{gridCopy.label}</SectionLabel>
        <h2 id="wrk-grid-title" className="wrk-grid__title serif-display">
          {gridCopy.title} <em>{gridCopy.titleEm}</em>
        </h2>
      </div>

      <div className="wrk-grid__filters" ref={filtersRef} role="tablist" aria-label="Filter case studies">
        {workFilters.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={activeFilter === id}
            className={activeFilter === id ? 'is-active' : undefined}
            onClick={() => setActiveFilter(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="wrk-grid__cards">
        <ul className="wrk-grid__list" ref={gridRef}>
          {filtered.map((item) => {
            const category = CATEGORY_META[item.category] ?? CATEGORY_META.marketing;
            const chart = getCaseSparkline(item.id);
            const statColumns = buildStatColumns(item.metrics, item.timeframe);
            const ratingMetric = findRatingMetric(item.metrics);

            return (
              <li key={item.id} className="wrk-grid__item">
                <Link
                  className="wrk-card"
                  to={`/services/${item.serviceSlugs[0]}`}
                >
                  <div className="wrk-card__visual">
                    <SectionImage src={item.image} alt={item.imageAlt} className="wrk-card__img" />
                    <div className="wrk-card__scrim" aria-hidden="true" />
                    <span className="wrk-card__badge">{category.label}</span>
                    <div className="wrk-card__overlay">
                      <div className="wrk-card__overlay-copy">
                        <h3 className="wrk-card__title">{item.headline}</h3>
                        <p className="wrk-card__location">
                          <MapPin size={13} aria-hidden="true" />
                          <span>
                            {item.name} · {item.location}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="wrk-card__panel">
                    <div className="wrk-card__panel-main">
                      <ul className="wrk-card__stats" aria-label="Key results">
                        {statColumns.map(({ value, label }) => (
                          <li key={label}>
                            <strong>{value}</strong>
                            <span>{label}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="wrk-card__panel-row">
                        <div className="wrk-card__progress-wrap">
                          <div
                            className={`wrk-card__progress wrk-card__progress--${chart.variant}`}
                            role="presentation"
                          >
                            <span style={{ width: `${chart.progress}%` }} />
                          </div>
                          <span className="wrk-card__progress-label">
                            Results in {item.timeframe.toLowerCase()}
                          </span>
                        </div>

                        {ratingMetric ? (
                          <div className="wrk-card__rating">
                            <span className="wrk-card__rating-value">
                              <Star size={14} aria-hidden="true" />
                              {ratingMetric.value}
                            </span>
                            <span className="wrk-card__rating-label">{ratingMetric.label}</span>
                          </div>
                        ) : (
                          <div className="wrk-card__rating">
                            <span className="wrk-card__rating-value wrk-card__rating-value--text">
                              {item.services[0]}
                            </span>
                            <span className="wrk-card__rating-label">Lead service</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="wrk-card__panel-aside" aria-hidden="true">
                      <CaseSparkline caseId={item.id} />
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {filtered.length === 0 && (
        <p className="wrk-grid__empty">{gridCopy.empty}</p>
      )}
    </section>
  );
}
