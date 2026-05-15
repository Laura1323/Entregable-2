import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CharacterCard from '../components/CharacterCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { listVariants, pageTransition, pageVariants } from '../animations/pageTransitions'
import { useDebounce } from '../hooks/useDebounce'
import { getCharactersPage } from '../services/api'
import '../styles/home.css'

function Home() {
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
      try {
        setLoading(true)
        setError('')
        const data = await getCharactersPage({ page, name: debouncedSearch })

        if (!controller.signal.aborted) {
          setCharacters(data.characters)
          setTotalCharacters(data.info.count)
          setTotalPages(data.info.pages)
        }
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadCharacters()

    return () => controller.abort()
  }, [page, debouncedSearch])

  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }

  return (
    <motion.section
      className="page page--home"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      <div className="hero">
        <div className="hero__content">
          <p className="page__eyebrow">Streaming interdimensional</p>
          <h1>Explora el multiverso Rick and Morty</h1>
          <p className="hero__text">
            Personajes, estados, mundos y episodios en una interfaz moderna, rapida y lista para navegar.
          </p>
        </div>
        <div className="hero__stats" aria-label="Resumen de personajes">
          <span>{totalCharacters || '...'}</span>
          <small>personajes encontrados</small>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={handleSearchChange} placeholder="Buscar por nombre..." />
        {!loading && !error && (
          <p className="page__count">
            Pagina {totalPages ? page : 0} de {totalPages}
          </p>
        )}
      </div>

      {loading && <Loader />}
      {error && <p className="message message--error">{error}</p>}

      {!loading && !error && characters.length === 0 && (
        <p className="message">No encontramos personajes con esa busqueda.</p>
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

export default Home
