import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import SilkShader from './silk-shader'
import { useLanguage } from '../../i18n/LanguageContext'

export interface StackedGalleryItem {
  src: string
  alt: string
}

function StackedSlide({ item, index, total, progress, reduceMotion }: {
  item: StackedGalleryItem
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduceMotion: boolean | null
}) {
  const intervals = Math.max(total - 1, 1)
  const start = index === 0 ? 0 : Math.max(0, (index - 0.72) / intervals)
  const end = index === 0 ? 0.01 : index / intervals
  const y = useTransform(progress, [start, end], ['100%', '0%'])

  return (
    <motion.figure
      className="stacked-gallery__slide"
      style={reduceMotion || index === 0 ? { zIndex: index + 1 } : { y, zIndex: index + 1 }}
    >
      <img src={item.src} alt={item.alt} loading={index < 2 ? 'eager' : 'lazy'} />
      <figcaption>0{index + 1} / 0{total}</figcaption>
    </motion.figure>
  )
}

export default function StackedGallery({ items }: { items: StackedGalleryItem[] }) {
  const { t } = useLanguage()
  const trackRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] })

  return (
    <section className="stacked-gallery" ref={trackRef} style={{ height: `${Math.max(items.length, 1) * 100}vh` }} aria-label={t.gallery.ariaLabel}>
      <SilkShader variant="green" />
      <div className="stacked-gallery__sticky">
        {items.map((item, index) => <StackedSlide key={item.src} item={item} index={index} total={items.length} progress={scrollYProgress} reduceMotion={reduceMotion} />)}
      </div>
    </section>
  )
}
