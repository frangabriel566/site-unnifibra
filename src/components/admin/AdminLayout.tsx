"use client";

import { ReactNode, useState } from "react";
import { Check, Menu, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import AdminSidebar, { AdminSection } from "./AdminSidebar";

const SECTION_TITLES: Record<AdminSection, string> = {
  dashboard: "Dashboard",
  general: "Configurações gerais",
  appearance: "Aparência",
  heroBanners: "Banners do início",
  plans: "Planos",
  promotion: "Promoção",
  loyalty: "Fidelidade",
  benefits: "Benefícios",
  offices: "Nossos escritórios",
  coverageCities: "Cobertura / Cidades",
  testimonials: "Depoimentos",
  faq: "Perguntas frequentes",
  social: "Redes sociais",
  seo: "SEO",
  integrations: "Integrações",
  googleAds: "Google Ads",
  analytics: "Analytics",
  deploy: "GitHub e Deploy",
};

export default function AdminLayout({
  active,
  onSelect,
  children,
}: {
  active: AdminSection;
  onSelect: (section: AdminSection) => void;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("unnifibra_admin_auth");
    router.push("/admin/login");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="hidden lg:block">
        <AdminSidebar active={active} onSelect={onSelect} onLogout={handleLogout} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <AdminSidebar
            active={active}
            onSelect={(s) => {
              onSelect(s);
              setMobileOpen(false);
            }}
            onClose={() => setMobileOpen(false)}
            onLogout={handleLogout}
          />
          <div className="flex-1 bg-black/30" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-4 lg:px-8">
          <button onClick={() => setMobileOpen(true)} className="text-slate-500 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="flex-1 text-lg font-bold text-slate-900">{SECTION_TITLES[active]}</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-600"
          >
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Salvo!" : "Salvar alterações"}
          </button>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
