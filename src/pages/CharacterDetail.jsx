import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaArrowLeft,
  FaDna,
  FaGenderless,
  FaGlobeAmericas,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaTv,
} from 'react-icons/fa'
import Loader from '../components/Loader'
import { pageTransition, pageVariants } from '../animations/pageTransitions'
import { useCharacter } from '../hooks/useCharacter'
import '../styles/characterDetail.css'

const statusClass = {
  Alive: 'alive',
  Dead: 'dead',
  unknown: 'unknown',
}

function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { character, loading, error } = useCharacter(id)

  if (loading) return <Loader label="Abriendo ficha del personaje..." />

  if (error) {
    return (
      <motion.section className="page" variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <p className="message message--error">{error}</p>
        <button className="button-link button-link--button" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </motion.section>
    )
  }

  if (!character) return null

  const status = statusClass[character.status] ?? 'unknown'
  const type = character.type || 'Sin tipo especifico'

  return (
    <motion.section
      className="character-detail-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <button className="detail-back" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Volver
      </button>

      <article className="character-detail">
        <motion.div
          className="character-detail__img-wrapper"
          initial={{ opacity: 0, x: -30, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={character.image} alt={character.name} className="character-detail__img" />
          <span className={`status-pill status-pill--${status}`}>
            <span />
            {character.status}
          </span>
        </motion.div>

        <motion.div
          className="character-detail__info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="page__eyebrow">Ficha premium #{character.id}</p>
          <h1>{character.name}</h1>

          <div className="detail-tags">
            <span className={`tag tag--status-${status}`}>
              <FaHeartbeat />
              {character.status}
            </span>
            <span className="tag tag--cyan">
              <FaDna />
              {character.species}
            </span>
            <span className="tag">
              <FaGenderless />
              {character.gender}
            </span>
          </div>

          <div className="detail-type">{type}</div>

          <div className="detail-grid">
            <div className="detail-card">
              <FaGlobeAmericas />
              <span>Origen</span>
              <strong>{character.origin?.name}</strong>
            </div>
            <div className="detail-card">
              <FaMapMarkerAlt />
              <span>Ubicacion actual</span>
              <strong>{character.location?.name}</strong>
            </div>
            <div className="detail-card">
              <FaTv />
              <span>Episodios</span>
              <strong>{character.episode.length}</strong>
            </div>
          </div>
        </motion.div>
      </article>
    </motion.section>
  )
}

export default CharacterDetail
