import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import BalanceSummaryCard from '../components/dashboard/BalanceSummaryCard';
import StatCard from '../components/dashboard/StatCard';
import TopCategoryWidget from '../components/dashboard/TopCategoryWidget';
import BudgetVsActualWidget from '../components/dashboard/BudgetVsActualWidget';
import SavingTipsFeed from '../components/dashboard/SavingTipsFeed';
import RecentTransactionsWidget from '../components/dashboard/RecentTransactionsWidget';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { getDashboard } from '../api/dashboardApi';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';
import formatCurrency from '../utils/formatCurrency';
import SpecularButton from '../components/SpecularButton';

const enter = (delay) => ({ '--enter-delay': `${Math.min(delay, 400)}ms` });

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const { showToast } = useToast();
  useEffect(() => { getDashboard().then((response) => setDashboard(response.data.data)).catch((error) => showToast(getErrorMessage(error, 'Unable to load dashboard.'), 'error')); }, [showToast]);
  if (!dashboard) return <Skeleton />;
  const savingsRateValue = dashboard.income ? Math.round((dashboard.balance / dashboard.income) * 100) : null;
  const savingsRate = savingsRateValue !== null ? `${savingsRateValue}%` : '—';
  return (
    <div className="dash-entrance">
      <div className="page-head enter-in" style={enter(0)}>
        <p className="muted">{dashboard.month} · Your financial pulse</p>
        <SpecularButton as={Link} className="primary" to="/transactions" size="md" radius={10} textColor="#06140f" lineColor="#d6fff4" baseColor="#46cda7"><Plus size={16} /> Add transaction</SpecularButton>
      </div>
      <div className="stats">
        <BalanceSummaryCard income={dashboard.income} expense={dashboard.expense} className="enter-in" style={enter(60)} countDelay={220} />
        <StatCard label="THIS MONTH'S SPEND" value={formatCurrency(dashboard.expense)} detail={`${dashboard.recentTransactions.length} recent records`} negative className="enter-in" style={enter(120)} numericValue={dashboard.expense} format={formatCurrency} countDelay={280} />
        <TopCategoryWidget category={dashboard.topCategory} className="enter-in" style={enter(180)} countDelay={340} />
        <StatCard label="SAVINGS RATE" value={savingsRate} detail="Based on all monthly activity" className="enter-in" style={enter(240)} numericValue={savingsRateValue} format={(v) => `${Math.round(v)}%`} countDelay={400} />
      </div>
      <div className="grid-2">
        {dashboard.recentTransactions.length ? (
          <RecentTransactionsWidget transactions={dashboard.recentTransactions} className="enter-in" style={enter(320)} delayBase={380} />
        ) : (
          <div className="panel enter-in" style={enter(320)}><EmptyState message="No transactions logged this month yet." /></div>
        )}
        <SavingTipsFeed tips={dashboard.tips} className="enter-in" style={enter(380)} delayBase={440} />
      </div>
      <div className="grid-3">
        <BudgetVsActualWidget budgets={dashboard.budgets} className="enter-in" style={enter(460)} delayBase={520} />
        <div className="panel compact enter-in" style={enter(520)}>
          <div className="eyebrow">QUICK ADD</div>
          <h2>Keep momentum</h2>
          <div className="quick-grid">
            <SpecularButton as={Link} to="/transactions?type=expense" className="quick" size="sm" radius={12} textColor="var(--text-primary)" lineColor="#ffffff" baseColor="#2c2f34">− Expense</SpecularButton>
            <SpecularButton as={Link} to="/transactions?type=income" className="quick" size="sm" radius={12} textColor="var(--text-primary)" lineColor="#ffffff" baseColor="#2c2f34">+ Income</SpecularButton>
          </div>
        </div>
        <div className="panel compact accent-panel enter-in" style={enter(560)}>
          <div className="eyebrow">MONTHLY INSIGHT</div>
          <h2>Make your money visible.</h2>
          <p>Patterns get clearer when you log consistently.</p>
          <Link to="/insights" className="link">Generate insight →</Link>
        </div>
      </div>
    </div>
  );
}
