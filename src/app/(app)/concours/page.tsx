import { listPublicContestViews } from "@/modules/contests/queries";
import { ContestsBrowser } from "@/modules/contests/contests-browser";
import { ContestsHeader } from "@/modules/contests/contests-header";

// Contenu essentiel rendu côté serveur pour le SEO (cahier §15) ; les filtres
// et la recherche sont gérés par le composant client ContestsBrowser.
export default async function ContestsPage() {
  const contests = await listPublicContestViews();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <ContestsHeader />
      <ContestsBrowser contests={contests} />
    </div>
  );
}
