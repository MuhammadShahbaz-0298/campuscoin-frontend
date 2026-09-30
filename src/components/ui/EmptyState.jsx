export default function EmptyState({ message, action }) {
  return (
    <div className="empty glass-secondary">
      <span className="empty-icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.55"
          />
          <path
            d="M3 10h18"
            stroke="currentColor"
            strokeWidth="1.5"
            opacity="0.4"
          />
        </svg>
      </span>
      <span>{message}</span>
      {action}
    </div>
  );
}
