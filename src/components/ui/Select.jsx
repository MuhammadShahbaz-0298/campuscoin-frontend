import { useEffect, useRef, useState } from "react";
import GlideSelect from "./GlideSelect";

function toOptions(children) {
  const options = [];
  const visit = (nodes) => {
    const list = Array.isArray(nodes) ? nodes : [nodes];
    list.forEach((child) => {
      if (child === null || child === undefined || typeof child === "boolean") return;
      if (Array.isArray(child)) {
        visit(child);
        return;
      }
      if (typeof child !== "object") return;
      if (child.type === "option") {
        options.push({
          value: String(child.props.value ?? ""),
          label:
            child.props.label ??
            (typeof child.props.children === "string"
              ? child.props.children
              : String(child.props.value ?? "")),
        });
        return;
      }
      if (child.props && child.props.children) visit(child.props.children);
    });
  };
  visit(children);
  return options;
}

export default function Select({ label, error, children, required, value, onChange, ...props }) {
  const rootRef = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const options = toOptions(children);
  const empty = value === undefined || value === null || String(value) === "";

  useEffect(() => {
    if (!required) return undefined;
    const root = rootRef.current;
    const form = root && root.closest("form");
    if (!form) return undefined;
    const onSubmit = (event) => {
      if (String(value ?? "") !== "") return;
      event.preventDefault();
      event.stopPropagation();
      setBlocked(true);
      const trigger = root.querySelector(".glide-select__trigger");
      if (trigger) trigger.focus({ preventScroll: false });
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, [required, value]);

  const showError = Boolean(error) || (blocked && empty);

  return (
    <label className="field" ref={rootRef}>
      {label}
      <GlideSelect
        options={options}
        value={value}
        onChange={(next) => {
          if (blocked) setBlocked(false);
          if (onChange) onChange({ target: { value: next, name: props.name } });
        }}
        placeholder={label ? `Choose ${String(label).toLowerCase()}` : "Select…"}
        ariaLabel={label || "Select"}
        accentColor="var(--accent)"
        surfaceColor="var(--bg-input)"
        highlightColor="var(--bg-hover)"
        textColor="var(--text-primary)"
        radius={10}
        menuWidth={220}
        className={showError ? "gs-error" : ""}
        disabled={props.disabled}
      />
      {error ? <small className="field-error">{error}</small> : null}
      {showError && !error ? (
        <small className="field-error">{label} is required.</small>
      ) : null}
    </label>
  );
}
