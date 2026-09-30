export default function formatCurrency(value, { fractionDigits = 2 } = {}) {
  const amount = Number(value || 0);
  const formatted = Math.abs(amount).toLocaleString(undefined, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return `${amount < 0 ? "-" : ""}$${formatted}`;
}
