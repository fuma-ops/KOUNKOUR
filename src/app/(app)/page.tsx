"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { SectionHeading } from "@/components/ui/states";
import { DemoBadge } from "@/components/ui/badge";
import { ContestCard } from "@/modules/contests/contest-card";
import { demoContests } from "@/modules/contests/demo-data";
import { daysUntil } from "@/lib/local-date";

// Icônes décoratives des catégories du hero (annexe §3 — pastilles avec icône).
// Rendu direct, sans passer par un composant réutilisable : usage unique à
// cet écran, pas de raison d'en faire une abstraction partagée.
const categoryIconPaths = [
  "M4 21V7l8-4 8 4v14M9 21v-11h6v11M4 21h16", // Administration
  "M2 8l10-5 10 5-10 5-10-5Zm4 3v5c0 1.5 3 3 6 3s6-1.5 6-3v-5", // Éducation
  "M12 20s-7-4.35-9.5-8.5C.8 8.2 2.4 5 5.6 5c1.7 0 3.1.9 3.9 2.2C10.3 5.9 11.7 5 13.4 5c3.2 0 4.8 3.2 3.1 6.5C14 15.65 12 20 12 20Z", // Santé
  "M3 7h18v10H3V7Zm9 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM5 9v.01M19 15v.01", // Finances
  "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z", // Sécurité
  "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6M14.5 14.5c2.6.4 4.5 2.3 4.5 4.5", // Collectivités
  "M5 12h.01M12 12h.01M19 12h.01", // Autres
];

export default function Home() {
  const { t } = useLanguage();

  const headingParts = t.home.heading.split(t.home.headingHighlight);

  const recent = demoContests.slice(0, 2);
  const deadlinesNear = [...demoContests]
    .filter((c) => c.status !== "closed")
    .sort((a, b) => daysUntil(a.deadlineISO) - daysUntil(b.deadlineISO))
    .slice(0, 2);

  return (
    <>
      {/* Hero plein cadre, sans marge ni coin arrondi à aucune taille d'écran :
          l'en-tête (fixed + transparent sur cette page, voir Header) flotte
          par-dessus au lieu de réserver sa bande blanche, et un dégradé en
          bas fond l'image dans le fond de page pour un rendu continu. */}
      <section className="relative h-[620px] w-full overflow-hidden sm:h-auto sm:aspect-[1672/941]">
        {/* Mobile : cadrage portrait dédié */}
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

        {/* Fondu progressif vers le fond de page en bas du hero */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[var(--color-background)] sm:h-40" />

        <div className="absolute end-4 top-16 z-10 rounded-full bg-[var(--color-surface)]/90 p-0.5 shadow-sm sm:end-6 sm:top-20">
          <DemoBadge label={t.common.demoBadge} />
        </div>

        <div className="relative flex h-full flex-col justify-end px-5 pb-8 pt-24 text-center [text-shadow:0_1px_16px_rgba(255,253,254,0.75)] sm:justify-center sm:px-10 sm:py-14 sm:text-start">
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

          {/* Mobile : grille 3 colonnes avec icône, comme la maquette. Desktop : ligne unique. */}
          <div className="mx-auto mt-4 grid w-full max-w-sm grid-cols-3 gap-2 sm:mx-0 sm:flex sm:max-w-lg sm:flex-wrap sm:justify-start">
            {t.home.categories.map((category, i) => (
              <Link
                key={category}
                href="/concours"
                className="flex min-h-9 items-center justify-center gap-1 rounded-full bg-[var(--color-surface)]/90 px-2 py-1.5 text-[11px] font-medium text-[var(--color-text)] shadow-sm transition-colors hover:bg-[var(--color-surface)] sm:justify-start sm:gap-1.5 sm:px-3.5 sm:text-xs"
              >
                <svg aria-hidden viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]">
                  <path d={categoryIconPaths[i]} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="leading-tight">{category}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-8">
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
    </>
  );
}
