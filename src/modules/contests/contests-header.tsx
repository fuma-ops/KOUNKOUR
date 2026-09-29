"use client";

import { useLanguage } from "@/lib/i18n/language-provider";

export function ContestsHeader() {
  const { t } = useLanguage();
  return (
    <div className="mb-2">
      <h1 className="text-xl font-bold text-[var(--color-text)]">{t.contests.title}</h1>
      <p className="text-sm text-[var(--color-text-muted)]">{t.contests.subtitle}</p>
    </div>
  );
}
