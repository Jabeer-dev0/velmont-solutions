import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { PillButton } from '../ui/PillButton';
import { plans, pricingIntro, pricingAssurances } from '../../data/pricing';
import { useScrollReveal, useScrollRevealStagger } from '../../lib/useScrollReveal';

export function PricingSection() {
  const headLeftRef = useRef(null);
  const headRightRef = useRef(null);
  const plansRef = useRef(null);
  const footerRef = useRef(null);

  useScrollReveal(headLeftRef, { variant: 'slide-left', start: 'top 90%' });
  useScrollReveal(headRightRef, { variant: 'slide-right', delay: 0.08, start: 'top 90%' });
  useScrollRevealStagger(plansRef, { variant: 'scale-up', stagger: 0.12, start: 'top 88%' });
  useScrollReveal(footerRef, { variant: 'fade-up-sm', start: 'top 94%' });

  return (
    <section className="v2-section v2-section--band v2-pricing" id="pricing">
      <div className="v2-shead">
        <div ref={headLeftRef}>
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="serif-display v2-shead__title">
            Flexible plans for every <em>restaurant.</em>
          </h2>
        </div>
        <p className="v2-shead__sub" ref={headRightRef}>
          {pricingIntro.sub}
        </p>
      </div>

      <div className="v2-plans" ref={plansRef}>
        {plans.map((plan) => {
          const isCustom = plan.price === 'Custom';

          return (
            <article
              className={`v2-plan${plan.featured ? ' v2-plan--featured' : ''}`}
              key={plan.id}
            >
              {plan.featured && <div className="v2-plan__tag">Most popular</div>}

              <div className="v2-plan__header">
                <p className="v2-plan__audience">{plan.audience}</p>
                <h3 className="v2-plan__name">{plan.name}</h3>
                <div className="v2-plan__price-wrap">
                  <div className={`v2-plan__price${isCustom ? ' v2-plan__price--custom' : ''}`}>
                    {plan.price}
                    {!isCustom && <span className="v2-plan__price-suffix">/mo</span>}
                  </div>
                  {isCustom && (
                    <span className="v2-plan__price-note">{plan.priceNote}</span>
                  )}
                </div>
                <p className="v2-plan__note">{plan.note}</p>
              </div>

              <div className="v2-plan__body">
                <p className="v2-plan__feats-label">What&apos;s included</p>
                <ul className="v2-plan__feats">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="vx-icon">
                        <Check size={16} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <PillButton
                variant={plan.featured ? 'light' : 'ghost'}
                icon={plan.featured ? ArrowUpRight : undefined}
                to="/contact"
              >
                {plan.cta}
              </PillButton>
            </article>
          );
        })}
      </div>

      <div className="v2-pricing__footer" ref={footerRef}>
        <ul className="v2-pricing__assurances">
          {pricingAssurances.map((item) => (
            <li key={item}>
              <span className="vx-icon" aria-hidden="true">
                <Check size={15} strokeWidth={2.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <p className="v2-pricing__footnote">
          {pricingIntro.footnote}{' '}
          <Link to="/pricing" className="v2-pricing__full-link">
            View full comparison
          </Link>
        </p>
      </div>
    </section>
  );
}
