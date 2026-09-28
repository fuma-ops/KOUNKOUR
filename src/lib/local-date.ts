// Dates locales — jamais un UTC brut pour "aujourd'hui" (cahier des charges,
// contrat de données : voir CLAUDE.md règle 8).

export function addDaysISO(dateISO: string, days: number): string {
  const date = new Date(dateISO + "T00:00:00");
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function todayLocalISO(): string {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

export function daysUntil(dateISO: string): number {
  const today = new Date(todayLocalISO() + "T00:00:00");
  const target = new Date(dateISO + "T00:00:00");
  const diffMs = target.getTime() - today.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function formatDateLong(dateISO: string, lang: "fr" | "ar"): string {
  const date = new Date(dateISO + "T00:00:00");
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-MA" : "fr-MA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
