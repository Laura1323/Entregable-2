import '../styles/cards.css'

function CharacterCard({ character }) {
  return (
    <article className="character-card">
      <img src={character.image} alt={character.name} />
      <div className="character-card__body">
        <h3>{character.name}</h3>
        <p>
          <span>Especie:</span> {character.species}
        </p>
        <p>
          <span>Estado:</span> {character.status}
        </p>
        <p>
          <span>Genero:</span> {character.gender}
        </p>
      </div>
    </article>
  )
}

export default CharacterCard
