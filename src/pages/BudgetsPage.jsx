import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Pagination from "../components/ui/Pagination";
import BudgetForm, { getCurrentMonth } from "../components/budgets/BudgetForm";
import BudgetList from "../components/budgets/BudgetList";
import { getCategories } from "../api/categoryApi";
import { getBudgets, saveBudget } from "../api/budgetApi";
import { useToast } from "../context/ToastContext";
import getErrorMessage from "../utils/getErrorMessage";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [form, setForm] = useState({
    categoryId: "",
    limitAmount: "",
    month: getCurrentMonth(),
  });

  const { showToast } = useToast();

  async function load(page = pagination.page) {
    try {
      const [budgetResponse, categoryResponse] = await Promise.all([
        getBudgets({ page }),
        getCategories(),
      ]);
      setBudgets(budgetResponse.data.data);
      setPagination(budgetResponse.data.pagination);
      setCategories(categoryResponse.data.data);
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to load budgets."), "error");
    }
  }

  useEffect(() => {
    load(1);
  }, []);

  function onChange(field) {
    return (event) => setForm({ ...form, [field]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    try {
      await saveBudget({ ...form, limitAmount: Number(form.limitAmount) });
      setForm({ categoryId: "", limitAmount: "", month: getCurrentMonth() });
      showToast("Budget saved successfully.", "success");
      load(1);
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to save budget."), "error");
    }
  }

  return (
    <Card>
      <div className="eyebrow">BUDGETS & ALERTS</div>
      <h2>Set limits that keep your goals visible</h2>
      <BudgetForm
        form={form}
        categories={categories.filter((item) => item.type === "expense")}
        onChange={onChange}
        onSubmit={submit}
      />
      <BudgetList budgets={budgets} />
      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        label="budgets"
        onPageChange={load}
      />
    </Card>
  );
}