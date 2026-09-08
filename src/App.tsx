import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import ExpandableGallery from './components/ui/gallery-animation'
import PipVideoPlayer from './components/ui/pip-video-player'
import SilkShader from './components/ui/silk-shader'
import MeshDriftShader from './components/ui/mesh-drift-shader'
import FlutedGlassShader from './components/ui/fluted-glass-shader'
import HoverFooter from './components/ui/hover-footer'
import CircularMenu from './components/ui/circular-menu'

const TICKETS = 'https://www.sympla.com.br/evento/a-l-m-a-reveillon-2027-boipeba/3254347?referrer=www.google.com'
const INSTAGRAM = 'https://www.instagram.com/almareveillonboipeba/'
const nights = [
  ['27.12', 'Roda de Praia', '+5521'],
  ['28.12', 'Isso Não É Um Sunrise', 'Uma noite que atravessa a madrugada'],
  ['29.12', 'MOMO & Biribiri', 'Afrobeats sob o céu da Bahia'],
  ['30.12', 'Luau do DDP', 'Pagode, funk, pop e eletrônico'],
  ['31.12', 'ALMA Réveillon', 'A virada, à beira-mar'],
]
const gallery = [
  ['/media/curadoria/slideshow-mare-aerea.webp', 'Recifes e águas claras vistos do alto em Boipeba'],
  ['/media/curadoria/slideshow-ilha-aerea.webp', 'Praia e coqueiral vistos do alto'],
  ['/media/curadoria/slideshow-praia.webp', 'Faixa de areia e mar azul na ilha'],
  ['/media/curadoria/slideshow-reflexo.webp', 'Coqueiros refletidos nas águas da ilha'],
]
const experienceCards = [
  { title: 'O caminho', subtitle: 'Chegar a Boipeba já muda o ritmo. O trecho final acontece entre estrada, mar e caminhos de areia.', image: '/media/curadoria/carrossel-caminho.webp', alt: 'Chegada à ilha pelo cais e pelo mar' },
  { title: 'O dia', subtitle: 'Praias, mata e água morna antes de a primeira batida atravessar a noite.', image: '/media/curadoria/carrossel-dia.webp', alt: 'Praia de areia clara, coqueiros e mar azul' },
  { title: 'A noite', subtitle: 'Luzes, música e o mar como cenário até o amanhecer.', image: '/media/curadoria/card-noite.webp', alt: 'Pista do ALMA iluminada à noite, vista de cima' },
  { title: 'A virada', subtitle: 'Fogos sobre a Praia da Cueira para brindar a chegada de 2027.', image: '/media/curadoria/card-virada-fogos.webp', alt: 'Fogos de artifício sobre a festa do ALMA na praia' },
]
const faqs = [
  ['Onde e quando acontece o ALMA Réveillon 2027?', 'Na Praia da Cueira, em Cairu, Bahia, entre 27 e 31 de dezembro de 2026. A programação publicada começa às 23h nas quatro primeiras noites; no dia 31, às 22h.'],
  ['O passaporte inclui todas as noites?', 'A página oficial apresenta cinco festas Open Bar Premium. As categorias, lotes e disponibilidade devem ser conferidos no fluxo atualizado da Sympla antes da compra.'],
  ['O que está incluído no Open Bar Premium?', 'A carta publicada inclui Beefeater, Absolut, Jameson, cerveja premium, Aperol Spritz, Red Bull, tônica, refrigerantes, sucos, água de coco e água. Na virada, também há Prosecco Ponto Nero Brut by Casa Valduga.'],
  ['Como chegar e onde se hospedar em Boipeba?', 'Boipeba exige planejamento de deslocamento. Há opções por lancha e transfer semiterrestre. Hospedagem e transporte não estão incluídos nesta landing page; reserve cedo e confirme tudo diretamente com os fornecedores.'],
  ['Posso transferir ou cancelar meu ingresso?', 'A Sympla informa cancelamento dentro das condições da plataforma e uma edição de participante até 24 horas antes do evento. Consulte as regras exibidas no ingresso no momento da compra. O evento é exclusivo para maiores de 18 anos.'],
]

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
}

function SqueezeCarousel() {
  return <section className="squeeze-section relative" aria-labelledby="squeeze-title">
    <FlutedGlassShader className="z-0" />
    <div className="absolute inset-0 bg-[#a7c5cf]/70 z-[1]" />
    <div className="relative z-[2]">
      <Reveal><span className="kicker">A EXPERIÊNCIA EM QUATRO MOVIMENTOS</span><h2 id="squeeze-title">Antes da festa,<br/><em>já é ALMA.</em></h2></Reveal>
      <ExpandableGallery items={experienceCards} />
    </div>
  </section>
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [logoLight, setLogoLight] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const cloudY = useTransform(scrollYProgress, [0, 1], ['0%', '32%'])
  const titleY = useSpring(useTransform(scrollYProgress, [0, .8], ['0%', '12%']), { stiffness: 55, damping: 28 })
  const titleOpacity = useTransform(scrollYProgress, [0, .7], [1, 0])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
      const mid = window.innerHeight * .48
      const cinema = document.querySelector('.cinema')?.getBoundingClientRect()
      const gallery = document.querySelector('.gallery')?.getBoundingClientRect()
      setLogoLight(Boolean((cinema && cinema.top <= mid && cinema.bottom >= mid) || (gallery && gallery.top <= mid && gallery.bottom >= mid)))
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll) }
  }, [])

  return <main>
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${logoLight ? 'nav--light-logo' : ''}`}>
      <a className="wordmark" href="#top" aria-label="ALMA, início">
        <img src="/brand/alma-logo-trimmed.png" alt="ALMA Réveillon 2027" />
      </a>
      <CircularMenu ticketsUrl={TICKETS} instagramUrl={INSTAGRAM} />
    </header>

    <section className="hero" id="top" ref={heroRef}>
      <video autoPlay muted loop playsInline preload="auto" poster="/media/alma-hero-poster.jpg" aria-label="Paisagens de Boipeba entre nuvens ensolaradas">
        <source src="/media/alma-hero-web.mp4" type="video/mp4" />
      </video>
      <motion.div className="cloud cloud-a" style={{ y: cloudY }}/><motion.div className="cloud cloud-b" style={{ y: cloudY }}/>
      <div className="hero-wash" />
      <motion.div className="hero-copy" style={{ y: titleY, opacity: titleOpacity }}>
        <span className="eyebrow">27 — 31 DEZ 2026 · PRAIA DA CUEIRA</span>
        <h1>O ano novo<br/>nasce com<br/><em>toda ALMA.</em></h1>
        <p className="hero-subtitle">Cinco noites na ilha. O mar por perto. O pé na areia. E a sensação rara de estar exatamente onde você queria estar.</p>
        <a className="ticket" href={TICKETS} target="_blank" rel="noreferrer"><span className="ticket-label">Viver o ALMA</span> <ArrowRight size={18}/></a>
      </motion.div>
      <a className="scroll-cue" href="#experiencia" aria-label="Continuar"><span>DESCER</span><ArrowDown size={17}/></a>
    </section>

    <section className="manifesto light relative" id="experiencia">
      <MeshDriftShader className="z-0" />
      <div className="absolute inset-0 bg-white/60 z-[1]" />
      <div className="relative z-[2]">
        <Reveal><span className="kicker">UM CONVITE DA ILHA</span><h2>Há viradas que mudam a data.<br/><em>Esta muda o estado de espírito.</em></h2></Reveal>
        <Reveal className="manifesto-grid" delay={.1}>
          <p className="lead">Boipeba não se atravessa com pressa. A chegada já muda o ritmo: a cidade fica para trás, o mar abre caminho e o tempo passa a obedecer à maré.</p>
          <p>Na Praia da Cueira, o ALMA ocupa cinco noites entre 27 e 31 de dezembro. Música, areia, encontros e Open Bar Premium compõem uma experiência desenhada para terminar o ano leve e começar 2027 inteiro.</p>
        </Reveal>
      </div>
    </section>

    <section className="cinema" id="ilha">
      <div className="cinema-bg" />
      <Reveal className="cinema-copy"><span className="kicker">BOIPEBA, BAHIA</span><h2>Primeiro,<br/>o paraíso.</h2><p>Uma ilha alcançada pelo mar. Praia, mata, caminhos de areia e noites que começam quando o sol baixa.</p></Reveal>
    </section>

    <SqueezeCarousel />

    <section className="gallery" aria-hidden="true">
      {gallery.map(([src, alt], i) => <motion.figure key={src} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: .45 }} transition={{ duration: 1.1 }}><img src={src} alt={alt} loading={i ? 'lazy' : 'eager'}/><figcaption>0{i+1} / 04</figcaption></motion.figure>)}
    </section>

    <section className="nights light" id="programacao">
      <Reveal><span className="kicker">CINCO NOITES · OPEN BAR PREMIUM</span><h2>Cada noite,<br/><em>uma nova maré.</em></h2></Reveal>
      <div className="night-list">{nights.map((n, i) => <Reveal className="night" key={n[0]} delay={i*.04}><span>{n[0]}</span><h3>{n[1]}</h3><p>{n[2]}</p></Reveal>)}</div>
      <p className="source-note">Programação publicada nas páginas de referência. Alterações devem ser confirmadas no canal oficial do evento.</p>
    </section>

    <section className="bar-section relative">
      <SilkShader className="z-0" />
      <div className="absolute inset-0 bg-black/30 z-[1]" />
      <div className="relative z-[2]">
        <Reveal className="bar-copy"><span className="kicker">SEM INTERROMPER O MOMENTO</span><h2>Open Bar<br/>Premium.</h2><p>Nas cinco noites, uma seleção premium de gin, vodka, whiskey, cerveja, cocktails, energéticos e bebidas não alcoólicas. Na virada, Prosecco Ponto Nero Brut para o primeiro brinde de 2027.</p><div className="bar-brands" aria-label="Marcas do Open Bar Premium"><span>Beefeater</span><span>Absolut</span><span>Jameson</span><span>Sol Premium</span><span>Aperol Spritz</span><span>Red Bull</span></div><div className="bar-highlight">Virada com Prosecco Ponto Nero Brut by Casa Valduga</div></Reveal>
        <div className="orb" aria-hidden="true"><span>27 — 31</span><strong>DEZ</strong></div>
      </div>
    </section>

    <section className="stories light" id="historias">
      <Reveal><span className="kicker">HISTÓRIAS DE OUTRAS MARÉS</span><h2>O que fica<br/><em>depois da virada.</em></h2></Reveal>
      <div className="story-grid">
        <Reveal className="story-card"><span>CHEGADA</span><h3>A cidade termina no cais.</h3><p>O deslocamento não é um intervalo. É o primeiro capítulo: quando o caminho encontra o mar, a pressa começa a perder importância.</p></Reveal>
        <Reveal className="story-card" delay={.1}><span>ENCONTRO</span><h3>A pista não tem paredes.</h3><p>A Praia da Cueira muda a escala da festa. O horizonte permanece à vista enquanto a música atravessa a madrugada.</p></Reveal>
        <Reveal className="story-card" delay={.2}><span>MEMÓRIA</span><h3>O sol encerra a noite.</h3><p>As imagens de edições anteriores guardam o que uma lista de atrações não explica: gente que chegou para uma festa e saiu levando uma paisagem inteira.</p></Reveal>
      </div>
      <p className="source-note">Storytelling editorial construído a partir do acervo visual local. Não representa depoimentos atribuídos a participantes.</p>
    </section>

    <section className="faq light" id="faq">
      <Reveal><span className="kicker">ANTES DE IR</span><h2>As cinco maiores<br/><em>dúvidas, respondidas.</em></h2></Reveal>
      <div className="faq-list">{faqs.map(([question, answer], index) => <details key={question}><summary><span>0{index + 1}</span>{question}<b>+</b></summary><p>{answer}</p></details>)}</div>
    </section>

    <section className="finale">
      <div className="finale-bg" />
      <Reveal className="finale-copy"><span className="kicker">HAPPY NEW ILHA</span><h2>SEU MELHOR ANO<br/>VAI COMEÇAR AQUI.</h2><p>Praia da Cueira · Cairu, Bahia<br/>27 de dezembro, 23h — 1º de janeiro, 6h</p><a className="ticket light-ticket" href={TICKETS} target="_blank" rel="noreferrer"><span className="ticket-label">Comprar no Sympla</span> <ArrowRight size={18}/></a><small>Evento para maiores de 18 anos. Compra e regras pela plataforma oficial.</small></Reveal>
    </section>

    <HoverFooter />

    <PipVideoPlayer />
  </main>
}
export default App
