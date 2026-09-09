import { useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { PillButton } from '../../ui/PillButton';
import { SectionImage } from '../../ui/SectionImage';
import { workFeaturedCase, workSections } from '../../../data/work';
import { useScrollReveal, useStatCounters } from '../../../lib/useScrollReveal';
import { formatParsedStat, parseStatValue } from '../../../lib/statValue';

const CATEGORY_META = {
  marketing: { label: 'Marketing', progress: 78, tone: 'marketing' },
  operations: { label: 'Operations', progress: 88, tone: 'operations' },
  reputation: { label: 'Reputation', progress: 64, tone: 'reputation' },
};

function statInitialDisplay(value) {
  return formatParsedStat(parseStatValue(value), 0);
}

export function WorkFeatured() {
  const item = workFeaturedCase;
  const category = CATEGORY_META[item.category] ?? CATEGORY_META.marketing;
  const copy = workSections.featured;

  const copyRef = useRef(null);
  const cardRef = useRef(null);
  const quoteRef = useRef(null);
  const metricsRef = useRef(null);
  const sectionRef = useRef(null);

  useScrollReveal(copyRef, { variant: 'slide-left', start: 'top 85%' });
  useScrollReveal(cardRef, { variant: 'slide-right', delay: 0.08, start: 'top 85%' });
  useScrollReveal(quoteRef, { variant: 'fade-up-sm', delay: 0.12, start: 'top 85%' });
  useStatCounters(metricsRef, { start: 'top 84%', stagger: 0.14 });

  return (
    <section className="v2-show wrk-featured" aria-labelledby="wrk-featured-title" ref={sectionRef}>
      <div className="v2-show__glow" aria-hidden="true" />

      <div className="v2-show__inner wrk-featured__inner">
        <div className="v2-show__layout wrk-featured__layout">
          <div className="v2-show__copy" ref={copyRef}>
            <SectionLabel light>{copy.label}</SectionLabel>
            <h2 id="wrk-featured-title" className="serif-display v2-show__title">
              {copy.title} <em>{item.headline} in {item.timeframe}.</em>
            </h2>
            <p className="v2-show__lead">{item.summary}</p>
            <p className="wrk-featured__meta">
              {item.name} · {item.location}
            </p>
            <div className="v2-show__cta">
              <PillButton variant="light" icon={ArrowUpRight} to={`/services/${item.serviceSlugs[0]}`}>
                {copy.ctaPrimary}
              </PillButton>
              <PillButton variant="ghost-on-dark" icon={ArrowUpRight} to="#wrk-grid-title">
                {copy.ctaSecondary}
              </PillButton>
            </div>

            <div
              className="v2-show__metrics wrk-featured__copy-metrics"
              aria-label="Key results"
              ref={metricsRef}
            >
              {item.metrics.map(({ value, label }, index) => (
                <div className="v2-show__metric" key={label}>
                  <div
                    className="v2-show__metric-num serif-display"
                    data-stat-value={value}
                    aria-label={value}
                  >
                    {statInitialDisplay(value)}
                  </div>
                  <div className="v2-show__metric-lbl">{label}</div>
                  {index < item.metrics.length - 1 && (
                    <span className="v2-show__metric-divider" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <article className="wrk-card wrk-featured__card" ref={cardRef}>
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

            {item.quote && (
              <div className="wrk-featured__quote-panel">
                <figure className="wrk-featured__quote" ref={quoteRef}>
                  <div className="wrk-featured__quote-body">
                    <span className="wrk-featured__quote-mark serif-display" aria-hidden="true">
                      &ldquo;
                    </span>
                    <blockquote className="wrk-featured__quote-text">{item.quote}</blockquote>
                  </div>
                  <figcaption className="wrk-featured__quote-attr">{item.attribution}</figcaption>
                </figure>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
