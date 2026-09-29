import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./database.types";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

// La config Supabase a toujours une valeur (env ou repli public) ; on garde ce
// helper pour compatibilité avec le code appelant, désormais toujours vrai.
export function hasSupabaseEnv(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

// Client Supabase côté serveur (Server Components / Server Actions).
// Retourne null uniquement en cas de config vide (ne devrait plus arriver).
// Les échecs de setAll en Server Component sont attendus (cookies en lecture
// seule) : le middleware se charge du rafraîchissement de session.
export async function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
