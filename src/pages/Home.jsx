import { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import { getCharactersPage } from '../services/api'
import '../styles/home.css'

function Home() {
  const [characters, setCharacters] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true)
        const data = await getCharactersPage(page)
        setCharacters(data.characters)
        setTotalCharacters(data.info.count)
        setTotalPages(data.info.pages)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [page])

  return (
    <section className="page">
      <div className="page__header">
        <p className="page__eyebrow">Todos los personajes</p>
        <h1>Personajes de Rick and Morty</h1>
        {!loading && !error && (
          <p className="page__count">{totalCharacters} personajes encontrados</p>
        )}
      </div>

      {loading && <Loader />}
      {error && <p className="message message--error">{error}</p>}

      {!loading && !error && (
        <div>
          <div className="cards-grid">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}
    </section>
  )
}

export default Home
