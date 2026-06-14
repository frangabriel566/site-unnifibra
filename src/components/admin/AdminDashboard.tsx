"use client";

import { useEffect, useState } from "react";
import {
  Wifi,
  MessageCircle,
  Megaphone,
  BarChart3,
  Facebook,
  Rocket,
  ExternalLink,
  Clock,
} from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Badge } from "./ui";
import { AdminSection } from "./AdminSidebar";
import { LeadRecord } from "@/types";

export default function AdminDashboard({
  onNavigate,
}: {
  onNavigate: (section: AdminSection) => void;
}) {
  const { config } = useAdminConfig();
  const [leadCount, setLeadCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/leads")
      .then((res) => res.json())
      .then((data: { records: LeadRecord[] }) => {
        const total = data.records.reduce((sum, record) => sum + record.count, 0);
        setLeadCount(total);
      })
      .catch(() => setLeadCount(0));
  }, []);

  const activePlans = config.plans.filter((p) => p.active).length;

  const cards = [
    {
      label: "Planos ativos",
      value: activePlans,
      icon: Wifi,
      color: "text-sky-500 bg-sky-50",
    },
    {
      label: "Contatos via WhatsApp",
      value: leadCount ?? "...",
      icon: MessageCircle,
      color: "text-emerald-500 bg-emerald-50",
    },
    {
      label: "Google Ads",
      value: config.googleAds.enabled ? "Ativo" : "Inativo",
      icon: Megaphone,
      color: config.googleAds.enabled ? "text-emerald-500 bg-emerald-50" : "text-slate-400 bg-slate-100",
    },
    {
      label: "Google Analytics",
      value: config.analytics.enabled ? "Ativo" : "Inativo",
      icon: BarChart3,
      color: config.analytics.enabled ? "text-emerald-500 bg-emerald-50" : "text-slate-400 bg-slate-100",
    },
    {
      label: "Meta Pixel",
      value: config.metaPixel.enabled ? "Ativo" : "Inativo",
      icon: Facebook,
      color: config.metaPixel.enabled ? "text-emerald-500 bg-emerald-50" : "text-slate-400 bg-slate-100",
    },
    {
      label: "Status do deploy",
      value: config.github.deployStatus,
      icon: Rocket,
      color: "text-indigo-500 bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <AdminCard key={card.label}>
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
                <card.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="text-xl font-bold text-slate-900">{card.value}</p>
              </div>
            </div>
          </AdminCard>
        ))}
      </div>

      <AdminCard title="Atalhos rápidos" description="Acesse rapidamente as principais áreas do painel.">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { id: "plans" as AdminSection, label: "Editar planos" },
            { id: "promotion" as AdminSection, label: "Editar promoção" },
            { id: "appearance" as AdminSection, label: "Editar aparência" },
            { id: "googleAds" as AdminSection, label: "Configurar Google Ads" },
            { id: "analytics" as AdminSection, label: "Configurar Analytics" },
            { id: "deploy" as AdminSection, label: "GitHub e Deploy" },
          ].map((shortcut) => (
            <button
              key={shortcut.id}
              onClick={() => onNavigate(shortcut.id)}
              className="rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-sky-400 hover:bg-sky-50"
            >
              {shortcut.label}
            </button>
          ))}
        </div>
      </AdminCard>

      <AdminCard title="Site publicado">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Clock className="h-4 w-4" />
            Última atualização:{" "}
            {new Date(config.github.lastUpdate).toLocaleString("pt-BR")}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone={config.github.deployStatus === "Publicado" ? "green" : "yellow"}>
              {config.github.deployStatus}
            </Badge>
            <a
              href={config.github.vercelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-600"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Ver site publicado
            </a>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
