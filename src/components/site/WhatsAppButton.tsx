"use client";

import { generateWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { useCity } from "./CityContext";
import WhatsAppIcon from "./WhatsAppIcon";

export default function WhatsAppButton() {
  const { city, openModal } = useCity();
  const href = city ? generateWhatsAppLink(city.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE) : "#";

  return (
    <a
      href={href}
      target={city ? "_blank" : undefined}
      rel={city ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!city) {
          e.preventDefault();
          openModal();
          return;
        }
        trackEvent("whatsapp_click", { source: "floating_button" });
      }}
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/50 transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-0" />
      <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
