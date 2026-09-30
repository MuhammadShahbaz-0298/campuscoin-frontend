export default function UserManagementTable({ users = [] }) {
  return (
    <div>
      {users.map((user) => (
        <div className="category-row" key={user._id}>
          <span>{user.name}</span>
          <span className="muted">{user.email}</span>
        </div>
      ))}
    </div>
  );
}
