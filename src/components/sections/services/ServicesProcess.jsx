import { useRef } from 'react';
import { SectionLabel } from '../../ui/SectionLabel';
import { servicesProcess } from '../../../data/services';
import { useScrollReveal, useScrollRevealStagger } from '../../../lib/useScrollReveal';

export function ServicesProcess() {
  const headRef = useRef(null);
  const listRef = useRef(null);

  useScrollReveal(headRef, { variant: 'fade-up', start: 'top 90%' });
  useScrollRevealStagger(listRef, { variant: 'fade-up-sm', stagger: 0.1, start: 'top 88%' });

  return (
    <section className="v2-show svc-process-band">
      <div className="v2-show__veil" aria-hidden="true" />
      <div className="v2-show__inner">
        <div className="svc-process__head" ref={headRef}>
          <SectionLabel light>How engagement works</SectionLabel>
          <h2 className="serif-display v2-show__title">
            A practical system from plan to weekly <em>momentum.</em>
          </h2>
          <p className="v2-show__lead">
            You get a clear roadmap, fast implementation, and weekly optimization without
            juggling multiple freelancers.
          </p>
        </div>

        <div className="v2-show__points svc-process__points" ref={listRef}>
          {servicesProcess.map(({ phase, title, detail }) => (
            <article className="v2-show__point svc-process__point" key={title}>
              <span className="svc-process__phase">{phase}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
