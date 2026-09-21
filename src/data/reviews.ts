export interface ReviewItem {
  quote: string
  author: string
  name?: string
  role?: string
  verified?: boolean
  initials?: string
  tag?: string
}

export const reviews: ReviewItem[] = [
  {
    quote: 'Foi tudooooo 🙌❤️',
    author: 'brunamarquezine',
    name: 'Bruna Marquezine',
    role: 'Atriz & Convidada',
    verified: true,
    initials: 'BM',
    tag: 'Boipeba',
  },
  {
    quote: 'pra ficar na memória!! 👌',
    author: 'bertolazzi',
    name: 'Carlos Bertolazzi',
    role: 'Chef & Apresentador',
    verified: true,
    initials: 'CB',
    tag: 'Edição Anterior',
  },
  {
    quote: 'O MELHOR EVENTO DO NORDESTE',
    author: 'ricardobrautigam',
    name: 'Ricardo Brautigam',
    role: 'Diretor Criativo',
    verified: true,
    initials: 'RB',
    tag: 'Boipeba',
  },
  {
    quote: 'Energia surreal!!! Foi maravilhoso e perfeito cada momento 🤍',
    author: 'polly.penoni',
    name: 'Pollyanna Penoni',
    role: 'Hóspede ALMA',
    verified: false,
    initials: 'PP',
    tag: 'Praia da Cueira',
  },
  {
    quote: 'Foi sensacional 🏝️😍🙏🇧🇷',
    author: 'belanogueira__',
    name: 'Bela Nogueira',
    role: 'Hóspede ALMA',
    verified: false,
    initials: 'BN',
    tag: 'Boipeba',
  },
  {
    quote: 'Saudade desses dias já! 😢 foi incrível!! 🔥',
    author: 'lilotune',
    name: 'Lilo Tune',
    role: 'Convidado ALMA',
    verified: false,
    initials: 'LT',
    tag: 'Edição Anterior',
  },
  {
    quote: 'Sem palavras! Eita como foi incrível 🤍',
    author: 'camilagondimfonseca',
    name: 'Camila Gondim',
    role: 'Hóspede ALMA',
    verified: false,
    initials: 'CG',
    tag: 'Boipeba',
  },
  {
    quote: 'Bom demais, ta malucooo 🙌🙌',
    author: 'joaopedroblemos',
    name: 'João Pedro Lemos',
    role: 'Convidado ALMA',
    verified: false,
    initials: 'JP',
    tag: 'Edição Anterior',
  },
  {
    quote: 'Eu amei o @almareveillonboipeba, foi demais!!!! 😍😍😍😍',
    author: 'julianitzsche',
    name: 'Julia Nitzsche',
    role: 'Hóspede ALMA',
    verified: false,
    initials: 'JN',
    tag: 'Praia da Cueira',
  },
  {
    quote: 'Foi épico!!!',
    author: 'kaicms',
    name: 'Kaique Silva',
    role: 'Convidado ALMA',
    verified: false,
    initials: 'KS',
    tag: 'Boipeba',
  },
]

