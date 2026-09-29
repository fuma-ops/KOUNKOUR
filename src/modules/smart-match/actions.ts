"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type PreferencesState = { error: string | null; saved?: boolean };

function parseLevel(raw: FormDataEntryValue | null): number | null {
  if (typeof raw !== "string" || raw === "") return null;
  const n = Number(raw);
  return Number.isInteger(n) && n >= 0 && n <= 8 ? n : null;
}

function str(raw: FormDataEntryValue | null): string | null {
  const s = typeof raw === "string" ? raw.trim() : "";
  return s === "" ? null : s;
}

export async function savePreferences(
  _prev: PreferencesState,
  formData: FormData
): Promise<PreferencesState> {
  const supabase = await createClient();
  if (!supabase) return { error: "Service indisponible." };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/connexion");

  const payload = {
    user_id: user.id,
    diploma_level: parseLevel(formData.get("diploma_level")),
    specialty: str(formData.get("specialty")),
    region: str(formData.get("region")),
    domain: str(formData.get("domain")),
    match_consent: formData.get("match_consent") === "on",
  };

  const { error } = await supabase.from("smart_match_preferences").upsert(payload);
  if (error) return { error: error.message };

  revalidatePath("/profil/smart-match");
  return { error: null, saved: true };
}

// Suppression du profil de correspondance (cahier §14 : profil effaçable).
export async function deletePreferences(): Promise<void> {
  const supabase = await createClient();
  if (!supabase) return;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("smart_match_preferences").delete().eq("user_id", user.id);
  revalidatePath("/profil/smart-match");
}
