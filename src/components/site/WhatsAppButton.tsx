"use client";

import { MessageCircle } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/siteConfig";

const DEFAULT_MESSAGE =
  "Olá, gostaria de contratar um plano de internet da UNNIFIBRA.";

export default function WhatsAppButton() {
  const href = generateWhatsAppLink(siteConfig.general.whatsappNumber, DEFAULT_MESSAGE);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { source: "floating_button" })}
      aria-label="Falar no WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-900/50 transition-transform duration-300 hover:scale-110 sm:h-16 sm:w-16"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping group-hover:opacity-0" />
      <MessageCircle className="relative h-7 w-7 sm:h-8 sm:w-8" fill="currentColor" />
    </a>
  );
}
