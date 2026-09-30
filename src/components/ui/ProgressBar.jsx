import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

export function toneFor(value = 0) {
  if (value >= 100) return "danger";
  if (value >= 80) return "warn";
  return "accent";
}

export default function ProgressBar({
  value = 0,
  tone,
  label,
  threshold,
  className = "",
  max = 100,
}) {
  const target = Math.min(value, max);
  const effectiveTone = tone || toneFor(value);
  const reduced = usePrefersReducedMotion();
  const [width, setWidth] = useState(reduced ? target : 0);
  const [complete, setComplete] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    const reachedEnd = target >= max;
    let frames = [];
    let timeoutId = 0;

    if (reduced) {
      started.current = true;
      setWidth(target);
      setComplete(reachedEnd);
      return undefined;
    }

    if (!started.current) {
      started.current = true;
      setWidth(0);
      frames.push(
        requestAnimationFrame(() => {
          frames.push(requestAnimationFrame(() => setWidth(target)));
        }),
      );
    } else {
      setWidth(target);
    }

    setComplete(false);
    if (reachedEnd) {
      timeoutId = window.setTimeout(() => setComplete(true), 1050);
    }

    return () => {
      frames.forEach((frame) => cancelAnimationFrame(frame));
      window.clearTimeout(timeoutId);
    };
  }, [target, max, reduced]);

  const percent = max ? (width / max) * 100 : 0;

  return (
    <div
      className={`progress progress-${effectiveTone}${complete ? " progress-complete" : ""}${
        className ? ` ${className}` : ""
      }`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value)}
      aria-label={label}
    >
      <i style={{ width: `${percent}%` }} />
      {threshold ? (
        <span
          className="progress-mark"
          style={{ left: `${Math.min(threshold, max)}%` }}
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
