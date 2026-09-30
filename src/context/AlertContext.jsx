import { createContext, useCallback, useContext, useState } from "react";
import { AlertTriangle } from "lucide-react";
import SpecularButton from "../components/SpecularButton";

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [state, setState] = useState(null); // { title, message, confirmText, cancelText, danger, resolve }

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        title: options.title || "Are you sure?",
        message: options.message || "",
        confirmText: options.confirmText || "Confirm",
        cancelText: options.cancelText || "Cancel",
        danger: options.danger ?? true,
        showCancel: options.showCancel ?? true,
        resolve,
      });
    });
  }, []);

  // For non-blocking info/warning popups (like the budget 80% alert)
  const notify = useCallback((options) => {
    return confirm({ ...options, showCancel: false, confirmText: options.confirmText || "Got it" });
  }, [confirm]);

  function handleClose(result) {
    state?.resolve(result);
    setState(null);
  }

  return (
    <AlertContext.Provider value={{ confirm, notify }}>
      {children}
      {state && (
        <div className="alert-overlay" role="presentation" onClick={() => handleClose(false)}>
          <div
            className="alert-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="alert-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`alert-icon ${state.danger ? "alert-icon-danger" : "alert-icon-warning"}`}>
              <AlertTriangle size={28} strokeWidth={2} />
            </div>
            <h3 id="alert-title" className="alert-title">{state.title}</h3>
            {state.message && <p className="alert-message">{state.message}</p>}
            <div className="alert-actions">
              {state.showCancel && (
                <SpecularButton
                  type="button"
                  className="alert-btn alert-btn-cancel"
                  size="md"
                  radius={10}
                  textColor="var(--text, #e5e7eb)"
                  lineColor="#ffffff"
                  baseColor="#14161a"
                  onClick={() => handleClose(false)}
                >
                  {state.cancelText}
                </SpecularButton>
              )}
              <SpecularButton
                type="button"
                className={`alert-btn ${state.danger ? "alert-btn-danger" : "alert-btn-primary"}`}
                size="md"
                radius={10}
                textColor="#ffffff"
                lineColor={state.danger ? "#ffffff" : "#d6fff4"}
                baseColor={state.danger ? "#ef4444" : "#22d3a6"}
                onClick={() => handleClose(true)}
              >
                {state.confirmText}
              </SpecularButton>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error("useAlert must be used within AlertProvider");
  return ctx;
}