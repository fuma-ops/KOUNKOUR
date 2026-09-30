"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canEditContests } from "@/modules/contests/queries";

// Actions Radar (cahier §13.2/§13.4). Principe non négociable : la validation
// humaine PROMEUT un candidat vers un concours en statut « à vérifier »
// (jamais publié directement). L'éditeur finalise et publie ensuite via le
// back-office concours existant. Aucune donnée n'est inventée à la promotion :
// les champs absents restent vides et les critères extraits sont marqués
// « à vérifier ».

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// Contrôle de rôle côté serveur avant toute écriture (cahier §12/§19). La
// promotion crée des concours → rôle éditeur/administrateur requis.
async function requireEditor() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Configuration serveur manquante (Supabase).");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/connexion");

  const { data } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();
  if (!canEditContests(data?.role ?? null)) {
    throw new Error("Accès refusé : rôle éditeur ou administrateur requis.");
  }
  return { supabase, user };
}

// Retrouve (par nom) ou crée l'administration liée. Renvoie null si le candidat
// n'a pas de nom d'administration extrait (on ne devine rien).
async function findOrCreateAdministration(
  supabase: NonNullable<Awaited<ReturnType<typeof createClient>>>,
  nameFr: string | null,
  officialSite: string | null,
  category: string | null
): Promise<string | null> {
  if (!nameFr) return null;

  const { data: existing } = await supabase
    .from("administrations")
    .select("id")
    .eq("name_fr", nameFr)
    .maybeSingle();
  if (existing) return existing.id;

  const slug = `${slugify(nameFr)}-${Date.now().toString(36)}`;
  const { data: created, error } = await supabase
    .from("administrations")
    .insert({
      slug,
      name_fr: nameFr,
      official_site: officialSite,
      category,
    })
    .select("id")
    .single();
  if (error) throw error;
  return created.id;
}

// Valide un candidat → crée un concours « à vérifier » et lie le candidat.
export async function validateCandidate(id: string): Promise<void> {
  const { supabase, user } = await requireEditor();

  const { data: candidate, error: fetchError } = await supabase
    .from("radar_candidates")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (fetchError) throw fetchError;
  if (!candidate) throw new Error("Candidat introuvable.");
  if (candidate.status !== "pending_review") {
    throw new Error("Ce candidat a déjà été traité.");
  }

  const administrationId = await findOrCreateAdministration(
    supabase,
    candidate.administration_name,
    candidate.administration_site,
    candidate.administration_category
  );

  const slug = `${slugify(candidate.title_original)}-${Date.now().toString(36)}`;

  // Statut 'a_verifier' : NON visible du public (RLS), l'éditeur finalise avant
  // publication. reference laissée vide (jamais le code fabriqué de la source).
  const { data: contest, error: insertError } = await supabase
    .from("contests")
    .insert({
      slug,
      administration_id: administrationId,
      title_original: candidate.title_original,
      title_fr: candidate.title_original,
      title_ar: candidate.title_ar,
      reference: null,
      status: "a_verifier",
      diploma_fr: candidate.degree_level,
      positions: candidate.positions,
      region_fr: candidate.region,
      deadline_date: candidate.deadline_date,
      source_url: candidate.source_url,
      source_org: candidate.administration_name,
      created_by: user.id,
    })
    .select("id")
    .single();
  if (insertError) throw insertError;

  // Critère structuré « spécialité » avec provenance et état « à vérifier »
  // (cahier §13.4) — l'humain confirmera lors de la finalisation.
  if (candidate.specialty) {
    const { error: critError } = await supabase.from("contest_criteria").insert({
      contest_id: contest.id,
      criterion_type: "specialite",
      value_fr: candidate.specialty,
      source_excerpt: candidate.title_original,
      source_page: candidate.source_url,
      verification_state: "a_verifier",
      position: 0,
    });
    if (critError) throw critError;
  }

  const { error: updateError } = await supabase
    .from("radar_candidates")
    .update({
      status: "imported",
      imported_contest_id: contest.id,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (updateError) throw updateError;

  revalidatePath("/admin/radar");
  revalidatePath("/admin/concours");
  // On envoie l'éditeur finaliser/publier le concours créé.
  redirect(`/admin/concours/${contest.id}`);
}

// Écarte un candidat (doublon, hors périmètre, résultat/annulation…).
export async function ignoreCandidate(
  id: string,
  notes?: string
): Promise<void> {
  const { supabase, user } = await requireEditor();

  const { error } = await supabase
    .from("radar_candidates")
    .update({
      status: "ignored",
      review_notes: notes?.trim() || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("status", "pending_review");
  if (error) throw error;

  revalidatePath("/admin/radar");
}

// Remet un candidat écarté dans la file (annule un « ignoré »).
export async function reopenCandidate(id: string): Promise<void> {
  const { supabase } = await requireEditor();

  const { error } = await supabase
    .from("radar_candidates")
    .update({
      status: "pending_review",
      review_notes: null,
      reviewed_by: null,
      reviewed_at: null,
    })
    .eq("id", id)
    .eq("status", "ignored");
  if (error) throw error;

  revalidatePath("/admin/radar");
}
