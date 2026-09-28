"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/states";
import { demoQcmSets, demoQcmQuestions } from "@/modules/preparation/demo-data";

// Écran de passage — Phase 1 (Fondations UI) : navigation et sélection
// uniquement, en mémoire locale. Le calcul/l'enregistrement serveur du
// score, prévus par le cahier des charges §8, arrivent en Phase 4
// (Préparation). Aucune progression n'est donc simulée comme sauvegardée.
export default function QcmPassagePage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { lang, t } = useLanguage();

  const qcmSet = demoQcmSets.find((q) => q.id === params.slug);
  const questions = useMemo(() => demoQcmQuestions[params.slug] ?? [], [params.slug]);

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!qcmSet) {
    notFound();
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <EmptyState title={t.contests.notSpecified} description={t.preparation.demoNotice} />
      </div>
    );
  }

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;

  function selectOption(optionId: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: optionId }));
  }

  function goNext() {
    if (!isLast) {
      setIndex((i) => i + 1);
      return;
    }
    const wrongIds = questions
      .filter((q) => answers[q.id] && answers[q.id] !== q.correctOptionId)
      .map((q) => q.id);
    const score = questions.filter((q) => answers[q.id] === q.correctOptionId).length;
    const query = new URLSearchParams({
      score: String(score),
      total: String(questions.length),
      wrong: wrongIds.join(","),
    });
    router.push(`/preparation/qcm/${params.slug}/resultat?${query.toString()}`);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col px-4 py-6">
      <div className="flex items-center justify-between">
        <DemoBadge label={t.preparation.demoNotice} />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
        <span>{t.qcm.questionOf(index + 1, questions.length)}</span>
        <span>{qcmSet.durationMin ? `${qcmSet.durationMin} min` : t.qcm.trainingMode}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
        <div
          className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-8 flex flex-1 flex-col gap-4">
        <p className="text-lg font-semibold text-[var(--color-text)]">{question.text[lang]}</p>

        <fieldset className="flex flex-col gap-3">
          <legend className="sr-only">{question.text[lang]}</legend>
          {question.options.map((option) => (
            <label
              key={option.id}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-sm transition-colors ${
                selected === option.id
                  ? "border-[var(--color-primary)] bg-[var(--color-surface-alt)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)]"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.id}
                checked={selected === option.id}
                onChange={() => selectOption(option.id)}
                className="h-[18px] w-[18px] accent-[var(--color-primary)]"
              />
              {option.text[lang]}
            </label>
          ))}
        </fieldset>
      </div>

      <div className="mt-6 flex gap-3 border-t border-[var(--color-border)] pt-4">
        <Button variant="secondary" className="flex-1" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          {t.qcm.previous}
        </Button>
        <Button variant="primary" className="flex-1" disabled={!selected} onClick={goNext}>
          {isLast ? t.qcm.finish : t.qcm.next}
        </Button>
      </div>
    </div>
  );
}
