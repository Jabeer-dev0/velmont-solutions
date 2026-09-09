import { useRef } from 'react';
import { CheckCircle2, ClipboardList } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { useScrollReveal, useScrollRevealStagger } from '../../../lib/useScrollReveal';

/** Rotating scope labels, deliverable-first, audit-friendly (agency SOW pattern). */
const SCOPE_TAGS = ['Defined', 'Documented', 'Delivered', 'Maintained', 'Reported'];

export function ServiceDetailScope({ deliverables }) {
  const headLeftRef = useRef(null);
  const headAsideRef = useRef(null);
  const barRef = useRef(null);
  const listRef = useRef(null);
  const footRef = useRef(null);
  const count = deliverables.length;

  useScrollReveal(headLeftRef, { variant: 'slide-left', start: 'top 85%' });
  useScrollReveal(headAsideRef, { variant: 'slide-right', delay: 0.08, start: 'top 85%' });
  useScrollReveal(barRef, { variant: 'fade-up-sm', start: 'top 88%' });
  useScrollRevealStagger(listRef, {
    variant: 'fade-up-sm',
    stagger: 0.07,
    start: 'top 90%',
  });
  useScrollReveal(footRef, { variant: 'fade-up-sm', delay: 0.06, start: 'top 92%' });

  return (
    <section className="v2-section sd-deliverables" id="scope">
      <div className="v2-shead v2-process__head">
        <div ref={headLeftRef}>
          <SectionLabel>What you get</SectionLabel>
          <h2 className="serif-display v2-shead__title">
            Deliverables & <em>scope</em>
          </h2>
        </div>
        <div className="v2-process__head-aside" ref={headAsideRef}>
          <p className="v2-shead__sub">
            Every output below is named, described and tied to your venue, not a vague
            &ldquo;marketing support&rdquo; line item. You know exactly what we ship and when
            we review it together.
          </p>
        </div>
      </div>

      <div className="sd-manifest">
        <div className="sd-manifest__stripe" aria-hidden="true" />

        <header className="sd-manifest__bar" ref={barRef}>
          <div className="sd-manifest__bar-copy">
            <ClipboardList size={20} strokeWidth={2} aria-hidden="true" />
            <div>
              <span className="sd-manifest__kicker">Scope manifest</span>
              <p className="sd-manifest__bar-note">
                Auditable deliverables for this service, scoped to your menu, hours and tools.
              </p>
            </div>
          </div>
          <div className="sd-manifest__count" aria-label={`${count} scoped deliverables`}>
            <strong className="serif-display">{count}</strong>
            <span>items in scope</span>
          </div>
        </header>

        <ul className="sd-manifest__list" ref={listRef}>
          {deliverables.map((item, i) => (
            <li
              className={`sd-manifest__item${i === 0 ? ' sd-manifest__item--lead' : ''}`}
              key={item.title}
            >
              <span className="sd-manifest__num" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="sd-manifest__check" aria-hidden="true">
                <CheckCircle2 size={22} strokeWidth={2.25} />
              </span>
              <div className="sd-manifest__body">
                <span className="sd-manifest__tag">{SCOPE_TAGS[i % SCOPE_TAGS.length]}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <footer className="sd-manifest__foot" ref={footRef}>
          <p>
            <strong>Acceptance:</strong> each deliverable is reviewed on your Velmont weekly
            rhythm. Updates for menu changes, promos and seasonal trade are included unless
            noted otherwise in your proposal.
          </p>
        </footer>
      </div>
    </section>
  );
}
