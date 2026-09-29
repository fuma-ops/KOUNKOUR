"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { StatusPill } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/states";
import { daysUntil, formatDateLong } from "@/lib/local-date";
import { toggleBookmark } from "./bookmark-actions";
import type { ContestDetail } from "./queries";

export function ContestDetailView({
  detail,
  initiallyBookmarked,
}: {
  detail: ContestDetail;
  initiallyBookmarked: boolean;
}) {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [saved, setSaved] = useState(initiallyBookmarked);
  const [pending, startTransition] = useTransition();
  const { view, criteria, documents } = detail;

  const days = view.deadlineISO ? daysUntil(view.deadlineISO) : null;

  function onToggleSave() {
    startTransition(async () => {
      const res = await toggleBookmark(view.slug);
      if (res.needsAuth) {
        router.push("/auth/connexion");
        return;
      }
      setSaved(res.bookmarked);
    });
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-28 pt-6">
      {/* Bandeau décoratif générique — jamais présenté comme une photo
          officielle spécifique à l'administration (cahier §0). */}
      <div className="h-28 rounded-[var(--radius-lg)] bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]" />

      <div className="-mt-8 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              {view.administration[lang]}
            </p>
            <h1 className="mt-0.5 text-lg font-bold text-[var(--color-text)]">{view.title[lang]}</h1>
          </div>
          <StatusPill status={view.status} label={t.contests.status[view.status]} />
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm">
          <span>
            {t.contests.deadline} :{" "}
            <strong>
              {view.deadlineISO ? formatDateLong(view.deadlineISO, lang) : t.contests.notSpecified}
            </strong>
          </span>
          {view.status !== "closed" && days !== null && days >= 0 && (
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
                      <p className="mb-2 font-semibold text-[var(--color-text)]">
                        {t.contestDetail.generalInfo}
                      </p>
                      <dl className="grid grid-cols-2 gap-y-2">
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.positions}</dt>
                        <dd className="text-[var(--color-text)]">
                          {view.positions !== null ? view.positions : t.contests.notSpecified}
                        </dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.diploma}</dt>
                        <dd className="text-[var(--color-text)]">
                          {view.diploma ? view.diploma[lang] : t.contests.notSpecified}
                        </dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.region}</dt>
                        <dd className="text-[var(--color-text)]">
                          {view.region ? view.region[lang] : t.contests.notSpecified}
                        </dd>
                        <dt className="text-[var(--color-text-muted)]">{t.contestDetail.fields.verified}</dt>
                        <dd className="text-[var(--color-text)]">
                          {view.verifiedISO ? formatDateLong(view.verifiedISO, lang) : t.contests.notSpecified}
                        </dd>
                      </dl>
                    </div>
                    {view.summary && (
                      <p className="text-[var(--color-text-muted)]">{view.summary[lang]}</p>
                    )}
                    <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
                        {t.contestDetail.officialSource}
                      </p>
                      <a
                        href={view.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block truncate text-sm font-medium text-[var(--color-primary)]"
                      >
                        {view.sourceUrl}
                      </a>
                      <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                        {t.contestDetail.officialSourceNote}
                      </p>
                    </div>
                  </div>
                ),
              },
              {
                key: "conditions",
                label: t.contestDetail.tabs.conditions,
                content:
                  criteria.length > 0 ? (
                    <dl className="space-y-2 text-sm">
                      {criteria.map((c) => (
                        <div
                          key={c.id}
                          className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                        >
                          <dt className="font-medium text-[var(--color-text)]">{c.type}</dt>
                          <dd className="text-[var(--color-text-muted)]">{c.value[lang]}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <EmptyState
                      title={t.contests.notSpecified}
                      description={t.contestDetail.officialSourceNote}
                    />
                  ),
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
                  documents.length > 0 ? (
                    <ul className="space-y-2">
                      {documents.map((doc) => (
                        <li
                          key={doc.id}
                          className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] p-3"
                        >
                          <div>
                            <p className="text-sm font-medium text-[var(--color-text)]">{doc.title[lang]}</p>
                            <p className="text-xs text-[var(--color-text-muted)]">
                              {[doc.format, doc.sizeKb ? `${doc.sizeKb} KB` : null]
                                .filter(Boolean)
                                .join(" · ")}
                            </p>
                            {doc.sourceLabel && (
                              <p className="text-xs text-[var(--color-text-muted)]">
                                {t.contestDetail.source} : {doc.sourceLabel}
                              </p>
                            )}
                          </div>
                          <a href={doc.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="text">{t.contestDetail.download}</Button>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <EmptyState
                      title={t.contests.notSpecified}
                      description={t.contestDetail.officialSourceNote}
                    />
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
            onClick={onToggleSave}
            disabled={pending}
            aria-pressed={saved}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[var(--color-border)] disabled:opacity-50"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "var(--color-primary)" : "none"}>
              <path
                d="M12 20s-7-4.35-9.5-8.5C.8 8.2 2.4 5 5.6 5c1.7 0 3.1.9 3.9 2.2C10.3 5.9 11.7 5 13.4 5c3.2 0 4.8 3.2 3.1 6.5C14 15.65 12 20 12 20Z"
                stroke="var(--color-primary)"
                strokeWidth="1.6"
              />
            </svg>
          </button>
          {view.applyUrl ? (
            <a href={view.applyUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="primary" className="w-full">
                {t.contestDetail.apply}
              </Button>
            </a>
          ) : (
            <a href={view.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="primary" className="w-full">
                {t.contestDetail.apply}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
