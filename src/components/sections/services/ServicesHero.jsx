import { useLayoutEffect, useRef } from 'react';
import { servicesHero } from '../../../data/services';
import { heroEntrance, animateSvcHeroMetrics } from '../../../lib/scrollReveal';
import { formatParsedStat, parseStatValue } from '../../../lib/statValue';

const heroMetrics = [
  { value: '50+', label: 'Restaurants supported', theme: 'dark' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '24h', label: 'Support response', theme: 'dark' },
  { value: '10', label: 'Growth services' },
  { value: '1', label: 'Dedicated partner', theme: 'dark' },
  { value: 'Weekly', label: 'Performance insights' },
];

function statInitialDisplay(value) {
  return formatParsedStat(parseStatValue(value), 0);
}

export function ServicesHero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const cleanupHero = heroEntrance(root, [
      { el: root.querySelector('.abt-eyebrow'), variant: 'fade-up-sm', at: 0.08 },
      { el: root.querySelector('.abt-hero__title'), variant: 'fade-up', duration: 0.88, at: 0.18 },
    ]);

    const metricsEl = root.querySelector('.svc-hero__metrics');
    const cleanupMetrics = metricsEl
      ? animateSvcHeroMetrics(metricsEl, { delay: 0.32, stagger: 0.085 })
      : () => {};

    return () => {
      cleanupHero();
      cleanupMetrics();
    };
  }, []);

  return (
    <section className="svc-hero abt-hero" ref={heroRef}>
      <div className="abt-hero__inner">
        <p className="abt-eyebrow">{servicesHero.eyebrow}</p>
        <h1 className="abt-hero__title serif-display">
          {servicesHero.title} <em>{servicesHero.titleEm}</em>
        </h1>
      </div>

      <div className="svc-hero__metrics" aria-label="Service highlights">
        {heroMetrics.map(({ value, label, theme }) => {
          const isWordValue = parseStatValue(value).kind === 'text';
          return (
            <article
              className={`svc-hero__metric${theme === 'dark' ? ' svc-hero__metric--dark' : ''}`}
              key={label}
            >
              <span className="svc-hero__metric-accent" aria-hidden="true" />
              <strong
                className={`svc-hero__metric-value serif-display${isWordValue ? ' svc-hero__metric-value--word' : ''}`}
                data-stat-value={value}
              >
                {statInitialDisplay(value)}
              </strong>
              <span className="svc-hero__metric-label">{label}</span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
