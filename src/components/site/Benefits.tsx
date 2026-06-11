"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Benefits() {
  const activeBenefits = siteConfig.benefits
    .filter((b) => b.active)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="beneficios" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Benefícios
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Internet rápida, estável e feita para o seu dia a dia
          </h2>
          <p className="mt-4 text-base text-slate-300 sm:text-lg">
            Com a UNNIFIBRA, você tem conexão de qualidade para trabalhar, estudar, jogar,
            assistir e falar com quem importa.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeBenefits.map((benefit, index) => {
            const Icon = (Icons[benefit.icon as keyof typeof Icons] as LucideIcon) ?? Sparkles;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass flex items-start gap-4 rounded-2xl p-6 transition-colors hover:border-sky-400/30"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-brand-primary/20 text-sky-400">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
