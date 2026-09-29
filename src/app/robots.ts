import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/supabase/config";

// robots.txt : autorise les pages publiques utiles, exclut les zones privées
// (cahier §15). Ne pas compter dessus pour protéger des données — c'est la RLS
// et les gardes serveur qui protègent /admin et le contenu privé.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/auth", "/profil", "/notifications"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
