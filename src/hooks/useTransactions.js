import { useEffect, useState } from 'react';
import { getTransactions } from '../api/transactionApi';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';

export default function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  useEffect(() => {
    getTransactions().then((response) => setTransactions(response.data.data)).catch((error) => showToast(getErrorMessage(error, 'Unable to load transactions.'), 'error')).finally(() => setLoading(false));
  }, [showToast]);
  return { transactions, loading };
}
