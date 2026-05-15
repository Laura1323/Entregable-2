import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaSatelliteDish } from 'react-icons/fa'
import { pageTransition, pageVariants } from '../animations/pageTransitions'
import '../styles/home.css'

function ErrorPage() {
  return (
    <motion.section
      className="page error-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <motion.div
        className="error-page__icon"
        animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <FaSatelliteDish />
      </motion.div>
      <p className="page__eyebrow">Error 404</p>
      <h1>Esta dimension no existe</h1>
      <p className="hero__text">
        La ruta que intentas abrir no esta disponible en este universo.
      </p>
      <Link className="button-link" to="/">
        Volver al inicio
        <FaArrowRight />
      </Link>
    </motion.section>
  )
}

export default ErrorPage
