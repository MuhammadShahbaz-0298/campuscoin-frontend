import { Link } from "react-router-dom";

export default function NavItem({ to, icon: Icon, children, active }) {
  return (
    <Link className={active ? "nav-item active" : "nav-item"} to={to}>
      <Icon size={17} />
      <span>{children}</span>
    </Link>
  );
}
