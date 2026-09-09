import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICE_SCROLL_STEPS } from '../data/serviceScrollSteps';
import { prefersReducedMotion } from './scrollReveal';
import { setNavScrollLocked } from './navScrollGate';
import { MQ_DESKTOP_MIN, MQ_TABLET_MAX } from './breakpoints';

gsap.registerPlugin(ScrollTrigger);

const NAV_OFFSET = 86;
const SCROLL_END_DESKTOP = '+=180%';
const SCROLL_END_MOBILE = '+=100%';

function getActiveStep(steps, progress) {
  let active = steps[0];
  for (const step of steps) {
    if (progress >= step.at) active = step;
  }
  return active;
}

function getVis(root) {
  return root.querySelector('[data-vis]');
}

function clamp01(t) {
  return Math.max(0, Math.min(1, t));
}

function getSerpStep(vis) {
  const items = [...vis.querySelectorAll('[data-serp-item]')];
  if (items.length < 2) return 0;
  return items[1].offsetTop - items[0].offsetTop;
}

/** SEO, your listing rises; each row above shifts down one slot. */
function syncSerpScroll(vis, progress) {
  const t = lerpProgress(progress, 0.12, 0.82);
  const items = [...vis.querySelectorAll('[data-serp-item]')];
  const step = getSerpStep(vis);
  if (!step || !items.length) return;

  items.forEach((el, i) => {
    const isYou = el.classList.contains('is-you');
    const startSlot = i;
    const endSlot = isYou ? 0 : i + 1;
    gsap.set(el, {
      y: (endSlot - startSlot) * step * t,
      zIndex: isYou ? 4 : 1,
      opacity: isYou ? 0.55 + 0.45 * t : 1,
    });
  });

  const posEl = vis.querySelector('.is-you .sd-vis__serp-pos');
  if (posEl) posEl.textContent = String(Math.round(8 - 7 * t));
}

function lerpProgress(p, start, end) {
  return clamp01((p - start) / (end - start));
}

/** Measured phone rise + feed scroll for social hero (viewport-safe). */
function measureFeedScrollMax(track, screen) {
  if (!track || !screen) return 0;

  const viewport = screen.clientHeight;
  if (viewport <= 0) return 0;

  const posts = [...track.querySelectorAll('.sd-vis__post')];
  let contentHeight = Math.max(track.offsetHeight, track.scrollHeight);

  if (posts.length >= 2) {
    const last = posts[posts.length - 1];
    contentHeight = Math.max(contentHeight, last.offsetTop + last.offsetHeight);
  }

  if (contentHeight <= viewport + 4 && posts.length >= 2) {
    contentHeight = posts.reduce((sum, post) => sum + post.offsetHeight, 0);
  }

  return Math.max(0, contentHeight - viewport);
}

/** @type {WeakMap<HTMLElement, { feedMax: number, phoneStart: number, phoneEnd: number }>} */
const socialMotionCache = new WeakMap();

function invalidateSocialMotionCache(root) {
  socialMotionCache.delete(root);
}

function getSocialFeedMotion(root) {
  const vis = getVis(root);
  if (!vis) {
    return { phoneStart: 0, phoneEnd: 0, feedMax: 0, phone: null, track: null, screen: null };
  }

  const phone = vis.querySelector('[data-phone]');
  const track = vis.querySelector('[data-feed-track]');
  const screen = vis.querySelector('.sd-vis__phone-screen');
  const dock = vis.querySelector('.sd-vis__phone-dock');

  const cached = socialMotionCache.get(root);
  if (cached && cached.phone === phone && cached.track === track && cached.screen === screen) {
    return { ...cached, phone, track, screen };
  }

  const phoneHeight = phone?.getBoundingClientRect().height ?? 0;
  const dockHeight = dock?.clientHeight ?? 0;

  // Bottom-anchored in the dock; positive Y sinks the chassis below the clip edge.
  // Cap rise so the crown/bezel never crosses above the dock top (overflow:hidden).
  let phoneStart = 0;
  let phoneEnd = 0;

  if (phoneHeight > 0) {
    const topClearance = 14;
    phoneStart = phoneHeight * 0.54;
    if (dockHeight > 0) {
      const risen = phoneHeight - dockHeight + topClearance;
      phoneEnd = Math.min(phoneStart, Math.max(risen, phoneHeight * 0.16));
    } else {
      phoneEnd = phoneHeight * 0.2;
    }
  }

  const motion = {
    phoneStart,
    phoneEnd,
    feedMax: measureFeedScrollMax(track, screen),
    phone,
    track,
    screen,
    dockHeight,
  };

  const postCount = track?.querySelectorAll('.sd-vis__post').length ?? 0;
  if (motion.feedMax > 0 || postCount === 0) {
    socialMotionCache.set(root, motion);
  }

  return motion;
}

/** Keep menu before/after layers from jumping during scroll crossfade. */
function syncMenuPanelHeight(root) {
  const vis = getVis(root);
  if (!vis) return;

  const panel = vis.querySelector('.sd-vis__menu-panel');
  const before = vis.querySelector('[data-menu-before]');
  const after = vis.querySelector('[data-menu-after]');
  if (!panel || !before || !after) return;

  const height = Math.max(before.scrollHeight, after.scrollHeight, 140);
  panel.style.minHeight = `${height}px`;
}

function getMenuMotion(root) {
  syncMenuPanelHeight(root);
  const vis = getVis(root);
  const panel = vis?.querySelector('.sd-vis__menu-panel');
  const panelHeight = panel?.clientHeight ?? 168;

  return {
    afterY: Math.min(14, Math.max(8, panelHeight * 0.07)),
    addonY: Math.min(8, Math.max(4, panelHeight * 0.04)),
  };
}

/** Scrub-safe phone rise + feed scroll inside the mockup. */
function syncSocialFeedScroll(root, progress) {
  const { phoneStart, phoneEnd, feedMax, phone, track, screen } = getSocialFeedMotion(root);
  const phoneT = lerpProgress(progress, 0, 0.25);
  const feedT = lerpProgress(progress, 0.12, 1);
  const feedScroll = feedMax * feedT;

  if (phone) {
    gsap.set(phone, { y: phoneStart + (phoneEnd - phoneStart) * phoneT });
  }

  if (track) {
    gsap.set(track, { y: -feedScroll, force3D: true });
  }

  if (screen) {
    screen.scrollTop = 0;
  }
}

/** Scrub-safe menu crossfade — reverses cleanly when scrolling back up. */
function syncMenuVisualScroll(root, progress) {
  const vis = getVis(root);
  if (!vis) return;

  syncMenuPanelHeight(root);
  const { afterY, addonY } = getMenuMotion(root);
  const beforeItems = [...vis.querySelectorAll('[data-menu-item]')];
  const after = vis.querySelector('[data-menu-after]');
  const featured = vis.querySelector('[data-menu-featured]');
  const addon = vis.querySelector('[data-menu-addon]');

  const fadeOut = lerpProgress(progress, 0.14, 0.4);
  beforeItems.forEach((item, index) => {
    const itemT = clamp01(fadeOut * 1.15 - index * 0.08);
    gsap.set(item, {
      opacity: 1 - itemT,
      scale: 1 - itemT * 0.04,
      y: -6 * itemT,
    });
  });

  const afterT = lerpProgress(progress, 0.42, 0.78);
  if (after) {
    gsap.set(after, {
      opacity: afterT,
      y: afterY * (1 - afterT),
      pointerEvents: afterT > 0.5 ? 'auto' : 'none',
    });
  }

  const featuredT = lerpProgress(progress, 0.46, 0.8);
  if (featured) {
    gsap.set(featured, { scale: 0.96 + featuredT * 0.04 });
  }

  const addonT = lerpProgress(progress, 0.58, 0.88);
  if (addon) {
    gsap.set(addon, {
      opacity: addonT,
      y: addonY * (1 - addonT),
    });
  }
}

/** Menu optimization, AOV £24→£31 tied to scroll (scrub-safe). */
function syncMenuAov(root, progress) {
  const aov = root.querySelector('[data-aov]');
  if (!aov) return;
  const t = lerpProgress(progress, 0.52, 0.92);
  aov.textContent = `£${Math.round(24 + t * 7)}`;
}

/** Scrub-safe counter / text sync for all service hero visuals. */
function syncVisualScroll(slug, root, progress) {
  const p = clamp01(progress);
  const vis = getVis(root);
  if (!vis) return;

  switch (slug) {
    case 'menu-optimization':
      syncMenuAov(root, p);
      syncMenuVisualScroll(root, p);
      break;
    case 'social-media-marketing':
      syncSocialFeedScroll(root, p);
      break;
    case 'call-handling': {
      const missed = vis.querySelector('[data-missed]');
      const handled = vis.querySelector('[data-handled]');
      const path = vis.querySelector('[data-call-path]');
      if (missed) missed.textContent = String(Math.round(12 - lerpProgress(p, 0, 0.32) * 11));
      if (handled) handled.textContent = String(Math.round(lerpProgress(p, 0.38, 0.93) * 47));
      if (path) {
        const len = path.getTotalLength?.() ?? 192;
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len * (1 - lerpProgress(p, 0.12, 0.52)));
      }
      break;
    }
    case 'sms-email-marketing': {
      const pool = vis.querySelector('[data-pool]');
      if (pool) pool.textContent = Math.round(lerpProgress(p, 0.05, 0.45) * 2400).toLocaleString('en-GB');
      break;
    }
    case 'reviews-monitoring': {
      const rating = vis.querySelector('[data-rating]');
      if (rating) rating.textContent = (3.8 + lerpProgress(p, 0.4, 0.88) * 1.1).toFixed(1);
      const review = vis.querySelector('[data-review]');
      if (review) {
        review.textContent = p > 0.58 ? 'Replied in under 2h, guest updated to 5★' : 'Waiting on replies…';
        review.style.opacity = String(0.55 + lerpProgress(p, 0.58, 0.85) * 0.45);
      }
      break;
    }
    case 'customer-database-growth': {
      const ring = vis.querySelector('[data-db-ring]');
      const count = vis.querySelector('[data-db-count]');
      const ringLen = 327;
      const ringEnd = 65;
      const t = lerpProgress(p, 0.1, 0.8);
      if (ring) ring.style.strokeDashoffset = String(ringLen - (ringLen - ringEnd) * t);
      if (count) count.textContent = Math.round(t * 2840).toLocaleString('en-GB');
      break;
    }
    case 'seo-optimization':
      syncSerpScroll(vis, p);
      break;
    default:
      break;
  }
}

/** Initial visual state before scroll (avoids flash / broken layout). */
function setInitialState(slug, root) {
  const vis = getVis(root);
  if (!vis) return;

  switch (slug) {
    case 'call-handling': {
      const path = vis.querySelector('[data-call-path]');
      if (path) {
        const len = path.getTotalLength?.() ?? 192;
        path.style.strokeDasharray = String(len);
        path.style.strokeDashoffset = String(len);
      }
      const missed = vis.querySelector('[data-missed]');
      const handled = vis.querySelector('[data-handled]');
      if (missed) missed.textContent = '12';
      if (handled) handled.textContent = '0';
      break;
    }
    case 'social-media-marketing': {
      syncSocialFeedScroll(root, 0);
      break;
    }
    case 'graphic-designing':
      vis.querySelectorAll('[data-layer]').forEach((layer, i) => {
        gsap.set(layer, {
          xPercent: -50,
          yPercent: -50,
          left: '50%',
          top: '50%',
          x: i * 26,
          y: i * 22,
          rotate: -10 + i * 6,
          opacity: 0.45,
          scale: 0.88,
        });
      });
      break;
    case 'menu-optimization':
      syncMenuVisualScroll(root, 0);
      {
        const aov = vis.querySelector('[data-aov]');
        if (aov) aov.textContent = '£24';
      }
      break;
    case 'sms-email-marketing':
      gsap.set(vis.querySelector('[data-email-bar]'), { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(vis.querySelector('[data-sms-bar]'), { scaleX: 0, transformOrigin: 'left center' });
      {
        const pool = vis.querySelector('[data-pool]');
        if (pool) pool.textContent = '0';
      }
      break;
    case 'weekly-performance-insights':
      vis.querySelectorAll('[data-bar]').forEach((bar) => {
        gsap.set(bar, { scaleY: 0.08, transformOrigin: 'bottom center' });
      });
      vis.querySelectorAll('[data-action]').forEach((el) => {
        gsap.set(el, { opacity: 0.35, x: 8 });
      });
      break;
    case 'third-party-platforms':
      vis.querySelectorAll('[data-platform]').forEach((card) => {
        card.classList.remove('is-synced');
        const text = card.querySelector('[data-status-text]');
        if (text) text.textContent = 'Out of sync';
      });
      break;
    case 'customer-database-growth': {
      const ring = vis.querySelector('[data-db-ring]');
      if (ring) ring.style.strokeDashoffset = '327';
      const count = vis.querySelector('[data-db-count]');
      if (count) count.textContent = '0';
      const ringIcon = vis.querySelector('.sd-vis__db-center-icon');
      if (ringIcon) gsap.set(ringIcon, { scale: 0.88, opacity: 0.5 });
      break;
    }
    case 'reviews-monitoring':
      vis.querySelectorAll('[data-star]').forEach((star) => {
        gsap.set(star, { opacity: 0.35, scale: 0.92 });
      });
      {
        const rating = vis.querySelector('[data-rating]');
        if (rating) rating.textContent = '3.8';
        const review = vis.querySelector('[data-review]');
        if (review) {
          review.textContent = 'Waiting on replies…';
          review.style.opacity = '0.55';
        }
      }
      break;
    case 'seo-optimization':
      syncSerpScroll(vis, 0);
      break;
    default:
      break;
  }
}

function setReducedFinal(slug, root) {
  const vis = getVis(root);
  if (!vis) return;

  switch (slug) {
    case 'call-handling': {
      const path = vis.querySelector('[data-call-path]');
      if (path) path.style.strokeDashoffset = '0';
      const missed = vis.querySelector('[data-missed]');
      const handled = vis.querySelector('[data-handled]');
      if (missed) missed.textContent = '1';
      if (handled) handled.textContent = '47';
      const handledIcon = vis.querySelector('.sd-vis__calls-icon--handled');
      if (handledIcon) gsap.set(handledIcon, { scale: 1 });
      break;
    }
    case 'social-media-marketing':
      syncSocialFeedScroll(root, 1);
      break;
    case 'sms-email-marketing': {
      const pool = vis.querySelector('[data-pool]');
      if (pool) pool.textContent = '2,400';
      gsap.set(vis.querySelector('[data-email-bar]'), { scaleX: 0.72 });
      gsap.set(vis.querySelector('[data-sms-bar]'), { scaleX: 0.88 });
      break;
    }
    case 'graphic-designing': {
      const layerSpread = [
        { x: -118, y: 36, rotate: -6 },
        { x: 0, y: -8, rotate: 0 },
        { x: 118, y: -40, rotate: 6 },
      ];
      vis.querySelectorAll('[data-layer]').forEach((layer, i) => {
        const pos = layerSpread[i] ?? layerSpread[1];
        gsap.set(layer, {
          xPercent: -50,
          yPercent: -50,
          x: pos.x,
          y: pos.y,
          rotate: pos.rotate,
          opacity: 1,
          scale: 1,
        });
      });
      break;
    }
    case 'menu-optimization':
      syncMenuVisualScroll(root, 1);
      {
        const aov = vis.querySelector('[data-aov]');
        if (aov) aov.textContent = '£31';
      }
      break;
    case 'third-party-platforms':
      vis.querySelectorAll('[data-platform]').forEach((card) => {
        card.classList.add('is-synced');
        gsap.set(card, { borderColor: 'var(--sd-vis-accent)' });
        const text = card.querySelector('[data-status-text]');
        if (text) text.textContent = 'Synced';
      });
      break;
    case 'customer-database-growth': {
      const ring = vis.querySelector('[data-db-ring]');
      if (ring) ring.style.strokeDashoffset = '65';
      const count = vis.querySelector('[data-db-count]');
      if (count) count.textContent = '2,840';
      const ringIcon = vis.querySelector('.sd-vis__db-center-icon');
      if (ringIcon) gsap.set(ringIcon, { scale: 1, opacity: 1 });
      break;
    }
    case 'reviews-monitoring': {
      vis.querySelectorAll('[data-star]').forEach((s) => {
        s.classList.add('is-lit');
        gsap.set(s, { opacity: 1, scale: 1 });
      });
      const rating = vis.querySelector('[data-rating]');
      if (rating) {
        rating.textContent = '4.9';
        gsap.set(rating, { scale: 1 });
      }
      const review = vis.querySelector('[data-review]');
      if (review) {
        review.textContent = 'Replied in under 2h, guest updated to 5★';
        review.style.opacity = '1';
        gsap.set(review, { y: 0, opacity: 1 });
      }
      break;
    }
    case 'weekly-performance-insights':
      vis.querySelectorAll('[data-bar]').forEach((bar) => {
        const h = Number(bar.dataset.h || 50) / 100;
        gsap.set(bar, { scaleY: h, transformOrigin: 'bottom center' });
      });
      vis.querySelectorAll('[data-action]').forEach((el) => {
        gsap.set(el, { opacity: 1, x: 0 });
      });
      {
        const week = vis.querySelector('[data-week]');
        if (week) week.textContent = 'Week 4';
      }
      break;
    case 'seo-optimization':
      syncSerpScroll(vis, 1);
      break;
    default:
      break;
  }
}

function buildSlugTimeline(slug, root, tl) {
  const vis = getVis(root);
  if (!vis) return;

  /* Beat 1 ≈ 0–0.35 | Beat 2 ≈ 0.35–0.7 | Beat 3 ≈ 0.7–1 */

  switch (slug) {
    case 'call-handling': {
      const handledIcon = vis.querySelector('.sd-vis__calls-icon--handled');
      if (handledIcon) {
        tl.fromTo(
          handledIcon,
          { scale: 0.85, immediateRender: false },
          { scale: 1, duration: 0.35, ease: 'power2.out', immediateRender: false },
          0.38,
        );
      }
      break;
    }
    case 'social-media-marketing':
      tl.to({}, { duration: 1, ease: 'none' });
      break;
    case 'sms-email-marketing': {
      const emailBar = vis.querySelector('[data-email-bar]');
      const smsBar = vis.querySelector('[data-sms-bar]');
      if (emailBar) tl.to(emailBar, { scaleX: 0.72, duration: 0.45, ease: 'power1.inOut' }, 0.38);
      if (smsBar) tl.to(smsBar, { scaleX: 0.88, duration: 0.5, ease: 'power1.inOut' }, 0.55);
      break;
    }
    case 'graphic-designing': {
      const layerSpread = [
        { x: -118, y: 36, rotate: -6 },
        { x: 0, y: -8, rotate: 0 },
        { x: 118, y: -40, rotate: 6 },
      ];
      vis.querySelectorAll('[data-layer]').forEach((layer, i) => {
        const pos = layerSpread[i] ?? layerSpread[1];
        tl.to(layer, {
          x: pos.x,
          y: pos.y,
          rotate: pos.rotate,
          opacity: 1,
          scale: 1,
          duration: 0.42,
          ease: 'power2.inOut',
        }, 0.08 + i * 0.18);
      });
      break;
    }
    case 'menu-optimization':
      tl.to({}, { duration: 1, ease: 'none' });
      break;
    case 'third-party-platforms': {
      vis.querySelectorAll('[data-platform]').forEach((card, i) => {
        const text = card.querySelector('[data-status-text]');
        const pos = 0.22 + i * 0.2;
        tl.fromTo(
          card,
          { borderColor: 'var(--line)' },
          { borderColor: 'var(--sd-vis-accent)', duration: 0.38, ease: 'power2.inOut' },
          pos,
        );
        const flip = { t: 0 };
        tl.to(flip, {
          t: 1,
          duration: 0.32,
          ease: 'power2.inOut',
          onUpdate: () => {
            const synced = flip.t > 0.5;
            card.classList.toggle('is-synced', synced);
            if (text) text.textContent = synced ? 'Synced' : 'Out of sync';
          },
        }, pos + 0.05);
      });
      break;
    }
    case 'customer-database-growth': {
      const ringIcon = vis.querySelector('.sd-vis__db-center-icon');
      if (ringIcon) {
        tl.fromTo(
          ringIcon,
          { scale: 0.88, opacity: 0.5, immediateRender: false },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out', immediateRender: false },
          0.15,
        );
      }
      break;
    }
    case 'reviews-monitoring': {
      vis.querySelectorAll('[data-star]').forEach((star, i) => {
        tl.fromTo(
          star,
          { opacity: 0.35, scale: 0.92, immediateRender: false },
          { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.inOut', immediateRender: false },
          0.18 + i * 0.1,
        );
      });
      const rating = vis.querySelector('[data-rating]');
      if (rating) {
        tl.fromTo(rating, { scale: 0.92 }, { scale: 1, duration: 0.45, ease: 'power2.out' }, 0.4);
      }
      const review = vis.querySelector('[data-review]');
      if (review) {
        tl.fromTo(review, { y: 6, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, 0.58);
      }
      break;
    }
    case 'weekly-performance-insights': {
      const bars = [...vis.querySelectorAll('[data-bar]')];
      const week = vis.querySelector('[data-week]');
      const labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
      bars.forEach((bar, i) => {
        const h = Number(bar.dataset.h || 50) / 100;
        tl.to(bar, { scaleY: h, duration: 0.2, ease: 'power2.inOut' }, 0.05 + i * 0.1);
      });
      labels.forEach((label, i) => {
        tl.to(week, {
          duration: 0.15,
          ease: 'power1.inOut',
          onStart: () => { if (week) week.textContent = label; },
        }, 0.3 + i * 0.18);
      });
      vis.querySelectorAll('[data-action]').forEach((el, i) => {
        tl.to(el, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' }, 0.72 + i * 0.07);
      });
      break;
    }
    default:
      break;
  }
}

function lockStoryEnd(slug, root, steps, tl, els) {
  tl.progress(1, false);
  syncVisualScroll(slug, root, 1);
  setReducedFinal(slug, root);
  const final = getActiveStep(steps, 1);
  if (els.labelEl) els.labelEl.textContent = final.label;
  if (els.textEl) els.textEl.textContent = final.text;
  if (els.progressFill) els.progressFill.style.transform = 'scaleX(1)';
  root.classList.add('is-story-complete');
}

function holdStoryEnd(slug, root, tl) {
  if (tl.progress() < 1) tl.progress(1, false);
  syncVisualScroll(slug, root, 1);
}

/**
 * Pinned hero scroll story, copy left, animated card right.
 * @param {string} slug
 * @param {HTMLElement} root, .sd-hero--story
 */
export function initServiceScrollStory(slug, root) {
  if (!root) return () => {};

  const steps = SERVICE_SCROLL_STEPS[slug];
  if (!steps?.length) return () => {};

  const labelEl = root.querySelector('[data-step-label]');
  const textEl = root.querySelector('[data-step-text]');
  const progressFill = root.querySelector('[data-progress-fill]');

  if (typeof window !== 'undefined' && window.__PRERENDER__) {
    const final = getActiveStep(steps, 1);
    if (labelEl) labelEl.textContent = final.label;
    if (textEl) textEl.textContent = final.text;
    if (progressFill) progressFill.style.transform = 'scaleX(1)';
    setReducedFinal(slug, root);
    root.classList.add('is-story-ready');
    return () => {};
  }

  const beatWrap = root.querySelector('[data-step-beat]');

  let lastLabel = null;

  const syncNarrative = (progress) => {
    const p = Math.max(0, Math.min(1, progress));
    const beat = getActiveStep(steps, p);
    if (progressFill) progressFill.style.transform = `scaleX(${p})`;
    if (beat.label === lastLabel) return;

    if (lastLabel !== null && beatWrap) {
      gsap.fromTo(beatWrap, { opacity: 0.5, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', overwrite: true });
    }
    lastLabel = beat.label;
    if (labelEl) labelEl.textContent = beat.label;
    if (textEl) textEl.textContent = beat.text;
  };

  if (prefersReducedMotion()) {
    const final = getActiveStep(steps, 1);
    if (labelEl) labelEl.textContent = final.label;
    if (textEl) textEl.textContent = final.text;
    if (progressFill) progressFill.style.transform = 'scaleX(1)';
    setReducedFinal(slug, root);
    root.classList.add('is-story-ready');
    return () => {};
  }

  setNavScrollLocked(true);

  setInitialState(slug, root);
  syncNarrative(0);
  syncVisualScroll(slug, root, 0);

  if (slug === 'menu-optimization') syncMenuPanelHeight(root);

  let resizeObserver = null;
  let refreshRaf = null;
  let storyTl = null;
  const narrativeEls = { labelEl, textEl, progressFill };

  const attachStory = (pin, scrollEnd) => {
    storyTl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root,
        start: `top ${NAV_OFFSET}px`,
        end: scrollEnd,
        pin,
        pinSpacing: pin,
        scrub: 0.45,
        anticipatePin: pin ? 0 : false,
        invalidateOnRefresh: true,
        onEnter: () => {
          setNavScrollLocked(true);
          if (pin) root.classList.add('is-pinned');
        },
        onEnterBack: () => {
          setNavScrollLocked(true);
          if (pin) root.classList.add('is-pinned');
          root.classList.remove('is-story-complete');
          lastLabel = null;
        },
        onUpdate: (self) => {
          if (root.classList.contains('is-story-complete')) {
            holdStoryEnd(slug, root, storyTl);
            return;
          }
          syncNarrative(self.progress);
          syncVisualScroll(slug, root, self.progress);
        },
        onLeave: (self) => {
          root.classList.remove('is-pinned');
          if (self.direction === 1 && storyTl) {
            lockStoryEnd(slug, root, steps, storyTl, narrativeEls);
            setNavScrollLocked(false);
          }
        },
        onLeaveBack: () => {
          root.classList.remove('is-pinned');
          root.classList.remove('is-story-complete');
          setNavScrollLocked(true);
          lastLabel = null;
          syncNarrative(0);
          if (storyTl) storyTl.progress(0, false);
          syncVisualScroll(slug, root, 0);
        },
      },
    });

    buildSlugTimeline(slug, root, storyTl);
  };

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ_TABLET_MAX, () => attachStory(false, SCROLL_END_MOBILE));
    mm.add(MQ_DESKTOP_MIN, () => attachStory(true, SCROLL_END_DESKTOP));
  }, root);

  const refresh = () => {
    if (slug === 'menu-optimization') syncMenuPanelHeight(root);
    if (slug === 'social-media-marketing') invalidateSocialMotionCache(root);
    ScrollTrigger.refresh();
    const progress = storyTl?.progress() ?? 0;
    if (root.classList.contains('is-story-complete')) {
      lockStoryEnd(slug, root, steps, storyTl, narrativeEls);
    } else if (storyTl) {
      syncVisualScroll(slug, root, progress);
    }
  };

  const scheduleRefresh = () => {
    if (refreshRaf) cancelAnimationFrame(refreshRaf);
    refreshRaf = requestAnimationFrame(() => {
      refreshRaf = null;
      refresh();
    });
  };

  refresh();
  root.classList.add('is-story-ready');

  resizeObserver = new ResizeObserver(() => {
    scheduleRefresh();
  });
  resizeObserver.observe(root);
  const visWrap = root.querySelector('.sd-hero__visual-wrap');
  if (visWrap) resizeObserver.observe(visWrap);
  if (slug === 'social-media-marketing' || slug === 'menu-optimization') {
    const vis = getVis(root);
    if (vis) {
      resizeObserver.observe(vis);
      const screen = vis.querySelector('.sd-vis__phone-screen');
      if (screen) resizeObserver.observe(screen);
      if (slug === 'social-media-marketing') {
        vis.querySelectorAll('.sd-vis__post-media img').forEach((img) => {
          const bump = () => scheduleRefresh();
          if (img.complete) {
            bump();
          } else {
            img.addEventListener('load', bump, { once: true });
            img.addEventListener('error', bump, { once: true });
          }
        });
      }
    }
  }

  return () => {
    setNavScrollLocked(false);
    if (refreshRaf) cancelAnimationFrame(refreshRaf);
    root.classList.remove('is-pinned');
    root.classList.remove('is-story-complete');
    root.classList.remove('is-story-ready');
    resizeObserver?.disconnect();
    ctx.revert();
  };
}
