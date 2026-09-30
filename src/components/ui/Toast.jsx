import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useState } from 'react';
import SpecularButton from '../SpecularButton';

const icons = { success: CheckCircle2, error: XCircle, info: Info };

export const TOAST_DURATION = 4000;

export default function Toast({ message, type = 'info', onClose, duration = TOAST_DURATION }) {
  const [exiting, setExiting] = useState(false);
  const Icon = icons[type] || Info;
  function requestClose() {
    if (exiting) return;
    setExiting(true);
    window.setTimeout(() => onClose?.(), 170);
  }
  return (
    <div className={`toast toast-${type}${exiting ? ' toast-exit' : ''}`} role="status">
      <Icon size={17} />
      <span>{message}</span>
      <SpecularButton
        className="icon-btn"
        size="sm"
        radius={10}
        textColor="var(--text-muted)"
        lineColor="#ffffff"
        baseColor="#2c2f34"
        onClick={requestClose}
        aria-label="Dismiss notification"
      >
        <X size={15} />
      </SpecularButton>
      <span className="toast-progress" aria-hidden="true">
        <i style={{ animationDuration: `${duration}ms` }} />
      </span>
    </div>
  );
}
