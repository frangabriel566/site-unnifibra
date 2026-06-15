"use client";

import { motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { formatCurrency } from "@/lib/utils";
import CTAButton from "./CTAButton";

export default function Promotion() {
  const { promotion } = siteConfig;

  if (!promotion.active) return null;

  return (
    <section id="promocao" className="relative py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-500 via-blue-700 to-brand-primary p-8 shadow-2xl shadow-sky-900/40 sm:p-12"
        >
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />

          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                <Clock className="h-4 w-4" />
                {promotion.badge}
              </span>

              <h2 className="flex items-center gap-3 text-3xl font-extrabold text-white sm:text-4xl">
                <Sparkles className="h-8 w-8 text-yellow-300" />
                {promotion.title}
              </h2>

              <p className="mt-4 text-lg text-sky-50">{promotion.description}</p>

              <p className="mt-2 text-5xl font-extrabold text-white">
                {formatCurrency(promotion.promoPrice)}
                <span className="text-xl font-medium text-sky-100">/mês</span>
              </p>
              <p className="text-sky-100">
                nos {promotion.durationMonths} primeiros meses
              </p>

              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {promotion.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-white">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CTAButton
                  message={promotion.whatsappMessage}
                  variant="secondary"
                  size="lg"
                  trackingEvent="promotion_whatsapp_click"
                  className="!bg-white !text-brand-primary hover:!bg-sky-50"
                >
                  Quero aproveitar a promoção
                </CTAButton>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
