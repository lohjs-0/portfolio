import { motion } from 'framer-motion'
import { Monitor, Server, Database, ShieldCheck } from 'lucide-react'
import '../styles/Services.css'

const SERVICES = [
  {
    Icon: Monitor,
    title: 'UI / Front-end',
    desc: 'Interfaces modernas, responsivas e acessíveis com React, TypeScript e atenção aos detalhes visuais.',
  },
  {
    Icon: Server,
    title: 'Back-end & APIs',
    desc: 'Construção de APIs RESTful robustas com Node.js, .NET e integração com bancos de dados relacionais.',
  },
  {
    Icon: Database,
    title: 'Banco de Dados',
    desc: 'Modelagem e gerenciamento de dados com PostgreSQL, MySQL e Supabase para aplicações escaláveis.',
  },
  {
    Icon: ShieldCheck,
    title: 'Cibersegurança',
    desc: 'Explorando e aprendendo sobre segurança em aplicações web, boas práticas e hardening de sistemas.',
  },
]

export default function Services() {
  return (
    <section id="services" className="services">
      <span className="services-bg-num">03</span>

      <div className="services-inner">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="services-label">
            <span className="services-line" />
            <span className="services-label-text">services.tsx</span>
          </div>

          <h2 className="services-title">
            O que eu<br />
            <span className="services-title--outline">faço por</span><br />
            você
          </h2>

          <p className="services-comment">{'/* serviços que ofereço */'}</p>
        </motion.div>

        <div className="services-grid">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="service-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
            >
              <div className="service-icon">
                <s.Icon size={20} strokeWidth={1.5} color="var(--red)" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}