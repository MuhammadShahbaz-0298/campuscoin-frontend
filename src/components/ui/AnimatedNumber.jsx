import { useEffect, useRef, useState } from "react";
import useCountUp from "../../hooks/useCountUp";

export default function AnimatedNumber({
  value,
  format = (v) => String(v),
  duration,
  delay = 0,
  className = "",
}) {
  const numericValue = Number(value);
  const animated = useCountUp(numericValue, { duration, delay });
  const [settle, setSettle] = useState(false);
  const settleTimer = useRef(0);
  const lastText = useRef(null);
  const formatRef = useRef(format);
  formatRef.current = format;

  if (!Number.isFinite(numericValue)) {
    return <span className={className || undefined}>{format(value)}</span>;
  }

  const text = String(format(animated));
  const finalText = String(format(numericValue));

  useEffect(() => {
    if (text === finalText && lastText.current !== null && lastText.current !== text) {
      setSettle(true);
      window.clearTimeout(settleTimer.current);
      settleTimer.current = window.setTimeout(() => setSettle(false), 420);
    }
    lastText.current = text;
    return () => window.clearTimeout(settleTimer.current);
  }, [text, finalText]);

  return (
    <span
      className={`animated-number${settle ? " money-settle" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={{ minWidth: `${finalText.length}ch` }}
      aria-label={finalText}
    >
      {text}
    </span>
  );
}
