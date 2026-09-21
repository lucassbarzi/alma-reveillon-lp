import React from 'react'

export interface PartnerItem {
  id: string
  name: string
  svg: React.ReactNode
}

export const TOP_PARTNERS: PartnerItem[] = [
  {
    id: 'corona',
    name: 'Corona Extra',
    svg: (
      <svg viewBox="0 0 140 44" className="partner-logo-svg" fill="currentColor">
        <path d="M70 3 L74 12 L83 7 L80 17 L60 17 L57 7 L66 12 Z" fill="currentColor" />
        <circle cx="57" cy="5" r="1.5" fill="currentColor" />
        <circle cx="70" cy="2" r="1.5" fill="currentColor" />
        <circle cx="83" cy="5" r="1.5" fill="currentColor" />
        <text x="70" y="30" textAnchor="middle" fontFamily="'Cinzel', 'Playfair Display', serif" fontSize="16" fontWeight="700" letterSpacing="0.16em">
          CORONA
        </text>
        <text x="70" y="40" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.28em">
          EXTRA
        </text>
      </svg>
    ),
  },
  {
    id: 'absolut',
    name: 'Absolut',
    svg: (
      <svg viewBox="0 0 140 44" className="partner-logo-svg" fill="currentColor">
        <text x="70" y="26" textAnchor="middle" fontFamily="'Futura', 'Helvetica Neue', 'Arial Black', sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.14em">
          ABSOLUT.
        </text>
        <text x="70" y="39" textAnchor="middle" fontFamily="'Futura', sans-serif" fontSize="7.5" fontWeight="700" letterSpacing="0.32em">
          VODKA
        </text>
      </svg>
    ),
  },
  {
    id: 'prata',
    name: 'Prata Mixers',
    svg: (
      <svg viewBox="0 0 140 44" className="partner-logo-svg" fill="currentColor">
        <circle cx="70" cy="10" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,2" />
        <circle cx="70" cy="10" r="2.2" fill="currentColor" />
        <text x="70" y="27" textAnchor="middle" fontFamily="'Outfit', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.22em">
          PRATA
        </text>
        <text x="70" y="39" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.28em">
          MIXERS
        </text>
      </svg>
    ),
  },
  {
    id: 'beefeater',
    name: 'Beefeater London',
    svg: (
      <svg viewBox="0 0 150 44" className="partner-logo-svg" fill="currentColor">
        <text x="75" y="25" textAnchor="middle" fontFamily="'Times New Roman', serif" fontSize="17" fontWeight="800" letterSpacing="0.18em">
          BEEFEATER
        </text>
        <text x="75" y="38" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" letterSpacing="0.32em">
          LONDON · DRY GIN
        </text>
      </svg>
    ),
  },
  {
    id: 'sol',
    name: 'Sol',
    svg: (
      <svg viewBox="0 0 130 44" className="partner-logo-svg" fill="currentColor">
        <circle cx="65" cy="13" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2,2" />
        <path d="M65 2 L65 6 M65 20 L65 24 M54 13 L58 13 M72 13 L76 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <text x="65" y="32" textAnchor="middle" fontFamily="'Brush Script MT', 'Playfair Display', serif" fontSize="22" fontWeight="700" fontStyle="italic" letterSpacing="0.08em">
          Sol
        </text>
        <text x="65" y="42" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="0.22em">
          ESPECIAL
        </text>
      </svg>
    ),
  },
  {
    id: 'redbull',
    name: 'Red Bull',
    svg: (
      <svg viewBox="0 0 140 44" className="partner-logo-svg" fill="currentColor">
        <circle cx="70" cy="15" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M57 15 C61 13, 66 15, 68 17 L64 20 Z" fill="currentColor" />
        <path d="M83 15 C79 13, 74 15, 72 17 L76 20 Z" fill="currentColor" />
        <text x="70" y="36" textAnchor="middle" fontFamily="'Futura', 'Arial Black', sans-serif" fontSize="13.5" fontWeight="900" letterSpacing="0.06em">
          Red Bull
        </text>
      </svg>
    ),
  },
]

export const BOTTOM_PARTNERS: PartnerItem[] = [
  {
    id: 'valduga',
    name: 'Casa Valduga',
    svg: (
      <svg viewBox="0 0 150 44" className="partner-logo-svg" fill="currentColor">
        <path d="M75 4 L81 7 L81 13 C81 17, 75 21, 75 21 C75 21, 69 17, 69 13 L69 7 Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        <path d="M75 8 L75 15 M72 11 L78 11" stroke="currentColor" strokeWidth="1.1" />
        <text x="75" y="32" textAnchor="middle" fontFamily="'Cinzel', 'Times New Roman', serif" fontSize="13" fontWeight="700" letterSpacing="0.22em">
          CASA VALDUGA
        </text>
        <text x="75" y="41" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fontWeight="600" letterSpacing="0.3em">
          PONTO NERO BRUT
        </text>
      </svg>
    ),
  },
  {
    id: 'sympla',
    name: 'Sympla',
    svg: (
      <svg viewBox="0 0 130 44" className="partner-logo-svg" fill="currentColor">
        <path d="M52 23 C52 18, 56 15, 61 15 C67 15, 73 23, 79 23 C83 23, 86 20, 86 17 C86 14, 83 12, 80 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <text x="65" y="37" textAnchor="middle" fontFamily="'Inter', 'Poppins', sans-serif" fontSize="15" fontWeight="800" letterSpacing="0.08em">
          sympla
        </text>
      </svg>
    ),
  },
  {
    id: 'eventbrite',
    name: 'Eventbrite',
    svg: (
      <svg viewBox="0 0 140 44" className="partner-logo-svg" fill="currentColor">
        <rect x="63" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <text x="70" y="16" textAnchor="middle" fontFamily="sans-serif" fontSize="10" fontWeight="900">e</text>
        <text x="70" y="35" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="13" fontWeight="800" letterSpacing="0.04em">
          eventbrite
        </text>
      </svg>
    ),
  },
  {
    id: 'ingresse',
    name: 'Ingresse',
    svg: (
      <svg viewBox="0 0 130 44" className="partner-logo-svg" fill="currentColor">
        <circle cx="65" cy="10" r="3" fill="currentColor" />
        <text x="65" y="31" textAnchor="middle" fontFamily="'Circular Std', 'Inter', sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.06em">
          ingresse
        </text>
      </svg>
    ),
  },
  {
    id: '639com',
    name: '639com',
    svg: (
      <svg viewBox="0 0 130 44" className="partner-logo-svg" fill="currentColor">
        <text x="65" y="28" textAnchor="middle" fontFamily="'Montserrat', 'Arial Black', sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.14em">
          639COM
        </text>
        <line x1="45" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function PartnersGrid({ title }: { title?: string }) {
  return (
    <div className="partners-wrapper">
      {title && (
        <div className="partners-header">
          <span className="partners-kicker">{title}</span>
          <div className="partners-line" />
        </div>
      )}

      {/* Row 1: 6 partners */}
      <div className="partners-row partners-row--top" role="list" aria-label="Patrocinadores principais">
        {TOP_PARTNERS.map((partner) => (
          <div key={partner.id} className="partner-badge" role="listitem" title={partner.name} aria-label={partner.name}>
            <div className="partner-logo-box">
              {partner.svg}
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: 5 partners */}
      <div className="partners-row partners-row--bottom" role="list" aria-label="Parceiros oficiais">
        {BOTTOM_PARTNERS.map((partner) => (
          <div key={partner.id} className="partner-badge" role="listitem" title={partner.name} aria-label={partner.name}>
            <div className="partner-logo-box">
              {partner.svg}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}