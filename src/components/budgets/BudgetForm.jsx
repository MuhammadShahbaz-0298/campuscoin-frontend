import Select from "../ui/Select";
import SpecularButton from "../SpecularButton";

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

// Build "YYYY-MM" manually. toISOString() converts to UTC and can shift the month.
export function getCurrentMonth() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

// Options from 3 months ago to 12 months ahead
function buildMonthOptions() {
  const now = new Date();
  const options = [];
  for (let i = -3; i <= 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    options.push({
      value,
      label: `${MONTH_NAMES[d.getMonth()]}`,
    });
  }
  return options;
}

const monthOptions = buildMonthOptions();

export default function BudgetForm({ form, categories, onChange, onSubmit }) {
  return (
    <form className="inline-form" onSubmit={onSubmit}>
      <Select
        label="Category"
        value={form.categoryId}
        onChange={onChange("categoryId")}
        required
      >
        <option value="">Choose category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </Select>

      <Select
        label="Month"
        value={form.month || getCurrentMonth()}
        onChange={onChange("month")}
        required
      >
        {monthOptions.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </Select>

      <label className="field">
        Monthly limit
        <input
          type="number"
          placeholder="0.00"
          value={form.limitAmount}
          onChange={onChange("limitAmount")}
          min="0"
          required
        />
      </label>
      <SpecularButton
        className="primary"
        type="submit"
        radius={10}
        textColor="#06140f"
        lineColor="#d6fff4"
        baseColor="#46cda7"
      >
        Set budget
      </SpecularButton>
    </form>
  );
}
