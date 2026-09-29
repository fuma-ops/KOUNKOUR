"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { MatchResult, MatchStatus } from "./rules";

const dotColor: Record<MatchStatus, string> = {
  match: "var(--color-success)",
  verify: "var(--color-warning)",
  nomatch: "var(--color-text-muted)",
};

// Panneau "Ma correspondance" (cahier §14) : 3 groupes explicables + mention
// légale obligatoire. Aucun verdict global d'admissibilité.
export function MatchPanel({ result }: { result: MatchResult | null }) {
  const { t } = useLanguage();

  if (!result) {
    return (
      <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <h2 className="font-semibold text-[var(--color-text)]">{t.smartMatch.panelTitle}</h2>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t.smartMatch.noProfile}</p>
        <Link
          href="/profil/smart-match"
          className="mt-3 inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-4 text-sm font-medium text-white"
        >
          {t.smartMatch.editProfile}
        </Link>
      </section>
    );
  }

  const groups: { key: MatchStatus; label: string }[] = [
    { key: "match", label: t.smartMatch.groupMatch },
    { key: "verify", label: t.smartMatch.groupVerify },
    { key: "nomatch", label: t.smartMatch.groupNoMatch },
  ];

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <h2 className="font-semibold text-[var(--color-text)]">{t.smartMatch.panelTitle}</h2>

      <div className="mt-3 space-y-4">
        {groups.map((g) => {
          const items = result.criteria.filter((c) => c.status === g.key);
          if (items.length === 0) return null;
          return (
            <div key={g.key}>
              <p className="flex items-center gap-2 text-sm font-medium text-[var(--color-text)]">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full"
                  style={{ background: dotColor[g.key] }}
                />
                {g.label}
              </p>
              <ul className="mt-1 space-y-1 ps-4">
                {items.map((c) => (
                  <li key={c.key} className="text-sm text-[var(--color-text-muted)]">
                    <span className="font-medium text-[var(--color-text)]">{c.label} : </span>
                    {c.detail}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Mention légale obligatoire (cahier §14) */}
      <p className="mt-4 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] px-3 py-2 text-xs text-[var(--color-text-muted)]">
        {t.smartMatch.disclaimer}
      </p>
    </section>
  );
}
