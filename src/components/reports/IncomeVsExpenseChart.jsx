import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";
import stagger from "../../animation/stagger";

export default function IncomeVsExpenseChart({ items = [] }) {
  return (
    <div>
      <h3>Income vs expense</h3>
      {items.map((item, index) => (
        <div
          className="category-row enter-row"
          key={item.month}
          style={{ "--enter-delay": `${stagger(index, { base: 60, step: 45 })}ms` }}
        >
          <span>{item.month}</span>
          <span className="income-text">
            +<AnimatedNumber
              value={item.income}
              format={formatCurrency}
              delay={stagger(index, { base: 160, step: 45 })}
            />
          </span>
          <span className="expense-text">
            −<AnimatedNumber
              value={item.expense}
              format={formatCurrency}
              delay={stagger(index, { base: 210, step: 45 })}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
