import { useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import '../styles/Skills.css'

const BARS = [
  { name: 'HTML / CSS', pct: 92 },
  { name: 'TypeScript',  pct: 85 },
  { name: 'React',       pct: 88 },
  { name: 'C#',          pct: 78 },
  { name: 'Node.js',     pct: 80 },
  { name: 'SQL',         pct: 74 },
]

const ICONS = [
  { name: 'React',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Node.js',    src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'C#',         src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'Python',     src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'MySQL',      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Supabase',   src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg' },
  { name: 'AWS',        src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg' },
]

function SkillBar({ name, pct, index }: { name: string; pct: number; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) controls.start({
      scaleX: 1,
      transition: { duration: 1, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] },
    })
  }, [inView, controls, index])

  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">
          <span className="skill-arrow">▶</span> {name}
        </span>
        <span className="skill-bar-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          style={{ originX: 0, width: `${pct}%` }}
          initial={{ scaleX: 0 }}
          animate={controls}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="skills" className="skills" ref={ref}>
      <span className="skills-bg-num">03</span>

      <div className="skills-inner">
        {/* ── Cabeçalho igual ao About ── */}
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="skills-label">
            <span className="skills-line" />
            <span className="skills-label-text">skills.tsx</span>
          </div>
          <h2 className="skills-title">
            O que eu<br />
            <span className="skills-title--outline">sei usar</span><br />
            de verdade
          </h2>
        </motion.div>

        {/* ── Layout: barras + ícones ── */}
        <div className="skills-layout">

          {/* Barras de progresso */}
          <motion.div
            className="skill-bars"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="skills-comment">{'/* nível de proficiência */'}</p>
            {BARS.map((b, i) => (
              <SkillBar key={b.name} name={b.name} pct={b.pct} index={i} />
            ))}
          </motion.div>

          {/* Ícones */}
          <motion.div
            className="skills-icons-wrap"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p className="skills-comment">{'/* tech stack */'}</p>
            <div className="skills-icons-grid">
              {ICONS.map((icon, i) => (
                <motion.div
                  key={icon.name}
                  className="skill-icon-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.07, duration: 0.4 }}
                  whileHover={{ y: -4, borderColor: 'var(--red-border)' }}
                >
                  <img src={icon.src} alt={icon.name} />
                  <span>{icon.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}