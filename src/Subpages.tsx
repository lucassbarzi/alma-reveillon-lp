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
export type SubpageKey = 'como-chegar' | 'onde-ficar' | 'ilha-de-boipeba' | 'experiencia' | 'midia' | 'programacao' | 'pacotes-alma-com-hospedagem' | 'historias' | 'boi-people'
type PhotoId = (typeof islandPhotos[number] | typeof galleryPhotos[number] | typeof partyPhotos[number])['id']
const photoUrl = (id: string, size = 1280) => `/media/ilha/${id}-${size}.webp`

function Photo({ id, className = '', eager = false, sizes = '100vw' }: { id: PhotoId; className?: string; eager?: boolean; sizes?: string }) {
  const photo = [...islandPhotos, ...galleryPhotos, ...partyPhotos].find(p => p.id === id)!
  if (!photo) return null
  return (
    <img
      alt={photo.alt}
      className={className}
      src={photoUrl(id)}
      srcSet={[...new Map([640, 1280, 2000].map(size => [Math.min(size, photo.width), photoUrl(id, size)]))].map(([width, url]) => `${url} ${width}w`).join(', ')}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      loading={eager ? 'eager' : 'lazy'}
      {...{ fetchpriority: eager ? 'high' : 'auto' }}
      decoding="async"
    />
  )
}

function TicketLink({ label = 'Viver o ALMA', location }: { label?: string; location: string }) {
  const { language } = useLanguage()
  return (
    <a
      className="ticket"
      href={TICKETS_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => trackTicketClick({ ctaLocation: location, ctaText: label, language })}
    >
      <span className="ticket-label">{label}</span>
      <span className="ticket-icon-wrapper"><ArrowUpRight size={17} /></span>
    </a>
  )
}

function Shell({
  path,
  label,
  title,
  accent,
  photo,
  intro,
  children,
  gallery = false,
  noHero = false,
}: {
  path: SubpageKey
  label?: string
  title?: string
  accent?: string
  photo?: PhotoId
  intro?: string
  children: React.ReactNode
  gallery?: boolean
  noHero?: boolean
}) {
  return (
    <div className={`island-page${gallery ? ' island-page--gallery' : ''}${noHero ? ' island-page--no-hero' : ''}`} lang="pt-BR">
      <a className="island-skip" href="#conteudo">Pular para o conteúdo</a>
      <header className="island-header">
        <a className="island-back" href="/" aria-label="Voltar à página inicial">
          <ArrowLeft size={18} /><span>Início</span>
        </a>
        <a className="island-logo" href="/" aria-label="ALMA Réveillon 2027 — início">
          <img src="/brand/alma-logo-dark.png" alt="ALMA Réveillon" width="150" height="70" />
        </a>
        <CircularMenu />
      </header>
      <main>
        {!noHero && photo && (
          <section className={`island-hero${photo === 'festa-por-do-sol' ? ' island-hero--party' : ''}`} aria-labelledby="page-title">
            <Photo id={photo} eager className="island-hero__image" />
            <div className="island-hero__shade" />
            <div className="island-hero__copy">
              {label && <span className="island-kicker">ALMA RÉVEILLON 2027 · {label}</span>}
              <h1 id="page-title">{title}{accent && <em> {accent}</em>}</h1>
              {intro && <p>{intro}</p>}
            </div>
            <div className="island-hero__bottom">
              <span>ILHA DE BOIPEBA — BAHIA</span>
              <a href="#conteudo" aria-label={gallery ? 'Ver galeria de fotos' : 'Explorar esta página'}>
                {gallery ? 'Ver galeria' : 'Explorar'}
                <ArrowDown size={16} />
              </a>
              <span>27 — 31 DEZ 2026</span>
            </div>
          </section>
        )}
        <div id="conteudo" className="island-content">{children}</div>
      </main>
      <footer className="island-footer">
        <a href="/" aria-label="ALMA — página inicial">
          <img src="/brand/alma-logo-dark.png" alt="ALMA" width="110" height="52" />
        </a>
        <span>Boipeba, Bahia.<br />Um lugar para sentir.</span>
        <a href="https://www.instagram.com/almareveillonboipeba/" target="_blank" rel="noreferrer">
          Instagram <ArrowUpRight size={15} />
        </a>
      </footer>
    </div>
  )
}

function SectionHeading({ label, title, children }: { label: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="island-section-heading">
      <div>
        <span className="island-kicker">{label}</span>
        <h2>{title}</h2>
      </div>
      {children && <p>{children}</p>}
    </div>
  )
}

function NextChapter({
  label,
  title,
  desc,
  ctaText,
  href,
  image,
}: {
  label: string
  title: string
  desc?: string
  ctaText?: string
  href: string
  image: PhotoId
}) {
  return (
    <a className={`island-next${desc || ctaText ? ' island-next--cta' : ''}`} href={href}>
      <Photo id={image} />
      <div>
        <span className="island-kicker">{label}</span>
        <h2>{title}</h2>
        {desc && <p className="island-next__desc">{desc}</p>}
        {ctaText ? (
          <span className="island-next__btn">
            {ctaText} <ArrowRight size={17} />
          </span>
        ) : (
          <span className="island-next__arrow"><ArrowUpRight size={26} /></span>
        )}
      </div>
    </a>
  )
}

/* Subpage 1: Ilha de Boipeba (Exuberante, mar azul paradise, todas as praias e atrações) */
function IslandOfBoipebaPage() {
  const beaches = [
    {
      name: 'Praia da Cueira',
      tag: 'CENÁRIO DO ALMA & COQUEIRAL',
      photo: 'galeria-coqueiro-na-praia' as PhotoId,
      desc: 'Um dos coqueirais mais famosos do Brasil, com faixa de areia dourada e águas calmas e mornas. É aqui que acontece o festival ALMA e onde fica a histórica barraca do Guido com suas lagostas grelhadas na brasa da lenha.',
    },
    {
      name: 'Piscinas Naturais de Moreré',
      tag: 'AQUÁRIO MARINHO NO MAR ABERTO',
      photo: 'piscinas' as PhotoId,
      desc: 'Na maré baixa, recifes de corais a cerca de 1 km da praia formam imensas piscinas marinhas de água morna e cristalina no meio do oceano, repletas de peixes coloridos ideais para snorkeling.',
    },
    {
      name: 'Ponta dos Castelhanos',
      tag: 'BANCOS DE AREIA & AZUL TURQUESA',
      photo: 'galeria-costa-turquesa' as PhotoId,
      desc: 'Um dos pontos mais selvagens e espetaculares de Boipeba. O encontro do Rio Catu com o oceano aberto cria piscinas de mar azul turquesa profundo e bancos de areia que emergem na maré vazante.',
    },
    {
      name: 'Praia de Bainema',
      tag: 'SANTUÁRIO INTOCADO & SOSSEGO',
      photo: 'praia' as PhotoId,
      desc: 'Quilômetros de praia praticamente deserta com coqueiros inclinados sobre o mar calmo e transparente. O lugar perfeito para caminhar em paz, contemplar a natureza e sentir o tempo da ilha.',
    },
    {
      name: 'Boca da Barra & Rio do Inferno',
      tag: 'ENCONTRO DO RIO COM O MAR',
      photo: 'galeria-canoa-cristalina' as PhotoId,
      desc: 'A charmosa chegada à ilha. Uma praia viva de areia clara, pontilhada por canoas, barcos a vela e restaurantes acolhedores, coroada por um dos pores do sol mais bonitos de toda a Bahia.',
    },
    {
      name: 'Praia de Tassimirim',
      tag: 'PISCINAS CALMAS & AMENDOEIRAS',
      photo: 'galeria-agua-transparente' as PhotoId,
      desc: 'Enseada aconchegante cercada por recifes e sombreada por amendoeiras frondosas. Águas mornas e transparentes com pedras que abrigam vida marinha fascinante.',
    },
  ]

  return (
    <Shell
      path="ilha-de-boipeba"
      label="O DESTINO"
      title="Boipeba,"
      accent="o paraíso intocado."
      photo="galeria-sol-e-coqueiros"
      intro="Reserva da Biosfera e Patrimônio da Humanidade pela UNESCO. Uma ilha baiana mágica sem carros, banhada por águas cristalinas em tons de turquesa, recifes de corais e coqueirais a perder de vista."
    >
      <section className="island-section" id="praias">
        <SectionHeading
          label="AS PRAIAS MAIS BONITAS DO BRASIL"
          title="Cada praia, um cenário paradisíaco."
        >
          Caminhos de areia, mar azul brilhante e natureza preservada. Conheça as partes mais encantadoras da Ilha de Boipeba.
        </SectionHeading>

        <div className="island-beaches-grid">
          {beaches.map((b) => (
            <article className="island-beach-card" key={b.name}>
              <figure>
                <Photo id={b.photo} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </figure>
              <div className="island-beach-card__body">
                <span className="island-kicker">{b.tag}</span>
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="island-section island-editorial">
        <div className="island-editorial__copy">
          <span className="island-kicker">O RITMO DE BOIPEBA</span>
          <h2>Aqui não entram carros.<br /><em>Os pés tocam a areia.</em></h2>
          <p>
            O transporte oficial em Boipeba são caminhadas descalças, quadriciclos, jardineiras e passeios de barco. A ausência de trânsito e o ar marinho puro convidam você a desacelerar desde o primeiro instante.
          </p>
          <a className="island-text-link" href="/como-chegar">
            Ver como chegar até a ilha <ArrowUpRight size={17} />
          </a>
        </div>
        <figure>
          <Photo id="galeria-azul-vivo" sizes="(max-width: 700px) 100vw, 55vw" />
          <figcaption>Mar azul turquesa e banco de areia na maré baixa em Boipeba.</figcaption>
        </figure>
      </section>

      <section className="island-section">
        <SectionHeading label="EXPERIÊNCIAS NA ILHA" title="O que você vive em Boipeba.">
          Momentos que marcam a alma além das noites de festa.
        </SectionHeading>
        <div className="island-principles">
          <article>
            <span>01</span>
            <h3>Passeio de Lancha Volta à Ilha</h3>
            <p>Navegue pelas piscinas de Moreré, bancos de areia de Castelhanos e faça uma parada flutuante para ostras frescas no Rio dos Patos.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Gastronomia Típica Baiana</h3>
            <p>Moquecas de camarão e peixe fresco, pastéis de siri, lagosta na brasa e caipirinhas com frutas locais como o biribiri e cacau.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Preservação & Reserva da Biosfera</h3>
            <p>Uma Área de Proteção Ambiental rigorosamente cuidada por quem vive aqui. Cuide dos corais, recolha seus resíduos e apoie a comunidade local.</p>
          </article>
        </div>
      </section>

      <NextChapter label="O SEU CAMINHO" title="Como chegar à ilha." href="/como-chegar" image="galeria-canoa-cristalina" />
    </Shell>
  )
}

/* Subpage 2: Como Chegar (Hero paradisíaco + Rotas detalhadas) */
function HowToArrivePage() {
  return (
    <Shell
      path="como-chegar"
      label="DESTINO / ILHA DE BOIPEBA, BAHIA"
      title="O seu caminho"
      accent="até o paraíso."
      photo="galeria-canoa-cristalina"
      intro="Chegar a Boipeba já faz parte da magia da viagem. O trecho final acontece entre mar azul turquesa, rios calmos e caminhos de areia sob o sol da Bahia. Planeje sua travessia com antecedência e sinta o tempo desacelerar."
    >
      <section className="island-section" style={{ paddingTop: '60px' }}>
        <SectionHeading
          label="ROTAS, TRANSFER & LANCHAS"
          title="Todas as opções para sua viagem."
        >
          Planeje sua chegada com antecedência e aproveite cada instante do percurso pela Costa do Dendê.
        </SectionHeading>
        <div className="island-arrival">
          <figure>
            <Photo id="galeria-costa-turquesa" sizes="(max-width: 800px) 100vw, 45vw" />
            <figcaption>Águas cristalinas, recifes e mar azul turquesa dão as boas-vindas na chegada a Boipeba.</figcaption>
          </figure>
          <div className="island-routes">
            <details open>
              <summary><span>01</span><h3>Saindo de São Paulo (Guarulhos / Congonhas)</h3><Plus size={18} /></summary>
              <div>
                <p>
                  Para quem parte de São Paulo (Guarulhos GRU, Congonhas CGH ou Viracopos VCP), o primeiro passo é o voo direto até o Aeroporto Internacional de Salvador (SSA), com duração média de 2h15 a 2h30. Do aeroporto de Salvador até a ilha, você pode escolher a rota aérea expressa ou o transfer executivo:
                </p>
                <ol>
                  <li>
                    <strong>Opção 1 · Táxi Aéreo Expresso (Apenas 30 minutos):</strong> Voo panorâmico direto do Hangar de Salvador até a pista de pouso da Fazenda Pontal em Boipeba. Sobrevoa a Baía de Todos-os-Santos e todo o arquipélago. Ao pousar, uma lancha rápida de 5 minutos deixa você no cais da vila. É a opção mais rápida, confortável e exclusiva.
                  </li>
                  <li>
                    <strong>Opção 2 · Transfer Semi-Terrestre Executivo Porta a Porta:</strong> Receptivo no desembarque de Salvador que cuida de todo o itinerário até Boipeba (van/carro executivo com ar-condicionado até o terminal marítimo, travessia marítima para Itaparica, trecho rodoviário pela BA-001 até o Atracadouro de Graciosa e lancha rápida privativa até Boipeba). Tempo total aproximado: 4h30 a 5h30.
                  </li>
                </ol>
              </div>
            </details>
            <details open>
              <summary><span>02</span><h3>Saindo de Salvador (Aeroporto, Centro ou Porto)</h3><Plus size={18} /></summary>
              <div>
                <p>Se você já estiver em Salvador ou desembarcar pelo aeroporto/rodoviária, as principais rotas são:</p>
                <ol>
                  <li>
                    <strong>Rota Semi-Terrestre (Mais procurada e estável):</strong>
                    <br />• <em>Ferry-Boat:</em> Saída do Terminal Marítimo de São Joaquim até Bom Despacho na Ilha de Itaparica (aprox. 50 min em águas calmas).
                    <br />• <em>Trecho Terrestre BA-001:</em> De Bom Despacho até o Atracadouro de Graciosa ou Valença por rodovia 100% asfaltada em carro, van ou ônibus (cerca de 1h45 a 2h).
                    <br />• <em>Lancha Rápida:</em> Do Atracadouro de Graciosa direto ao Cais de Boipeba pelas águas tranquilas e abrigadas do Rio do Inferno (apenas 25 a 35 min).
                  </li>
                  <li>
                    <strong>Rota Marítima via Morro de São Paulo (Catamarã):</strong> Catamarã saindo do Terminal Náutico da Bahia (em frente ao Mercado Modelo) até Morro de São Paulo (aprox. 2h30 em mar aberto). De Morro até Boipeba, o trajeto é feito em veículo 4x4 cruzando as praias da Ilha de Tinharé até o canal sul, seguido de 5 minutos de travessia de barco até Boipeba, ou fretamento de lancha rápida privativa.
                  </li>
                  <li>
                    <strong>Rota Aérea (Aeroporto SSA):</strong> Voos diários fretados em aeronaves homologadas saindo do aeroporto de Salvador direto para a pista de Boipeba em apenas 30 minutos.
                  </li>
                </ol>
              </div>
            </details>
            <details>
              <summary><span>03</span><h3>Saindo de Valença & Atracadouro de Graciosa</h3><Plus size={18} /></summary>
              <div>
                <p>Valença e o Atracadouro de Graciosa são os pontos continentais oficiais de embarque para Boipeba. Para quem viaja de carro próprio ou alugado, esta é a rota ideal:</p>
                <ol>
                  <li>
                    <strong>Atracadouro de Graciosa (A ROTA MAIS RECOMENDADA):</strong> Localizado no município de Taperoá, logo antes de Valença. É o atracadouro mais próximo de Boipeba, reduzindo a travessia de lancha rápida para apenas <strong>25 a 35 minutos</strong> de navegação abrigada.
                    <br />• <em>Estacionamento 24h:</em> Conta com estacionamentos privativos, seguros, cobertos e com vigilância 24 horas durante todo o período do Réveillon, com diárias acessíveis para deixar o veículo com total tranquilidade.
                  </li>
                  <li>
                    <strong>Terminal Hidroviário de Valença:</strong> Fica no centro da cidade de Valença. As lanchas rápidas partem com frequência regular (de hora em hora ao longo do dia, das 07h às 17h/18h) navegando pelo canal até Boipeba (aprox. 50 min a 1h).
                  </li>
                </ol>
              </div>
            </details>
            <details>
              <summary><span>04</span><h3>Ao Chegar ao Cais de Boipeba & Deslocamento na Ilha</h3><Plus size={18} /></summary>
              <div>
                <p>
                  Na Ilha de Boipeba <strong>não circulam automóveis convencionais</strong>. A vila é inteira para pedestres, garantindo o clima paradisíaco, silêncio e ar puro.
                </p>
                <ol>
                  <li>
                    <strong>Carregadores de Bagagem:</strong> Ao desembarcar no cais, a cooperativa de carregadores locais estará à disposição. Eles transportam suas malas com todo o cuidado em tradicionais carrinhos de mão de madeira até as pousadas da vila e da Boca da Barra.
                  </li>
                  <li>
                    <strong>Para a Praia da Cueira (Festival ALMA) e Moreré:</strong> Quem se hospeda nas praias mais afastadas pode ir a pé pela praia ou utilizar as charmosas jardineiras (tratores adaptados para passageiros) e quadriciclos credenciados, que partem continuamente do Ponto do Trator na vila.
                  </li>
                </ol>
              </div>
            </details>
          </div>
        </div>

        <div className="island-note">
          <span className="island-kicker">DICAS ESSENCIAIS PARA O RÉVEILLON</span>
          <p>
            <strong>Horário da última lancha:</strong> As lanchas rápidas partem do continente (Graciosa e Valença) somente até as <strong>17h / 18h</strong>. Por segurança e regulamentação da Capitania dos Portos, não há travessia noturna de passageiros. Programe seus horários para chegar com folga à luz do dia.
            <br /><br />
            <strong>Margem de retorno:</strong> Para o voo de volta pós-virada, reserve uma margem mínima de <strong>5 a 6 horas</strong> entre o embarque na lancha em Boipeba e o horário do voo no Aeroporto de Salvador (SSA), garantindo uma viagem leve e sem correria.
          </p>
          <a className="island-text-link" href="https://www.google.com/maps/search/?api=1&query=Praia+da+Cueira,+Boipeba,+BA" target="_blank" rel="noreferrer">
            Localização da Praia da Cueira e Cais no Google Maps <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <NextChapter label="ONDE SE HOSPEDAR" title="Encontre seu lugar na ilha." href="/onde-ficar" image="galeria-sol-e-coqueiros" />
    </Shell>
  )
}

/* Subpage 3: Onde Ficar (Fotos ensolaradas e paraíso) */
function WhereToStayPage() {
  const places = [
    {
      name: 'Vila de Boipeba',
      tag: 'RESTAURANTES & VIDA LOCAL',
      image: 'galeria-barco-da-ilha' as PhotoId,
      description: 'Ideal para quem busca facilidade de acesso ao cais, restaurantes charmosos, lojinhas e o ritmo acolhedor da comunidade. Ponto de partida fácil para passeios de barco e traslados.'
    },
    {
      name: 'Boca da Barra',
      tag: 'ENTRE O RIO E O MAR',
      image: 'galeria-canoa-cristalina' as PhotoId,
      description: 'Estadia à beira-mar com mar calmo de águas mornas, a passos curtos do centro da vila e com uma vista deslumbrante para o pôr do sol sobre o Rio do Inferno.'
    },
    {
      name: 'Praia da Cueira & Tassimirim',
      tag: 'PRAIA DO ALMA & COQUEIRAIS',
      image: 'galeria-coqueiro-na-praia' as PhotoId,
      description: 'Areia clara, coqueirais sem fim e mar calmo. A Praia da Cueira é o cenário exclusivo de todas as festas do ALMA Réveillon, permitindo ir e voltar a pé descalço.'
    },
    {
      name: 'Moreré & Piscinas Naturais',
      tag: 'REFÚGIO RÚSTICO & RECIFES',
      image: 'galeria-recifes-azuis' as PhotoId,
      description: 'Vibe rústica e tranquila, famosa mundialmente pelas piscinas naturais em mar aberto na maré baixa. Ideal para quem deseja estender a estadia e relaxar no paraíso.'
    },
  ]

  return (
    <Shell
      path="onde-ficar"
      label="ONDE FICAR"
      title="Um refúgio"
      accent="do seu jeito."
      photo="galeria-sol-e-coqueiros"
      intro="Perto da vila, à beira-mar ou entre coqueirais ensolarados. Descubra qual região de Boipeba mais combina com a sua viagem de fim de ano."
    >
      <section className="island-section">
        <SectionHeading label="GUIA DE LOCALIZAÇÃO" title="A ilha tem o seu ritmo.">
          Escolha a região pensando nos seus dias de praia e na comodidade para aproveitar as cinco noites de festa na Praia da Cueira.
        </SectionHeading>

        <div className="island-places">
          {places.map((p, i) => (
            <article key={p.name}>
              <figure>
                <Photo id={p.image} sizes="(max-width: 700px) 100vw, 50vw" />
                <span>0{i + 1}</span>
              </figure>
              <span className="island-kicker">{p.tag}</span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <a
                className="island-text-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ', Boipeba, Bahia')}`}
                target="_blank"
                rel="noreferrer"
              >
                Ver região no mapa <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <NextChapter
        label="PACOTE COMPLETO"
        title="Hospedagem + Ingressos ALMA"
        desc="Quer garantir ingresso + hospedagem selecionada em um só pacote sem preocupações? Veja as opções disponíveis na página inicial."
        ctaText="Ver pacotes na página inicial"
        href="/#hospedagem"
        image="galeria-costa-turquesa"
      />
    </Shell>
  )
}

/* Subpage 4: Galeria de Mídia (Fotos em alta resolução com lightbox) */
function GalleryPage() {
  const [active, setActive] = useState<number | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const close = useCallback(() => {
    dialog.current?.close()
    setActive(null)
  }, [])
  const opened = active !== null

  useEffect(() => {
    if (!opened) return
    dialog.current?.showModal()
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [opened])

  const move = (direction: number) => {
    setActive(index => index === null ? null : (index + direction + mediaPhotos.length) % mediaPhotos.length)
  }

  return (
    <Shell
      path="midia"
      label="GALERIA & MÍDIA"
      title="Boipeba & ALMA,"
      accent="em todos os sentidos."
      photo="galeria-sol-e-coqueiros"
      intro="Uma curadoria de fotos que traduzem a energia das festas na Praia da Cueira e a beleza cinematográfica da ilha."
      gallery
    >
      <section className="island-section island-gallery-section" aria-label="Galeria de Boipeba e do ALMA">
        <div className="island-gallery-heading">
          <span className="island-kicker">DO SOL À PISTA</span>
          <span>{String(mediaPhotos.length).padStart(2, '0')} fotografias</span>
        </div>
        <div className="island-gallery">
          {mediaPhotos.map((photo, i) => (
            <button
              type="button"
              key={photo.id}
              className="island-gallery__item"
              onClick={() => setActive(i)}
              aria-label={`Ampliar: ${photo.alt}`}
              aria-haspopup="dialog"
            >
              <Photo id={photo.id} sizes="(max-width: 600px) 50vw, (max-width: 1000px) 50vw, 33vw" />
              <span className="island-gallery__zoom"><Plus size={20} /></span>
            </button>
          ))}
        </div>
      </section>

      <dialog
        className="island-lightbox"
        ref={dialog}
        onCancel={close}
        onClose={() => setActive(null)}
        onClick={e => { if (e.target === e.currentTarget) close() }}
        onKeyDown={e => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); move(-1) }
          if (e.key === 'ArrowRight') { e.preventDefault(); move(1) }
        }}
        aria-label="Visualizador de fotografias de Boipeba e do ALMA"
      >
        <button className="island-lightbox__close" type="button" aria-label="Fechar fotografia" onClick={close}>
          <X />
        </button>
        {active !== null && (
          <>
            <button className="island-lightbox__prev" type="button" aria-label="Fotografia anterior" onClick={() => move(-1)}>
              <ChevronLeft />
            </button>
            <figure>
              <img
                key={mediaPhotos[active].id}
                src={photoUrl(mediaPhotos[active].id, 2000)}
                alt={mediaPhotos[active].alt}
              />
              <figcaption aria-live="polite">
                <span>{mediaPhotos[active].alt}</span>
                <span>{active + 1} / {mediaPhotos.length}</span>
              </figcaption>
            </figure>
            <button className="island-lightbox__next" type="button" aria-label="Próxima fotografia" onClick={() => move(1)}>
              <ChevronRight />
            </button>
          </>
        )}
      </dialog>

      <NextChapter label="DESCUBRA A ILHA" title="Conheça todos os cantos de Boipeba." href="/ilha-de-boipeba" image="galeria-costa-turquesa" />
    </Shell>
  )
}

/* Subpage 5: Programação (mantida para rotas diretas) */
const nights = [
  { day: '27', week: 'DOMINGO', title: 'Roda de Praia com +5521', subtitle: 'Resenha nova, os crias e muito digui digui diguiê nas areias da Cueira', time: '23h às 06h' },
  { day: '28', week: 'SEGUNDA', title: '✖️ Isso Não É Um Sunrise by @IssoNaoeUmaFesta', subtitle: 'Uma nova festa e um novo amanhecer no paraíso', time: '23h às 06h' },
  { day: '29', week: 'TERÇA', title: 'MOMO & Biribiri by @BailedoMomo Crew', subtitle: 'Súditos do MOMO, vocês estão prontos?', time: '23h às 06h' },
  { day: '30', week: 'QUARTA', title: 'Luau do DDP', subtitle: 'O luau mais famoso do Brasil e a maior Open Vibe', time: '23h às 06h' },
  { day: '31', week: 'QUINTA', title: 'A L M A Réveillon', subtitle: 'Corpo salgado e alma lavada', time: '22h às 06h' },
]
function ProgramPage() {
  return (
    <Shell path="programacao" label="Programação" title="Cinco noites." accent="Uma nova energia." photo="festa-por-do-sol" intro="De 27 a 31 de dezembro, a Praia da Cueira é o nosso ponto de encontro.">
      <section className="island-section">
        <SectionHeading label="DEZEMBRO 2026 / JANEIRO 2027" title="Cinco noites para lavar a ALMA">
          Open Bar Premium nas cinco festas. Escolha como viver a sua virada.
        </SectionHeading>
        <div className="island-schedule">
          {nights.map(n => (
            <article key={n.day}>
              <div className="island-schedule__date">
                <strong>{n.day}</strong>
                <span>DEZ<br />{n.week}</span>
              </div>
              <div>
                <h2>{n.title}</h2>
                {n.subtitle && <p>{n.subtitle}</p>}
              </div>
              <span className="island-schedule__time">{n.time}</span>
            </article>
          ))}
        </div>
        <div className="island-booking-row">
          <span><MapPin size={16} /> Praia da Cueira · Boipeba</span>
          <TicketLink label="Escolher meus ingressos" location="programacao_footer" />
        </div>
      </section>
      <NextChapter label="ILHA DE BOIPEBA" title="Conheça a ilha e suas praias." href="/ilha-de-boipeba" image="galeria-sol-e-coqueiros" />
    </Shell>
  )
}

/* Subpage 6: Pacotes com Hospedagem (mantida para rotas diretas) */
function PackagesPage() {
  const [selected, setSelected] = useState<Accommodation | null>(null)
  const close = useCallback(() => setSelected(null), [])
  const available = accommodations.filter(a => a.status === 'available')
  const soldOut = accommodations.filter(a => a.status === 'sold-out')
  const card = (item: Accommodation) => (
    <article className="island-stay" key={item.id}>
      <button className="island-stay__visual" type="button" onClick={() => setSelected(item)} aria-label={`Ver fotos e detalhes de ${item.name}`}>
        <img src={item.coverImage} alt={item.name} loading="lazy" width="720" height="540" />
        <span>{item.status === 'available' ? item.period : 'Esgotado'}</span>
        <span className="island-stay__plus"><Plus size={20} /></span>
      </button>
      <div className="island-stay__body">
        <span className="island-kicker">{item.badges.join(' · ')}</span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <span className="island-stay__location"><MapPin size={14} />{item.location}</span>
        <button className="island-text-link" type="button" onClick={() => setSelected(item)}>
          Fotos e detalhes <ArrowUpRight size={16} />
        </button>
      </div>
    </article>
  )
  return (
    <Shell path="pacotes-alma-com-hospedagem" label="Pacotes com hospedagem" title="Seu réveillon." accent="Sua casa na ilha." photo="galeria-costa-turquesa" intro="Encontre sua hospedagem e planeje os dias de ALMA em Boipeba.">
      <section className="island-section">
        <SectionHeading label="PACOTES ALMA COM HOSPEDAGEM" title="Escolha onde desacelerar.">
          Compare as acomodações e os períodos. Valores, disponibilidade e itens incluídos devem ser conferidos no momento da compra.
        </SectionHeading>
        <div className="island-stays">{available.map(card)}</div>
        <div className="island-booking-row">
          <a className="island-text-link" href="/onde-ficar">Conhecer as regiões da ilha <ArrowUpRight size={16} /></a>
          <TicketLink label="Consultar pacotes" location="pacotes_footer" />
        </div>
        {soldOut.length > 0 && (
          <details className="island-soldout">
            <summary>Outras acomodações · {soldOut.length} esgotadas <Plus size={18} /></summary>
            <div className="island-stays">{soldOut.map(card)}</div>
          </details>
        )}
      </section>
      <NextChapter label="COMO CHEGAR" title="Planeje sua viagem até Boipeba." href="/como-chegar" image="galeria-costa-turquesa" />
      <AccommodationModal accommodation={selected} ticketsUrl={TICKETS_URL} onClose={close} variant="island" />
    </Shell>
  )
}

function StoriesPage({ path }: { path: SubpageKey }) {
  return (
    <Shell path={path} label="Boi People" title="Encontros que" accent="ficam na memória." photo="entardecer">
      <section className="island-section">
        <SectionHeading label="QUEM VIVEU O ALMA" title="A ilha fica na gente." />
        <div className="island-quotes">
          {reviews.map(r => (
            <blockquote key={r.author}>
              <p>“{r.quote}”</p>
              <cite>@{r.author}</cite>
            </blockquote>
          ))}
        </div>
      </section>
      <NextChapter label="FOTOGRAFIAS DA ILHA" title="Reencontre Boipeba." href="/midia" image="piscinas" />
    </Shell>
  )
}

export default function Subpage({ path }: { path: SubpageKey }) {
  if (path === 'como-chegar') return <HowToArrivePage />
  if (path === 'onde-ficar') return <WhereToStayPage />
  if (path === 'ilha-de-boipeba' || path === 'experiencia') return <IslandOfBoipebaPage />
  if (path === 'midia') return <GalleryPage />
  if (path === 'programacao') return <ProgramPage />
  if (path === 'pacotes-alma-com-hospedagem') return <PackagesPage />
  if (path === 'historias' || path === 'boi-people') return <StoriesPage path={path} />
  return <IslandOfBoipebaPage />
}
