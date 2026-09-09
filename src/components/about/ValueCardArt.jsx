/**
 * Subtle decorative SVG backgrounds for value bento cards.
 * Each animation is CSS-driven (stroke-dash, float, bar grow) for performance.
 */

const ARTS = {
  execution: ExecutionArt,
  growth: GrowthArt,
  support: SupportArt,
  systems: SystemsArt,
  reporting: ReportingArt,
};

export function ValueCardArt({ artKey, className = '' }) {
  const Art = ARTS[artKey];
  if (!Art) return null;
  return (
    <div className={`abt-values__art ${className}`.trim()} aria-hidden="true">
      <Art />
    </div>
  );
}

function ExecutionArt() {
  return (
    <svg className="abt-art-svg abt-art-svg--execution" viewBox="0 0 320 240" preserveAspectRatio="xMaxYMax slice">
      <path
        className="abt-art-stroke abt-art-stroke--1"
        d="M40 180 L120 100 L200 140 L280 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="abt-art-stroke abt-art-stroke--2"
        d="M60 200 L140 130 L220 170"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <circle className="abt-art-node abt-art-node--1" cx="280" cy="60" r="8" fill="currentColor" />
      <circle className="abt-art-node abt-art-node--2" cx="120" cy="100" r="5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function GrowthArt() {
  return (
    <svg className="abt-art-svg abt-art-svg--growth" viewBox="0 0 320 240" preserveAspectRatio="xMaxYMax slice">
      <path
        className="abt-art-stroke abt-art-stroke--grow"
        d="M48 200 Q120 160 160 120 T280 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line className="abt-art-grid" x1="48" y1="200" x2="280" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <line className="abt-art-grid" x1="48" y1="160" x2="240" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <polygon className="abt-art-fill" points="160,120 280,48 280,200 160,200" fill="currentColor" opacity="0.06" />
    </svg>
  );
}

function SupportArt() {
  return (
    <svg className="abt-art-svg abt-art-svg--support" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice">
      <circle className="abt-art-node abt-art-node--a" cx="100" cy="120" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle className="abt-art-node abt-art-node--b" cx="220" cy="120" r="36" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        className="abt-art-stroke abt-art-stroke--bridge"
        d="M136 120 C160 80 160 160 184 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle className="abt-art-node abt-art-node--pulse" cx="160" cy="120" r="6" fill="currentColor" />
    </svg>
  );
}

function SystemsArt() {
  return (
    <svg className="abt-art-svg abt-art-svg--systems" viewBox="0 0 320 240" preserveAspectRatio="xMidYMax meet">
      <path
        className="abt-art-stroke abt-art-stroke--systems"
        d="M48 52 L48 188 L272 188"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect
        className="abt-art-layer abt-art-layer--1"
        x="92"
        y="118"
        width="108"
        height="70"
        rx="12"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        className="abt-art-layer abt-art-layer--2"
        x="118"
        y="88"
        width="96"
        height="58"
        rx="10"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <rect
        className="abt-art-layer abt-art-layer--3"
        x="144"
        y="58"
        width="84"
        height="50"
        rx="8"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <line className="abt-art-systems-link" x1="48" y1="188" x2="92" y2="188" stroke="currentColor" strokeWidth="1.5" />
      <line className="abt-art-systems-link" x1="200" y1="188" x2="272" y2="188" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ReportingArt() {
  return (
    <svg className="abt-art-svg abt-art-svg--reporting" viewBox="0 0 320 240" preserveAspectRatio="xMaxYMax slice">
      <g className="abt-art-bars" transform="translate(140, 48)">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            className={`abt-art-bar abt-art-bar--${i + 1}`}
            x={i * 28}
            y={160 - (i + 1) * 22}
            width="18"
            height={(i + 1) * 22 + 20}
            rx="4"
            fill="currentColor"
          />
        ))}
      </g>
      <path
        className="abt-art-stroke abt-art-stroke--trend"
        d="M140 200 L168 168 L196 176 L224 140 L252 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}
