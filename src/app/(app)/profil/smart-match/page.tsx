import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMyPreferences } from "@/modules/smart-match/preferences";
import { PreferencesForm } from "@/modules/smart-match/preferences-form";

export default async function SmartMatchProfilePage() {
  const supabase = await createClient();
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) redirect("/auth/connexion");
  }

  const prefs = await getMyPreferences();
  return <PreferencesForm prefs={prefs} />;
}
