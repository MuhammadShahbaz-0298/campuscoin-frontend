import SpecularButton from "../SpecularButton";

const VARIANTS = {
  danger: { className: "danger-button", radius: 10, textColor: "#ffffff", lineColor: "#ffffff", baseColor: "#e56054" },
  secondary: { className: "secondary", radius: 10, textColor: "var(--text-primary)", lineColor: "#ffffff", baseColor: "#34363b" },
  ghost: { className: "text-button", radius: 10, textColor: "var(--accent)", lineColor: "#ffffff", baseColor: "#16191b" },
  primary: { className: "primary", radius: 10, textColor: "#06140f", lineColor: "#d6fff4", baseColor: "#46cda7" },
};

export default function Button({ children, variant = "primary", ...props }) {
  const { className, ...fx } = VARIANTS[variant] || VARIANTS.primary;
  return (
    <SpecularButton className={className} size="md" {...fx} {...props}>
      {children ?? null}
    </SpecularButton>
  );
}
