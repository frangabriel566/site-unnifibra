"use client";

import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { AdminCard, Button, Badge } from "./ui";
import { siteConfig } from "@/config/siteConfig";
import { LeadRecord } from "@/types";

const PLAN_MEGAS = [400, 500, 600, 800];

export default function LeadsManager() {
  const [data, setData] = useState<{ today: string; records: LeadRecord[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/leads")
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const cities = siteConfig.serviceCities;
  const todayRecords = data?.records.filter((r) => r.date === data.today) ?? [];
  const history = [...(data?.records ?? [])]
    .filter((r) => r.date !== data?.today)
    .sort((a, b) => b.date.localeCompare(a.date));

  const countFor = (cityId: string, megas: number) =>
    todayRecords.find((r) => r.cityId === cityId && r.megas === megas)?.count ?? 0;

  return (
    <div className="space-y-4">
      <AdminCard
        title="Leads diários por cidade e plano"
        description="Contagem de cliques no botão de WhatsApp por cidade e plano (em megas). A contagem de hoje reseta automaticamente todo dia, mas o histórico fica salvo."
      >
        <Button variant="secondary" onClick={load} disabled={loading}>
          <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          Atualizar
        </Button>
      </AdminCard>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {cities.map((city) => (
          <AdminCard key={city.id} title={city.name}>
            <ul className="space-y-2 text-sm">
              {PLAN_MEGAS.map((megas) => (
                <li key={megas} className="flex items-center justify-between">
                  <span className="text-slate-700">Plano {megas} Mega</span>
                  <Badge tone="green">{countFor(city.id, megas)} leads hoje</Badge>
                </li>
              ))}
              <li className="flex items-center justify-between border-t border-slate-100 pt-2">
                <span className="text-slate-700">Outros cliques (sem plano)</span>
                <Badge>{countFor(city.id, 0)} leads hoje</Badge>
              </li>
              <li className="flex items-center justify-between border-t border-slate-100 pt-2 font-semibold">
                <span className="text-slate-900">Total hoje</span>
                <Badge tone="green">
                  {PLAN_MEGAS.reduce((sum, m) => sum + countFor(city.id, m), 0) +
                    countFor(city.id, 0)}{" "}
                  leads
                </Badge>
              </li>
            </ul>
          </AdminCard>
        ))}
      </div>

      <AdminCard title="Histórico de dias anteriores">
        {history.length === 0 ? (
          <p className="text-sm text-slate-400">Ainda não há histórico de dias anteriores.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2 pr-4">Data</th>
                  <th className="py-2 pr-4">Cidade</th>
                  <th className="py-2 pr-4">Plano</th>
                  <th className="py-2 pr-4">Leads</th>
                </tr>
              </thead>
              <tbody>
                {history.map((r) => (
                  <tr key={`${r.date}-${r.cityId}-${r.megas}`} className="border-b border-slate-100">
                    <td className="py-2 pr-4">{r.date}</td>
                    <td className="py-2 pr-4">{r.cityName}</td>
                    <td className="py-2 pr-4">{r.megas > 0 ? `${r.megas} Mega` : "Geral"}</td>
                    <td className="py-2 pr-4">{r.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminCard>
    </div>
  );
}
