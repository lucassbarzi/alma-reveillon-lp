import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

function NoticeReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return <motion.article initial={reduce ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.article>
}

export default function ImportantNotices({ ticketsUrl, instagramUrl }: { ticketsUrl: string; instagramUrl: string }) {
  return (
    <section className="notices-section" id="avisos">
      <div className="notices-hero">
        <motion.span className="kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>ANTES DE FECHAR O PACOTE</motion.span>
        <motion.h2 initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .9, ease: [.22, 1, .36, 1] }}>OPEN BAR, SIM.<br /><em>OPEN FOOD, NÃO.</em></motion.h2>
        <p>Open Bar Premium em todas as festas.<br />Comidas e lanches são vendidos separadamente na nossa praça gastronômica.</p>
      </div>
      <div className="notices-grid">
        <NoticeReveal><span>01</span><h3>CHEGA DIA 28 OU 29?</h3><p>Comprou o Full Pass? Sem stress. Seu kit de acesso ficará reservado em seu nome até o dia da sua chegada.</p></NoticeReveal>
        <NoticeReveal delay={.06}><span>02</span><h3>PAGAMENTO</h3><div className="notice-payment"><strong>PIX À VISTA</strong><p>10% OFF da taxa.</p><p>Pagamento único: 1 pessoa realiza o PIX no valor total do grupo/quarto.</p><strong>CARTÃO DE CRÉDITO</strong><p>Via Sympla.</p><p>Para grupos de 2–5 pessoas, cada integrante pode passar seu cartão no mesmo dia para garantir seu ingresso e sua vaga no quarto escolhido.</p></div></NoticeReveal>
        <NoticeReveal delay={.12}><span>03</span><h3>CANAIS OFICIAIS</h3><dl><div><dt>INSTAGRAM</dt><dd>@almareveillonboipeba</dd></div><div><dt>E-MAIL</dt><dd>falacomigo@almareveillon.com.br</dd></div><div><dt>SYMPLA</dt><dd>Somente através do link oficial.</dd></div></dl><div className="notice-links"><a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM <ArrowUpRight size={14} /></a><a href={ticketsUrl} target="_blank" rel="noreferrer">SYMPLA <ArrowUpRight size={14} /></a></div></NoticeReveal>
        <NoticeReveal delay={.18}><span>04</span><h3>SEGURANÇA</h3><p>Utilize apenas os canais oficiais do ALMA.</p><p>Foi seguido por um perfil falso? Denuncie.</p><p>Sua ajuda é fundamental para proteger a comunidade ALMA.</p></NoticeReveal>
      </div>
    </section>
  )
}
