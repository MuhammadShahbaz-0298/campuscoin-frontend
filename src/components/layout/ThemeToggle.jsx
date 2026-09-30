import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import SpecularButton from "../SpecularButton";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <SpecularButton
      className={`icon-btn theme-toggle ${className}`.trim()}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      type="button"
      size="sm"
      radius={10}
      textColor="var(--text-muted)"
      lineColor="#ffffff"
      baseColor="#2c2f34"
    >
      <span className="theme-toggle__icons" aria-hidden="true">
        <Sun className={`theme-icon${isDark ? " is-active" : ""}`} size={17} />
        <Moon className={`theme-icon${isDark ? "" : " is-active"}`} size={17} />
      </span>
      <span className="theme-toggle__reveal" key={theme} aria-hidden="true" />
    </SpecularButton>
  );
}
