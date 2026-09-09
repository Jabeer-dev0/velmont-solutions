import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { headlineToPlainText } from '../../data/heroHeadlines';
import { HERO_OPEN_EVENT } from '../../lib/heroOpening';

const INTERVAL_MS = 4000;
const ROTATION_DELAY_MS = 1200;

function tokenize(text) {
  return text.split(/(\s+)/).filter(Boolean);
}

function HeadlineLine({ parts }) {
  const chunks = parts.flatMap((part) =>
    tokenize(part.text).map((token) => ({ token, em: part.em && !/^\s+$/.test(token) })),
  );

  return (
    <>
      {chunks.map(({ token, em }, index) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={index} className="v2-hero__space">
              {token}
            </span>
          );
        }

        const content = [...token].map((char, charIndex) => (
          <span key={charIndex} className="v2-hero__char" data-char={char}>
            {char}
          </span>
        ));

        return (
          <span key={index} className="v2-hero__word" data-word={token.trim()}>
            {em ? <em>{content}</em> : content}
          </span>
        );
      })}
    </>
  );
}

/** @param {{ headlines: import('../../data/heroHeadlines').HeroHeadline[] }} props */
export function HeroRotatingTitle({ headlines }) {
  const wrapRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    if (reduceMotion || headlines.length < 2 || !wrapRef.current) return undefined;

    const lines = [...wrapRef.current.querySelectorAll('.v2-hero__text-line')];
    const charGroups = lines.map((line) =>
      [...line.querySelectorAll('.v2-hero__word')].map((word) => [
        ...word.querySelectorAll('.v2-hero__char'),
      ]),
    );

    let currentIndex = 0;
    let isAnimating = false;
    let intervalId = 0;
    let delayId = 0;

    const runTransition = () => {
      if (isAnimating) return;
      isAnimating = true;

      const upcomingIndex = currentIndex ? 0 : 1;
      const tl = gsap.timeline({
        onComplete: () => {
          currentIndex = upcomingIndex;
          setActiveIndex(upcomingIndex);
          isAnimating = false;
        },
      });

      charGroups[currentIndex].forEach((wordChars) => {
        const wordTimeline = gsap.timeline().fromTo(
          wordChars,
          {
            willChange: 'transform',
            transformOrigin: '50% 0%',
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
          },
          {
            duration: 0.3,
            ease: 'power4.out',
            opacity: 0,
            xPercent: () => gsap.utils.random(-50, 50),
            yPercent: () => gsap.utils.random(-50, 50),
            stagger: { each: 0.03, from: 'random' },
          },
        );
        tl.add(wordTimeline, Math.random() * 0.3);
      });

      tl.add(() => {
        lines[currentIndex].classList.remove('is-current');
      });

      tl.add(() => {
        lines[upcomingIndex].classList.add('is-current');
      }, '>-=0.6').addLabel('incoming', '>');

      charGroups[upcomingIndex].forEach((wordChars) => {
        const wordTimeline = gsap.timeline().fromTo(
          wordChars,
          {
            willChange: 'transform',
            transformOrigin: '50% 100%',
            opacity: 0,
            xPercent: () => gsap.utils.random(-50, 50),
            yPercent: () => gsap.utils.random(-50, 50),
          },
          {
            duration: 0.4,
            ease: 'power4.out',
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            stagger: { each: 0.02, from: 'random' },
          },
        );
        tl.add(wordTimeline, `incoming+=${Math.random() * 0.3}`);
      });
    };

    const startRotation = () => {
      delayId = window.setTimeout(() => {
        intervalId = window.setInterval(runTransition, INTERVAL_MS);
      }, ROTATION_DELAY_MS);
    };

    const hero = wrapRef.current.closest('.v2-hero');
    if (hero?.classList.contains('is-open')) {
      startRotation();
    } else if (hero) {
      hero.addEventListener(HERO_OPEN_EVENT, startRotation, { once: true });
    } else {
      startRotation();
    }

    return () => {
      hero?.removeEventListener(HERO_OPEN_EVENT, startRotation);
      window.clearTimeout(delayId);
      window.clearInterval(intervalId);
    };
  }, [headlines, reduceMotion]);

  return (
    <h1 className="v2-hero__title serif-display">
      <span className="v2-hero__sr">{headlineToPlainText(headlines[activeIndex])}</span>
      <div ref={wrapRef} className="v2-hero__title-wrap" aria-hidden="true">
        {headlines.map((headline, index) => (
          <div
            key={headlineToPlainText(headline)}
            className={`v2-hero__text-line${index === 0 ? ' is-current' : ''}`}
          >
            <HeadlineLine parts={headline} />
          </div>
        ))}
      </div>
    </h1>
  );
}
