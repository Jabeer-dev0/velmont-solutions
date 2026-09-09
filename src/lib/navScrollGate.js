/** Pauses nav hide/sticky scroll behavior during service hero scroll stories. */

let locked = false;
/** @type {Set<(locked: boolean) => void>} */
const listeners = new Set();

export function isNavScrollLocked() {
  return locked;
}

/** @param {boolean} value */
export function setNavScrollLocked(value) {
  if (locked === value) return;
  locked = value;
  listeners.forEach((fn) => fn(locked));
}

/** @param {(locked: boolean) => void} fn */
export function subscribeNavScrollLock(fn) {
  listeners.add(fn);
  fn(locked);
  return () => listeners.delete(fn);
}
