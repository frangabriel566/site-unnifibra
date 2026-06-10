"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import CTAButton from "./CTAButton";
import Logo from "./Logo";
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
        <a href="#inicio" className="flex items-center">
          <Logo height={44} />
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

        <div className="hidden lg:block">
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
