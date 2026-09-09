import { Fragment, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { comparisonCategories, plans } from '../../../data/pricing';
import { useScrollReveal } from '../../../lib/useScrollReveal';

function CompareCell({ value }) {
  if (value === true) {
    return (
      <span className="prc-compare__yes" aria-label="Included">
        <Check size={18} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="prc-compare__no" aria-label="Not included">
        <Minus size={16} strokeWidth={2.5} aria-hidden="true" />
      </span>
    );
  }

  return <span className="prc-compare__text">{value}</span>;
}

export function PricingCompare() {
  const headRef = useRef(null);
  const tableRef = useRef(null);

  useScrollReveal(headRef, { variant: 'fade-up', start: 'top 90%' });
  useScrollReveal(tableRef, { variant: 'fade-up-sm', delay: 0.08, start: 'top 88%' });

  const planIds = ['launch', 'growth', 'scale'];

  return (
    <section className="prc-compare" id="compare">
      <div className="prc-compare__head" ref={headRef}>
        <SectionLabel>Compare</SectionLabel>
        <h2 className="serif-display v2-shead__title">
          See what&apos;s included at <em>each tier.</em>
        </h2>
        <p className="prc-compare__sub">
          A quick side-by-side view, no scrolling through three cards to spot the difference.
        </p>
      </div>

      <div className="prc-compare__scroll" ref={tableRef}>
        <table className="prc-compare__table">
          <caption className="sr-only">Feature comparison across Launch, Growth and Scale plans</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {plans.map((plan) => (
                <th
                  scope="col"
                  key={plan.id}
                  className={plan.featured ? 'is-featured' : undefined}
                >
                  <span className="prc-compare__plan-name">{plan.name}</span>
                  <span className="prc-compare__plan-price">
                    {plan.price === 'Custom' ? 'Custom' : `${plan.price}/mo`}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonCategories.map((category) => (
              <Fragment key={category.name}>
                <tr className="prc-compare__group">
                  <th colSpan={4} scope="colgroup">
                    {category.name}
                  </th>
                </tr>
                {category.rows.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {planIds.map((id) => (
                      <td key={id} className={id === 'growth' ? 'is-featured' : undefined}>
                        <CompareCell value={row[id]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
