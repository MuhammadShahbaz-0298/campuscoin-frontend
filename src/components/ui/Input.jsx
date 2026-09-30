export default function Input({ label, error, ...props }) {
  return <label className="field">{label}<input aria-invalid={Boolean(error)} {...props} />{error && <small className="field-error">{error}</small>}</label>;
}
