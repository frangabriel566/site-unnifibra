"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { LucideIcon, Star } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function WhyChoose() {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-brand-primary/10 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Diferenciais
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Por que escolher a {siteConfig.general.companyName}?
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {siteConfig.differentials.map((item, index) => {
            const Icon = (Icons[item.icon as keyof typeof Icons] as LucideIcon) ?? Star;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all hover:-translate-y-1 hover:border-sky-400/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-brand-primary text-white shadow-lg shadow-sky-500/20">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
