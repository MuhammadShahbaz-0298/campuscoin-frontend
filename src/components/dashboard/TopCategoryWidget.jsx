import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";

export default function TopCategoryWidget({
  category,
  countDelay = 0,
  className = "",
  style,
}) {
  return (
    <div className={`stat-card${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">TOP CATEGORY</div>
      <strong>{category?.name || "—"}</strong>
      <span>
        {category ? (
          <AnimatedNumber
            value={category.amount}
            format={formatCurrency}
            delay={countDelay}
          />
        ) : (
          "No data yet"
        )}
      </span>
    </div>
  );
}
