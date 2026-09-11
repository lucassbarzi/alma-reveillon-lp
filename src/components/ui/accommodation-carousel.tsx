import { useEffect, useMemo, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { Accommodation } from '../../data/accommodations'
import { googleMapsSearchUrl } from '../../data/accommodations'

interface CarouselConfig {
  distanceDivisor: number
  velocityDivisor: number
  sensitivity: number
  xMultiplier: number
  yMultiplier: number
  rotationMultiplier: number
  scaleReduction: number
}

const getConfig = (width: number): CarouselConfig => {
  if (width < 640) return { distanceDivisor: 120, velocityDivisor: 500, sensitivity: 180, xMultiplier: 86, yMultiplier: 13, rotationMultiplier: 7, scaleReduction: .055 }
  if (width < 1024) return { distanceDivisor: 160, velocityDivisor: 650, sensitivity: 220, xMultiplier: 108, yMultiplier: 20, rotationMultiplier: 8, scaleReduction: .075 }
  return { distanceDivisor: 200, velocityDivisor: 800, sensitivity: 250, xMultiplier: 125, yMultiplier: 20, rotationMultiplier: 9, scaleReduction: .08 }
}

const wrap = (value: number, total: number) => ((value % total) + total) % total

function CarouselCard({ item, index, total, progress, config, activeIndex }: {
  item: Accommodation
  index: number
  total: number
  progress: MotionValue<number>
  config: CarouselConfig
  activeIndex: number
}) {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return diff
  })
  const x = useTransform(offset, (o) => o * config.xMultiplier)
  const rotate = useTransform(offset, (o) => Math.abs(o) < .05 ? 0 : o * config.rotationMultiplier)
  const y = useTransform(offset, (o) => Math.abs(o) < .05 ? 0 : Math.abs(o) * config.yMultiplier)
  const scale = useTransform(offset, (o) => 1 - Math.abs(o) * config.scaleReduction)
  const opacity = useTransform(offset, [-total / 2, -total / 2 + .5, 0, total / 2 - .5, total / 2], [0, 1, 1, 1, 0])
  const zIndex = useTransform(offset, (o) => Math.round(100 - Math.abs(o) * 10))
  const shadeOpacity = useTransform(offset, [-2, -.5, 0, .5, 2], [.72, .35, .08, .35, .72])
  const copyOpacity = useTransform(offset, [-.5, 0, .5], [0, 1, 0])

  return (
    <motion.article
      className={`lodging-carousel-card lodging-carousel-card--${item.status}`}
      style={{ x, rotate, y, scale, opacity, zIndex }}
      aria-hidden={activeIndex !== index}
      aria-roledescription="slide"
    >
      <img src={item.images[0]} alt={item.name} loading={index < 3 ? 'eager' : 'lazy'} />
      <motion.div className="lodging-carousel-card__shade" style={{ opacity: shadeOpacity }} />
      <div className="lodging-carousel-card__gradient" />
      <div className={`lodging-status lodging-status--${item.status}`}>
        {item.status === 'sold-out' ? <><i />ESGOTADO</> : item.statusLabel}
      </div>
      <motion.div className="lodging-carousel-card__copy" style={{ opacity: copyOpacity }}>
        <div>{item.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </motion.div>
    </motion.article>
  )
}

export default function AccommodationCarousel({ items, onOpen }: {
  items: Accommodation[]
  onOpen: (item: Accommodation) => void
}) {
  const progress = useMotionValue(0)
  const startProgress = useRef(0)
  const didDrag = useRef(false)
  const [width, setWidth] = useState(typeof window === 'undefined' ? 1200 : window.innerWidth)
  const [activeIndex, setActiveIndex] = useState(0)
  const config = useMemo(() => getConfig(width), [width])
  const active = items[activeIndex]

  useEffect(() => {
    const resize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  const moveTo = (target: number, index: number) => {
    animate(progress, target, { type: 'spring', stiffness: 220, damping: 30, mass: 1 })
    setActiveIndex(index)
  }

  const go = (direction: number) => {
    const target = Math.round(progress.get()) + direction
    moveTo(target, wrap(target, items.length))
  }

  const goTo = (index: number) => {
    const current = Math.round(progress.get())
    let delta = index - wrap(current, items.length)
    if (delta > items.length / 2) delta -= items.length
    if (delta < -items.length / 2) delta += items.length
    moveTo(current + delta, index)
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const distance = -info.offset.x / config.distanceDivisor
    const velocity = -info.velocity.x / config.velocityDivisor
    let shift = Math.round(distance + velocity)
    if (shift === 0 && Math.abs(info.offset.x) > 35) shift = info.offset.x < 0 ? 1 : -1
    shift = Math.max(-3, Math.min(3, shift))
    const target = Math.round(startProgress.current) + shift
    moveTo(target, wrap(target, items.length))
  }

  return (
    <div className="lodging-carousel" role="region" aria-roledescription="carousel" aria-label="Hospedagens ALMA">
      <div className="lodging-carousel__stage">
        <motion.div
          className="lodging-carousel__drag"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onPointerDown={() => { didDrag.current = false }}
          onDragStart={() => { startProgress.current = progress.get() }}
          onDrag={(_, info) => {
            if (Math.abs(info.offset.x) > 8) didDrag.current = true
            progress.set(progress.get() - info.delta.x / config.sensitivity)
          }}
          onDragEnd={handleDragEnd}
          onTap={() => { if (!didDrag.current) onOpen(active) }}
          tabIndex={0}
          role="button"
          aria-label={`Abrir detalhes de ${active.name}. Arraste para navegar.`}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') go(1)
            if (event.key === 'ArrowLeft') go(-1)
            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onOpen(active) }
          }}
        />
        {items.map((item, index) => (
          <CarouselCard key={item.id} item={item} index={index} total={items.length} progress={progress} config={config} activeIndex={activeIndex} />
        ))}
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
