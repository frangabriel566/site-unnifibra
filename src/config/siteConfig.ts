import { SiteConfig } from "@/types";
import { generateWhatsAppLink } from "@/lib/whatsapp";

// =============================================================================
// CONFIGURAÇÃO CENTRAL DO SITE UNNIFIBRA
// -----------------------------------------------------------------------------
// Todos os textos, preços, contatos, cores, integrações e conteúdos editáveis
// do site ficam centralizados neste arquivo. O painel administrativo (/admin)
// edita estes mesmos dados (hoje em estado local, futuramente em banco de dados).
//
// Dados marcados como FICTÍCIOS devem ser substituídos pelas informações reais
// da UNNIFIBRA assim que forem enviadas (logo, WhatsApp, cores, redes sociais,
// endereço, CNPJ, etc).
// =============================================================================

// FICTÍCIO - substituir pelo número oficial do WhatsApp (com DDI e DDD)
const WHATSAPP_NUMBER = "5511999999999";

export const siteConfig: SiteConfig = {
  general: {
    companyName: "UNNIFIBRA",
    slogan: "Não navegue, voe!",
    description:
      "Provedor de internet fibra óptica com planos de alta velocidade, instalação gratuita e atendimento humanizado.",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    whatsappNumber: WHATSAPP_NUMBER,
    email: "unnifibraprovedor@gmail.com",
    phone: "(11) 99999-9999",
    address: "Av. Tecnologia, 1000 - Centro, Sua Cidade - UF",
    cnpj: "43.351.274/0002-19",
    attendanceHours:
      "Segunda a Sexta das 07:30 às 12:00, e das 14:00 às 17:30. Aos sábados das 07:30 às 12:00.",
    legalName: "UnniFibra Telecomunicações LTDA",
  },

  appearance: {
    primaryColor: "#0a3d91", // azul UNNIFIBRA
    secondaryColor: "#0ea5e9", // azul claro / ciano
    accentColor: "#22c55e", // verde whatsapp / destaque
    buttonColor: "#0ea5e9",
    theme: "dark",
    heroBanners: [
      {
        id: "banner-1",
        image: "/img/banner3.png",
        mobileImage: "/img/banner3-mobile.png",
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: generateWhatsAppLink(
          WHATSAPP_NUMBER,
          "Olá, gostaria de falar com a UNNIFIBRA sobre os planos de internet."
        ),
        active: true,
        order: 1,
      },
      {
        id: "banner-2",
        image: "/img/banner4.png",
        mobileImage: "/img/banner4-mobile.png",
        title: "",
        subtitle: "",
        buttonText: "",
        buttonLink: "#planos",
        active: true,
        order: 2,
      },
    ],
  },

  plans: [
    {
      id: "plano-400mb",
      name: "Plano 400MB",
      speed: "400 Megas",
      normalPrice: 84.9,
      promoPrice: 59.9,
      promoDurationMonths: 3,
      benefits: [
        "Internet 100% fibra óptica",
        "Ideal para uso doméstico",
        "Wi-Fi de alta velocidade",
        "Suporte via WhatsApp",
      ],
      freeInstallation: true,
      freeEquipment: true,
      loyalty: true,
      loyaltyMonths: 12,
      highlighted: false,
      active: true,
      order: 1,
      whatsappMessage:
        "Olá, tenho interesse no plano Plano 400MB da UNNIFIBRA. Vi a promoção de 3 meses por R$ 59,90 e gostaria de mais informações.",
    },
    {
      id: "plano-500mb",
      name: "Plano 500MB",
      speed: "500 Megas",
      normalPrice: 89.9,
      promoPrice: 59.9,
      promoDurationMonths: 3,
      benefits: [
        "Internet 100% fibra óptica",
        "Ótimo para várias pessoas conectadas",
        "Streaming em alta definição",
        "Suporte via WhatsApp",
      ],
      freeInstallation: true,
      freeEquipment: true,
      loyalty: true,
      loyaltyMonths: 12,
      highlighted: false,
      active: true,
      order: 2,
      whatsappMessage:
        "Olá, tenho interesse no plano Plano 500MB da UNNIFIBRA. Vi a promoção de 3 meses por R$ 59,90 e gostaria de mais informações.",
    },
    {
      id: "plano-600mb",
      name: "Plano 600MB",
      speed: "600 Megas",
      normalPrice: 99.9,
      promoPrice: 59.9,
      promoDurationMonths: 3,
      benefits: [
        "Internet 100% fibra óptica",
        "Ideal para jogos online",
        "Streaming 4K sem travar",
        "Suporte prioritário via WhatsApp",
      ],
      freeInstallation: true,
      freeEquipment: true,
      loyalty: true,
      loyaltyMonths: 12,
      highlighted: true,
      highlightLabel: "Mais contratado",
      active: true,
      order: 3,
      whatsappMessage:
        "Olá, tenho interesse no plano Plano 600MB da UNNIFIBRA. Vi a promoção de 3 meses por R$ 59,90 e gostaria de mais informações.",
    },
    {
      id: "plano-800mb",
      name: "Plano 800MB",
      speed: "800 Megas",
      normalPrice: 119.9,
      promoPrice: 59.9,
      promoDurationMonths: 3,
      benefits: [
        "Internet 100% fibra óptica",
        "Ideal para empresas e home office",
        "Máxima velocidade e estabilidade",
        "Suporte prioritário via WhatsApp",
      ],
      freeInstallation: true,
      freeEquipment: true,
      loyalty: true,
      loyaltyMonths: 12,
      highlighted: false,
      active: true,
      order: 4,
      whatsappMessage:
        "Olá, tenho interesse no plano Plano 800MB da UNNIFIBRA. Vi a promoção de 3 meses por R$ 59,90 e gostaria de mais informações.",
    },
  ],

  promotion: {
    active: true,
    title: "Promoção especial UNNIFIBRA",
    description:
      "Contrate qualquer plano e pague apenas R$ 59,90 nos 3 primeiros meses.",
    promoPrice: 59.9,
    durationMonths: 3,
    badge: "Oferta por tempo limitado",
    benefits: [
      "Qualquer plano por R$ 59,90 nos 3 primeiros meses",
      "Instalação grátis",
      "Equipamentos grátis",
      "Internet fibra óptica",
      "Atendimento pelo WhatsApp",
      "Fidelidade de 12 meses",
    ],
    whatsappMessage:
      "Olá, quero aproveitar a promoção da UNNIFIBRA de 3 meses por R$ 59,90. Gostaria de consultar a disponibilidade.",
  },

  loyalty: {
    title: "Contrato de fidelidade UNNIFIBRA",
    description:
      "Ao contratar um plano UNNIFIBRA, o cliente conta com instalação gratuita, equipamentos inclusos em comodato e acesso a promoções exclusivas. Em contrapartida, firma um compromisso de permanência de 12 meses.",
    months: 12,
    whatYouGet: [
      "Instalação gratuita",
      "Equipamentos inclusos em comodato",
      "Promoção de 3 meses por R$ 59,90",
      "Estabilidade no valor do plano",
      "Atendimento próximo e humanizado",
    ],
    howItWorks: [
      "Permanência mínima de 12 meses",
      "Serviço ativo durante o período contratado",
      "Em caso de cancelamento antecipado, poderá haver multa proporcional",
      "A multa é calculada com base nos benefícios concedidos",
    ],
    note: "Consulte as condições completas com nossa equipe pelo WhatsApp.",
    whatsappMessage:
      "Olá, gostaria de tirar dúvidas sobre o contrato de fidelidade da UNNIFIBRA.",
  },

  benefits: [
    {
      id: "fibra-otica",
      icon: "Cable",
      title: "Fibra óptica de verdade",
      description: "Conexão rápida, moderna e estável.",
      active: true,
      order: 1,
    },
    {
      id: "alta-velocidade",
      icon: "Gauge",
      title: "Alta velocidade",
      description: "Planos para navegar, assistir e jogar.",
      active: true,
      order: 2,
    },
    {
      id: "suporte-whatsapp",
      icon: "MessageCircle",
      title: "Suporte via WhatsApp",
      description: "Atendimento rápido e humanizado.",
      active: true,
      order: 3,
    },
    {
      id: "instalacao-facilitada",
      icon: "Wrench",
      title: "Instalação facilitada",
      description: "Equipe preparada para instalar sua internet.",
      active: true,
      order: 4,
    },
  ],

  differentials: [
    {
      id: "atendimento-humanizado",
      icon: "Users",
      title: "Atendimento humanizado",
      description: "Suporte próximo e rápido.",
    },
    {
      id: "conexao-estavel",
      icon: "Signal",
      title: "Conexão estável",
      description: "Internet de qualidade para sua rotina.",
    },
    {
      id: "planos-acessiveis",
      icon: "Wallet",
      title: "Planos acessíveis",
      description: "Opções que cabem no seu bolso.",
    },
    {
      id: "instalacao-agil",
      icon: "Rocket",
      title: "Instalação ágil",
      description: "Sua internet funcionando rapidamente.",
    },
  ],

  offices: [
    {
      id: "loja-luzilandia",
      name: "UNNIFIBRA Luzilândia-PI",
      address: "Rua José de Melo, Nº 911, Centro, Luzilândia - PI",
      image: "/img/lojaluzi.png",
      mapUrl: "https://www.google.com/maps?q=-3.463655710220337,-42.369441986083984&z=17&hl=pt-BR",
      active: true,
      order: 1,
    },
    {
      id: "loja-esperantina",
      name: "UNNIFIBRA Esperantina-PI",
      address: "Avenida Petrônio Portela, Nº 1874, ao lado do Orra Açaí, Esperantina - PI",
      image: "/img/lojaesperantina.png",
      mapUrl: "https://www.google.com/maps?q=-3.8877620697021484,-42.23677062988281&z=17&hl=pt-BR",
      active: true,
      order: 2,
    },
  ],

  coverageCities: [
    { id: "esperantina-pi", name: "Esperantina - PI", available: true, order: 1 },
    { id: "luzilandia-pi", name: "Luzilândia - PI", available: true, order: 2 },
  ],

  // Cidades atendidas, cada uma com seu próprio WhatsApp de atendimento.
  // O visitante escolhe a cidade e os botões de WhatsApp do site passam
  // a apontar para o número correto.
  serviceCities: [
    { id: "luzilandia-pi", name: "Luzilândia-PI", whatsappNumber: "5586981608566" },
    { id: "esperantina-pi", name: "Esperantina-PI", whatsappNumber: "5586999364046" },
  ],

  testimonials: [
    {
      id: "depoimento-1",
      name: "Mariana Souza",
      neighborhood: "Centro",
      comment: "Internet muito rápida e atendimento excelente.",
      rating: 5,
      active: true,
    },
    {
      id: "depoimento-2",
      name: "João Pereira",
      neighborhood: "Morro da Onça",
      comment: "Instalação rápida e suporte rápido.",
      rating: 5,
      active: true,
    },
    {
      id: "depoimento-3",
      name: "Carla Mendes",
      neighborhood: "Av Porto Alegre",
      comment: "Melhor provedor da região. Recomendo muito, ver sem unni vc também!",
      rating: 5,
      active: true,
    },
  ],

  faq: [
    {
      id: "faq-1",
      question: "Como contratar um plano da UNNIFIBRA?",
      answer:
        "Você pode contratar diretamente pelo WhatsApp clicando em qualquer botão do site. Nossa equipe vai consultar a cobertura e passar todos os detalhes.",
      active: true,
      order: 1,
    },
    {
      id: "faq-2",
      question: "A promoção de R$ 59,90 vale para todos os planos?",
      answer:
        "Sim. A promoção é válida para qualquer plano da UNNIFIBRA durante os 3 primeiros meses, conforme condições comerciais vigentes.",
      active: true,
      order: 2,
    },
    {
      id: "faq-3",
      question: "A instalação é gratuita?",
      answer:
        "Sim. A instalação é gratuita para clientes que contratam com fidelidade de 12 meses.",
      active: true,
      order: 3,
    },
    {
      id: "faq-4",
      question: "Os equipamentos estão inclusos?",
      answer:
        "Sim. Os equipamentos necessários, como roteador e ONU, são disponibilizados em comodato durante o período de contrato.",
      active: true,
      order: 4,
    },
    {
      id: "faq-5",
      question: "Existe contrato de fidelidade?",
      answer:
        "Sim. Os planos possuem fidelidade de 12 meses, garantindo benefícios como instalação gratuita, equipamentos inclusos e promoções especiais.",
      active: true,
      order: 5,
    },
    {
      id: "faq-6",
      question: "O que acontece se eu cancelar antes de 12 meses?",
      answer:
        "Em caso de cancelamento antes do prazo, poderá ser cobrada uma multa proporcional ao tempo restante do contrato, referente aos benefícios concedidos.",
      active: true,
      order: 6,
    },
    {
      id: "faq-7",
      question: "A internet é fibra óptica?",
      answer:
        "Sim. A UNNIFIBRA trabalha com internet fibra óptica para oferecer mais velocidade, estabilidade e qualidade de conexão.",
      active: true,
      order: 7,
    },
    {
      id: "faq-8",
      question: "A UNNIFIBRA atende empresas?",
      answer:
        "Sim. A UNNIFIBRA possui planos para residências e empresas. Consulte nossa equipe pelo WhatsApp.",
      active: true,
      order: 8,
    },
    {
      id: "faq-9",
      question: "Como consultar cobertura?",
      answer:
        'Clique no botão "Consultar cobertura pelo WhatsApp" e envie seu endereço para nossa equipe verificar a disponibilidade.',
      active: true,
      order: 9,
    },
    {
      id: "faq-10",
      question: "O suporte é pelo WhatsApp?",
      answer: "Sim. O atendimento e suporte podem ser feitos pelo WhatsApp.",
      active: true,
      order: 10,
    },
  ],

  social: {
    // FICTÍCIO - substituir pelos links oficiais
    instagram: "https://www.instagram.com/unnifibra21?igsh=MXc3Zzk5MTZza3ZpYw==",
    facebook: "https://www.facebook.com/profile.php?id=100072025903470",
    tiktok: "https://tiktok.com/@unnifibra",
    whatsapp: "https://wa.me/5511999999999",
    youtube: "https://youtube.com/@unnifibra",
    linkedin: "https://linkedin.com/company/unnifibra",
  },

  seo: {
    title: "UNNIFIBRA - Internet Fibra Óptica | Não navegue, voe!",
    description:
      "Internet fibra óptica de alta velocidade com instalação grátis, equipamentos inclusos e atendimento pelo WhatsApp. Planos a partir de R$ 59,90 nos 3 primeiros meses.",
    keywords: [
      "UNNIFIBRA",
      "internet fibra óptica",
      "provedor de internet",
      "internet residencial",
      "internet empresarial",
      "planos de internet",
      "internet com instalação grátis",
      "internet com promoção",
      "internet com WhatsApp",
      "internet rápida",
      "Wi-Fi rápido",
      "fibra óptica residencial",
      "planos de internet baratos",
    ],
    ogImage: "/og-image.jpg",
    ogTitle: "UNNIFIBRA - Internet Fibra Óptica de Alta Velocidade",
    ogDescription:
      "Conecte-se com a UNNIFIBRA: planos de fibra óptica com instalação grátis, equipamentos inclusos e atendimento humanizado.",
    author: "UNNIFIBRA",
    indexable: true,
    robots: "index, follow",
    canonicalUrl: "https://www.unnifibra.com.br",
    favicon: "/favicon.ico",
  },

  integrations: {
    googleTagManagerId: "",
    googleSearchConsoleVerification: "",
    whatsappTracking: true,
  },

  googleAds: {
    enabled: false,
    conversionId: "",
    conversionLabel: "",
    events: {
      whatsappClick: "whatsapp_click",
      planClick: "plan_click",
      coverageClick: "coverage_click",
      promotionClick: "promotion_click",
    },
  },

  analytics: {
    enabled: false,
    measurementId: "",
  },

  metaPixel: {
    enabled: false,
    pixelId: "",
  },

  tiktokPixel: {
    enabled: false,
    pixelId: "",
  },

  github: {
    repositoryUrl: "https://github.com/seu-usuario/unnifibra",
    mainBranch: "main",
    deployStatus: "Não publicado",
    vercelUrl: "https://unnifibra.vercel.app",
    lastUpdate: new Date().toISOString(),
  },
};

export default siteConfig;
