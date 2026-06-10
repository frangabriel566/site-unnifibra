"use client";

import {
  LayoutDashboard,
  Settings,
  Palette,
  Wifi,
  Tag,
  ShieldCheck,
  Sparkles,
  MessageSquareQuote,
  HelpCircle,
  Share2,
  Search,
  Plug,
  Megaphone,
  BarChart3,
  Github,
  GalleryHorizontal,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type AdminSection =
  | "dashboard"
  | "general"
  | "appearance"
  | "heroBanners"
  | "plans"
  | "promotion"
  | "loyalty"
  | "benefits"
  | "testimonials"
  | "faq"
  | "social"
  | "seo"
  | "integrations"
  | "googleAds"
  | "analytics"
  | "deploy";

const MENU: { id: AdminSection; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "general", label: "Configurações gerais", icon: Settings },
  { id: "appearance", label: "Aparência", icon: Palette },
  { id: "heroBanners", label: "Banners do início", icon: GalleryHorizontal },
  { id: "plans", label: "Planos", icon: Wifi },
  { id: "promotion", label: "Promoção", icon: Tag },
  { id: "loyalty", label: "Fidelidade", icon: ShieldCheck },
  { id: "benefits", label: "Benefícios", icon: Sparkles },
  { id: "testimonials", label: "Depoimentos", icon: MessageSquareQuote },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "social", label: "Redes sociais", icon: Share2 },
  { id: "seo", label: "SEO", icon: Search },
  { id: "integrations", label: "Integrações", icon: Plug },
  { id: "googleAds", label: "Google Ads", icon: Megaphone },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "deploy", label: "GitHub e Deploy", icon: Github },
];

export default function AdminSidebar({
  active,
  onSelect,
  onClose,
  onLogout,
}: {
  active: AdminSection;
  onSelect: (section: AdminSection) => void;
  onClose?: () => void;
  onLogout: () => void;
}) {
  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 p-5">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-800">
            <Wifi className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-slate-900">UNNIFIBRA</p>
            <p className="text-xs text-slate-400">Painel administrativo</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-slate-400">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {MENU.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
              active === item.id
                ? "bg-sky-50 text-sky-600"
                : "text-slate-600 hover:bg-slate-50"
            )}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
