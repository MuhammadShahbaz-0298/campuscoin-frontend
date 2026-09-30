import { useEffect, useRef } from "react";
import { useAlert } from "../../context/AlertContext";
import { useAuth } from "../../context/AuthContext";
import { getBudgets } from "../../api/budgetApi";

const POLL_INTERVAL = 60_000; // re-check every 60s; adjust as needed

export default function BudgetAlertWatcher() {
  const { notify } = useAlert();
  const { user } = useAuth();
  const alertedRef = useRef(new Set());

  useEffect(() => {
    if (!user) return; // only run when logged in

    let cancelled = false;

    async function check() {
      try {
        const res = await getBudgets({ page: 1 });
        const budgets = res.data.data || [];

        if (cancelled) return;

        budgets.forEach((budget) => {
          const key = `${budget._id}-${budget.month || ""}`;
          const pct = Number(budget.percentage);
          if (pct >= 80 && !alertedRef.current.has(key)) {
            alertedRef.current.add(key);
            const isExceeded = pct >= 100;

            notify({
              title: isExceeded ? "Budget exceeded!" : "Budget alert: 80% reached",
              message: `You've used ${Math.round(pct)}% of your "${
                budget.categoryId?.name || "category"
              }" budget.`,
              confirmText: "Got it",
              danger: isExceeded,
            });
          }
        });
      } catch (error) {
        // Fail silently — this is a background check, not a page action
        console.error("Budget alert check failed:", error);
      }
    }

    check(); // run once immediately
    const interval = setInterval(check, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [user, notify]);

  return null; 
}