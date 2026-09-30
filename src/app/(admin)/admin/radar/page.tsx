import { listCandidates, getRadarStats, listSources } from "@/modules/radar/queries";
import { validateCandidate, ignoreCandidate } from "@/modules/radar/admin-actions";

// Écran de validation humaine du Radar (cahier §13.2). Rien n'est publié
// automatiquement : chaque candidat est promu manuellement vers un concours
// « à vérifier » que l'éditeur finalise ensuite. Accès staff (RLS + layout).

export const dynamic = "force-dynamic";

function formatDeadline(view: { deadlineISO: string | null; deadlineText: string | null }) {
  if (view.deadlineISO) {
    return new Date(view.deadlineISO).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return view.deadlineText ? `${view.deadlineText} (à vérifier)` : "À vérifier";
}

export default async function AdminRadarPage() {
  const [pending, stats, sources] = await Promise.all([
    listCandidates("pending_review"),
    getRadarStats(),
    listSources(),
  ]);

  const activeSources = sources.filter((s) => s.active).length;

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[var(--color-text)]">Radar · file de validation</h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          {stats.pending} à valider · {stats.imported} importés · {stats.ignored} ignorés
        </p>
      </div>

      {/* Statut de collecte : transparent sur la conformité (cahier §13.1). */}
      <div className="mb-6 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900">
            Collecte automatisée inactive
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">
            {sources.length} source(s) · {activeSources} active(s)
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">
          Les candidats ci-dessous proviennent d&apos;un import de données réelles
          (emploi-public.ma), à titre d&apos;amorçage. La collecte automatique reste
          désactivée tant que la vérification robots.txt / conditions d&apos;utilisation et le
          feu vert juridique ne sont pas donnés. Aucune fiche n&apos;est publiée sans
          validation humaine.
        </p>
      </div>

      {pending.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Aucun candidat en attente. La file est vide.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {pending.map((c) => (
            <li
              key={c.id}
              className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-[var(--color-text)]">{c.title}</p>
                  <p className="mt-0.5 text-xs text-[var(--color-text-muted)]">
                    {c.administration ?? "Administration à vérifier"}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
                    <span>Diplôme : {c.degree ?? "à vérifier"}</span>
                    <span>Postes : {c.positions ?? "à vérifier"}</span>
                    <span>Limite : {formatDeadline(c)}</span>
                  </div>
                  {c.specialty && (
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                      Spécialité : {c.specialty}
                    </p>
                  )}
                  <a
                    href={c.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-[var(--color-primary)] hover:underline"
                  >
                    Source officielle ↗
                  </a>
                </div>

                <div className="flex shrink-0 gap-2">
                  <form action={validateCandidate.bind(null, c.id)}>
                    <button
                      type="submit"
                      className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
                    >
                      Valider
                    </button>
                  </form>
                  <form action={ignoreCandidate.bind(null, c.id, undefined)}>
                    <button
                      type="submit"
                      className="inline-flex min-h-9 items-center rounded-[var(--radius-md)] border border-[var(--color-border)] px-4 text-sm font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-surface-alt)]"
                    >
                      Ignorer
                    </button>
                  </form>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
