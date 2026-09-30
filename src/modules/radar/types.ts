import type { Database } from "@/lib/supabase/database.types";

// Types Radar (cahier §13). Accès aux données Radar toujours via ce module
// (contrat de données, CLAUDE.md) — jamais de lecture brute d'une table.

export type RadarCandidateStatus =
  Database["public"]["Enums"]["radar_candidate_status"];
export type RadarCandidateRow =
  Database["public"]["Tables"]["radar_candidates"]["Row"];
export type RadarSourceRow = Database["public"]["Tables"]["radar_sources"]["Row"];
export type RadarRunRow = Database["public"]["Tables"]["radar_runs"]["Row"];

export const RADAR_CANDIDATE_STATUS_LABELS_FR: Record<
  RadarCandidateStatus,
  string
> = {
  pending_review: "À valider",
  imported: "Importé",
  ignored: "Ignoré",
};

// View-model d'un candidat pour l'écran de validation. Découple le composant du
// schéma DB. Un champ absent reste null → l'UI l'affiche « à vérifier », jamais
// une valeur inventée (cahier §0/§7).
export interface RadarCandidateView {
  id: string;
  status: RadarCandidateStatus;
  sourceUrl: string;
  externalId: string | null;
  scrapedISO: string;
  title: string;
  titleAr: string | null;
  administration: string | null;
  administrationSite: string | null;
  category: string | null;
  degree: string | null;
  specialty: string | null;
  region: string | null;
  positions: number | null;
  deadlineText: string | null;
  deadlineISO: string | null;
  publicationText: string | null;
  importedContestId: string | null;
  reviewNotes: string | null;
}

export function toRadarCandidateView(
  row: RadarCandidateRow
): RadarCandidateView {
  return {
    id: row.id,
    status: row.status,
    sourceUrl: row.source_url,
    externalId: row.external_id,
    scrapedISO: row.scraped_at,
    title: row.title_original,
    titleAr: row.title_ar,
    administration: row.administration_name,
    administrationSite: row.administration_site,
    category: row.administration_category,
    degree: row.degree_level,
    specialty: row.specialty,
    region: row.region,
    positions: row.positions,
    deadlineText: row.deadline_text,
    deadlineISO: row.deadline_date,
    publicationText: row.publication_text,
    importedContestId: row.imported_contest_id,
    reviewNotes: row.review_notes,
  };
}

export interface RadarStats {
  pending: number;
  imported: number;
  ignored: number;
}
