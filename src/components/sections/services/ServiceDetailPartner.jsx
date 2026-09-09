import { useRef } from 'react';
import { Headset, RefreshCw, Link2, FileText } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { useScrollReveal, useScrollRevealStagger, useStatCounters } from '../../../lib/useScrollReveal';

const PARTNER_ICONS = [Headset, RefreshCw, Link2, FileText];

export function ServiceDetailPartner({ included, metrics }) {
  const splitRef = useRef(null);
  const metricsRef = useRef(null);
  const perksRef = useRef(null);

  useScrollReveal(splitRef, { variant: 'fade-up', start: 'top 88%' });
  useStatCounters(metricsRef, { start: 'top 86%', stagger: 0.12 });
  useScrollRevealStagger(perksRef, {
    variant: 'slide-left',
    stagger: 0.08,
    start: 'top 88%',
  });

  return (
    <section className="v2-section v2-section--band sd-partner" id="included">
      <div className="sd-partner__split" ref={splitRef}>
        <aside className="sd-partner__metrics-col" aria-label="Service highlights" ref={metricsRef}>
          <p className="sd-partner__metrics-label">At a glance</p>
          {metrics.map((m) => (
            <div className="sd-partner__metric" key={m.label}>
              <strong className="sd-partner__metric-value serif-display" data-stat-value={m.value}>
                {m.value}
              </strong>
              <span className="sd-partner__metric-name">{m.label}</span>
            </div>
          ))}
        </aside>

        <div className="sd-partner__main">
          <SectionLabel>Included</SectionLabel>
          <h2 className="sd-partner__title serif-display">
            Partner <em>support</em>
          </h2>
          <p className="sd-partner__lead">
            Account coverage, documentation and weekly reviews ship with every engagement,
            scoped upfront, not sold as add-ons mid-project.
          </p>

          <ul className="sd-partner__list" ref={perksRef}>
            {included.map((item, i) => {
              const Icon = PARTNER_ICONS[i % PARTNER_ICONS.length];
              return (
                <li className="sd-partner__item" key={item}>
                  <span className="sd-partner__item-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2.25} />
                  </span>
                  <span className="sd-partner__item-text">{item}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
