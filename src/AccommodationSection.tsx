import { useCallback, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import AccommodationModal from './AccommodationModal'
import ExpandingAccommodationCards from './components/ui/expanding-accommodation-cards'
import { accommodations, type Accommodation } from './data/accommodations'
import { useLanguage } from './i18n/LanguageContext'
import { trackTicketClick } from './lib/tracking'

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.div className={className} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .9, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export default function AccommodationSection({ ticketsUrl }: { ticketsUrl: string }) {
  const { t, language } = useLanguage()
  const [selected, setSelected] = useState<Accommodation | null>(null)
  const close = useCallback(() => setSelected(null), [])

  const localizedAccommodations = useMemo(() => {
    return accommodations.map((acc) => {
      const trans = t.accommodation.items.find((item) => item.id === acc.id)
      if (!trans) return acc
      return {
        ...acc,
        badges: trans.badges,
        description: trans.description,
        period: trans.period,
        statusLabel: trans.statusLabel,
        amenities: trans.amenities,
        location: trans.location,
      }
    })
  }, [t])

  const selectedLocalized = useMemo(() => {
    if (!selected) return null
    return localizedAccommodations.find((it) => it.id === selected.id) || selected
  }, [selected, localizedAccommodations])

  const a = t.accommodation

  return (
    <section className="accommodation-section" id="hospedagem">
      <div className="accommodation-section__wash" aria-hidden="true" />
      <div className="accommodation-section__content">
        <Reveal className="accommodation-intro">
          <span className="kicker">{a.kicker}</span>
          <h2>{a.h2Part1} <em>{a.h2Part2}</em></h2>
          <p className="accommodation-subhead">{a.subhead}</p>
          <p>{a.p}</p>
        </Reveal>

        <Reveal className="accommodation-benefits" delay={.08}>
          <span>{a.benefits.ac}</span><i /> <span>{a.benefits.tv}</span><i /> <span>{a.benefits.hotShower}</span><i /> <span>{a.benefits.breakfast}</span><i /> <span>{a.benefits.cleaning}</span>
        </Reveal>

        <Reveal delay={.1}>
          <ExpandingAccommodationCards items={localizedAccommodations} onOpen={setSelected} />
        </Reveal>

        <Reveal className="accommodation-location" delay={.12}>
          <span>{a.locationTitle}</span>
          <p>{a.locationDesc}</p>
          <a
            href={ticketsUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              trackTicketClick({
                ctaLocation: 'accommodation_section_prices',
                ctaText: a.viewPricesBtn,
                destinationUrl: ticketsUrl,
                language,
              })
            }}
          >
            {a.viewPricesBtn} <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
      <AccommodationModal accommodation={selectedLocalized} ticketsUrl={ticketsUrl} onClose={close} />
    </section>
  )
}
