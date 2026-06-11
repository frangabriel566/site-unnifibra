import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
}

/**
 * Logo oficial da UNNIFIBRA. O arquivo de origem fica em
 * `siteConfig.general.logo` (public/logo.png) e pode ser substituído
 * a qualquer momento sem alterar este componente.
 *
 * O arquivo de origem tem fundo branco sólido (sem transparência), por
 * isso a logo fica dentro de um "selo" branco arredondado com sombra —
 * assim o fundo branco vira um elemento de design proposital em vez de
 * aparecer como uma borda solta sobre o fundo escuro do site.
 */
export default function Logo({ className, height = 48 }: LogoProps) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-2xl bg-white shadow-md shadow-black/30"
      style={{ padding: Math.round(height * 0.12) }}
    >
      <Image
        src={siteConfig.general.logo}
        alt={siteConfig.general.companyName}
        width={height * 4}
        height={height}
        style={{ height, width: "auto" }}
        className={cn("block object-contain", className)}
        priority
      />
    </span>
  );
}
