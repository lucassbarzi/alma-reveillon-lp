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
      bg: 'linear-gradient(165deg, rgba(13, 40, 54, 0.82) 0%, rgba(6, 23, 34, 0.88) 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            {n.card1.text}
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(87,210,244,0.12)', border: '1px solid rgba(87,210,244,0.28)', padding: '7px 12px', borderRadius: '999px', width: 'fit-content' }}>
            <CheckCircle2 size={13} style={{ color: '#57d2f4' }} />
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#57d2f4' }}>
              {n.card1.badge}
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: n.card2.title,
      bg: 'linear-gradient(165deg, rgba(16, 67, 89, 0.86) 0%, rgba(6, 29, 43, 0.92) 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#57d2f4', textTransform: 'uppercase' }}>{n.card2.pixTitle}</strong>
              <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: 'rgba(87,210,244,0.15)', color: '#57d2f4', border: '1px solid rgba(87,210,244,0.3)' }}>{n.card2.pixDiscount}</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', margin: 0, textWrap: 'balance' }}>
              {n.card2.pixDesc}
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
            <strong style={{ display: 'block', fontSize: '11px', letterSpacing: '0.16em', color: '#57d2f4', textTransform: 'uppercase', marginBottom: '4px' }}>{n.card2.ccTitle}</strong>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', margin: 0, textWrap: 'balance' }}>
              {n.card2.ccDesc}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: n.card3.title,
      bg: 'linear-gradient(165deg, rgba(19, 46, 64, 0.82) 0%, rgba(8, 26, 38, 0.88) 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.instagramLabel}</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>@almareveillonboipeba</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.emailLabel}</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>falacomigo@almareveillon.com.br</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>{n.card3.symplaLabel}</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>{n.card3.symplaText}</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 13px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.12em', color: '#fff', textDecoration: 'none' }}
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '7px 13px', borderRadius: '999px', background: '#57d2f4', color: '#04151f', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none' }}
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
      bg: 'linear-gradient(165deg, rgba(24, 38, 47, 0.82) 0%, rgba(11, 21, 27, 0.88) 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            {n.card4.p1}
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            {n.card4.p2}
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            {n.card4.p3}
          </p>
          <div style={{ marginTop: '6px', padding: '7px 12px', borderRadius: '8px', background: 'rgba(87,210,244,0.08)', border: '1px solid rgba(87,210,244,0.24)' }}>
            <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d7f3fa' }}>
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
          background: 'radial-gradient(ellipse at 50% 30%, rgba(11, 82, 104, 0.64) 0%, rgba(7, 47, 63, 0.88) 65%, rgba(4, 25, 36, 0.97) 100%)',
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
