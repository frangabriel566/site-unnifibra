"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";
import { FAQItem } from "@/types";

function emptyFAQ(order: number): FAQItem {
  return {
    id: `faq-${Date.now()}`,
    question: "Nova pergunta",
    answer: "Resposta da pergunta",
    active: true,
    order,
  };
}

export default function FAQManager() {
  const { config, updateConfig } = useAdminConfig();
  const items = [...config.faq].sort((a, b) => a.order - b.order);

  const update = (id: string, patch: Partial<FAQItem>) => {
    updateConfig((c) => ({
      ...c,
      faq: c.faq.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({ ...c, faq: c.faq.filter((f) => f.id !== id) }));
  };

  const add = () => {
    updateConfig((c) => ({ ...c, faq: [...c.faq, emptyFAQ(items.length + 1)] }));
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.faq].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((f) => f.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, faq: sorted };
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
          Nova pergunta
        </Button>
      </div>

      {items.map((item, index) => (
        <AdminCard key={item.id}>
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Field label="Pergunta" className="flex-1">
                <Input value={item.question} onChange={(e) => update(item.id, { question: e.target.value })} />
              </Field>
              <Toggle checked={item.active} onChange={(v) => update(item.id, { active: v })} label="Ativa" />
            </div>
            <Field label="Resposta">
              <Textarea rows={3} value={item.answer} onChange={(e) => update(item.id, { answer: e.target.value })} />
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1">
            <button onClick={() => moveOrder(item.id, -1)} disabled={index === 0} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button onClick={() => moveOrder(item.id, 1)} disabled={index === items.length - 1} className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30">
              <ChevronDown className="h-4 w-4" />
            </button>
            <Button variant="danger" onClick={() => remove(item.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
