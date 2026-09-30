import { useEffect, useRef, useState } from "react";
import { BellRing, PieChart, Sparkles, Target } from "lucide-react";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import AuthHeroArt from "./AuthHeroArt";
import SpecularButton from "../SpecularButton";

const FEATURES = [
  {
    icon: Sparkles,
    title: "Spending sorted the second it happens",
    body: "Every coffee, rent payment and takeaway is categorised automatically — no spreadsheet, no Sunday-night admin.",
  },
  {
    icon: Target,
    title: "Budgets that flex with term time",
    body: "Weekly limits reset around your timetable, so one big night out doesn't derail the whole semester.",
  },
  {
    icon: BellRing,
    title: "A heads-up before you overspend",
    body: "Campus Coin nudges you while there's still time to change plans — not a lecture once the money is gone.",
  },
];

const TRUST = [
  { icon: PieChart, label: "Auto-sorted transactions" },
  { icon: Target, label: "Flexible weekly budgets" },
  { icon: Sparkles, label: "Weekly money insights" },
];

export default function AuthBrandPanel() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (paused || reduced) return undefined;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % FEATURES.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [paused, reduced]);

  function handlePointerMove(event) {
    if (reduced || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    sectionRef.current.style.setProperty("--px", px.toFixed(3));
    sectionRef.current.style.setProperty("--py", py.toFixed(3));
  }

  function handlePointerLeave() {
    if (!sectionRef.current) return;
    sectionRef.current.style.setProperty("--px", "0");
    sectionRef.current.style.setProperty("--py", "0");
  }

  const active = FEATURES[index];

  return (
    <section
      className="auth-brand"
      aria-labelledby="brand-title"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
    >
      <span className="auth-brand__glow auth-brand__glow--a" aria-hidden="true" />
      <span className="auth-brand__glow auth-brand__glow--b" aria-hidden="true" />

      <div className="auth-brand__top">
        <span className="sx-enter" style={{ "--d": "60ms" }}>
          <span className="auth-logo" style={{ marginBottom: 0 }}>
            <span className="auth-mark" aria-hidden="true">
              <img src="/logo-mark.png" alt="" width="34" height="34" />
            </span>
            <span>Campus Coin</span>
          </span>
        </span>
      </div>

      <div className="auth-brand__body">
        <p className="auth-brand__eyebrow sx-enter" style={{ "--d": "220ms" }}>
          Smart money for student life
        </p>
        <h2
          id="brand-title"
          className="auth-brand__title sx-enter"
          style={{ "--d": "290ms" }}
        >
          Make your money last to the end of term.
        </h2>
        <p
          className="auth-brand__lede sx-enter"
          style={{ "--d": "360ms" }}
        >
          Campus Coin watches every coffee, night out and bill, then turns it
          into budgets and insights you'll actually use — before the money is
          gone, not after.
        </p>

        <div className="sx-enter" style={{ "--d": "440ms" }}>
          <AuthHeroArt />
        </div>

        <div
          className="auth-rotator"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="auth-rotator__viewport" aria-live="polite">
            <article className="auth-rotator__item" key={index}>
              <span className="auth-rotator__icon" aria-hidden="true">
                <active.icon size={17} strokeWidth={2.2} />
              </span>
              <div>
                <h3>{active.title}</h3>
                <p>{active.body}</p>
              </div>
            </article>
          </div>
          <div className="auth-rotator__dots">
            {FEATURES.map((feature, i) => (
              <SpecularButton
                key={feature.title}
                type="button"
                className="auth-dot-btn"
                size="sm"
                radius={99}
                textColor="#f5f5f5"
                lineColor="#ffffff"
                baseColor="#2a3138"
                aria-current={i === index}
                aria-label={`Show highlight ${i + 1} of ${FEATURES.length}: ${feature.title}`}
                onClick={() => setIndex(i)}
              >
                {null}
              </SpecularButton>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-brand__foot sx-enter" style={{ "--d": "560ms" }}>
        {TRUST.map(({ icon: Icon, label }) => (
          <span key={label}>
            <Icon size={13} strokeWidth={2.2} aria-hidden="true" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
