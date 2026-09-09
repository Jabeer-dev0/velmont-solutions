import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { PillButton } from '../ui/PillButton';
import { ChipIcon } from '../ui/ChipIcon';
import { SectionImage } from '../ui/SectionImage';
import { site } from '../../data/site';
import { PRIMARY_CTA } from '../../data/seo';
import { whyPoints } from '../../data/services';
import {
  useParallax,
  useScrollReveal,
  useScrollRevealStagger,
  useStatCounters,
} from '../../lib/useScrollReveal';
import { formatParsedStat, parseStatValue } from '../../lib/statValue';
import { ShowcaseQuoteCarousel } from './ShowcaseQuoteCarousel';

function statInitialDisplay(value) {
  return formatParsedStat(parseStatValue(value), 0);
}

export function ShowcaseSection() {
  const satisfaction = site.stats.find((s) => s.label === 'Client satisfaction');
  const bgRef = useRef(null);
  const copyRef = useRef(null);
  const quoteRef = useRef(null);
  const metricsRef = useRef(null);
  const pillarsRef = useRef(null);
  const trustRef = useRef(null);
  const sectionRef = useRef(null);

  useParallax(bgRef, { y: 32, triggerRef: sectionRef });
  useScrollReveal(copyRef, { variant: 'slide-left', start: 'top 85%' });
  useScrollReveal(quoteRef, { variant: 'slide-right', delay: 0.08, start: 'top 85%' });
  useStatCounters(metricsRef, { start: 'top 84%', stagger: 0.14 });
  useScrollRevealStagger(pillarsRef, { variant: 'fade-up-sm', stagger: 0.09, start: 'top 88%' });
  useScrollReveal(trustRef, { variant: 'fade-in', delay: 0.05, start: 'top 92%' });

  return (
    <section className="v2-show" id="work" ref={sectionRef}>
      <SectionImage
        ref={bgRef}
        src={site.images.showcaseBg}
        alt="Abstract background pattern for restaurant growth showcase section"
        className="v2-show__bg"
        aria-hidden="true"
        width={1440}
        height={900}
      />
      <div className="v2-show__veil" aria-hidden="true" />
      <div className="v2-show__glow" aria-hidden="true" />

      <div className="v2-show__inner">
        <div className="v2-show__layout">
          <div className="v2-show__copy" ref={copyRef}>
            <SectionLabel light>Why restaurants trust Velmont</SectionLabel>
            <h2 className="serif-display v2-show__title">
              Systems that turn first-time diners into <em>regulars</em>, and regulars into
              revenue.
            </h2>
            <p className="v2-show__lead">
              One UK partner for social, reviews, call handling and weekly reporting, so you
              stay on the floor while growth compounds.
            </p>
            <div className="v2-show__cta">
              <PillButton variant="light" icon={ArrowUpRight} to="/contact">
                {PRIMARY_CTA}
              </PillButton>
              <PillButton variant="ghost-on-dark" icon={ArrowUpRight} to="/work">
                View our work
              </PillButton>
            </div>
          </div>

          <ShowcaseQuoteCarousel
            className="v2-show__quote"
            ref={quoteRef}
            satisfaction={satisfaction}
          />
        </div>

        <div className="v2-show__metrics" aria-label="Key results" ref={metricsRef}>
          {site.stats.map(({ value, label }, index) => (
            <div className="v2-show__metric" key={label}>
              <div
                className="v2-show__metric-num serif-display"
                data-stat-value={value}
                aria-label={value}
              >
                {statInitialDisplay(value)}
              </div>
              <div className="v2-show__metric-lbl">{label}</div>
              {index < site.stats.length - 1 && (
                <span className="v2-show__metric-divider" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>

        <div className="v2-show__pillars" ref={pillarsRef}>
          {whyPoints.map(({ icon, title, description }) => (
            <article className="v2-show__pillar" key={title}>
              <ChipIcon icon={icon} size={46} tone="light" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>

        <p className="v2-show__trust-line" ref={trustRef}>
          {site.showcase.trustLine}
        </p>
      </div>
    </section>
  );
}
