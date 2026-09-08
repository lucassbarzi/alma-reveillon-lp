import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { FaInstagram } from 'react-icons/fa6'

const TICKETS = 'https://www.sympla.com.br/evento/a-l-m-a-reveillon-2027-boipeba/3254347?referrer=www.google.com'
const INSTAGRAM = 'https://www.instagram.com/almareveillonboipeba/'

export function TextHoverEffect({
  text,
  duration,
  className,
}: {
  text: string
  duration?: number
  className?: string
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' })

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor])

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none uppercase cursor-pointer ${className || ''}`}
    >
      <defs>
        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#a7c5cf" />
              <stop offset="25%" stopColor="#5d9fb4" />
              <stop offset="50%" stopColor="#83b8c9" />
              <stop offset="75%" stopColor="#a7c5cf" />
              <stop offset="100%" stopColor="#143847" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: '50%', cy: '50%' }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="fill-transparent stroke-[#a7c5cf] font-[helvetica] text-7xl font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
        }}
      >
        {text}
      </motion.text>
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#textGradient)"
        strokeWidth="0.3"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] text-7xl font-bold"
      >
        {text}
      </text>
    </svg>
  )
}

export function FooterBackgroundGradient() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          'radial-gradient(125% 125% at 50% 10%, #143847ee 50%, #a7c5cf33 100%)',
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
      { label: 'Boipeba', href: '#ilha' },
      { label: 'Dúvidas', href: '#faq' },
    ],
  },
  {
    title: 'Informações',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Hospedagem', href: '#' },
      { label: 'Como chegar', href: '#' },
    ],
  },
]

const contactInfo = [
  {
    text: '27 — 31 DEZ 2026',
  },
  {
    text: 'Praia da Cueira, Boipeba',
  },
  {
    text: 'Cairu, Bahia',
  },
]

export default function HoverFooter() {
  return (
    <footer className="relative h-fit rounded-t-3xl overflow-hidden" style={{ background: '#143847' }}>
      <div className="max-w-7xl mx-auto p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/brand/alma-logo-trimmed.png" alt="ALMA" className="h-16 w-auto brightness-0 invert" />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Cinco noites na ilha. O mar por perto. O pé na areia. E a sensação rara de estar exatamente onde você queria estar.
            </p>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#a7c5cf] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Quando e Onde
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3 text-white/70">
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/20 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-white/70">
          {/* Social icons */}
          <div className="flex space-x-6">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-[#a7c5cf] hover:text-[#143847] transition-colors"
            >
              <FaInstagram size={18} />
            </a>
          </div>

          {/* Sympla */}
          <a
            href={TICKETS}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="text-white/50 text-xs">Ingressos por</span>
            <img className="h-5 brightness-0 invert opacity-70" src="/brand/sympla-logo.png" alt="Sympla" />
          </a>

          {/* Copyright */}
          <p className="text-center md:text-left text-white/50">
            &copy; {new Date().getFullYear()} ALMA Réveillon. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="ALMA" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  )
}
