import { promises as fs } from "fs";
import path from "path";

export interface LeadRecord {
  date: string; // YYYY-MM-DD
  cityId: string;
  cityName: string;
  megas: number;
  count: number;
}

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

async function readLeads(): Promise<LeadRecord[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as LeadRecord[];
  } catch {
    return [];
  }
}

async function writeLeads(records: LeadRecord[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf-8");
}

export async function incrementLead(cityId: string, cityName: string, megas: number): Promise<void> {
  const records = await readLeads();
  const date = todayKey();
  const existing = records.find(
    (r) => r.date === date && r.cityId === cityId && r.megas === megas
  );

  if (existing) {
    existing.count += 1;
  } else {
    records.push({ date, cityId, cityName, megas, count: 1 });
  }

  await writeLeads(records);
}

export async function getLeads(): Promise<{ today: string; records: LeadRecord[] }> {
  const records = await readLeads();
  return { today: todayKey(), records };
}
