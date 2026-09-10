import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import AccommodationModal from './AccommodationModal'
import { accommodations, googleMapsSearchUrl, type Accommodation } from './data/accommodations'

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .9, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export default function AccommodationSection({ ticketsUrl }: { ticketsUrl: string }) {
  const [selected, setSelected] = useState<Accommodation | null>(null)
  const close = useCallback(() => setSelected(null), [])

  return (
    <section className="accommodation-section" id="hospedagem">
      <div className="accommodation-section__wash" aria-hidden="true" />
      <div className="accommodation-section__content">
        <Reveal className="accommodation-intro">
          <span className="kicker">PACOTE COMPLETO · 26/12 — 02/01</span>
          <h2>Uma hospedagem <em>pronta.</em></h2>
          <p className="accommodation-subhead">Você só precisa chegar em Boipeba.</p>
          <p>Escolha onde ficar e viva os cinco dias de ALMA com ingresso + hospedagem em um único pacote.</p>
        </Reveal>

        <Reveal className="accommodation-benefits" delay={.08}>
          <span>AR-CONDICIONADO</span><i /> <span>TV</span><i /> <span>BANHO QUENTE</span><i /> <span>CAFÉ DA MANHÃ</span><i /> <span>LIMPEZA DIÁRIA</span>
        </Reveal>

        <div className="accommodation-grid">
          {accommodations.map((item, index) => (
            <Reveal key={item.id} delay={index * .07}>
              <article className={`accommodation-card accommodation-card--${item.id}`} onClick={() => setSelected(item)}>
                <button className="accommodation-card__open" onClick={() => setSelected(item)} aria-label={`Ver detalhes de ${item.name}`}>
                  <div className={`accommodation-card__visual accommodation-placeholder--${item.id}`}>
                    {item.images[0] && <img src={item.images[0]} alt={`${item.name} em Boipeba`} />}
                  </div>
                  <div className="accommodation-card__body">
                    <div className="accommodation-badges">{item.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <span className="accommodation-card__details">VER DETALHES <ArrowRight size={15} /></span>
                  </div>
                </button>
                <a className="accommodation-card__map" href={googleMapsSearchUrl(item.mapsQuery)} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>VER LOCALIZAÇÃO <ArrowUpRight size={14} /></a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="accommodation-location" delay={.12}>
          <span>MARINA · RUA DAS PEDRAS · PRAÇA SANTO ANTÔNIO</span>
          <p>Hospedagens próximas entre si e a aproximadamente 7–11 min do Ponto do Trator.</p>
          <a href={ticketsUrl} target="_blank" rel="noreferrer">VER VALORES E DISPONIBILIDADE <ArrowUpRight size={16} /></a>
        </Reveal>
      </div>
      <AccommodationModal accommodation={selected} ticketsUrl={ticketsUrl} onClose={close} />
    </section>
  )
}
