"use client";

import { Plus, Trash2, ChevronUp, ChevronDown, ImageIcon } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";
import { Office } from "@/types";

function emptyOffice(order: number): Office {
  return {
    id: `escritorio-${Date.now()}`,
    name: "Nova unidade UNNIFIBRA",
    address: "Endereço da unidade",
    image: "/img/escritorio-matriz.jpg",
    mapUrl: "https://www.google.com/maps",
    active: true,
    order,
  };
}

export default function OfficesManager() {
  const { config, updateConfig } = useAdminConfig();
  const offices = [...config.offices].sort((a, b) => a.order - b.order);

  const update = (id: string, patch: Partial<Office>) => {
    updateConfig((c) => ({
      ...c,
      offices: c.offices.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({ ...c, offices: c.offices.filter((o) => o.id !== id) }));
  };

  const add = () => {
    updateConfig((c) => ({ ...c, offices: [...c.offices, emptyOffice(offices.length + 1)] }));
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.offices].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((o) => o.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, offices: sorted };
    });
  };

  return (
    <div className="space-y-4">
      <AdminCard
        title="Nossos escritórios"
        description="Gerencie as unidades exibidas no site, com foto da fachada, endereço e botão para o mapa."
      >
        <p className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-xs text-sky-700">
          <ImageIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
          Envie a foto da fachada para a pasta <code className="font-mono">public/img</code> e
          informe o caminho (ex: <code className="font-mono">/img/escritorio-matriz.jpg</code>)
          ou cole a URL de uma imagem hospedada externamente. O link &quot;Venha até a gente&quot;
          deve apontar para o Google Maps da unidade.
        </p>
      </AdminCard>

      <div className="flex justify-end">
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
          Nova unidade
        </Button>
      </div>

      {offices.map((office, index) => (
        <AdminCard key={office.id}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Field label="Foto da fachada (caminho ou URL)">
                <Input
                  value={office.image}
                  onChange={(e) => update(office.id, { image: e.target.value })}
                  placeholder="/img/escritorio-matriz.jpg"
                />
              </Field>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={office.image}
                alt={office.name}
                className="mt-2 aspect-[4/3] w-full rounded-lg border border-slate-200 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0.2";
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              <Field label="Nome da unidade" className="sm:col-span-2">
                <Input value={office.name} onChange={(e) => update(office.id, { name: e.target.value })} />
              </Field>
              <Field label="Endereço" className="sm:col-span-2">
                <Textarea
                  rows={2}
                  value={office.address}
                  onChange={(e) => update(office.id, { address: e.target.value })}
                />
              </Field>
              <Field label="Link do Google Maps" className="sm:col-span-2">
                <Input
                  value={office.mapUrl}
                  onChange={(e) => update(office.id, { mapUrl: e.target.value })}
                  placeholder="https://www.google.com/maps/..."
                />
              </Field>
              <div className="flex items-end pb-2">
                <Toggle
                  checked={office.active}
                  onChange={(v) => update(office.id, { active: v })}
                  label="Unidade visível no site"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1">
            <button
              onClick={() => moveOrder(office.id, -1)}
              disabled={index === 0}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveOrder(office.id, 1)}
              disabled={index === offices.length - 1}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <Button variant="danger" onClick={() => remove(office.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
