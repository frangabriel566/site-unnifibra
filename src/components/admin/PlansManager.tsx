"use client";

import { useState } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown, Star } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle, Badge } from "./ui";
import { Plan } from "@/types";

function emptyPlan(order: number): Plan {
  return {
    id: `plano-${Date.now()}`,
    name: "Novo plano",
    speed: "0 Mbps",
    normalPrice: 0,
    promoPrice: 0,
    promoDurationMonths: 3,
    benefits: [],
    freeInstallation: true,
    freeEquipment: true,
    loyalty: true,
    loyaltyMonths: 12,
    highlighted: false,
    active: true,
    order,
    whatsappMessage: "Olá, tenho interesse em um plano da UNNIFIBRA.",
  };
}

export default function PlansManager() {
  const { config, updateConfig } = useAdminConfig();
  const [expanded, setExpanded] = useState<string | null>(null);

  const plans = [...config.plans].sort((a, b) => a.order - b.order);

  const updatePlan = (id: string, patch: Partial<Plan>) => {
    updateConfig((c) => ({
      ...c,
      plans: c.plans.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  };

  const removePlan = (id: string) => {
    updateConfig((c) => ({ ...c, plans: c.plans.filter((p) => p.id !== id) }));
  };

  const addPlan = () => {
    const newPlan = emptyPlan(plans.length + 1);
    updateConfig((c) => ({ ...c, plans: [...c.plans, newPlan] }));
    setExpanded(newPlan.id);
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.plans].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((p) => p.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, plans: sorted };
    });
  };

  const setHighlighted = (id: string) => {
    updateConfig((c) => ({
      ...c,
      plans: c.plans.map((p) => ({
        ...p,
        highlighted: p.id === id ? !p.highlighted : p.highlighted,
      })),
    }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={addPlan}>
          <Plus className="h-4 w-4" />
          Novo plano
        </Button>
      </div>

      {plans.map((plan, index) => (
        <AdminCard key={plan.id}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              className="flex flex-1 items-center gap-3 text-left"
              onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}
            >
              <div>
                <p className="font-bold text-slate-900">{plan.name}</p>
                <p className="text-sm text-slate-500">{plan.speed}</p>
              </div>
              <div className="flex gap-2">
                {plan.active ? <Badge tone="green">Ativo</Badge> : <Badge tone="red">Inativo</Badge>}
                {plan.highlighted && <Badge tone="yellow">Destaque</Badge>}
              </div>
            </button>

            <div className="flex items-center gap-1">
              <button onClick={() => moveOrder(plan.id, -1)} disabled={index === 0} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
                <ChevronUp className="h-4 w-4" />
              </button>
              <button onClick={() => moveOrder(plan.id, 1)} disabled={index === plans.length - 1} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
                <ChevronDown className="h-4 w-4" />
              </button>
              <Button variant="danger" onClick={() => removePlan(plan.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {expanded === plan.id && (
            <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Nome do plano">
                  <Input value={plan.name} onChange={(e) => updatePlan(plan.id, { name: e.target.value })} />
                </Field>
                <Field label="Velocidade">
                  <Input value={plan.speed} onChange={(e) => updatePlan(plan.id, { speed: e.target.value })} />
                </Field>
                <Field label="Preço normal (R$)">
                  <Input
                    type="number"
                    step="0.01"
                    value={plan.normalPrice}
                    onChange={(e) => updatePlan(plan.id, { normalPrice: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Preço promocional (R$)">
                  <Input
                    type="number"
                    step="0.01"
                    value={plan.promoPrice}
                    onChange={(e) => updatePlan(plan.id, { promoPrice: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Duração da promoção (meses)">
                  <Input
                    type="number"
                    value={plan.promoDurationMonths}
                    onChange={(e) => updatePlan(plan.id, { promoDurationMonths: Number(e.target.value) })}
                  />
                </Field>
                <Field label="Tempo de fidelidade (meses)">
                  <Input
                    type="number"
                    value={plan.loyaltyMonths}
                    onChange={(e) => updatePlan(plan.id, { loyaltyMonths: Number(e.target.value) })}
                  />
                </Field>
              </div>

              <Field label="Benefícios (um por linha)">
                <Textarea
                  rows={4}
                  value={plan.benefits.join("\n")}
                  onChange={(e) => updatePlan(plan.id, { benefits: e.target.value.split("\n").filter(Boolean) })}
                />
              </Field>

              <Field label="Mensagem personalizada do WhatsApp">
                <Textarea
                  rows={2}
                  value={plan.whatsappMessage}
                  onChange={(e) => updatePlan(plan.id, { whatsappMessage: e.target.value })}
                />
              </Field>

              {plan.highlighted && (
                <Field label="Selo de destaque">
                  <Input
                    value={plan.highlightLabel ?? ""}
                    onChange={(e) => updatePlan(plan.id, { highlightLabel: e.target.value })}
                  />
                </Field>
              )}

              <div className="flex flex-wrap gap-6">
                <Toggle checked={plan.active} onChange={(v) => updatePlan(plan.id, { active: v })} label="Plano ativo" />
                <Toggle checked={plan.freeInstallation} onChange={(v) => updatePlan(plan.id, { freeInstallation: v })} label="Instalação grátis" />
                <Toggle checked={plan.freeEquipment} onChange={(v) => updatePlan(plan.id, { freeEquipment: v })} label="Equipamentos grátis" />
                <Toggle checked={plan.loyalty} onChange={(v) => updatePlan(plan.id, { loyalty: v })} label="Possui fidelidade" />
                <button
                  onClick={() => setHighlighted(plan.id)}
                  className="flex items-center gap-2 text-sm font-medium text-amber-600 hover:underline"
                >
                  <Star className="h-4 w-4" />
                  {plan.highlighted ? "Remover destaque" : "Definir como destaque"}
                </button>
              </div>
            </div>
          )}
        </AdminCard>
      ))}
    </div>
  );
}
