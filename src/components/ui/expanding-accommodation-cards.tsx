import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import type { Accommodation } from '../../data/accommodations'

// Soft, slightly bouncy spring: mimics dynamic acceleration/deceleration
// instead of a linear/cubic-bezier ease — feels alive on hover and tap.
const CARD_SPRING = { type: 'spring', stiffness: 280, damping: 30, mass: 0.85 } as const
const TAP_SPRING = { type: 'spring', stiffness: 420, damping: 24, mass: 0.6 } as const

const GAP = 10
const ACTIVE_RATIO = 0.2325
const ACTIVE_MAX = 300
const MOBILE_OPEN_HEIGHT = 440
const MOBILE_CLOSED_HEIGHT = 72

export default function ExpandingAccommodationCards({ items, onOpen }: {
  items: Accommodation[]
  onOpen: (item: Accommodation) => void
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 900)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useLayoutEffect(() => {
    const el = listRef.current
    if (!el) return
    setContainerWidth(el.getBoundingClientRect().width)
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { activeWidth, closedWidth } = useMemo(() => {
    if (!isDesktop || !containerWidth) return { activeWidth: undefined, closedWidth: undefined }
    const active = Math.min(containerWidth * ACTIVE_RATIO, ACTIVE_MAX)
    const remaining = items.length > 1
      ? Math.max(0, (containerWidth - active - GAP * (items.length - 1)) / (items.length - 1))
      : 0
    return { activeWidth: active, closedWidth: remaining }
  }, [isDesktop, containerWidth, items.length])

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
      <ul className="expanding-cards__list" ref={listRef}>
        {items.map((item, index) => {
          const isActive = index === activeIndex
          const measured = isDesktop && activeWidth !== undefined
          const desktopAnimate = measured
            ? { width: isActive ? activeWidth : closedWidth, flexGrow: 0, height: '100%' }
            : { flexGrow: 1, flexBasis: 0, height: '100%' }
          return (
            <motion.li
              key={item.id}
              className={`expanding-cards__card${isActive ? ' is-active' : ''}`}
              data-active={isActive}
              onMouseEnter={() => isDesktop && handleActivate(index)}
              onFocus={() => isDesktop && handleActivate(index)}
              onClick={() => handleCardClick(index, item)}
              tabIndex={0}
              aria-label={item.name}
              initial={false}
              animate={isDesktop
                ? desktopAnimate
                : { height: isActive ? MOBILE_OPEN_HEIGHT : MOBILE_CLOSED_HEIGHT, width: '100%' }}
              transition={CARD_SPRING}
              whileTap={{ scale: 0.972, transition: TAP_SPRING }}
              style={{ flexShrink: 0 }}
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
            </motion.li>
          )
        })}
      </ul>
    </div>
  )
}
