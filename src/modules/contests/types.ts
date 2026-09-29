import type { Database } from "@/lib/supabase/database.types";

export type ContestStatus = Database["public"]["Enums"]["contest_status"];
export type ContestRow = Database["public"]["Tables"]["contests"]["Row"];
export type ContestInsert = Database["public"]["Tables"]["contests"]["Insert"];
export type AdministrationRow = Database["public"]["Tables"]["administrations"]["Row"];

// Clé d'affichage du statut public (ouvert / bientôt / clôturé), distincte du
// statut éditorial en base. Dérivée du statut éditorial + de la date limite.
export type DisplayStatus = "open" | "upcoming" | "closed";

export const CONTEST_STATUSES: ContestStatus[] = [
  "brouillon",
  "a_verifier",
  "publie",
  "mis_a_jour",
  "cloture",
  "annule",
  "resultats_publies",
  "archive",
];

// Libellés éditeur (back-office) des statuts en base.
export const CONTEST_STATUS_LABELS_FR: Record<ContestStatus, string> = {
  brouillon: "Brouillon",
  a_verifier: "À vérifier",
  publie: "Publié",
  mis_a_jour: "Mis à jour",
  cloture: "Clôturé",
  annule: "Annulé",
  resultats_publies: "Résultats publiés",
  archive: "Archivé",
};

// Forme bilingue consommée par les composants publics (carte, fiche).
export interface Bilingual {
  fr: string;
  ar: string;
}

// View-model d'un concours pour l'affichage public. Découple les composants du
// schéma DB brut (contrat de données) : une seule fonction de mapping produit
// cette forme, les composants n'accèdent jamais aux colonnes directement.
export interface ContestView {
  slug: string;
  administration: Bilingual;
  title: Bilingual;
  diploma: Bilingual | null;
  positions: number | null;
  region: Bilingual | null;
  status: DisplayStatus;
  deadlineISO: string | null;
  openingISO: string | null;
  publishedISO: string | null;
  verifiedISO: string | null;
  summary: Bilingual | null;
  sourceUrl: string;
  sourceOrg: string | null;
  applyUrl: string | null;
  reference: string | null;
}

export function isPubliclyVisible(status: ContestStatus): boolean {
  return (
    status === "publie" ||
    status === "mis_a_jour" ||
    status === "cloture" ||
    status === "annule" ||
    status === "resultats_publies"
  );
}
