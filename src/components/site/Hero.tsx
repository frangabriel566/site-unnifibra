"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Cable, Gamepad2, HeartHandshake, Tv, Wrench } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import WhatsAppIcon from "./WhatsAppIcon";

const HIGHLIGHTS = [
  { icon: Cable, label: "100% fibra óptica" },
  { icon: Tv, label: "Ideal para streaming" },
  { icon: Gamepad2, label: "Ideal para games" },
  { icon: HeartHandshake, label: "Suporte humanizado" },
  { icon: Wrench, label: "Instalação facilitada" },
];

export default function Hero() {
  const banners = [...siteConfig.appearance.heroBanners]
    .filter((banner) => banner.active)
    .sort((a, b) => a.order - b.order);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[index];
  const isExternalLink = /^https?:\/\//.test(banner.buttonLink);

  return (
    <>
      <section
        id="inicio"
        className={cn(
          "relative w-full overflow-hidden bg-brand-primary",
          banner.title
            ? "h-[340px] sm:h-[420px] lg:h-[min(540px,62vh)] xl:h-[580px] 2xl:h-[640px]"
            : "aspect-[4/5] sm:aspect-[16/6] lg:h-[min(540px,62vh)] lg:aspect-auto xl:h-[580px]"
        )}
      >
        <AnimatePresence mode="wait">
          <motion.a
            key={banner.id}
            href={banner.buttonLink || "#planos"}
            target={isExternalLink ? "_blank" : undefined}
            rel={isExternalLink ? "noopener noreferrer" : undefined}
            onClick={() => {
              if (isExternalLink) trackEvent("whatsapp_click", { source: "hero_banner" });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 block"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.mobileImage || banner.image}
              alt={banner.title || siteConfig.general.companyName}
              className={cn(
                "h-full w-full sm:hidden",
                banner.title ? "object-cover" : "object-contain object-bottom"
              )}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={banner.image}
              alt={banner.title || siteConfig.general.companyName}
              className={cn(
                "hidden h-full w-full sm:block",
                banner.title ? "object-cover" : "object-contain object-bottom lg:object-cover"
              )}
            />
            {banner.title && (
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/85 via-brand-primary/40 to-transparent" />
            )}
          </motion.a>
        </AnimatePresence>

        {banner.title && (
          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              key={`${banner.id}-text`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-xl"
            >
              <h1 className="text-3xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {banner.title}
              </h1>
              <p className="mt-4 text-lg font-medium text-white/90">{banner.subtitle}</p>
              {banner.buttonText && (
                <a
                  href={banner.buttonLink}
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-primary shadow-lg shadow-black/20 transition-transform hover:scale-105"
                >
                  {banner.buttonText}
                  <ArrowRight className="h-5 w-5" />
                </a>
              )}
            </motion.div>
          </div>
        )}

        {banners.length > 1 && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur-sm sm:bottom-5">
            {banners.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir para o banner ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-7 bg-white" : "w-2.5 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>
        )}
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#050b18] via-[#071029] to-[#050b18] py-10 sm:py-14 lg:py-16 xl:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.18),transparent_60%)]" />

        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-300">
              <Cable className="h-4 w-4" />
              Internet fibra óptica
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              A internet que <span className="text-gradient">conecta sua vida</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg font-medium text-slate-200">
              Planos de fibra óptica com velocidade, estabilidade e atendimento humanizado.
            </p>

            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
              Internet fibra óptica em Luzilândia e Esperantina, com planos acessíveis,
              instalação facilitada e suporte pelo WhatsApp.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-brand-primary shadow-lg shadow-black/20 transition-transform hover:scale-105 sm:w-auto"
              >
                Ver planos
                <ArrowRight className="h-5 w-5" />
              </a>
              <CTAButton
                message={DEFAULT_WHATSAPP_MESSAGE}
                variant="primary"
                size="lg"
                icon={<WhatsAppIcon className="h-5 w-5" />}
                className="w-full sm:w-auto"
              >
                Falar no WhatsApp
              </CTAButton>
            </div>

            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              {HIGHLIGHTS.map((item) => (
                <span
                  key={item.label}
                  className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-200"
                >
                  <item.icon className="h-4 w-4 text-sky-400" />
                  {item.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
