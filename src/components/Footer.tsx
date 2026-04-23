import { motion } from 'framer-motion'
import '../styles/Footer.css'

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.1.82-.26.82-.57v-2c-3.34.72-4.04-1.6-4.04-1.6-.54-1.38-1.33-1.75-1.33-1.75-1.08-.74.08-.72.08-.72 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.1-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23A11.5 11.5 0 0 1 12 5.8c1.02.005 2.05.14 3.01.4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.68.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z"/>
  </svg>
)

const GmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.364l-6.545-4.636v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.273l6.545-4.636 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
  </svg>
)

const NAV_LINKS = [
  { label: 'Home',     section: 'home'     },
  { label: 'Services', section: 'services' },
  { label: 'About',    section: 'about'    },
  { label: 'Skills',   section: 'skills'   },
  { label: 'Projects', section: 'projects' },
  { label: 'Contact',  section: 'contact'  },
]

const SOCIALS = [
  { icon: <GitHubIcon />,   href: 'https://github.com/lohjs-0',            label: 'GitHub'   },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com/in/lohane-massao', label: 'LinkedIn' },
  { icon: <GmailIcon />,    href: 'mailto:lohane.mdev@gmail.com',          label: 'Gmail'    },
]

const scrollTo = (section: string) => {
  if (section === 'home') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerInner">

        <div className="footerTop">

          <div className="footerBrand">
            <span className="footerLogo">
              <span className="footerLogoSlash">//</span> Lohane
            </span>
            <p className="footerTagline">
              {'/* Full Stack Developer — between the backend, frontend, and Coca-Cola */'}
            </p>
          </div>

          <nav className="footerNav">
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.label}
                className="footerNavLink"
                onClick={() => scrollTo(link.section)}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="footerSocials">
            <span className="footerSocialsLabel">{'/* redes */'}</span>
            <div className="footerSocialsRow">
              {SOCIALS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="footerSocialBtn"
                  aria-label={s.label}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ duration: 0.15 }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

        </div>

        <div className="footerDivider" />

        <div className="footerBottom">
          <span className="footerCopy">
            © {new Date().getFullYear()} <span className="footerCopyName">Lohane</span>. Todos os direitos reservados.
          </span>
        </div>

      </div>
    </footer>
  )
}