import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from '../../ui/SectionLabel';
import { ChipIcon } from '../../ui/ChipIcon';
import { fadeUp, staggerVisible, viewOnce } from '../../../lib/aboutMotion';
import { useScrollRevealStagger } from '../../../lib/useScrollReveal';
import { getRelatedServices } from '../../../data/serviceDetails';
import { serviceDetailCta } from '../../../data/cta';
import { ProblemSection } from '../ProblemSection';
import { PageCta } from '../PageCta';
import { ServiceDetailHero } from './ServiceDetailHero';
import { ServiceDetailScope } from './ServiceDetailScope';
import { ServiceDetailRollout } from './ServiceDetailRollout';
import { ServiceDetailPartner } from './ServiceDetailPartner';

export function ServiceDetailView({ service }) {
  const related = getRelatedServices(service.related ?? []);
  const relatedRef = useRef(null);

  useScrollRevealStagger(relatedRef, {
    variant: 'scale-up',
    stagger: 0.1,
    start: 'top 88%',
  });

  return (
    <article className="svc-detail" style={service.theme?.cssVars}>
      <ServiceDetailHero service={service} theme={service.theme} />

      <ProblemSection
        id="challenge"
        eyebrow="The challenge"
        title={service.challengeTitle}
        titleEm={service.challengeTitleEm}
        lead={service.challenge}
        counter={service.challengeCounter}
        pains={service.challengePoints}
      />

      <section className="v2-section sd-approach" id="approach">
        <motion.div
          className="sd-approach__inner"
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
          variants={staggerVisible(0.08)}
        >
          <motion.div variants={fadeUp} custom={0}>
            <SectionLabel light>How Velmont delivers</SectionLabel>
            <h2 className="serif-display v2-shead__title sd-approach__title">
              Built for <em>restaurant reality.</em>
            </h2>
          </motion.div>
          <motion.p className="sd-approach__prose" variants={fadeUp} custom={1}>
            {service.approach}
          </motion.p>
        </motion.div>
      </section>

      <ServiceDetailScope deliverables={service.deliverables} />

      <ServiceDetailRollout phases={service.phases} />

      <ServiceDetailPartner included={service.included} metrics={service.metrics} />

      {related.length > 0 && (
        <section className="v2-section v2-section--band sd-related-section">
          <motion.div
            className="v2-shead v2-shead--center"
            initial="hidden"
            whileInView="visible"
            viewport={viewOnce}
            variants={fadeUp}
          >
            <SectionLabel>Works well with</SectionLabel>
            <h2 className="serif-display v2-shead__title">
              Related <em>services</em>
            </h2>
          </motion.div>
          <ul className="sd-related-grid" ref={relatedRef}>
            {related.map((rel) => (
              <li key={rel.slug}>
                <Link to={`/services/${rel.slug}`} className="sd-related-card">
                  <ChipIcon icon={rel.icon} size={40} tone="soft" />
                  <h3>{rel.name}</h3>
                  <p>{rel.description}</p>
                  <span className="sd-related-more">
                    Explore
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <PageCta content={serviceDetailCta(service)} className="sd-cta" />
    </article>
  );
}
