import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  ShieldCheck,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  Eye,
  Sparkles,
  DollarSign,
  PieChart,
  CreditCard,
  Lock,
  Zap,
  Wallet,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/layout/ThemeToggle";
import SpecularButton from "../components/SpecularButton";

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealBlock({ children, className = "", delay = 0 }) {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`reveal-block ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function ButtonPerimeter() {
  return (
    <svg className="ph-perimeter" aria-hidden="true" focusable="false">
      <rect
        className="ph-perimeter-trail"
        pathLength="1"
        x="1"
        y="1"
        width="100%"
        height="100%"
      />
      <rect
        className="ph-perimeter-core"
        pathLength="1"
        x="1"
        y="1"
        width="100%"
        height="100%"
      />
      <rect
        className="ph-perimeter-tip"
        pathLength="1"
        x="1"
        y="1"
        width="100%"
        height="100%"
      />
    </svg>
  );
}

function DashboardPreview() {
  return (
    <div className="dash-preview" aria-hidden="true">
      <div className="dash-ambient" />
      <div className="dash-frame">
        <div className="dash-titlebar">
          <span className="dash-dot" />
          <span className="dash-dot" />
          <span className="dash-dot" />
          <span className="dash-title">Campus Coin — Overview</span>
        </div>

        <div className="dash-body">
          <div className="dash-sidebar-mini">
            <div className="dash-nav-active">
              <PieChart size={14} />
              <span>Overview</span>
            </div>
            <div className="dash-nav-item">
              <CreditCard size={14} />
              <span>Transactions</span>
            </div>
            <div className="dash-nav-item">
              <Target size={14} />
              <span>Budgets</span>
            </div>
            <div className="dash-nav-item">
              <BarChart3 size={14} />
              <span>Reports</span>
            </div>
          </div>

          <div className="dash-content">
            <div className="dash-greeting">
              <span className="dash-greeting-text">Good evening, Alex</span>
              <span className="dash-greeting-sub">
                Here's your financial overview
              </span>
            </div>

            <div className="dash-stats-row">
              <div className="dash-stat">
                <div className="dash-stat-icon">
                  <Wallet size={14} />
                </div>
                <div>
                  <span className="dash-stat-label">Available balance</span>
                  <span className="dash-stat-value">$2,847.20</span>
                </div>
              </div>
              <div className="dash-stat">
                <div className="dash-stat-icon spending">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <span className="dash-stat-label">Spent this month</span>
                  <span className="dash-stat-value">$1,124</span>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-head">
                <span className="dash-card-title">Spending activity</span>
                <span className="dash-card-badge">This week</span>
              </div>
              <div className="dash-chart">
                <svg viewBox="0 0 200 60" className="dash-chart-svg">
                  <defs>
                    <linearGradient
                      id="chartGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="var(--accent)"
                        stopOpacity="0.28"
                      />
                      <stop
                        offset="100%"
                        stopColor="var(--accent)"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,45 Q20,40 40,38 T80,28 T120,32 T160,18 T200,15"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="dash-chart-line"
                  />
                  <path
                    d="M0,45 Q20,40 40,38 T80,28 T120,32 T160,18 T200,15 L200,60 L0,60 Z"
                    fill="url(#chartGrad)"
                    className="dash-chart-area"
                  />
                </svg>
                <div className="dash-chart-labels">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>

            <div className="dash-card">
              <div className="dash-card-head">
                <span className="dash-card-title">Budget status</span>
                <span className="dash-card-badge soft">2 active</span>
              </div>
              <div className="dash-budget-row">
                <div className="dash-budget-info">
                  <span>Food &amp; Dining</span>
                  <span className="dash-budget-amount">$340 / $500</span>
                </div>
                <div className="dash-progress">
                  <div
                    className="dash-progress-fill"
                    style={{ "--w": "68%" }}
                  />
                </div>
              </div>
              <div className="dash-budget-row">
                <div className="dash-budget-info">
                  <span>Transport</span>
                  <span className="dash-budget-amount">$85 / $150</span>
                </div>
                <div className="dash-progress">
                  <div
                    className="dash-progress-fill warn"
                    style={{ "--w": "57%" }}
                  />
                </div>
              </div>
            </div>

            <div className="dash-card dash-activity-card">
              <div className="dash-card-head">
                <span className="dash-card-title">Recent activity</span>
                <span className="dash-live">
                  <span className="dash-live-dot" />
                  Live
                </span>
              </div>
              <div className="dash-transactions-mini">
                <div className="dash-tx">
                  <div className="dash-tx-icon">
                    <DollarSign size={12} />
                  </div>
                  <div className="dash-tx-info">
                    <span>Campus Cafe</span>
                    <span className="dash-tx-sub">Today · Food</span>
                  </div>
                  <span className="dash-tx-amount">−$12.50</span>
                </div>
                <div className="dash-tx">
                  <div className="dash-tx-icon income">
                    <Wallet size={12} />
                  </div>
                  <div className="dash-tx-info">
                    <span>Part-time Pay</span>
                    <span className="dash-tx-sub">Yesterday · Income</span>
                  </div>
                  <span className="dash-tx-amount income">+$420.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dash-float-card">
        <div className="dash-float-head">
          <span className="dash-float-label">Savings goal</span>
          <Target size={12} />
        </div>
        <div className="dash-float-value">
          $1,240 <span>/ $1,800</span>
        </div>
        <div className="dash-float-bar">
          <i style={{ "--w": "68%" }} />
        </div>
        <span className="dash-float-meta">68% · On track</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const pillRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const movePill = (target) => {
    const nav = navRef.current;
    const pill = pillRef.current;
    if (!nav || !pill || !target) return;
    const navRect = nav.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    pill.style.width = `${rect.width}px`;
    pill.style.transform = `translateX(${rect.left - navRect.left}px)`;
    pill.style.opacity = "1";
  };

  const hidePill = () => {
    const pill = pillRef.current;
    if (pill) pill.style.opacity = "0";
  };

  const onBarPointerMove = useCallback((event) => {
    if (event.pointerType === "touch") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = barRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--lx", `${x.toFixed(1)}%`);
    el.style.setProperty("--ly", `${y.toFixed(1)}%`);
  }, []);

  const onBarPointerLeave = () => {
    const el = barRef.current;
    if (!el) return;
    el.style.setProperty("--lx", "50%");
    el.style.setProperty("--ly", "0%");
  };

  const dashboardHref = user
    ? user.role === "admin"
      ? "/admin"
      : "/"
    : "/login";
  const dashboardLabel = user ? "Dashboard" : "Sign in";

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it works" },
    { href: "#insight", label: "Product" },
  ];

  return (
    <div className="public-page">
      <header
        className={`ph-header${scrolled ? " scrolled" : ""}${
          menuOpen ? " menu-open" : ""
        }`}
      >
        <div
          className="ph-header-bar"
          ref={barRef}
          onPointerMove={onBarPointerMove}
          onPointerLeave={onBarPointerLeave}
        >
          <div className="ph-header-inner">
            <Link to="/home" className="ph-brand" onClick={closeMenu}>
              <span className="brand-mark" aria-hidden="true">
                <img src="/logo-mark.png" alt="" width="28" height="28" />
              </span>
              <span className="ph-brand-text">Campus Coin</span>
            </Link>

            <nav
              className="ph-nav"
              ref={navRef}
              aria-label="Primary"
              onMouseLeave={hidePill}
            >
              <span className="ph-nav-pill" ref={pillRef} aria-hidden="true" />
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="ph-nav-link"
                  onMouseEnter={(e) => movePill(e.currentTarget)}
                  onFocus={(e) => movePill(e.currentTarget)}
                  onBlur={hidePill}
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="ph-actions">
              <SpecularButton
                as={Link}
                to={dashboardHref}
                className="ph-signin"
                size="sm"
                radius={10}
                textColor="var(--text-muted)"
                lineColor="#ffffff"
                baseColor="#2e2f32"
              >
                <ButtonPerimeter />
                {dashboardLabel}
              </SpecularButton>
              <ThemeToggle className="ph-theme-toggle" />
              <SpecularButton
                as={Link}
                to="/register"
                className="ph-cta"
                size="sm"
                radius={10}
                textColor="#06140f"
                lineColor="#d6fff4"
                baseColor="#46cda7"
              >
                <ButtonPerimeter />
                Create account
                <ArrowRight size={15} aria-hidden="true" />
              </SpecularButton>
              <SpecularButton
                type="button"
                className="ph-menu-btn"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="ph-mobile-menu"
                size="sm"
                radius={10}
                textColor="var(--text-primary)"
                lineColor="#ffffff"
                baseColor="#2e2f32"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? (
                  <X size={18} aria-hidden="true" />
                ) : (
                  <Menu size={18} aria-hidden="true" />
                )}
              </SpecularButton>
            </div>
          </div>

          <div
            className="ph-mobile-panel"
            id="ph-mobile-menu"
            aria-hidden={!menuOpen}
          >
            <nav className="ph-mobile-links" aria-label="Mobile">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  {item.label}
                </a>
              ))}
              <Link to={dashboardHref} onClick={closeMenu}>
                {dashboardLabel}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="ph-main">
        <section className="ph-hero">
          <div className="ph-hero-inner">
            <div className="ph-hero-content">
              <RevealBlock className="ph-hero-eyebrow" delay={40}>
                <Sparkles size={13} />
                Smart student finance
              </RevealBlock>
              <RevealBlock delay={120}>
                <h1 className="ph-hero-headline">
                  Build a calmer
                  <br />
                  money habit.
                </h1>
              </RevealBlock>
              <RevealBlock delay={200}>
                <p className="ph-hero-desc">
                  Campus Coin makes budgets, spending patterns, and next-best
                  moves visible in one focused workspace designed for how
                  students actually manage money.
                </p>
              </RevealBlock>
              <RevealBlock delay={280}>
                <div className="ph-hero-actions">
                  <SpecularButton
                    as={Link}
                    to={user ? "/" : "/register"}
                    className="ph-btn-primary"
                    size="md"
                    radius={11}
                    textColor="#06140f"
                    lineColor="#d6fff4"
                    baseColor="#46cda7"
                  >
                    <ButtonPerimeter />
                    {user ? "Open dashboard" : "Start for free"}
                    <ArrowRight size={16} />
                  </SpecularButton>
                  <SpecularButton
                    as="a"
                    href="#features"
                    className="ph-btn-secondary"
                    size="md"
                    radius={11}
                    textColor="var(--text-primary)"
                    lineColor="#ffffff"
                    baseColor="#34363b"
                  >
                    <ButtonPerimeter />
                    See how it works
                  </SpecularButton>
                </div>
              </RevealBlock>
              <RevealBlock delay={360}>
                <div className="ph-hero-trust">
                  <CheckCircle2 size={14} />
                  <span>Free for students. No credit card required.</span>
                </div>
              </RevealBlock>
            </div>
            <RevealBlock className="ph-hero-visual" delay={260}>
              <DashboardPreview />
            </RevealBlock>
          </div>
        </section>

        <section className="ph-trust-bar">
          <RevealBlock>
            <div className="ph-trust-bar-inner">
              <div className="ph-trust-item">
                <Lock size={16} />
                <span>Encrypted sessions</span>
              </div>
              <div className="ph-trust-divider" />
              <div className="ph-trust-item">
                <Eye size={16} />
                <span>Your data, your account only</span>
              </div>
              <div className="ph-trust-divider" />
              <div className="ph-trust-item">
                <Zap size={16} />
                <span>Lightweight &amp; fast</span>
              </div>
            </div>
          </RevealBlock>
        </section>

        <section className="ph-section" id="features">
          <div className="ph-section-inner">
            <RevealBlock className="ph-section-label">Features</RevealBlock>
            <RevealBlock delay={60}>
              <h2 className="ph-section-headline">
                Everything you need to
                <br />
                understand your money.
              </h2>
            </RevealBlock>
            <RevealBlock delay={120}>
              <p className="ph-section-desc">
                Campus Coin turns everyday transactions into clear, actionable
                insights so you can make smarter financial decisions.
              </p>
            </RevealBlock>

            <div className="ph-features">
              <RevealBlock className="ph-feature-card" delay={80}>
                <div className="ph-feature-icon">
                  <BarChart3 size={20} />
                </div>
                <div className="ph-feature-visual">
                  <div className="ph-mini-bars">
                    <div className="ph-mini-bar" style={{ height: "45%" }} />
                    <div className="ph-mini-bar" style={{ height: "70%" }} />
                    <div className="ph-mini-bar" style={{ height: "55%" }} />
                    <div
                      className="ph-mini-bar active"
                      style={{ height: "90%" }}
                    />
                    <div className="ph-mini-bar" style={{ height: "60%" }} />
                  </div>
                </div>
                <h3 className="ph-feature-title">Readable reports</h3>
                <p className="ph-feature-desc">
                  Turn daily activity into useful monthly patterns. See where
                  your money goes without spreadsheets.
                </p>
              </RevealBlock>

              <RevealBlock className="ph-feature-card" delay={160}>
                <div className="ph-feature-icon">
                  <ShieldCheck size={20} />
                </div>
                <div className="ph-feature-visual">
                  <div className="ph-mini-lock">
                    <Lock size={28} strokeWidth={1.5} />
                    <div className="ph-lock-ring" />
                  </div>
                </div>
                <h3 className="ph-feature-title">Private by design</h3>
                <p className="ph-feature-desc">
                  Your data is scoped to your account and protected by secure
                  sessions. No sharing, no tracking.
                </p>
              </RevealBlock>

              <RevealBlock className="ph-feature-card" delay={240}>
                <div className="ph-feature-icon">
                  <Target size={20} />
                </div>
                <div className="ph-feature-visual">
                  <div className="ph-mini-goal">
                    <div className="ph-mini-goal-ring">
                      <svg viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--bg-muted)"
                          strokeWidth="2.5"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="2.5"
                          strokeDasharray="0, 100"
                          className="ph-ring-fill"
                          data-target="72, 100"
                        />
                      </svg>
                    </div>
                    <span className="ph-mini-goal-pct">72%</span>
                  </div>
                </div>
                <h3 className="ph-feature-title">Goals that stay visible</h3>
                <p className="ph-feature-desc">
                  Use budgets and savings goals to make progress tangible.
                  Watch your targets move closer.
                </p>
              </RevealBlock>
            </div>
          </div>
        </section>

        <section className="ph-section ph-section-alt" id="how-it-works">
          <div className="ph-section-inner">
            <RevealBlock className="ph-section-label">
              How it works
            </RevealBlock>
            <RevealBlock delay={60}>
              <h2 className="ph-section-headline">
                From signup to clarity
                <br />
                in four steps.
              </h2>
            </RevealBlock>

            <div className="ph-steps">
              {[
                {
                  num: "01",
                  title: "Connect your spending",
                  desc: "Log transactions manually or import statements. Campus Coin organizes them automatically.",
                  icon: <CreditCard size={18} />,
                },
                {
                  num: "02",
                  title: "Understand your habits",
                  desc: "Visual reports reveal patterns you might miss — daily, weekly, and monthly.",
                  icon: <BarChart3 size={18} />,
                },
                {
                  num: "03",
                  title: "Set smarter goals",
                  desc: "Create budgets and savings targets that reflect how you actually spend.",
                  icon: <Target size={18} />,
                },
                {
                  num: "04",
                  title: "Track your progress",
                  desc: "Watch your goals move forward with clear, motivating indicators.",
                  icon: <TrendingUp size={18} />,
                },
              ].map((step, i) => (
                <RevealBlock
                  className="ph-step"
                  key={step.num}
                  delay={60 + i * 70}
                >
                  <div className="ph-step-num">{step.num}</div>
                  <div className="ph-step-content">
                    <div className="ph-step-icon">{step.icon}</div>
                    <h3 className="ph-step-title">{step.title}</h3>
                    <p className="ph-step-desc">{step.desc}</p>
                  </div>
                </RevealBlock>
              ))}
            </div>
          </div>
        </section>

        <section className="ph-section" id="insight">
          <div className="ph-section-inner">
            <div className="ph-insight-grid">
              <RevealBlock className="ph-insight-text">
                <RevealBlock className="ph-section-label">
                  Product insight
                </RevealBlock>
                <RevealBlock delay={40}>
                  <h2
                    className="ph-section-headline"
                    style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}
                  >
                    Your money should feel
                    <br />
                    understandable.
                  </h2>
                </RevealBlock>
                <p className="ph-insight-desc">
                  Campus Coin turns transactions and spending patterns into
                  useful, actionable insights. No jargon. No noise. Just clear
                  information that helps you make better financial decisions as
                  a student.
                </p>
                <div className="ph-insight-points">
                  <div className="ph-insight-point">
                    <CheckCircle2 size={16} />
                    <span>Auto-categorized spending</span>
                  </div>
                  <div className="ph-insight-point">
                    <CheckCircle2 size={16} />
                    <span>Plain-language reports</span>
                  </div>
                  <div className="ph-insight-point">
                    <CheckCircle2 size={16} />
                    <span>Smart saving suggestions</span>
                  </div>
                </div>
              </RevealBlock>
              <RevealBlock className="ph-insight-visual" delay={100}>
                <div className="ph-analytics-card">
                  <div className="ph-analytics-head">
                    <span className="ph-analytics-title">
                      Monthly overview
                    </span>
                    <span className="ph-analytics-badge">September</span>
                  </div>
                  <div className="ph-analytics-row">
                    <div className="ph-analytics-metric">
                      <span className="ph-analytics-metric-label">Income</span>
                      <span className="ph-analytics-metric-value income">
                        $1,680
                      </span>
                    </div>
                    <div className="ph-analytics-metric">
                      <span className="ph-analytics-metric-label">
                        Expenses
                      </span>
                      <span className="ph-analytics-metric-value">$1,124</span>
                    </div>
                    <div className="ph-analytics-metric">
                      <span className="ph-analytics-metric-label">Saved</span>
                      <span className="ph-analytics-metric-value saved">
                        $556
                      </span>
                    </div>
                  </div>
                  <div className="ph-analytics-chart">
                    <div className="ph-donut">
                      <svg viewBox="0 0 36 36">
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--bg-muted)"
                          strokeWidth="3"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth="3"
                          strokeDasharray="0, 100"
                          className="ph-donut-saved"
                        />
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="var(--danger)"
                          strokeWidth="3"
                          strokeDasharray="0, 100"
                          strokeDashoffset="-33"
                          className="ph-donut-expense"
                        />
                      </svg>
                    </div>
                    <div className="ph-donut-legend">
                      <div className="ph-legend-item">
                        <span className="ph-dot accent" />
                        <span>Saved (33%)</span>
                      </div>
                      <div className="ph-legend-item">
                        <span className="ph-dot danger" />
                        <span>Expenses (55%)</span>
                      </div>
                      <div className="ph-legend-item">
                        <span className="ph-dot muted" />
                        <span>Remaining (12%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealBlock>
            </div>
          </div>
        </section>

        <section className="ph-section ph-cta-section">
          <div className="ph-section-inner">
            <RevealBlock className="ph-cta-box">
              <h2 className="ph-cta-headline">
                Start building a calmer
                <br />
                money habit.
              </h2>
              <p className="ph-cta-desc">
                Simple, private, and designed around the way students actually
                manage money.
              </p>
              <div className="ph-cta-actions">
                <SpecularButton
                  as={Link}
                  to={user ? "/" : "/register"}
                  className="ph-btn-primary ph-btn-lg"
                  size="md"
                  radius={12}
                  textColor="#06140f"
                  lineColor="#d6fff4"
                  baseColor="#46cda7"
                >
                  <ButtonPerimeter />
                  {user ? "Open dashboard" : "Create your account"}
                  <ArrowRight size={17} />
                </SpecularButton>
                <SpecularButton
                  as="a"
                  href="#features"
                  className="ph-btn-secondary"
                  size="md"
                  radius={11}
                  textColor="var(--text-primary)"
                  lineColor="#ffffff"
                  baseColor="#34363b"
                >
                  <ButtonPerimeter />
                  Explore features
                </SpecularButton>
              </div>
            </RevealBlock>
          </div>
        </section>
      </main>

      <footer className="ph-footer">
        <div className="ph-footer-inner">
          <div className="ph-footer-brand">
            <Link to="/home" className="ph-brand">
              <span className="brand-mark" aria-hidden="true">
                <img src="/logo-mark.png" alt="" width="26" height="26" />
              </span>
              <span className="ph-brand-text">Campus Coin</span>
            </Link>
            <p className="ph-footer-tagline">
              A student budgeting workspace.
            </p>
          </div>
          <div className="ph-footer-links">
            <div className="ph-footer-col">
              <h4>Public</h4>
              <Link to="/home">Home</Link>
              <Link to="/login">Student login</Link>
              <Link to="/register">Register</Link>
            </div>
            <div className="ph-footer-col">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How it works</a>
              <a href="#insight">Product insight</a>
            </div>
            <div className="ph-footer-col">
              <h4>Account</h4>
              <Link to="/register">Create account</Link>
              <Link
                to={user ? (user.role === "admin" ? "/admin" : "/") : "/login"}
              >
                {user ? "Dashboard" : "Sign in"}
              </Link>
            </div>
          </div>
        </div>
        <div className="ph-footer-bottom">
          <span>
            &copy; {new Date().getFullYear()} Campus Coin. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
