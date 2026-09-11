import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Accommodation } from '../../data/accommodations'
import { googleMapsSearchUrl } from '../../data/accommodations'

export default function ExpandingAccommodationCards({ items, onOpen }: {
  items: Accommodation[]
  onOpen: (item: Accommodation) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const active = items[activeIndex]

  const gridStyle = useMemo(() => {
    const tracks = items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
    return isDesktop ? { gridTemplateColumns: tracks } : { gridTemplateRows: tracks }
  }, [activeIndex, items.length, isDesktop])

  const handleActivate = useCallback((index: number) => setActiveIndex(index), [])

  return (
    <div className="expanding-cards" role="region" aria-roledescription="carousel" aria-label="Hospedagens ALMA">
      <ul className="expanding-cards__list" style={gridStyle}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          return (
            <li
              key={item.id}
              className={`expanding-cards__card${isActive ? ' is-active' : ''}`}
              data-active={isActive}
              onMouseEnter={() => handleActivate(index)}
              onFocus={() => handleActivate(index)}
              onClick={() => (isActive ? onOpen(item) : handleActivate(index))}
              tabIndex={0}
              aria-label={item.name}
            >
              <img src={item.coverImage} alt={item.name} loading={index < 2 ? 'eager' : 'lazy'} />
              <div className="expanding-cards__shade" />

              <span className={`expanding-cards__status expanding-cards__status--${item.status}`}>
                {item.status === 'sold-out' ? 'ESGOTADO' : item.statusLabel}
              </span>

              <h3 className="expanding-cards__title-collapsed">{item.name}</h3>

              <div className="expanding-cards__copy">
                <div className="expanding-cards__badges">
                  {item.badges.map((badge) => <span key={badge}>{badge}</span>)}
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="expanding-cards__meta">
        <div className="expanding-cards__count"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span>/ {String(items.length).padStart(2, '0')}</span></div>
        <div className="expanding-cards__links">
          <button onClick={() => onOpen(active)}>VER DETALHES <ArrowRight size={14} /></button>
          <a href={googleMapsSearchUrl(active.mapsQuery)} target="_blank" rel="noreferrer">LOCALIZAÇÃO <ArrowUpRight size={14} /></a>
        </div>
      </div>

      <div className="expanding-cards__dots">
        {items.map((item, index) => (
          <button key={item.id} className={activeIndex === index ? 'is-active' : ''} onClick={() => handleActivate(index)} aria-label={`Ver ${item.name}`} />
        ))}
      </div>
    </div>
  )
}
