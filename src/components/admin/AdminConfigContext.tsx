"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { siteConfig as defaultConfig } from "@/config/siteConfig";
import { SiteConfig } from "@/types";

interface AdminConfigContextValue {
  config: SiteConfig;
  updateConfig: (updater: (config: SiteConfig) => SiteConfig) => void;
  resetConfig: () => void;
  saving: boolean;
  saveError: string | null;
}

const AdminConfigContext = createContext<AdminConfigContextValue | null>(null);

/**
 * Provedor de configuração do painel administrativo.
 *
 * As alterações são carregadas e persistidas via `/api/config`,
 * que lê e grava a configuração no Supabase. O mesmo endpoint
 * alimenta o site público, garantindo que as duas pontas fiquem
 * sincronizadas.
 */
export function AdminConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/config")
      .then((res) => {
        if (res.status === 401) {
          window.location.replace("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data: SiteConfig | null) => {
        if (cancelled || !data) return;
        setConfig({
          ...defaultConfig,
          ...data,
          appearance: { ...defaultConfig.appearance, ...data.appearance },
        });
      })
      .catch(() => {
        // mantém a configuração padrão em caso de falha
      })
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const persist = useCallback((next: SiteConfig) => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      setSaving(true);
      setSaveError(null);
      try {
        const res = await fetch("/api/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(next),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(data?.error || "Erro ao salvar configuração.");
        }
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : "Erro ao salvar configuração.");
      } finally {
        setSaving(false);
      }
    }, 500);
  }, []);

  const updateConfig = useCallback(
    (updater: (config: SiteConfig) => SiteConfig) => {
      setConfig((prev) => {
        const next = updater(structuredClone(prev));
        if (loaded) persist(next);
        return next;
      });
    },
    [loaded, persist]
  );

  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
    persist(defaultConfig);
  }, [persist]);

  return (
    <AdminConfigContext.Provider value={{ config, updateConfig, resetConfig, saving, saveError }}>
      {children}
    </AdminConfigContext.Provider>
  );
}

export function useAdminConfig() {
  const ctx = useContext(AdminConfigContext);
  if (!ctx) throw new Error("useAdminConfig deve ser usado dentro de AdminConfigProvider");
  return ctx;
}
