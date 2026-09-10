import { motion } from 'motion/react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import HoverStack, { type HoverStackCard } from './components/ui/hover-stack'

export default function ImportantNotices({ ticketsUrl, instagramUrl }: { ticketsUrl: string; instagramUrl: string }) {
  const noticeCards: HoverStackCard[] = [
    {
      id: 1,
      tag: '01 · CHEGADA',
      title: 'CHEGA DIA 28 OU 29?',
      bg: 'linear-gradient(165deg, #0d2836 0%, #061722 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      footerLabel: 'Full Pass',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            Comprou o Full Pass? Sem stress. Seu kit de acesso ficará reservado em seu nome até o dia da sua chegada.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(87,210,244,0.12)', border: '1px solid rgba(87,210,244,0.28)', padding: '7px 12px', borderRadius: '999px', width: 'fit-content' }}>
            <CheckCircle2 size={13} style={{ color: '#57d2f4' }} />
            <span style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#57d2f4' }}>
              Kit Reservado Garantido
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      tag: '02 · CONDIÇÕES',
      title: 'PAGAMENTO',
      bg: 'linear-gradient(165deg, #0e3024 0%, #061912 100%)',
      borderColor: 'rgba(124, 229, 119, 0.35)',
      footerLabel: 'Condições',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong style={{ fontSize: '11px', letterSpacing: '0.16em', color: '#7ce577', textTransform: 'uppercase' }}>PIX À VISTA</strong>
              <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 7px', borderRadius: '4px', background: 'rgba(124,229,119,0.15)', color: '#7ce577', border: '1px solid rgba(124,229,119,0.3)' }}>10% OFF</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', margin: 0, textWrap: 'balance' }}>
              Pagamento único: 1 pessoa realiza o PIX no valor total do grupo/quarto.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
            <strong style={{ display: 'block', fontSize: '11px', letterSpacing: '0.16em', color: '#7ce577', textTransform: 'uppercase', marginBottom: '4px' }}>CARTÃO DE CRÉDITO</strong>
            <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)', margin: 0, textWrap: 'balance' }}>
              Via Sympla. Para grupos de 2–5 pessoas, cada integrante pode passar seu cartão no mesmo dia para garantir o quarto.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      tag: '03 · ATENDIMENTO',
      title: 'CANAIS OFICIAIS',
      bg: 'linear-gradient(165deg, #132e40 0%, #081a26 100%)',
      borderColor: 'rgba(87, 210, 244, 0.35)',
      footerLabel: 'Oficiais',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>INSTAGRAM</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>@almareveillonboipeba</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>E-MAIL</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>falacomigo@almareveillon.com.br</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.18em', color: '#57d2f4', textTransform: 'uppercase', fontWeight: 700 }}>SYMPLA</span>
            <span style={{ fontSize: '13px', color: '#fff' }}>Somente através do link oficial.</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', color: '#fff', textDecoration: 'none' }}
            >
              INSTAGRAM <ArrowUpRight size={12} />
            </a>
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '999px', background: '#57d2f4', color: '#04151f', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textDecoration: 'none' }}
            >
              SYMPLA <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      tag: '04 · SEGURANÇA',
      title: 'SEGURANÇA',
      bg: 'linear-gradient(165deg, #18262f 0%, #0b151b 100%)',
      borderColor: 'rgba(244, 255, 199, 0.35)',
      footerLabel: 'Proteção',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            Utilize apenas os canais oficiais do ALMA.
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            Foi seguido por um perfil falso? Denuncie.
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', margin: 0, textWrap: 'balance' }}>
            Sua ajuda é fundamental para proteger a comunidade ALMA.
          </p>
          <div style={{ marginTop: '6px', padding: '7px 12px', borderRadius: '8px', background: 'rgba(244,255,199,0.06)', border: '1px solid rgba(244,255,199,0.2)' }}>
            <span style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#f4ffc7' }}>
              Comunidade Protegida
            </span>
          </div>
        </div>
      ),
    },
  ]

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

      <div className="notices-stack-wrap">
        <HoverStack
          cards={noticeCards}
          cardWidth={330}
          cardHeight={440}
          overlap={160}
          pushDistance={250}
          rotation={5}
        />
      </div>
    </section>
  )
}

