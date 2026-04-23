import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import emailjs from '@emailjs/browser'
import '../styles/Contact.css'

const EJS_SERVICE = 'service_i1ro1a7'
const EJS_TEMPLATE = 'template_b5zpz35'
const EJS_PUBLIC = 'xC8lN6fiE_DQcEkC5'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL: FormData = { name: '', email: '', subject: '', message: '' }

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c0392b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <path d="M2 12h20" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#c0392b">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.05.14 3.01.4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#c0392b">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 .77 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 23.21 0 22.23 0z" />
  </svg>
)

const GmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#c0392b">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.364l-6.545-4.636v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.273l6.545-4.636 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
)

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)

const SpinnerIcon = () => (
  <motion.svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </motion.svg>
)

const INFO = [
  { icon: <EmailIcon />, label: 'email', value: 'lohane.mdev@gmail.com' },
  { icon: <LocationIcon />, label: 'localização', value: 'São Paulo, Brasil' },
  { icon: <BriefcaseIcon />, label: 'disponível', value: 'Freelance & CLT' },
]

const SOCIALS = [
  { icon: <GitHubIcon />, name: 'GitHub', href: 'https://github.com/lohjs-0' },
  { icon: <LinkedInIcon />, name: 'LinkedIn', href: 'https://linkedin.com/in/lohane-massao' },
  { icon: <GmailIcon />,   name: 'Gmail', href: 'mailto:lohane.mdev@gmail.com' },
]

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: 'easeOut' } }
}

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL)
  const [sent, setSent] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null)
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError('Preencha nome, email e mensagem.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject || '(sem assunto)',
        message: form.message,
      }, EJS_PUBLIC)
      setSent(true)
      setForm(INITIAL)
    } catch (err) {
      console.error('EmailJS error:', err)
      setError('Ops! Algo deu errado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" id="contact">
      <span className="contact-bg-num">06</span>

      <div className="contactInner">

        {/* ESQUERDA */}
        <motion.div
          className="contactLeft"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeLeft}
        >
          <div className="contactHeader">
            <div className="contact-label">
              <span className="contact-label-line" />
              <span className="contact-label-text">contact.tsx</span>
            </div>

            <h2 className="contact-title">
              Vamos<br />
              <span className="contact-title--outline">trabalhar</span><br />
              juntos?
            </h2>

            <p className="contact-comment">{'/* fale comigo */'}</p>

            <p className="contactDesc">
              Tem um projeto em mente ou quer bater um papo sobre tecnologia?
              Me manda uma mensagem, responderei o mais breve possível.
            </p>
          </div>

          <motion.div
            className="contactInfoList"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {INFO.map((item) => (
              <motion.div
                key={item.label}
                className="contactInfoItem"
                variants={itemVariant}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="contactInfoIcon">{item.icon}</div>
                <div className="contactInfoText">
                  <span className="contactInfoLabel">{item.label}</span>
                  <span className="contactInfoValue">{item.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="contactSocials"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="socialCard"
                variants={itemVariant}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                {s.icon}
                <span>{s.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* FORMULÁRIO */}
        <motion.div
          className="contactForm"
          ref={formRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeRight}
        >
          <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            <motion.div className="formRow" variants={itemVariant}>
              <div className="formGroup">
                <label><span>const </span>name</label>
                <motion.input className="formInput" name="name" placeholder="Seu nome"
                  value={form.name} onChange={handleChange}
                  whileFocus={{ borderColor: 'rgba(192,57,43,0.6)', scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="formGroup">
                <label><span>const </span>email</label>
                <motion.input className="formInput" name="email" type="email" placeholder="seu@email.com"
                  value={form.email} onChange={handleChange}
                  whileFocus={{ borderColor: 'rgba(192,57,43,0.6)', scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </motion.div>

            <motion.div className="formGroup" variants={itemVariant}>
              <label><span>const </span>subject</label>
              <motion.input className="formInput" name="subject" placeholder="Assunto"
                value={form.subject} onChange={handleChange}
                whileFocus={{ borderColor: 'rgba(192,57,43,0.6)', scale: 1.01 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            <motion.div className="formGroup" variants={itemVariant}>
              <label><span>const </span>message</label>
              <motion.textarea className="formTextarea" name="message" placeholder="Sua mensagem..."
                value={form.message} onChange={handleChange}
                whileFocus={{ borderColor: 'rgba(192,57,43,0.6)' }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>

            {error && (
              <motion.p className="formError"
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                ⚠️ &nbsp;{error}
              </motion.p>
            )}

            <motion.div variants={itemVariant}>
              {sent ? (
                <motion.div className="formSuccess"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  ✅ &nbsp; Mensagem enviada com sucesso!
                </motion.div>
              ) : (
                <motion.button className="btnSend" onClick={handleSubmit} disabled={loading}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading
                    ? <motion.span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}
                      ><SpinnerIcon /> Enviando...</motion.span>
                    : <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <RocketIcon /> Enviar mensagem
                      </span>
                  }
                </motion.button>
              )}
            </motion.div>

          </motion.div>
        </motion.div>

      </div>

      {/* JAKE */}
      <div className="jakeFooterBar">
        <motion.img
          src="/jake2.png"
          alt="Jake dormindo"
          className="jakeImg"
          style={{ transformOrigin: 'bottom center' }}
          animate={{
            scaleY: [1, 1.05, 1, 1.03, 1],
            scaleX: [1, 0.96, 1, 0.97, 1],
            y: [0, -2, 0, -1, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

    </section>
  )
}