"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CheckCircle2, Clock, X } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import { formatCurrency } from "@/lib/utils";
import CTAButton from "./CTAButton";

export default function PromotionModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { promotion } = siteConfig;

  if (!promotion.active) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute right-4 top-4 rounded-full bg-white/10 p-1.5 text-slate-300 transition-colors hover:bg-white/20 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white">
              <Clock className="h-4 w-4" />
              {promotion.badge}
            </span>

            <h2 className="flex items-center gap-3 text-2xl font-extrabold text-white sm:text-3xl">
              <Sparkles className="h-7 w-7 text-yellow-300" />
              {promotion.title}
            </h2>

            <p className="mt-2 text-base text-slate-200">{promotion.description}</p>

            <p className="mt-2 text-4xl font-extrabold text-white">
              {formatCurrency(promotion.promoPrice)}
              <span className="text-lg font-medium text-slate-300">/mês</span>
            </p>
            <p className="text-sm text-slate-300">
              nos {promotion.durationMonths} primeiros meses
            </p>

            <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {promotion.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-300" />
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton
                message={promotion.whatsappMessage}
                variant="primary"
                size="lg"
                trackingEvent="promotion_whatsapp_click"
                className="flex-1"
              >
                Quero aproveitar a promoção
              </CTAButton>
              <button
                onClick={onClose}
                className="rounded-full border border-white/15 px-6 py-3.5 text-sm font-bold text-slate-200 transition-colors hover:bg-white/10"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
