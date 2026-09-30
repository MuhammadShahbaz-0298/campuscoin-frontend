export default function Skeleton() {
  return (
    <div className="loading" aria-busy="true" aria-live="polite">
      <span className="spin" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="28"
            strokeDashoffset="8"
            opacity="0.7"
          />
        </svg>
      </span>
      Loading…
    </div>
  );
}
