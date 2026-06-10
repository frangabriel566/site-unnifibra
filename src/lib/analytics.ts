import { siteConfig } from "@/config/siteConfig";
import { TrackEventName, TrackEventParams } from "@/types";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (event: string, params?: Record<string, unknown>) => void;
    };
  }
}

// Mapeia eventos internos para eventos do Meta Pixel
const META_PIXEL_EVENTS: Partial<Record<TrackEventName, string>> = {
  page_view: "PageView",
  whatsapp_click: "WhatsAppClick",
  plan_whatsapp_click: "PlanInterest",
  coverage_whatsapp_click: "Contact",
  promotion_whatsapp_click: "PromotionClick",
  loyalty_whatsapp_click: "Contact",
  contact_click: "Lead",
};

// Mapeia eventos internos para conversões do Google Ads
const GOOGLE_ADS_EVENTS: Partial<Record<TrackEventName, string>> = {
  whatsapp_click: siteConfig.googleAds.events.whatsappClick,
  plan_whatsapp_click: siteConfig.googleAds.events.planClick,
  coverage_whatsapp_click: siteConfig.googleAds.events.coverageClick,
  promotion_whatsapp_click: siteConfig.googleAds.events.promotionClick,
};

/**
 * Dispara um evento de tracking para todas as integrações ativas
 * (Google Analytics, Google Ads, Meta Pixel e TikTok Pixel).
 *
 * Cada integração só é executada se estiver habilitada e configurada
 * com o respectivo ID em `siteConfig`.
 */
export function trackEvent(eventName: TrackEventName, params: TrackEventParams = {}): void {
  if (typeof window === "undefined") return;

  // Google Analytics (GA4)
  if (siteConfig.analytics.enabled && siteConfig.analytics.measurementId && window.gtag) {
    window.gtag("event", eventName, params);
  }

  // Google Ads - conversão
  if (siteConfig.googleAds.enabled && siteConfig.googleAds.conversionId && window.gtag) {
    const conversionEvent = GOOGLE_ADS_EVENTS[eventName];
    if (conversionEvent) {
      window.gtag("event", "conversion", {
        send_to: `${siteConfig.googleAds.conversionId}/${siteConfig.googleAds.conversionLabel}`,
        ...params,
      });
    }
  }

  // Meta Pixel
  if (siteConfig.metaPixel.enabled && siteConfig.metaPixel.pixelId && window.fbq) {
    const metaEvent = META_PIXEL_EVENTS[eventName] ?? "Lead";
    window.fbq("track", metaEvent, params);
  }

  // TikTok Pixel
  if (siteConfig.tiktokPixel.enabled && siteConfig.tiktokPixel.pixelId && window.ttq) {
    window.ttq.track(eventName, params);
  }
}
