"use client";

import { motion } from "framer-motion";
import { Cable, Gauge, Headset, Wallet2, ArrowRight, ListChecks } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import CTAButton from "./CTAButton";
import Logo from "./Logo";

const HIGHLIGHT_CARDS = [
  { icon: Cable, label: "Fibra óptica" },
  { icon: Headset, label: "Suporte rápido" },
  { icon: Wallet2, label: "Planos acessíveis" },
  { icon: Gauge, label: "Alta velocidade" },
];

export default function Hero() {
  const { appearance } = siteConfig;

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* Fundo tecnológico */}
      <div className="absolute inset-0 -z-10 bg-[#050b18]">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl animate-glow-pulse" />
        <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-700/20 blur-3xl animate-glow-pulse" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-300">
            <Gauge className="h-4 w-4" />
            Internet fibra óptica de verdade
          </span>

          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            {appearance.heroTitle.split(" ").slice(0, 3).join(" ")}{" "}
            <span className="text-gradient">
              {appearance.heroTitle.split(" ").slice(3).join(" ")}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-slate-300">
            {appearance.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton
              message="Olá, gostaria de contratar um plano de internet da UNNIFIBRA."
              variant="primary"
              size="lg"
              icon={<ArrowRight className="h-5 w-5" />}
            >
              {appearance.ctaPrimaryText}
            </CTAButton>
            <a
              href="#planos"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
            >
              <ListChecks className="h-5 w-5" />
              {appearance.ctaSecondaryText}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {HIGHLIGHT_CARDS.map((card, idx) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                className="glass flex flex-col items-center gap-2 rounded-2xl p-4 text-center"
              >
                <card.icon className="h-6 w-6 text-sky-400" />
                <span className="text-xs font-medium text-slate-200">{card.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="glass relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/30 via-transparent to-brand-primary/30" />
            <div className="relative flex h-full flex-col items-center justify-center gap-6 text-center">
              <div className="rounded-2xl bg-white/95 px-6 py-4 shadow-2xl shadow-sky-500/40 animate-glow-pulse">
                <Logo height={56} />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">800 Mbps</p>
                <p className="text-slate-300">Velocidade máxima disponível</p>
              </div>
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 animate-pulse rounded-full bg-sky-400"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
