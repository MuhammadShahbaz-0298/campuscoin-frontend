import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import AnimatedNumber from "../ui/AnimatedNumber";
import stagger from "../../animation/stagger";

export default function RecentTransactionsWidget({
  transactions = [],
  delayBase = 0,
  className = "",
  style,
}) {
  return (
    <div className={`panel${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">RECENT ACTIVITY</div>
      <h2>Latest transactions</h2>
      {transactions.map((item, index) => (
        <div
          className="activity enter-row"
          key={item._id}
          style={{ "--enter-delay": `${stagger(index, { base: delayBase, step: 55 })}ms` }}
        >
          <span
            className={
              item.type === "income"
                ? "activity-icon income"
                : "activity-icon expense"
            }
          >
            {item.type === "income" ? "+" : "−"}
          </span>
          <div>
            <strong>{item.description || item.categoryId?.name}</strong>
            <small>
              {item.categoryId?.name} · {formatDate(item.date)}
            </small>
          </div>
          <b
            className={item.type === "income" ? "income-text" : "expense-text"}
          >
            {item.type === "income" ? "+" : "−"}
            <AnimatedNumber
              value={item.amount}
              format={formatCurrency}
              delay={stagger(index, { base: delayBase + 150, step: 55 })}
            />
          </b>
        </div>
      ))}
    </div>
  );
}
