import { Pencil, Trash2 } from 'lucide-react';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';
import { deleteTransaction } from '../../api/transactionApi';
import AnimatedNumber from '../ui/AnimatedNumber';
import stagger from '../../animation/stagger';
import confirmAction from '../../utils/confirmAction';
import { useToast } from '../../context/ToastContext';
import getErrorMessage from '../../utils/getErrorMessage';
import SpecularButton from '../SpecularButton';

export default function TransactionList({ items, onChanged, onEdit }) {
  const { showToast } = useToast();
  async function remove(item) {
    const confirmed = await confirmAction({
      title: 'Delete transaction?',
      text: 'This action cannot be undone.',
      confirmLabel: 'Delete',
    });
    if (!confirmed) return;
    try {
      await deleteTransaction(item._id);
      showToast('Transaction deleted.', 'success');
      onChanged();
    } catch (error) {
      showToast(getErrorMessage(error, 'Unable to delete transaction.'), 'error');
    }
  }
  return (
    <div>
      {items.map((item, index) => (
        <div
          className="activity enter-row"
          key={item._id}
          style={{ '--enter-delay': `${stagger(index, { step: 55 })}ms` }}
        >
          <span className={item.type === 'income' ? 'activity-icon income' : 'activity-icon expense'}>
            {item.type === 'income' ? '+' : '−'}
          </span>
          <div>
            <strong>{item.description || item.categoryId?.name}</strong>
            <small>
              {item.categoryId?.name} · {formatDate(item.date)}
            </small>
          </div>
          <b className={item.type === 'income' ? 'income-text' : 'expense-text'}>
            {item.type === 'income' ? '+' : '−'}
            <AnimatedNumber
              value={item.amount}
              format={formatCurrency}
              delay={stagger(index, { base: 150, step: 55 })}
            />
          </b>
          <SpecularButton
            className="icon-btn"
            size="sm"
            radius={10}
            textColor="var(--text-muted)"
            lineColor="#ffffff"
            baseColor="#2c2f34"
            onClick={() => onEdit(item)}
            aria-label="Edit transaction"
          >
            <Pencil size={14} />
          </SpecularButton>
          <SpecularButton
            className="icon-btn danger"
            size="sm"
            radius={10}
            textColor="var(--danger, #e56054)"
            lineColor="#ffffff"
            baseColor="#2c2f34"
            onClick={() => remove(item)}
            aria-label="Delete transaction"
          >
            <Trash2 size={14} />
          </SpecularButton>
        </div>
      ))}
    </div>
  );
}
