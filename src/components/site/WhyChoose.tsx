"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function WhyChoose() {
  return (
    <section className="relative py-10 sm:py-14">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-primary/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-400">
            Diferenciais
          </span>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            Por que escolher a {siteConfig.general.companyName}?
          </h2>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            Conexão de qualidade, suporte próximo e planos acessíveis.
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.differentials.map((item, index) => {
            const Icon = (Icons[item.icon as keyof typeof Icons] as LucideIcon) ?? Star;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-brand-primary text-white shadow-lg shadow-sky-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
