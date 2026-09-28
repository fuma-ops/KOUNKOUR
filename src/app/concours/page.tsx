"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SearchField } from "@/components/ui/search-field";
import { DemoBadge } from "@/components/ui/badge";
import { CardSkeleton, EmptyState, ErrorState } from "@/components/ui/states";
import { ContestCard } from "@/modules/contests/contest-card";
import { demoContests, type ContestStatusKey } from "@/modules/contests/demo-data";

type StatusFilter = "all" | ContestStatusKey;
type PreviewState = "normal" | "loading" | "empty" | "error";

export default function ContestsPage() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [preview, setPreview] = useState<PreviewState>("normal");

  const counts = useMemo(
    () => ({
      all: demoContests.length,
      open: demoContests.filter((c) => c.status === "open").length,
      upcoming: demoContests.filter((c) => c.status === "upcoming").length,
      closed: demoContests.filter((c) => c.status === "closed").length,
    }),
    []
  );

  const filtered =
    statusFilter === "all" ? demoContests : demoContests.filter((c) => c.status === statusFilter);

  const filters: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all", label: t.contests.status.all, count: counts.all },
    { key: "open", label: t.contests.status.open, count: counts.open },
    { key: "upcoming", label: t.contests.status.upcoming, count: counts.upcoming },
    { key: "closed", label: t.contests.status.closed, count: counts.closed },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">{t.contests.title}</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{t.contests.subtitle}</p>
        </div>
        <DemoBadge label={t.common.demoBadge} />
      </div>

      <div className="mt-4">
        <SearchField placeholder={t.home.searchPlaceholder} aria-label={t.home.searchPlaceholder} />
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setStatusFilter(f.key)}
            className={`min-h-9 shrink-0 rounded-full border px-3 text-sm font-medium transition-colors ${
              statusFilter === f.key
                ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)]"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </div>

      {/* Aide de revue Phase 1 : bascule manuelle des états normal/chargement/vide/erreur
          demandés par l'annexe §8. Ce contrôle n'existe pas en dehors de ce squelette
          de validation visuelle. */}
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-xs">
        <span className="font-medium text-[var(--color-text-muted)]">{t.contests.stateSwitcherLabel} :</span>
        {(Object.keys(t.contests.states) as PreviewState[]).map((key) => (
          <button
            key={key}
            onClick={() => setPreview(key)}
            className={`min-h-7 rounded-full px-2.5 ${
              preview === key ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-text-muted)]"
            }`}
          >
            {t.contests.states[key]}
          </button>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {preview === "loading" &&
          Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}

        {preview === "error" && (
          <div className="sm:col-span-2">
            <ErrorState
              title={t.contests.errorTitle}
              description={t.contests.errorDesc}
              retryLabel={t.contests.retry}
              onRetry={() => setPreview("normal")}
            />
          </div>
        )}

        {preview === "empty" && (
          <div className="sm:col-span-2">
            <EmptyState
              title={t.contests.emptyTitle}
              description={t.contests.emptyDesc}
              actionLabel={t.contests.emptyAction}
              onAction={() => setStatusFilter("all")}
            />
          </div>
        )}

        {preview === "normal" &&
          (filtered.length > 0 ? (
            filtered.map((contest) => <ContestCard key={contest.slug} contest={contest} />)
          ) : (
            <div className="sm:col-span-2">
              <EmptyState
                title={t.contests.emptyTitle}
                description={t.contests.emptyDesc}
                actionLabel={t.contests.emptyAction}
                onAction={() => setStatusFilter("all")}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
