import { incrementLead, getLeads } from "@/lib/leads";
import { getTokenFromRequest, isValidAdminToken, unauthorizedResponse } from "@/lib/adminAuth";

export async function GET(request: Request) {
  if (!isValidAdminToken(getTokenFromRequest(request) ?? "")) {
    return unauthorizedResponse();
  }
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
