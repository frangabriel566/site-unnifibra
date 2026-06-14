"use client";

import { useEffect, useState, ReactNode } from "react";
import { siteConfig } from "@/config/siteConfig";
import { SiteConfig } from "@/types";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function mergeInPlace(target: Record<string, unknown>, source: Record<string, unknown>) {
  for (const [key, value] of Object.entries(source)) {
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(value)) {
      mergeInPlace(targetValue, value);
    } else {
      target[key] = value;
    }
  }
}

export default function SiteConfigProvider({
  config,
  children,
}: {
  config: SiteConfig;
  children: ReactNode;
}) {
  const [version, setVersion] = useState(0);

  useEffect(() => {
    mergeInPlace(siteConfig as unknown as Record<string, unknown>, config as unknown as Record<string, unknown>);
    setVersion((v) => v + 1);
  }, [config]);

  return <div key={version}>{children}</div>;
}
