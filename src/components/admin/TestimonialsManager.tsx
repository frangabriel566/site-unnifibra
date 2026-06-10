"use client";

import { Plus, Trash2, Star } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";
import { Testimonial } from "@/types";
import { cn } from "@/lib/utils";

function emptyTestimonial(): Testimonial {
  return {
    id: `depoimento-${Date.now()}`,
    name: "Novo cliente",
    neighborhood: "Bairro",
    comment: "Comentário do cliente",
    rating: 5,
    active: true,
  };
}

export default function TestimonialsManager() {
  const { config, updateConfig } = useAdminConfig();

  const update = (id: string, patch: Partial<Testimonial>) => {
    updateConfig((c) => ({
      ...c,
      testimonials: c.testimonials.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({ ...c, testimonials: c.testimonials.filter((t) => t.id !== id) }));
  };

  const add = () => {
    updateConfig((c) => ({ ...c, testimonials: [...c.testimonials, emptyTestimonial()] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
          Novo depoimento
        </Button>
      </div>

      {config.testimonials.map((testimonial) => (
        <AdminCard key={testimonial.id}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Nome do cliente">
              <Input value={testimonial.name} onChange={(e) => update(testimonial.id, { name: e.target.value })} />
            </Field>
            <Field label="Bairro">
              <Input value={testimonial.neighborhood} onChange={(e) => update(testimonial.id, { neighborhood: e.target.value })} />
            </Field>
            <Field label="Nota (1 a 5)">
              <div className="flex items-center gap-1 pt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => update(testimonial.id, { rating: star })}>
                    <Star
                      className={cn(
                        "h-5 w-5",
                        star <= testimonial.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </Field>
            <Field label="Ativo">
              <Toggle checked={testimonial.active} onChange={(v) => update(testimonial.id, { active: v })} />
            </Field>
            <Field label="Comentário" className="sm:col-span-2 lg:col-span-4">
              <Textarea rows={2} value={testimonial.comment} onChange={(e) => update(testimonial.id, { comment: e.target.value })} />
            </Field>
          </div>
          <div className="mt-4 flex justify-end">
            <Button variant="danger" onClick={() => remove(testimonial.id)}>
              <Trash2 className="h-4 w-4" />
              Excluir
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
