"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

export default function Testimonials() {
  const activeTestimonials = siteConfig.testimonials.filter((t) => t.active);

  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-sky-400">
            Depoimentos
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
            Quem usa, recomenda
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass relative flex flex-col gap-4 rounded-2xl p-6"
            >
              <Quote className="h-8 w-8 text-sky-400/40" />
              <p className="flex-1 text-slate-200">&ldquo;{testimonial.comment}&rdquo;</p>
              <div className="flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div>
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.neighborhood}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
