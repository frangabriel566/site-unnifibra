"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";

export default function PromotionSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.promotion);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, promotion: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminCard title="Promoção" description="Configure a oferta especial exibida no site.">
      <div className="space-y-4">
        <Toggle checked={form.active} onChange={(v) => setForm({ ...form, active: v })} label="Promoção ativa" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Título da promoção">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Selo da promoção">
            <Input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
          </Field>
          <Field label="Valor promocional (R$)">
            <Input
              type="number"
              step="0.01"
              value={form.promoPrice}
              onChange={(e) => setForm({ ...form, promoPrice: Number(e.target.value) })}
            />
          </Field>
          <Field label="Duração da promoção (meses)">
            <Input
              type="number"
              value={form.durationMonths}
              onChange={(e) => setForm({ ...form, durationMonths: Number(e.target.value) })}
            />
          </Field>
        </div>

        <Field label="Texto da promoção">
          <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>

        <Field label="Benefícios da promoção (um por linha)">
          <Textarea
            rows={4}
            value={form.benefits.join("\n")}
            onChange={(e) => setForm({ ...form, benefits: e.target.value.split("\n").filter(Boolean) })}
          />
        </Field>

        <Field label="Mensagem do WhatsApp">
          <Textarea rows={2} value={form.whatsappMessage} onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })} />
        </Field>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button onClick={handleSave}>
          <Save className="h-4 w-4" />
          Salvar alterações
        </Button>
        {saved && (
          <span className="flex items-center gap-1 text-sm font-medium text-emerald-600">
            <Check className="h-4 w-4" /> Salvo
          </span>
        )}
      </div>
    </AdminCard>
  );
}
