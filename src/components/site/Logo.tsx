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
 */
export default function Logo({ className, height = 44 }: LogoProps) {
  return (
    <Image
      src={siteConfig.general.logo}
      alt={siteConfig.general.companyName}
      width={height * 4}
      height={height}
      style={{ height, width: "auto" }}
      className={cn("object-contain", className)}
      priority
    />
  );
}
