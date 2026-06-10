"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button, Toggle } from "./ui";

export default function GoogleAdsSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.googleAds);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, googleAds: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminCard title="Google Ads" description="Configurações de conversão do Google Ads.">
        <div className="space-y-4">
          <Toggle checked={form.enabled} onChange={(v) => setForm({ ...form, enabled: v })} label="Ativar Google Ads" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Google Ads Conversion ID">
              <Input
                placeholder="AW-XXXXXXXXX"
                value={form.conversionId}
                onChange={(e) => setForm({ ...form, conversionId: e.target.value })}
              />
            </Field>
            <Field label="Google Ads Conversion Label">
              <Input value={form.conversionLabel} onChange={(e) => setForm({ ...form, conversionLabel: e.target.value })} />
            </Field>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Eventos de conversão" description="Nomes dos eventos disparados em cada ação do site.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Clique no WhatsApp">
            <Input value={form.events.whatsappClick} onChange={(e) => setForm({ ...form, events: { ...form.events, whatsappClick: e.target.value } })} />
          </Field>
          <Field label="Clique em plano">
            <Input value={form.events.planClick} onChange={(e) => setForm({ ...form, events: { ...form.events, planClick: e.target.value } })} />
          </Field>
          <Field label="Consultar cobertura">
            <Input value={form.events.coverageClick} onChange={(e) => setForm({ ...form, events: { ...form.events, coverageClick: e.target.value } })} />
          </Field>
          <Field label="Promoção">
            <Input value={form.events.promotionClick} onChange={(e) => setForm({ ...form, events: { ...form.events, promotionClick: e.target.value } })} />
          </Field>
        </div>
        <p className="mt-4 text-xs text-slate-500">
          Os scripts de conversão só são executados quando o Google Ads está ativo e os IDs estão preenchidos.
        </p>
      </AdminCard>

      <div className="flex items-center gap-3">
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
    </div>
  );
}
