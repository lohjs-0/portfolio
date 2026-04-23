import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import '../styles/Hero.css'

const PARTICLES = [
  { id: 1,  x: '10%',  y: '20%', size: 3,   delay: 0   },
  { id: 2,  x: '85%',  y: '15%', size: 4,   delay: 0.5 },
  { id: 3,  x: '70%',  y: '72%', size: 2.5, delay: 1   },
  { id: 4,  x: '25%',  y: '75%', size: 3.5, delay: 1.5 },
  { id: 5,  x: '55%',  y: '30%', size: 2,   delay: 0.8 },
  { id: 6,  x: '40%',  y: '85%', size: 3,   delay: 2   },
  { id: 7,  x: '90%',  y: '50%', size: 2.5, delay: 0.3 },
  { id: 8,  x: '15%',  y: '55%', size: 4,   delay: 1.2 },
  { id: 9,  x: '60%',  y: '10%', size: 2,   delay: 0.7 },
  { id: 10, x: '5%',   y: '90%', size: 3,   delay: 1.8 },
]

const PHRASES = [
  'Full Stack Developer in progress',
  'Cybersecurity Explorer',
  'Coca-Cola Enjoyer',
  'Bug Creator & Fixer',
  'Always Learning',
]

const TYPING_SPEED   = 60
const DELETING_SPEED = 35
const PAUSE_AFTER    = 1800

function useTypewriter(phrases: string[]) {
  const [displayed, setDisplayed] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting]   = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    if (!deleting && displayed === current) {
      const t = setTimeout(() => setDeleting(true), PAUSE_AFTER)
      return () => clearTimeout(t)
    }
    if (deleting && displayed === '') {
      const t = setTimeout(() => {
        setDeleting(false)
        setPhraseIdx(i => (i + 1) % phrases.length)
      }, 0)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed(prev =>
        deleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      )
    }, deleting ? DELETING_SPEED : TYPING_SPEED)
    return () => clearTimeout(t)
  }, [displayed, deleting, phraseIdx, phrases])

  return displayed
}

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/lohjs-0' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/lohane-massao' },
  { label: 'Email', href: 'mailto:lohane.mdev@gmail.com' },
]

export default function Hero() {
  const typed = useTypewriter(PHRASES)

  return (
    <section id="home" className="hero">
      <div className="hero-bg" />
      <div className="hero-grid" />

      <motion.div
        className="hero-glow"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="hero-particle"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3 + p.delay, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
        />
      ))}

      <div className="hero-content">

        {/* ── Linha 1: nome à esquerda + botão projetos à direita ── */}
        <motion.div
          className="hero-row hero-row--top"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-name-block">
            <p className="hero-eyebrow">Disponível</p>
            <h1 className="hero-title">
              Developer<br />
              <span className="hero-title--outline">Full Stack</span>
            </h1>
          </div>

          <div className="hero-top-right">
            <a
              href="#projects"
              className="hero-projects-btn"
              onClick={e => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Projetos <span className="hero-arrow">→</span>
            </a>
            <motion.img
              src="/jake.png"
              alt="Jake"
              className="hero-img"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* ── Linha 2: desc à esquerda + typewriter à direita ── */}
        <motion.div
          className="hero-row hero-row--mid"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
        >
          <p className="hero-desc">
            Meu objetivo é construir interfaces e sistemas com código limpo,
            e muita curiosidade com o mundo do cyber. 
          </p>

          <p className="hero-role">
            // {typed}<span className="hero-cursor">|</span>
          </p>
        </motion.div>

        {/* ── Linha 3: redes sociais ── */}
        <motion.div
          className="hero-row hero-row--socials"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
        >
          {SOCIALS.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hero-social">
              ⬡ {s.label}
            </a>
          ))}
        </motion.div>

      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  )
}