import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { contactFaqs, nextSteps } from '../../../data/contact';
import { fadeUp, fadeUpSm, staggerVisible, viewOnce } from '../../../lib/aboutMotion';

const PANEL_TRANSITION_MS = 360;

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

export function ContactNextSteps() {
  const [active, setActive] = useState(null);
  const [reduceMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const toggle = useCallback(
    (index) => {
      if (!reduceMotion) lockScrollFor();
      setActive((prev) => (prev === index ? null : index));
    },
    [reduceMotion],
  );

  return (
    <section className="ctc-next" id="faq">
      <motion.div
        className="ctc-next__head"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={staggerVisible(0.1)}
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionLabel>What happens next</SectionLabel>
        </motion.div>
        <motion.h2 className="serif-display v2-shead__title" variants={fadeUp} custom={1}>
          No black box. Just <em>clear steps.</em>
        </motion.h2>
      </motion.div>

      <motion.div
        className="ctc-next__layout"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } }}
      >
        <motion.div className="ctc-next__faq" variants={staggerVisible(0.07)}>
          {contactFaqs.map(({ question, answer }, index) => {
            const isOpen = active === index;
            const buttonId = `ctc-faq-q-${index}`;
            const answerId = `ctc-faq-a-${index}`;

            return (
              <motion.div
                className={`v2-acc${isOpen ? ' is-open' : ''}`}
                key={question}
                variants={fadeUpSm}
                custom={index}
              >
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
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
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
              </motion.div>
            );
          })}
        </motion.div>

        <motion.ol
          className="ctc-next__timeline"
          variants={staggerVisible(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
        >
          {nextSteps.map(({ num, title, detail }, index) => (
            <motion.li key={num} variants={fadeUpSm} custom={index}>
              <span className="ctc-next__num">{num}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>
    </section>
  );
}
