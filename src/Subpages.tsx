import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MapPin, Plus, X } from 'lucide-react'
import CircularMenu from './components/ui/circular-menu'
import AccommodationModal from './AccommodationModal'
import { accommodations, type Accommodation } from './data/accommodations'
import { islandPhotos, galleryPhotos, mediaPhotos, partyPhotos } from './data/island-photos'
import { reviews } from './data/reviews'
import { TICKETS_URL, trackTicketClick } from './lib/tracking'
import { useLanguage } from './i18n/LanguageContext'
import './subpages.css'

export { reviews } from './data/reviews'
export type { ReviewItem } from './data/reviews'
export type SubpageKey = 'como-chegar' | 'onde-ficar' | 'programacao' | 'experiencia' | 'midia' | 'pacotes-alma-com-hospedagem' | 'historias' | 'boi-people'
type PhotoId = (typeof islandPhotos[number] | typeof galleryPhotos[number] | typeof partyPhotos[number])['id']
const photoUrl = (id: string, size = 1280) => `/media/ilha/${id}-${size}.webp`
const pageLinks = [
  ['experiencia', 'Experiência'], ['midia', 'Mídia'], ['programacao', 'Programação'],
  ['pacotes-alma-com-hospedagem', 'Pacotes ALMA'], ['como-chegar', 'Como chegar'], ['onde-ficar', 'Onde ficar'],
] as const

function Photo({ id, className = '', eager = false, sizes = '100vw' }: { id: PhotoId; className?: string; eager?: boolean; sizes?: string }) {
  const photo = [...islandPhotos, ...galleryPhotos, ...partyPhotos].find(p => p.id === id)!
  return <img alt={photo.alt} className={className} src={photoUrl(id)} srcSet={[...new Map([640, 1280, 2000].map(size => [Math.min(size, photo.width), photoUrl(id, size)]))].map(([width, url]) => `${url} ${width}w`).join(', ')} sizes={sizes} width={photo.width} height={photo.height} loading={eager ? 'eager' : 'lazy'} {...{ fetchpriority: eager ? 'high' : 'auto' }} decoding="async" />
}

function TicketLink({ label = 'Viver o ALMA', location }: { label?: string; location: string }) {
  const { language } = useLanguage()
  return <a className="ticket" href={TICKETS_URL} target="_blank" rel="noreferrer" onClick={() => trackTicketClick({ ctaLocation: location, ctaText: label, language })}><span className="ticket-label">{label}</span><span className="ticket-icon-wrapper"><ArrowUpRight size={17} /></span></a>
}

function Shell({ path, label, title, accent, photo, intro, children, gallery = false }: { path: SubpageKey; label: string; title: string; accent?: string; photo: PhotoId; intro?: string; children: React.ReactNode; gallery?: boolean }) {
  return <div className={`island-page${gallery ? ' island-page--gallery' : ''}`} lang="pt-BR">
    <a className="island-skip" href="#conteudo">Pular para o conteúdo</a>
    <header className="island-header">
      <a className="island-back" href="/" aria-label="Voltar à página inicial"><ArrowLeft size={18} /><span>Início</span></a>
      <a className="island-logo" href="/" aria-label="ALMA Réveillon 2027 — início"><img src="/brand/alma-logo-dark.png" alt="ALMA Réveillon" width="150" height="70" /></a>
      <CircularMenu />
    </header>
    <main>
      <section className={`island-hero${photo === 'festa-por-do-sol' ? ' island-hero--party' : ''}`} aria-labelledby="page-title">
        <Photo id={photo} eager className="island-hero__image" />
        <div className="island-hero__shade" />
        <div className="island-hero__copy"><span className="island-kicker">ALMA RÉVEILLON 2027 · {label}</span><h1 id="page-title">{title}{accent && <em>{accent}</em>}</h1>{intro && <p>{intro}</p>}</div>
        <div className="island-hero__bottom"><span>ILHA DE BOIPEBA — BAHIA</span><a href="#conteudo" aria-label={gallery ? 'Ver galeria de fotos' : 'Explorar esta página'}>{gallery ? 'Ver galeria' : 'Explorar'}<ArrowDown size={16} /></a><span>27 — 31 DEZ 2026</span></div>
      </section>
      <nav className="island-nav" aria-label="Páginas do ALMA">{pageLinks.map(([key, text]) => <a key={key} href={`/${key}`} aria-current={key === path ? 'page' : undefined}>{text}</a>)}</nav>
      <div id="conteudo" className="island-content">{children}</div>
    </main>
    <footer className="island-footer"><a href="/" aria-label="ALMA — página inicial"><img src="/brand/alma-logo-dark.png" alt="ALMA" width="110" height="52" /></a><span>Boipeba, Bahia.<br />Um lugar para sentir.</span><a href="https://www.instagram.com/almareveillonboipeba/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={15} /></a></footer>
  </div>
}

function SectionHeading({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return <div className="island-section-heading"><div><span className="island-kicker">{label}</span><h2>{title}</h2></div>{children && <p>{children}</p>}</div>
}
function NextChapter({ label, title, href, image }: { label: string; title: string; href: string; image: PhotoId }) {
  return <a className="island-next" href={href}><Photo id={image} /><div><span className="island-kicker">{label}</span><h2>{title}</h2><span className="island-next__arrow"><ArrowUpRight size={26} /></span></div></a>
}

function ExperiencePage() {
  return <Shell path="experiencia" label="A experiência" title="Aqui, o luxo" accent="é outro." photo="costa" intro="O mar por perto. Os pés na areia. E a liberdade de viver o tempo da ilha.">
    <section className="island-section island-editorial" id="a-ilha"><div className="island-editorial__copy"><span className="island-kicker">01 / O DESTINO</span><h2>Uma ilha.<br /><em>Outro ritmo.</em></h2><p>Entre coqueirais, caminhos de areia e o azul do mar, Boipeba convida a desacelerar. O dia começa sem pressa e termina onde o sol encontra a água.</p><a className="island-text-link" href="/midia">Um olhar sobre a ilha <ArrowUpRight size={17} /></a></div><figure><Photo id="piscinas" sizes="(max-width: 700px) 100vw, 55vw" /><figcaption>Água, luz e os desenhos da maré.</figcaption></figure></section>
    <section className="island-panoramic"><Photo id="festa-pista-neon" /><div><span className="island-kicker">02 / O ENCONTRO</span><h2>O dia é da ilha.<br /><em>A noite é do ALMA.</em></h2><p>Cinco noites na Praia da Cueira, com música, Open Bar Premium e encontros que atravessam a virada.</p><a className="island-text-link" href="/programacao">Conhecer as noites <ArrowRight size={17} /></a></div></section>
    <section className="island-section"><SectionHeading label="03 / CUIDAR DO QUE ENCANTA" title="A beleza também pede cuidado.">Leve boas memórias. Deixe a ilha tão bonita quanto a encontrou.</SectionHeading><div className="island-principles"><article><span>01</span><h3>Menos descartáveis</h3><p>Reutilize seu copo durante as festas e descarte os resíduos nos locais indicados.</p></article><article><span>02</span><h3>Respeito à natureza</h3><p>Preserve a vegetação, os recifes e os caminhos da ilha.</p></article><article><span>03</span><h3>Valorize quem é daqui</h3><p>Conheça os sabores, o trabalho e a hospitalidade da comunidade local.</p></article></div></section>
    <NextChapter label="SUA ESTADIA" title="Fique mais um pouco." href="/pacotes-alma-com-hospedagem" image="reflexos" />
  </Shell>
}

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useCallback(() => { dialog.current?.close(); setActive(null) }, [])
  const opened = active !== null
  useEffect(() => {
    if (!opened) return
    dialog.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [opened])
  const move = (direction: number) => setActive(index => index === null ? null : (index + direction + mediaPhotos.length) % mediaPhotos.length)
  return <Shell path="midia" label="Galeria" title="Boipeba," accent="em todos os sentidos." photo="galeria-sol-e-coqueiros" gallery>
    <section className="island-section island-gallery-section" aria-label="Galeria de Boipeba e do ALMA"><div className="island-gallery-heading"><span className="island-kicker">DO SOL À PISTA</span><span>{String(mediaPhotos.length).padStart(2, '0')} fotografias</span></div><div className="island-gallery">{mediaPhotos.map((photo, i) => <button type="button" key={photo.id} className="island-gallery__item" onClick={() => setActive(i)} aria-label={`Ampliar: ${photo.alt}`} aria-haspopup="dialog"><Photo id={photo.id} sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 33vw" /><span className="island-gallery__zoom"><Plus size={20} /></span></button>)}</div></section>
    <dialog className="island-lightbox" ref={dialog} onCancel={close} onClose={() => setActive(null)} onClick={e => { if (e.target === e.currentTarget) close() }} onKeyDown={e => { if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) } if (e.key === 'ArrowRight') { e.preventDefault(); move(1) } }} aria-label="Visualizador de fotografias de Boipeba e do ALMA"><button className="island-lightbox__close" type="button" aria-label="Fechar fotografia" onClick={close}><X /></button>{active !== null && <><button className="island-lightbox__prev" type="button" aria-label="Fotografia anterior" onClick={() => move(-1)}><ChevronLeft /></button><figure><img key={mediaPhotos[active].id} src={photoUrl(mediaPhotos[active].id, 2000)} alt={mediaPhotos[active].alt} /><figcaption aria-live="polite"><span>{mediaPhotos[active].alt}</span><span>{active + 1} / {mediaPhotos.length}</span></figcaption></figure><button className="island-lightbox__next" type="button" aria-label="Próxima fotografia" onClick={() => move(1)}><ChevronRight /></button></>}</dialog>
  </Shell>
}

const nights = [
  { day: '27', week: 'DOMINGO', title: 'Roda de Praia', subtitle: 'com +5521', time: '23h — 06h' },
  { day: '28', week: 'SEGUNDA', title: 'Isso Não É Um Sunrise', subtitle: '', time: '23h — 06h' },
  { day: '29', week: 'TERÇA', title: 'Momo & Biribiri', subtitle: '', time: '23h — 06h' },
  { day: '30', week: 'QUARTA', title: 'Luau do DDP', subtitle: '', time: '23h — 06h' },
  { day: '31', week: 'QUINTA', title: 'ALMA Réveillon', subtitle: 'A grande virada', time: '22h — 06h' },
]
function ProgramPage() {
  return <Shell path="programacao" label="Programação" title="Cinco noites." accent="Uma nova energia." photo="festa-por-do-sol" intro="De 27 a 31 de dezembro, a Praia da Cueira é o nosso ponto de encontro.">
    <section className="island-section"><SectionHeading label="DEZEMBRO 2026 / JANEIRO 2027" title="Cada noite, uma história.">Open Bar Premium nas cinco festas. Escolha como viver a sua virada.</SectionHeading><div className="island-schedule">{nights.map(n => <article key={n.day}><div className="island-schedule__date"><strong>{n.day}</strong><span>DEZ<br />{n.week}</span></div><div><h2>{n.title}</h2>{n.subtitle && <p>{n.subtitle}</p>}</div><span className="island-schedule__time">{n.time}</span></article>)}</div><div className="island-booking-row"><span><MapPin size={16} /> Praia da Cueira · Boipeba</span><TicketLink label="Escolher meus ingressos" location="programacao_footer" /></div></section>
    <section className="island-section island-party-story" aria-label="A energia do ALMA"><div><span className="island-kicker">LUZ, MÚSICA & AREIA</span><h2>A noite encontra<br /><em>o ritmo da ilha.</em></h2><p>Da pista sob os coqueiros às performances sobre a areia, cada encontro ganha a paisagem de Boipeba.</p></div><div className="island-party-story__grid"><Photo id="festa-palco-vermelho" /><Photo id="festa-ritual-fogo" /><Photo id="festa-amigos" /></div></section>
    <NextChapter label="ENTRE UMA NOITE E OUTRA" title="Viva o tempo da ilha." href="/experiencia" image="horizonte" />
  </Shell>
}

function PackagesPage() {
  const [selected, setSelected] = useState<Accommodation | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const available = accommodations.filter(a => a.status === 'available')
  const soldOut = accommodations.filter(a => a.status === 'sold-out')
  const card = (item: Accommodation) => <article className="island-stay" key={item.id}><button className="island-stay__visual" type="button" onClick={() => setSelected(item)} aria-label={`Ver fotos e detalhes de ${item.name}`}><img src={item.coverImage} alt={item.name} loading="lazy" width="720" height="540" /><span>{item.status === 'available' ? item.period : 'Esgotado'}</span><span className="island-stay__plus"><Plus size={20} /></span></button><div className="island-stay__body"><span className="island-kicker">{item.badges.join(' · ')}</span><h3>{item.name}</h3><p>{item.description}</p><span className="island-stay__location"><MapPin size={14} />{item.location}</span><button className="island-text-link" type="button" onClick={() => setSelected(item)}>Fotos e detalhes <ArrowUpRight size={16} /></button></div></article>
  return <Shell path="pacotes-alma-com-hospedagem" label="Pacotes com hospedagem" title="Seu réveillon." accent="Sua casa na ilha." photo="reflexos" intro="Encontre sua hospedagem e planeje os dias de ALMA em Boipeba.">
    <section className="island-section"><SectionHeading label="PACOTES ALMA COM HOSPEDAGEM" title="Escolha onde desacelerar.">Compare as acomodações e os períodos. Valores, disponibilidade e itens incluídos devem ser conferidos no momento da compra.</SectionHeading><div className="island-stays">{available.map(card)}</div><div className="island-booking-row"><a className="island-text-link" href="/onde-ficar">Conhecer as regiões da ilha <ArrowUpRight size={16} /></a><TicketLink label="Consultar pacotes" location="pacotes_footer" /></div>{soldOut.length > 0 && <details className="island-soldout"><summary>Outras acomodações · {soldOut.length} esgotadas <Plus size={18} /></summary><div className="island-stays">{soldOut.map(card)}</div></details>}</section>
    <NextChapter label="A VIAGEM COMEÇA AQUI" title="Encontre o seu caminho." href="/como-chegar" image="encontro" />
    <AccommodationModal accommodation={selected} ticketsUrl={TICKETS_URL} onClose={close} variant="island" />
  </Shell>
}

function WhereToStayPage() {
  const places: { name: string; tag: string; image: PhotoId; description: string }[] = [
    { name: 'Vila de Boipeba', tag: 'RESTAURANTES & VIDA LOCAL', image: 'vila', description: 'Para quem quer estar perto do comércio, dos restaurantes e do movimento da vila. A região do cais facilita a chegada.' },
    { name: 'Boca da Barra', tag: 'ENTRE O RIO E O MAR', image: 'entardecer', description: 'Uma estadia perto da vila, com a paisagem dos barcos e o pôr do sol como companhia.' },
    { name: 'Cueira & Tassimirim', tag: 'PRAIA & NATUREZA', image: 'coqueiral', description: 'Coqueirais, caminhos de areia e dias de praia. A Cueira é o endereço das festas do ALMA.' },
    { name: 'Moreré', tag: 'OUTRO RITMO', image: 'horizonte', description: 'Para estender os dias de descanso e conhecer outra parte da ilha. Combine os deslocamentos para as festas antes de reservar.' },
  ]
  return <Shell path="onde-ficar" label="Onde ficar" title="Um refúgio" accent="do seu jeito." photo="horizonte" intro="Perto da vila, à beira-mar ou entre coqueirais. Descubra qual região combina com a sua viagem.">
    <section className="island-section"><SectionHeading label="GUIA DE LOCALIZAÇÃO" title="A ilha tem muitos ritmos.">Escolha a região pensando nos seus dias de praia e no trajeto até a Praia da Cueira.</SectionHeading><div className="island-places">{places.map((p, i) => <article key={p.name}><figure><Photo id={p.image} sizes="(max-width: 700px) 100vw, 50vw" /><span>0{i + 1}</span></figure><span className="island-kicker">{p.tag}</span><h3>{p.name}</h3><p>{p.description}</p><a className="island-text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Boipeba, Bahia')}`} target="_blank" rel="noreferrer">Ver região no mapa <ArrowUpRight size={16} /></a></article>)}</div><div className="island-note"><span className="island-kicker">ANTES DE RESERVAR</span><p>Confirme com a hospedagem a distância até a Cueira e as opções de deslocamento à noite.</p></div></section>
    <NextChapter label="ESCOLHA SUA ESTADIA" title="Conheça os pacotes ALMA." href="/pacotes-alma-com-hospedagem" image="areia" />
  </Shell>
}

function HowToArrivePage() {
  return <Shell path="como-chegar" label="Como chegar" title="O caminho já" accent="faz parte da viagem." photo="encontro" intro="Planeje sua chegada a Boipeba e deixe espaço para aproveitar a travessia.">
    <section className="island-section"><SectionHeading label="DESTINO / ILHA DE BOIPEBA, BAHIA" title="Seu caminho até a ilha.">Combine a chegada e a volta com o operador escolhido antes de fechar os horários da sua viagem.</SectionHeading><div className="island-arrival"><figure><Photo id="barco" sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>A viagem ganha outro ritmo sobre a água.</figcaption></figure><div className="island-routes">
      <details open><summary><span>01</span><h3>Saindo de Salvador</h3><Plus size={18} /></summary><div><p>A viagem pode combinar travessia, trecho terrestre e lancha até Boipeba.</p><ol><li>Travessia para Itaparica.</li><li>Deslocamento terrestre até Valença.</li><li>Lancha até o cais de Boipeba.</li></ol><p>Para transfer completo, trajeto marítimo direto ou opção aérea, consulte a operação disponível para as suas datas.</p></div></details>
      <details><summary><span>02</span><h3>Saindo de Valença</h3><Plus size={18} /></summary><div><p>A chegada à ilha é feita de lancha. Confirme o terminal de embarque, a disponibilidade e o último horário de saída com o operador.</p></div></details>
      <details><summary><span>03</span><h3>Saindo de Morro de São Paulo</h3><Plus size={18} /></summary><div><p>Consulte as opções de lancha fretada ou de trajeto terrestre até o ponto de travessia para Boipeba. Combine embarque e bagagem antecipadamente.</p></div></details>
      <details><summary><span>04</span><h3>Ao chegar à ilha</h3><Plus size={18} /></summary><div><p>Avise sua hospedagem sobre o horário de chegada. Combine o caminho até sua acomodação e os deslocamentos para a Praia da Cueira.</p></div></details>
    </div></div><div className="island-note"><span className="island-kicker">VIAJE SEM PRESSA</span><p>Marés, clima e operação podem alterar os trajetos. Reserve uma margem entre a travessia e seus voos.</p><a className="island-text-link" href="https://www.google.com/maps/search/?api=1&query=Praia+da+Cueira,+Boipeba,+BA" target="_blank" rel="noreferrer">Praia da Cueira no mapa <ArrowUpRight size={16} /></a></div></section>
    <NextChapter label="SEU PRÓXIMO PASSO" title="Encontre seu lugar na ilha." href="/onde-ficar" image="costa" />
  </Shell>
}

function StoriesPage({ path }: { path: SubpageKey }) {
  return <Shell path={path} label="Boi People" title="Encontros que" accent="ficam na memória." photo="entardecer"><section className="island-section"><SectionHeading label="QUEM VIVEU O ALMA" title="A ilha fica na gente." /><div className="island-quotes">{reviews.map(r => <blockquote key={r.author}><p>“{r.quote}”</p><cite>@{r.author}</cite></blockquote>)}</div></section><NextChapter label="FOTOGRAFIAS DA ILHA" title="Reencontre Boipeba." href="/midia" image="piscinas" /></Shell>
}

export default function Subpage({ path }: { path: SubpageKey }) {
  if (path === 'como-chegar') return <HowToArrivePage />
  if (path === 'onde-ficar') return <WhereToStayPage />
  if (path === 'programacao') return <ProgramPage />
  if (path === 'pacotes-alma-com-hospedagem') return <PackagesPage />
  if (path === 'midia') return <GalleryPage />
  if (path === 'historias' || path === 'boi-people') return <StoriesPage path={path} />
  return <ExperiencePage />
}
