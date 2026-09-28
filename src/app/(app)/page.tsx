"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SearchField } from "@/components/ui/search-field";
import { SectionHeading } from "@/components/ui/states";
import { DemoBadge } from "@/components/ui/badge";
import { ContestCard } from "@/modules/contests/contest-card";
import { demoContests } from "@/modules/contests/demo-data";
import { daysUntil } from "@/lib/local-date";

export default function Home() {
  const { t } = useLanguage();

  const recent = demoContests.slice(0, 2);
  const deadlinesNear = [...demoContests]
    .filter((c) => c.status !== "closed")
    .sort((a, b) => daysUntil(a.deadlineISO) - daysUntil(b.deadlineISO))
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-2 flex justify-end">
        <DemoBadge label={t.common.demoBadge} />
      </div>

      <section className="rounded-[var(--radius-lg)] bg-[var(--color-surface-alt)] px-5 py-8 text-center sm:px-10">
        <h1 className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl">{t.home.heading}</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--color-text-muted)]">{t.home.subheading}</p>
        <div className="mx-auto mt-5 max-w-lg">
          <SearchField placeholder={t.home.searchPlaceholder} aria-label={t.home.searchPlaceholder} />
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <SectionHeading>{t.home.recent}</SectionHeading>
          <Link href="/concours" className="text-sm font-medium text-[var(--color-primary)]">
            {t.home.seeAll}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {recent.map((contest) => (
            <ContestCard key={contest.slug} contest={contest} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <SectionHeading>{t.home.deadlinesNear}</SectionHeading>
          <Link href="/concours" className="text-sm font-medium text-[var(--color-primary)]">
            {t.home.seeAll}
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {deadlinesNear.map((contest) => (
            <ContestCard key={contest.slug} contest={contest} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <SectionHeading>{t.home.whyTitle}</SectionHeading>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {t.home.why.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
            >
              <p className="font-medium text-[var(--color-text)]">{item.title}</p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
