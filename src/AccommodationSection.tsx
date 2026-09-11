import { useCallback, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import AccommodationModal from './AccommodationModal'
import AccommodationCarousel from './components/ui/accommodation-carousel'
import { accommodations, type Accommodation } from './data/accommodations'

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

        <Reveal delay={.1}><AccommodationCarousel items={accommodations} onOpen={setSelected} /></Reveal>

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
