import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

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
  const reduceMotion = useReducedMotion()

  const flexValue = (index: number) => hoveredIndex === null ? 1 : hoveredIndex === index ? 1.75 : .72

  return <div className={`expandable-gallery ${className}`}>
    <div className="expandable-gallery__rail">
      {items.map((item, index) => <motion.article
        key={item.image}
        className="expandable-gallery__card"
        style={{ flex: 1 }}
        animate={reduceMotion ? undefined : { flex: flexValue(index) }}
        transition={{ duration: .65, ease: [.22, 1, .36, 1] }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <img src={item.image} alt={item.alt} loading={index === 0 ? 'eager' : 'lazy'} />
        <motion.span className="expandable-gallery__shade" animate={{ opacity: hoveredIndex === index ? .18 : .42 }} transition={{ duration: .45 }} />
        <span className="expandable-gallery__number">0{index + 1}</span>
        <span className="expandable-gallery__copy"><strong>{item.title}</strong><small>{item.subtitle}</small></span>
      </motion.article>)}
    </div>
  </div>
}
