"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button, Toggle } from "./ui";

export default function IntegrationsSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [integrations, setIntegrations] = useState(config.integrations);
  const [metaPixel, setMetaPixel] = useState(config.metaPixel);
  const [tiktokPixel, setTiktokPixel] = useState(config.tiktokPixel);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, integrations, metaPixel, tiktokPixel }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminCard title="Integrações gerais" description="Tags e verificações de ferramentas externas.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Google Tag Manager ID">
            <Input
              placeholder="GTM-XXXXXXX"
              value={integrations.googleTagManagerId}
              onChange={(e) => setIntegrations({ ...integrations, googleTagManagerId: e.target.value })}
            />
          </Field>
          <Field label="Google Search Console verification">
            <Input
              value={integrations.googleSearchConsoleVerification}
              onChange={(e) => setIntegrations({ ...integrations, googleSearchConsoleVerification: e.target.value })}
            />
          </Field>
        </div>
        <div className="mt-4">
          <Toggle
            checked={integrations.whatsappTracking}
            onChange={(v) => setIntegrations({ ...integrations, whatsappTracking: v })}
            label="Rastrear cliques no WhatsApp (eventos de conversão)"
          />
        </div>
      </AdminCard>

      <AdminCard title="Meta Pixel" description="Pixel do Facebook/Instagram Ads.">
        <div className="space-y-4">
          <Toggle checked={metaPixel.enabled} onChange={(v) => setMetaPixel({ ...metaPixel, enabled: v })} label="Ativar Meta Pixel" />
          <Field label="Meta Pixel ID">
            <Input value={metaPixel.pixelId} onChange={(e) => setMetaPixel({ ...metaPixel, pixelId: e.target.value })} />
          </Field>
          <p className="text-xs text-slate-500">
            Eventos disparados: ViewContent, Lead, Contact, WhatsAppClick, PlanInterest, PromotionClick.
          </p>
        </div>
      </AdminCard>

      <AdminCard title="TikTok Pixel" description="Pixel de conversão do TikTok Ads.">
        <div className="space-y-4">
          <Toggle checked={tiktokPixel.enabled} onChange={(v) => setTiktokPixel({ ...tiktokPixel, enabled: v })} label="Ativar TikTok Pixel" />
          <Field label="TikTok Pixel ID">
            <Input value={tiktokPixel.pixelId} onChange={(e) => setTiktokPixel({ ...tiktokPixel, pixelId: e.target.value })} />
          </Field>
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
