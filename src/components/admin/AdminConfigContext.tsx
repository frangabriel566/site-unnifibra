"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { siteConfig as defaultConfig } from "@/config/siteConfig";
import { SiteConfig } from "@/types";

const STORAGE_KEY = "unnifibra_admin_config";

interface AdminConfigContextValue {
  config: SiteConfig;
  updateConfig: (updater: (config: SiteConfig) => SiteConfig) => void;
  resetConfig: () => void;
}

const AdminConfigContext = createContext<AdminConfigContextValue | null>(null);

/**
 * Provedor de configuração do painel administrativo.
 *
 * Hoje as alterações são salvas em localStorage (simulação de persistência).
 * Futuramente, `updateConfig` pode ser adaptado para chamar uma API
 * conectada a um banco de dados (Supabase, PostgreSQL/Prisma, etc).
 */
export function AdminConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConfig(JSON.parse(stored));
      }
    } catch {
      // ignora erros de parsing e mantém configuração padrão
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config, loaded]);

  const updateConfig = useCallback(
    (updater: (config: SiteConfig) => SiteConfig) => {
      setConfig((prev) => updater(structuredClone(prev)));
    },
    []
  );

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AdminConfigContext.Provider value={{ config, updateConfig, resetConfig }}>
      {children}
    </AdminConfigContext.Provider>
  );
}

export function useAdminConfig() {
  const ctx = useContext(AdminConfigContext);
  if (!ctx) throw new Error("useAdminConfig deve ser usado dentro de AdminConfigProvider");
  return ctx;
}
