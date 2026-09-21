import { motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import HoverStack, { type HoverStackCard } from './components/ui/hover-stack'
import SilkShader from './components/ui/silk-shader'
import { useLanguage } from './i18n/LanguageContext'
import { trackTicketClick } from './lib/tracking'

export default function ImportantNotices({ ticketsUrl, instagramUrl }: { ticketsUrl: string; instagramUrl: string }) {
  const { t, language } = useLanguage()

  const n = t.notices

  const noticeCards: HoverStackCard[] = [
    {
      id: 1,
      title: n.card1.title,
      bg: 'linear-gradient(165deg, rgba(var(--alma-ocean-rgb),0.82) 0%, rgba(var(--alma-ocean-rgb),0.88) 100%)',
      borderColor: 'rgba(var(--alma-sand-light-rgb),0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '185px', gap: '14px' }}>
          <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
            {n.card1.text}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(var(--alma-sand-light-rgb),0.12)', border: '1px solid rgba(var(--alma-sand-light-rgb),0.28)', padding: '7px 12px', borderRadius: '999px', width: 'fit-content', marginTop: 'auto' }}>
            <CheckCircle2 size={13} style={{ color: 'var(--alma-sand-light)' }} />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--alma-sand-light)' }}>
              {n.card1.badge}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: n.card2.title,
      bg: 'linear-gradient(165deg, rgba(var(--alma-ocean-rgb),0.86) 0%, rgba(var(--alma-ocean-rgb),0.92) 100%)',
      borderColor: 'rgba(var(--alma-sand-light-rgb),0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '185px', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong style={{ fontSize: '10.5px', letterSpacing: '0.16em', color: 'var(--alma-sand-light)', textTransform: 'uppercase' }}>{n.card2.pixTitle}</strong>
              <span style={{ fontSize: '8.5px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: 'rgba(var(--alma-sand-light-rgb),0.15)', color: 'var(--alma-sand-light)', border: '1px solid rgba(var(--alma-sand-light-rgb),0.3)' }}>{n.card2.pixDiscount}</span>
            </div>
            <p style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
              {n.card2.pixDesc}
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(var(--alma-sand-light-rgb),0.1)', paddingTop: '8px', marginTop: 'auto' }}>
            <strong style={{ display: 'block', fontSize: '10.5px', letterSpacing: '0.16em', color: 'var(--alma-sand-light)', textTransform: 'uppercase', marginBottom: '3px' }}>{n.card2.ccTitle}</strong>
            <p style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
              {n.card2.ccDesc}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: n.card3.title,
      bg: 'linear-gradient(165deg, rgba(var(--alma-ocean-rgb),0.82) 0%, rgba(var(--alma-ocean-rgb),0.88) 100%)',
      borderColor: 'rgba(var(--alma-sand-light-rgb),0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '185px', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'var(--alma-sand-light)', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.instagramLabel}</span>
              <span style={{ fontSize: '12.5px', color: 'var(--alma-sand-light)' }}>@almareveillonboipeba</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'var(--alma-sand-light)', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.emailLabel}</span>
              <span style={{ fontSize: '12.5px', color: 'var(--alma-sand-light)' }}>falacomigo@almareveillon.com.br</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'var(--alma-sand-light)', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.symplaLabel}</span>
              <span style={{ fontSize: '12.5px', color: 'var(--alma-sand-light)' }}>{n.card3.symplaText}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', flexWrap: 'wrap' }}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(var(--alma-sand-light-rgb),0.08)', border: '1px solid rgba(var(--alma-sand-light-rgb),0.2)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--alma-sand-light)', textDecoration: 'none' }}
            >
              {n.card3.instagramBtn} <ArrowUpRight size={12} />
            </a>
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => {
                trackTicketClick({
                  ctaLocation: 'notices_card_sympla_btn',
                  ctaText: n.card3.symplaBtn,
                  destinationUrl: ticketsUrl,
                  language,
                })
              }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '6px 12px', borderRadius: '999px', background: 'var(--alma-sand-light)', color: 'var(--alma-ocean)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none' }}
            >
              {n.card3.symplaBtn} <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: n.card4.title,
      bg: 'linear-gradient(165deg, rgba(var(--alma-ocean-rgb),0.82) 0%, rgba(var(--alma-ocean-rgb),0.88) 100%)',
      borderColor: 'rgba(var(--alma-sand-light-rgb),0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', minHeight: '185px', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            <p style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
              {n.card4.p1}
            </p>
            <p style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
              {n.card4.p2}
            </p>
            <p style={{ fontSize: '12.5px', lineHeight: 1.45, color: 'var(--alma-sand-light)', margin: 0, textWrap: 'balance' }}>
              {n.card4.p3}
            </p>
          </div>
          <div style={{ marginTop: 'auto', padding: '6px 12px', borderRadius: '8px', background: 'rgba(var(--alma-sand-light-rgb),0.08)', border: '1px solid rgba(var(--alma-sand-light-rgb),0.24)', width: 'fit-content' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--alma-sand-light)' }}>
              {n.card4.badge}
            </span>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="notices-section" id="avisos">
      <SilkShader variant="ice-aqua" />
      <div
        className="shader-bg-overlay"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(var(--alma-ocean-rgb),0.64) 0%, rgba(var(--alma-ocean-rgb),0.88) 65%, rgba(var(--alma-ocean-rgb),0.97) 100%)',
        }}
      />
      <div className="shader-content-layer" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div className="notices-hero">
          <motion.span className="kicker" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {n.kicker}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {n.h2Part1}<br />
            <em>{n.h2Part2}</em>
          </motion.h2>
          <p>{n.subtitle}</p>
        </div>

        <div className="notices-stack-wrap">
          <HoverStack cards={noticeCards} />
        </div>
      </div>
    </section>
  )
}
