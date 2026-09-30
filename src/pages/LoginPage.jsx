import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import DemoCredentials from "../components/auth/DemoCredentials";
import LoginForm from "../components/auth/LoginForm";
import ThemeToggle from "../components/layout/ThemeToggle";
import { loginUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import getErrorMessage from "../utils/getErrorMessage";

function readRememberPreference() {
  try {
    return localStorage.getItem("cc_remember") !== "0";
  } catch (error) {
    return true;
  }
}

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(readRememberPreference);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [demoVisible, setDemoVisible] = useState(true);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onChange = (field, value) => setForm((current) => ({ ...current, [field]: value }));

  const onRememberChange = (checked) => {
    setRemember(checked);
    try {
      localStorage.setItem("cc_remember", checked ? "1" : "0");
    } catch (error) {
      /* ignore */
    }
  };

  async function submit() {
    if (submitting) return;
    setServerError("");
    setAttempt((current) => current + 1);
    setSubmitting(true);
    try {
      const response = await loginUser(form);
      login(response.data, remember);
      showToast("Welcome back.", "success");
      navigate("/");
    } catch (error) {
      const message = getErrorMessage(error, "Unable to sign in.");
      setServerError(message);
      showToast(message, "error");
    } finally {
      setSubmitting(false);
    }
  }

  function handleForgot() {
    showToast(
      "Password resets aren't enabled in this demo — use the student account below.",
      "info",
    );
  }

  return (
    <main className="auth-split">
      <AuthBrandPanel />

      <section className="auth-form-panel" aria-labelledby="login-heading">
        <div className="auth-toolbar">
          <ThemeToggle />
        </div>

        <div className="auth-form-wrap">
          <span className="auth-logo sx-enter" style={{ "--d": "0ms" }}>
            <span className="auth-mark" aria-hidden="true">
              <img src="/logo-mark.png" alt="" width="34" height="34" />
            </span>
            <span>Campus Coin</span>
          </span>

          <p className="auth-eyebrow sx-enter" style={{ "--d": "80ms" }}>
            Smart spending, student style
          </p>
          <h1 id="login-heading" className="sx-enter" style={{ "--d": "140ms" }}>
            Welcome back.
          </h1>
          <p className="auth-sub sx-enter" style={{ "--d": "210ms" }}>
            Your student budget, habits, and next best move in one place.
          </p>

          <LoginForm
            values={form}
            onChange={onChange}
            onSubmit={submit}
            submitting={submitting}
            serverError={serverError}
            attempt={attempt}
            remember={remember}
            onRememberChange={onRememberChange}
            onForgot={handleForgot}
          />

          <p className="auth-alt sx-enter" style={{ "--d": "600ms" }}>
            New to Campus Coin? <Link to="/register">Create an account</Link>
          </p>

          {demoVisible ? (
            <DemoCredentials onDismiss={() => setDemoVisible(false)} />
          ) : null}
        </div>
      </section>
    </main>
  );
}
