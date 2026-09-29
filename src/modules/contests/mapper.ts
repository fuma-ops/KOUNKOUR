import { daysUntil, todayLocalISO } from "@/lib/local-date";
import type { ContestRow, ContestView, DisplayStatus } from "./types";

// Une administration jointe (sous-ensemble des colonnes nécessaires à l'affichage).
export interface JoinedAdministration {
  name_fr: string;
  name_ar: string | null;
}

export type ContestRowWithAdmin = ContestRow & {
  administrations: JoinedAdministration | null;
};

// Champ bilingue : on retombe sur la langue disponible plutôt que d'afficher un
// vide (cahier §3 : fallback explicite). L'original sert de dernier recours.
function bilingual(fr: string | null, ar: string | null, fallback?: string | null) {
  const f = fr ?? ar ?? fallback ?? "";
  const a = ar ?? fr ?? fallback ?? "";
  return { fr: f, ar: a };
}

function optionalBilingual(fr: string | null, ar: string | null) {
  if (!fr && !ar) return null;
  return bilingual(fr, ar);
}

// Statut d'affichage (ouvert / prochainement / clôturé) dérivé du statut
// éditorial + des dates. Distinct du statut éditorial stocké en base.
export function toDisplayStatus(row: ContestRow): DisplayStatus {
  if (row.status === "cloture" || row.status === "annule" || row.status === "resultats_publies") {
    return "closed";
  }
  const today = todayLocalISO();
  if (row.opening_date && row.opening_date > today) return "upcoming";
  if (row.deadline_date && daysUntil(row.deadline_date) < 0) return "closed";
  return "open";
}

export function toContestView(row: ContestRowWithAdmin): ContestView {
  return {
    slug: row.slug,
    administration: bilingual(
      row.administrations?.name_fr ?? null,
      row.administrations?.name_ar ?? null,
      "—"
    ),
    title: bilingual(row.title_fr, row.title_ar, row.title_original),
    diploma: optionalBilingual(row.diploma_fr, row.diploma_ar),
    positions: row.positions,
    region: optionalBilingual(row.region_fr, row.region_ar),
    status: toDisplayStatus(row),
    deadlineISO: row.deadline_date,
    openingISO: row.opening_date,
    publishedISO: row.published_at,
    verifiedISO: row.verified_at,
    summary: optionalBilingual(row.summary_fr, row.summary_ar),
    sourceUrl: row.source_url,
    sourceOrg: row.source_org,
    applyUrl: row.apply_url,
    reference: row.reference,
  };
}
