/**
 * Single SVG spine for track + scroll fill (replaces per-card ::before borders).
 * Quadratic corners approximate 50px border-radius U-turns.
 */
const RADIUS = 50;
const OUTER_OVERLAP = 4.5;
const STROKE = 2.5;

/**
 * @param {HTMLElement} container
 * @param {HTMLElement} card
 * @param {number} index
 */
function cardFrame(container, card, index) {
  const cRect = container.getBoundingClientRect();
  const r = card.getBoundingClientRect();
  const isOdd = index % 2 === 0;
  const topOverlap = isOdd && index === 0 ? OUTER_OVERLAP : 0;

  return {
    left: r.left - cRect.left + STROKE,
    right: r.right - cRect.left - STROKE,
    mid: (r.left + r.right) / 2 - cRect.left,
    bottom: r.bottom - cRect.top,
    capY: r.top - cRect.top - topOverlap,
    railY: r.bottom - cRect.top,
    isOdd,
  };
}

function radius(box) {
  const half = box.mid - box.left;
  return Math.min(RADIUS, half - 1);
}

/** Bottom-left: vertical → horizontal (odd card exit) */
function bottomLeft(d, x, y, r) {
  return `${d} L ${x} ${y - r} Q ${x} ${y} ${x + r} ${y}`;
}

/** Top-right: horizontal → vertical (even card entry) */
function topRight(d, x, y, r) {
  return `${d} L ${x - r} ${y} Q ${x} ${y} ${x} ${y + r}`;
}

/** Bottom-right: vertical → horizontal (even card exit) */
function bottomRight(d, x, y, r) {
  return `${d} L ${x} ${y - r} Q ${x} ${y} ${x - r} ${y}`;
}

/**
 * @param {HTMLElement[]} cards
 * @param {HTMLElement} container
 */
export function buildSnakePath(cards, container) {
  const n = cards.length;
  if (!n) return '';

  const boxes = cards.map((card, i) => cardFrame(container, card, i));
  for (let i = 1; i < boxes.length; i += 1) {
    boxes[i].capY = boxes[i - 1].railY;
  }

  let d = '';

  for (let i = 0; i < n; i += 1) {
    const box = boxes[i];
    const r = radius(box);
    const isFirst = i === 0;
    const isLast = i === n - 1;

    if (isFirst) {
      d = `M ${box.left} ${box.capY}`;
    }

    if (box.isOdd) {
      if (!isFirst) {
        d += ` L ${box.mid} ${box.capY}`;
        d += ` L ${box.left + r} ${box.capY}`;
        d += ` Q ${box.left} ${box.capY} ${box.left} ${box.capY + r}`;
      }
      if (isLast) {
        d += ` L ${box.left} ${box.bottom}`;
      } else {
        d = bottomLeft(d, box.left, box.railY, r);
        d += ` L ${box.mid} ${box.railY}`;
      }
    } else {
      d += ` L ${box.mid} ${box.capY}`;
      d = topRight(d, box.right, box.capY, r);
      if (isLast) {
        d += ` L ${box.right} ${box.bottom}`;
      } else {
        d = bottomRight(d, box.right, box.railY, r);
        d += ` L ${box.mid} ${box.railY}`;
      }
    }
  }

  return d;
}
