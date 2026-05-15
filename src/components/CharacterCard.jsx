import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FaGenderless,
  FaMars,
  FaQuestion,
  FaVenus,
} from 'react-icons/fa'
import { GiDna2 } from 'react-icons/gi'
import { cardVariants } from '../animations/pageTransitions'
import '../styles/cards.modern.css'

const statusClass = {
  Alive: 'alive',
  Dead: 'dead',
  unknown: 'unknown',
}

function GenderIcon({ gender }) {
  if (gender === 'Male') return <FaMars title="Masculino" />
  if (gender === 'Female') return <FaVenus title="Femenino" />
  if (gender === 'Genderless') return <FaGenderless title="Sin genero" />
  return <FaQuestion title="Desconocido" />
}

function CharacterCard({ character }) {
  const navigate = useNavigate()
  const status = statusClass[character.status] ?? 'unknown'

  const openDetail = () => navigate(`/character/${character.id}`)

  return (
    <motion.article
      className="character-card"
      variants={cardVariants}
      whileHover={{ y: -8, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      onClick={openDetail}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') openDetail()
      }}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalle de ${character.name}`}
    >
      <div className="character-card__media">
        <img className="character-card__img" src={character.image} alt={character.name} />
        <div className="character-card__overlay" />
        <span className={`status-pill status-pill--${status}`}>
          <span />
          {character.status}
        </span>
      </div>

      <div className="character-card__body">
        <div>
          <h2 className="character-card__name">{character.name}</h2>
          <div className="character-card__tags">
            <span className="tag tag--cyan">
              <GiDna2 />
              {character.species}
            </span>
            <span className="tag">
              <GenderIcon gender={character.gender} />
              {character.gender}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default CharacterCard
