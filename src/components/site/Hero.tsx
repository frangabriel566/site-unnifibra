"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

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
    <section
      id="inicio"
      className="relative h-[480px] w-full overflow-hidden sm:h-[560px] lg:h-[640px]"
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
            src={banner.image}
            alt={banner.title || siteConfig.general.companyName}
            className="h-full w-full object-cover"
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
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {banners.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Ir para o banner ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </section>
  );
}
