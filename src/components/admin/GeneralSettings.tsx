"use client";

import { useState } from "react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button } from "./ui";
import { Save, Check } from "lucide-react";

export default function GeneralSettings() {
  const { config, updateConfig } = useAdminConfig();
  const [form, setForm] = useState(config.general);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateConfig((c) => ({ ...c, general: form }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminCard
      title="Configurações gerais"
      description="Informações básicas da empresa exibidas em todo o site."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nome do provedor">
          <Input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
        </Field>
        <Field label="Slogan">
          <Input value={form.slogan} onChange={(e) => setForm({ ...form, slogan: e.target.value })} />
        </Field>
        <Field label="Logo (caminho do arquivo)">
          <Input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
        </Field>
        <Field label="Favicon (caminho do arquivo)">
          <Input value={form.favicon} onChange={(e) => setForm({ ...form, favicon: e.target.value })} />
        </Field>
        <Field label="WhatsApp principal (apenas números, com DDI)">
          <Input value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} />
        </Field>
        <Field label="E-mail">
          <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </Field>
        <Field label="Telefone">
          <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </Field>
        <Field label="CNPJ">
          <Input value={form.cnpj} onChange={(e) => setForm({ ...form, cnpj: e.target.value })} />
        </Field>
        <Field label="Horário de atendimento">
          <Input value={form.attendanceHours} onChange={(e) => setForm({ ...form, attendanceHours: e.target.value })} />
        </Field>
        <Field label="Endereço" className="sm:col-span-2">
          <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </Field>
        <Field label="Descrição da empresa" className="sm:col-span-2">
          <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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
