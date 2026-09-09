import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import {
  formatTestimonialAttribution,
  showcaseTestimonials,
} from '../../data/testimonials';
import { usePrefersReducedMotion } from '../../lib/aboutMotion';

const AUTO_ADVANCE_MS = 6500;
const SNAP_FALLBACK_MS = 520;
const CLONE_END_INDEX_OFFSET = 1;
const SCROLL_END_MS = 80;

function TestimonialSlideContent({ item, quoteClassName, attrClassName }) {
  return (
    <div className="v2-show__quote-slide-inner">
      <blockquote className={quoteClassName}>{item.quote}</blockquote>
      <figcaption className={attrClassName}>{formatTestimonialAttribution(item)}</figcaption>
    </div>
  );
}

function buildLoopSlides(items) {
  if (items.length <= 1) return items;

  const first = items[0];
  const last = items[items.length - 1];

  return [
    { ...last, id: `${last.id}-clone-pre`, isClone: true },
    ...items,
    { ...first, id: `${first.id}-clone-post`, isClone: true },
  ];
}

function slideSizeStyle(width) {
  if (!width) return undefined;
  return {
    width: `${width}px`,
    minWidth: `${width}px`,
    maxWidth: `${width}px`,
    flex: `0 0 ${width}px`,
  };
}

export const ShowcaseQuoteCarousel = forwardRef(function ShowcaseQuoteCarousel(
  { satisfaction, className, ...rest },
  forwardedRef,
) {
  const reducedMotion = usePrefersReducedMotion();
  const count = showcaseTestimonials.length;
  const loopEnabled = count > 1;
  const loopSlides = useMemo(() => buildLoopSlides(showcaseTestimonials), []);
  const cloneEndIndex = count + CLONE_END_INDEX_OFFSET;
  const startIndex = loopEnabled ? 1 : 0;

  const [positionIndex, setPositionIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const rootRef = useRef(null);
  const scrollerRef = useRef(null);
  const stripRef = useRef(null);
  const positionRef = useRef(startIndex);
  const skipFrameRef = useRef(null);
  const snapTimerRef = useRef(null);
  const scrollEndTimerRef = useRef(null);

  const logicalIndex = loopEnabled
    ? (positionIndex - 1 + count) % count
    : positionIndex;

  positionRef.current = positionIndex;

  const setRootRef = useCallback(
    (node) => {
      rootRef.current = node;
      if (typeof forwardedRef === 'function') forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  const measureScroller = useCallback(() => {
    const width = Math.round(scrollerRef.current?.getBoundingClientRect().width ?? 0);
    if (width > 0) setSlideWidth(width);
  }, []);

  useLayoutEffect(() => {
    measureScroller();
  }, [measureScroller]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(measureScroller);
    observer.observe(scroller);
    return () => observer.disconnect();
  }, [measureScroller]);

  useEffect(() => {
    window.addEventListener('resize', measureScroller);
    return () => window.removeEventListener('resize', measureScroller);
  }, [measureScroller]);

  const scrollToIndex = useCallback(
    (index, instant = false) => {
      const scroller = scrollerRef.current;
      if (!scroller || slideWidth <= 0) return;

      const left = index * slideWidth;
      if (Math.abs(scroller.scrollLeft - left) < 1) return;

      scroller.scrollTo({
        left,
        behavior: instant || reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion, slideWidth],
  );

  useLayoutEffect(() => {
    scrollToIndex(positionIndex, skipTransition);
  }, [positionIndex, scrollToIndex, skipTransition, slideWidth]);

  const snapTo = useCallback(
    (nextPosition) => {
      setSkipTransition(true);
      setPositionIndex(nextPosition);
      scrollToIndex(nextPosition, true);

      if (skipFrameRef.current) window.cancelAnimationFrame(skipFrameRef.current);
      skipFrameRef.current = window.requestAnimationFrame(() => {
        skipFrameRef.current = window.requestAnimationFrame(() => {
          setSkipTransition(false);
          skipFrameRef.current = null;
        });
      });
    },
    [scrollToIndex],
  );

  const handleLoopSnap = useCallback(() => {
    const pos = positionRef.current;
    if (pos === cloneEndIndex) snapTo(1);
    else if (pos === 0) snapTo(count);
  }, [cloneEndIndex, count, snapTo]);

  const scheduleLoopSnap = useCallback(() => {
    if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);

    snapTimerRef.current = window.setTimeout(() => {
      handleLoopSnap();
      snapTimerRef.current = null;
    }, reducedMotion ? 0 : SNAP_FALLBACK_MS);
  }, [handleLoopSnap, reducedMotion]);

  const paginate = useCallback(
    (delta) => {
      if (count <= 1) return;

      setPositionIndex((current) => {
        const next = current + delta;
        if (next > cloneEndIndex) return 1;
        if (next < 0) return count;
        return next;
      });
    },
    [cloneEndIndex, count],
  );

  const goNext = useCallback(() => paginate(1), [paginate]);
  const goPrev = useCallback(() => paginate(-1), [paginate]);

  const goToDot = useCallback(
    (dotIndex) => {
      if (dotIndex === logicalIndex) return;
      setPositionIndex(dotIndex + 1);
    },
    [logicalIndex],
  );

  useEffect(() => {
    if (reducedMotion || paused || count <= 1) return undefined;

    const timer = window.setTimeout(() => {
      paginate(1);
    }, AUTO_ADVANCE_MS);

    return () => window.clearTimeout(timer);
  }, [count, logicalIndex, paginate, paused, reducedMotion, positionIndex]);

  useEffect(() => {
    if (!loopEnabled) return undefined;

    if (positionIndex === cloneEndIndex || positionIndex === 0) {
      scheduleLoopSnap();
    }

    return () => {
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
    };
  }, [cloneEndIndex, loopEnabled, positionIndex, scheduleLoopSnap]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || !loopEnabled) return undefined;

    const onScroll = () => {
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);

      scrollEndTimerRef.current = window.setTimeout(() => {
        if (slideWidth <= 0) return;
        const pos = Math.round(scroller.scrollLeft / slideWidth);
        if (pos === cloneEndIndex || pos === 0) handleLoopSnap();
      }, SCROLL_END_MS);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
    };
  }, [cloneEndIndex, handleLoopSnap, loopEnabled, slideWidth]);

  useEffect(() => {
    return () => {
      if (skipFrameRef.current) window.cancelAnimationFrame(skipFrameRef.current);
      if (snapTimerRef.current) window.clearTimeout(snapTimerRef.current);
      if (scrollEndTimerRef.current) window.clearTimeout(scrollEndTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      }
    };

    root.addEventListener('keydown', onKeyDown);
    return () => root.removeEventListener('keydown', onKeyDown);
  }, [goNext, goPrev]);

  const slideStyle = slideSizeStyle(slideWidth);

  return (
    <figure
      className={className}
      ref={setRootRef}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      {...rest}
    >
      <div className="v2-show__quote-head" aria-hidden="true">
        <span className="v2-show__quote-mark serif-display">&ldquo;</span>
      </div>

      <div className="v2-show__quote-scroller" ref={scrollerRef}>
        <div
          ref={stripRef}
          className="v2-show__quote-strip"
          aria-live="polite"
          aria-atomic="true"
        >
          {loopSlides.map((item, slideIndex) => {
            const isActive = slideIndex === positionIndex;

            return (
              <article
                key={item.id}
                className="v2-show__quote-slide"
                style={slideStyle}
                aria-hidden={!isActive}
                inert={!isActive || undefined}
                data-clone={item.isClone ? 'true' : undefined}
              >
                <TestimonialSlideContent
                  item={item}
                  quoteClassName="v2-show__quote-text"
                  attrClassName="v2-show__quote-attr"
                />
              </article>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <div className="v2-show__quote-controls">
          <div className="v2-show__quote-nav">
            <button
              type="button"
              className="v2-show__quote-btn"
              onClick={goPrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="v2-show__quote-btn"
              onClick={goNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <div className="v2-show__quote-dots" role="tablist" aria-label="Choose testimonial">
            {showcaseTestimonials.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                className={`v2-show__quote-dot${dotIndex === logicalIndex ? ' is-active' : ''}`}
                aria-selected={dotIndex === logicalIndex}
                aria-label={`Testimonial ${dotIndex + 1} of ${count}`}
                onClick={() => goToDot(dotIndex)}
              />
            ))}
          </div>
        </div>
      )}

      {satisfaction && (
        <div className="v2-show__quote-badge">
          <span className="v2-show__quote-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={14} strokeWidth={0} fill="currentColor" />
            ))}
          </span>
          <span>
            <strong>{satisfaction.value}</strong> {satisfaction.label.toLowerCase()}
          </span>
        </div>
      )}
    </figure>
  );
});
