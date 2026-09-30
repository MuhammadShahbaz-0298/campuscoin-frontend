import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from '../components/ui/ToastContainer';
import { TOAST_DURATION } from '../components/ui/Toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const dismiss = useCallback((id) => setToasts((items) => items.filter((item) => item.id !== id)), []);
  const showToast = useCallback((message, type = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((items) => [...items, { id, message, type, duration: TOAST_DURATION }]);
    window.setTimeout(() => dismiss(id), TOAST_DURATION);
  }, [dismiss]);
  const value = useMemo(() => ({ showToast, dismiss }), [showToast, dismiss]);
  return <ToastContext.Provider value={value}>{children}<ToastContainer toasts={toasts} onDismiss={dismiss} /></ToastContext.Provider>;
}

export function useToast() {
  return useContext(ToastContext);
}
