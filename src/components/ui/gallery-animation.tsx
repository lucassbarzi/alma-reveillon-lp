import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface GalleryItem {
  image: string
  title: string
  subtitle: string
  alt: string
}

interface ExpandableGalleryProps {
  items: GalleryItem[]
  className?: string
}

export default function ExpandableGallery({ items, className = '' }: ExpandableGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (selectedIndex === null) { triggerRef.current?.focus(); return }
    triggerRef.current = document.activeElement as HTMLElement | null
    requestAnimationFrame(() => closeRef.current?.focus())
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % items.length)
      if (event.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
      if (event.key === 'Tab') {
        const focusables = Array.from(document.querySelectorAll<HTMLElement>('.gallery-modal button'))
        if (!focusables.length) return
        const first = focusables[0], last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selectedIndex, items.length])

  const flexValue = (index: number) => hoveredIndex === null ? 1 : hoveredIndex === index ? 1.75 : .72
  const move = (step: number) => setSelectedIndex(current => current === null ? null : (current + step + items.length) % items.length)

  return <div className={`expandable-gallery ${className}`}>
    <div className="expandable-gallery__rail">
      {items.map((item, index) => <motion.button
        type="button"
        key={item.image}
        className="expandable-gallery__card"
        style={{ flex: 1 }}
        animate={reduceMotion ? undefined : { flex: flexValue(index) }}
        transition={{ duration: .65, ease: [.22, 1, .36, 1] }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onFocus={() => setHoveredIndex(index)}
        onBlur={() => setHoveredIndex(null)}
        onClick={() => setSelectedIndex(index)}
        aria-label={`Abrir imagem: ${item.title}`}
      >
        <img src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} />
        <motion.span className="expandable-gallery__shade" animate={{ opacity: hoveredIndex === index ? .34 : .62 }} transition={{ duration: .45 }} />
        <span className="expandable-gallery__number">0{index + 1}</span>
        <span className="expandable-gallery__copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
      </motion.button>)}
    </div>

    <AnimatePresence>
      {selectedIndex !== null && <motion.div className="gallery-modal" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${items[selectedIndex].title}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedIndex(null)}>
        <button ref={closeRef} className="gallery-modal__close" onClick={() => setSelectedIndex(null)} aria-label="Fechar galeria"><X /></button>
        {items.length > 1 && <button className="gallery-modal__prev" onClick={event => { event.stopPropagation(); move(-1) }} aria-label="Imagem anterior"><ChevronLeft /></button>}
        <motion.figure key={selectedIndex} initial={reduceMotion ? false : { opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .98 }} transition={{ duration: .45, ease: [.22, 1, .36, 1] }} onClick={event => event.stopPropagation()}>
          <img src={items[selectedIndex].image} alt={items[selectedIndex].alt}/>
          <figcaption><strong>{items[selectedIndex].title}</strong><span>{items[selectedIndex].subtitle}</span></figcaption>
        </motion.figure>
        {items.length > 1 && <button className="gallery-modal__next" onClick={event => { event.stopPropagation(); move(1) }} aria-label="Próxima imagem"><ChevronRight /></button>}
        <span className="gallery-modal__counter">{selectedIndex + 1} / {items.length}</span>
      </motion.div>}
    </AnimatePresence>
  </div>
}
