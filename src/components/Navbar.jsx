import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="navbar__brand" to="/">
        Rick and Morty API
      </NavLink>

      <nav className="navbar__links" aria-label="Menu principal">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Inicio
        </NavLink>
        <NavLink
          to="/species"
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          Filtrar por especie
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
