"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button } from "./ui";

export default function SocialSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.social);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, social: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { key: keyof typeof form; label: string }[] = [
    { key: "instagram", label: "Instagram" },
    { key: "facebook", label: "Facebook" },
    { key: "tiktok", label: "TikTok" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "youtube", label: "YouTube" },
    { key: "linkedin", label: "LinkedIn" },
  ];

  return (
    <AdminCard title="Redes sociais" description="Links exibidos no rodapé do site.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <Field key={field.key} label={field.label}>
            <Input value={form[field.key]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} />
          </Field>
        ))}
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
