import { siteConfig as defaultConfig } from "@/config/siteConfig";
import { SiteConfig } from "@/types";
import { getSupabaseAdmin } from "./supabaseAdmin";

const TABLE = "app_config";
const ROW_ID = "main";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function deepMerge<T>(base: T, overrides: unknown): T {
  if (!isPlainObject(overrides)) return base;

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const [key, value] of Object.entries(overrides)) {
    const baseValue = result[key];
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(baseValue, value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result as T;
}

export async function getStoredConfigOverrides(): Promise<Record<string, unknown> | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("id", ROW_ID)
    .maybeSingle();

  if (error || !data) return null;
  return data.data as Record<string, unknown>;
}

export async function getMergedSiteConfig(): Promise<SiteConfig> {
  const overrides = await getStoredConfigOverrides();
  if (!overrides) return defaultConfig;
  return deepMerge(defaultConfig, overrides);
}

export async function saveConfigOverrides(config: SiteConfig): Promise<void> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, data: config, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}
