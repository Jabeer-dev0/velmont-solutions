import { useRef } from 'react';
import { SectionLabel } from '../ui/SectionLabel';
import { SectionImage } from '../ui/SectionImage';
import { ScrollWords } from '../ui/ScrollWords';
import { parallaxColumnsData } from '../../data/parallaxGallery';
import { useParallaxColumns, useScrollRevealStagger } from '../../lib/useScrollReveal';

/**
 * Scroll parallax mosaic - columns drift in opposite directions while the
 * grid stays clipped, a la the classic parallax-scroll pattern.
 */
export function ParallaxShowcase() {
  const gridRef = useRef(null);

  useScrollRevealStagger(gridRef, {
    targets: '.v2-pxl__tile',
    variant: 'scale-up',
    stagger: 0.08,
    start: 'top 90%',
  });
  useParallaxColumns(gridRef, { distance: 92 });

  return (
    <section className="v2-section v2-pxl" aria-labelledby="v2-pxl-title">
      <div className="v2-shead">
        <div>
          <SectionLabel>From the studio</SectionLabel>
          <ScrollWords
            as="h2"
            id="v2-pxl-title"
            className="serif-display v2-shead__title"
            start="top 90%"
          >
            Posts, menus and stories we <em>ship every week.</em>
          </ScrollWords>
        </div>
        <p className="v2-shead__sub">
          A glimpse of the social content, photography and print design that lands on your
          channels every single week.
        </p>
      </div>

      <div className="v2-pxl__grid" ref={gridRef}>
        {parallaxColumnsData.map((column, columnIndex) => (
          <div className="v2-pxl__col" data-pxl-col="" key={`col-${columnIndex}`}>
            {column.map((tile) => (
              <figure className="v2-pxl__tile" key={tile.src}>
                <SectionImage
                  src={tile.src}
                  alt={tile.alt}
                  className="v2-pxl__img"
                  loading="lazy"
                  decoding="async"
                  width={720}
                  height={900}
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
