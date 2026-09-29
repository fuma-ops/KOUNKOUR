"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SectionHeading, CardSkeleton } from "@/components/ui/states";
import { createClient } from "@/lib/supabase/client";
import { daysUntil } from "@/lib/local-date";
import { toContestView, type ContestRowWithAdmin } from "./mapper";
import { ContestCard } from "./contest-card";
import type { ContestView } from "./types";

// Sections "récents" et "échéances proches" de l'accueil, sur vraies données.
// Chargées côté client via le client navigateur Supabase (RLS applique la
// visibilité publique) pour rester dans le hero client existant sans le
// refondre. La page /concours reste la version SSR indexable pour le SEO.
export function HomeContestSections() {
  const { t } = useLanguage();
  const [contests, setContests] = useState<ContestView[] | null>(null);

  useEffect(() => {
    let active = true;
    const supabase = createClient();
    supabase
      .from("contests")
      .select("*, administrations ( name_fr, name_ar )")
      .order("published_at", { ascending: false, nullsFirst: false })
      .then(({ data }) => {
        if (!active) return;
        const views = ((data as ContestRowWithAdmin[] | null) ?? []).map(toContestView);
        setContests(views);
      });
    return () => {
      active = false;
    };
  }, []);

  const recent = contests?.slice(0, 2) ?? [];
  const deadlinesNear =
    contests
      ?.filter((c) => c.status !== "closed" && c.deadlineISO)
      .sort((a, b) => daysUntil(a.deadlineISO!) - daysUntil(b.deadlineISO!))
      .slice(0, 2) ?? [];

  const loading = contests === null;

  return (
    <>
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <SectionHeading>{t.home.recent}</SectionHeading>
          <Link href="/concours" className="text-sm font-medium text-[var(--color-primary)]">
            {t.home.seeAll}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {loading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : recent.length > 0 ? (
            recent.map((contest) => <ContestCard key={contest.slug} contest={contest} />)
          ) : (
            <p className="text-sm text-[var(--color-text-muted)]">{t.contests.emptyTitle}</p>
          )}
        </div>
      </section>

      {(loading || deadlinesNear.length > 0) && (
        <section className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <SectionHeading>{t.home.deadlinesNear}</SectionHeading>
            <Link href="/concours" className="text-sm font-medium text-[var(--color-primary)]">
              {t.home.seeAll}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {loading ? (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            ) : (
              deadlinesNear.map((contest) => <ContestCard key={contest.slug} contest={contest} />)
            )}
          </div>
        </section>
      )}
    </>
  );
}
