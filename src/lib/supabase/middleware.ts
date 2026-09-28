import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Rafraîchit la session Supabase à chaque requête (nécessaire avec le
// pattern App Router : les Server Components ne peuvent pas écrire de
// cookies eux-mêmes).
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Variables d'environnement absentes (ex. déploiement pas encore
  // configuré) : ne jamais planter le middleware — les pages publiques
  // (concours, préparation, communauté) fonctionnent sans session, et le
  // Profil affiche déjà correctement l'état invité.
  if (!url || !anonKey) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Ne pas retirer : rafraîchit le token si nécessaire.
  await supabase.auth.getUser();

  return response;
}
