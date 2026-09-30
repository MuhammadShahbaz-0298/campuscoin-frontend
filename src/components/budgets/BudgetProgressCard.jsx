import formatCurrency from "../../utils/formatCurrency";
import ProgressBar from "../ui/ProgressBar";
import AnimatedNumber from "../ui/AnimatedNumber";

export default function BudgetProgressCard({ budget, className = "", style }) {
  return (
    <div className={`budget-card${className ? ` ${className}` : ""}`} style={style}>
      <strong>{budget.categoryId?.name}</strong>
      <small>
        <AnimatedNumber value={budget.spent} format={formatCurrency} delay={160} /> spent
        of <AnimatedNumber value={budget.limitAmount} format={formatCurrency} delay={220} />
      </small>
      <ProgressBar
        value={budget.percentage}
        threshold={80}
        label={`${budget.categoryId?.name || "Category"} budget used`}
      />
      <small>
        <AnimatedNumber value={budget.percentage} format={(v) => Math.round(v)} delay={260} />%
        consumed — alert at 80%
      </small>
    </div>
  );
}
