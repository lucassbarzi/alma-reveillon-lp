export type AccommodationStatus = 'sold-out' | 'available'

export interface Accommodation {
  id: string
  name: string
  badges: string[]
  description: string
  period: string
  amenities: string[]
  location: string
  mapsQuery: string
  images: string[]
  coverImage: string
  status: AccommodationStatus
  statusLabel: string
  imageTodo?: string
}

export const googleMapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const accommodations: Accommodation[] = [
  {
    id: 'maravilha', name: 'Maravilha', badges: ['Central', 'Conforto'], status: 'sold-out', statusLabel: 'Esgotado', period: 'Esgotado',
    description: 'No centro de Boipeba, na Praça Santo Antônio, perto de restaurantes, mercado, farmácia e serviços.',
    amenities: ['Suítes equipadas', 'Localização central', 'Comércio próximo'], location: 'Praça Santo Antônio · Boipeba', mapsQuery: 'Pousada Maravilha, Praça Santo Antônio, Boipeba, Bahia',
    coverImage: asset('/media/accommodations/cover-maravilha.webp'), images: [asset('/media/accommodations/maravilha.webp'),asset('/media/accommodations/maravilha-2.webp'),asset('/media/accommodations/maravilha-3.webp'),asset('/media/accommodations/maravilha-4.webp'),asset('/media/accommodations/maravilha-5.webp')],
  },
  {
    id: 'pousada-nativa', name: 'Pousada Nativa', badges: ['Economy', 'Beira-rio'], status: 'sold-out', statusLabel: 'Esgotado', period: 'Esgotado',
    description: 'Localização privilegiada de frente para o rio, próxima ao centro e ao mar.',
    amenities: ['Ar-condicionado', 'Banheiro privativo', 'Chuveiro quente', 'Frigobar', 'Café da manhã'], location: 'Rua do Porto · Boipeba', mapsQuery: 'Pousada Nativa Boipeba, Cairu, Bahia',
    coverImage: asset('/media/accommodations/cover-pousada-nativa.webp'), images: [asset('/media/accommodations/pousada-nativa.webp'),asset('/media/accommodations/pousada-nativa-2.webp'),asset('/media/accommodations/pousada-nativa-3.webp'),asset('/media/accommodations/pousada-nativa-4.webp'),asset('/media/accommodations/pousada-nativa-5.webp')],
  },
  {
    id: 'pousada-da-vila', name: 'Pousada da Vila', badges: ['Central', 'Family friendly'], status: 'sold-out', statusLabel: 'Esgotado', period: 'Esgotado',
    description: 'Na praça principal da ilha, a poucos minutos da Praia da Boca da Barra e do cais.',
    amenities: ['Ar-condicionado', 'Frigobar', 'Café da manhã buffet', 'Pet friendly'], location: 'Praça Santo Antônio · Boipeba', mapsQuery: 'Pousada da Vila Boipeba, Praça Santo Antônio, Bahia',
    coverImage: asset('/media/accommodations/cover-pousada-da-vila.webp'), images: [asset('/media/accommodations/pousada-da-vila.webp')],
  },
  {
    id: 'casa-verde', name: 'Casa Verde', badges: ['Low Cost', 'Central'], status: 'sold-out', statusLabel: 'Esgotado', period: 'Esgotado',
    description: 'Opção BBB na Pracinha. Localização central na Praça Santo Antônio.',
    amenities: ['Ar-condicionado', 'Banheiro privativo', 'Wi-Fi', 'Café da manhã'], location: 'Praça Santo Antônio · Boipeba', mapsQuery: 'Pousada Casa Verde Boipeba, Praça Santo Antônio, Cairu, Bahia',
    coverImage: asset('/media/accommodations/cover-casa-verde.webp'), images: [asset('/media/accommodations/pousada-casa-verde.webp'),asset('/media/accommodations/pousada-casa-verde-2.webp'),asset('/media/accommodations/pousada-casa-verde-3.webp'),asset('/media/accommodations/pousada-casa-verde-4.webp'),asset('/media/accommodations/pousada-casa-verde-5.webp')],
  },
  {
    id: 'caminho-de-pedras', name: 'Caminho de Pedras', badges: ['Próxima à praia', 'Familiar'], status: 'sold-out', statusLabel: 'Esgotado', period: 'Esgotado',
    description: 'Pousada familiar na região central, a poucos minutos da Praia da Boca da Barra.',
    amenities: ['Ar-condicionado', 'Wi-Fi', 'Frigobar', 'Café da manhã'], location: 'Rua das Pedras · Boipeba', mapsQuery: 'Pousada Caminho de Pedras, Boipeba, Bahia',
    coverImage: asset('/media/accommodations/cover-caminho-de-pedras.webp'), images: [asset('/media/accommodations/caminho-de-pedras.webp'),asset('/media/accommodations/caminho-de-pedras-2.webp'),asset('/media/accommodations/caminho-de-pedras-3.webp')],
  },
  {
    id: 'pedra-de-sal', name: 'Pedra de Sal', badges: ['Economy Plus'], status: 'available', statusLabel: '26/12 → 02/01', period: '26/12 → 02/01',
    description: 'Na Rua das Pedras, sobreloja Oxente. Reformada com WC superior.',
    amenities: ['Ar-condicionado', 'TV', 'Banho quente', 'Café da manhã', 'Limpeza diária'], location: 'Rua das Pedras · sobreloja Oxente', mapsQuery: 'Oxente Boipeba, Ilha de Boipeba, Cairu, Bahia',
    coverImage: asset('/media/accommodations/cover-pedra-de-sal.webp'), images: [asset('/media/accommodations/pedra-de-sal.webp')],
  },
  {
    id: 'vila-jesuita', name: 'Vila Jesuíta', badges: ['Conforto', 'Próxima à praia'], status: 'available', statusLabel: '31/12 → 02/01', period: '31/12 → 02/01',
    description: 'Suítes confortáveis em uma localização tranquila, a poucos minutos da praia e do centro da vila.',
    amenities: ['Suítes confortáveis', 'Varanda', 'Boa localização', 'Próxima à praia'], location: 'Velha Boipeba · Bahia', mapsQuery: 'Pousada Vila Jesuíta, Boipeba, Bahia',
    coverImage: asset('/media/accommodations/cover-vila-jesuita.webp'), images: [asset('/media/accommodations/vila-jesuita.webp'),asset('/media/accommodations/vila-jesuita-2.webp'),asset('/media/accommodations/vila-jesuita-3.webp'),asset('/media/accommodations/vila-jesuita-4.webp')],
  },
]
