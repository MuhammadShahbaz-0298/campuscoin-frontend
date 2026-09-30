import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";
import { isValidEmail } from "../../utils/validators";
import AuthField from "./AuthField";
import SpecularButton from "../SpecularButton";

function fieldStatus(field, value, touched) {
  if (!touched[field]) return "";
  if (field === "name") return value.trim() ? "valid" : "";
  if (field === "email") return value.trim() && isValidEmail(value) ? "valid" : "";
  return value.length >= 6 ? "valid" : "";
}

export default function RegisterForm({
  form,
  onChange,
  onSubmit,
  submitting = false,
}) {
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  function updateField(field, value) {
    onChange(field, value);
  }

  function touchField(field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthField
        id="register-name"
        name="name"
        type="text"
        autoComplete="name"
        icon={User}
        label="Full name"
        value={form.name}
        onChange={(event) => updateField("name", event.target.value)}
        onBlur={() => touchField("name")}
        status={fieldStatus("name", form.name, touched)}
        delay="300ms"
      />

      <AuthField
        id="register-email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        icon={Mail}
        label="Email address"
        value={form.email}
        onChange={(event) => updateField("email", event.target.value)}
        onBlur={() => touchField("email")}
        status={fieldStatus("email", form.email, touched)}
        delay="370ms"
      />

      <AuthField
        id="register-password"
        name="password"
        type="password"
        autoComplete="new-password"
        minLength={6}
        icon={Lock}
        label="Password"
        value={form.password}
        onChange={(event) => updateField("password", event.target.value)}
        onBlur={() => touchField("password")}
        status={fieldStatus("password", form.password, touched)}
        delay="440ms"
      />

      <SpecularButton
        type="submit"
        className={"sx-submit sx-enter" + (submitting ? " is-loading" : "")}
        size="md"
        radius={12}
        textColor="#04150f"
        lineColor="#d6fff4"
        baseColor="#46cda7"
        style={{ "--d": "510ms" }}
        disabled={submitting}
        aria-busy={submitting}
      >
        <span className="sx-submit__label">Create account</span>
        <span className="sx-submit__busy">
          <span className="sx-spinner" aria-hidden="true" />
          Creating account…
        </span>
      </SpecularButton>
    </form>
  );
}
