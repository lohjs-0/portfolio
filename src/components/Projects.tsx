import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Projects.css'

type Category = 'all' | 'web' | 'api'

interface Stack {
  name: string
  icon: string
}

interface Project {
  image: string
  title: string
  desc: string
  stack: Stack[]
  category: Category
  github: string
  demo: string
}

const PROJECTS: Project[] = [
  {
    image: '/velocibot.jpg',
    title: 'VelociBot',
    desc: 'Dev Dinossauro Assistente — chatbot com IA integrada ao Mistral e persistência via Supabase.',
    stack: [
      { name: 'Node.js',  icon: 'devicon-nodejs-plain colored' },
      { name: 'Next.js',  icon: 'devicon-nextjs-plain' },
      { name: 'Mistral',  icon: 'devicon-python-plain colored' },
      { name: 'Supabase', icon: 'devicon-supabase-plain colored' },
    ],
    category: 'web',
    github: 'https://github.com/lohjs-0/velocibot',
    demo: 'https://velocibot.netlify.app/',
  },
  {
    image: '/astroly.png',
    title: 'Astroly',
    desc: 'Landing page interativa inspirada no cosmos, com animações de sistema solar, explorador de planetas e galeria espacial.',
    stack: [
      { name: 'React',      icon: 'devicon-react-original colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
      { name: 'Vite',       icon: 'devicon-vitejs-plain colored' },
      { name: 'Tailwind',   icon: 'devicon-tailwindcss-plain colored' },
    ],
    category: 'web',
    github: 'https://github.com/lohjs-0/astroly',
    demo: 'https://astroly-gules.vercel.app/',
  },
  {
    image: '/biodash.png',
    title: 'BioDash',
    desc: 'Dashboard para monitoramento de tanques biológicos com atualizações em tempo real via SignalR.',
    stack: [
      { name: '.NET',       icon: 'devicon-dot-net-plain colored' },
      { name: 'React',      icon: 'devicon-react-original colored' },
      { name: 'PostgreSQL', icon: 'devicon-postgresql-plain colored' },
      { name: 'TypeScript', icon: 'devicon-typescript-plain colored' },
    ],
    category: 'web',
    github: 'https://github.com/lohjs-0/Biodash',
    demo: '',
  },
  {
    image: '/cerberus.png',
    title: 'Cerberus',
    desc: 'API leve de scanner de vulnerabilidades construída com Node.js para análise de segurança.',
    stack: [
      { name: 'Node.js',       icon: 'devicon-nodejs-plain colored' },
      { name: 'JavaScript', icon: 'devicon-javascript-plain colored' },
      { name: 'Axios', icon: 'devicon-axios-plain colored' },
    ],
    category: 'api',
    github: 'https://github.com/lohjs-0/cerberus-security-scanner',
    demo: '',
  },

  {
    image: '/sudoku.png',
    title: 'Sudoku',
    desc: 'Um jogo divertido e desafiador de Sudoku, com geração procedural de tabuleiros e interface interativa.',
    stack: [
      { name: 'C#',       icon: 'devicon-csharp-plain colored' },
      { name: '.NET SDK', icon: 'devicon-dotnet sdk-plain colored' },
      { name: 'XAML', icon: 'devicon-xaml-plain colored' },
    ],
    category: 'web',
    github: 'https://github.com/lohjs-0/sudoku',
    demo: '',
  },
]

const FILTERS: { label: string; value: Category }[] = [
  { label: 'All',  value: 'all' },
  { label: 'Web',  value: 'web' },
  { label: 'API',  value: 'api' },
]

export default function Projects() {
  const [filter, setFilter] = useState<Category>('all')
  const filtered = PROJECTS.filter(p => filter === 'all' || p.category === filter)

  return (
    <section id="projects" className="projects">
      <span className="projects-bg-num">05</span>

      <div className="projects-inner">
        <div className="projects-header">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="projects-label">
              <span className="projects-line" />
              <span className="projects-label-text">projects.tsx</span>
            </div>

            <h2 className="projects-title">
              Meus<br />
              <span className="projects-title--outline">trabalhos</span><br />
              reais
            </h2>

            <p className="projects-comment">{'/* meus trabalhos */'}</p>
          </motion.div>

          <motion.div
            className="filter-tabs"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`filter-btn ${filter === f.value ? 'active' : ''}`}
                onClick={() => setFilter(f.value)}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence>
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                className="project-card"
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="project-thumb">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="project-thumb-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none'
                    }}
                  />
                  <span className="project-tag">{p.category}</span>
                </div>

                <div className="project-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>

                  <div className="project-stack">
                    {p.stack.map(s => (
                      <span key={s.name} className="stack-pill">
                        {s.icon && <i className={s.icon} />}
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="project-link gh">
                        <GithubIcon /> GitHub
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="project-link demo">
                        ↗ Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  )
}