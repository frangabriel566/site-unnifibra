"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button, Toggle } from "./ui";
import { CoverageCity } from "@/types";

function emptyCity(order: number): CoverageCity {
  return {
    id: `cidade-${Date.now()}`,
    name: "Nova cidade - UF",
    available: true,
    order,
  };
}

export default function CoverageCitiesManager() {
  const { config, updateConfig } = useAdminConfig();
  const cities = [...config.coverageCities].sort((a, b) => a.order - b.order);

  const update = (id: string, patch: Partial<CoverageCity>) => {
    updateConfig((c) => ({
      ...c,
      coverageCities: c.coverageCities.map((city) => (city.id === id ? { ...city, ...patch } : city)),
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({ ...c, coverageCities: c.coverageCities.filter((city) => city.id !== id) }));
  };

  const add = () => {
    updateConfig((c) => ({ ...c, coverageCities: [...c.coverageCities, emptyCity(cities.length + 1)] }));
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.coverageCities].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((city) => city.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, coverageCities: sorted };
    });
  };

  return (
    <div className="space-y-4">
      <AdminCard
        title="Cidades atendidas"
        description='Gerencie a lista de cidades exibida na seção "Qual é a sua cidade?". Marque como disponível as cidades onde a UNNIFIBRA já atende.'
      >
        <div className="flex justify-end">
          <Button onClick={add}>
            <Plus className="h-4 w-4" />
            Nova cidade
          </Button>
        </div>
      </AdminCard>

      {cities.map((city, index) => (
        <AdminCard key={city.id}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
            <Field label="Nome da cidade" className="sm:col-span-2">
              <Input value={city.name} onChange={(e) => update(city.id, { name: e.target.value })} />
            </Field>
            <div className="flex items-center pb-2">
              <Toggle
                checked={city.available}
                onChange={(v) => update(city.id, { available: v })}
                label="Já atendemos"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1">
            <button
              onClick={() => moveOrder(city.id, -1)}
              disabled={index === 0}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveOrder(city.id, 1)}
              disabled={index === cities.length - 1}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <Button variant="danger" onClick={() => remove(city.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
