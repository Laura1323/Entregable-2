import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FaBars, FaHome, FaTimes } from 'react-icons/fa'
import { GiAlienBug } from 'react-icons/gi'
import '../styles/navbar.modern.css'

const navLinks = [
  { to: '/', label: 'Inicio', icon: <FaHome /> },
  { to: '/species', label: 'Especies', icon: <GiAlienBug /> },
]

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <NavLink className="navbar__brand" to="/" onClick={() => setOpen(false)}>
        <span className="navbar__brand-mark">RM</span>
        <span>RickVerse</span>
      </NavLink>

      <nav className="navbar__links navbar__links--desktop" aria-label="Menu principal">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      <button
        className="navbar__menu-btn"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
        aria-expanded={open}
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="navbar__links navbar__links--mobile"
            aria-label="Menu movil"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={() => setOpen(false)}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
