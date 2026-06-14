"use client";

import { ReactNode } from "react";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { TrackEventName } from "@/types";
import { cn } from "@/lib/utils";
import { useCity } from "./CityContext";

interface CTAButtonProps {
  message: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  trackingEvent?: TrackEventName;
  className?: string;
  megas?: number;
}

const variantClasses: Record<NonNullable<CTAButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-sky-400 to-brand-primary text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-400/50 hover:brightness-110",
  secondary:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur",
  outline:
    "bg-transparent border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-950",
};

const sizeClasses: Record<NonNullable<CTAButtonProps["size"]>, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function CTAButton({
  message,
  children,
  variant = "primary",
  size = "md",
  icon,
  trackingEvent = "whatsapp_click",
  className,
}: CTAButtonProps) {
  const { city, openModal } = useCity();
  const href = city ? generateWhatsAppLink(city.whatsappNumber, message) : "#";

  return (
    <a
      href={href}
      target={city ? "_blank" : undefined}
      rel={city ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (!city) {
          e.preventDefault();
          openModal();
          return;
        }
        trackEvent(trackingEvent, { source: "website" });
      }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-95",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {children}
    </a>
  );
}
