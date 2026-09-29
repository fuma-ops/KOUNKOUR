import { createClient } from "@/lib/supabase/server";
import { toContestView } from "./mapper";
import { isPubliclyVisible, type ContestRow, type ContestView } from "./types";

// Accès aux données concours — toujours via ce module (contrat de données,
// CLAUDE.md). Les lectures publiques sont filtrées par RLS côté serveur ;
// les lectures/écritures staff supposent un rôle éditeur/administrateur
// (vérifié aussi par RLS).

const CONTEST_WITH_ADMIN = "*, administrations ( name_fr, name_ar )";

export async function listPublicContestViews(): Promise<ContestView[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("contests")
    .select(CONTEST_WITH_ADMIN)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toContestView);
}

// Slugs des concours publiés (pour le sitemap). lastmod = updated_at (honnête).
export async function listPublishedContestSlugs(): Promise<{ slug: string; updatedAt: string }[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase.from("contests").select("slug, updated_at, status");
  if (error) throw error;
  // Filtre visibilité publique côté app aussi (la RLS le fait déjà côté base).
  return (data ?? [])
    .filter((c) => isPubliclyVisible(c.status))
    .map((c) => ({ slug: c.slug, updatedAt: c.updated_at }));
}

export interface ContestDetail {
  view: ContestView;
  criteria: {
    id: string;
    type: string;
    value: { fr: string; ar: string };
    sourceExcerpt: string | null;
    verification: string;
  }[];
  documents: {
    id: string;
    title: { fr: string; ar: string };
    docType: string;
    url: string;
    format: string | null;
    sizeKb: number | null;
    sourceLabel: string | null;
    publishedISO: string | null;
  }[];
}

export async function getContestDetailBySlug(slug: string): Promise<ContestDetail | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data: row, error } = await supabase
    .from("contests")
    .select(CONTEST_WITH_ADMIN)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!row) return null;

  const [{ data: criteria }, { data: documents }] = await Promise.all([
    supabase
      .from("contest_criteria")
      .select("*")
      .eq("contest_id", row.id)
      .order("position", { ascending: true }),
    supabase
      .from("contest_documents")
      .select("*")
      .eq("contest_id", row.id)
      .order("position", { ascending: true }),
  ]);

  return {
    view: toContestView(row),
    criteria: (criteria ?? []).map((c) => ({
      id: c.id,
      type: c.criterion_type,
      value: { fr: c.value_fr ?? c.value_ar ?? "", ar: c.value_ar ?? c.value_fr ?? "" },
      sourceExcerpt: c.source_excerpt,
      verification: c.verification_state,
    })),
    documents: (documents ?? []).map((d) => ({
      id: d.id,
      title: {
        fr: d.title_fr ?? d.title_ar ?? d.doc_type,
        ar: d.title_ar ?? d.title_fr ?? d.doc_type,
      },
      docType: d.doc_type,
      url: d.url,
      format: d.format,
      sizeKb: d.size_kb,
      sourceLabel: d.source_label,
      publishedISO: d.created_at,
    })),
  };
}

// Back-office : tous les concours quel que soit le statut (RLS staff requis).
export async function listAllContestsForStaff(): Promise<ContestRow[]> {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("contests")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getContestByIdForStaff(id: string): Promise<ContestRow | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data, error } = await supabase.from("contests").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

// Favori : le concours est-il en favori pour l'utilisateur courant ?
export async function isContestBookmarked(slug: string): Promise<boolean> {
  const supabase = await createClient();
  if (!supabase) return false;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: contest } = await supabase.from("contests").select("id").eq("slug", slug).maybeSingle();
  if (!contest) return false;

  const { data } = await supabase
    .from("contest_bookmarks")
    .select("contest_id")
    .eq("user_id", user.id)
    .eq("contest_id", contest.id)
    .maybeSingle();
  return Boolean(data);
}

// Rôle de l'utilisateur courant (null si non connecté ou env absent).
export async function getCurrentUserRole(): Promise<string | null> {
  const supabase = await createClient();
  if (!supabase) return null;
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
