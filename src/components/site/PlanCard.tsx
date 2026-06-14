"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Wifi, ShieldCheck, Wrench, Award } from "lucide-react";
import { Plan } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import CTAButton from "./CTAButton";

interface PlanCardProps {
  plan: Plan;
  index: number;
}

export default function PlanCard({ plan, index }: PlanCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2",
        plan.highlighted
          ? "border-sky-400/60 bg-gradient-to-b from-sky-500/15 to-brand-primary/10 shadow-2xl shadow-sky-500/20"
          : "glass hover:border-sky-400/30"
      )}
    >
      {plan.highlighted && plan.highlightLabel && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-sky-400 to-brand-primary px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
          <Award className="mr-1 inline h-3.5 w-3.5" />
          {plan.highlightLabel}
        </span>
      )}

      <div className="flex items-center gap-2 text-sky-400">
        <Wifi className="h-5 w-5" />
        <span className="text-sm font-semibold uppercase tracking-wide">{plan.speed}</span>
      </div>

      <h3 className="mt-2 text-2xl font-extrabold text-white">{plan.name}</h3>

      <div className="mt-4">
        <p className="text-sm text-slate-400 line-through">
          De {formatCurrency(plan.normalPrice)}/mês
        </p>
        <p className="text-4xl font-extrabold text-white">
          {formatCurrency(plan.promoPrice)}
          <span className="text-base font-medium text-slate-300">/mês</span>
        </p>
        <p className="mt-1 text-sm font-semibold text-emerald-400">
          {plan.promoDurationMonths} meses por {formatCurrency(plan.promoPrice)}
        </p>
        <p className="text-sm text-slate-400">
          Depois, {formatCurrency(plan.normalPrice)}/mês
        </p>
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
            {benefit}
          </li>
        ))}
        {plan.freeInstallation && (
          <li className="flex items-start gap-2 text-sm text-slate-200">
            <Wrench className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
            Instalação grátis
          </li>
        )}
        {plan.freeEquipment && (
          <li className="flex items-start gap-2 text-sm text-slate-200">
            <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
            Equipamentos grátis
          </li>
        )}
        {plan.loyalty && (
          <li className="flex items-start gap-2 text-sm text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400" />
            Fidelidade de {plan.loyaltyMonths} meses
          </li>
        )}
      </ul>

      <CTAButton
        message={plan.whatsappMessage}
        variant={plan.highlighted ? "primary" : "secondary"}
        size="md"
        trackingEvent="plan_whatsapp_click"
        className="mt-8 w-full"
        megas={parseInt(plan.speed, 10) || undefined}
      >
        Quero esse plano
      </CTAButton>
    </motion.div>
  );
}
