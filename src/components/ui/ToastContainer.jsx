import Toast from './Toast';

export default function ToastContainer({ toasts, onDismiss }) {
  return <div className="toast-container">{toasts.map((toast) => <Toast key={toast.id} {...toast} onClose={() => onDismiss(toast.id)} />)}</div>;
}
