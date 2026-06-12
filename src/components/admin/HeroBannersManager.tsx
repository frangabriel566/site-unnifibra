"use client";

import { Plus, Trash2, ChevronUp, ChevronDown, ImageIcon } from "lucide-react";
import { useAdminConfig } from "./AdminConfigContext";
import { AdminCard, Field, Input, Textarea, Button, Toggle } from "./ui";
import { HeroBanner } from "@/types";

function emptyBanner(order: number): HeroBanner {
  return {
    id: `banner-${Date.now()}`,
    image: "/img/hero-banner-1.jpg",
    mobileImage: "",
    title: "Tenha uma conexão que vai além da internet",
    subtitle: "Fibra óptica de qualidade é com a UNNIFIBRA!",
    buttonText: "Ver Planos",
    buttonLink: "#planos",
    active: true,
    order,
  };
}

export default function HeroBannersManager() {
  const { config, updateConfig } = useAdminConfig();
  const banners = [...config.appearance.heroBanners].sort((a, b) => a.order - b.order);

  const update = (id: string, patch: Partial<HeroBanner>) => {
    updateConfig((c) => ({
      ...c,
      appearance: {
        ...c.appearance,
        heroBanners: c.appearance.heroBanners.map((b) => (b.id === id ? { ...b, ...patch } : b)),
      },
    }));
  };

  const remove = (id: string) => {
    updateConfig((c) => ({
      ...c,
      appearance: {
        ...c.appearance,
        heroBanners: c.appearance.heroBanners.filter((b) => b.id !== id),
      },
    }));
  };

  const add = () => {
    updateConfig((c) => ({
      ...c,
      appearance: {
        ...c.appearance,
        heroBanners: [...c.appearance.heroBanners, emptyBanner(banners.length + 1)],
      },
    }));
  };

  const moveOrder = (id: string, direction: -1 | 1) => {
    updateConfig((c) => {
      const sorted = [...c.appearance.heroBanners].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((b) => b.id === id);
      const swapIdx = idx + direction;
      if (swapIdx < 0 || swapIdx >= sorted.length) return c;
      const tmp = sorted[idx].order;
      sorted[idx].order = sorted[swapIdx].order;
      sorted[swapIdx].order = tmp;
      return { ...c, appearance: { ...c.appearance, heroBanners: sorted } };
    });
  };

  return (
    <div className="space-y-4">
      <AdminCard
        title="Banners do início (carrossel)"
        description="Gerencie as imagens, textos e botões exibidos no topo do site. Quando houver mais de um banner ativo, eles alternam automaticamente em carrossel."
      >
        <p className="flex items-start gap-2 rounded-xl border border-sky-100 bg-sky-50 p-3 text-xs text-sky-700">
          <ImageIcon className="mt-0.5 h-4 w-4 flex-shrink-0" />
          Envie as imagens para a pasta <code className="font-mono">public/img</code> do
          projeto e informe o caminho (ex: <code className="font-mono">/img/banner1.jpg</code>)
          ou cole a URL completa de uma imagem hospedada externamente.
        </p>
      </AdminCard>

      <div className="flex justify-end">
        <Button onClick={add}>
          <Plus className="h-4 w-4" />
          Novo banner
        </Button>
      </div>

      {banners.map((banner, index) => (
        <AdminCard key={banner.id}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <Field label="Imagem desktop (caminho ou URL)">
                <Input
                  value={banner.image}
                  onChange={(e) => update(banner.id, { image: e.target.value })}
                  placeholder="/img/banner1.jpg"
                />
              </Field>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={banner.image}
                alt={banner.title}
                className="mt-2 aspect-video w-full rounded-lg border border-slate-200 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.opacity = "0.2";
                }}
              />

              <Field label="Imagem mobile (1080x1350 ou 1080x1200, opcional)" className="mt-4">
                <Input
                  value={banner.mobileImage ?? ""}
                  onChange={(e) => update(banner.id, { mobileImage: e.target.value })}
                  placeholder="/img/banner1-mobile.jpg"
                />
              </Field>
              {banner.mobileImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={banner.mobileImage}
                  alt={banner.title}
                  className="mt-2 aspect-[4/5] w-full max-w-[180px] rounded-lg border border-slate-200 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.opacity = "0.2";
                  }}
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-2">
              <Field label="Título" className="sm:col-span-2">
                <Textarea
                  rows={2}
                  value={banner.title}
                  onChange={(e) => update(banner.id, { title: e.target.value })}
                />
              </Field>
              <Field label="Subtítulo" className="sm:col-span-2">
                <Textarea
                  rows={2}
                  value={banner.subtitle}
                  onChange={(e) => update(banner.id, { subtitle: e.target.value })}
                />
              </Field>
              <Field label="Texto do botão">
                <Input
                  value={banner.buttonText}
                  onChange={(e) => update(banner.id, { buttonText: e.target.value })}
                />
              </Field>
              <Field label="Link do botão">
                <Input
                  value={banner.buttonLink}
                  onChange={(e) => update(banner.id, { buttonLink: e.target.value })}
                  placeholder="#planos"
                />
              </Field>
              <div className="flex items-end pb-2">
                <Toggle
                  checked={banner.active}
                  onChange={(v) => update(banner.id, { active: v })}
                  label="Banner ativo"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-1">
            <button
              onClick={() => moveOrder(banner.id, -1)}
              disabled={index === 0}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
            <button
              onClick={() => moveOrder(banner.id, 1)}
              disabled={index === banners.length - 1}
              className="rounded p-1.5 text-slate-400 hover:bg-slate-100 disabled:opacity-30"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
            <Button variant="danger" onClick={() => remove(banner.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </AdminCard>
      ))}
    </div>
  );
}
