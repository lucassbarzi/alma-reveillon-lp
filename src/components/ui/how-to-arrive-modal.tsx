import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Plane, Car, Ship, Info, ArrowUpRight, X, Clock, MapPin, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'

interface HowToArriveModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabKey = 'aviao' | 'carro' | 'salvador' | 'dicas'

export default function HowToArriveModal({ isOpen, onClose }: HowToArriveModalProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<TabKey>('aviao')
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previous = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previous?.focus()
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  const h = t.howToArrive

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="how-to-arrive-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="how-to-arrive-modal"
            role="dialog"
            aria-modal="true"
            aria-label={h.ariaDialog}
            initial={{ opacity: 0, y: 45, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              className="how-to-arrive-close"
              onClick={onClose}
              aria-label={h.ariaClose}
            >
              <X size={20} />
            </button>

            {/* Header */}
            <header className="how-to-arrive-header">
              <span className="how-to-arrive-kicker">{h.kicker}</span>
              <h2>{h.h2Part1}<em>{h.h2Part2}</em></h2>
              <p>{h.intro}</p>
            </header>

            {/* Navigation Tabs */}
            <div className="how-to-arrive-tabs">
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'aviao' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('aviao')}
              >
                <Plane size={16} />
                <span>{h.tabs.plane}</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'carro' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('carro')}
              >
                <Car size={16} />
                <span>{h.tabs.car}</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'salvador' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('salvador')}
              >
                <Ship size={16} />
                <span>{h.tabs.salvador}</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'dicas' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('dicas')}
              >
                <Info size={16} />
                <span>{h.tabs.tips}</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="how-to-arrive-body">
              {activeTab === 'aviao' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--highlight">
                    <div className="how-to-arrive-card-header">
                      <Plane size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.plane.card1Title}</h3>
                        <span className="how-to-arrive-badge">{h.plane.card1Badge}</span>
                      </div>
                    </div>
                    <p>{h.plane.card1P}</p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.plane.card1Step1}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.plane.card1Step2}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.plane.card1Step3}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Plane size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.plane.card2Title}</h3>
                        <span className="how-to-arrive-badge">{h.plane.card2Badge}</span>
                      </div>
                    </div>
                    <p>{h.plane.card2P}</p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.plane.card2Step1}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.plane.card2Step2}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'carro' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--highlight">
                    <div className="how-to-arrive-card-header">
                      <Car size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.car.card1Title}</h3>
                        <span className="how-to-arrive-badge">{h.car.card1Badge}</span>
                      </div>
                    </div>
                    <p>{h.car.card1P}</p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.car.card1Step1}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.car.card1Step2}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.car.card1Step3}</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>{h.car.card1Step4}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Car size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.car.card2Title}</h3>
                        <span className="how-to-arrive-badge">{h.car.card2Badge}</span>
                      </div>
                    </div>
                    <p>{h.car.card2P}</p>
                  </div>
                </div>
              )}

              {activeTab === 'salvador' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--highlight">
                    <div className="how-to-arrive-card-header">
                      <Ship size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.salvador.card1Title}</h3>
                        <span className="how-to-arrive-badge">{h.salvador.card1Badge}</span>
                      </div>
                    </div>
                    <p>{h.salvador.card1P}</p>
                    <div className="how-to-arrive-route-chain">
                      <div className="route-node">
                        <strong>{h.salvador.node1Title}</strong>
                        <span>{h.salvador.node1Desc}</span>
                      </div>
                      <div className="route-arrow">↓</div>
                      <div className="route-node">
                        <strong>{h.salvador.node2Title}</strong>
                        <span>{h.salvador.node2Desc}</span>
                      </div>
                      <div className="route-arrow">↓</div>
                      <div className="route-node">
                        <strong>{h.salvador.node3Title}</strong>
                        <span>{h.salvador.node3Desc}</span>
                      </div>
                    </div>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Ship size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.salvador.card2Title}</h3>
                        <span className="how-to-arrive-badge">{h.salvador.card2Badge}</span>
                      </div>
                    </div>
                    <p>{h.salvador.card2P}</p>
                  </div>
                </div>
              )}

              {activeTab === 'dicas' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--attention">
                    <div className="how-to-arrive-card-header">
                      <Clock size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.tips.card1Title}</h3>
                        <span className="how-to-arrive-badge how-to-arrive-badge--attention">{h.tips.card1Badge}</span>
                      </div>
                    </div>
                    <p>{h.tips.card1P1}</p>
                    <p className="mt-2 text-xs opacity-85">
                      <strong>ALMA: </strong>{h.tips.card1Recommendation}
                    </p>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <MapPin size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>{h.tips.card2Title}</h3>
                        <span className="how-to-arrive-badge">{h.tips.card2Badge}</span>
                      </div>
                    </div>
                    <p>{h.tips.card2P}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <footer className="how-to-arrive-footer">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Praia+da+Cueira,+Boipeba,+BA"
                target="_blank"
                rel="noreferrer"
                className="how-to-arrive-btn-maps"
              >
                <MapPin size={15} />
                <span>{h.btnMaps}</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="how-to-arrive-btn-close"
                onClick={onClose}
              >
                {h.btnClose}
              </button>
            </footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
