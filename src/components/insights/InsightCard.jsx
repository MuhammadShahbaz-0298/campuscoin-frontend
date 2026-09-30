import { Lightbulb, TrendingDown, TrendingUp, Minus } from "lucide-react";
import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";
import ProgressBar from "../ui/ProgressBar";

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WHOLE = { fractionDigits: 0 };
const HIGH_SHARE = 60;
const MEDIUM_SHARE = 40;

function formatMonth(month) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(month || "");
  if (!match) return month || "";
  return `${MONTH_LABELS[Number(match[2]) - 1]} ${match[1]}`;
}

function shareTone(share) {
  if (share >= HIGH_SHARE) return "danger";
  if (share >= MEDIUM_SHARE) return "warn";
  return "accent";
}

function savingsMeta(savingsRate, net) {
  if (savingsRate === null || savingsRate === undefined) return null;
  const rate = `${Math.abs(Math.round(savingsRate))}%`;
  return net < 0 ? `${rate} over income` : `${rate} of income`;
}

function StatBlock({ label, value, meta, tone = "", delay = 0 }) {
  return (
    <div className={`insight-stat${tone ? ` insight-stat-${tone}` : ""}`}>
      <div className="eyebrow">{label}</div>
      <strong className="insight-stat-value">
        <AnimatedNumber value={value} format={(v) => formatCurrency(v, WHOLE)} delay={delay} />
      </strong>
      {meta ? <span className="insight-stat-meta">{meta}</span> : null}
    </div>
  );
}

function TopCategoryBlock({ topCategory }) {
  if (!topCategory) return null;
  const share = Number(topCategory.share) || 0;
  const tone = shareTone(share);

  return (
    <div className="insight-category">
      <div className="insight-category-head">
        <span className="insight-category-name">{topCategory.name}</span>
        <span className="insight-category-amount">
          {formatCurrency(topCategory.amount, WHOLE)}
        </span>
        <span className={`insight-share-badge insight-share-${tone}`}>
          {Math.round(share)}% of spend
        </span>
      </div>
      <ProgressBar value={share} tone={tone} label={`${topCategory.name} share of spending`} />
      {topCategory.note ? <p className="insight-category-note">{topCategory.note}</p> : null}
    </div>
  );
}

function RecommendationBlock({ text }) {
  if (!text) return null;
  return (
    <div className="insight-rec">
      <Lightbulb className="insight-rec-icon" size={16} strokeWidth={2} aria-hidden="true" />
      <p className="insight-rec-text">{text}</p>
    </div>
  );
}

function ComparisonFooter({ comparison, footerText }) {
  if (footerText) {
    return <p className="insight-footer">{footerText}</p>;
  }
  if (!comparison || !comparison.label) return null;

  const delta = Number(comparison.expenseDelta) || 0;
  const Icon = delta < 0 ? TrendingDown : delta > 0 ? TrendingUp : Minus;
  const tone = delta < 0 ? "good" : delta > 0 ? "bad" : "flat";
  const change =
    delta === 0
      ? "was flat"
      : `${delta < 0 ? "down" : "up"} ${formatCurrency(Math.abs(delta), WHOLE)}`;
  const pct =
    comparison.expenseDeltaPct === null || comparison.expenseDeltaPct === undefined
      ? ""
      : ` (${Math.abs(Math.round(comparison.expenseDeltaPct))}% ${delta < 0 ? "lower" : "higher"})`;

  return (
    <p className="insight-footer">
      <Icon
        size={13}
        strokeWidth={2.2}
        aria-hidden="true"
        className={`insight-footer-icon insight-footer-${tone}`}
      />
      <span>{`Compared to ${comparison.label}: spending ${change}${pct}`}</span>
    </p>
  );
}

export default function InsightCard({ insight, className = "", style }) {
  const metrics = insight.metrics || null;
  const headline = insight.headline || "";
  const net = Number(metrics?.net ?? NaN);
  const savingsRate = metrics?.savingsRate;

  return (
    <article className={`insight${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">{formatMonth(insight.month)}</div>
      {headline ? <h3 className="insight-headline">{headline}</h3> : null}

      {metrics ? (
        <>
          <div className="insight-stats">
            <StatBlock label="Income" value={metrics.income} tone="positive" delay={60} />
            <StatBlock
              label="Spent"
              value={metrics.expense}
              tone="spend"
              meta={metrics.transactionCount ? `${metrics.transactionCount} transactions` : null}
              delay={120}
            />
            <StatBlock
              label={net < 0 ? "Overspent" : "Saved"}
              value={net}
              tone={net < 0 ? "negative" : "positive"}
              meta={savingsMeta(savingsRate, net)}
              delay={180}
            />
          </div>

          <TopCategoryBlock topCategory={metrics.topCategory} />

          <RecommendationBlock text={insight.tipText} />

          <ComparisonFooter comparison={metrics.comparison} footerText={insight.footerText} />
        </>
      ) : (
        <>
          <p className="insight-summary">{insight.summaryText}</p>
          <RecommendationBlock text={insight.tipText} />
          <ComparisonFooter comparison={null} footerText={insight.footerText} />
        </>
      )}
    </article>
  );
}
