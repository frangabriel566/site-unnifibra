"use client";

import { useEffect, useState } from "react";
import { Menu, X, MapPin } from "lucide-react";
import CTAButton from "./CTAButton";
import Logo from "./Logo";
import { useCity } from "./CityContext";
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
  const { city, openModal } = useCity();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-black/20 py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center">
          <Logo width={140} />
        </a>

        <nav className="hidden items-center gap-6 lg:flex">
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
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-sky-400"
          >
            <MapPin className="h-3.5 w-3.5" />
            {city ? city.name : "Escolher cidade"}
          </button>
          <CTAButton
            message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
            variant="primary"
            size="sm"
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
        <div className="glass mx-4 mt-2 flex flex-col gap-1 rounded-2xl p-4 lg:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-400"
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
            className="mt-2 flex items-center justify-center gap-1.5 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-sky-400/40 hover:text-sky-400"
          >
            <MapPin className="h-4 w-4" />
            {city ? `Cidade: ${city.name} · Alterar cidade` : "Escolher cidade"}
          </button>

          <div className="mt-2">
            <CTAButton
              message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
              variant="primary"
              size="md"
              className="w-full"
            >
              Contratar agora
            </CTAButton>
          </div>
        </div>
      )}
    </header>
  );
}
