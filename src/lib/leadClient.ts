export function recordLead(cityId: string, cityName: string, megas = 0): void {
  fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cityId, cityName, megas }),
    keepalive: true,
  }).catch(() => {});
}
