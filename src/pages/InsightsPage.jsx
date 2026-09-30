import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Select from "../components/ui/Select";
import Pagination from "../components/ui/Pagination";
import InsightHistoryList from "../components/insights/InsightHistoryList";
import {
  generateInsight,
  getInsights,
  clearAllInsights,
} from "../api/insightApi";
import { useToast } from "../context/ToastContext";
import getErrorMessage from "../utils/getErrorMessage";
import confirmAction from "../utils/confirmAction";
import SpecularButton from "../components/SpecularButton";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function buildMonthOptions() {
  const now = new Date();
  const options = [];
  for (let i = -17; i <= 2; i += 1) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    options.push({ value, label: `${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}` });
  }
  return options;
}

const monthOptions = buildMonthOptions();

export default function InsightsPage() {
  const [insights, setInsights] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const { showToast } = useToast();
  async function load(page = pagination.page) {
    try {
      const response = await getInsights({ page });
      setInsights(response.data.data);
      setPagination(response.data.pagination || { page: 1, pages: 1 });
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to load insights."), "error");
    }
  }
  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function createInsight(event) {
    event.preventDefault();
    try {
      await generateInsight(month);
      showToast(`Insight generated for ${month}.`, "success");
      load(1);
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to generate insight."), "error");
    }
  }

  async function handleClearAll() {
    const confirmed = await confirmAction({
      title: "Delete all insights?",
      text: "This cannot be undone.",
      confirmLabel: "Delete all",
    });

    if (!confirmed) return;

    try {
      await clearAllInsights();

      setInsights([]);
      setPagination({ page: 1, pages: 1 });

      showToast("All insights cleared.", "success");
    } catch (error) {
      showToast(getErrorMessage(error, "Unable to clear insights."), "error");
    }
  }

  return (
    <Card>
      <div className="eyebrow">MONTHLY INSIGHTS</div>
      <h2>Plain-language guidance from your own history</h2>
      <form className="insight-generator" onSubmit={createInsight}>
        <div style={{ marginBottom: "14px" }}>
          <Select label="Choose month" value={month} onChange={(event) => setMonth(event.target.value)}>
            {monthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SpecularButton
            className="primary"
            type="submit"
            radius={10}
            textColor="#06140f"
            lineColor="#d6fff4"
            baseColor="#46cda7"
          >
            Generate insight
          </SpecularButton>
          <SpecularButton
            className="danger-button"
            type="button"
            radius={10}
            textColor="#ffffff"
            lineColor="#ffffff"
            baseColor="#e56054"
            onClick={handleClearAll}
            disabled={!pagination.total}
          >
            Clear All
          </SpecularButton>
        </div>
      </form>
      <InsightHistoryList insights={insights} />
      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        label="insights"
        onPageChange={load}
      />
    </Card>
  );
}
