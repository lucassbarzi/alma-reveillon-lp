import { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Accommodation } from '../../data/accommodations'

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

  const gridStyle = useMemo(() => {
    if (!isDesktop) return undefined
    const tracks = items.map((_, i) => (i === activeIndex ? '5fr' : '1fr')).join(' ')
    return { gridTemplateColumns: tracks }
  }, [activeIndex, items.length, isDesktop])

  const handleActivate = useCallback((index: number) => setActiveIndex(index), [])

  const handleCardClick = useCallback((index: number, item: Accommodation) => {
    if (isDesktop) {
      if (index === activeIndex) onOpen(item)
      else handleActivate(index)
      return
    }
    handleActivate(index)
  }, [isDesktop, activeIndex, onOpen, handleActivate])

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
              onMouseEnter={() => isDesktop && handleActivate(index)}
              onFocus={() => isDesktop && handleActivate(index)}
              onClick={() => handleCardClick(index, item)}
              tabIndex={0}
              aria-label={item.name}
            >
              <img src={item.coverImage} alt={item.name} loading={index < 2 ? 'eager' : 'lazy'} />
              <div className="expanding-cards__shade" />

              <span
                className={`expanding-cards__status expanding-cards__status--${item.status}${isActive ? ' is-open' : ' is-closed'}`}
                aria-label={item.status === 'sold-out' ? 'Esgotado' : item.statusLabel}
              >
                <i className="expanding-cards__status-dot" aria-hidden="true" />
                <em className="expanding-cards__status-label">{item.status === 'sold-out' ? 'ESGOTADO' : item.statusLabel}</em>
              </span>

              <h3 className="expanding-cards__title-collapsed">{item.name}</h3>

              <div className="expanding-cards__copy">
                <div className="expanding-cards__badges">
                  {item.badges.map((badge) => <span key={badge}>{badge}</span>)}
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button
                  type="button"
                  className="expanding-cards__detail-btn"
                  onClick={(event) => { event.stopPropagation(); onOpen(item) }}
                >
                  VER DETALHES <ArrowRight size={13} />
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
