import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";

export default function BalanceSummaryCard({
  income,
  expense,
  countDelay = 0,
  className = "",
  style,
}) {
  return (
    <div className={`stat-card${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">CURRENT BALANCE</div>
      <strong>
        <AnimatedNumber
          value={income - expense}
          format={formatCurrency}
          delay={countDelay}
        />
      </strong>
      <span>
        {formatCurrency(income)} in · {formatCurrency(expense)} out
      </span>
    </div>
  );
}
