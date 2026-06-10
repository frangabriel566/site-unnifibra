"use client";

import { useState } from "react";
import { Save, Check } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";

export default function SEOSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.seo);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, seo: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminCard title="SEO" description="Configurações de busca e compartilhamento.">
      <div className="space-y-4">
        <Field label="Título do site">
          <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <Field label="Descrição do site">
          <Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </Field>
        <Field label="Palavras-chave (separadas por vírgula)">
          <Textarea
            rows={2}
            value={form.keywords.join(", ")}
            onChange={(e) => setForm({ ...form, keywords: e.target.value.split(",").map((k) => k.trim()).filter(Boolean) })}
          />
        </Field>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Imagem Open Graph">
            <Input value={form.ogImage} onChange={(e) => setForm({ ...form, ogImage: e.target.value })} />
          </Field>
          <Field label="Autor">
            <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
          </Field>
          <Field label="Título Open Graph">
            <Input value={form.ogTitle} onChange={(e) => setForm({ ...form, ogTitle: e.target.value })} />
          </Field>
          <Field label="Descrição Open Graph">
            <Input value={form.ogDescription} onChange={(e) => setForm({ ...form, ogDescription: e.target.value })} />
          </Field>
          <Field label="Robots">
            <Input value={form.robots} onChange={(e) => setForm({ ...form, robots: e.target.value })} />
          </Field>
          <Field label="URL canônica">
            <Input value={form.canonicalUrl} onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })} />
          </Field>
          <Field label="Favicon">
            <Input value={form.favicon} onChange={(e) => setForm({ ...form, favicon: e.target.value })} />
          </Field>
        </div>

        <Toggle checked={form.indexable} onChange={(v) => setForm({ ...form, indexable: v })} label="Permitir indexação (robots: index, follow)" />
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
