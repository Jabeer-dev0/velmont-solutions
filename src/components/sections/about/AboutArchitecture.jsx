import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChipIcon } from '../../ui/ChipIcon';
import { SectionImage } from '../../ui/SectionImage';
import { aboutArchitecture } from '../../../data/about';
import { fadeUp, viewOnce, EASE_OUT } from '../../../lib/aboutMotion';

export function AboutArchitecture() {
  const [active, setActive] = useState(aboutArchitecture.layers[0].id);
  const current = aboutArchitecture.layers.find((l) => l.id === active) ?? aboutArchitecture.layers[0];

  return (
    <section className="abt-arch v2-section" id="team">
      <SectionImage
        src={aboutArchitecture.bgImage}
        alt="Velmont team collaboration in a modern workspace"
        className="abt-arch__bg"
        aria-hidden="true"
        loading="lazy"
      />
      <div className="abt-arch__veil" aria-hidden="true" />

      <div className="abt-arch__inner">
        <div className="abt-arch__layout">
          <motion.div
            className="abt-arch__intro"
            initial="hidden"
            whileInView="visible"
            viewport={viewOnce}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.p className="abt-eyebrow" variants={fadeUp} custom={0}>
              {aboutArchitecture.eyebrow}
            </motion.p>
            <motion.h2 className="abt-arch__title serif-display" variants={fadeUp} custom={1}>
              {aboutArchitecture.title} <em>{aboutArchitecture.titleEm}</em>
            </motion.h2>
            <motion.p className="abt-arch__lead" variants={fadeUp} custom={2}>
              {aboutArchitecture.lead}
            </motion.p>
          </motion.div>

          <div className="abt-arch__panel">
            <div className="abt-arch__tabs" role="tablist" aria-label="Team layers">
              {aboutArchitecture.layers.map((layer) => (
                <button
                  key={layer.id}
                  type="button"
                  role="tab"
                  aria-selected={active === layer.id}
                  className={`abt-arch__tab${active === layer.id ? ' is-active' : ''}`}
                  onMouseEnter={() => setActive(layer.id)}
                  onFocus={() => setActive(layer.id)}
                  onClick={() => setActive(layer.id)}
                >
                  {layer.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={current.id}
                className="abt-arch__detail"
                role="tabpanel"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
              >
                <ChipIcon icon={current.icon} size={56} tone="soft" />
                <h3>{current.title}</h3>
                <p>{current.body}</p>
                <div className="abt-arch__stack" aria-hidden="true">
                  {aboutArchitecture.layers.map((layer, i) => (
                    <span
                      key={layer.id}
                      className={`abt-arch__stack-layer${active === layer.id ? ' is-active' : ''}`}
                      style={{ '--layer-i': i }}
                    />
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
