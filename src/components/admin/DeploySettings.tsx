"use client";

import { useState } from "react";
import { Save, Check, Github, ExternalLink } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Button } from "./ui";

export default function DeploySettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.github);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, github: { ...form, lastUpdate: new Date().toISOString() } }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <AdminCard title="GitHub e Deploy" description="Informações do repositório e da publicação na Vercel.">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="URL do repositório GitHub">
              <Input value={form.repositoryUrl} onChange={(e) => setForm({ ...form, repositoryUrl: e.target.value })} />
            </Field>
            <Field label="Branch principal">
              <Input value={form.mainBranch} onChange={(e) => setForm({ ...form, mainBranch: e.target.value })} />
            </Field>
            <Field label="Status do deploy">
              <Input value={form.deployStatus} onChange={(e) => setForm({ ...form, deployStatus: e.target.value })} />
            </Field>
            <Field label="URL do site na Vercel">
              <Input value={form.vercelUrl} onChange={(e) => setForm({ ...form, vercelUrl: e.target.value })} />
            </Field>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={form.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Github className="h-4 w-4" />
              Ver repositório
            </a>
            <a
              href={form.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-600"
            >
              <ExternalLink className="h-4 w-4" />
              Ver site publicado
            </a>
          </div>
        </div>
      </AdminCard>

      <AdminCard
        title="Tokens de API (futuro)"
        description="Estes campos não são utilizados no frontend. Servirão para integração futura com as APIs do GitHub e da Vercel via backend/serverless functions."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Token da GitHub API (futuro)">
            <Input type="password" placeholder="ghp_********************" disabled value="" />
          </Field>
          <Field label="Token da Vercel API (futuro)">
            <Input type="password" placeholder="********************" disabled value="" />
          </Field>
        </div>
        <p className="mt-3 text-xs text-amber-600">
          Atenção: por segurança, tokens nunca devem ser armazenados ou expostos no frontend.
          Utilize variáveis de ambiente no servidor (Vercel Environment Variables).
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
