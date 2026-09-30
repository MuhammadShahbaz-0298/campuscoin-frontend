import AnimatedNumber from "../ui/AnimatedNumber";

export default function StatCard({
  label,
  value,
  detail,
  negative = false,
  numericValue,
  format,
  countDelay = 0,
  className = "",
  style,
}) {
  const animate =
    numericValue !== undefined && numericValue !== null && typeof format === "function";
  return (
    <div className={`stat-card${className ? ` ${className}` : ""}`} style={style}>
      <div className="eyebrow">{label}</div>
      <strong className={negative ? "negative" : ""}>
        {animate ? (
          <AnimatedNumber value={numericValue} format={format} delay={countDelay} />
        ) : (
          value
        )}
      </strong>
      <span>{detail}</span>
    </div>
  );
}
