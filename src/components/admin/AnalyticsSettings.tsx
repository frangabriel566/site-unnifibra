"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button, Toggle } from "./ui";

const TRACKED_EVENTS = [
  "page_view",
  "whatsapp_click",
  "plan_click",
  "coverage_click",
  "contact_click",
  "promotion_click",
];

export default function AnalyticsSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.analytics);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, analytics: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminCard title="Google Analytics (GA4)" description="Mensuração de eventos e tráfego do site.">
        <div className="space-y-4">
          <Toggle checked={form.enabled} onChange={(v) => setForm({ ...form, enabled: v })} label="Ativar Google Analytics" />
          <Field label="Measurement ID">
            <Input placeholder="G-XXXXXXXXXX" value={form.measurementId} onChange={(e) => setForm({ ...form, measurementId: e.target.value })} />
          </Field>
        </div>
      </AdminCard>

      <AdminCard title="Eventos monitorados" description="Eventos enviados automaticamente para o GA4.">
        <div className="flex flex-wrap gap-2">
          {TRACKED_EVENTS.map((event) => (
            <span key={event} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">
              {event}
            </span>
          ))}
        </div>
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
