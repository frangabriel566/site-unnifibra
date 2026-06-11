"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Search, Send } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";
import { useCity } from "./CityContext";

const COVERAGE_MESSAGE =
  "Olá, gostaria de consultar a cobertura da UNNIFIBRA para meu endereço.";

export default function Coverage() {
  const cities = [...siteConfig.coverageCities].sort((a, b) => a.order - b.order);
  const [selected, setSelected] = useState<string | null>(null);
  const { city, openModal } = useCity();

  const selectedCity = cities.find((c) => c.id === selected);

  const handleSelect = (id: string) => {
    setSelected(id);
    trackEvent("coverage_whatsapp_click", { source: "coverage_city_select" });
  };

  return (
    <section id="cobertura" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-14"
        >
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.15),transparent_70%)]" />

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-brand-primary shadow-lg shadow-sky-500/30">
            <MapPin className="h-8 w-8 text-white" />
          </div>

          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
            Qual é a sua cidade?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Selecione sua cidade e descubra se a UNNIFIBRA já está disponível na sua região.
          </p>

          {cities.length > 0 && (
            <div className="mx-auto mt-8 flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelect(city.id)}
                  className={cn(
                    "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                    selected === city.id
                      ? "border-sky-400 bg-sky-400/20 text-sky-300"
                      : "border-white/15 bg-white/5 text-slate-200 hover:border-sky-400/50 hover:bg-white/10"
                  )}
                >
                  {city.name}
                </button>
              ))}
            </div>
          )}

          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "mx-auto mt-6 flex max-w-md flex-col items-center gap-3 rounded-2xl border p-5",
                selectedCity.available
                  ? "border-emerald-400/30 bg-emerald-400/10"
                  : "border-amber-400/30 bg-amber-400/10"
              )}
            >
              {selectedCity.available ? (
                <>
                  <p className="flex items-center gap-2 font-bold text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                    Atendemos {selectedCity.name}!
                  </p>
                  <CTAButton
                    message={`Olá, gostaria de contratar a internet da UNNIFIBRA em ${selectedCity.name}.`}
                    variant="primary"
                    size="md"
                    icon={<Send className="h-4 w-4" />}
                    trackingEvent="coverage_whatsapp_click"
                  >
                    Falar no WhatsApp
                  </CTAButton>
                </>
              ) : (
                <>
                  <p className="font-bold text-amber-300">
                    Ainda estamos chegando em {selectedCity.name}!
                  </p>
                  <p className="text-sm text-slate-300">
                    Fale com a gente para saber a previsão de chegada na sua região.
                  </p>
                  <CTAButton
                    message={`Olá, gostaria de saber quando a UNNIFIBRA vai chegar em ${selectedCity.name}.`}
                    variant="secondary"
                    size="md"
                    icon={<Send className="h-4 w-4" />}
                    trackingEvent="coverage_whatsapp_click"
                  >
                    Falar no WhatsApp
                  </CTAButton>
                </>
              )}
            </motion.div>
          )}

          <div className="mt-8 flex justify-center">
            <a
              href={generateWhatsAppLink(siteConfig.general.whatsappNumber, COVERAGE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("coverage_whatsapp_click", { source: "coverage_not_listed" })}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 underline-offset-4 hover:text-sky-400 hover:underline"
            >
              <Search className="h-4 w-4" />
              Minha cidade não está na lista
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
