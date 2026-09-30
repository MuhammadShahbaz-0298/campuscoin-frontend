import { Link } from 'react-router-dom';
import formatCurrency from '../../utils/formatCurrency';
import ProgressBar from '../ui/ProgressBar';
import AnimatedNumber from '../ui/AnimatedNumber';
import stagger from '../../animation/stagger';
import SpecularButton from '../SpecularButton';

export default function BudgetVsActualWidget({ budgets = [], delayBase = 0, className = '', style }) {
  return (
    <div className={`panel compact${className ? ` ${className}` : ''}`} style={style}>
      <div className="eyebrow">BUDGET VS ACTUAL</div>
      <h2>Monthly limits</h2>
      {budgets.length ? (
        budgets.map((budget, index) => (
          <div
            className="budget-line enter-row"
            key={budget._id || budget.categoryId?._id}
            style={{ '--enter-delay': `${stagger(index, { base: delayBase, step: 50 })}ms` }}
          >
            <div>
              <span>{budget.categoryId?.name}</span>
              <small>
                <AnimatedNumber value={budget.spent} format={formatCurrency} delay={stagger(index, { base: delayBase + 150, step: 50 })} /> /{' '}
                <AnimatedNumber value={budget.limitAmount} format={formatCurrency} delay={stagger(index, { base: delayBase + 200, step: 50 })} /> ·{' '}
                <AnimatedNumber value={budget.percentage} format={(v) => Math.round(v)} delay={stagger(index, { base: delayBase + 250, step: 50 })} />%
              </small>
            </div>
            <ProgressBar
              value={budget.percentage}
              threshold={80}
              label={`${budget.categoryId?.name || "Category"} budget used`}
            />
          </div>
        ))
      ) : (
        <div className="empty">
          Set your first category budget{' '}
          <SpecularButton as={Link} className="secondary" to="/budgets" size="md" radius={10} textColor="var(--text-primary)" lineColor="#ffffff" baseColor="#34363b">
            Get started
          </SpecularButton>
        </div>
      )}
    </div>
  );
}
