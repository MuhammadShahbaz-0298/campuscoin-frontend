import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function useCountUp(target, { duration, delay = 0 } = {}) {
  const reduced = usePrefersReducedMotion();
  const numericTarget = Number(target);
  const valid = Number.isFinite(numericTarget);
  const [value, setValue] = useState(() =>
    reduced && valid ? numericTarget : 0,
  );
  const fromRef = useRef(undefined);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!valid) return undefined;

    if (reduced) {
      fromRef.current = numericTarget;
      setValue(numericTarget);
      return undefined;
    }

    const from = fromRef.current === undefined ? 0 : fromRef.current;
    fromRef.current = from;

    if (from === numericTarget) {
      setValue(numericTarget);
      return undefined;
    }

    const span = Math.abs(numericTarget - from);
    const totalDuration =
      duration ??
      Math.min(1200, Math.max(700, 700 + Math.log10(span + 1) * 120));

    let timeoutId = 0;
    let startTime;

    const tick = (now) => {
      if (startTime === undefined) startTime = now;
      const progress = Math.min(1, (now - startTime) / totalDuration);
      const current = from + (numericTarget - from) * easeOutQuart(progress);
      fromRef.current = current;
      setValue(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = numericTarget;
        setValue(numericTarget);
      }
    };

    timeoutId = window.setTimeout(() => {
      frameRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(frameRef.current);
    };
  }, [numericTarget, reduced, duration, delay]);

  return valid ? value : target;
}
