import Link from "next/link";
import { listAllContestsForStaff } from "@/modules/contests/queries";
import { CONTEST_STATUS_LABELS_FR, isPubliclyVisible } from "@/modules/contests/types";

export default async function AdminContestsPage() {
  const contests = await listAllContestsForStaff();

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">Concours</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            {contests.length} concours · publication manuelle
          </p>
        </div>
        <Link
          href="/admin/concours/nouveau"
          className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)]"
        >
          Nouveau concours
        </Link>
      </div>

      {contests.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
          <p className="text-sm text-[var(--color-text-muted)]">
            Aucun concours pour l'instant. Créez-en un — pensez à l'étiqueter DEMO tant que ce sont
            des données de test.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {contests.map((c) => (
            <li key={c.id}>
              <Link
                href={`/admin/concours/${c.id}`}
                className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-sm"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-[var(--color-text)]">
                    {c.title_fr || c.title_original}
                  </p>
                  <p className="truncate text-xs text-[var(--color-text-muted)]">{c.slug}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    isPubliclyVisible(c.status)
                      ? "bg-[var(--color-success-bg)] text-[var(--color-success)]"
                      : "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]"
                  }`}
                >
                  {CONTEST_STATUS_LABELS_FR[c.status]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
