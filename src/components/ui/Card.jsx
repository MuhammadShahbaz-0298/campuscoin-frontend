export default function Card({ children, className = "" }) {
  return <section className={`panel glass-primary ${className}`.trim()}>{children}</section>;
}
