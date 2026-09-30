import { useEffect, useRef, useState } from "react";
import { Check, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { isValidEmail } from "../../utils/validators";
import AuthField from "./AuthField";
import SpecularButton from "../SpecularButton";

function validateField(field, value) {
  if (field === "email") {
    if (!value.trim()) return "Enter your email address.";
    if (!isValidEmail(value)) return "That doesn't look like a valid email address.";
    return "";
  }
  if (!value) return "Enter your password.";
  if (value.length < 6) return "Password must be at least 6 characters.";
  return "";
}

export default function LoginForm({
  values,
  onChange,
  onSubmit,
  submitting = false,
  serverError = "",
  attempt = 0,
  remember = true,
  onRememberChange,
  onForgot,
}) {
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  useEffect(() => {
    if (!serverError) return;
    setErrors((current) => ({ ...current, password: serverError }));
    setTouched((current) => ({ ...current, password: true }));
    passwordRef.current?.focus();
  }, [serverError, attempt]);

  function updateField(field, value) {
    onChange(field, value);
    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, value) }));
    }
  }

  function blurField(field) {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({
      ...current,
      [field]: validateField(field, values[field]),
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const next = {
      email: validateField("email", values.email),
      password: validateField("password", values.password),
    };
    setErrors(next);
    setTouched({ email: true, password: true });
    if (next.email) {
      emailRef.current?.focus();
      return;
    }
    if (next.password) {
      passwordRef.current?.focus();
      return;
    }
    onSubmit();
  }

  const emailError = touched.email ? errors.email : "";
  const passwordError = touched.password ? errors.password : "";
  const emailValid =
    touched.email && !errors.email && values.email.trim().length > 0;
  const passwordValid =
    touched.password && !errors.password && values.password.length > 0;

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <AuthField
        id="login-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        icon={Mail}
        label="Email address"
        value={values.email}
        onChange={(event) => updateField("email", event.target.value)}
        onBlur={() => blurField("email")}
        status={emailError ? "error" : emailValid ? "valid" : ""}
        message={emailError}
        delay="300ms"
        inputRef={emailRef}
      />

      <AuthField
        id="login-password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        icon={Lock}
        label="Password"
        value={values.password}
        onChange={(event) => updateField("password", event.target.value)}
        onBlur={() => blurField("password")}
        status={passwordError ? "error" : passwordValid ? "valid" : ""}
        message={passwordError}
        delay="370ms"
        inputRef={passwordRef}
        adorned
      >
        <SpecularButton
          type="button"
          className="sx-adorn"
          size="sm"
          radius={9}
          textColor="var(--af-ink-muted)"
          lineColor="#ffffff"
          baseColor="#16191b"
          style={{ transform: "translateY(-50%)" }}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          title={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? (
            <EyeOff key="off" size={17} strokeWidth={2} />
          ) : (
            <Eye key="on" size={17} strokeWidth={2} />
          )}
        </SpecularButton>
      </AuthField>

      <div className="auth-row sx-enter" style={{ "--d": "440ms" }}>
        <label className="sx-check">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => onRememberChange?.(event.target.checked)}
          />
          <span className="sx-check__box" aria-hidden="true">
            <Check size={12} strokeWidth={3.2} />
          </span>
          Remember me
        </label>
        <SpecularButton
          type="button"
          className="sx-link"
          size="sm"
          radius={6}
          textColor="var(--af-link)"
          lineColor="#ffffff"
          baseColor="#121517"
          onClick={onForgot}
        >
          Forgot password?
        </SpecularButton>
      </div>

      <SpecularButton
        type="submit"
        className={
          "sx-submit sx-enter" + (submitting ? " is-loading" : "")
        }
        size="md"
        radius={12}
        textColor="#04150f"
        lineColor="#d6fff4"
        baseColor="#46cda7"
        style={{ "--d": "510ms" }}
        disabled={submitting}
        aria-busy={submitting}
      >
        <span className="sx-submit__label">Sign in</span>
        <span className="sx-submit__busy">
          <span className="sx-spinner" aria-hidden="true" />
          Signing in…
        </span>
      </SpecularButton>
    </form>
  );
}
