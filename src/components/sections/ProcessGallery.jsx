import { useRef } from 'react';
import { PhoneCall, SearchCheck, Rocket, LineChart, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { ChipIcon } from '../ui/ChipIcon';
import { processSteps } from '../../data/site';
import { useProcessTimeline, useScrollReveal } from '../../lib/useScrollReveal';

const stepIcons = {
  PhoneCall,
  SearchCheck,
  Rocket,
  LineChart,
};

export function ProcessGallery() {
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
    <section className="v2-section v2-section--band v2-process" id="process" ref={sectionRef}>
      <div className="v2-shead v2-process__head">
        <div ref={headLeftRef}>
          <SectionLabel>How we work</SectionLabel>
          <h2 className="serif-display v2-shead__title">
            A clear path from <em>hello</em>
            <br />
            to growth.
          </h2>
        </div>
        <div className="v2-process__head-aside" ref={headAsideRef}>
          <p className="v2-shead__sub">
            A structured partnership, not a one-off project. We diagnose fast, build what
            matters, and keep optimizing every week.
          </p>
          <div className="v2-process__nav" aria-label="Browse process steps">
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
        {processSteps.map(({ num, phase, title, description, icon, capstone }) => (
          <div className="v2-process__col" key={num}>
            <div className="v2-process__connector" aria-hidden="true">
              <span className="v2-process__dot" />
              <span className="v2-process__stem" />
            </div>
            <article
              className={`v2-process__step${capstone ? ' v2-process__step--capstone' : ''}`}
            >
              <div className="v2-process__step-head">
                <span className="v2-process__phase">{phase}</span>
                <span className="v2-process__num">{num}</span>
              </div>
              <ChipIcon icon={stepIcons[icon]} size={44} tone="blue" />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
