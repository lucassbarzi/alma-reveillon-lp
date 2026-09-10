import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Plane, Car, Ship, Info, ArrowUpRight, X, Clock, MapPin, CheckCircle2 } from 'lucide-react'

interface HowToArriveModalProps {
  isOpen: boolean
  onClose: () => void
}

type TabKey = 'aviao' | 'carro' | 'salvador' | 'dicas'

export default function HowToArriveModal({ isOpen, onClose }: HowToArriveModalProps) {
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
            aria-label="Guia de Como Chegar à Ilha de Boipeba"
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
              aria-label="Fechar guia de rotas"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <header className="how-to-arrive-header">
              <span className="how-to-arrive-kicker">GUIA DE VIAGEM · BOIPEBA, BAHIA</span>
              <h2>Como Chegar <em>ao ALMA</em></h2>
              <p>
                Não entram carros na Ilha de Boipeba. A travessia pelo mar ou pelo ar já faz parte
                do ritual de desacelerar. Escolha a melhor rota para o seu ponto de partida.
              </p>
            </header>

            {/* Navigation Tabs */}
            <div className="how-to-arrive-tabs">
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'aviao' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('aviao')}
              >
                <Plane size={16} />
                <span>De Avião</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'carro' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('carro')}
              >
                <Car size={16} />
                <span>De Carro</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'salvador' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('salvador')}
              >
                <Ship size={16} />
                <span>De Salvador</span>
              </button>
              <button
                type="button"
                className={`how-to-arrive-tab ${activeTab === 'dicas' ? 'how-to-arrive-tab--active' : ''}`}
                onClick={() => setActiveTab('dicas')}
              >
                <Info size={16} />
                <span>Dicas de Ouro</span>
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
                        <h3>Opção Mais Rápida: Táxi Aéreo direto (Salvador → Boipeba)</h3>
                        <span className="how-to-arrive-badge">~25 a 30 minutos de voo</span>
                      </div>
                    </div>
                    <p>
                      Voos fretados e regulares em aeronaves bimotores partem do Aeroporto Internacional de Salvador (SSA)
                      diretamente até a pista da Fazenda Pontal (localizada em frente a Boipeba).
                    </p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span>Embarque no aeroporto de Salvador (terminal executivo / táxi aéreo).</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>Pouso na pista da Fazenda Pontal, cercada por coqueirais.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>Travessia rápida de 5 minutos de barco até o cais da vila de Boipeba.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Plane size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Voo Comercial via Aeroporto de Valença (VAL)</h3>
                        <span className="how-to-arrive-badge">Conexão comercial regional</span>
                      </div>
                    </div>
                    <p>
                      Durante a alta temporada de verão, companhias aéreas como a Azul Conecta operam voos comerciais
                      com destino ao Aeroporto de Valença (VAL).
                    </p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span>Pouso em Valença → táxi de 20 min até o terminal marítimo.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span>Lancha rápida direto para Boipeba em cerca de 50 minutos.</span>
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
                        <h3>Rota Recomendada: De Carro até Torrinhas</h3>
                        <span className="how-to-arrive-badge">Apenas 20 min de lancha rápida</span>
                      </div>
                    </div>
                    <p>
                      Se você vem de carro próprio ou alugado, o <strong>Atracadouro de Torrinhas</strong> é de longe a melhor
                      e mais curta alternativa náutica até Boipeba.
                    </p>
                    <ul className="how-to-arrive-steps">
                      <li>
                        <CheckCircle2 size={15} />
                        <span><strong>Saindo de Salvador:</strong> Ferry-boat até Bom Despacho (Itaparica) e siga pela BA-001 até o trevo de Cairu rumo a Torrinhas.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span><strong>Saindo do Sul da Bahia (Ilhéus/Itacaré):</strong> Suba pela BA-001 direto em direção a Torrinhas.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span><strong>Estacionamento seguro:</strong> Em Torrinhas existem vários estacionamentos particulares, murados e cobertos para guardar o veículo com tranquilidade.</span>
                      </li>
                      <li>
                        <CheckCircle2 size={15} />
                        <span><strong>Lancha rápida:</strong> A travessia até a vila de Boipeba leva apenas <strong>20 a 25 minutos</strong> por um rio protegido e calmo.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Car size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Alternativa: Estacionamento em Valença ou Graciosa</h3>
                        <span className="how-to-arrive-badge">~50 min de lancha rápida</span>
                      </div>
                    </div>
                    <p>
                      Você também pode estacionar no centro de Valença ou no Atracadouro da Graciosa. De lá, lanchas rápidas partem de hora em hora rumo a Boipeba (trajeto náutico de cerca de 50 minutos a 1 hora).
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'salvador' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--highlight">
                    <div className="how-to-arrive-card-header">
                      <Ship size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Semiterrestre Integrado (Opção Mais Procurada)</h3>
                        <span className="how-to-arrive-badge">Duração total: ~4h30 a 5h30</span>
                      </div>
                    </div>
                    <p>
                      É a forma mais tradicional e econômica de chegar saindo da capital. Diversas agências de turismo
                      oferecem o pacote de transfer semiterrestre completo, pegando você no aeroporto ou hotel de Salvador.
                    </p>
                    <div className="how-to-arrive-route-chain">
                      <div className="route-node">
                        <strong>1. Ferry-Boat</strong>
                        <span>Salvador → Bom Despacho (Itaparica) (~50 min)</span>
                      </div>
                      <div className="route-arrow">↓</div>
                      <div className="route-node">
                        <strong>2. Transfer Terrestre</strong>
                        <span>Van/Ônibus pela BA-001 até Valença ou Torrinhas (~2h a 2h30)</span>
                      </div>
                      <div className="route-arrow">↓</div>
                      <div className="route-node">
                        <strong>3. Lancha Rápida</strong>
                        <span>Travessia náutica final até o cais de Boipeba (~25 a 50 min)</span>
                      </div>
                    </div>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <Ship size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Via Catamarã + 4x4 (Passando por Morro de São Paulo)</h3>
                        <span className="how-to-arrive-badge">Para quem quer visitar Morro</span>
                      </div>
                    </div>
                    <p>
                      Catamarã parte do Terminal Náutico de Salvador (Mercado Modelo) até Morro de São Paulo (2h30 em mar aberto).
                      De Morro, um veículo 4x4 cruza as praias até o Rio do Inferno, onde um barquinho de 5 minutos te leva a Boipeba.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'dicas' && (
                <div className="how-to-arrive-pane">
                  <div className="how-to-arrive-card how-to-arrive-card--attention">
                    <div className="how-to-arrive-card-header">
                      <Clock size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Horário Limite das Lanchas Rápidas (Atenção!)</h3>
                        <span className="how-to-arrive-badge how-to-arrive-badge--attention">Sem navegação noturna</span>
                      </div>
                    </div>
                    <p>
                      As últimas lanchas rápidas regulares saindo de Valença e Torrinhas partem entre <strong>17h e 18h</strong>.
                      As embarcações não navegam à noite por motivos de segurança marítima.
                    </p>
                    <p className="mt-2 text-xs opacity-85">
                      <strong>Recomendação ALMA:</strong> Se o seu voo pousar em Salvador após as 12h30, reserve um transfer privativo com antecedência ou durma a primeira noite em Salvador para fazer a travessia com calma pela manhã.
                    </p>
                  </div>

                  <div className="how-to-arrive-card">
                    <div className="how-to-arrive-card-header">
                      <MapPin size={20} className="text-[#57d2f4]" />
                      <div>
                        <h3>Carregadores de Mala no Cais e Pé na Areia</h3>
                        <span className="how-to-arrive-badge">Estrutura local</span>
                      </div>
                    </div>
                    <p>
                      Como não há circulação de carros na ilha, no momento em que você desembarcar no cais de Boipeba haverá carregadores
                      credenciados com carrinhos de mão identificados. Eles transportam suas malas até qualquer pousada da vila ou Praia da Cueira.
                    </p>
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
                <span>Abrir Boipeba no Google Maps</span>
                <ArrowUpRight size={14} />
              </a>
              <button
                type="button"
                className="how-to-arrive-btn-close"
                onClick={onClose}
              >
                Entendi, fechar guia
              </button>
            </footer>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
