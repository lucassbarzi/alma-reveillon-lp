declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export const TICKETS_URL =
  'https://www.sympla.com.br/evento/a-l-m-a-reveillon-2027-boipeba/3254347?referrer=www.google.com'

export interface TrackTicketClickOptions {
  ctaLocation: string
  ctaText?: string
  destinationUrl?: string
  language: string
}

/**
 * Pushes checkout/ticket interaction events to dataLayer without inventing purchase events.
 * Purchase will be validated and tracked exclusively on the official Sympla checkout.
 */
export function trackTicketClick({
  ctaLocation,
  ctaText,
  destinationUrl = TICKETS_URL,
  language,
}: TrackTicketClickOptions) {
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []

  window.dataLayer.push({
    event: 'begin_checkout',
    ticket_event: 'ticket_click',
    event_category: 'ecommerce',
    cta_location: ctaLocation,
    cta_text: ctaText || 'Ticket CTA',
    destination_url: destinationUrl,
    language,
    currency: 'BRL',
    items: [
      {
        item_id: 'alma_reveillon_2027',
        item_name: 'ALMA Réveillon 2027 Boipeba',
        item_category: 'Festival Pass / Accommodation Package',
        item_location: 'Praia da Cueira, Boipeba - BA',
      },
    ],
  })
}
