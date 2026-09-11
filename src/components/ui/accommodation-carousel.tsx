import { useCallback, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Accommodation } from '../../data/accommodations'
import { googleMapsSearchUrl } from '../../data/accommodations'
import { CircularGallery, type CircularGalleryHandle } from './circular-gallery-2'

const wrap = (value: number, total: number) => ((value % total) + total) % total

export default function AccommodationCarousel({ items, onOpen }: {
  items: Accommodation[]
  onOpen: (item: Accommodation) => void
}) {
  const galleryRef = useRef<CircularGalleryHandle>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [webglFailed, setWebglFailed] = useState(false)
  const active = items[activeIndex]
  const galleryItems = useMemo(() => items.map((item) => ({ image: item.coverImage, text: item.name })), [items])
  const handleIndex = useCallback((index: number) => setActiveIndex(index), [])
  const handleSelect = useCallback((index: number) => onOpen(items[index]), [items, onOpen])
  const handleFallback = useCallback(() => setWebglFailed(true), [])
  const go = useCallback((direction: number) => {
    const index = wrap(activeIndex + direction, items.length)
    setActiveIndex(index)
    if (!webglFailed) direction > 0 ? galleryRef.current?.next() : galleryRef.current?.previous()
  }, [activeIndex, items.length, webglFailed])
  const goTo = useCallback((index: number) => {
    setActiveIndex(index)
    if (!webglFailed) galleryRef.current?.goTo(index)
  }, [webglFailed])

  return (
    <div className={`lodging-carousel lodging-carousel--ogl ${webglFailed ? 'lodging-carousel--fallback' : ''}`} role="region" aria-roledescription="carousel" aria-label="Hospedagens ALMA">
      <div className="lodging-ogl-stage">
        {webglFailed ? (
          <button className="lodging-webgl-fallback" onClick={() => onOpen(active)} aria-label={`Abrir detalhes de ${active.name}`}>
            <img src={active.coverImage} alt={active.name} />
          </button>
        ) : (
          <CircularGallery ref={galleryRef} items={galleryItems} bend={2.8} borderRadius={.045} scrollSpeed={2} scrollEase={.075} onIndexChange={handleIndex} onItemSelect={handleSelect} overlayRef={overlayRef} onFallback={handleFallback} />
        )}
        <div ref={overlayRef} className="lodging-ogl-active" aria-live="polite">
          <div className={`lodging-status lodging-status--${active.status}`}>{active.status === 'sold-out' ? <><i /> ESGOTADO</> : active.statusLabel}</div>
          <div className="lodging-ogl-active__badges">{active.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
        </div>
      </div>

      <div className="lodging-carousel__meta">
        <div className="lodging-carousel__count-wrap">
          <div className="lodging-carousel__count"><strong>{String(activeIndex + 1).padStart(2, '0')}</strong><span>/ {String(items.length).padStart(2, '0')}</span></div>
          <span className={`lodging-meta-status lodging-meta-status--${active.status}`}>{active.status === 'sold-out' ? 'ESGOTADO' : active.statusLabel}</span>
        </div>
        <div className="lodging-carousel__actions">
          <button onClick={() => go(-1)} aria-label="Hospedagem anterior"><ArrowLeft size={17} /></button>
          <button onClick={() => go(1)} aria-label="Próxima hospedagem"><ArrowRight size={17} /></button>
        </div>
        <div className="lodging-carousel__links">
          <button onClick={() => onOpen(active)}>VER DETALHES <ArrowRight size={14} /></button>
          <a href={googleMapsSearchUrl(active.mapsQuery)} target="_blank" rel="noreferrer">LOCALIZAÇÃO <ArrowUpRight size={14} /></a>
        </div>
      </div>

      <div className="lodging-carousel__dots">
        {items.map((item, index) => <button key={item.id} className={activeIndex === index ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={`Ver ${item.name}`} />)}
      </div>
    </div>
  )
}
