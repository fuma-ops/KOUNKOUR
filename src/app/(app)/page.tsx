"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SectionHeading } from "@/components/ui/states";
import { DemoBadge } from "@/components/ui/badge";
import { ContestCard } from "@/modules/contests/contest-card";
import { demoContests } from "@/modules/contests/demo-data";
import { daysUntil } from "@/lib/local-date";

export default function Home() {
  const { t } = useLanguage();

  const headingParts = t.home.heading.split(t.home.headingHighlight);

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

      <section className="relative h-[420px] overflow-hidden rounded-[var(--radius-lg)] sm:h-auto sm:aspect-[1672/941]">
        {/* Mobile : cadrage portrait dédié, recadré sur une hauteur d'écran raisonnable */}
        <Image
          src="/images/hero-home-base.png"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 0px, 100vw"
          className="object-cover object-[65%_100%] sm:hidden"
        />
        {/* Desktop/tablette : cadrage large fourni par le propriétaire (référence) */}
        <Image
          src="/images/hero-home-branded.png"
          alt=""
          fill
          priority
          sizes="(min-width: 640px) 100vw, 0px"
          className="hidden object-cover sm:block"
        />
        <div className="relative flex h-full flex-col justify-end px-5 py-8 text-center [text-shadow:0_1px_16px_rgba(255,253,254,0.75)] sm:justify-center sm:px-10 sm:py-14 sm:text-start">
          <p className="mx-auto text-2xl font-extrabold tracking-tight sm:mx-0 sm:text-4xl">
            <span className="text-[var(--color-primary)]">Koun</span>
            <span className="text-[var(--color-accent)]">Kour</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold leading-tight text-[var(--color-text)] sm:max-w-md sm:text-4xl">
            {headingParts.map((part, i) => (
              <span key={i}>
                {part}
                {i < headingParts.length - 1 && (
                  <span className="text-[var(--color-accent)]">{t.home.headingHighlight}</span>
                )}
              </span>
            ))}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-text-muted)] sm:mx-0 sm:max-w-sm">
            {t.home.subheading}
          </p>

          <form
            role="search"
            className="mx-auto mt-5 flex w-full max-w-lg items-center gap-2 rounded-full bg-[var(--color-surface)] py-2 ps-5 pe-2 shadow-lg sm:mx-0"
          >
            <svg aria-hidden viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
              <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <label htmlFor="home-search" className="sr-only">
              {t.home.searchPlaceholder}
            </label>
            <input
              id="home-search"
              type="search"
              placeholder={t.home.searchPlaceholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label={t.home.searchPlaceholder}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white transition-colors hover:bg-[var(--color-primary-hover)]"
            >
              <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-4 w-4 rtl:-scale-x-100">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>

          <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2 sm:mx-0 sm:justify-start">
            {t.home.categories.map((category) => (
              <Link
                key={category}
                href="/concours"
                className="min-h-9 rounded-full bg-[var(--color-surface)]/90 px-3.5 py-1.5 text-xs font-medium text-[var(--color-text)] shadow-sm transition-colors hover:bg-[var(--color-surface)]"
              >
                {category}
              </Link>
            ))}
          </div>
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
