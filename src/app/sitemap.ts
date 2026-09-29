import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/supabase/config";
import { listPublishedContestSlugs } from "@/modules/contests/queries";

// Sitemap dynamique : pages publiques statiques + fiches concours publiées
// uniquement (cahier §15). lastmod honnête = updated_at du concours.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/concours", "/preparation", "/communaute"];
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.7,
  }));

  let contestEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await listPublishedContestSlugs();
    contestEntries = slugs.map((c) => ({
      url: `${SITE_URL}/concours/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    // En cas d'indisponibilité base, on renvoie au moins les pages statiques.
  }

  return [...staticEntries, ...contestEntries];
}
