import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Pagination from '../components/ui/Pagination';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import { getCategories } from '../api/categoryApi';
import { getTransactions } from '../api/transactionApi';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';

export default function TransactionsPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [editing, setEditing] = useState(null);
  const { showToast } = useToast();
  async function load(page = pagination.page) { try { const [transactionResponse, categoryResponse] = await Promise.all([getTransactions({ page }), getCategories()]); setItems(transactionResponse.data.data); setPagination(transactionResponse.data.pagination); setCategories(categoryResponse.data.data); } catch (error) { showToast(getErrorMessage(error, 'Unable to load transactions.'), 'error'); } }
  useEffect(() => { load(1); }, []);
  return <><div className="page-head"><p className="muted">A complete history of money in and money out.</p></div><div className="grid-2"><Card><div className="eyebrow">{editing ? 'EDIT TRANSACTION' : 'QUICK ENTRY'}</div><h2>{editing ? 'Update transaction' : 'Log a transaction'}</h2><TransactionForm categories={categories} initialValues={editing} mode={editing ? 'edit' : 'create'} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(1); }} /></Card><Card><div className="panel-head"><div><div className="eyebrow">FULL HISTORY</div><h2>Transactions</h2></div><Badge>{pagination.total || items.length} records</Badge></div><TransactionList items={items} onChanged={() => load(pagination.page)} onEdit={setEditing} /><Pagination page={pagination.page} pages={pagination.pages} total={pagination.total} label="records" onPageChange={load} /></Card></div></>;
}
