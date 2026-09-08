import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, ArrowUpRight, Sparkles, X } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'

interface NavItem {
  number: string
  label: string
  href: string
  tagline: string
}

const navItems: NavItem[] = [
  { number: '01', label: 'Experiência', href: '#experiencia', tagline: 'A virada que muda o estado de espírito' },
  { number: '02', label: 'Boipeba', href: '#ilha', tagline: 'A ilha, as praias e os caminhos de areia' },
  { number: '03', label: 'Programação', href: '#programacao', tagline: '5 noites · Open Bar Premium' },
  { number: '04', label: 'Histórias', href: '#historias', tagline: 'O que fica depois da virada' },
  { number: '05', label: 'Dúvidas', href: '#faq', tagline: 'Local, ingressos e transfer' },
]

const TICKETS_URL = 'https://www.sympla.com.br/evento/a-l-m-a-reveillon-2027-boipeba/3254347?referrer=www.google.com'
const INSTAGRAM_URL = 'https://www.instagram.com/almareveillonboipeba/'

function CloudBackground() {
  return (
    <div className="circular-menu__clouds-wrapper pointer-events-none" aria-hidden="true">
      {/* Camada 1 de Nuvens Lentas */}
      <div className="circular-menu__cloud-layer circular-menu__cloud-layer--1 pointer-events-none">
        <div className="circular-menu__cloud-blob cloud-blob-1" />
        <div className="circular-menu__cloud-blob cloud-blob-2" />
        <div className="circular-menu__cloud-blob cloud-blob-3" />
      </div>

      {/* Camada 2 de Nuvens Médias */}
      <div className="circular-menu__cloud-layer circular-menu__cloud-layer--2 pointer-events-none">
        <div className="circular-menu__cloud-blob cloud-blob-4" />
        <div className="circular-menu__cloud-blob cloud-blob-5" />
      </div>

      {/* Camada 3 de Nuvens Rápidas e Suaves */}
      <div className="circular-menu__cloud-layer circular-menu__cloud-layer--3 pointer-events-none">
        <div className="circular-menu__cloud-blob cloud-blob-6" />
        <div className="circular-menu__cloud-blob cloud-blob-7" />
      </div>

      {/* Gradiente de luz solar suave */}
      <div className="circular-menu__sun-flare pointer-events-none" />
    </div>
  )
}

interface CircularMenuProps {
  ticketsUrl?: string
  instagramUrl?: string
}

export default function CircularMenu({
  ticketsUrl = TICKETS_URL,
  instagramUrl = INSTAGRAM_URL,
}: CircularMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Bloqueia scroll do body quando aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Fecha no ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const target = document.querySelector(href)
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const isMobile = windowWidth <= 780
  const panelWidth = isMobile ? windowWidth : Math.min(windowWidth, 640)
  const openOffset = isMobile
    ? -(windowWidth - 16 - 20 - 44)
    : -(panelWidth - (windowWidth * 0.04) - 48)

  return (
    <>
      {/* Botão Único que Transita e se Transforma no X de Fechar */}
      <div className="circular-menu-trigger-container">
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isOpen}
          className={`circular-menu-btn ${isOpen ? 'circular-menu-btn--active' : ''}`}
          animate={{
            x: isOpen ? openOffset : 0,
            y: isOpen ? (isMobile ? 2 : 12) : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 26,
            mass: 0.7,
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
        >
          <div className="circular-menu-btn__icon-wrapper pointer-events-none">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  <X size={18} className="stroke-[2.2]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="circular-menu-btn__hamburger"
                >
                  <span className="circular-menu-btn__line" />
                  <span className="circular-menu-btn__line circular-menu-btn__line--short" />
                  <span className="circular-menu-btn__line" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {!isOpen && (
              <motion.span
                className="circular-menu-btn__label pointer-events-none"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                MENU
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Overlay Backdrop com Animação de Expansão Circular */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="circular-menu__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Painel do Menu com Fundo Claro e Expansão em Círculo (Radial Reveal) */}
            <motion.aside
              className="circular-menu__panel"
              initial={{
                clipPath: 'circle(0% at calc(100% - 44px) 44px)',
                opacity: 0.9,
              }}
              animate={{
                clipPath: 'circle(160% at calc(100% - 44px) 44px)',
                opacity: 1,
              }}
              exit={{
                clipPath: 'circle(0% at calc(100% - 44px) 44px)',
                opacity: 0.7,
              }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal ALMA Réveillon"
            >
              {/* Efeito de Nuvens em Movimento e Vidro Fosco Claro (ambos com pointer-events-none) */}
              <CloudBackground />
              <div className="circular-menu__glass-tint pointer-events-none" />

              <div className="circular-menu__content">
                {/* Cabeçalho do Menu Lateral com espaço para o botão animado */}
                <div className="circular-menu__header">
                  <div className="circular-menu__badge">
                    <span>ALMA RÉVEILLON 2027 · BOIPEBA</span>
                  </div>
                </div>

                {/* Lista Empilhada de Navegação */}
                <nav className="circular-menu__nav" aria-label="Navegação do site">
                  <ul className="circular-menu__list">
                    {navItems.map((item, index) => {
                      const isHovered = hoveredIndex === index
                      return (
                        <motion.li
                          key={item.href}
                          className="circular-menu__item"
                          initial={{ opacity: 0, x: 30, y: 6 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          transition={{
                            delay: 0.1 + index * 0.04,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <a
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault()
                              handleNavClick(item.href)
                            }}
                            className={`circular-menu__link ${isHovered ? 'circular-menu__link--hovered' : ''}`}
                          >
                            <span className="circular-menu__title">{item.label}</span>
                          </a>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Rodapé do Menu com Modelo de Botão Ticket Idêntico ao Hero */}
                <motion.div
                  className="circular-menu__footer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={ticketsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="ticket circular-menu__ticket-btn justify-center relative text-center"
                  >
                    <span className="ticket-label text-center">VIVER O ALMA</span>
                    <span className="ticket-icon-wrapper absolute right-2">
                      <ArrowRight size={17} />
                    </span>
                  </a>

                  <div className="circular-menu__social-row">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="circular-menu__instagram"
                      aria-label="Instagram Oficial ALMA"
                    >
                      <FaInstagram size={16} />
                      <span>@almareveillonboipeba</span>
                    </a>
                    <span className="circular-menu__date-tag">
                      27 — 31 DEZ 2026
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
