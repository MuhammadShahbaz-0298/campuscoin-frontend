import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import SpecularButton from "../SpecularButton";

const titles = {
  "/": "Overview",
  "/transactions": "Transactions",
  "/budgets": "Budgets",
  "/reports": "Reports",
  "/categories": "Categories",
  "/insights": "Insights",
  "/profile": "Your Account",
  "/admin": "Admin",
};

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// Returns true when viewport is at/below the mobile breakpoint
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function Topbar({ onMenuClick, menuOpen }) {
  const location = useLocation();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const firstName = user?.name?.split(" ")[0] || "there";
  const pathKey = titles[location.pathname]
    ? location.pathname
    : Object.keys(titles).find((k) => location.pathname.startsWith(k)) || "/";
  const title =
    location.pathname === "/"
      ? `${greeting()}, ${firstName}`
      : titles[pathKey] ||
        location.pathname.slice(1).replace(/-/g, " ") ||
        "Dashboard";

  return (
    <header className="topbar">
      <div className="topbar-left">
        {isMobile && (
          <SpecularButton
            type="button"
            className="icon-btn mobile-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={Boolean(menuOpen)}
            aria-controls="app-sidebar"
            size="sm"
            radius={10}
            textColor="var(--text-muted)"
            lineColor="#ffffff"
            baseColor="#2c2f34"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </SpecularButton>
        )}
        <div>
          <div className="eyebrow">
            CAMPUS COIN /{" "}
            {location.pathname === "/"
              ? "OVERVIEW"
              : location.pathname.replace(/\//g, "").toUpperCase() || "HOME"}
          </div>
          <h1>{title}</h1>
        </div>
      </div>
      <div className="top-actions">
        <Link to="/home" className="home-link" title="Back to homepage">
          <Home size={15} />
          <span>Home</span>
        </Link>
        <ThemeToggle />
        <span className="avatar" aria-hidden="true">
          {user?.name?.[0] || "?"}
        </span>
      </div>
    </header>
  );
}