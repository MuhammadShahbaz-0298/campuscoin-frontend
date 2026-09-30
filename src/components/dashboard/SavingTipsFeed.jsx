import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";
import stagger from "../../animation/stagger";

function kindOf(tip) {
  if (tip.kind) return tip.kind;
  return String(tip.title || "").startsWith("Trim") ? "over-budget" : "opportunity";
}

const KIND_LABEL = { "over-budget": "Over budget", opportunity: "Opportunity" };

export default function SavingTipsFeed({
  tips = [],
  delayBase = 0,
  className = "",
  style,
}) {
  return (
    <div className={`panel${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">PERSONALIZED FEED</div>
      <h2>Next best moves</h2>
      <p className="feed-sub">Ranked by how much you could free up this month.</p>
      {tips.length ? (
        tips.map((tip, index) => {
          const kind = kindOf(tip);
          const rowDelay = stagger(index, { base: delayBase, step: 70 });
          return (
            <article
              className="tip tip-card enter-row"
              key={tip.title}
              style={{ "--enter-delay": `${rowDelay}ms` }}
            >
              <span className="tip-rank" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="tip-body">
                <div className="tip-meta">
                  <span className={`tip-kind ${kind}`}>{KIND_LABEL[kind] || "Tip"}</span>
                  {tip.category ? <span className="tip-cat">{tip.category}</span> : null}
                </div>
                <strong>{tip.title}</strong>
                <p>{tip.body}</p>
              </div>
              <div
                className="tip-saving enter-badge"
                style={{ "--enter-delay": `${stagger(index, { base: delayBase + 140, step: 70 })}ms` }}
                aria-label={`Potential saving ${formatCurrency(tip.impact)}`}
              >
                <span className="tip-saving-label">Potential saving</span>
                <span className="tip-saving-value">
                  <AnimatedNumber
                    value={tip.impact}
                    format={formatCurrency}
                    delay={stagger(index, { base: delayBase + 220, step: 70 })}
                  />
                </span>
                <span className="tip-saving-note">this month</span>
              </div>
            </article>
          );
        })
      ) : (
        <div className="empty">
          No tailored tips yet — log a few transactions and set a budget to unlock your
          feed.
        </div>
      )}
    </div>
  );
}
