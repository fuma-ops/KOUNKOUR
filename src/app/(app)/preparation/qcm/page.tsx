"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/badge";
import { demoQcmSets } from "@/modules/preparation/demo-data";

export default function QcmCatalogPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--color-text)]">{t.preparation.qcmCatalog}</h1>
        <DemoBadge label={t.common.demoBadge} />
      </div>
      <p className="mb-4 text-sm text-[var(--color-text-muted)]">{t.preparation.demoNotice}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {demoQcmSets.map((qcm) => (
          <Card key={qcm.id} className="flex items-center justify-between gap-3 p-4">
            <div>
              <p className="text-xs font-medium text-[var(--color-accent)]">{qcm.category[lang]}</p>
              <p className="font-medium text-[var(--color-text)]">{qcm.title[lang]}</p>
              <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                {qcm.level[lang]} · {qcm.questionCount} · {qcm.durationMin ? `${qcm.durationMin} min` : "—"}
              </p>
            </div>
            <Link href={`/preparation/qcm/${qcm.id}`}>
              <Button variant="secondary">{t.preparation.startPractice}</Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
