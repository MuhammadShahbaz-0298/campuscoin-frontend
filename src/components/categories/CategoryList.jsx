export default function CategoryList({ categories = [] }) {
  return (
    <div>
      {categories.map((category) => (
        <div className="category-row" key={category._id}>
          <span
            className={category.type === "income" ? "dot green" : "dot coral"}
          />
          {category.name}
          <span className="muted">
            {category.isDefault ? "Default" : "Personal"}
          </span>
        </div>
      ))}
    </div>
  );
}
