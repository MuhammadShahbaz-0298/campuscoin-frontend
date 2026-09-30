import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./swalTheme.css";

function isLight() {
  const theme =
    document.body?.dataset?.theme || document.documentElement?.dataset?.theme || "dark";
  return theme === "light";
}

export default function confirmAction({
  title,
  text,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  danger = true,
}) {
  const light = isLight();
  return Swal.fire({
    title,
    text,
    icon: danger ? "warning" : "question",
    showCancelButton: true,
    confirmButtonText: confirmLabel,
    cancelButtonText: cancelLabel,
    buttonsStyling: false,
    reverseButtons: true,
    focusConfirm: false,
    customClass: {
      container: "cc-swal-container",
      popup: "cc-swal",
      title: "cc-swal-title",
      htmlContainer: "cc-swal-text",
      confirmButton: `cc-swal-btn ${danger ? "cc-swal-danger" : "cc-swal-primary"}`,
      cancelButton: "cc-swal-btn cc-swal-cancel",
      icon: "cc-swal-icon",
      actions: "cc-swal-actions",
    },
    background: light ? "#ffffff" : "#17181b",
    color: light ? "#16161a" : "#f2f2f3",
  }).then((result) => Boolean(result.isConfirmed));
}
