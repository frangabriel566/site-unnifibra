"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";
import { ServiceCity } from "@/types";

const STORAGE_KEY = "unnifibra_selected_city";

interface CityContextValue {
  city: ServiceCity | null;
  cities: ServiceCity[];
  selectCity: (id: string) => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const CityContext = createContext<CityContextValue | null>(null);

export function CityProvider({ children }: { children: ReactNode }) {
  const cities = siteConfig.serviceCities;
  const [city, setCity] = useState<ServiceCity | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);
    const found = cities.find((c) => c.id === storedId) ?? null;

    if (found) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCity(found);
    } else {
      setModalOpen(true);
    }

    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCity = (id: string) => {
    const found = cities.find((c) => c.id === id);
    if (!found) return;
    setCity(found);
    localStorage.setItem(STORAGE_KEY, id);
    setModalOpen(false);
  };

  return (
    <CityContext.Provider
      value={{
        city,
        cities,
        selectCity,
        modalOpen: hydrated && modalOpen,
        openModal: () => setModalOpen(true),
        closeModal: () => setModalOpen(false),
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error("useCity deve ser usado dentro de CityProvider");
  return ctx;
}
