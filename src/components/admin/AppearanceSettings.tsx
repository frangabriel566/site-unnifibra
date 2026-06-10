"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button } from "./ui";

export default function AppearanceSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.appearance);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, appearance: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const colorField = (label: string, key: keyof typeof form) => (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="h-10 w-12 cursor-pointer rounded border border-slate-300"
        />
        <Input
          value={form[key] as string}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        />
      </div>
    </Field>
  );

  return (
    <div className="space-y-6">
      <AdminCard title="Cores da marca" description="Personalize as cores principais utilizadas no site.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {colorField("Cor principal", "primaryColor")}
          {colorField("Cor secundária", "secondaryColor")}
          {colorField("Cor de destaque", "accentColor")}
          {colorField("Cor dos botões", "buttonColor")}
        </div>

        <div className="mt-4">
          <Field label="Modo do tema">
            <select
              value={form.theme}
              onChange={(e) => setForm({ ...form, theme: e.target.value as "light" | "dark" })}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            >
              <option value="dark">Escuro</option>
              <option value="light">Claro</option>
            </select>
          </Field>
        </div>
      </AdminCard>

      <AdminCard
        title="Seção Hero"
        description="Os banners exibidos no topo do site (imagem, título, subtítulo e botão) são gerenciados em Admin → Banners do início."
      >
        <p className="text-sm text-slate-500">
          Vá até a seção <strong>Banners do início</strong> no menu lateral para editar.
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
