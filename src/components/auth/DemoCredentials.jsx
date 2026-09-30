import { useEffect, useRef, useState } from "react";
import { Check, Copy, X } from "lucide-react";
import SpecularButton from "../SpecularButton";

const DEMO_EMAIL = "demo@campuscoin.app";
const DEMO_PASSWORD = "Demo123!";
const DEMO_STRING = `${DEMO_EMAIL} / ${DEMO_PASSWORD}`;

function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  return new Promise((resolve, reject) => {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try {
      document.execCommand("copy");
      resolve();
    } catch (error) {
      reject(error);
    } finally {
      document.body.removeChild(area);
    }
  });
}

export default function DemoCredentials({ onDismiss, delay = 660 }) {
  const [copied, setCopied] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await copyText(DEMO_STRING);
    } catch (error) {
      return;
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1800);
  }

  function handleDismiss() {
    if (leaving) return;
    setLeaving(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onDismiss?.(), 280);
  }

  return (
    <div
      className={"auth-demo" + (leaving ? " is-leaving" : "")}
      style={{ "--d": `${delay}ms` }}
      role="note"
      aria-label="Demo credentials"
    >
      <div className="auth-demo__body">
        <span className="auth-demo__label">Demo student account</span>
        <span className="auth-demo__creds">{DEMO_STRING}</span>
      </div>
      <div className="auth-demo__actions">
        <SpecularButton
          type="button"
          className={"auth-demo__btn" + (copied ? " is-copied" : "")}
          size="sm"
          radius={9}
          textColor="var(--af-ink-muted)"
          lineColor="#ffffff"
          baseColor="#16191b"
          aria-label={copied ? "Copied to clipboard" : "Copy demo credentials"}
          title={copied ? "Copied!" : "Copy credentials"}
          onClick={handleCopy}
        >
          {copied ? (
            <Check key="check" size={15} strokeWidth={2.6} />
          ) : (
            <Copy key="copy" size={15} strokeWidth={2.2} />
          )}
        </SpecularButton>
        <SpecularButton
          type="button"
          className="auth-demo__btn"
          size="sm"
          radius={9}
          textColor="var(--af-ink-muted)"
          lineColor="#ffffff"
          baseColor="#16191b"
          aria-label="Dismiss demo credentials"
          title="Dismiss"
          onClick={handleDismiss}
        >
          <X size={15} strokeWidth={2.4} />
        </SpecularButton>
      </div>
      <span className="sr-live" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  );
}
