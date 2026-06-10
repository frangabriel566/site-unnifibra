// Tipos centrais do projeto UNNIFIBRA
// Estrutura preparada para futura migração para banco de dados (Supabase/Prisma/PostgreSQL)

export interface PlanFeature {
  id: string;
  text: string;
}

export interface Plan {
  id: string;
  name: string;
  speed: string;
  normalPrice: number;
  promoPrice: number;
  promoDurationMonths: number;
  benefits: string[];
  freeInstallation: boolean;
  freeEquipment: boolean;
  loyalty: boolean;
  loyaltyMonths: number;
  highlighted: boolean;
  highlightLabel?: string;
  active: boolean;
  order: number;
  whatsappMessage: string;
}

export interface Promotion {
  active: boolean;
  title: string;
  description: string;
  promoPrice: number;
  durationMonths: number;
  badge: string;
  benefits: string[];
  whatsappMessage: string;
}

export interface LoyaltyProgram {
  title: string;
  description: string;
  months: number;
  whatYouGet: string[];
  howItWorks: string[];
  note: string;
  whatsappMessage: string;
}

export interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
  active: boolean;
  order: number;
}

export interface Differential {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  neighborhood: string;
  comment: string;
  rating: number;
  active: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  order: number;
}

export interface Office {
  id: string;
  name: string;
  address: string;
  image: string;
  mapUrl: string;
  active: boolean;
  order: number;
}

export interface CoverageCity {
  id: string;
  name: string;
  available: boolean;
  order: number;
}

export interface SocialLinks {
  instagram: string;
  facebook: string;
  tiktok: string;
  whatsapp: string;
  youtube: string;
  linkedin: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
  ogTitle: string;
  ogDescription: string;
  author: string;
  indexable: boolean;
  robots: string;
  canonicalUrl: string;
  favicon: string;
}

export interface GoogleAdsConfig {
  enabled: boolean;
  conversionId: string;
  conversionLabel: string;
  events: {
    whatsappClick: string;
    planClick: string;
    coverageClick: string;
    promotionClick: string;
  };
}

export interface AnalyticsConfig {
  enabled: boolean;
  measurementId: string;
}

export interface PixelConfig {
  enabled: boolean;
  pixelId: string;
}

export interface IntegrationsConfig {
  googleTagManagerId: string;
  googleSearchConsoleVerification: string;
  whatsappTracking: boolean;
}

export interface GitHubDeployConfig {
  repositoryUrl: string;
  mainBranch: string;
  deployStatus: string;
  vercelUrl: string;
  lastUpdate: string;
  githubApiToken?: string; // nunca expor no frontend
  vercelApiToken?: string; // nunca expor no frontend
}

export interface HeroBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
  order: number;
}

export interface AppearanceConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  buttonColor: string;
  theme: "light" | "dark";
  heroBanners: HeroBanner[];
}

export interface GeneralConfig {
  companyName: string;
  slogan: string;
  description: string;
  logo: string;
  favicon: string;
  whatsappNumber: string;
  email: string;
  phone: string;
  address: string;
  cnpj: string;
  attendanceHours: string;
}

export interface SiteConfig {
  general: GeneralConfig;
  appearance: AppearanceConfig;
  plans: Plan[];
  promotion: Promotion;
  loyalty: LoyaltyProgram;
  benefits: Benefit[];
  differentials: Differential[];
  offices: Office[];
  coverageCities: CoverageCity[];
  testimonials: Testimonial[];
  faq: FAQItem[];
  social: SocialLinks;
  seo: SEOConfig;
  integrations: IntegrationsConfig;
  googleAds: GoogleAdsConfig;
  analytics: AnalyticsConfig;
  metaPixel: PixelConfig;
  tiktokPixel: PixelConfig;
  github: GitHubDeployConfig;
}

// Eventos de tracking suportados
export type TrackEventName =
  | "page_view"
  | "whatsapp_click"
  | "plan_whatsapp_click"
  | "coverage_whatsapp_click"
  | "promotion_whatsapp_click"
  | "loyalty_whatsapp_click"
  | "contact_click";

export interface TrackEventParams {
  [key: string]: string | number | boolean | undefined;
}
