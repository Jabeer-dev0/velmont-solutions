import { useLayoutEffect, useRef } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionImage } from '../ui/SectionImage';
import { ScrollWords } from '../ui/ScrollWords';
import { site } from '../../data/site';
import { animateStage3d } from '../../lib/stage3d';

/**
 * Sticky 3D scroll stage - a device that starts tilted back in perspective
 * and rotates face-on as you scroll, its screen content lifting into place.
 * The signature Macbook-scroll style hero interaction.
 */
export function ScrollStage3d() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    return animateStage3d(sectionRef.current);
  }, []);

  return (
    <section className="v3-stage" ref={sectionRef} aria-labelledby="v3-stage-title">
      <div className="v3-stage__pin" data-stage3d>
        <div className="v3-stage__head">
          <SectionLabel>Built to perform</SectionLabel>
          <ScrollWords
            as="h2"
            id="v3-stage-title"
            className="serif-display v3-stage__title"
            start="top 90%"
          >
            Every venue gets a system that <em>works while you sleep.</em>
          </ScrollWords>
        </div>

        <div className="v3-stage__scene" aria-hidden="true">
          <div className="v3-stage__device" data-stage3d-card>
            <div className="v3-stage__bezel">
              <span className="v3-stage__cam" />
              <div className="v3-stage__screen" data-stage3d-screen>
                <SectionImage
                  src={site.images.servicesFeature}
                  alt=""
                  className="v3-stage__screen-img"
                  loading="lazy"
                  decoding="async"
                  width={1400}
                  height={933}
                />
                <div className="v3-stage__screen-ui">
                  <span className="v3-stage__dot" />
                  <span className="v3-stage__dot" />
                  <span className="v3-stage__dot" />
                  <span className="v3-stage__url">velmontsolutionsgroup.com</span>
                </div>
              </div>
            </div>
            <div className="v3-stage__base" data-stage3d-lid>
              <span className="v3-stage__notch" />
            </div>
          </div>
          <div className="v3-stage__glow" />
          <div className="v3-stage__floor" />
        </div>

        <p className="v3-stage__caption">
          Social, reviews, calls and reporting — one dashboard, updated every week.
        </p>
      </div>
    </section>
  );
}
