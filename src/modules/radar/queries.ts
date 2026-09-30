import { createClient } from "@/lib/supabase/server";
import {
  toRadarCandidateView,
  type RadarCandidateView,
  type RadarCandidateStatus,
  type RadarSourceRow,
  type RadarStats,
} from "./types";

// Lectures Radar — file de validation interne (cahier §13). Toutes les tables
// Radar sont protégées par RLS staff : ces fonctions ne renvoient rien pour un
// visiteur ou un utilisateur non-staff (défense en profondeur côté base).

export async function listCandidates(
  status: RadarCandidateStatus = "pending_review"
): Promise<RadarCandidateView[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("radar_candidates")
    .select("*")
    .eq("status", status)
    // Échéance la plus proche d'abord ; les sans-date (à vérifier) en dernier.
    .order("deadline_date", { ascending: true, nullsFirst: false })
    .order("scraped_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toRadarCandidateView);
}

export async function getCandidateById(
  id: string
): Promise<RadarCandidateView | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("radar_candidates")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? toRadarCandidateView(data) : null;
}

export async function getRadarStats(): Promise<RadarStats> {
  const supabase = await createClient();
  if (!supabase) return { pending: 0, imported: 0, ignored: 0 };
  const { data, error } = await supabase
    .from("radar_candidates")
    .select("status");
  if (error) throw error;
  const stats: RadarStats = { pending: 0, imported: 0, ignored: 0 };
  for (const row of data ?? []) {
    if (row.status === "pending_review") stats.pending++;
    else if (row.status === "imported") stats.imported++;
    else if (row.status === "ignored") stats.ignored++;
  }
  return stats;
}

export async function listSources(): Promise<RadarSourceRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("radar_sources")
    .select("*")
    .order("name_fr", { ascending: true });
  if (error) throw error;
  return data ?? [];
}
