"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { StatusPill, DemoBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/states";
import { demoContests } from "@/modules/contests/demo-data";
import { daysUntil, formatDateLong } from "@/lib/local-date";

export default function ContestDetailPage() {
  const params = useParams<{ slug: string }>();
  const { lang, t } = useLanguage();
  const [saved, setSaved] = useState(false);

  const contest = demoContests.find((c) => c.slug === params.slug);
  if (!contest) {
    notFound();
  }

  const days = daysUntil(contest.deadlineISO);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-6">
      <div className="mb-3 flex justify-end">
        <DemoBadge label={t.common.demoBadge} />
      </div>

      {/* Bandeau décoratif générique — jamais présenté comme une photo
          officielle spécifique à l'administration (cahier §0). */}
      <div className="h-28 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />

      <div className="-mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              {contest.administration[lang]}
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-[var(--color-text)]">{contest.title[lang]}</h1>
          </div>
          <StatusPill status={contest.status} label={t.contests.status[contest.status]} />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm">
          <span>
            {t.contests.deadline} : <strong>{formatDateLong(contest.deadlineISO, lang)}</strong>
          </span>
          {contest.status !== "closed" && days >= 0 && (
            <span className="font-medium text-[var(--color-warning)]">{t.contests.daysLeft(days)}</span>
          )}
        </div>

        <div className="mt-4">
          <Tabs
            items={[
              {
                key: "overview",
                label: t.contestDetail.tabs.overview,
                content: (
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="mb-2 font-semibold text-[var(--color-text)]">{t.contestDetail.generalInfo}</p>
                      <dl className="grid grid-cols-2 gap-y-2">
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.positions}</dt>
                        <dd className="text-[var(--color-text)]">{contest.positions}</dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.diploma}</dt>
                        <dd className="text-[var(--color-text)]">{contest.diploma[lang]}</dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.region}</dt>
                        <dd className="text-[var(--color-text)]">
                          {contest.region ? contest.region[lang] : t.contests.notSpecified}
                        </dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.verified}</dt>
                        <dd className="text-[var(--color-text)]">{formatDateLong(contest.verifiedISO, lang)}</dd>
                      </dl>
                    </div>
                    <p className="text-[var(--color-text-muted)]">{contest.summary[lang]}</p>
                    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        {t.contestDetail.officialSource}
                      </p>
                      <a
                        href={contest.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block truncate text-sm font-medium text-[var(--color-primary)]"
                      >
                        {contest.sourceUrl}
                      </a>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">{t.contestDetail.officialSourceNote}</p>
                    </div>
                  </div>
                ),
              },
              {
                key: "conditions",
                label: t.contestDetail.tabs.conditions,
                content: <p className="text-sm text-[var(--color-text-muted)]">{contest.summary[lang]}</p>,
              },
              {
                key: "exams",
                label: t.contestDetail.tabs.exams,
                content: (
                  <EmptyState
                    title={t.contests.notSpecified}
                    description={t.contestDetail.officialSourceNote}
                  />
                ),
              },
              {
                key: "documents",
                label: t.contestDetail.tabs.documents,
                content:
                  contest.documents.length > 0 ? (
                    <ul className="space-y-2">
                      {contest.documents.map((doc) => (
                        <li
                          key={doc.name.fr}
                          className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text)]">{doc.name[lang]}</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {doc.format} · {doc.sizeKb} KB · {t.contestDetail.publishedOn} {formatDateLong(doc.publishedISO, lang)}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {t.contestDetail.source} : {doc.sourceLabel}
                            </p>
                          </div>
                          <Button variant="text">{t.contestDetail.download}</Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <EmptyState title={t.contests.notSpecified} description={t.contestDetail.officialSourceNote} />
                  ),
              },
              {
                key: "discussions",
                label: t.contestDetail.tabs.discussions,
                content: (
                  <EmptyState
                    title={t.contests.notSpecified}
                    description={t.contestDetail.officialSourceNote}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>

      {/* CTA sticky toujours visible sans scroll — annexe §3 */}
      <div className="fixed inset-x-0 bottom-16 z-10 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 backdrop-blur md:bottom-0">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <button
            onClick={() => setSaved((s) => !s)}
            aria-pressed={saved}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "var(--color-primary)" : "none"}>
              <path
                d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.4 5 5.6 5c1.7 0 3.1.9 3.9 2.2C10.3 5.9 11.7 5 13.4 5c3.2 0 4.8 3.2 3.1 6.5C14 15.65 12 20 12 20Z"
                stroke="var(--color-primary)"
                strokeWidth="1.6"
              />
            </svg>
          </button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => window.open(contest.sourceUrl, "_blank", "noopener,noreferrer")}
          >
            {t.contestDetail.apply}
          </Button>
        </div>
      </div>
    </div>
  );
}
