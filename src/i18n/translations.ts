export type Language = 'pt-BR' | 'en' | 'es'

export interface FAQItem {
  question: string
  answer: string
}

export interface ExperienceCardItem {
  title: string
  subtitle: string
  alt: string
}

export interface GalleryItemTranslation {
  alt: string
}

export interface NightItem {
  date: string
  title: string
  subtitle: string
}

export interface AccommodationTranslation {
  id: string
  name: string
  badges: string[]
  description: string
  period: string
  statusLabel: string
  amenities: string[]
  location: string
}

export interface Translations {
  meta: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    locale: string
  }
  nav: {
    ariaWordmark: string
    ariaOpenMenu: string
    ariaCloseMenu: string
    ariaMenuPanel: string
    headerBadge: string
    liveAlmaBtn: string
    items: {
      experience: { label: string; tagline: string }
      media: { label: string; tagline: string }
      lineup: { label: string; tagline: string }
      lodgingPackages: { label: string; tagline: string }
      tickets: { label: string; tagline: string }
      island: { label: string; tagline: string }
      howToArrive: { label: string; tagline: string }
      whereToStay: { label: string; tagline: string }
      faq: { label: string; tagline: string }
    }
  }
  hero: {
    videoAria: string
    eyebrow: string
    titlePart1: string
    titlePart2: string
    subtitle: string[]
    slogan1: string
    slogan2: string
    cta: string
    scrollCueAria: string
    scrollCueText: string
  }
  manifesto: {
    kicker: string
    h2Part1: string
    h2Part2: string
    lead: string
    p2: string
  }
  cinema: {
    kicker: string
    h2Part1: string
    h2Part2: string
    p: string
  }
  squeeze: {
    kicker: string
    h2Part1: string
    h2Part2: string
    cards: ExperienceCardItem[]
  }
  gallery: {
    ariaLabel: string
    items: GalleryItemTranslation[]
  }
  lineup: {
    kicker: string
    h2Part1: string
    h2Part2: string
    nights: NightItem[]
    sourceNote: string
  }
  openBar: {
    kicker: string
    h2Part1: string
    h2Part2: string
    p: string
    brandsAria: string
    highlight: string
    month: string
  }
  accommodation: {
    kicker: string
    h2Part1: string
    h2Part2: string
    subhead: string
    p: string
    benefits: {
      ac: string
      tv: string
      hotShower: string
      breakfast: string
      cleaning: string
    }
    locationTitle: string
    locationDesc: string
    viewPricesBtn: string
    carouselAria: string
    carouselAriaRole: string
    cardDetailsBtn: string
    soldOut: string
    modal: {
      ariaDialog: (name: string) => string
      ariaClose: string
      ariaThumb: (num: number, name: string) => string
      locationLabel: string
      viewOnMaps: string
      viewPackage: string
      packageSoldOut: string
      packagePrefix: string
    }
    items: AccommodationTranslation[]
  }
  stories: {
    kicker: string
    h2Part1: string
    h2Part2: string
    cards: {
      tag: string
      title: string
      p: string
    }[]
  }
  notices: {
    kicker: string
    h2Part1: string
    h2Part2: string
    subtitle: string
    card1: {
      title: string
      text: string
      badge: string
    }
    card2: {
      title: string
      pixTitle: string
      pixDiscount: string
      pixDesc: string
      ccTitle: string
      ccDesc: string
    }
    card3: {
      title: string
      instagramLabel: string
      emailLabel: string
      symplaLabel: string
      symplaText: string
      instagramBtn: string
      symplaBtn: string
    }
    card4: {
      title: string
      p1: string
      p2: string
      p3: string
      badge: string
    }
  }
  faq: {
    kicker: string
    h2Part1: string
    h2Part2: string
    items: FAQItem[]
  }
  finale: {
    kicker: string
    h2Part1: string
    h2Part2: string
    locationSchedule: string
    cta: string
    legal: string
  }
  footer: {
    brandDesc: string
    locationBadge: string
    sectionEvent: string
    sectionInfo: string
    sectionWhenWhere: string
    whenDates: string
    whereLocation: string
    navExperience: string
    navLineup: string
    navIsland: string
    navOpenBar: string
    navLodging: string
    navFaq: string
    navHowToArrive: string
    navSymplaTickets: string
    ctaButton: string
    officialChannels: string
    officialInstagram: string
    officialEmail: string
    officialTickets: string
    instagramAria: string
    officialSalesBy: string
    copyright: string
    legalBottom: string
  }
  howToArrive: {
    ariaDialog: string
    ariaClose: string
    kicker: string
    h2Part1: string
    h2Part2: string
    intro: string
    tabs: {
      plane: string
      car: string
      salvador: string
      tips: string
    }
    plane: {
      card1Title: string
      card1Badge: string
      card1P: string
      card1Step1: string
      card1Step2: string
      card1Step3: string
      card2Title: string
      card2Badge: string
      card2P: string
      card2Step1: string
      card2Step2: string
    }
    car: {
      card1Title: string
      card1Badge: string
      card1P: string
      card1Step1: string
      card1Step2: string
      card1Step3: string
      card1Step4: string
      card2Title: string
      card2Badge: string
      card2P: string
    }
    salvador: {
      card1Title: string
      card1Badge: string
      card1P: string
      node1Title: string
      node1Desc: string
      node2Title: string
      node2Desc: string
      node3Title: string
      node3Desc: string
      card2Title: string
      card2Badge: string
      card2P: string
    }
    tips: {
      card1Title: string
      card1Badge: string
      card1P1: string
      card1Recommendation: string
      card2Title: string
      card2Badge: string
      card2P: string
    }
    btnMaps: string
    btnClose: string
  }
  pip: {
    badge: string
    expandAria: string
    closeAria: string
    minimizeAria: string
    pauseAria: string
    playAria: string
    muteAria: string
    unmuteAria: string
    nextAria: string
    nextBtn: string
    reopenBtn: string
    reopenAria: string
    editionSpecial: string
    edition2025: string
  }
  backToTop: {
    aria: string
    text: string
  }
  languageSwitcher: {
    ariaLabel: string
    pt: string
    en: string
    es: string
  }
}

export const translations: Record<Language, Translations> = {
  'pt-BR': {
    meta: {
      title: 'ALMA Réveillon 2027 — Boipeba',
      description: 'ALMA Réveillon 2027 em Boipeba. Cinco noites Open Bar Premium, de 27 a 31 de dezembro de 2026, na Praia da Cueira.',
      ogTitle: 'ALMA Réveillon 2027 — Boipeba',
      ogDescription: 'Cinco noites na Praia da Cueira. O ano novo começa com toda ALMA.',
      locale: 'pt_BR',
    },
    nav: {
      ariaWordmark: 'ALMA, início',
      ariaOpenMenu: 'Abrir menu de navegação',
      ariaCloseMenu: 'Fechar menu de navegação',
      ariaMenuPanel: 'Menu principal ALMA Réveillon',
      headerBadge: 'ALMA RÉVEILLON 2027 · BOIPEBA',
      liveAlmaBtn: 'VIVER O ALMA',
      items: {
        experience: { label: 'Experiência', tagline: 'A virada que muda o estado de espírito' },
        media: { label: 'Mídia', tagline: 'Fotos, vídeos e reportagens' },
        lineup: { label: 'Programação', tagline: '5 noites · Open Bar Premium' },
        lodgingPackages: { label: 'Pacotes ALMA com hospedagem', tagline: 'Ingresso + estadia em Boipeba' },
        tickets: { label: 'Ingressos', tagline: 'Comprar no Sympla' },
        island: { label: 'Ilha de Boipeba', tagline: 'A ilha, as praias e os caminhos de areia' },
        howToArrive: { label: 'Como chegar', tagline: 'Rotas, transfer e lancha' },
        whereToStay: { label: 'Onde ficar', tagline: 'Pousadas e casas em Boipeba' },
        faq: { label: 'Dúvidas', tagline: 'Perguntas frequentes' },
      },
    },
    hero: {
      videoAria: 'Paisagens de Boipeba entre nuvens ensolaradas',
      eyebrow: '27 — 31 DEZ 2026 · PRAIA DA CUEIRA',
      titlePart1: 'ANO NOVO',
      titlePart2: 'ILHA NOVA',
      subtitle: [
        '1 ano de espera',
        '5 festas Open Bar Premium',
        '7 dias em uma ilha paradisíaca na Bahia',
        'E aquela sensação rara de estar exatamente onde você queria estar',
      ],
      slogan1: 'Alma salgada',
      slogan2: 'Alma lavada',
      cta: 'Viver o ALMA',
      scrollCueAria: 'Continuar',
      scrollCueText: 'DESCER',
    },
    manifesto: {
      kicker: 'UM CONVITE DA ILHA',
      h2Part1: 'Há viradas que mudam a data.',
      h2Part2: 'Esta muda o estado de espírito.',
      lead: 'Boipeba não se atravessa com pressa. A chegada já muda o ritmo: a cidade fica para trás, o mar abre caminho e o tempo passa a obedecer à maré.',
      p2: 'Na Praia da Cueira, o ALMA ocupa cinco noites entre 27 e 31 de dezembro. Música, areia, encontros e Open Bar Premium compõem uma experiência desenhada para terminar o ano leve e começar 2027 inteiro.',
    },
    cinema: {
      kicker: 'BOIPEBA, BAHIA',
      h2Part1: 'Primeiro,',
      h2Part2: 'o paraíso.',
      p: 'Uma ilha alcançada pelo mar. Praia, mata, caminhos de areia e noites que começam quando o sol baixa.',
    },
    squeeze: {
      kicker: 'A EXPERIÊNCIA EM QUATRO MOVIMENTOS',
      h2Part1: 'Antes da festa,',
      h2Part2: 'já é ALMA.',
      cards: [
        {
          title: 'O caminho',
          subtitle: 'Chegar a Boipeba já muda o ritmo. O trecho final acontece entre estrada, mar e caminhos de areia.',
          alt: 'Chegada à ilha pelo cais e pelo mar',
        },
        {
          title: 'O dia',
          subtitle: 'Praias, mata e água morna antes de a primeira batida atravessar a noite.',
          alt: 'Grupo de amigas brindando de lancha nas águas cristalinas de Boipeba',
        },
        {
          title: 'A noite',
          subtitle: 'Luzes, música e o mar como cenário até o amanhecer.',
          alt: 'Pista lotada do ALMA iluminada durante a festa noturna',
        },
        {
          title: 'A virada',
          subtitle: 'Fogos sobre a Praia da Cueira para brindar a chegada de 2027.',
          alt: 'Queima de fogos de artifício dourada e iluminada na virada de ano',
        },
      ],
    },
    gallery: {
      ariaLabel: 'Paisagens e momentos do ALMA Réveillon',
      items: [
        { alt: 'Recifes e águas claras vistos do alto em Boipeba' },
        { alt: 'Praia e coqueiral vistos do alto' },
        { alt: 'Faixa de areia e mar azul na ilha' },
        { alt: 'Coqueiros refletidos nas águas da ilha' },
        { alt: 'Praia paradisíaca em Boipeba' },
      ],
    },
    lineup: {
      kicker: 'CINCO NOITES · OPEN BAR PREMIUM',
      h2Part1: 'Cada noite,',
      h2Part2: 'uma nova maré.',
      nights: [
        { date: '27.12', title: 'Roda de Praia', subtitle: '+5521' },
        { date: '28.12', title: 'Isso Não É Um Sunrise', subtitle: 'Uma noite que atravessa a madrugada' },
        { date: '29.12', title: 'MOMO & Biribiri', subtitle: 'Afrobeats sob o céu da Bahia' },
        { date: '30.12', title: 'Luau do DDP', subtitle: 'Pagode, funk, pop e eletrônico' },
        { date: '31.12', title: 'ALMA Réveillon', subtitle: 'A virada, à beira-mar' },
      ],
      sourceNote: 'Programação publicada nas páginas de referência. Alterações devem ser confirmadas no canal oficial do evento.',
    },
    openBar: {
      kicker: 'SEM INTERROMPER O MOMENTO',
      h2Part1: 'Open Bar',
      h2Part2: 'Premium.',
      p: 'Nas cinco noites, uma seleção premium de gin, vodka, whiskey, cerveja, cocktails, energéticos e bebidas não alcoólicas. Na virada, Prosecco Ponto Nero Brut para o primeiro brinde de 2027.',
      brandsAria: 'Marcas do Open Bar Premium',
      highlight: 'Virada com Prosecco Ponto Nero Brut by Casa Valduga',
      month: 'DEZ',
    },
    accommodation: {
      kicker: 'PACOTE COMPLETO · 26/12 — 02/01',
      h2Part1: 'Uma hospedagem',
      h2Part2: 'pronta.',
      subhead: 'Você só precisa chegar em Boipeba.',
      p: 'Escolha onde ficar e viva os cinco dias de ALMA com ingresso + hospedagem em um único pacote.',
      benefits: {
        ac: 'AR-CONDICIONADO',
        tv: 'TV',
        hotShower: 'BANHO QUENTE',
        breakfast: 'CAFÉ DA MANHÃ',
        cleaning: 'LIMPEZA DIÁRIA',
      },
      locationTitle: 'MARINA · RUA DAS PEDRAS · PRAÇA SANTO ANTÔNIO',
      locationDesc: 'Hospedagens próximas entre si e a aproximadamente 7–11 min do Ponto do Trator.',
      viewPricesBtn: 'VER VALORES E DISPONIBILIDADE',
      carouselAria: 'Hospedagens ALMA',
      carouselAriaRole: 'carousel',
      cardDetailsBtn: 'VER DETALHES',
      soldOut: 'ESGOTADO',
      modal: {
        ariaDialog: (name: string) => `Detalhes da hospedagem ${name}`,
        ariaClose: 'Fechar detalhes da hospedagem',
        ariaThumb: (num: number, name: string) => `Ver foto ${num} de ${name}`,
        locationLabel: 'LOCALIZAÇÃO',
        viewOnMaps: 'VER NO GOOGLE MAPS',
        viewPackage: 'VER PACOTE + HOSPEDAGEM',
        packageSoldOut: 'PACOTE ESGOTADO',
        packagePrefix: 'PACOTE · ',
      },
      items: [
        {
          id: 'pedra-de-sal',
          name: 'Pedra de Sal',
          badges: ['Economy Plus'],
          description: 'Na Rua das Pedras, sobreloja Oxente. Reformada com WC superior.',
          period: '26/12 → 02/01',
          statusLabel: '26/12 → 02/01',
          amenities: ['Ar-condicionado', 'TV', 'Banho quente', 'Café da manhã', 'Limpeza diária'],
          location: 'Rua das Pedras · sobreloja Oxente',
        },
        {
          id: 'vila-jesuita',
          name: 'Vila Jesuíta',
          badges: ['Conforto', 'Próxima à praia'],
          description: 'Suítes confortáveis em uma localização tranquila, a poucos minutos da praia e do centro da vila.',
          period: '31/12 → 02/01',
          statusLabel: '31/12 → 02/01',
          amenities: ['Suítes confortáveis', 'Varanda', 'Boa localização', 'Próxima à praia'],
          location: 'Velha Boipeba · Bahia',
        },
        {
          id: 'maravilha',
          name: 'Maravilha',
          badges: ['Central', 'Conforto'],
          description: 'No centro de Boipeba, na Praça Santo Antônio, perto de restaurantes, mercado, farmácia e serviços.',
          period: 'Esgotado',
          statusLabel: 'Esgotado',
          amenities: ['Suítes equipadas', 'Localização central', 'Comércio próximo'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'pousada-nativa',
          name: 'Pousada Nativa',
          badges: ['Economy', 'Beira-rio'],
          description: 'Localização privilegiada de frente para o rio, próxima ao centro e ao mar.',
          period: 'Esgotado',
          statusLabel: 'Esgotado',
          amenities: ['Ar-condicionado', 'Banheiro privativo', 'Chuveiro quente', 'Frigobar', 'Café da manhã'],
          location: 'Rua do Porto · Boipeba',
        },
        {
          id: 'pousada-da-vila',
          name: 'Pousada da Vila',
          badges: ['Central', 'Family friendly'],
          description: 'Na praça principal da ilha, a poucos minutos da Praia da Boca da Barra e do cais.',
          period: 'Esgotado',
          statusLabel: 'Esgotado',
          amenities: ['Ar-condicionado', 'Frigobar', 'Café da manhã buffet', 'Pet friendly'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'casa-verde',
          name: 'Casa Verde',
          badges: ['Low Cost', 'Central'],
          description: 'Opção BBB na Pracinha. Localização central na Praça Santo Antônio.',
          period: 'Esgotado',
          statusLabel: 'Esgotado',
          amenities: ['Ar-condicionado', 'Banheiro privativo', 'Wi-Fi', 'Café da manhã'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'caminho-de-pedras',
          name: 'Caminho de Pedras',
          badges: ['Próxima à praia', 'Familiar'],
          description: 'Pousada familiar na região central, a poucos minutos da Praia da Boca da Barra.',
          period: 'Esgotado',
          statusLabel: 'Esgotado',
          amenities: ['Ar-condicionado', 'Wi-Fi', 'Frigobar', 'Café da manhã'],
          location: 'Rua das Pedras · Boipeba',
        },
      ],
    },
    stories: {
      kicker: 'HISTÓRIAS DE OUTRAS MARÉS',
      h2Part1: 'O que fica',
      h2Part2: 'depois da virada.',
      cards: [
        {
          tag: 'CHEGADA',
          title: 'A cidade termina no cais.',
          p: 'O deslocamento não é um intervalo. É o primeiro capítulo: quando o caminho encontra o mar, a pressa começa a perder importância.',
        },
        {
          tag: 'ENCONTRO',
          title: 'A pista não tem paredes.',
          p: 'A Praia da Cueira muda a escala da festa. O horizonte permanece à vista enquanto a música atravessa a madrugada.',
        },
        {
          tag: 'MEMÓRIA',
          title: 'O sol encerra a noite.',
          p: 'As imagens de edições anteriores guardam o que uma lista de atrações não explica: gente que chegou para uma festa e saiu levando uma paisagem inteira.',
        },
      ],
    },
    notices: {
      kicker: 'ANTES DE FECHAR O PACOTE',
      h2Part1: 'OPEN BAR, SIM.',
      h2Part2: 'OPEN FOOD, NÃO.',
      subtitle: 'Open Bar Premium em todas as festas. Comidas e lanches são vendidos separadamente na nossa praça gastronômica.',
      card1: {
        title: 'CHEGA DIA 28 OU 29?',
        text: 'Comprou o Full Pass? Sem stress. Seu kit de acesso ficará reservado em seu nome até o dia da sua chegada.',
        badge: 'Kit Reservado Garantido',
      },
      card2: {
        title: 'PAGAMENTO',
        pixTitle: 'PIX À VISTA',
        pixDiscount: '10% OFF DA TAXA',
        pixDesc: 'Pagamento único: 1 pessoa realiza o PIX no valor total do grupo/quarto.',
        ccTitle: 'CARTÃO DE CRÉDITO',
        ccDesc: 'Via Sympla. Para grupos de 2–5 pessoas, cada integrante pode passar seu cartão no mesmo dia para garantir seu ingresso e sua vaga no quarto escolhido.',
      },
      card3: {
        title: 'CANAIS OFICIAIS',
        instagramLabel: 'INSTAGRAM',
        emailLabel: 'E-MAIL',
        symplaLabel: 'SYMPLA',
        symplaText: 'Somente através do link oficial.',
        instagramBtn: 'INSTAGRAM',
        symplaBtn: 'SYMPLA',
      },
      card4: {
        title: 'SEGURANÇA',
        p1: 'Utilize apenas os canais oficiais do ALMA.',
        p2: 'Foi seguido por um perfil falso? Denuncie.',
        p3: 'Sua ajuda é fundamental para proteger a comunidade ALMA.',
        badge: 'Comunidade Protegida',
      },
    },
    faq: {
      kicker: 'ANTES DE IR',
      h2Part1: 'As maiores',
      h2Part2: 'dúvidas, respondidas.',
      items: [
        {
          question: 'Onde e quando acontece o ALMA Réveillon 2027?',
          answer: 'Na Praia da Cueira, em Cairu, Bahia, entre 27 e 31 de dezembro de 2026. A programação publicada começa às 23h nas quatro primeiras noites; no dia 31, às 22h.',
        },
        {
          question: 'Qual é a programação?',
          answer: 'A programação atual reúne Roda de Praia, Isso Não É Um Sunrise, MOMO & Biribiri, Luau do DDP e ALMA Réveillon entre 27 e 31 de dezembro. Alterações devem ser confirmadas nos canais oficiais.',
        },
        {
          question: 'O passaporte inclui todas as noites?',
          answer: 'A página oficial apresenta cinco festas Open Bar Premium. As categorias, lotes e disponibilidade devem ser conferidos no fluxo atualizado da Sympla antes da compra.',
        },
        {
          question: 'O que está incluído no Open Bar Premium?',
          answer: 'A carta publicada inclui Beefeater, Absolut, Jameson, cerveja premium, Aperol Spritz, Red Bull, tônica, refrigerantes, sucos, água de coco e água. Na virada, também há Prosecco Ponto Nero Brut by Casa Valduga.',
        },
        {
          question: 'Existe pacote com hospedagem?',
          answer: 'Sim. O ALMA possui opções de pacotes com ingresso + hospedagem entre 26/12 e 02/01, sujeitas à disponibilidade. Consulte as opções e valores atualizados no canal oficial de vendas.',
        },
        {
          question: 'Quais são as opções de hospedagem?',
          answer: 'As opções apresentadas são Maravilha, Pousada Nativa, Pousada da Vila, Casa Verde, Caminho de Pedras, Pedra de Sal e Vila Jesuíta. A disponibilidade e as datas de cada pacote aparecem no carrossel e devem ser confirmadas no canal oficial de vendas.',
        },
        {
          question: 'O evento é Open Food?',
          answer: 'Não. As cinco festas possuem Open Bar Premium. Alimentação não está incluída e poderá ser adquirida separadamente na praça gastronômica.',
        },
        {
          question: 'Posso chegar dia 28 ou 29 mesmo tendo Full Pass?',
          answer: 'Sim. O kit de acesso permanece reservado em nome do comprador até a sua chegada.',
        },
        {
          question: 'Como chegar a Boipeba?',
          answer: 'Boipeba exige planejamento de deslocamento. Há opções por lancha e transfer semiterrestre. Confirme rotas, horários e disponibilidade diretamente com os fornecedores.',
        },
        {
          question: 'Posso transferir ou cancelar meu ingresso?',
          answer: 'A Sympla informa cancelamento dentro das condições da plataforma e uma edição de participante até 24 horas antes do evento. Consulte as regras exibidas no ingresso no momento da compra. O evento é exclusivo para maiores de 18 anos.',
        },
        {
          question: 'Quais são os canais oficiais?',
          answer: 'Instagram @almareveillonboipeba, e-mail falacomigo@almareveillon.com.br e a página oficial do evento na Sympla.',
        },
      ],
    },
    finale: {
      kicker: 'HAPPY NEW ILHA',
      h2Part1: 'SEU MELHOR ANO',
      h2Part2: 'VAI COMEÇAR AQUI.',
      locationSchedule: 'Praia da Cueira · Cairu, Bahia\n27 de dezembro, 23h — 1º de janeiro, 6h',
      cta: 'Comprar no Sympla',
      legal: 'Evento para maiores de 18 anos. Compra e regras pela plataforma oficial.',
    },
    footer: {
      brandDesc: 'Cinco noites na ilha. O mar por perto. O pé na areia. E a sensação rara de estar exatamente onde você queria estar.',
      locationBadge: 'PRAIA DA CUEIRA · BOIPEBA',
      sectionEvent: 'O Evento',
      sectionInfo: 'Informações',
      sectionWhenWhere: 'Quando & Onde',
      whenDates: '27 — 31 de Dezembro de 2026',
      whereLocation: 'Praia da Cueira, Cairu — Boipeba, BA',
      navExperience: 'Experiência',
      navLineup: 'Programação',
      navIsland: 'Boipeba, Bahia',
      navOpenBar: 'Open Bar Premium',
      navLodging: 'Hospedagem',
      navFaq: 'Dúvidas Frequentes',
      navHowToArrive: 'Como Chegar',
      navSymplaTickets: 'Ingressos Sympla',
      ctaButton: 'Garantir Ingresso',
      officialChannels: 'CANAIS OFICIAIS',
      officialInstagram: 'Instagram · @almareveillonboipeba',
      officialEmail: 'E-mail · falacomigo@almareveillon.com.br',
      officialTickets: 'Ingressos · Sympla',
      instagramAria: 'Instagram Oficial ALMA',
      officialSalesBy: 'Vendas oficiais por',
      copyright: `© ${new Date().getFullYear()} ALMA Réveillon. Todos os direitos reservados.`,
      legalBottom: 'Open Bar Premium · Open Food não incluso · Evento +18.',
    },
    howToArrive: {
      ariaDialog: 'Guia de Como Chegar à Ilha de Boipeba',
      ariaClose: 'Fechar guia de rotas',
      kicker: 'GUIA DE VIAGEM · BOIPEBA, BAHIA',
      h2Part1: 'Como Chegar ',
      h2Part2: 'ao ALMA',
      intro: 'Não entram carros na Ilha de Boipeba. A travessia pelo mar ou pelo ar já faz parte do ritual de desacelerar. Escolha a melhor rota para o seu ponto de partida.',
      tabs: {
        plane: 'De Avião',
        car: 'De Carro',
        salvador: 'De Salvador',
        tips: 'Dicas de Ouro',
      },
      plane: {
        card1Title: 'Opção Mais Rápida: Táxi Aéreo direto (Salvador → Boipeba)',
        card1Badge: '~25 a 30 minutos de voo',
        card1P: 'Voos fretados e regulares em aeronaves bimotores partem do Aeroporto Internacional de Salvador (SSA) diretamente até a pista da Fazenda Pontal (localizada em frente a Boipeba).',
        card1Step1: 'Embarque no aeroporto de Salvador (terminal executivo / táxi aéreo).',
        card1Step2: 'Pouso na pista da Fazenda Pontal, cercada por coqueirais.',
        card1Step3: 'Travessia rápida de 5 minutos de barco até o cais da vila de Boipeba.',
        card2Title: 'Voo Comercial via Aeroporto de Valença (VAL)',
        card2Badge: 'Conexão comercial regional',
        card2P: 'Durante a alta temporada de verão, companhias aéreas como a Azul Conecta operam voos comerciais com destino ao Aeroporto de Valença (VAL).',
        card2Step1: 'Pouso em Valença → táxi de 20 min até o terminal marítimo.',
        card2Step2: 'Lancha rápida direto para Boipeba em cerca de 50 minutos.',
      },
      car: {
        card1Title: 'Rota Recomendada: De Carro até Torrinhas',
        card1Badge: 'Apenas 20 min de lancha rápida',
        card1P: 'Se você vem de carro próprio ou alugado, o Atracadouro de Torrinhas é de longe a melhor e mais curta alternativa náutica até Boipeba.',
        card1Step1: 'Saindo de Salvador: Ferry-boat até Bom Despacho (Itaparica) e siga pela BA-001 até o trevo de Cairu rumo a Torrinhas.',
        card1Step2: 'Saindo do Sul da Bahia (Ilhéus/Itacaré): Suba pela BA-001 direto em direção a Torrinhas.',
        card1Step3: 'Estacionamento seguro: Em Torrinhas existem vários estacionamentos particulares, murados e cobertos para guardar o veículo com tranquilidade.',
        card1Step4: 'Lancha rápida: A travessia até a vila de Boipeba leva apenas 20 a 25 minutos por um rio protegido e calmo.',
        card2Title: 'Alternativa: Estacionamento em Valença ou Graciosa',
        card2Badge: '~50 min de lancha rápida',
        card2P: 'Você também pode estacionar no centro de Valença ou no Atracadouro da Graciosa. De lá, lanchas rápidas partem de hora em hora rumo a Boipeba (trajeto náutico de cerca de 50 minutos a 1 hora).',
      },
      salvador: {
        card1Title: 'Semiterrestre Integrado (Opção Mais Procurada)',
        card1Badge: 'Duração total: ~4h30 a 5h30',
        card1P: 'É a forma mais tradicional e econômica de chegar saindo da capital. Diversas agências de turismo oferecem o pacote de transfer semiterrestre completo, pegando você no aeroporto ou hotel de Salvador.',
        node1Title: '1. Ferry-Boat',
        node1Desc: 'Salvador → Bom Despacho (Itaparica) (~50 min)',
        node2Title: '2. Transfer Terrestre',
        node2Desc: 'Van/Ônibus pela BA-001 até Valença ou Torrinhas (~2h a 2h30)',
        node3Title: '3. Lancha Rápida',
        node3Desc: 'Travessia náutica final até o cais de Boipeba (~25 a 50 min)',
        card2Title: 'Via Catamarã + 4x4 (Passando por Morro de São Paulo)',
        card2Badge: 'Para quem quer visitar Morro',
        card2P: 'Catamarã parte do Terminal Náutico de Salvador (Mercado Modelo) até Morro de São Paulo (2h30 em mar aberto). De Morro, um veículo 4x4 cruza as praias até o Rio do Inferno, onde um barquinho de 5 minutos te leva a Boipeba.',
      },
      tips: {
        card1Title: 'Horário Limite das Lanchas Rápidas (Atenção!)',
        card1Badge: 'Sem navegação noturna',
        card1P1: 'As últimas lanchas rápidas regulares saindo de Valença e Torrinhas partem entre 17h e 18h. As embarcações não navegam à noite por motivos de segurança marítima.',
        card1Recommendation: 'Recomendação ALMA: Se o seu voo pousar em Salvador após as 12h30, reserve um transfer privativo com antecedência ou durma a primeira noite em Salvador para fazer a travessia com calma pela manhã.',
        card2Title: 'Carregadores de Mala no Cais e Pé na Areia',
        card2Badge: 'Estrutura local',
        card2P: 'Como não há circulação de carros na ilha, no momento em que você desembarcar no cais de Boipeba haverá carregadores credenciados com carrinhos de mão identificados. Eles transportam suas malas até qualquer pousada da vila ou Praia da Cueira.',
      },
      btnMaps: 'Abrir Boipeba no Google Maps',
      btnClose: 'Entendi, fechar guia',
    },
    pip: {
      badge: 'RECAP',
      expandAria: 'Expandir',
      closeAria: 'Fechar',
      minimizeAria: 'Minimizar',
      pauseAria: 'Pausar',
      playAria: 'Reproduzir',
      muteAria: 'Ativar som',
      unmuteAria: 'Desativar som',
      nextAria: 'Próximo vídeo',
      nextBtn: 'Próximo',
      reopenBtn: '●   Aftermovies ALMA',
      reopenAria: 'Abrir Aftermovies',
      editionSpecial: 'Edição Especial',
      edition2025: 'Edição 2025',
    },
    backToTop: {
      aria: 'Voltar ao topo',
      text: 'TOPO',
    },
    languageSwitcher: {
      ariaLabel: 'Selecionar idioma',
      pt: 'PT',
      en: 'EN',
      es: 'ES',
    },
  },

  en: {
    meta: {
      title: 'ALMA Réveillon 2027 — Boipeba',
      description: 'ALMA Réveillon 2027 in Boipeba. Five nights Open Bar Premium, December 27-31, 2026, at Praia da Cueira.',
      ogTitle: 'ALMA Réveillon 2027 — Boipeba',
      ogDescription: 'Five nights at Praia da Cueira. The new year begins with all ALMA.',
      locale: 'en_US',
    },
    nav: {
      ariaWordmark: 'ALMA, home',
      ariaOpenMenu: 'Open navigation menu',
      ariaCloseMenu: 'Close navigation menu',
      ariaMenuPanel: 'ALMA Réveillon main menu',
      headerBadge: 'ALMA RÉVEILLON 2027 · BOIPEBA',
      liveAlmaBtn: 'EXPERIENCE ALMA',
      items: {
        experience: { label: 'Experience', tagline: 'The celebration that changes your state of mind' },
        media: { label: 'Media', tagline: 'Photos, videos and coverage' },
        lineup: { label: 'Lineup', tagline: '5 nights · Open Bar Premium' },
        lodgingPackages: { label: 'ALMA packages with lodging', tagline: 'Ticket + stay in Boipeba' },
        tickets: { label: 'Tickets', tagline: 'Buy on Sympla' },
        island: { label: 'Boipeba Island', tagline: 'The island, beaches and sand trails' },
        howToArrive: { label: 'How to get there', tagline: 'Routes, transfer and speedboat' },
        whereToStay: { label: 'Where to stay', tagline: 'Inns and villas in Boipeba' },
        faq: { label: 'FAQ', tagline: 'Frequently asked questions' },
      },
    },
    hero: {
      videoAria: 'Landscapes of Boipeba among sunny clouds',
      eyebrow: 'DEC 27 — 31, 2026 · PRAIA DA CUEIRA',
      titlePart1: 'NEW YEAR',
      titlePart2: 'NEW ISLAND',
      subtitle: [
        '1 year of waiting',
        '5 Open Bar Premium parties',
        '7 days on a paradise island in Bahia',
        'And that rare feeling of being exactly where you wanted to be',
      ],
      slogan1: 'Salty soul',
      slogan2: 'Cleansed soul',
      cta: 'Experience ALMA',
      scrollCueAria: 'Continue',
      scrollCueText: 'SCROLL',
    },
    manifesto: {
      kicker: 'AN INVITATION FROM THE ISLAND',
      h2Part1: 'Some celebrations change the date.',
      h2Part2: 'This one changes your state of mind.',
      lead: 'Boipeba is not crossed in a rush. Arriving already shifts the pace: the city is left behind, the sea opens the way, and time begins to follow the tide.',
      p2: 'At Praia da Cueira, ALMA comes alive across five nights between December 27 and 31. Music, sand, connections, and Open Bar Premium compose an experience crafted to finish the year light and enter 2027 whole.',
    },
    cinema: {
      kicker: 'BOIPEBA, BAHIA',
      h2Part1: 'First,',
      h2Part2: 'paradise.',
      p: 'An island reached by sea. Beach, native forest, sand trails, and nights that awaken as the sun sets.',
    },
    squeeze: {
      kicker: 'THE EXPERIENCE IN FOUR MOVEMENTS',
      h2Part1: 'Before the party,',
      h2Part2: "it's already ALMA.",
      cards: [
        {
          title: 'The journey',
          subtitle: 'Arriving in Boipeba already shifts your rhythm. The final stretch unfolds between road, sea, and sand paths.',
          alt: 'Arrival on the island via the pier and sea',
        },
        {
          title: 'The day',
          subtitle: 'Beaches, rainforest, and warm waters before the first beat echoes through the night.',
          alt: 'Group of friends toasting on a speedboat in the crystal waters of Boipeba',
        },
        {
          title: 'The night',
          subtitle: 'Lights, music, and the ocean as the backdrop until dawn.',
          alt: 'Crowded dancefloor of ALMA illuminated during the night party',
        },
        {
          title: 'New Year’s Eve',
          subtitle: 'Fireworks over Praia da Cueira to toast the arrival of 2027.',
          alt: 'Golden and bright fireworks display at New Year’s Eve',
        },
      ],
    },
    gallery: {
      ariaLabel: 'Landscapes and moments of ALMA Réveillon',
      items: [
        { alt: 'Reefs and clear waters seen from above in Boipeba' },
        { alt: 'Beach and coconut groves seen from above' },
        { alt: 'Sandy beach and blue ocean on the island' },
        { alt: 'Coconut palms reflected in island waters' },
        { alt: 'Paradise beach in Boipeba' },
      ],
    },
    lineup: {
      kicker: 'FIVE NIGHTS · OPEN BAR PREMIUM',
      h2Part1: 'Each night,',
      h2Part2: 'a new tide.',
      nights: [
        { date: '27.12', title: 'Roda de Praia', subtitle: '+5521' },
        { date: '28.12', title: 'Isso Não É Um Sunrise', subtitle: 'A night that flows through dawn' },
        { date: '29.12', title: 'MOMO & Biribiri', subtitle: 'Afrobeats under the Bahia sky' },
        { date: '30.12', title: 'Luau do DDP', subtitle: 'Pagode, funk, pop, and electronic' },
        { date: '31.12', title: 'ALMA Réveillon', subtitle: 'New Year’s Eve, by the sea' },
      ],
      sourceNote: 'Lineup published on reference pages. Updates should be verified on the official event channel.',
    },
    openBar: {
      kicker: 'WITHOUT INTERRUPTING THE MOMENT',
      h2Part1: 'Open Bar',
      h2Part2: 'Premium.',
      p: 'Across all five nights, a premium curation of gin, vodka, whiskey, beer, cocktails, energy drinks, and non-alcoholic beverages. On NYE, Prosecco Ponto Nero Brut for the first toast of 2027.',
      brandsAria: 'Open Bar Premium brands',
      highlight: 'NYE with Prosecco Ponto Nero Brut by Casa Valduga',
      month: 'DEC',
    },
    accommodation: {
      kicker: 'COMPLETE PACKAGE · DEC 26 — JAN 02',
      h2Part1: 'Lodging',
      h2Part2: 'ready for you.',
      subhead: 'You just need to arrive in Boipeba.',
      p: 'Choose where to stay and experience five days of ALMA with ticket + lodging in a single package.',
      benefits: {
        ac: 'AIR CONDITIONING',
        tv: 'TV',
        hotShower: 'HOT SHOWER',
        breakfast: 'BREAKFAST',
        cleaning: 'DAILY HOUSEKEEPING',
      },
      locationTitle: 'MARINA · RUA DAS PEDRAS · PRAÇA SANTO ANTÔNIO',
      locationDesc: 'Accommodations close to each other and approximately 7–11 min from Ponto do Trator.',
      viewPricesBtn: 'CHECK PRICES AND AVAILABILITY',
      carouselAria: 'ALMA Accommodations',
      carouselAriaRole: 'carousel',
      cardDetailsBtn: 'VIEW DETAILS',
      soldOut: 'SOLD OUT',
      modal: {
        ariaDialog: (name: string) => `Details for accommodation ${name}`,
        ariaClose: 'Close accommodation details',
        ariaThumb: (num: number, name: string) => `View photo ${num} of ${name}`,
        locationLabel: 'LOCATION',
        viewOnMaps: 'VIEW ON GOOGLE MAPS',
        viewPackage: 'VIEW PACKAGE + LODGING',
        packageSoldOut: 'PACKAGE SOLD OUT',
        packagePrefix: 'PACKAGE · ',
      },
      items: [
        {
          id: 'pedra-de-sal',
          name: 'Pedra de Sal',
          badges: ['Economy Plus'],
          description: 'On Rua das Pedras, upper mezzanine Oxente. Renovated with superior bathroom.',
          period: '26/12 → 02/01',
          statusLabel: '26/12 → 02/01',
          amenities: ['Air conditioning', 'TV', 'Hot shower', 'Breakfast', 'Daily cleaning'],
          location: 'Rua das Pedras · mezzanine Oxente',
        },
        {
          id: 'vila-jesuita',
          name: 'Vila Jesuíta',
          badges: ['Comfort', 'Near the beach'],
          description: 'Comfortable suites in a peaceful location, a few minutes from the beach and village center.',
          period: '31/12 → 02/01',
          statusLabel: '31/12 → 02/01',
          amenities: ['Comfortable suites', 'Balcony', 'Great location', 'Near the beach'],
          location: 'Velha Boipeba · Bahia',
        },
        {
          id: 'maravilha',
          name: 'Maravilha',
          badges: ['Central', 'Comfort'],
          description: 'In the center of Boipeba at Praça Santo Antônio, near restaurants, markets, pharmacy, and services.',
          period: 'Sold Out',
          statusLabel: 'Sold Out',
          amenities: ['Equipped suites', 'Central location', 'Nearby shops'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'pousada-nativa',
          name: 'Pousada Nativa',
          badges: ['Economy', 'Riverside'],
          description: 'Privileged riverfront location, close to the town center and the sea.',
          period: 'Sold Out',
          statusLabel: 'Sold Out',
          amenities: ['Air conditioning', 'Private bathroom', 'Hot shower', 'Minibar', 'Breakfast'],
          location: 'Rua do Porto · Boipeba',
        },
        {
          id: 'pousada-da-vila',
          name: 'Pousada da Vila',
          badges: ['Central', 'Family friendly'],
          description: 'On the main village square, minutes from Praia da Boca da Barra and the pier.',
          period: 'Sold Out',
          statusLabel: 'Sold Out',
          amenities: ['Air conditioning', 'Minibar', 'Buffet breakfast', 'Pet friendly'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'casa-verde',
          name: 'Casa Verde',
          badges: ['Low Cost', 'Central'],
          description: 'Great value on the square. Central location at Praça Santo Antônio.',
          period: 'Sold Out',
          statusLabel: 'Sold Out',
          amenities: ['Air conditioning', 'Private bathroom', 'Wi-Fi', 'Breakfast'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'caminho-de-pedras',
          name: 'Caminho de Pedras',
          badges: ['Near the beach', 'Family atmosphere'],
          description: 'Family inn in the central area, a few minutes from Praia da Boca da Barra.',
          period: 'Sold Out',
          statusLabel: 'Sold Out',
          amenities: ['Air conditioning', 'Wi-Fi', 'Minibar', 'Breakfast'],
          location: 'Rua das Pedras · Boipeba',
        },
      ],
    },
    stories: {
      kicker: 'STORIES FROM OTHER TIDES',
      h2Part1: 'What lingers',
      h2Part2: 'after New Year’s Eve.',
      cards: [
        {
          tag: 'ARRIVAL',
          title: 'The city ends at the pier.',
          p: 'The journey is not a pause. It is the opening chapter: when the path meets the sea, haste begins to fade away.',
        },
        {
          tag: 'GATHERING',
          title: 'The dancefloor has no walls.',
          p: 'Praia da Cueira reimagines the scale of the celebration. The horizon remains in view as the music flows through the night.',
        },
        {
          tag: 'MEMORY',
          title: 'The sunrise closes the night.',
          p: 'Images from past editions capture what an artist lineup cannot explain: people who arrived for a festival and left carrying an entire landscape.',
        },
      ],
    },
    notices: {
      kicker: 'BEFORE BOOKING YOUR PACKAGE',
      h2Part1: 'OPEN BAR, YES.',
      h2Part2: 'OPEN FOOD, NO.',
      subtitle: 'Open Bar Premium at every party. Food and snacks are sold separately in our gastronomic food court.',
      card1: {
        title: 'ARRIVING ON THE 28TH OR 29TH?',
        text: 'Bought the Full Pass? No stress. Your access kit will remain reserved in your name until your arrival day.',
        badge: 'Reserved Kit Guaranteed',
      },
      card2: {
        title: 'PAYMENT',
        pixTitle: 'PIX (BRAZIL CASH)',
        pixDiscount: '10% OFF SERVICE FEE',
        pixDesc: 'Single payment: 1 person makes the PIX transfer for the full group/room amount.',
        ccTitle: 'CREDIT CARD',
        ccDesc: 'Via Sympla. For groups of 2–5 people, each member can pay with their card on the same day to secure their ticket and spot in the selected room.',
      },
      card3: {
        title: 'OFFICIAL CHANNELS',
        instagramLabel: 'INSTAGRAM',
        emailLabel: 'E-MAIL',
        symplaLabel: 'SYMPLA',
        symplaText: 'Only through the official link.',
        instagramBtn: 'INSTAGRAM',
        symplaBtn: 'SYMPLA',
      },
      card4: {
        title: 'SAFETY',
        p1: 'Use only official ALMA channels.',
        p2: 'Followed by a fake account? Report it.',
        p3: 'Your support is essential to protect the ALMA community.',
        badge: 'Protected Community',
      },
    },
    faq: {
      kicker: 'BEFORE YOU GO',
      h2Part1: 'Top questions,',
      h2Part2: 'answered.',
      items: [
        {
          question: 'Where and when does ALMA Réveillon 2027 take place?',
          answer: 'At Praia da Cueira, in Cairu, Bahia, between December 27 and 31, 2026. The published schedule begins at 11:00 PM for the first four nights, and at 10:00 PM on December 31.',
        },
        {
          question: 'What is the lineup?',
          answer: 'The current program brings together Roda de Praia, Isso Não É Um Sunrise, MOMO & Biribiri, Luau do DDP, and ALMA Réveillon between December 27 and 31. Any updates must be confirmed through official channels.',
        },
        {
          question: 'Does the pass include all nights?',
          answer: 'The official event offers five Open Bar Premium parties. Ticket categories, batches, and availability should be checked on Sympla prior to checkout.',
        },
        {
          question: 'What is included in the Open Bar Premium?',
          answer: 'The curated selection features Beefeater, Absolut, Jameson, premium beer, Aperol Spritz, Red Bull, tonic, soft drinks, juices, coconut water, and water. On NYE, Prosecco Ponto Nero Brut by Casa Valduga is also served.',
        },
        {
          question: 'Are lodging packages available?',
          answer: 'Yes. ALMA offers ticket + lodging packages between Dec 26 and Jan 02, subject to availability. Check updated options and rates through the official ticketing platform.',
        },
        {
          question: 'What lodging options are available?',
          answer: 'Featured options include Maravilha, Pousada Nativa, Pousada da Vila, Casa Verde, Caminho de Pedras, Pedra de Sal, and Vila Jesuíta. Availability and package dates appear in the carousel and should be verified on the official sales channel.',
        },
        {
          question: 'Is the event Open Food?',
          answer: 'No. All five parties feature Open Bar Premium. Meals and snacks are sold separately in the gourmet food court.',
        },
        {
          question: 'Can I arrive on Dec 28 or 29 if I hold a Full Pass?',
          answer: 'Yes. Your access credentials kit remains safely reserved under the ticket holder’s name until you arrive.',
        },
        {
          question: 'How do I get to Boipeba?',
          answer: 'Traveling to Boipeba requires advance planning. Options include speedboats and land-sea transfers. Confirm schedules and routes directly with licensed operators.',
        },
        {
          question: 'Can I transfer or cancel my ticket?',
          answer: 'Sympla allows cancellations according to platform policy and permits attendee name changes up to 24 hours prior to the event. The festival is strictly for attendees aged 18 and over.',
        },
        {
          question: 'What are the official communication channels?',
          answer: 'Instagram @almareveillonboipeba, email falacomigo@almareveillon.com.br, and the official event listing on Sympla.',
        },
      ],
    },
    finale: {
      kicker: 'HAPPY NEW ILHA',
      h2Part1: 'YOUR BEST YEAR',
      h2Part2: 'WILL BEGIN HERE.',
      locationSchedule: 'Praia da Cueira · Cairu, Bahia\nDecember 27, 11 PM — January 1, 6 AM',
      cta: 'Buy on Sympla',
      legal: '18+ event. Purchases and policies through the official platform.',
    },
    footer: {
      brandDesc: 'Five nights on the island. The sea close by. Feet in the sand. And that rare feeling of being exactly where you wanted to be.',
      locationBadge: 'PRAIA DA CUEIRA · BOIPEBA',
      sectionEvent: 'The Event',
      sectionInfo: 'Information',
      sectionWhenWhere: 'When & Where',
      whenDates: 'December 27 — 31, 2026',
      whereLocation: 'Praia da Cueira, Cairu — Boipeba, BA',
      navExperience: 'Experience',
      navLineup: 'Lineup',
      navIsland: 'Boipeba, Bahia',
      navOpenBar: 'Open Bar Premium',
      navLodging: 'Lodging',
      navFaq: 'FAQ',
      navHowToArrive: 'How to Get There',
      navSymplaTickets: 'Sympla Tickets',
      ctaButton: 'Secure Ticket',
      officialChannels: 'OFFICIAL CHANNELS',
      officialInstagram: 'Instagram · @almareveillonboipeba',
      officialEmail: 'E-mail · falacomigo@almareveillon.com.br',
      officialTickets: 'Tickets · Sympla',
      instagramAria: 'Official ALMA Instagram',
      officialSalesBy: 'Official ticketing by',
      copyright: `© ${new Date().getFullYear()} ALMA Réveillon. All rights reserved.`,
      legalBottom: 'Open Bar Premium · Open Food not included · 18+ Event.',
    },
    howToArrive: {
      ariaDialog: 'Travel Guide: How to Get to Boipeba Island',
      ariaClose: 'Close travel guide',
      kicker: 'TRAVEL GUIDE · BOIPEBA, BAHIA',
      h2Part1: 'How to Arrive ',
      h2Part2: 'at ALMA',
      intro: 'No cars are allowed on Boipeba Island. The crossing by sea or air is already part of the ritual to slow down. Choose the best route for your starting point.',
      tabs: {
        plane: 'By Plane',
        car: 'By Car',
        salvador: 'From Salvador',
        tips: 'Essential Tips',
      },
      plane: {
        card1Title: 'Fastest Option: Direct Air Taxi (Salvador → Boipeba)',
        card1Badge: '~25 to 30 min flight',
        card1P: 'Chartered and scheduled twin-engine flights depart from Salvador International Airport (SSA) directly to the Pontal Farm airstrip (located right across from Boipeba).',
        card1Step1: 'Board at Salvador airport (executive terminal / air taxi).',
        card1Step2: 'Land at Fazenda Pontal airstrip, surrounded by coconut palms.',
        card1Step3: 'Quick 5-minute boat crossing to Boipeba village pier.',
        card2Title: 'Commercial Flight via Valença Airport (VAL)',
        card2Badge: 'Regional commercial connection',
        card2P: 'During high summer season, airlines such as Azul Conecta operate commercial flights to Valença Airport (VAL).',
        card2Step1: 'Land in Valença → 20 min taxi to the maritime terminal.',
        card2Step2: 'Direct speedboat to Boipeba in approximately 50 minutes.',
      },
      car: {
        card1Title: 'Recommended Route: By Car to Torrinhas',
        card1Badge: 'Only 20 min speedboat crossing',
        card1P: 'If you are driving your own or rented vehicle, the Torrinhas Pier is by far the quickest and best nautical alternative to Boipeba.',
        card1Step1: 'From Salvador: Ferry-boat to Bom Despacho (Itaparica) and drive along BA-001 to the Cairu junction toward Torrinhas.',
        card1Step2: 'From Southern Bahia (Ilhéus/Itacaré): Drive north on BA-001 straight toward Torrinhas.',
        card1Step3: 'Secure parking: Torrinhas offers multiple private, walled, and covered parking facilities for complete peace of mind.',
        card1Step4: 'Speedboat: The river crossing to Boipeba village takes just 20 to 25 minutes along calm, sheltered waters.',
        card2Title: 'Alternative: Parking in Valença or Graciosa',
        card2Badge: '~50 min speedboat',
        card2P: 'You can also park in downtown Valença or at Graciosa Pier. Speedboats depart hourly to Boipeba (a 50 to 60-minute scenic boat ride).',
      },
      salvador: {
        card1Title: 'Integrated Land & Sea Transfer (Most Popular)',
        card1Badge: 'Total travel time: ~4h30 to 5h30',
        card1P: 'The most traditional and economical transfer from Bahia’s capital. Specialized tour agencies offer full packages picking you up at Salvador airport or hotel.',
        node1Title: '1. Ferry-Boat',
        node1Desc: 'Salvador → Bom Despacho (Itaparica) (~50 min)',
        node2Title: '2. Ground Transfer',
        node2Desc: 'Van/Bus along BA-001 to Valença or Torrinhas (~2h to 2h30)',
        node3Title: '3. Speedboat',
        node3Desc: 'Final nautical crossing to Boipeba pier (~25 to 50 min)',
        card2Title: 'Via Catamaran + 4x4 (Via Morro de São Paulo)',
        card2Badge: 'For travelers wanting to visit Morro',
        card2P: 'Catamarans leave Salvador Maritime Terminal (Mercado Modelo) to Morro de São Paulo (2h30 open sea). From Morro, a 4x4 travels across beaches to Rio do Inferno, where a 5-minute boat lands in Boipeba.',
      },
      tips: {
        card1Title: 'Speedboat Daily Cut-Off Time (Crucial!)',
        card1Badge: 'No night navigation',
        card1P1: 'The last regular speedboats from Valença and Torrinhas leave between 5:00 PM and 6:00 PM. Night boating is prohibited for maritime safety reasons.',
        card1Recommendation: 'ALMA Recommendation: If your flight arrives in Salvador after 12:30 PM, book a private transfer in advance or spend your first night in Salvador to travel comfortably the next morning.',
        card2Title: 'Pier Luggage Handlers and Sand Trails',
        card2Badge: 'Local island service',
        card2P: 'Because no cars enter the island, licensed cart porters are waiting at Boipeba pier upon your arrival. They will carry your luggage directly to any inn in town or Praia da Cueira.',
      },
      btnMaps: 'Open Boipeba on Google Maps',
      btnClose: 'Got it, close guide',
    },
    pip: {
      badge: 'RECAP',
      expandAria: 'Expand',
      closeAria: 'Close',
      minimizeAria: 'Minimize',
      pauseAria: 'Pause',
      playAria: 'Play',
      muteAria: 'Unmute',
      unmuteAria: 'Mute',
      nextAria: 'Next video',
      nextBtn: 'Next',
      reopenBtn: '●   ALMA Aftermovies',
      reopenAria: 'Open Aftermovies',
      editionSpecial: 'Special Edition',
      edition2025: '2025 Edition',
    },
    backToTop: {
      aria: 'Back to top',
      text: 'TOP',
    },
    languageSwitcher: {
      ariaLabel: 'Select language',
      pt: 'PT',
      en: 'EN',
      es: 'ES',
    },
  },

  es: {
    meta: {
      title: 'ALMA Réveillon 2027 — Boipeba',
      description: 'ALMA Réveillon 2027 en Boipeba. Cinco noches Open Bar Premium, del 27 al 31 de diciembre de 2026, en Praia da Cueira.',
      ogTitle: 'ALMA Réveillon 2027 — Boipeba',
      ogDescription: 'Cinco noches en Praia da Cueira. El año nuevo comienza con toda el ALMA.',
      locale: 'es_ES',
    },
    nav: {
      ariaWordmark: 'ALMA, inicio',
      ariaOpenMenu: 'Abrir menú de navegación',
      ariaCloseMenu: 'Cerrar menú de navegación',
      ariaMenuPanel: 'Menú principal ALMA Réveillon',
      headerBadge: 'ALMA RÉVEILLON 2027 · BOIPEBA',
      liveAlmaBtn: 'VIVIR EL ALMA',
      items: {
        experience: { label: 'Experiencia', tagline: 'El año nuevo que cambia el estado de ánimo' },
        media: { label: 'Medios', tagline: 'Fotos, videos y reportajes' },
        lineup: { label: 'Programación', tagline: '5 noches · Open Bar Premium' },
        lodgingPackages: { label: 'Paquetes ALMA con hospedaje', tagline: 'Entrada + estadía en Boipeba' },
        tickets: { label: 'Entradas', tagline: 'Comprar en Sympla' },
        island: { label: 'Isla de Boipeba', tagline: 'La isla, las playas y los senderos de arena' },
        howToArrive: { label: 'Cómo llegar', tagline: 'Rutas, traslado y lancha' },
        whereToStay: { label: 'Dónde alojarse', tagline: 'Posadas y casas en Boipeba' },
        faq: { label: 'Preguntas', tagline: 'Preguntas frecuentes' },
      },
    },
    hero: {
      videoAria: 'Paisajes de Boipeba entre nubes soleadas',
      eyebrow: '27 — 31 DIC 2026 · PRAIA DA CUEIRA',
      titlePart1: 'AÑO NUEVO',
      titlePart2: 'ISLA NUEVA',
      subtitle: [
        '1 año de espera',
        '5 fiestas Open Bar Premium',
        '7 días en una isla paradisíaca en Bahia',
        'Y esa sensación única de estar exactamente donde querías estar',
      ],
      slogan1: 'Alma salada',
      slogan2: 'Alma renovada',
      cta: 'Vivir el ALMA',
      scrollCueAria: 'Continuar',
      scrollCueText: 'BAJAR',
    },
    manifesto: {
      kicker: 'UNA INVITACIÓN DE LA ISLA',
      h2Part1: 'Hay celebraciones que cambian la fecha.',
      h2Part2: 'Esta cambia el estado de ánimo.',
      lead: 'Boipeba no se recorre con prisa. La llegada ya transforma el ritmo: la ciudad queda atrás, el mar abre camino y el tiempo pasa a obedecer la marea.',
      p2: 'En Praia da Cueira, ALMA se vive durante cinco noches entre el 27 y el 31 de diciembre. Música, arena, encuentros y Open Bar Premium componen una experiencia diseñada para terminar el año ligero y comenzar 2027 pleno.',
    },
    cinema: {
      kicker: 'BOIPEBA, BAHIA',
      h2Part1: 'Primero,',
      h2Part2: 'el paraíso.',
      p: 'Una isla a la que se llega por mar. Playa, bosque, caminos de arena y noches que despiertan cuando el sol se pone.',
    },
    squeeze: {
      kicker: 'LA EXPERIENCIA EN CUATRO MOVIMIENTOS',
      h2Part1: 'Antes de la fiesta,',
      h2Part2: 'ya es ALMA.',
      cards: [
        {
          title: 'El camino',
          subtitle: 'Llegar a Boipeba ya cambia el ritmo. El tramo final transcurre entre carretera, mar y senderos de arena.',
          alt: 'Llegada a la isla por el muelle y el mar',
        },
        {
          title: 'El día',
          subtitle: 'Playas, selva y aguas cálidas antes de que el primer ritmo atraviese la noche.',
          alt: 'Grupo de amigas brindando en lancha en las aguas cristalinas de Boipeba',
        },
        {
          title: 'La noche',
          subtitle: 'Luces, música y el mar como escenario hasta el amanecer.',
          alt: 'Pista llena de ALMA iluminada durante la fiesta nocturna',
        },
        {
          title: 'Año Nuevo',
          subtitle: 'Fuegos artificiales sobre Praia da Cueira para brindar la llegada de 2027.',
          alt: 'Espectáculo de fuegos artificiales dorado e iluminado en Año Nuevo',
        },
      ],
    },
    gallery: {
      ariaLabel: 'Paisajes y momentos del ALMA Réveillon',
      items: [
        { alt: 'Arrecifes y aguas cristalinas vistas desde arriba en Boipeba' },
        { alt: 'Playa y cocoteros vistos desde las alturas' },
        { alt: 'Franja de arena y mar azul en la isla' },
        { alt: 'Cocoteros reflejados en las aguas de la isla' },
        { alt: 'Playa paradisíaca en Boipeba' },
      ],
    },
    lineup: {
      kicker: 'CINCO NOCHES · OPEN BAR PREMIUM',
      h2Part1: 'Cada noche,',
      h2Part2: 'una nueva marea.',
      nights: [
        { date: '27.12', title: 'Roda de Praia', subtitle: '+5521' },
        { date: '28.12', title: 'Isso Não É Um Sunrise', subtitle: 'Una noche que atraviesa la madrugada' },
        { date: '29.12', title: 'MOMO & Biribiri', subtitle: 'Afrobeats bajo el cielo de Bahia' },
        { date: '30.12', title: 'Luau do DDP', subtitle: 'Pagode, funk, pop y electrónica' },
        { date: '31.12', title: 'ALMA Réveillon', subtitle: 'Año Nuevo, a la orilla del mar' },
      ],
      sourceNote: 'Programación publicada en las páginas de referencia. Cualquier cambio debe confirmarse en el canal oficial del evento.',
    },
    openBar: {
      kicker: 'SIN INTERRUMPIR EL MOMENTO',
      h2Part1: 'Open Bar',
      h2Part2: 'Premium.',
      p: 'Durante las cinco noches, una selección premium de gin, vodka, whisky, cerveza, cócteles, energizantes y bebidas sin alcohol. En Año Nuevo, Prosecco Ponto Nero Brut para el primer brindis de 2027.',
      brandsAria: 'Marcas del Open Bar Premium',
      highlight: 'Año Nuevo con Prosecco Ponto Nero Brut by Casa Valduga',
      month: 'DIC',
    },
    accommodation: {
      kicker: 'PAQUETE COMPLETO · 26/12 — 02/01',
      h2Part1: 'Un hospedaje',
      h2Part2: 'listo.',
      subhead: 'Solo necesitas llegar a Boipeba.',
      p: 'Elige dónde alojarte y vive los cinco días de ALMA con entrada + hospedaje en un solo paquete.',
      benefits: {
        ac: 'AIRE ACONDICIONADO',
        tv: 'TV',
        hotShower: 'DUCHA CALIENTE',
        breakfast: 'DESAYUNO',
        cleaning: 'LIMPIEZA DIARIA',
      },
      locationTitle: 'MARINA · RUA DAS PEDRAS · PRAÇA SANTO ANTÔNIO',
      locationDesc: 'Hospedajes cercanos entre sí y a aproximadamente 7–11 min del Ponto do Trator.',
      viewPricesBtn: 'VER PRECIOS Y DISPONIBILIDAD',
      carouselAria: 'Hospedajes ALMA',
      carouselAriaRole: 'carousel',
      cardDetailsBtn: 'VER DETALLES',
      soldOut: 'AGOTADO',
      modal: {
        ariaDialog: (name: string) => `Detalles del hospedaje ${name}`,
        ariaClose: 'Cerrar detalles del hospedaje',
        ariaThumb: (num: number, name: string) => `Ver foto ${num} de ${name}`,
        locationLabel: 'UBICACIÓN',
        viewOnMaps: 'VER EN GOOGLE MAPS',
        viewPackage: 'VER PAQUETE + HOSPEDAJE',
        packageSoldOut: 'PAQUETE AGOTADO',
        packagePrefix: 'PAQUETE · ',
      },
      items: [
        {
          id: 'pedra-de-sal',
          name: 'Pedra de Sal',
          badges: ['Economy Plus'],
          description: 'En Rua das Pedras, entrepiso Oxente. Reformada con baño superior.',
          period: '26/12 → 02/01',
          statusLabel: '26/12 → 02/01',
          amenities: ['Aire acondicionado', 'TV', 'Ducha caliente', 'Desayuno', 'Limpieza diaria'],
          location: 'Rua das Pedras · sobretienda Oxente',
        },
        {
          id: 'vila-jesuita',
          name: 'Vila Jesuíta',
          badges: ['Confort', 'Cerca de la playa'],
          description: 'Suites confortables en una ubicación tranquila, a pocos minutos de la playa y del centro de la villa.',
          period: '31/12 → 02/01',
          statusLabel: '31/12 → 02/01',
          amenities: ['Suites confortables', 'Balcón', 'Buena ubicación', 'Cerca de la playa'],
          location: 'Velha Boipeba · Bahia',
        },
        {
          id: 'maravilha',
          name: 'Maravilha',
          badges: ['Céntrico', 'Confort'],
          description: 'En el centro de Boipeba, en Praça Santo Antônio, cerca de restaurantes, mercado, farmacia y servicios.',
          period: 'Agotado',
          statusLabel: 'Agotado',
          amenities: ['Suites equipadas', 'Ubicación céntrica', 'Comercio cercano'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'pousada-nativa',
          name: 'Pousada Nativa',
          badges: ['Economy', 'Orilla del río'],
          description: 'Ubicación privilegiada frente al río, cercana al centro y al mar.',
          period: 'Agotado',
          statusLabel: 'Agotado',
          amenities: ['Aire acondicionado', 'Baño privado', 'Ducha caliente', 'Frigobar', 'Desayuno'],
          location: 'Rua do Porto · Boipeba',
        },
        {
          id: 'pousada-da-vila',
          name: 'Pousada da Vila',
          badges: ['Céntrico', 'Familiar'],
          description: 'En la plaza principal de la isla, a pocos minutos de Praia da Boca da Barra y del muelle.',
          period: 'Agotado',
          statusLabel: 'Agotado',
          amenities: ['Aire acondicionado', 'Frigobar', 'Desayuno buffet', 'Pet friendly'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'casa-verde',
          name: 'Casa Verde',
          badges: ['Bajo costo', 'Céntrico'],
          description: 'Opción con excelente relación precio-calidad. Ubicación céntrica en Praça Santo Antônio.',
          period: 'Agotado',
          statusLabel: 'Agotado',
          amenities: ['Aire acondicionado', 'Baño privado', 'Wi-Fi', 'Desayuno'],
          location: 'Praça Santo Antônio · Boipeba',
        },
        {
          id: 'caminho-de-pedras',
          name: 'Caminho de Pedras',
          badges: ['Cerca de la playa', 'Familiar'],
          description: 'Posada familiar en la zona céntrica, a pocos minutos de Praia da Boca da Barra.',
          period: 'Agotado',
          statusLabel: 'Agotado',
          amenities: ['Aire acondicionado', 'Wi-Fi', 'Frigobar', 'Desayuno'],
          location: 'Rua das Pedras · Boipeba',
        },
      ],
    },
    stories: {
      kicker: 'HISTORIAS DE OTRAS MAREAS',
      h2Part1: 'Lo que perdura',
      h2Part2: 'después de Año Nuevo.',
      cards: [
        {
          tag: 'LLEGADA',
          title: 'La ciudad termina en el muelle.',
          p: 'El traslado no es una pausa. Es el primer capítulo: cuando el camino encuentra el mar, la prisa pierde importancia.',
        },
        {
          tag: 'ENCUENTRO',
          title: 'La pista no tiene paredes.',
          p: 'Praia da Cueira cambia la escala de la fiesta. El horizonte permanece a la vista mientras la música atraviesa la madrugada.',
        },
        {
          tag: 'MEMORIA',
          title: 'El sol despide la noche.',
          p: 'Las imágenes de ediciones anteriores guardan lo que una lista de artistas no explica: gente que llegó para una fiesta y se fue llevando un paisaje entero.',
        },
      ],
    },
    notices: {
      kicker: 'ANTES DE RESERVAR TU PAQUETE',
      h2Part1: 'OPEN BAR, SÍ.',
      h2Part2: 'OPEN FOOD, NO.',
      subtitle: 'Open Bar Premium en todas las fiestas. Alimentos y bocadillos se venden por separado en nuestro patio gastronómico.',
      card1: {
        title: '¿LLEGAS EL 28 O 29?',
        text: '¿Compraste el Full Pass? Sin estrés. Tu kit de acceso quedará reservado a tu nombre hasta el día de tu llegada.',
        badge: 'Kit Reservado Garantizado',
      },
      card2: {
        title: 'PAGO',
        pixTitle: 'PIX (BRASIL AL CONTADO)',
        pixDiscount: '10% OFF DE TARIFA',
        pixDesc: 'Pago único: 1 persona realiza el PIX por el valor total del grupo/habitación.',
        ccTitle: 'TARJETA DE CRÉDITO',
        ccDesc: 'Vía Sympla. Para grupos de 2 a 5 personas, cada integrante puede pagar con su tarjeta el mismo día para asegurar su entrada y lugar en la habitación elegida.',
      },
      card3: {
        title: 'CANALES OFICIALES',
        instagramLabel: 'INSTAGRAM',
        emailLabel: 'E-MAIL',
        symplaLabel: 'SYMPLA',
        symplaText: 'Solamente a través del enlace oficial.',
        instagramBtn: 'INSTAGRAM',
        symplaBtn: 'SYMPLA',
      },
      card4: {
        title: 'SEGURIDAD',
        p1: 'Utiliza únicamente los canales oficiales de ALMA.',
        p2: '¿Te siguió un perfil falso? Denúncialo.',
        p3: 'Tu ayuda es fundamental para proteger la comunidad ALMA.',
        badge: 'Comunidad Protegida',
      },
    },
    faq: {
      kicker: 'ANTES DE VIAJAR',
      h2Part1: 'Las mayores',
      h2Part2: 'dudas, respondidas.',
      items: [
        {
          question: '¿Dónde y cuándo se realiza el ALMA Réveillon 2027?',
          answer: 'En Praia da Cueira, en Cairu, Bahia, entre el 27 y el 31 de diciembre de 2026. El cronograma publicado comienza a las 23:00 en las cuatro primeras noches; el 31, a las 22:00.',
        },
        {
          question: '¿Cuál es la programación?',
          answer: 'La grilla actual reúne a Roda de Praia, Isso Não É Um Sunrise, MOMO & Biribiri, Luau do DDP y ALMA Réveillon entre el 27 y el 31 de diciembre. Cualquier actualización debe consultarse en los canales oficiales.',
        },
        {
          question: '¿El pase incluye todas las noches?',
          answer: 'El evento oficial incluye cinco fiestas Open Bar Premium. Las categorías, lotes y disponibilidad deben consultarse en la plataforma Sympla antes de la compra.',
        },
        {
          question: '¿Qué incluye el Open Bar Premium?',
          answer: 'La carta confirmada incluye Beefeater, Absolut, Jameson, cerveza premium, Aperol Spritz, Red Bull, tónica, refrescos, jugos, agua de coco y agua. En Año Nuevo, también se sirve Prosecco Ponto Nero Brut by Casa Valduga.',
        },
        {
          question: '¿Existen paquetes con hospedaje?',
          answer: 'Sí. ALMA dispone de opciones de paquetes con entrada + hospedaje entre el 26/12 y el 02/01, sujetos a disponibilidad. Consulta las opciones actualizadas en el canal oficial de ventas.',
        },
        {
          question: '¿Cuáles son las opciones de hospedaje?',
          answer: 'Las alternativas presentadas son Maravilha, Pousada Nativa, Pousada da Vila, Casa Verde, Caminho de Pedras, Pedra de Sal y Vila Jesuíta. La disponibilidad y las fechas de cada paquete se detallan en el carrusel y deben confirmarse en el canal oficial.',
        },
        {
          question: '¿El evento es Open Food?',
          answer: 'No. Las cinco fiestas cuentan con Open Bar Premium. La comida no está incluida y podrá adquirirse por separado en la plaza gastronómica.',
        },
        {
          question: '¿Puedo llegar el 28 o 29 aunque tenga Full Pass?',
          answer: 'Sí. Tu kit de acceso permanece reservado a nombre del comprador hasta el momento de tu llegada.',
        },
        {
          question: '¿Cómo llegar a Boipeba?',
          answer: 'Llegar a Boipeba requiere planificación. Hay opciones en lancha rápida y traslados semiterrestres. Confirma rutas, horarios y disponibilidad directamente con los proveedores habilitados.',
        },
        {
          question: '¿Puedo transferir o cancelar mi entrada?',
          answer: 'Sympla admite cancelaciones según sus términos y permite editar el titular de la entrada hasta 24 horas antes del evento. Evento exclusivo para mayores de 18 años.',
        },
        {
          question: '¿Cuáles son los canales oficiales?',
          answer: 'Instagram @almareveillonboipeba, correo falacomigo@almareveillon.com.br y la página oficial del evento en Sympla.',
        },
      ],
    },
    finale: {
      kicker: 'HAPPY NEW ILHA',
      h2Part1: 'TU MEJOR AÑO',
      h2Part2: 'COMENZARÁ AQUÍ.',
      locationSchedule: 'Praia da Cueira · Cairu, Bahia\n27 de diciembre, 23:00 — 1º de enero, 06:00',
      cta: 'Comprar en Sympla',
      legal: 'Evento para mayores de 18 años. Compra y políticas a través de la plataforma oficial.',
    },
    footer: {
      brandDesc: 'Cinco noches en la isla. El mar cerca. Los pies en la arena. Y esa sensación única de estar exactamente donde querías estar.',
      locationBadge: 'PRAIA DA CUEIRA · BOIPEBA',
      sectionEvent: 'El Evento',
      sectionInfo: 'Información',
      sectionWhenWhere: 'Cuándo & Dónde',
      whenDates: '27 — 31 de Diciembre de 2026',
      whereLocation: 'Praia da Cueira, Cairu — Boipeba, BA',
      navExperience: 'Experiencia',
      navLineup: 'Programación',
      navIsland: 'Boipeba, Bahia',
      navOpenBar: 'Open Bar Premium',
      navLodging: 'Hospedaje',
      navFaq: 'Preguntas Frecuentes',
      navHowToArrive: 'Cómo Llegar',
      navSymplaTickets: 'Entradas Sympla',
      ctaButton: 'Asegurar Entrada',
      officialChannels: 'CANALES OFICIALES',
      officialInstagram: 'Instagram · @almareveillonboipeba',
      officialEmail: 'E-mail · falacomigo@almareveillon.com.br',
      officialTickets: 'Entradas · Sympla',
      instagramAria: 'Instagram Oficial ALMA',
      officialSalesBy: 'Venta oficial por',
      copyright: `© ${new Date().getFullYear()} ALMA Réveillon. Todos los derechos reservados.`,
      legalBottom: 'Open Bar Premium · Open Food no incluido · Evento +18.',
    },
    howToArrive: {
      ariaDialog: 'Guía de Viaje: Cómo Llegar a la Isla de Boipeba',
      ariaClose: 'Cerrar guía de rutas',
      kicker: 'GUÍA DE VIAJE · BOIPEBA, BAHIA',
      h2Part1: 'Cómo Llegar ',
      h2Part2: 'a ALMA',
      intro: 'No circulan autos en la Isla de Boipeba. La travesía por mar o por aire ya forma parte del ritual para desacelerar. Elige la mejor ruta desde tu punto de partida.',
      tabs: {
        plane: 'En Avión',
        car: 'En Auto',
        salvador: 'Desde Salvador',
        tips: 'Consejos Clave',
      },
      plane: {
        card1Title: 'Opción Más Rápida: Taxi Aéreo directo (Salvador → Boipeba)',
        card1Badge: '~25 a 30 minutos de vuelo',
        card1P: 'Vuelos chárter y regulares en aeronaves bimotores parten del Aeropuerto Internacional de Salvador (SSA) directamente a la pista de Fazenda Pontal (ubicada frente a Boipeba).',
        card1Step1: 'Embarque en el aeropuerto de Salvador (terminal ejecutiva / taxi aéreo).',
        card1Step2: 'Aterrizaje en la pista de Fazenda Pontal, rodeada de cocoteros.',
        card1Step3: 'Cruce rápido de 5 minutos en lancha hasta el muelle de la villa de Boipeba.',
        card2Title: 'Vuelo Comercial vía Aeropuerto de Valença (VAL)',
        card2Badge: 'Conexión comercial regional',
        card2P: 'Durante la temporada alta de verano, aerolíneas como Azul Conecta operan vuelos comerciales con destino al Aeropuerto de Valença (VAL).',
        card2Step1: 'Aterrizaje en Valença → taxi de 20 min hasta la terminal marítima.',
        card2Step2: 'Lancha rápida directa a Boipeba en unos 50 minutos.',
      },
      car: {
        card1Title: 'Ruta Recomendada: En Auto hasta Torrinhas',
        card1Badge: 'Solo 20 min de lancha rápida',
        card1P: 'Si viajas en auto propio o alquilado, el Atracadouro de Torrinhas es por lejos la mejor y más corta alternativa náutica hacia Boipeba.',
        card1Step1: 'Saliendo de Salvador: Ferry-boat hasta Bom Despacho (Itaparica) y sigue por la BA-001 hasta el cruce de Cairu hacia Torrinhas.',
        card1Step2: 'Saliendo del Sur de Bahia (Ilhéus/Itacaré): Sube por la BA-001 directo hacia Torrinhas.',
        card1Step3: 'Estacionamiento seguro: En Torrinhas existen varios estacionamientos privados, cerrados y techados para dejar el vehículo con tranquilidad.',
        card1Step4: 'Lancha rápida: El cruce hasta la villa de Boipeba toma solo 20 a 25 minutos por un río protegido y calmo.',
        card2Title: 'Alternativa: Estacionamiento en Valença o Graciosa',
        card2Badge: '~50 min de lancha rápida',
        card2P: 'También puedes estacionar en el centro de Valença o en el Atracadouro da Graciosa. Desde allí, salen lanchas rápidas cada hora hacia Boipeba (trayecto de 50 minutos a 1 hora).',
      },
      salvador: {
        card1Title: 'Semiterrestre Integrado (Opción Más Buscada)',
        card1Badge: 'Duración total: ~4h30 a 5h30',
        card1P: 'Es la forma más tradicional y económica de llegar desde la capital. Diversas agencias turísticas ofrecen el traslado semiterrestre completo, recogiéndote en el aeropuerto u hotel de Salvador.',
        node1Title: '1. Ferry-Boat',
        node1Desc: 'Salvador → Bom Despacho (Itaparica) (~50 min)',
        node2Title: '2. Traslado Terrestre',
        node2Desc: 'Van/Autobús por la BA-001 hasta Valença o Torrinhas (~2h a 2h30)',
        node3Title: '3. Lancha Rápida',
        node3Desc: 'Cruce náutico final hasta el muelle de Boipeba (~25 a 50 min)',
        card2Title: 'Vía Catamarán + 4x4 (Pasando por Morro de São Paulo)',
        card2Badge: 'Para quienes desean visitar Morro',
        card2P: 'El catamarán sale de la Terminal Náutica de Salvador (Mercado Modelo) hasta Morro de São Paulo (2h30 en mar abierto). Desde Morro, un vehículo 4x4 recorre las playas hasta Rio do Inferno, donde un barco de 5 minutos te lleva a Boipeba.',
      },
      tips: {
        card1Title: 'Horario Límite de las Lanchas Rápidas (¡Atención!)',
        card1Badge: 'Sin navegación nocturna',
        card1P1: 'Las últimas lanchas rápidas regulares desde Valença y Torrinhas zarpan entre las 17:00 y las 18:00. Las embarcaciones no navegan de noche por motivos de seguridad marítima.',
        card1Recommendation: 'Recomendación ALMA: Si tu vuelo aterriza en Salvador después de las 12:30, reserva un traslado privado con antelación o pernocta en Salvador para realizar la travesía con calma por la mañana.',
        card2Title: 'Porteadores de Equipaje en el Muelle y Senderos de Arena',
        card2Badge: 'Servicio local',
        card2P: 'Al no haber autos en la isla, en cuanto desembarques en el muelle de Boipeba habrá porteadores identificados con carretillas. Ellos trasladan tu equipaje hasta cualquier posada de la villa o Praia da Cueira.',
      },
      btnMaps: 'Abrir Boipeba en Google Maps',
      btnClose: 'Entendido, cerrar guía',
    },
    pip: {
      badge: 'RECAP',
      expandAria: 'Expandir',
      closeAria: 'Cerrar',
      minimizeAria: 'Minimizar',
      pauseAria: 'Pausar',
      playAria: 'Reproducir',
      muteAria: 'Activar sonido',
      unmuteAria: 'Silenciar',
      nextAria: 'Próximo video',
      nextBtn: 'Siguiente',
      reopenBtn: '●   Aftermovies ALMA',
      reopenAria: 'Abrir Aftermovies',
      editionSpecial: 'Edición Especial',
      edition2025: 'Edición 2025',
    },
    backToTop: {
      aria: 'Volver arriba',
      text: 'ARRIBA',
    },
    languageSwitcher: {
      ariaLabel: 'Seleccionar idioma',
      pt: 'PT',
      en: 'EN',
      es: 'ES',
    },
  },
}
