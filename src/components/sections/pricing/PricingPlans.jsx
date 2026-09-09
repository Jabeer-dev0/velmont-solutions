import { useRef } from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { PillButton } from '../../ui/PillButton';
import { plans, pricingIntro, pricingAssurances } from '../../../data/pricing';
import { useScrollReveal, useScrollRevealStagger } from '../../../lib/useScrollReveal';

export function PricingPlans() {
  const headRef = useRef(null);
  const plansRef = useRef(null);
  const footerRef = useRef(null);

  useScrollReveal(headRef, { variant: 'fade-up', start: 'top 90%' });
  useScrollRevealStagger(plansRef, { variant: 'scale-up', stagger: 0.12, start: 'top 88%' });
  useScrollReveal(footerRef, { variant: 'fade-up-sm', start: 'top 94%' });

  return (
    <section className="v2-section v2-section--band v2-pricing prc-plans" id="plans">
      <div className="prc-plans__head" ref={headRef}>
        <SectionLabel>Plans</SectionLabel>
        <h2 className="serif-display v2-shead__title">
          Flexible retainers for every <em>restaurant.</em>
        </h2>
        <p className="prc-plans__sub">{pricingIntro.sub}</p>
      </div>

      <div className="v2-plans prc-plans__grid" ref={plansRef}>
        {plans.map((plan) => {
          const isCustom = plan.price === 'Custom';

          return (
            <article
              className={`v2-plan${plan.featured ? ' v2-plan--featured' : ''}`}
              key={plan.id}
              id={`plan-${plan.id}`}
            >
              {plan.featured && <div className="v2-plan__tag">Recommended</div>}

              <div className="v2-plan__header">
                <p className="v2-plan__audience">{plan.audience}</p>
                <h3 className="v2-plan__name">{plan.name}</h3>
                <div className="v2-plan__price-wrap">
                  <div className={`v2-plan__price${isCustom ? ' v2-plan__price--custom' : ''}`}>
                    {plan.price}
                    {!isCustom && <span className="v2-plan__price-suffix">/mo</span>}
                  </div>
                  {isCustom && <span className="v2-plan__price-note">{plan.priceNote}</span>}
                </div>
                <p className="v2-plan__note">{plan.note}</p>
              </div>

              <div className="v2-plan__body">
                <p className="v2-plan__feats-label">What you get</p>
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

      <div className="v2-pricing__footer prc-plans__footer" ref={footerRef}>
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
        <p className="v2-pricing__footnote">{pricingIntro.footnote}</p>
      </div>
    </section>
  );
}
