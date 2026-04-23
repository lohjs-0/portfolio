import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Navbar.css'

const LINKS = ['Home', 'Services', 'About', 'Skills', 'Projects', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('Home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'dark' | 'light'>(() =>
    (localStorage.getItem('theme') as 'dark' | 'light') || 'dark'
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting)
            setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1))
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Bloqueia scroll do body quando menu aberto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        className="navbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <a className="nav-logo" onClick={() => scrollTo('Home')}>
          <div className="logo-icon">L</div>
          <div className="logo-text">
            <span className="logo-name">Lohane</span>
            <span className="logo-sub">Developer Full Stack</span>
          </div>
        </a>

        {/* Links — visíveis só em desktop */}
        <ul className="nav-links">
          {LINKS.map(link => (
            <li key={link}>
              <button
                className={`nav-link ${active === link ? 'active' : ''}`}
                onClick={() => scrollTo(link)}
              >
                {link}
                {active === link && (
                  <motion.span className="nav-underline" layoutId="underline" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="theme-btn" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
            <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
            <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
          </button>

          {/* Botão hambúrguer — visível só em mobile */}
          <button
            className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span className="hamburger__line" />
            <span className="hamburger__line" />
            <span className="hamburger__line" />
          </button>
        </div>
      </motion.nav>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu drawer */}
            <motion.div
              className="mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header do drawer */}
              <div className="mobile-menu__header">
                <div className="logo-icon">L</div>
                <button
                  className="mobile-menu__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Fechar menu"
                >
                  ✕
                </button>
              </div>

              {/* Links */}
              <ul className="mobile-menu__links">
                {LINKS.map((link, i) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <button
                      className={`mobile-menu__link ${active === link ? 'active' : ''}`}
                      onClick={() => scrollTo(link)}
                    >
                      <span className="mobile-menu__index">0{i + 1}</span>
                      {link}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Theme toggle no drawer */}
              <div className="mobile-menu__footer">
                <button
                  className="theme-btn"
                  onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                >
                  <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
                  <span>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}