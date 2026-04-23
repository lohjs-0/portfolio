import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import '../styles/About.css'

const STATS = [
  { number: '1+', label: 'Anos estudando', code: 'years_of_study' },
  { number: '5',  label: 'Projetos reais até agora', code: 'projects_built' },
  { number: '9',  label: 'Stacks',         code: 'tech_stacks'    },
  { number: '∞',  label: 'Coca-Colas',     code: 'coca_colas'     },
]

const TAGS = ['React', 'Node.js', 'TypeScript', 'Python', 'CyberSec', 'Docker', 'Git', 'Linux']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <section id="about" className="about" ref={ref}>
      <span className="about-bg-num">02</span>

      <div className="about-inner">
        <div className="about-grid">

          {/* ── Coluna esquerda: label + título + bio + tags ── */}
          <motion.div
            className="about-left"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="about-label">
              <span className="about-line" />
              <span className="about-label-text">about_me.tsx</span>
            </div>

            <h2 className="about-title">
              Quem está<br />
              <span className="about-title--outline">por trás</span><br />
              do código
            </h2>

            <p className="about-comment">{'/* um pouco sobre mim */'}</p>

            <p className="about-text">
              Sou <strong>Lohane</strong>, tenho 20 anos e sou estudante em formação {' '}
              <span className="about-highlight">Full Stack</span>{' '}
              apaixonada por construir coisas reais, não só tutoriais.
            </p>
            <p className="about-text">
              Também mergulhando fundo em{' '}
              <span className="about-highlight">Cibersegurança</span>,
              porque entender como as coisas quebram é a melhor forma de aprender a construí-las melhor.
            </p>
            <p className="about-text">
              Sem experiência profissional ainda — mas com muita{' '}
              <span className="about-highlight">curiosidade</span>, código e muita Coca-Cola.
            </p>

            <div className="about-tags">
              {TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  className="about-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.3 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Coluna direita: Jake + stats ── */}
          <motion.div
            className="about-right"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="about-img-wrap">
              <motion.img
                src="/jake3.png"
                alt="Jake"
                className="about-jake"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="about-img-badge">
                <span className="about-badge-dot" />
                open to work
              </div>
            </div>

            <div className="about-stats">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.code}
                  className="about-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                >
                  <span className="about-stat-code">{s.code}</span>
                  <span className="about-stat-num">{s.number}</span>
                  <span className="about-stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}