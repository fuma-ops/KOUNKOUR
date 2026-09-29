"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SearchField } from "@/components/ui/search-field";
import { EmptyState } from "@/components/ui/states";
import { ContestCard } from "./contest-card";
import type { ContestView, DisplayStatus } from "./types";

type StatusFilter = "all" | DisplayStatus;

// Recherche plein texte simple et déterministe (cahier §6) : titre,
// administration, diplôme, région, dans la langue courante et l'autre.
function matchesQuery(c: ContestView, q: string): boolean {
  if (!q) return true;
  const haystack = [
    c.title.fr,
    c.title.ar,
    c.administration.fr,
    c.administration.ar,
    c.diploma?.fr,
    c.diploma?.ar,
    c.region?.fr,
    c.region?.ar,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q.toLowerCase());
}

export function ContestsBrowser({ contests }: { contests: ContestView[] }) {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(
    () => ({
      all: contests.length,
      open: contests.filter((c) => c.status === "open").length,
      upcoming: contests.filter((c) => c.status === "upcoming").length,
      closed: contests.filter((c) => c.status === "closed").length,
    }),
    [contests]
  );

  const filtered = useMemo(
    () =>
      contests
        .filter((c) => (statusFilter === "all" ? true : c.status === statusFilter))
        .filter((c) => matchesQuery(c, query)),
    [contests, statusFilter, query]
  );

  const filters: { key: StatusFilter; label: string; count: number }[] = [
    { key: "all", label: t.contests.status.all, count: counts.all },
    { key: "open", label: t.contests.status.open, count: counts.open },
    { key: "upcoming", label: t.contests.status.upcoming, count: counts.upcoming },
    { key: "closed", label: t.contests.status.closed, count: counts.closed },
  ];

  return (
    <>
      <div className="mt-4">
        <SearchField
          placeholder={t.home.searchPlaceholder}
          aria-label={t.home.searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {filtered.length > 0 ? (
          filtered.map((contest) => <ContestCard key={contest.slug} contest={contest} />)
        ) : (
          <div className="sm:col-span-2">
            <EmptyState
              title={t.contests.emptyTitle}
              description={t.contests.emptyDesc}
              actionLabel={t.contests.emptyAction}
              onAction={() => {
                setStatusFilter("all");
                setQuery("");
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
