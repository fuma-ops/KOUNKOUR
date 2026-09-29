"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookmarkResult = { bookmarked: boolean; needsAuth?: boolean };

// Bascule le favori du concours (slug) pour l'utilisateur courant.
// RLS garantit qu'un utilisateur ne gère que ses propres favoris.
export async function toggleBookmark(slug: string): Promise<BookmarkResult> {
  const supabase = await createClient();
  if (!supabase) return { bookmarked: false, needsAuth: true };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { bookmarked: false, needsAuth: true };

  const { data: contest } = await supabase.from("contests").select("id").eq("slug", slug).maybeSingle();
  if (!contest) return { bookmarked: false };

  const { data: existing } = await supabase
    .from("contest_bookmarks")
    .select("contest_id")
    .eq("user_id", user.id)
    .eq("contest_id", contest.id)
    .maybeSingle();

  if (existing) {
    await supabase.from("contest_bookmarks").delete().eq("user_id", user.id).eq("contest_id", contest.id);
    revalidatePath(`/concours/${slug}`);
    return { bookmarked: false };
  }

  await supabase.from("contest_bookmarks").insert({ user_id: user.id, contest_id: contest.id });
  revalidatePath(`/concours/${slug}`);
  return { bookmarked: true };
}
