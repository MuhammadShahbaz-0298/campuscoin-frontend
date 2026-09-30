import BudgetProgressCard from "./BudgetProgressCard";
import stagger from "../../animation/stagger";

export default function BudgetList({ budgets = [] }) {
  return (
    <div className="budget-list">
      {budgets.map((budget, index) => (
        <BudgetProgressCard
          budget={budget}
          key={budget._id}
          className="enter-row"
          style={{ "--enter-delay": `${stagger(index, { step: 55 })}ms` }}
        />
      ))}
    </div>
  );
}
