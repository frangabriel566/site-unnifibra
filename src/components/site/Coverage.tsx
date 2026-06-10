"use client";

import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import CTAButton from "./CTAButton";

const COVERAGE_MESSAGE =
  "Olá, gostaria de consultar a cobertura da UNNIFIBRA para meu endereço.";

export default function Coverage() {
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
            Consulte a cobertura da UNNIFIBRA
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Consulte agora se a UNNIFIBRA já atende sua região.
          </p>

          <div className="mt-8 flex justify-center">
            <CTAButton
              message={COVERAGE_MESSAGE}
              variant="primary"
              size="lg"
              icon={<Search className="h-5 w-5" />}
              trackingEvent="coverage_whatsapp_click"
            >
              Consultar cobertura pelo WhatsApp
            </CTAButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
