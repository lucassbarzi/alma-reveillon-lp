import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { LiquidCard } from './components/ui/liquid-glass-card'
import { Button } from './components/ui/button'

function NoticeReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.article
      className={className}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.article>
  )
}

export default function ImportantNotices({ ticketsUrl, instagramUrl }: { ticketsUrl: string; instagramUrl: string }) {
  const bgArrival = `${import.meta.env.BASE_URL}media/curadoria/card-dia-lancha.webp`
  const imgPass = `${import.meta.env.BASE_URL}media/after.jpg`

  return (
    <section className="notices-section" id="avisos">
      <div className="notices-hero">
        <motion.span className="kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          ANTES DE FECHAR O PACOTE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          OPEN BAR, SIM.<br />
          <em>OPEN FOOD, NÃO.</em>
        </motion.h2>
        <p>Open Bar Premium em todas as festas. Comidas e lanches são vendidos separadamente na nossa praça gastronômica.</p>
      </div>
      <div className="notices-grid">
        <NoticeReveal className="notice-card--liquid">
          <LiquidCard className="w-full h-full p-2">
            <div className="notice-liquid-inner">
              <img
                src={bgArrival}
                alt="Travessia para Boipeba"
                className="notice-liquid-bg"
                loading="lazy"
              />

              <div className="notice-liquid-floating">
                <div className="relative">
                  <img
                    src={imgPass}
                    alt="Kit Full Pass Alma"
                    className="h-[120px] w-[120px] sm:h-[135px] sm:w-[135px] rounded-2xl border-2 border-white/50 object-cover shadow-2xl transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#071c27]/90 backdrop-blur-md px-2.5 py-0.5 border border-[#57d2f4]/40 shadow-lg flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-[#57d2f4]" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white">Full Pass</span>
                  </div>
                </div>
              </div>

              <div className="notice-liquid-overlay">
                <span className="notice-liquid-badge">01</span>
                <h3 className="notice-liquid-title">CHEGA DIA 28 OU 29?</h3>
                <p className="notice-liquid-desc">
                  Comprou o Full Pass? Sem stress. Seu kit de acesso ficará reservado em seu nome até o dia da sua chegada.
                </p>
                <div className="notice-liquid-action">
                  <Button className="notice-liquid-btn">
                    Kit Garantido
                  </Button>
                  <span className="notice-liquid-sub">Retirada no credenciamento</span>
                </div>
              </div>
            </div>
          </LiquidCard>
        </NoticeReveal>
        <NoticeReveal delay={.06}><span>02</span><h3>PAGAMENTO</h3><div className="notice-payment"><strong>PIX À VISTA</strong><p>10% OFF da taxa.</p><p>Pagamento único: 1 pessoa realiza o PIX no valor total do grupo/quarto.</p><strong>CARTÃO DE CRÉDITO</strong><p>Via Sympla.</p><p>Para grupos de 2–5 pessoas, cada integrante pode passar seu cartão no mesmo dia para garantir seu ingresso e sua vaga no quarto escolhido.</p></div></NoticeReveal>
        <NoticeReveal delay={.12}><span>03</span><h3>CANAIS OFICIAIS</h3><dl><div><dt>INSTAGRAM</dt><dd>@almareveillonboipeba</dd></div><div><dt>E-MAIL</dt><dd>falacomigo@almareveillon.com.br</dd></div><div><dt>SYMPLA</dt><dd>Somente através do link oficial.</dd></div></dl><div className="notice-links"><a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={14} /></a><a href={ticketsUrl} target="_blank" rel="noreferrer">SYMPLA <ArrowUpRight size={14} /></a></div></NoticeReveal>
        <NoticeReveal delay={.18}><span>04</span><h3>SEGURANÇA</h3><p>Utilize apenas os canais oficiais do ALMA.</p><p>Foi seguido por um perfil falso? Denuncie.</p><p>Sua ajuda é fundamental para proteger a comunidade ALMA.</p></NoticeReveal>
      </div>
    </section>
  )
}
