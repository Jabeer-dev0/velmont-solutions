import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { workProof } from '../../../data/work';
import {
  useScrollReveal,
  useScrollRevealStagger,
  useStatCounters,
} from '../../../lib/useScrollReveal';
import { formatParsedStat, parseStatValue } from '../../../lib/statValue';

function statInitialDisplay(value) {
  return formatParsedStat(parseStatValue(value), 0);
}

export function WorkProof() {
  const headLeftRef = useRef(null);
  const headRightRef = useRef(null);
  const listRef = useRef(null);
  const footRef = useRef(null);

  useScrollReveal(headLeftRef, { variant: 'slide-left', start: 'top 90%' });
  useScrollReveal(headRightRef, { variant: 'slide-right', delay: 0.08, start: 'top 90%' });
  useScrollRevealStagger(listRef, {
    variant: 'scale-up',
    stagger: 0.1,
    start: 'top 88%',
    targets: '.wrk-proof__item',
  });
  useStatCounters(listRef, { start: 'top 86%', stagger: 0.12 });
  useScrollReveal(footRef, { variant: 'fade-up-sm', start: 'top 92%' });

  return (
    <section className="wrk-proof v2-section v2-section--band" aria-labelledby="wrk-proof-title">
      <div className="v2-shead">
        <div ref={headLeftRef}>
          <SectionLabel>{workProof.label}</SectionLabel>
          <h2 id="wrk-proof-title" className="serif-display v2-shead__title">
            {workProof.title} <em>{workProof.titleEm}</em>
          </h2>
        </div>
        <p className="v2-shead__sub" ref={headRightRef}>
          {workProof.lead}
        </p>
      </div>

      <div className="wrk-proof__cards">
        <ul className="wrk-proof__list" ref={listRef}>
          {workProof.items.map(({ metric, label, detail }) => (
            <li key={label} className="wrk-proof__item">
              <strong
                className="wrk-proof__metric serif-display"
                data-stat-value={metric}
                aria-label={metric}
              >
                {statInitialDisplay(metric)}
              </strong>
              <span className="wrk-proof__label">{label}</span>
              <p className="wrk-proof__detail">{detail}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="wrk-proof__foot" ref={footRef}>
        <Link className="wrk-link" to={workProof.cta.href}>
          {workProof.cta.label}
          <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
        <p className="wrk-proof__footnote">{workProof.footnote}</p>
      </div>
    </section>
  );
}
