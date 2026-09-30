export default function AuthNote({ label, children, delay = 660, ariaLabel }) {
  return (
    <div
      className="auth-demo"
      role="note"
      aria-label={ariaLabel || label}
      style={{ "--d": `${delay}ms` }}
    >
      <div className="auth-demo__body">
        <span className="auth-demo__label">{label}</span>
        <span className="auth-demo__creds">{children}</span>
      </div>
    </div>
  );
}
