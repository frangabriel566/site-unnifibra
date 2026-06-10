"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import PlanCard from "./PlanCard";

export default function Plans() {
  const activePlans = siteConfig.plans
    .filter((plan) => plan.active)
    .sort((a, b) => a.order - b.order);

  return (
    <section id="planos" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Planos UNNIFIBRA
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Escolha o plano ideal para você
          </h2>
          <p className="mt-4 text-slate-300">
            Internet 100% fibra óptica, instalação grátis, equipamentos inclusos
            e fidelidade de 12 meses.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {activePlans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
