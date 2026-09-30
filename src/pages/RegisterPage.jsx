import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthBrandPanel from "../components/auth/AuthBrandPanel";
import AuthNote from "../components/auth/AuthNote";
import RegisterForm from "../components/auth/RegisterForm";
import ThemeToggle from "../components/layout/ThemeToggle";
import { registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import getErrorMessage from "../utils/getErrorMessage";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onChange = (field, value) =>
    setForm((current) => ({ ...current, [field]: value }));

  async function submit() {
    if (submitting) return;
    setSubmitting(true);
    try {
      const response = await registerUser(form);
      login(response.data);
      showToast("Account created successfully.", "success");
      navigate("/");
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to create account."), "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-split">
      <AuthBrandPanel />

      <section className="auth-form-panel" aria-labelledby="register-heading">
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
            Start your money habit
          </p>
          <h1 id="register-heading" className="sx-enter" style={{ "--d": "140ms" }}>
            Build your money habit.
          </h1>
          <p className="auth-sub sx-enter" style={{ "--d": "210ms" }}>
            A calmer way to understand where your student budget goes.
          </p>

          <RegisterForm
            form={form}
            onChange={onChange}
            onSubmit={submit}
            submitting={submitting}
          />

          <p className="auth-alt sx-enter" style={{ "--d": "600ms" }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>

          <AuthNote
            label="Good to know"
            delay={660}
            ariaLabel="How your details are used"
          >
            Your details only build your budgets and insights — they are never
            shared.
          </AuthNote>
        </div>
      </section>
    </main>
  );
}
