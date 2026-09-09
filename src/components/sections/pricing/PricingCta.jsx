import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PillButton } from '../../ui/PillButton';
import { pricingCta } from '../../../data/pricing';
import { PRIMARY_CTA } from '../../../data/seo';
import { useScrollReveal } from '../../../lib/useScrollReveal';

export function PricingCta() {
  const innerRef = useRef(null);

  useScrollReveal(innerRef, { variant: 'fade-up', start: 'top 88%' });

  return (
    <section className="prc-cta">
      <div className="prc-cta__glow" aria-hidden="true" />
      <div className="prc-cta__inner" ref={innerRef}>
        <h2 className="serif-display prc-cta__title">
          {pricingCta.title} <em>{pricingCta.titleEm}</em>
        </h2>
        <p className="prc-cta__lead">{pricingCta.lead}</p>
        <p className="prc-cta__trust">{pricingCta.trust}</p>
        <PillButton variant="light" icon={ArrowUpRight} to="/contact">
          {PRIMARY_CTA}
        </PillButton>
      </div>
    </section>
  );
}
