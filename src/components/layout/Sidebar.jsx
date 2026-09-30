import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeftRight,
  ChartNoAxesCombined,
  Home,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Settings,
  ShieldCheck,
  Tags,
  WalletCards,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NavItem from "./NavItem";
import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";
import ProgressBar from "../ui/ProgressBar";
import { getSavingsProgress } from "../../api/transactionApi";
import SpecularButton from "../SpecularButton";

const links = [
  ["/", "Dashboard", LayoutDashboard],
  ["/transactions", "Transactions", ArrowLeftRight],
  ["/budgets", "Budgets", WalletCards],
  ["/reports", "Reports", ChartNoAxesCombined],
  ["/categories", "Categories", Tags],
  ["/insights", "Insights", Lightbulb],
  ["/profile", "Your Account", Settings],
];

export default function Sidebar({ open = false, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const [currentSavings, setCurrentSavings] = useState(0);

  useEffect(() => {
    const fetchSavings = async () => {
      if (!user) return;

      try {
        const response = await getSavingsProgress();
        const savings = Number(response.data?.data?.savings) || 0;
        setCurrentSavings(savings);
      } catch (error) {
        console.error("Failed to fetch savings progress:", error);
        setCurrentSavings(0);
      }
    };

    fetchSavings();
  }, [user]);

  const savingsGoal = Number(user?.savingsGoal) || 0;
  const progress =
    savingsGoal > 0 ? Math.min((currentSavings / savingsGoal) * 100, 100) : 0;

  return (
    <aside className={`sidebar${open ? " open" : ""}`} id="app-sidebar">
      <div className="sidebar-top">
        <Link to="/home" className="brand sidebar-home" onClick={onClose}>
          <span className="brand-mark" aria-hidden="true">
            <img src="/logo-mark.png" alt="" width="26" height="26" />
          </span>
          <span>Campus Coin</span>
        </Link>
        <Link
          to="/home"
          className="nav-item nav-home"
          onClick={onClose}
          title="Back to homepage"
        >
          <Home size={17} />
          <span>Home</span>
        </Link>
      </div>

      <nav aria-label="Dashboard">
        {links.map(([path, label, Icon]) => (
          <NavItem
            key={path}
            to={path}
            icon={Icon}
            active={location.pathname === path}
          >
            {label}
          </NavItem>
        ))}

        {user?.role === "admin" && (
          <NavItem
            to="/admin"
            icon={ShieldCheck}
            active={location.pathname === "/admin"}
          >
            Admin
          </NavItem>
        )}
      </nav>

      <div className="sidebar-bottom">
        <div className="goal-mini glass-secondary">
          <div className="eyebrow">SAVINGS GOAL</div>

          <strong>
            <AnimatedNumber value={savingsGoal} format={formatCurrency} delay={300} />
          </strong>

          <ProgressBar value={progress} label="Savings goal progress" />

          <small>
            <AnimatedNumber
              value={Math.round(progress)}
              format={(v) => Math.round(v)}
              delay={300}
            />
            % on track
          </small>
        </div>

        <div className="account">
          <span className="avatar">{user?.name?.[0]}</span>

          <div>
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>

          <SpecularButton
            className="icon-btn"
            aria-label="Sign out"
            title="Sign out"
            size="sm"
            radius={10}
            textColor="var(--text-muted)"
            lineColor="#ffffff"
            baseColor="#2c2f34"
            onClick={logout}
          >
            <LogOut size={15} />
          </SpecularButton>
        </div>
      </div>
    </aside>
  );
}
