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

export function isPubliclyVisible(status: ContestStatus): boolean {
  return (
    status === "publie" ||
    status === "mis_a_jour" ||
    status === "cloture" ||
    status === "annule" ||
    status === "resultats_publies"
  );
}
