import { motion } from 'framer-motion'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import '../styles/home.css'

function Pagination({ page, totalPages, onChange }) {
  if (!totalPages || totalPages <= 1) return null

  const changePage = (nextPage) => {
    onChange(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)

  for (let current = start; current <= end; current += 1) pages.push(current)

  return (
    <motion.nav
      className="pagination"
      aria-label="Paginacion"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <button onClick={() => changePage(Math.max(1, page - 1))} disabled={page === 1}>
        <FaChevronLeft />
        Anterior
      </button>

      {start > 1 && (
        <button onClick={() => changePage(1)} className="page-number">
          1
        </button>
      )}

      {start > 2 && <span className="pagination__dots">...</span>}

      {pages.map((current) => (
        <button
          key={current}
          onClick={() => changePage(current)}
          className={`page-number ${current === page ? 'active' : ''}`}
          aria-current={current === page ? 'page' : undefined}
        >
          {current}
        </button>
      ))}

      {end < totalPages - 1 && <span className="pagination__dots">...</span>}

      {end < totalPages && (
        <button onClick={() => changePage(totalPages)} className="page-number">
          {totalPages}
        </button>
      )}

      <button onClick={() => changePage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
        Siguiente
        <FaChevronRight />
      </button>
    </motion.nav>
  )
}

export default Pagination
