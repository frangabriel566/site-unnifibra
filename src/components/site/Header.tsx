"use client";

import { useEffect, useState } from "react";
import { Menu, X, MapPin, UserRound, Instagram, Facebook } from "lucide-react";
import CTAButton from "./CTAButton";
import Logo from "./Logo";
import { useCity } from "./CityContext";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Início", href: "#inicio" },
  { label: "Planos", href: "#planos" },
  { label: "Cobertura", href: "#cobertura" },
  { label: "Unidades", href: "#unidades" },
  { label: "Atendimento", href: "#contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { city, openModal } = useCity();
  const { general, social } = siteConfig;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-16 w-full overflow-visible bg-brand-primary py-0 transition-all duration-300 lg:h-20",
        scrolled && "shadow-lg shadow-black/20"
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-6 overflow-visible px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center overflow-visible">
          <Logo width={100} className="lg:hidden" />
          <Logo width={140} className="hidden lg:block" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-sky-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={openModal}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-sky-400"
          >
            <MapPin className="h-3.5 w-3.5" />
            {city ? city.name : "Escolher cidade"}
          </button>

          <div className="flex items-center gap-1">
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-sky-400"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full text-slate-300 transition-colors hover:bg-white/10 hover:text-sky-400"
            >
              <Facebook className="h-4.5 w-4.5" />
            </a>
          </div>

          <
            href={general.subscriberPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-sky-400/40 px-3.5 py-2 text-xs font-semibold text-sky-400 transition-colors hover:bg-sky-400/10"
          >
            <UserRound className="h-3.5 w-3.5" />
            Central do Assinante
          </a>

          <CTAButton
            message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
            variant="primary"
            size="sm"
            className="!bg-gradient-to-r !from-amber-400 !to-orange-500 !text-slate-900 shadow-lg shadow-amber-500/30 hover:!brightness-105 hover:shadow-amber-400/50 px-6"
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
        <div className="flex flex-col gap-1 border-t border-white/10 bg-brand-primary px-4 py-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-400"
            >
              {link.label}
            </a>
          ))}

          <button
            type="button"
            onClick={() => {
              openModal();
              setMobileOpen(false);
            }}
            className="mt-2 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-sky-400"
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

          <div className="mt-3 flex flex-col gap-3">
            <CTAButton
              message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
              variant="primary"
              size="md"
              className="!bg-gradient-to-r !from-amber-400 !to-orange-500 !text-slate-900 shadow-lg shadow-amber-500/30 w-full"
            >
              Contratar agora
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}
