import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import BudgetAlertWatcher from "../budgets/BudgetAlertWatcher";
import SpecularButton from "../SpecularButton";

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className={`app-shell${menuOpen ? " menu-open" : ""}`}>
      <BudgetAlertWatcher />
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      {menuOpen && (
        <SpecularButton
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation"
          size="sm"
          radius={0}
          lineColor="#000000"
          baseColor="#000000"
          onClick={() => setMenuOpen(false)}
        >
          {null}
        </SpecularButton>
      )}
      <main className="main">
        <Topbar onMenuClick={() => setMenuOpen((o) => !o)} menuOpen={menuOpen} />
        <div className="content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
