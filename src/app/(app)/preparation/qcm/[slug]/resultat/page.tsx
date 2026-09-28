"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams, notFound } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/badge";
import { demoQcmSets, demoQcmQuestions } from "@/modules/preparation/demo-data";

// Écran de résultat — Phase 1 (Fondations UI). Le score vient uniquement
// des paramètres d'URL passés par l'écran de passage (état local, non
// persisté) : aucune sauvegarde n'est simulée avant que la Phase 4
// (Préparation) ne branche l'enregistrement serveur réel (cahier §8).
function QcmResultContent() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { lang, t } = useLanguage();

  const qcmSet = demoQcmSets.find((q) => q.id === params.slug);
  const questions = demoQcmQuestions[params.slug] ?? [];

  if (!qcmSet) {
    notFound();
  }

  const score = Number(searchParams.get("score") ?? 0);
  const total = Number(searchParams.get("total") ?? questions.length);
  const wrongIds = (searchParams.get("wrong") ?? "").split(",").filter(Boolean);
  const wrongQuestions = questions.filter((q) => wrongIds.includes(q.id));

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <div className="flex justify-end">
        <DemoBadge label={t.common.demoBadge} />
      </div>

      <div className="mt-2 flex flex-col items-center gap-2 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-success-bg)]">
          <span className="text-xl font-bold text-[var(--color-success)]">
            {score}/{total}
          </span>
        </div>
        <h1 className="text-lg font-semibold text-[var(--color-text)]">{t.qcm.resultTitle}</h1>
        <p className="max-w-sm text-sm text-[var(--color-text-muted)]">{t.qcm.resultNote}</p>
      </div>

      <div className="mt-8">
        {wrongQuestions.length === 0 ? (
          <p className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 text-center text-sm text-[var(--color-text-muted)]">
            {t.qcm.noMistakes}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-[var(--color-text)]">{t.qcm.reviewMistakes}</p>
            {wrongQuestions.map((q) => {
              const correct = q.options.find((o) => o.id === q.correctOptionId);
              return (
                <div key={q.id} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                  <p className="text-sm font-medium text-[var(--color-text)]">{q.text[lang]}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    {t.qcm.correctAnswerLabel} : <span className="font-medium text-[var(--color-success)]">{correct?.text[lang]}</span>
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-muted)]">{q.explanation[lang]}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4 sm:flex-row">
        <Link href={`/preparation/qcm/${params.slug}`} className="flex-1">
          <Button variant="primary" className="w-full">
            {t.qcm.restart}
          </Button>
        </Link>
        <Link href="/preparation/qcm" className="flex-1">
          <Button variant="secondary" className="w-full">
            {t.qcm.backToCatalog}
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function QcmResultPage() {
  return (
    <Suspense fallback={null}>
      <QcmResultContent />
    </Suspense>
  );
}
