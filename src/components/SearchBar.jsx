import { motion } from 'framer-motion'
import { FaSearch, FaTimes } from 'react-icons/fa'
import '../styles/searchbar.css'

function SearchBar({ value, onChange, placeholder = 'Buscar personaje...' }) {
  return (
    <motion.form
      className="searchbar"
      onSubmit={(event) => event.preventDefault()}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <FaSearch className="searchbar__icon" />
      <input
        className="searchbar__input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {value && (
        <button className="searchbar__clear" type="button" onClick={() => onChange('')} aria-label="Limpiar busqueda">
          <FaTimes />
        </button>
      )}
    </motion.form>
  )
}

export default SearchBar
