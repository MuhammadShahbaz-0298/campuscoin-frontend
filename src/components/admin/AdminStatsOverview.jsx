export default function AdminStatsOverview({ stats }) {
  return (
    <div className="stats">
      <div className="stat-card">
        <div className="eyebrow">STUDENTS</div>
        <strong>{stats.users}</strong>
        <span>Registered accounts</span>
      </div>
      <div className="stat-card">
        <div className="eyebrow">TRANSACTIONS</div>
        <strong>{stats.transactions}</strong>
        <span>Total logged</span>
      </div>
      <div className="stat-card">
        <div className="eyebrow">CATEGORIES</div>
        <strong>{stats.categories}</strong>
        <span>System and personal</span>
      </div>
    </div>
  );
}
