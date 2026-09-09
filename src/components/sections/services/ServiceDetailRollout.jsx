import { useRef } from 'react';
import { ChevronLeft, ChevronRight, LineChart, Rocket, SearchCheck } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { ChipIcon } from '../../ui/ChipIcon';
import { useProcessTimeline, useScrollReveal } from '../../../lib/useScrollReveal';

const phaseIcons = [SearchCheck, Rocket, LineChart];

export function ServiceDetailRollout({ phases }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const headLeftRef = useRef(null);
  const headAsideRef = useRef(null);

  useScrollReveal(headLeftRef, { variant: 'slide-left', start: 'top 85%' });
  useScrollReveal(headAsideRef, { variant: 'slide-right', delay: 0.08, start: 'top 85%' });
  useProcessTimeline(sectionRef, trackRef);

  const scrollBy = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.72), behavior: 'smooth' });
  };

  return (
    <section
      className="v2-section v2-section--band v2-process sd-service-process"
      id="rollout"
      ref={sectionRef}
    >
      <div className="v2-shead v2-process__head">
        <div ref={headLeftRef}>
          <SectionLabel>Timeline</SectionLabel>
          <h2 className="serif-display v2-shead__title">
            How we <em>roll it out</em>
          </h2>
        </div>
        <div className="v2-process__head-aside" ref={headAsideRef}>
          <p className="v2-shead__sub">
            A structured rollout from kickoff to live delivery. Then an ongoing rhythm so
            this service keeps improving with your menu and trade.
          </p>
          <div className="v2-process__nav" aria-label="Browse rollout steps">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Previous step">
              <ChevronLeft size={20} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Next step">
              <ChevronRight size={20} strokeWidth={2.25} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="v2-process__grid" ref={trackRef}>
        {phases.map((phase, i) => {
          const isCapstone = i === phases.length - 1;
          const Icon = phaseIcons[i] ?? LineChart;
          const num = String(i + 1).padStart(2, '0');

          return (
            <div className="v2-process__col" key={phase.title}>
              <div className="v2-process__connector" aria-hidden="true">
                <span className="v2-process__dot" />
                <span className="v2-process__stem" />
              </div>
              <article className={`v2-process__step${isCapstone ? ' v2-process__step--capstone' : ''}`}>
                <div className="v2-process__step-head">
                  <span className="v2-process__phase">{phase.phase}</span>
                  <span className="v2-process__num">{num}</span>
                </div>
                <ChipIcon icon={Icon} size={44} tone="blue" />
                <h3>{phase.title}</h3>
                <p>{phase.detail}</p>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
