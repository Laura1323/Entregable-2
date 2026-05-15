import { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import { getCharactersBySpeciesPage } from '../services/api'
import '../styles/home.css'

const speciesOptions = ['Human', 'Alien', 'Robot', 'Mythological Creature']

function Species() {
  const [selectedSpecies, setSelectedSpecies] = useState('Human')
  const [characters, setCharacters] = useState([])
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadCharacters = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getCharactersBySpeciesPage(selectedSpecies, page)
        setCharacters(data.characters)
        setTotalCharacters(data.info.count)
        setTotalPages(data.info.pages)
      } catch (err) {
        setCharacters([])
        setTotalCharacters(0)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCharacters()
  }, [selectedSpecies, page])

  const handleSpeciesChange = (event) => {
    setSelectedSpecies(event.target.value)
    setPage(1)
  }

  return (
    <section className="page">
      <div className="page__header">
        <p className="page__eyebrow">Filtro por especie</p>
        <h1>Busca personajes por especie</h1>
        {!loading && !error && (
          <p className="page__count">
            {totalCharacters} personajes encontrados en {selectedSpecies}
          </p>
        )}
      </div>

      <div className="filter">
        <label htmlFor="species">Especie</label>
        <select id="species" value={selectedSpecies} onChange={handleSpeciesChange}>
          {speciesOptions.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>
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

export default Species
