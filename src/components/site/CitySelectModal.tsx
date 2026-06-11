"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCity } from "./CityContext";

export default function CitySelectModal() {
  const { modalOpen, closeModal, cities, selectCity, city } = useCity();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <AnimatePresence>
      {modalOpen && !isAdmin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.25 }}
            className="glass relative w-full max-w-md rounded-3xl p-6 text-center sm:p-8"
          >
            {city && (
              <button
                onClick={closeModal}
                aria-label="Fechar"
                className="absolute right-4 top-4 text-slate-400 transition-colors hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-brand-primary shadow-lg shadow-sky-500/30">
              <MapPin className="h-7 w-7 text-white" />
            </div>

            <h2 className="mt-4 text-2xl font-extrabold text-white">Escolha sua cidade</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-slate-300">
              Para falar com o escritório correto, selecione a cidade onde deseja contratar.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {cities.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => selectCity(c.id)}
                  className="w-full rounded-full bg-gradient-to-r from-sky-400 to-brand-primary px-6 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:brightness-110 active:scale-95"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
