"use client";

import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/siteConfig";

const DEFAULT_MESSAGE =
  "Olá, gostaria de contratar um plano de internet da UNNIFIBRA.";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16.004 0C7.164 0 0 7.163 0 16c0 2.823.738 5.58 2.14 8.003L0 32l8.2-2.15A15.93 15.93 0 0 0 16.004 32C24.84 32 32 24.837 32 16S24.84 0 16.004 0Zm0 29.27a13.23 13.23 0 0 1-6.748-1.85l-.484-.288-4.866 1.276 1.3-4.74-.315-.487A13.21 13.21 0 0 1 2.73 16c0-7.32 5.954-13.27 13.274-13.27S29.28 8.68 29.28 16s-5.954 13.27-13.276 13.27Zm7.27-9.94c-.398-.2-2.356-1.163-2.722-1.296-.366-.133-.632-.2-.898.2-.266.398-1.03 1.296-1.263 1.562-.232.266-.465.3-.863.1-.398-.2-1.68-.62-3.2-1.974-1.183-1.054-1.982-2.357-2.214-2.755-.232-.398-.025-.613.175-.812.18-.18.398-.465.598-.698.2-.232.266-.398.398-.664.133-.266.066-.498-.033-.698-.1-.2-.898-2.166-1.231-2.965-.324-.78-.653-.674-.898-.686l-.764-.014c-.266 0-.698.1-1.064.498-.366.398-1.396 1.364-1.396 3.328 0 1.964 1.43 3.862 1.63 4.128.2.266 2.81 4.292 6.81 6.018.952.41 1.694.655 2.273.838.955.304 1.825.26 2.512.158.766-.115 2.356-.963 2.688-1.894.332-.93.332-1.728.232-1.894-.1-.166-.366-.266-.764-.465Z" />
    </svg>
  );
}

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
