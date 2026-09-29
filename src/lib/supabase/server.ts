import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";

// True quand les variables d'environnement Supabase sont présentes. Permet aux
// pages publiques de se rendre proprement (état invité) même si le déploiement
// n'a pas encore ses variables configurées, plutôt que de planter en 500.
export function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

// Client Supabase côté serveur (Server Components / Server Actions).
// Retourne null si les variables d'environnement manquent — l'appelant doit
// alors traiter l'utilisateur comme non connecté. Les échecs de setAll en
// Server Component sont attendus (cookies en lecture seule) : le middleware
// se charge du rafraîchissement de session.
export async function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(url, anonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component : ignoré, le middleware rafraîchit la session.
          }
        },
      },
    }
  );
}
