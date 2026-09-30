import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Select from '../components/ui/Select';
import Pagination from '../components/ui/Pagination';
import CategoryList from '../components/categories/CategoryList';
import CategoryFormModal from '../components/categories/CategoryFormModal';
import { createCategory, getCategories } from '../api/categoryApi';
import { useToast } from '../context/ToastContext';
import getErrorMessage from '../utils/getErrorMessage';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const [name, setName] = useState('');
  const [type, setType] = useState('expense');
  const { showToast } = useToast();
  async function load(page = pagination.page) {
    try {
      const response = await getCategories({ page });
      setCategories(response.data.data);
      setPagination(response.data.pagination || { page: 1, pages: 1 });
    } catch (error) {
      showToast(getErrorMessage(error, 'Unable to load categories.'), 'error');
    }
  }
  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function add(event) {
    event.preventDefault();
    try {
      await createCategory({ name: name.trim(), type });
      setName('');
      showToast('Category added.', 'success');
      load(1);
    } catch (error) {
      showToast(getErrorMessage(error, 'Unable to add category.'), 'error');
    }
  }
  return (
    <Card>
      <div className="eyebrow">MANAGE CATEGORIES</div>
      <h2>Defaults plus personal categories</h2>
      <div className="category-add">
        <CategoryFormModal
          name={name}
          onChange={(event) => setName(event.target.value)}
          onSubmit={add}
        />
        <div className="category-type">
          <Select label="Type" value={type} onChange={(event) => setType(event.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </Select>
        </div>
      </div>
      <div className="category-columns">
        <div>
          <h3>Expense categories</h3>
          <CategoryList categories={categories.filter((item) => item.type === 'expense')} />
        </div>
        <div>
          <h3>Income categories</h3>
          <CategoryList categories={categories.filter((item) => item.type === 'income')} />
        </div>
      </div>
      <Pagination
        page={pagination.page}
        pages={pagination.pages}
        total={pagination.total}
        label="categories"
        onPageChange={load}
      />
    </Card>
  );
}
