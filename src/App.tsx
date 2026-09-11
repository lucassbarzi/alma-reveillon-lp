import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'
import ExpandableGallery from './components/ui/gallery-animation'
import StackedGallery from './components/ui/stacked-gallery'
import PipVideoPlayer from './components/ui/pip-video-player'
import SilkShader from './components/ui/silk-shader'
import MeshDriftShader from './components/ui/mesh-drift-shader'

import HoverFooter from './components/ui/hover-footer'
import CircularMenu from './components/ui/circular-menu'
import AccommodationSection from './AccommodationSection'
import ImportantNotices from './ImportantNotices'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { trackTicketClick, TICKETS_URL } from './lib/tracking'

const TICKETS = TICKETS_URL
const INSTAGRAM = 'https://www.instagram.com/almareveillonboipeba/'
const LODGING_TICKETS_URL = TICKETS
const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SqueezeCarousel() {
  const { t } = useLanguage()

  const experienceCards = useMemo(() => [
    { title: t.squeeze.cards[0].title, subtitle: t.squeeze.cards[0].subtitle, image: asset('/media/curadoria/carrossel-caminho.webp'), alt: t.squeeze.cards[0].alt },
    { title: t.squeeze.cards[1].title, subtitle: t.squeeze.cards[1].subtitle, image: asset('/media/curadoria/card-dia-lancha.webp'), alt: t.squeeze.cards[1].alt },
    { title: t.squeeze.cards[2].title, subtitle: t.squeeze.cards[2].subtitle, image: asset('/media/curadoria/card-noite-festa.webp'), alt: t.squeeze.cards[2].alt },
    { title: t.squeeze.cards[3].title, subtitle: t.squeeze.cards[3].subtitle, image: asset('/media/curadoria/card-virada-fogos-novo.webp'), alt: t.squeeze.cards[3].alt },
  ], [t])

  return (
    <section className="squeeze-section relative-section" aria-labelledby="squeeze-title">
      <SilkShader variant="ice-aqua" />
      <div className="shader-bg-overlay shader-bg-overlay--squeeze" style={{ background: 'rgba(3, 18, 14, 0.10)' }} />
      <div className="shader-content-layer">
        <div className="squeeze-header">
          <Reveal>
            <span className="kicker">{t.squeeze.kicker}</span>
            <h2 id="squeeze-title">{t.squeeze.h2Part1}<br/><em>{t.squeeze.h2Part2}</em></h2>
          </Reveal>
        </div>
        <ExpandableGallery items={experienceCards} />
      </div>
    </section>
  )
}

function AppContent() {
  const { t, language } = useLanguage()
  const heroRef = useRef<HTMLElement>(null)
  const manifestoRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const titleY = useSpring(useTransform(scrollYProgress, [0, .8], ['0%', '12%']), { stiffness: 55, damping: 28 })
  const titleOpacity = useTransform(scrollYProgress, [0, .7], [1, 0])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isPastHero, setIsPastHero] = useState(false)
  const [shouldClosePip, setShouldClosePip] = useState(false)

  const gallery = useMemo(() => [
    [asset('/media/curadoria/slideshow-mare-aerea.webp'), t.gallery.items[0].alt],
    [asset('/media/curadoria/slideshow-ilha-aerea.webp'), t.gallery.items[1].alt],
    [asset('/media/curadoria/slideshow-praia.webp'), t.gallery.items[2].alt],
    [asset('/media/curadoria/slideshow-reflexo.webp'), t.gallery.items[3].alt],
    [asset('/media/0299_image.jpg'), t.gallery.items[4].alt],
  ], [t])

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 400)

      if (manifestoRef.current && logoRef.current) {
        const manifestoTop = manifestoRef.current.getBoundingClientRect().top
        const logoBottom = logoRef.current.getBoundingClientRect().bottom
        // Transição precisa da logo: quando a logo cruza fisicamente para o bloco 2
        setIsPastHero(logoBottom >= manifestoTop)
        // Fechamento antecipado do PiP: fecha suavemente ao se aproximar do segundo bloco
        setShouldClosePip(manifestoTop <= window.innerHeight * 0.75)
      } else if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        setIsPastHero(heroBottom <= 60)
        setShouldClosePip(heroBottom <= window.innerHeight * 0.75)
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll, { passive: true })
    checkScroll()
    return () => {
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main>
      <header className={`nav ${isPastHero ? 'nav--scrolled' : 'nav--hero'}`}>
        <a
          ref={logoRef}
          className={`wordmark ${isPastHero ? 'wordmark--scrolled' : 'wordmark--hero'}`}
          href="#top"
          aria-label={t.nav.ariaWordmark}
        >
          <img
            className="wordmark-layer wordmark-layer--dark"
            src={asset('/brand/alma-logo-dark.png')}
            alt="ALMA Réveillon 2027"
          />
          <img
            className="wordmark-layer wordmark-layer--diff"
            src={asset('/brand/alma-logo-trimmed.png')}
            alt="ALMA Réveillon 2027"
          />
        </a>
        <CircularMenu ticketsUrl={TICKETS} instagramUrl={INSTAGRAM} />
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <video autoPlay muted loop playsInline preload="auto" poster={asset('/media/alma-hero-poster.jpg')} aria-label={t.hero.videoAria}>
          <source media="(max-width: 780px)" src={asset('/media/alma-hero-mobile.mp4')} type="video/mp4" />
          <source src={asset('/media/alma-hero-web.mp4')} type="video/mp4" />
        </video>
        <motion.div className="cloud cloud-a" style={{ y: cloudY }}/><motion.div className="cloud cloud-b" style={{ y: cloudY }}/>
        <div className="hero-wash" />
        <motion.div className="hero-copy" style={{ y: titleY, opacity: titleOpacity }}>
          <span className="eyebrow">{t.hero.eyebrow}</span>
          <h1>{t.hero.titlePart1}<br/><em>{t.hero.titlePart2}</em></h1>
          <p className="hero-subtitle">
            {t.hero.subtitle.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < t.hero.subtitle.length - 1 && <br />}
              </span>
            ))}
          </p>
          <p className="hero-slogan"><span>{t.hero.slogan1}</span><span>{t.hero.slogan2}</span></p>
          <a
            className="ticket"
            href={TICKETS}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackTicketClick({
                ctaLocation: 'hero_cta',
                ctaText: t.hero.cta,
                destinationUrl: TICKETS,
                language,
              })
            }}
          >
            <span className="ticket-label">{t.hero.cta}</span>
            <span className="ticket-icon-wrapper">
              <ArrowRight size={17} />
            </span>
          </a>
        </motion.div>
        <a className="scroll-cue" href="#experiencia" aria-label={t.hero.scrollCueAria}>
          <span>{t.hero.scrollCueText}</span>
          <ArrowDown size={17}/>
        </a>
      </section>

      <section className="manifesto light relative-section" id="experiencia" ref={manifestoRef}>
        <MeshDriftShader />
        <div className="shader-bg-overlay" style={{ background: 'rgba(244, 251, 253, 0.72)' }} />
        <div className="shader-content-layer">
          <Reveal>
            <span className="kicker">{t.manifesto.kicker}</span>
            <h2>{t.manifesto.h2Part1}<br/><em>{t.manifesto.h2Part2}</em></h2>
          </Reveal>
          <Reveal className="manifesto-grid" delay={.1}>
            <p className="lead">{t.manifesto.lead}</p>
            <p>{t.manifesto.p2}</p>
          </Reveal>
        </div>
      </section>

      <section className="cinema" id="ilha">
        <div className="cinema-bg" />
        <Reveal className="cinema-copy">
          <span className="kicker">{t.cinema.kicker}</span>
          <h2>{t.cinema.h2Part1}<br/>{t.cinema.h2Part2}</h2>
          <p>{t.cinema.p}</p>
        </Reveal>
      </section>

      <SqueezeCarousel />

      <div id="midia">
        <StackedGallery items={gallery.map(([src, alt]) => ({ src, alt }))} />
      </div>

      <section className="nights light" id="programacao">
        <Reveal>
          <span className="kicker">{t.lineup.kicker}</span>
          <h2>{t.lineup.h2Part1}<br/><em>{t.lineup.h2Part2}</em></h2>
        </Reveal>
        <div className="night-list">
          {t.lineup.nights.map((n, i) => (
            <Reveal className="night" key={n.date} delay={i * .04}>
              <span>{n.date}</span>
              <h3>{n.title}</h3>
              <p>{n.subtitle}</p>
            </Reveal>
          ))}
        </div>
        <p className="source-note">{t.lineup.sourceNote}</p>
      </section>

      <section className="bar-section relative-section" id="openbar">
        <SilkShader />
        <div className="shader-bg-overlay" style={{ background: 'linear-gradient(135deg, rgba(5, 24, 32, 0.38) 0%, rgba(14, 70, 86, 0.20) 50%, rgba(5, 24, 32, 0.42) 100%)' }} />
        <div className="bar-grid shader-content-layer">
          <Reveal className="bar-copy">
            <span className="kicker">{t.openBar.kicker}</span>
            <h2>{t.openBar.h2Part1}<br/><em>{t.openBar.h2Part2}</em></h2>
            <p>{t.openBar.p}</p>
            <div className="bar-brands" aria-label={t.openBar.brandsAria}>
              <span>Beefeater</span><span>Absolut</span><span>Jameson</span><span>Sol Premium</span><span>Aperol Spritz</span><span>Red Bull</span>
            </div>
            <div className="bar-highlight">{t.openBar.highlight}</div>
          </Reveal>
          <div className="orb" aria-hidden="true"><span>27 — 31</span><strong>{t.openBar.month}</strong></div>
        </div>
      </section>

      <AccommodationSection ticketsUrl={LODGING_TICKETS_URL} />

      <section className="stories light" id="historias">
        <Reveal>
          <span className="kicker">{t.stories.kicker}</span>
          <h2>{t.stories.h2Part1}<br/><em>{t.stories.h2Part2}</em></h2>
        </Reveal>
        <div className="story-grid">
          {t.stories.cards.map((card, idx) => (
            <Reveal className="story-card" key={card.tag} delay={idx * .1}>
              <div className="story-card__top">
                <span className="story-card__tag">{card.tag}</span>
              </div>
              <div className="story-card__content">
                <h3>{card.title}</h3>
                <p>{card.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ImportantNotices ticketsUrl={TICKETS} instagramUrl={INSTAGRAM} />

      <section className="faq light" id="faq">
        <Reveal>
          <span className="kicker">{t.faq.kicker}</span>
          <h2>{t.faq.h2Part1}<br/><em>{t.faq.h2Part2}</em></h2>
        </Reveal>
        <div className="faq-list">
          {t.faq.items.map((item, index) => (
            <details key={item.question}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.question}
                <b>+</b>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="finale">
        <div className="finale-bg" />
        <Reveal className="finale-copy">
          <span className="kicker">{t.finale.kicker}</span>
          <h2>{t.finale.h2Part1}<br/>{t.finale.h2Part2}</h2>
          <p>
            {t.finale.locationSchedule.split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx === 0 && <br />}
              </span>
            ))}
          </p>
          <a
            className="ticket light-ticket"
            href={TICKETS}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackTicketClick({
                ctaLocation: 'finale_cta',
                ctaText: t.finale.cta,
                destinationUrl: TICKETS,
                language,
              })
            }}
          >
            <span className="ticket-label">{t.finale.cta}</span>
            <span className="ticket-icon-wrapper">
              <ArrowRight size={17} />
            </span>
          </a>
          <small>{t.finale.legal}</small>
        </Reveal>
      </section>

      <HoverFooter />
      <PipVideoPlayer closeOnTrigger={shouldClosePip} />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            className="back-to-top"
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label={t.backToTop.aria}
          >
            <ArrowUp size={16} />
            <span>{t.backToTop.text}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
