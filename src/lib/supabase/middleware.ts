import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "./config";

// Rafraîchit la session Supabase à chaque requête (nécessaire avec le
// pattern App Router : les Server Components ne peuvent pas écrire de
// cookies eux-mêmes).
export async function updateSession(request: NextRequest) {
  // Robustesse confirmation email / OAuth : Supabase peut renvoyer le `?code=`
  // sur la racine (selon le "Site URL" configuré) au lieu de /auth/callback.
  // On rattrape ce cas et on route vers le handler d'échange de code.
  const code = request.nextUrl.searchParams.get("code");
  if (code && request.nextUrl.pathname === "/") {
    const callbackUrl = request.nextUrl.clone();
    callbackUrl.pathname = "/auth/callback";
    return NextResponse.redirect(callbackUrl);
  }

  // Config vide (ne devrait plus arriver) : ne jamais planter le middleware.
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
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
