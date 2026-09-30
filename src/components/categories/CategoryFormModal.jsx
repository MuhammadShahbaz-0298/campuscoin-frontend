import SpecularButton from "../SpecularButton";

export default function CategoryFormModal({ name, onChange, onSubmit }) {
  return <form className="category-create-form" onSubmit={onSubmit}><label className="field">New category<input placeholder="New category name" value={name} onChange={onChange} required /></label><SpecularButton className="primary" type="submit" radius={10} textColor="#06140f" lineColor="#d6fff4" baseColor="#46cda7">Add category</SpecularButton></form>;
}
