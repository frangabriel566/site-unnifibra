"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";
import { Benefit } from "@/types";

function emptyBenefit(order: number): Benefit {
  return {
    id: `beneficio-${Date.now()}`,
    icon: "Sparkles",
    title: "Novo benefício",
    description: "Descrição do benefício",
    active: true,
    order,
  };
}

export default function BenefitsManager() {
  const { config, updateConfig } = useAdminConfig();
  const benefits = [...config.benefits].sort((a, b) => a.order - b.order);

  const update = (id: string, patch: Partial<Benefit>) => {
    updateConfig((c) => ({
      ...c,
      benefits: c.benefits.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({ ...c, benefits: c.benefits.filter((b) => b.id !== id) }));
  };

  const add = () => {
    updateConfig((c) => ({ ...c, benefits: [...c.benefits, emptyBenefit(benefits.length + 1)] }));
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.benefits].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((b) => b.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, benefits: sorted };
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
          Novo benefício
        </Button>
      </div>

      {benefits.map((benefit, index) => (
        <AdminCard key={benefit.id}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Ícone (nome do Lucide React)">
              <Input value={benefit.icon} onChange={(e) => update(benefit.id, { icon: e.target.value })} />
            </Field>
            <Field label="Título" className="lg:col-span-2">
              <Input value={benefit.title} onChange={(e) => update(benefit.id, { title: e.target.value })} />
            </Field>
            <Field label="Ativo">
              <Toggle checked={benefit.active} onChange={(v) => update(benefit.id, { active: v })} />
            </Field>
            <Field label="Descrição" className="sm:col-span-2 lg:col-span-3">
              <Textarea rows={2} value={benefit.description} onChange={(e) => update(benefit.id, { description: e.target.value })} />
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1">
            <button onClick={() => moveOrder(benefit.id, -1)} disabled={index === 0} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button onClick={() => moveOrder(benefit.id, 1)} disabled={index === benefits.length - 1} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
              <ChevronDown className="h-4 w-4" />
            </button>
            <Button variant="danger" onClick={() => remove(benefit.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
