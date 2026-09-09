import { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PillButton } from '../../ui/PillButton';
import { fadeUp, fadeUpSm, usePrefersReducedMotion, EASE_OUT } from '../../../lib/aboutMotion';
import { SERVICE_SCROLL_STEPS } from '../../../data/serviceScrollSteps';
import { PRIMARY_CTA } from '../../../data/seo';
import { initServiceScrollStory } from '../../../lib/serviceScrollStory';
import { refreshScrollTriggers } from '../../../lib/scrollReveal';
import { ServiceScrollVisual } from './serviceScrollVisual';

export function ServiceDetailHero({ service, theme }) {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const steps = SERVICE_SCROLL_STEPS[service.slug] ?? [];

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cleanup = initServiceScrollStory(service.slug, root) ?? (() => {});
    refreshScrollTriggers();

    return cleanup;
  }, [service.slug]);

  return (
    <header
      ref={rootRef}
      className="sd-hero sd-hero--story"
      data-scroll-story={service.slug}
      style={theme.cssVars}
      aria-labelledby={`sd-hero-title-${service.slug}`}
    >
      <div className="sd-hero__inner">
        <div className="sd-hero__grid">
          <motion.div
            className="sd-hero__copy"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: reduced ? 0 : 0.08,
                  delayChildren: reduced ? 0 : 0.06,
                },
              },
            }}
          >
            <motion.p className="abt-eyebrow" variants={fadeUpSm} custom={0}>
              {theme.vibe}
            </motion.p>
            <motion.h1
              id={`sd-hero-title-${service.slug}`}
              className="sd-hero__title serif-display"
              variants={fadeUp}
              custom={1}
            >
              {service.name}
            </motion.h1>

            <motion.div className="sd-hero__story" variants={fadeUp} custom={2}>
              <h2 className="sd-hero__story-title serif-display">{theme.scrollTitle}</h2>
              <div className="sd-hero__beat" data-step-beat>
                <p className="sd-hero__beat-label" data-step-label>
                  {steps[0]?.label}
                </p>
                <p className="sd-hero__beat-text" data-step-text>
                  {steps[0]?.text}
                </p>
              </div>
              <div className="sd-hero__progress" aria-hidden="true">
                <span className="sd-hero__progress-fill" data-progress-fill />
              </div>
            </motion.div>

            <motion.div className="sd-hero__cta" variants={fadeUp} custom={3}>
              <PillButton variant="primary" icon={ArrowUpRight} to="/contact">
                {PRIMARY_CTA}
              </PillButton>
              <PillButton variant="ghost" to="/pricing">
                View pricing
              </PillButton>
            </motion.div>
          </motion.div>

          <motion.div
            className="sd-hero__visual-wrap"
            aria-hidden="false"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.65,
              delay: reduced ? 0 : 0.16,
              ease: EASE_OUT,
            }}
          >
            <ServiceScrollVisual slug={service.slug} />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
