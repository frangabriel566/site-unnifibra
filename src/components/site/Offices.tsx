"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Smartphone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Offices() {
  const offices = [...siteConfig.offices]
    .filter((office) => office.active)
    .sort((a, b) => a.order - b.order);

  if (offices.length === 0) return null;

  return (
    <section id="unidades" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-1.5 text-sm font-medium text-sky-300">
            <MapPin className="h-4 w-4" />
            Nossos escritórios
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
            Venha nos visitar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Conheça uma de nossas unidades e fale com a nossa equipe pessoalmente.
          </p>

          <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center gap-4 rounded-2xl border border-sky-400/20 bg-white/[0.03] px-6 py-5 backdrop-blur sm:flex-row sm:justify-between sm:gap-6 sm:px-8">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <span className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sky-400/10 text-sky-300 sm:flex">
                <Smartphone className="h-5 w-5" />
              </span>
              <p className="text-sm text-slate-300 sm:text-base">
                Baixe o app da Unifibra e tenha tudo na palma da sua mão.
              </p>
            </div>
            <a
              href="https://apps.apple.com/br/app/central-unnifibra/id6477547828"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full flex-shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-brand-primary px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:brightness-110 sm:w-auto"
            >
              <Smartphone className="h-4 w-4" />
              Baixar App
            </a>
          </div>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {offices.map((office, idx) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="glass overflow-hidden rounded-3xl"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={office.image}
                  alt={office.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white">{office.name}</h3>
                <p className="mt-2 flex items-start gap-2 text-sm text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
                  {office.address}
                </p>
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-brand-primary px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:brightness-110"
                >
                  <Navigation className="h-4 w-4" />
                  Venha até a gente
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
