import '../styles/home.css'

function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null

  const handlePrev = () => onChange(Math.max(1, page - 1))
  const handleNext = () => onChange(Math.min(totalPages, page + 1))

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)

  for (let p = start; p <= end; p += 1) pages.push(p)

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={page === 1}>
        Anterior
      </button>

      {start > 1 && (
        <button onClick={() => onChange(1)} className="page-number">
          1
        </button>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`page-number ${p === page ? 'active' : ''}`}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <button onClick={() => onChange(totalPages)} className="page-number">
          {totalPages}
        </button>
      )}

      <button onClick={handleNext} disabled={page === totalPages}>
        Siguiente
      </button>
    </div>
  )
}

export default Pagination
