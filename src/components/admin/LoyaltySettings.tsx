"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button } from "./ui";

export default function LoyaltySettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.loyalty);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, loyalty: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminCard title="Fidelidade" description="Textos e condições do contrato de fidelidade.">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Título da seção">
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </Field>
          <Field label="Tempo de fidelidade (meses)">
            <Input type="number" value={form.months} onChange={(e) => setForm({ ...form, months: Number(e.target.value) })} />
          </Field>
        </div>

        <Field label="Texto de fidelidade">
          <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>

        <Field label="O que o cliente ganha (um item por linha)">
          <Textarea
            rows={4}
            value={form.whatYouGet.join("\n")}
            onChange={(e) => setForm({ ...form, whatYouGet: e.target.value.split("\n").filter(Boolean) })}
          />
        </Field>

        <Field label="Como funciona a fidelidade (um item por linha)">
          <Textarea
            rows={4}
            value={form.howItWorks.join("\n")}
            onChange={(e) => setForm({ ...form, howItWorks: e.target.value.split("\n").filter(Boolean) })}
          />
        </Field>

        <Field label="Texto sobre multa proporcional / observação">
          <Textarea rows={2} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
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
