import { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PillButton } from '../ui/PillButton';
import { SectionLabel } from '../ui/SectionLabel';
import { HeroRotatingTitle } from './HeroRotatingTitle';
import { HeroGrowthChart } from './HeroGrowthChart';
import { heroHeadlines } from '../../data/heroHeadlines';
import { trustedPartners } from '../../data/partners';
import { PRIMARY_CTA } from '../../data/seo';
import { scrollToSection } from '../../lib/scrollTo';
import { runHomeHeroOpening } from '../../lib/heroOpening';

export function HeroSection() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    return runHomeHeroOpening(section);
  }, []);

  return (
    <section className="v2-hero" id="top" ref={sectionRef}>
      <div className="v2-hero__inner">
        <SectionLabel light>We are Velmont Solutions</SectionLabel>
        <HeroRotatingTitle headlines={heroHeadlines} />
        <div className="v2-hero__actions">
          <PillButton variant="light" icon={ArrowUpRight} to="/contact">
            {PRIMARY_CTA}
          </PillButton>
          <PillButton variant="ghost-on-dark" onClick={() => scrollToSection('services')}>
            Explore services
          </PillButton>
        </div>
        <div className="v2-hero__trust">
          <span className="v2-hero__trust-label">Trusted partners</span>
          <span className="v2-hero__trust-logos">
            <span className="v2-hero__trust-track">
              {[...trustedPartners.items, ...trustedPartners.items].map((partner, i) => (
                <span
                  className="v2-hero__trust-item"
                  key={`${partner.id}-${i}`}
                  aria-hidden={i >= trustedPartners.items.length ? 'true' : undefined}
                >
                  <img
                    className="v2-hero__trust-logo"
                    src={partner.logo}
                    alt={`${partner.brand} logo`}
                    width="110"
                    height="36"
                    loading="eager"
                    decoding="async"
                  />
                  <span className="v2-hero__trust-loc">{partner.location}</span>
                </span>
              ))}
            </span>
          </span>
        </div>
      </div>
      <HeroGrowthChart />
    </section>
  );
}
