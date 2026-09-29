"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { canEditContests } from "./queries";
import type { ContestStatus } from "./types";

export type ContestFormState = { error: string | null };

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

// Vérifie le rôle côté serveur avant toute écriture (cahier §12/§19 : jamais
// une autorisation basée sur le seul contrôle frontend).
async function requireEditor() {
  const supabase = await createClient();
  if (!supabase) throw new Error("Configuration serveur manquante (Supabase).");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/connexion");

  const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id).maybeSingle();
  if (!canEditContests(data?.role ?? null)) {
    throw new Error("Accès refusé : rôle éditeur ou administrateur requis.");
  }
  return { supabase, user };
}

function parseFields(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    const s = typeof v === "string" ? v.trim() : "";
    return s === "" ? null : s;
  };
  const positionsRaw = get("positions");
  return {
    title_original: get("title_original"),
    title_fr: get("title_fr"),
    title_ar: get("title_ar"),
    reference: get("reference"),
    summary_fr: get("summary_fr"),
    summary_ar: get("summary_ar"),
    diploma_fr: get("diploma_fr"),
    diploma_ar: get("diploma_ar"),
    positions: positionsRaw ? Number(positionsRaw) : null,
    region_fr: get("region_fr"),
    region_ar: get("region_ar"),
    deadline_date: get("deadline_date"),
    exam_date: get("exam_date"),
    apply_url: get("apply_url"),
    source_url: get("source_url"),
    source_org: get("source_org"),
    status: (get("status") as ContestStatus | null) ?? "brouillon",
  };
}

export async function createContest(
  _prev: ContestFormState,
  formData: FormData
): Promise<ContestFormState> {
  const { supabase, user } = await requireEditor();
  const f = parseFields(formData);

  const { title_original, source_url } = f;
  if (!title_original) return { error: "Le titre original de l'annonce est requis." };
  if (!source_url) return { error: "L'URL de la source officielle est obligatoire (cahier §7)." };
  if (f.positions !== null && (Number.isNaN(f.positions) || f.positions < 0)) {
    return { error: "Le nombre de postes doit être un entier positif." };
  }

  const slug = `${slugify(title_original)}-${Date.now().toString(36)}`;
  const publishing = f.status === "publie" || f.status === "mis_a_jour";

  const { error } = await supabase.from("contests").insert({
    ...f,
    title_original,
    source_url,
    slug,
    created_by: user.id,
    published_at: publishing ? new Date().toISOString() : null,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/concours");
  redirect("/admin/concours");
}

export async function updateContest(
  id: string,
  _prev: ContestFormState,
  formData: FormData
): Promise<ContestFormState> {
  const { supabase } = await requireEditor();
  const f = parseFields(formData);

  const { title_original, source_url } = f;
  if (!title_original) return { error: "Le titre original de l'annonce est requis." };
  if (!source_url) return { error: "L'URL de la source officielle est obligatoire (cahier §7)." };

  const { data: existing } = await supabase
    .from("contests")
    .select("published_at,status")
    .eq("id", id)
    .maybeSingle();

  const publishing = f.status === "publie" || f.status === "mis_a_jour";
  const published_at =
    publishing && !existing?.published_at ? new Date().toISOString() : (existing?.published_at ?? null);

  const { error } = await supabase
    .from("contests")
    .update({ ...f, title_original, source_url, published_at })
    .eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/concours");
  revalidatePath(`/admin/concours/${id}`);
  redirect("/admin/concours");
}
