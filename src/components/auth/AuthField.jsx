import { AlertCircle, Check } from "lucide-react";

export default function AuthField({
  id,
  name,
  type = "text",
  icon: Icon,
  label,
  value,
  onChange,
  onBlur,
  status = "",
  message = "",
  autoComplete,
  inputMode,
  minLength,
  required = true,
  delay = "0ms",
  inputRef,
  adorned = false,
  children,
}) {
  const hasError = status === "error" && Boolean(message);
  const isValid = status === "valid" && !hasError;
  const errorId = hasError ? `${id}-error` : undefined;

  return (
    <div className="sx-field sx-enter" style={{ "--d": delay }}>
      <div
        className={
          "sx-control" +
          (adorned ? " sx-control--password" : "") +
          (hasError ? " is-error" : isValid ? " is-valid" : "")
        }
      >
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          minLength={minLength}
          placeholder=" "
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-describedby={errorId}
          required={required}
        />
        <label className="sx-label" htmlFor={id}>
          {label}
        </label>
        <span className="sx-icon" aria-hidden="true">
          <Icon size={17} strokeWidth={2} />
        </span>
        {isValid ? (
          <span className="sx-status sx-status--ok is-visible" aria-hidden="true">
            <Check size={16} strokeWidth={3} />
          </span>
        ) : null}
        {hasError ? (
          <span
            className={
              "sx-status sx-status--error is-visible" +
              (adorned ? " sx-status--trailing" : "")
            }
            aria-hidden="true"
          >
            <AlertCircle size={16} strokeWidth={2.4} />
          </span>
        ) : null}
        {children}
      </div>
      {hasError ? (
        <p className="sx-msg" id={errorId} role="alert">
          <AlertCircle size={13} strokeWidth={2.4} aria-hidden="true" />
          {message}
        </p>
      ) : null}
    </div>
  );
}
