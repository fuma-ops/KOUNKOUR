import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/database.types";
import type { MatchProfile } from "./rules";

export type PreferencesRow = Database["public"]["Tables"]["smart_match_preferences"]["Row"];

export async function getMyPreferences(): Promise<PreferencesRow | null> {
  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("smart_match_preferences")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();
  return data;
}

// Profil de correspondance dérivé des préférences (null si pas de préférences
// ou consentement retiré). Utilisé par le moteur de règles.
export function toMatchProfile(prefs: PreferencesRow | null): MatchProfile | null {
  if (!prefs || !prefs.match_consent) return null;
  const hasAny =
    prefs.diploma_level !== null || prefs.specialty || prefs.region || prefs.domain;
  if (!hasAny) return null;
  return {
    diplomaLevel: prefs.diploma_level,
    specialty: prefs.specialty,
    region: prefs.region,
    domain: prefs.domain,
  };
}
