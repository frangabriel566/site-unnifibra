import { createHmac } from "crypto";

export const ADMIN_COOKIE_NAME = "unnifibra_admin_session";
export const ADMIN_COOKIE_MAX_AGE = 60 * 60 * 24; // 24h

function deriveToken(): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  const payload = process.env.ADMIN_EMAIL ?? "";
  if (!secret || !payload) return "";
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function getAdminCookieValue(): string {
  return deriveToken();
}

export function isValidAdminToken(token: string): boolean {
  const expected = deriveToken();
  return expected.length > 0 && token === expected;
}

export function getTokenFromRequest(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const re = new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`);
  return cookieHeader.match(re)?.[1];
}

export function unauthorizedResponse(): Response {
  return new Response(JSON.stringify({ error: "Não autorizado." }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}
