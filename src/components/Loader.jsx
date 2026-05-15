import { motion } from 'framer-motion'
import '../styles/loader.modern.css'

function Loader({ label = 'Cargando personajes...' }) {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
    >
      <span className="loader__portal" />
      <span>{label}</span>
    </motion.div>
  )
}

export default Loader
