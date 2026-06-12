import Image from "next/image";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
  width?: number;
}

export default function Logo({ className, height = 48, width }: LogoProps) {
  return (
    <Image
      src={siteConfig.general.logo}
      alt={siteConfig.general.companyName}
      width={width ?? height * 4}
      height={height}
      style={width ? { width, height: "auto" } : { height, width: "auto" }}
      className={cn("block object-contain", className)}
      priority
    />
  );
}
