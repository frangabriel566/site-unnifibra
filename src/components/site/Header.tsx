"use client";

import { useEffect, useState } from "react";
import { Menu, X, MapPin, Instagram, Facebook, UserRound } from "lucide-react";
import CTAButton from "./CTAButton";
import Logo from "./Logo";
import WhatsAppIcon from "./WhatsAppIcon";
import PromotionModal from "./PromotionModal";
import { useCity } from "./CityContext";
import { siteConfig } from "@/config/siteConfig";
import { generateWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { recordLead } from "@/lib/leadClient";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Promoção", href: "#promocao" },
  { label: "Planos", href: "#planos" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Unidades", href: "#unidades" },
  { label: "Fidelidade", href: "#fidelidade" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const { city, openModal } = useCity();
  const { social, general } = siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 w-full overflow-visible bg-brand-primary py-0 transition-all duration-300 lg:h-[86px]",
        scrolled && "shadow-lg shadow-black/20"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-4 overflow-visible px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center overflow-visible">
          <Logo width={105} className="lg:hidden" />
          <Logo width={155} className="hidden lg:block" />
        </a>

        <nav className="hidden items-center gap-4 lg:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Promoção" ? (
              <button
                key={link.href}
                type="button"
                onClick={() => setPromoOpen(true)}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-sky-400"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-sky-400"
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <button
            type="button"
            onClick={openModal}
            className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-sky-400"
          >
            <MapPin className="h-3.5 w-3.5" />
            {city ? city.name : "Escolher cidade"}
          </button>

          <div className="flex items-center gap-3 text-slate-300">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-sky-400"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-sky-400"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={city ? generateWhatsAppLink(city.whatsappNumber, DEFAULT_WHATSAPP_MESSAGE) : "#"}
              target={city ? "_blank" : undefined}
              rel={city ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (!city) {
                  e.preventDefault();
                  openModal();
                  return;
                }
                trackEvent("whatsapp_click", { source: "header_icon" });
                recordLead(city.id, city.name, 0);
              }}
              aria-label="WhatsApp"
              className="transition-colors hover:text-sky-400"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
          </div>

          <a
            href={general.subscriberPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-sky-400/40 px-3 py-1.5 text-xs font-semibold text-sky-400 transition-colors hover:bg-sky-400/10"
          >
            <UserRound className="h-3.5 w-3.5" />
            Central do Assinante
          </a>

          <CTAButton
            message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
            variant="primary"
            size="sm"
            className="rounded-md"
          >
            Contratar agora
          </CTAButton>
        </div>

        <button
          aria-label="Abrir menu"
          className="text-white lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-brand-primary px-4 py-3 lg:hidden">
          {NAV_LINKS.map((link) =>
            link.label === "Promoção" ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  setPromoOpen(true);
                  setMobileOpen(false);
                }}
                className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-400"
              >
                {link.label}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-400"
              >
                {link.label}
              </a>
            )
          )}
          <button
            type="button"
            onClick={() => {
              openModal();
              setMobileOpen(false);
            }}
            className="mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-sky-400"
          >
            <MapPin className="h-4 w-4" />
            {city ? `Cidade: ${city.name} · Alterar cidade` : "Escolher cidade"}
          </button>
          <a
            href={general.subscriberPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-sky-400/40 px-3 py-2.5 text-sm font-semibold text-sky-400 transition-colors hover:bg-sky-400/10"
          >
            <UserRound className="h-4 w-4" />
            Central do Assinante
          </a>
        </div>
      )}

      <PromotionModal open={promoOpen} onClose={() => setPromoOpen(false)} />
    </header>
  );
}
