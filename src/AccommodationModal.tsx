import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import type { Accommodation } from './data/accommodations'
import { googleMapsSearchUrl } from './data/accommodations'

interface AccommodationModalProps {
  accommodation: Accommodation | null
  ticketsUrl: string
  onClose: () => void
}

export default function AccommodationModal({ accommodation, ticketsUrl, onClose }: AccommodationModalProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (accommodation?.images.length) {
      setActiveImage(accommodation.images[0])
    } else {
      setActiveImage(null)
    }
  }, [accommodation])

  useEffect(() => {
    if (!accommodation) return
    const previous = document.activeElement as HTMLElement | null
    const scrollY = window.scrollY
    const previousStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    }
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    requestAnimationFrame(() => closeRef.current?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab') {
        const modal = document.querySelector<HTMLElement>('.accommodation-modal')
        const focusable = Array.from(modal?.querySelectorAll<HTMLElement>('button,a[href]') ?? [])
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousStyles.overflow
      document.body.style.position = previousStyles.position
      document.body.style.top = previousStyles.top
      document.body.style.width = previousStyles.width
      window.scrollTo(0, scrollY)
      window.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [accommodation, onClose])

  if (typeof document === 'undefined') return null

  const currentVisual = activeImage || accommodation?.images[0]

  return createPortal(
    <AnimatePresence>
      {accommodation && (
        <motion.div className="accommodation-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.article
            className="accommodation-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes da hospedagem ${accommodation.name}`}
            initial={{ opacity: 0, y: 52, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: .98 }}
            transition={{ duration: .48, ease: [.22, 1, .36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button ref={closeRef} className="accommodation-modal__close" onClick={onClose} aria-label="Fechar detalhes da hospedagem"><X size={20} /></button>
            <div className="accommodation-modal__visual">
              {accommodation.images.length ? (
                <>
                  <img className="accommodation-modal__primary-image" src={currentVisual} alt={`${accommodation.name} em Boipeba`} />
                  {accommodation.images.length > 1 && (
                    <div className="accommodation-modal__thumbs">
                      {accommodation.images.slice(1).map((image, idx) => (
                        <button
                          key={image}
                          type="button"
                          className={`accommodation-modal__thumb-btn ${currentVisual === image ? 'accommodation-modal__thumb-btn--active' : ''}`}
                          onClick={() => setActiveImage(image)}
                          aria-label={`Ver foto ${idx + 2} de ${accommodation.name}`}
                        >
                          <img src={image} alt={`${accommodation.name} foto ${idx + 2}`} />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className={`accommodation-placeholder accommodation-placeholder--${accommodation.id}`}>
                  <span>ALMA · BOIPEBA</span><strong>{accommodation.name}</strong><small>{accommodation.imageTodo}</small>
                </div>
              )}
            </div>
            <div className="accommodation-modal__body">
              <div className={`accommodation-modal__status accommodation-modal__status--${accommodation.status}`}>{accommodation.statusLabel}</div>
              <div className="accommodation-badges">{accommodation.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
              <span className="accommodation-modal__period">PACOTE · {accommodation.period}</span>
              <h3>{accommodation.name}</h3>
              <p>{accommodation.description}</p>
              <div className="accommodation-modal__location"><span>LOCALIZAÇÃO</span><strong>{accommodation.location}</strong></div>
              <ul className="accommodation-amenities">{accommodation.amenities.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="accommodation-modal__actions">
                <a href={googleMapsSearchUrl(accommodation.mapsQuery)} target="_blank" rel="noreferrer">VER NO GOOGLE MAPS <ArrowUpRight size={15} /></a>
                {accommodation.status === 'available' ? <a className="accommodation-modal__primary" href={ticketsUrl} target="_blank" rel="noreferrer">VER PACOTE + HOSPEDAGEM <ArrowUpRight size={15} /></a> : <span className="accommodation-modal__sold-out">PACOTE ESGOTADO</span>}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
