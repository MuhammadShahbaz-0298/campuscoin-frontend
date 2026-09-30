import SpecularButton from '../SpecularButton';

export default function Pagination({
  page = 1,
  pages = 1,
  total,
  label = "records",
  onPageChange,
}) {
  const lastPage = Math.max(pages || 1, 1);
  const summary = total ? `${total} ${label}` : null;

  if (lastPage <= 1) {
    if (!summary) return null;
    return (
      <div className="pagination">
        <span>All {summary}</span>
      </div>
    );
  }

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <SpecularButton
        className="secondary"
        size="sm"
        radius={10}
        textColor="var(--text-primary)"
        lineColor="#ffffff"
        baseColor="#34363b"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </SpecularButton>
      <span>
        Page {page} of {lastPage}
        {summary ? ` · ${summary}` : ""}
      </span>
      <SpecularButton
        className="secondary"
        size="sm"
        radius={10}
        textColor="var(--text-primary)"
        lineColor="#ffffff"
        baseColor="#34363b"
        disabled={page >= lastPage}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </SpecularButton>
    </div>
  );
}
