import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CharacterCard from '../components/CharacterCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import SearchBar from '../components/SearchBar'
import { listVariants, pageTransition, pageVariants } from '../animations/pageTransitions'
import { useDebounce } from '../hooks/useDebounce'
import { getCharacters, getCharactersPage } from '../services/api'
import '../styles/home.css'

function Home() {
  const [characters, setCharacters] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [featuredCharacters, setFeaturedCharacters] = useState([])
  const [featuredIndex, setFeaturedIndex] = useState(0)
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

  useEffect(() => {
    let active = true

    getCharacters()
      .then((data) => {
        if (active) setFeaturedCharacters(data.characters)
      })
      .catch(() => {
        if (active) setFeaturedCharacters([])
      })

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (featuredCharacters.length <= 1) return undefined

    const interval = setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % featuredCharacters.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [featuredCharacters.length])

  const handleSearchChange = (value) => {
    setSearch(value)
    setPage(1)
  }

  const featuredCharacter = featuredCharacters[featuredIndex]

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
          <AnimatePresence mode="wait">
            {featuredCharacter && (
              <motion.div
                key={featuredCharacter.id}
                className="hero__featured"
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <img src={featuredCharacter.image} alt={featuredCharacter.name} />
                <div>
                  <strong>{featuredCharacter.name}</strong>
                  {/* <small>
                    {featuredCharacter.status} · {featuredCharacter.gender} · {featuredCharacter.species}
                  </small> */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="hero__total">
            <span>{totalCharacters || '...'}</span>
            <small>personajes encontrados</small>
          </div>
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
