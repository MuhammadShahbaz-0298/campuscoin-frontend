import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import AdminStatsOverview from '../components/admin/AdminStatsOverview';
import UserManagementTable from '../components/admin/UserManagementTable';
import axiosInstance from '../api/axiosInstance';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const { showToast } = useToast();
  useEffect(() => { Promise.all([axiosInstance.get('/admin/stats'), axiosInstance.get('/admin/users')]).then(([statsResponse, usersResponse]) => { setStats(statsResponse.data.data); setUsers(usersResponse.data.data); }).catch((error) => showToast(getErrorMessage(error, 'Unable to load admin data.'), 'error')); }, [showToast]);
  return <Card><div className="eyebrow">ADMIN CONTROL PANEL</div><h2 style={{margin:"10px 0px"}}>System-wide visibility</h2>{stats && <AdminStatsOverview stats={stats} />}<h3>Student accounts</h3><UserManagementTable users={users} /></Card>;
}
