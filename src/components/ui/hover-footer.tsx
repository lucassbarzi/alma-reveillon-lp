import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { FaInstagram } from 'react-icons/fa6'
import { ArrowUpRight, Calendar, MapPin, Sparkles } from 'lucide-react'

const TICKETS = 'https://www.sympla.com.br/evento/a-l-m-a-reveillon-2027-boipeba/3254347?referrer=www.google.com'
const INSTAGRAM = 'https://www.instagram.com/almareveillonboipeba/'

export const TextHoverEffect = ({
  text,
  duration,
  className,
  containerRef,
}: {
  text: string
  duration?: number
  className?: string
  containerRef?: React.RefObject<HTMLElement | null>
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    const target = containerRef?.current || svgRef.current
    if (!target) return

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent
      setHovered(true)
      const rect = target.getBoundingClientRect()
      const cx = ((mouseEvent.clientX - rect.left) / rect.width) * 100
      const cy = ((mouseEvent.clientY - rect.top) / rect.height) * 100
      setMaskPosition({
        cx: `${cx}%`,
        cy: `${cy}%`,
      })
    }

    const handleMouseEnter = () => setHovered(true)
    const handleMouseLeave = () => setHovered(false)

    target.addEventListener('mousemove', handleMouseMove)
    target.addEventListener('mouseenter', handleMouseEnter)
    target.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      target.removeEventListener('mousemove', handleMouseMove)
      target.removeEventListener('mouseenter', handleMouseEnter)
      target.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [containerRef])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 480"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none uppercase pointer-events-none ${className || ''}`}
    >
      <defs>
        <linearGradient
          id="almaTextGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#57d2f4" />
          <stop offset="25%" stopColor="#2b829d" />
          <stop offset="50%" stopColor="#80eeb4" />
          <stop offset="75%" stopColor="#57d2f4" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>

        <motion.radialGradient
          id="almaRevealMask"
          gradientUnits="userSpaceOnUse"
          r="30%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0.08, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="60%" stopColor="white" stopOpacity="0.85" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </motion.radialGradient>
        <mask id="almaTextMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#almaRevealMask)"
          />
        </mask>
      </defs>

      {/* Base Outline & Soft Glow */}
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.2"
        className="fill-transparent stroke-white/15 font-[Tusker,Impact,sans-serif] font-bold"
        style={{ fontSize: '460px', letterSpacing: '0.04em', opacity: 0.4 }}
      >
        {text}
      </text>

      {/* Ambient Neon Accent Stroke */}
      <motion.text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="1.4"
        className="fill-transparent stroke-[#57d2f4]/35 font-[Tusker,Impact,sans-serif] font-bold"
        style={{ fontSize: '460px', letterSpacing: '0.04em' }}
        initial={{ strokeDashoffset: 4000, strokeDasharray: 4000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 4000,
        }}
        transition={{
          duration: 3.5,
          ease: 'easeInOut',
        }}
      >
        {text}
      </motion.text>

      {/* Interactive Cursor-Revealed Radiant Gradient Text */}
      <text
        x="50%"
        y="54%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#almaTextGradient)"
        strokeWidth="2"
        mask="url(#almaTextMask)"
        className="fill-white/5 font-[Tusker,Impact,sans-serif] font-bold"
        style={{ fontSize: '460px', letterSpacing: '0.04em', opacity: hovered ? 0.6 : 0.2 }}
      >
        {text}
      </text>
    </svg>
  )
}

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        background:
          'radial-gradient(125% 125% at 50% 10%, rgba(20, 56, 71, 0.95) 40%, rgba(7, 26, 36, 0.98) 100%)',
      }}
    />
  )
}

const footerLinks = [
  {
    title: 'O Evento',
    links: [
      { label: 'Experiência', href: '#experiencia' },
      { label: 'Programação', href: '#programacao' },
      { label: 'Boipeba, Bahia', href: '#ilha' },
      { label: 'Open Bar Premium', href: '#openbar' },
    ],
  },
  {
    title: 'Informações',
    links: [
      { label: 'Dúvidas Frequentes', href: '#faq' },
      { label: 'Como Chegar', href: '#ilha' },
      { label: 'Ingressos Sympla', href: TICKETS, pulse: true, external: true },
    ],
  },
]

export default function HoverFooter() {
  const footerCardRef = useRef<HTMLElement>(null)

  return (
    <div className="hover-footer-container">
      <footer ref={footerCardRef} className="hover-footer-card">
        <div className="hover-footer-content">
          <div className="hover-footer-grid">
            {/* Brand section */}
            <div className="hover-footer-brand">
              <div className="hover-footer-logo-row">
                <img
                  src="/brand/alma-logo-trimmed.png"
                  alt="ALMA Réveillon"
                  className="hover-footer-logo"
                />
              </div>
              <p className="hover-footer-desc">
                Cinco noites na ilha. O mar por perto. O pé na areia. E a sensação rara de estar exatamente onde você queria estar.
              </p>
              <div className="hover-footer-badge">
                <Sparkles size={13} className="text-[#57d2f4]" />
                <span>PRAIA DA CUEIRA · BOIPEBA</span>
              </div>
            </div>

            {/* Footer link sections */}
            {footerLinks.map((section) => (
              <div key={section.title} className="hover-footer-col">
                <h4 className="hover-footer-title">{section.title}</h4>
                <ul className="hover-footer-links">
                  {section.links.map((link) => (
                    <li key={link.label} className="hover-footer-item">
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noreferrer' : undefined}
                        className="hover-footer-link"
                      >
                        <span>{link.label}</span>
                        {link.pulse && (
                          <span className="hover-footer-pulse"></span>
                        )}
                        {link.external && (
                          <ArrowUpRight size={13} className="opacity-60" />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact / Info section */}
            <div className="hover-footer-col">
              <h4 className="hover-footer-title">Quando & Onde</h4>
              <ul className="hover-footer-info-list">
                <li className="hover-footer-info-item">
                  <Calendar size={17} className="text-[#57d2f4] shrink-0" />
                  <span>27 — 31 de Dezembro de 2026</span>
                </li>
                <li className="hover-footer-info-item">
                  <MapPin size={17} className="text-[#57d2f4] shrink-0" />
                  <span>Praia da Cueira, Cairu — Boipeba, BA</span>
                </li>
              </ul>
              <div className="pt-6 mt-3">
                <a
                  href={TICKETS}
                  target="_blank"
                  rel="noreferrer"
                  className="hover-footer-cta-btn"
                >
                  <span>Garantir Ingresso</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>

          <hr className="hover-footer-divider" />

          {/* Footer bottom */}
          <div className="hover-footer-bottom">
            {/* Social icons */}
            <div className="hover-footer-socials">
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Oficial ALMA"
                className="hover-footer-social-icon"
              >
                <FaInstagram size={18} />
              </a>
              <span className="text-xs text-white/60">@almareveillonboipeba</span>
            </div>

            {/* Sympla badge */}
            <a
              href={TICKETS}
              target="_blank"
              rel="noreferrer"
              className="hover-footer-sympla"
            >
              <span className="text-xs text-white/50">Vendas oficiais por</span>
              <img
                src="/brand/sympla-logo.png"
                alt="Sympla"
                className="hover-footer-sympla-img"
              />
            </a>

            {/* Copyright */}
            <p className="hover-footer-copy">
              &copy; {new Date().getFullYear()} ALMA Réveillon. Todos os direitos reservados.
            </p>
          </div>
        </div>

        {/* Text hover effect background watermark extrapolating card boundaries */}
        <div className="hover-footer-huge-text-bg">
          <TextHoverEffect text="ALMA" containerRef={footerCardRef} className="w-full h-full" />
        </div>

        <FooterBackgroundGradient />
      </footer>
    </div>
  )
}
