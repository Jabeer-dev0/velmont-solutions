import { useCallback, useRef, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { SectionLabel } from '../ui/SectionLabel';
import { faqs } from '../../data/faqs';
import { useScrollReveal, useScrollRevealStagger } from '../../lib/useScrollReveal';

const PANEL_TRANSITION_MS = 360;

/** Keep viewport fixed while accordion height animates (common FAQ scroll-jump fix). */
function lockScrollFor(ms = PANEL_TRANSITION_MS) {
  const y = window.scrollY;
  const start = performance.now();
  let frame = 0;

  const hold = () => {
    window.scrollTo(0, y);
    if (performance.now() - start < ms) {
      frame = requestAnimationFrame(hold);
    }
  };

  frame = requestAnimationFrame(hold);
  return () => cancelAnimationFrame(frame);
}

export function FaqSection() {
  const [active, setActive] = useState(null);
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const headRef = useRef(null);
  const listRef = useRef(null);

  useScrollReveal(headRef, { variant: 'fade-up', start: 'top 92%' });
  useScrollRevealStagger(listRef, {
    variant: 'fade-up-sm',
    stagger: 0.08,
    start: 'top 90%',
    duration: 0.68,
  });

  const toggle = useCallback(
    (index) => {
      if (!reduceMotion) {
        lockScrollFor();
      }
      setActive((prev) => (prev === index ? null : index));
    },
    [reduceMotion],
  );

  return (
    <section className="v2-section v2-faq" id="faq">
      <div className="v2-faq__head" ref={headRef}>
        <SectionLabel>Questions</SectionLabel>
        <h2 className="serif-display v2-shead__title">
          Good to <em>know.</em>
        </h2>
      </div>
      <div className="v2-faq__list" ref={listRef}>
        {faqs.map(({ question, answer }, index) => {
          const isOpen = active === index;
          const buttonId = `faq-q-${index}`;
          const answerId = `faq-a-${index}`;

          return (
            <div className={`v2-acc${isOpen ? ' is-open' : ''}`} key={question}>
              <button
                type="button"
                id={buttonId}
                className="v2-acc__q"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
              >
                <span>{question}</span>
                <span className="vx-icon">
                  {isOpen ? (
                    <Minus size={20} aria-hidden="true" />
                  ) : (
                    <Plus size={20} aria-hidden="true" />
                  )}
                </span>
              </button>
              <div
                id={answerId}
                className="v2-acc__a"
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
              >
                <div className="v2-acc__a-inner">
                  <p>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
