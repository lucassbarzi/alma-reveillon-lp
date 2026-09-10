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
  imageTodo?: string
}

export const googleMapsSearchUrl = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

export const accommodations: Accommodation[] = [
  {
    id: 'pedra-de-sal',
    name: 'Pedra de Sal',
    badges: ['Economy Plus'],
    description: 'Na Rua das Pedras, sobreloja Oxente. Reformada com WC superior.',
    period: '26/12 → 02/01',
    amenities: ['Ar-condicionado', 'TV', 'Banho quente', 'Café da manhã', 'Limpeza diária'],
    location: 'Rua das Pedras · sobreloja Oxente',
    mapsQuery: 'Oxente Boipeba, Ilha de Boipeba, Cairu, Bahia',
    images: [asset('/media/accommodations/pedra-de-sal.webp')],
  },
  {
    id: 'pousada-nativa',
    name: 'Pousada Nativa',
    badges: ['Economy', 'Beira-rio'],
    description: 'Localização privilegiada de frente para o rio, próxima ao centro e ao mar.',
    period: '26/12 → 02/01',
    amenities: ['Ar-condicionado', 'Banheiro privativo', 'Chuveiro quente', 'Frigobar', 'Café da manhã'],
    location: 'Rua do Porto · Boipeba',
    mapsQuery: 'Pousada Nativa Boipeba, Cairu, Bahia',
    images: [
      asset('/media/accommodations/pousada-nativa.webp'),
      asset('/media/accommodations/pousada-nativa-2.webp'),
      asset('/media/accommodations/pousada-nativa-3.webp'),
      asset('/media/accommodations/pousada-nativa-4.webp'),
      asset('/media/accommodations/pousada-nativa-5.webp'),
    ],
  },
  {
    id: 'casa-verde',
    name: 'Casa Verde',
    badges: ['Low Cost'],
    description: 'Opção BBB na Pracinha. Localização central na Praça Santo Antônio.',
    period: '26/12 → 02/01',
    amenities: ['Ar-condicionado', 'Banheiro privativo', 'Wi-Fi', 'Café da manhã'],
    location: 'Praça Santo Antônio · Boipeba',
    mapsQuery: 'Pousada Casa Verde Boipeba, Praça Santo Antônio, Cairu, Bahia',
    images: [
      asset('/media/accommodations/pousada-casa-verde.webp'),
      asset('/media/accommodations/pousada-casa-verde-2.webp'),
      asset('/media/accommodations/pousada-casa-verde-3.webp'),
      asset('/media/accommodations/pousada-casa-verde-4.webp'),
      asset('/media/accommodations/pousada-casa-verde-5.webp'),
    ],
  },
]
