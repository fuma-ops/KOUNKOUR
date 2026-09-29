import { createClient } from "@/lib/supabase/server";
import { ProfileView } from "@/modules/profiles/profile-view";

export default async function ProfilePage() {
  const supabase = await createClient();
  // Env Supabase absent (déploiement pas encore configuré) : état invité.
  if (!supabase) {
    return <ProfileView session={null} />;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <ProfileView session={null} />;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", user.id)
    .single();

  return (
    <ProfileView session={{ email: user.email ?? "", displayName: profile?.display_name ?? null }} />
  );
}
