import { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';
import SpecularButton from '../components/SpecularButton';

const ACADEMIC_YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Postgraduate'];

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState(user);
  const { showToast } = useToast();
  const academicYear = form.academicYear || '';
  const yearOptions = academicYear && !ACADEMIC_YEARS.includes(academicYear)
    ? [academicYear, ...ACADEMIC_YEARS]
    : ACADEMIC_YEARS;
  async function submit(event) { event.preventDefault(); try { const response = await axiosInstance.put('/users/me', form); updateUser(response.data.data); showToast('Profile updated.', 'success'); } catch (error) { showToast(getErrorMessage(error, 'Unable to update profile.'), 'error'); } }
  return <Card><div className="eyebrow">YOUR ACCOUNT</div><h2>Profile and savings goal</h2><form className="profile-form" onSubmit={submit}><Input label="Full name" value={form.name || ''} onChange={(event) => setForm({ ...form, name: event.target.value })} /><label className="field">Email<input value={form.email || ''} disabled /></label><Select label="Academic year" value={academicYear} onChange={(event) => setForm({ ...form, academicYear: event.target.value })}>{yearOptions.map((year) => <option key={year} value={year}>{year}</option>)}</Select><label className="field">Monthly allowance<input type="number" value={form.monthlyAllowanceBaseline || 0} onChange={(event) => setForm({ ...form, monthlyAllowanceBaseline: event.target.value })} /></label><label className="field">Savings goal<input type="number" value={form.savingsGoal || 0} onChange={(event) => setForm({ ...form, savingsGoal: event.target.value })} /></label><SpecularButton className="primary" type="submit" radius={10} textColor="#06140f" lineColor="#d6fff4" baseColor="#46cda7">Save profile</SpecularButton></form></Card>;
}
