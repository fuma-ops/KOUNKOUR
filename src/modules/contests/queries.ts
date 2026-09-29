import { createClient } from "@/lib/supabase/server";
import type { ContestRow } from "./types";

// Accès aux données concours — toujours via ce module (contrat de données,
// CLAUDE.md). Les lectures publiques sont filtrées par RLS côté serveur ;
// les lectures/écritures staff supposent un rôle éditeur/administrateur
// (vérifié aussi par RLS).

export async function listPublicContests(): Promise<ContestRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getContestBySlug(slug: string): Promise<ContestRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contests").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data;
}

// Back-office : tous les concours quel que soit le statut (RLS staff requis).
export async function listAllContestsForStaff(): Promise<ContestRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getContestByIdForStaff(id: string): Promise<ContestRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("contests").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

// Rôle de l'utilisateur courant (null si non connecté).
export async function getCurrentUserRole(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  return data?.role ?? null;
}

export function isStaffRole(role: string | null): boolean {
  return role === "moderateur" || role === "editeur" || role === "administrateur";
}

export function canEditContests(role: string | null): boolean {
  return role === "editeur" || role === "administrateur";
}
