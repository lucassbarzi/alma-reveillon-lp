import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight, Star, CheckCircle2, Quote, Sparkles } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'

export interface ReviewItem {
  id?: string
  quote: string
  author: string
  name?: string
  role?: string
  verified?: boolean
  initials?: string
  tag?: string
  instagramUrl?: string
}

interface ReviewCarouselProps {
  items: ReviewItem[]
  kicker?: string
  titlePart1?: string
  titlePart2?: string
  intro?: string
  className?: string
}

export default function ReviewCarousel({
  items,
  kicker = 'HISTÓRIAS DE OUTRAS MARÉS',
  titlePart1 = 'O que fica',
  titlePart2 = 'depois da virada.',
  intro = 'Algumas mensagens ficam. Reunimos comentários publicados por quem viveu a energia do ALMA.',
  className = '',
}: ReviewCarouselProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const reduceMotion = useReducedMotion()

  // Drag state refs (avoids re-renders during drag)
  const isDownRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  // Update active index and scroll buttons state
  const updateScrollState = useCallback(() => {
    const rail = railRef.current
    if (!rail) return

    const scrollLeft = rail.scrollLeft
    const maxScroll = rail.scrollWidth - rail.clientWidth

    setCanScrollPrev(scrollLeft > 10)
    setCanScrollNext(scrollLeft < maxScroll - 10)

    const firstCard = rail.firstElementChild as HTMLElement | null
    if (firstCard) {
      const cardWidth = firstCard.offsetWidth + 16 // card width + gap
      const index = Math.round(scrollLeft / cardWidth)
      setActiveIndex(Math.max(0, Math.min(items.length - 1, index)))
    }
  }, [items.length])

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    updateScrollState()
    const handleScroll = () => updateScrollState()
    rail.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      rail.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [updateScrollState])

  // Programmatic smooth navigation
  const scrollToIndex = (index: number) => {
    const rail = railRef.current
    if (!rail) return
    const firstCard = rail.firstElementChild as HTMLElement | null
    const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 396
    rail.scrollTo({
      left: index * cardWidth,
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  const handlePrev = () => {
    const rail = railRef.current
    if (!rail) return
    const firstCard = rail.firstElementChild as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 16 : 396
    rail.scrollBy({ left: -step, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  const handleNext = () => {
    const rail = railRef.current
    if (!rail) return
    const firstCard = rail.firstElementChild as HTMLElement | null
    const step = firstCard ? firstCard.offsetWidth + 16 : 396
    rail.scrollBy({ left: step, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  // Mouse drag handlers for silky desktop interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    const rail = railRef.current
    if (!rail) return
    isDownRef.current = true
    setIsDragging(true)
    startXRef.current = e.pageX - rail.offsetLeft
    scrollLeftRef.current = rail.scrollLeft
    hasDraggedRef.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDownRef.current) return
    const rail = railRef.current
    if (!rail) return
    e.preventDefault()
    const x = e.pageX - rail.offsetLeft
    const walk = (x - startXRef.current) * 1.4
    if (Math.abs(walk) > 4) {
      hasDraggedRef.current = true
    }
    rail.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    if (isDownRef.current) {
      isDownRef.current = false
      setIsDragging(false)
      setTimeout(() => {
        updateScrollState()
      }, 50)
    }
  }

  const handleCardClick = (e: React.MouseEvent, handle: string) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      return
    }
    window.open(`https://www.instagram.com/${handle.replace('@', '')}/`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`review-section-wrapper ${className}`}>
      {/* Header with Title & Navigation Controls */}
      <div className="review-section-header">
        <div className="review-section-copy">
          <div className="review-header-topline">
            <span className="kicker">{kicker}</span>
            <div className="review-social-badge">
              <Sparkles size={12} className="review-social-badge__icon" />
              <span>Relatos Espontâneos</span>
            </div>
          </div>
          <h2>
            {titlePart1}
            <br />
            <em>{titlePart2}</em>
          </h2>
          <p className="stories-intro">{intro}</p>
        </div>

        {/* Controls: Counter & Prev/Next Arrow Buttons */}
        <div className="review-controls-area">
          <div className="review-nav-group">
            <span className="review-counter" aria-live="polite">
              <strong>{String(activeIndex + 1).padStart(2, '0')}</strong>
              <span className="review-counter__sep">/</span>
              <small>{String(items.length).padStart(2, '0')}</small>
            </span>

            <div className="review-nav-buttons">
              <button
                type="button"
                className={`review-nav-btn review-nav-btn--prev ${!canScrollPrev ? 'is-disabled' : ''}`}
                onClick={handlePrev}
                disabled={!canScrollPrev}
                aria-label="Depoimento anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                className={`review-nav-btn review-nav-btn--next ${!canScrollNext ? 'is-disabled' : ''}`}
                onClick={handleNext}
                disabled={!canScrollNext}
                aria-label="Próximo depoimento"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-bleed Carousel Rail */}
      <div
        ref={railRef}
        className={`review-carousel ${isDragging ? 'is-dragging' : ''}`}
        aria-label="Carrossel de depoimentos do ALMA Réveillon"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {items.map((item, index) => {
          const initials = item.initials || item.author.slice(0, 2).toUpperCase()
          const displayName = item.name || `@${item.author}`
          const isVerified = item.verified ?? false
          const role = item.role || 'Convidado ALMA'
          const tag = item.tag || 'Boipeba'

          return (
            <article
              key={`${item.author}-${index}`}
              className="review-carousel-card"
              onClick={(e) => handleCardClick(e, item.author)}
              title={`Ver @${item.author} no Instagram`}
            >
              {/* Background watermark quote icon */}
              <Quote className="review-card__watermark" aria-hidden="true" />

              {/* Card Header: Author info & Instagram Badge */}
              <div className="review-card__header">
                <div className="review-card__author-info">
                  <div className="review-card__avatar" aria-hidden="true">
                    <span>{initials}</span>
                  </div>

                  <div className="review-card__identity">
                    <div className="review-card__name-row">
                      <strong className="review-card__name">{displayName}</strong>
                      {isVerified && (
                        <CheckCircle2
                          size={14}
                          className="review-card__verified"
                          aria-label="Perfil verificado"
                        />
                      )}
                    </div>
                    <span className="review-card__handle">@{item.author}</span>
                  </div>
                </div>

                <div className="review-card__source-badge">
                  <FaInstagram size={14} />
                  <span>Instagram</span>
                </div>
              </div>

              {/* Stars & Quote Body */}
              <div className="review-card__body">
                <div className="review-card__stars" aria-label="Avaliação 5 estrelas">
                  {[...Array(5)].map((_, starIndex) => (
                    <Star key={starIndex} size={14} className="review-star" />
                  ))}
                </div>

                <blockquote className="review-card__quote">
                  “{item.quote}”
                </blockquote>
              </div>

              {/* Card Footer: Role & Location Tag */}
              <div className="review-card__footer">
                <span className="review-card__role">{role}</span>
                <span className="review-card__tag">
                  <span className="review-card__tag-pulse" />
                  {tag}
                </span>
              </div>
            </article>
          )
        })}
      </div>

      {/* Interactive Pagination Dots (Desktop & Mobile) */}
      <div className="review-dots-container" role="tablist" aria-label="Navegar pelos depoimentos">
        {items.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            role="tab"
            aria-selected={activeIndex === dotIndex}
            aria-label={`Ir para depoimento ${dotIndex + 1} de ${items.length}`}
            className={`review-dot ${activeIndex === dotIndex ? 'is-active' : ''}`}
            onClick={() => scrollToIndex(dotIndex)}
          />
        ))}
      </div>
    </div>
  )
}
