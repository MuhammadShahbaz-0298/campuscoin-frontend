import formatCurrency from "../../utils/formatCurrency";
import AnimatedNumber from "../ui/AnimatedNumber";
import stagger from "../../animation/stagger";

export default function CategoryBreakdownChart({ items = [] }) {
  const largest = Math.max(...items.map((item) => item.value), 1);
  return (
    <div>
      <h3>Category breakdown</h3>
      {items.map((item, index) => (
        <div
          className="bar-row enter-row"
          key={item.name}
          style={{ "--enter-delay": `${stagger(index, { base: 80, step: 50 })}ms` }}
        >
          <span>{item.name}</span>
          <div className="bar">
            <i style={{ width: `${(item.value / largest) * 100}%` }} />
          </div>
          <b>
            <AnimatedNumber
              value={item.value}
              format={formatCurrency}
              delay={stagger(index, { base: 200, step: 50 })}
            />
          </b>
        </div>
      ))}
    </div>
  );
}
