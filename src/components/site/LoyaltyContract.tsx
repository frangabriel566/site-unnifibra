"use client";

import { motion } from "framer-motion";
import { Gift, ScrollText, CheckCircle2, Info } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import CTAButton from "./CTAButton";

export default function LoyaltyContract() {
  const { loyalty } = siteConfig;

  return (
    <section id="fidelidade" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Transparência
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            {loyalty.title}
          </h2>
          <p className="mt-4 text-slate-300">{loyalty.description}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                <Gift className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">O que você ganha</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {loyalty.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
                <ScrollText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Como funciona a fidelidade</h3>
            </div>
            <ul className="mt-6 space-y-4">
              {loyalty.howItWorks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-sky-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center gap-6 rounded-3xl border border-white/5 bg-white/[0.02] p-8 text-center"
        >
          <p className="flex items-center gap-2 text-sm text-slate-300">
            <Info className="h-5 w-5 text-sky-400" />
            {loyalty.note}
          </p>
          <CTAButton
            message={loyalty.whatsappMessage}
            variant="outline"
            size="md"
            trackingEvent="loyalty_whatsapp_click"
          >
            Tirar dúvidas sobre fidelidade
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
