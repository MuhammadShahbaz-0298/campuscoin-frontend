import { useEffect, useState } from 'react';
import { createTransaction, suggestCategory, updateTransaction } from '../../api/transactionApi';
import Select from '../ui/Select';
import { useToast } from '../../context/ToastContext';
import getErrorMessage from '../../utils/getErrorMessage';
import SpecularButton from '../SpecularButton';

const blank = { type: 'expense', amount: '', description: '', categoryId: '', date: new Date().toISOString().slice(0, 10) };

export default function TransactionForm({ categories, onSaved, initialValues, mode = 'create', onCancel }) {
  const [form, setForm] = useState(initialValues || blank);
  const { showToast } = useToast();
  useEffect(() => { setForm(initialValues || blank); }, [initialValues]);
  async function autoSuggest() {
    if (!form.description) return;
    try {
      const response = await suggestCategory(form.description);
      const match = categories.find((item) => item.name.toLowerCase() === response.data.data.category);
      if (match) setForm({ ...form, categoryId: match._id });
    } catch (error) {
      showToast(getErrorMessage(error, 'Unable to suggest a category.'), 'error');
    }
  }
  async function submit(event) {
    event.preventDefault();
    try {
      const payload = { ...form, amount: Number(form.amount) };
      if (mode === 'edit') await updateTransaction(initialValues._id, payload);
      else await createTransaction(payload);
      showToast(mode === 'edit' ? 'Transaction updated.' : 'Transaction saved.', 'success');
      setForm(blank);
      onSaved();
    } catch (error) {
      showToast(getErrorMessage(error, 'Unable to save transaction.'), 'error');
    }
  }
  return <form className="stack-form" onSubmit={submit}><div className="segmented"><SpecularButton type="button" className={form.type === 'expense' ? 'selected' : ''} size="sm" radius={8} textColor="var(--text-muted)" lineColor="#ffffff" baseColor="#22252a" onClick={() => setForm({ ...form, type: 'expense', categoryId: '' })}>Expense</SpecularButton><SpecularButton type="button" className={form.type === 'income' ? 'selected' : ''} size="sm" radius={8} textColor="var(--text-muted)" lineColor="#ffffff" baseColor="#22252a" onClick={() => setForm({ ...form, type: 'income', categoryId: '' })}>Income</SpecularButton></div><label className="field">Amount<input type="number" step="0.01" placeholder="0.00" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} min="0.01" required /></label><label className="field">Description<input placeholder="What was this for?" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} onBlur={autoSuggest} required /></label><Select label="Category" value={form.categoryId} onChange={(event) => setForm({ ...form, categoryId: event.target.value })} required><option value="">Choose category</option>{categories.filter((item) => item.type === form.type).map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}</Select><label className="field">Date<input type="date" value={form.date?.slice(0, 10)} onChange={(event) => setForm({ ...form, date: event.target.value })} /></label><div className="form-actions"><SpecularButton className="primary wide" type="submit" radius={10} textColor="#06140f" lineColor="#d6fff4" baseColor="#46cda7">{mode === 'edit' ? 'Update transaction' : 'Save transaction'}</SpecularButton>{mode === 'edit' && <SpecularButton type="button" className="secondary" radius={10} textColor="var(--text-primary)" lineColor="#ffffff" baseColor="#34363b" onClick={onCancel}>Cancel</SpecularButton>}</div></form>;
}
