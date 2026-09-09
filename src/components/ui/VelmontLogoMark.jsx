/** Compact Velmont mark - W, swoosh, growth bars (fallback if image missing). */
export function VelmontLogoMark({ className = '', size = 40 }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M8 36V12l6 14 6-14 6 14V12"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 34c8-10 14-12 22-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect x="31" y="24" width="3" height="8" rx="0.5" fill="currentColor" opacity="0.55" />
      <rect x="35.5" y="20" width="3" height="12" rx="0.5" fill="currentColor" opacity="0.75" />
      <rect x="40" y="16" width="3" height="16" rx="0.5" fill="currentColor" />
      <path
        d="M41.5 14l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(-2 -6) rotate(45 41.5 18)"
      />
    </svg>
  );
}
