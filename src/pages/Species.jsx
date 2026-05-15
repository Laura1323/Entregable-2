import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CharacterCard from '../components/CharacterCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { listVariants, pageTransition, pageVariants } from '../animations/pageTransitions'
import { useDebounce } from '../hooks/useDebounce'
import { getCharactersBySpeciesPage } from '../services/api'
import '../styles/home.css'

const speciesOptions = ['Human', 'Alien', 'Robot', 'Mythological Creature', 'Animal', 'Humanoid', 'Disease']

function Species() {
  const [selectedSpecies, setSelectedSpecies] = useState('Human')
  const [characters, setCharacters] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const debouncedSearch = useDebounce(search.trim(), 350)

  useEffect(() => {
    const controller = new AbortController()

    const loadCharacters = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getCharactersBySpeciesPage({
          species: selectedSpecies,
          page,
          name: debouncedSearch,
        })

        if (!controller.signal.aborted) {
          setCharacters(data.characters)
          setTotalCharacters(data.info.count)
          setTotalPages(data.info.pages)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setCharacters([])
          setTotalCharacters(0)
          setTotalPages(0)
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCharacters()

    return () => controller.abort()
  }, [selectedSpecies, page, debouncedSearch])

  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }

  const handleSpeciesChange = (species) => {
    setSelectedSpecies(species)
    setPage(1)
  }

  return (
    <motion.section
      className="page page--species"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div className="page__header">
        <p className="page__eyebrow">Filtro avanzado</p>
        <h1>Encuentra personajes por especie</h1>
        <p className="hero__text">
          Combina chips interactivos y busqueda en tiempo real para explorar el catalogo.
        </p>
      </div>

      <div className="filter-panel">
        <div className="filter-panel__top">
          <SearchBar value={search} onChange={handleSearchChange} placeholder="Buscar dentro de la especie..." />
          <label className="select-field" htmlFor="species">
            <span>Especie</span>
            <select id="species" value={selectedSpecies} onChange={(event) => handleSpeciesChange(event.target.value)}>
              {speciesOptions.map((species) => (
                <option key={species} value={species}>
                  {species}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="chips" aria-label="Especies disponibles">
          {speciesOptions.map((species) => (
            <motion.button
              key={species}
              className={`chip ${selectedSpecies === species ? 'active' : ''}`}
              type="button"
              onClick={() => handleSpeciesChange(species)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              {species}
            </motion.button>
          ))}
        </div>
      </div>

      {!loading && !error && (
        <p className="page__count">
          {totalCharacters} personajes encontrados en {selectedSpecies}
        </p>
      )}

      {loading && <Loader />}
      {error && <p className="message message--error">{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p className="message">No hay resultados para esta combinacion.</p>
      )}

      {!loading && !error && characters.length > 0 && (
        <>
          <motion.div className="cards-grid" variants={listVariants} initial="hidden" animate="visible">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </motion.div>

          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}
    </motion.section>
  )
}

export default Species
