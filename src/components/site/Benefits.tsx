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
    <section id="beneficios" className="relative py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
            Benefícios
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            Internet feita para o seu dia a dia
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Velocidade, estabilidade e suporte para sua casa ou empresa.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeBenefits.map((benefit, index) => {
            const Icon = (Icons[benefit.icon as keyof typeof Icons] as LucideIcon) ?? Sparkles;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass flex items-start gap-3 rounded-xl p-4 shadow-lg shadow-black/20 transition-all hover:-translate-y-1 hover:border-sky-400/30 hover:shadow-sky-500/10"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400/20 to-brand-primary/20 text-sky-400">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{benefit.title}</h3>
                  <p className="mt-1 text-xs text-slate-300">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
