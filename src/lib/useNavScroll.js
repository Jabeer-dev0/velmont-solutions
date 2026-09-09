import { useCallback, useEffect, useRef, useState } from 'react';
import { isNavScrollLocked, subscribeNavScrollLock } from './navScrollGate';

export const HEADER_HEIGHT = 86;

/** Minimum scroll delta before toggling hide/reveal (ignores layout-shift jitter). */
const SCROLL_DELTA = 6;

/** Scroll down past this before the nav can collapse off the hero overlay. */
const OVERLAY_EXIT = HEADER_HEIGHT;

const NAV_INITIAL = { isSticky: false, isHidden: false, forceShow: false };

function readScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0;
}

/**
 * Gourmet-style scroll nav: overlay at top on home → fixed sticky bar;
 * nav collapses on scroll down, expands on scroll up or compact-logo click.
 *
 * @param {{ overlay?: boolean }} options - overlay=true keeps nav absolute over heroes until scroll
 */
export function useNavScroll({ overlay = true, menuOpen = false } = {}) {
  const lastScrollTop = useRef(0);
  const menuOpenRef = useRef(menuOpen);
  const wasMenuOpenRef = useRef(false);
  const forceSyncRef = useRef(() => {});
  const [state, setState] = useState(NAV_INITIAL);
  const [scrollLocked, setScrollLocked] = useState(isNavScrollLocked());

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    let rafTimer = 0;
    let mountSync = 0;

    const syncScrollTop = () => {
      lastScrollTop.current = readScrollY();
    };

    const applyScrollState = (scrollY) => {
      if (isNavScrollLocked()) {
        setState(NAV_INITIAL);
        return;
      }

      if (overlay && scrollY <= 0) {
        setState(NAV_INITIAL);
        return;
      }

      if (scrollY > OVERLAY_EXIT) {
        setState({ isSticky: true, isHidden: true, forceShow: false });
        return;
      }

      setState(NAV_INITIAL);
    };

    const stickyHeader = (force = false) => {
      if (menuOpenRef.current && !force) return;

      if (isNavScrollLocked()) {
        syncScrollTop();
        setState((prev) => {
          if (!prev.isSticky && !prev.isHidden && !prev.forceShow) return prev;
          return NAV_INITIAL;
        });
        return;
      }

      const scrollY = readScrollY();

      if (force) {
        syncScrollTop();
        applyScrollState(scrollY);
        return;
      }

      const last = lastScrollTop.current;
      const delta = scrollY - last;

      if (overlay && scrollY <= 0) {
        lastScrollTop.current = 0;
        setState((prev) => {
          if (!prev.isSticky && !prev.isHidden && !prev.forceShow) return prev;
          return NAV_INITIAL;
        });
        return;
      }

      if (Math.abs(delta) < SCROLL_DELTA) return;

      setState((prev) => {
        let { isSticky, isHidden, forceShow } = prev;

        if (delta > 0) {
          if (scrollY > OVERLAY_EXIT || isSticky) {
            isSticky = true;
            isHidden = true;
            forceShow = false;
          }
        } else if (scrollY < last) {
          isHidden = false;
          forceShow = false;
          if (scrollY <= 0) isSticky = false;
        }

        if (
          prev.isSticky === isSticky &&
          prev.isHidden === isHidden &&
          prev.forceShow === forceShow
        ) {
          return prev;
        }

        return { isSticky, isHidden, forceShow };
      });

      lastScrollTop.current = scrollY;
    };

    forceSyncRef.current = () => stickyHeader(true);

    syncScrollTop();

    const unsubscribeLock = subscribeNavScrollLock((locked) => {
      setScrollLocked(locked);
      if (locked) {
        setState(NAV_INITIAL);
      }
      syncScrollTop();
      stickyHeader(true);
    });

    mountSync = requestAnimationFrame(() => stickyHeader(true));

    const onScroll = () => {
      cancelAnimationFrame(rafTimer);
      rafTimer = requestAnimationFrame(() => stickyHeader());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafTimer);
      cancelAnimationFrame(mountSync);
      unsubscribeLock();
    };
  }, [overlay]);

  useEffect(() => {
    if (wasMenuOpenRef.current && !menuOpen) {
      requestAnimationFrame(() => forceSyncRef.current());
    }
    wasMenuOpenRef.current = menuOpen;
  }, [menuOpen]);

  const revealFromLogo = useCallback((event) => {
    event.preventDefault();
    setState((prev) => ({ ...prev, isHidden: false, forceShow: true }));
  }, []);

  const navExpanded = !state.isHidden || state.forceShow;

  return {
    ...state,
    scrollLocked,
    navExpanded,
    revealFromLogo,
  };
}
