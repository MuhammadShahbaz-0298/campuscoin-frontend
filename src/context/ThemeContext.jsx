import { createContext, useContext, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const ThemeContext = createContext(null);

function getInitialTheme() {
  try {
    const stored = localStorage.getItem("cc_theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch (error) {
    /* ignore */
  }
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }
  return "dark";
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const fallbackTimer = useRef(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("cc_theme", theme);
    } catch (error) {
      /* ignore */
    }
    return () => window.clearTimeout(fallbackTimer.current);
  }, [theme]);

  function commit(next) {
    document.documentElement.dataset.theme = next;
    document.body.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("cc_theme", next);
    } catch (error) {
      /* ignore */
    }
  }

  /**
   * Full-page crossfade: View Transitions API when available (handles
   * gradient surfaces too), otherwise a token-level CSS crossfade.
   */
  function applyTheme(next) {
    if (next === theme) return;
    const root = document.documentElement;
    if (typeof document.startViewTransition === "function" && !prefersReducedMotion()) {
      document.startViewTransition(() => flushSync(() => commit(next)));
      return;
    }
    commit(next);
    if (prefersReducedMotion()) return;
    root.classList.add("cc-theme-anim");
    window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = window.setTimeout(
      () => root.classList.remove("cc-theme-anim"),
      460,
    );
  }

  const value = {
    theme,
    setTheme: (next) => applyTheme(next),
    toggleTheme: () => applyTheme(theme === "dark" ? "light" : "dark"),
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
