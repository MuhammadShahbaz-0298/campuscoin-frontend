import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import CategoryBreakdownChart from '../components/reports/CategoryBreakdownChart';
import IncomeVsExpenseChart from '../components/reports/IncomeVsExpenseChart';
import { getCategoryBreakdown, getIncomeVsExpense } from '../api/reportApi';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';

export default function ReportsPage() {
  const [categories, setCategories] = useState([]);
  const [trend, setTrend] = useState([]);
  const { showToast } = useToast();
  useEffect(() => {
    Promise.all([getCategoryBreakdown(), getIncomeVsExpense()]).then(([categoryResponse, trendResponse]) => { setCategories(categoryResponse.data.data); setTrend(trendResponse.data.data); }).catch((error) => showToast(getErrorMessage(error, 'Unable to load reports.'), 'error'));
  }, [showToast]);
  return <Card><div className="eyebrow">REPORTS</div><h2>Readable patterns from your history</h2><div className="charts"><CategoryBreakdownChart items={categories} /><IncomeVsExpenseChart items={trend} /></div></Card>;
}
