import { incrementLead, getLeads } from "@/lib/leads";

export async function GET() {
  const data = await getLeads();
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const cityId = body?.cityId;
  const cityName = body?.cityName;
  const megas = Number(body?.megas);

  if (!cityId || !cityName || !Number.isFinite(megas)) {
    return Response.json({ error: "Dados inválidos" }, { status: 400 });
  }

  await incrementLead(cityId, cityName, megas);
  return Response.json({ ok: true });
}
