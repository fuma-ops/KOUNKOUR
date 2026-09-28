"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Card } from "@/components/ui/card";

export default function PreparationHubPage() {
  const { t } = useLanguage();

  const sections = [
    { href: "/preparation/qcm", title: t.preparation.qcmCatalog },
    { href: "/preparation", title: t.preparation.examsArchive },
    { href: "/preparation", title: t.preparation.resources },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-xl font-bold text-[var(--color-text)]">{t.preparation.title}</h1>
      <p className="text-sm text-[var(--color-text-muted)]">{t.preparation.subtitle}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {sections.map((s) => (
          <Link key={s.title} href={s.href}>
            <Card className="p-5 text-center font-medium text-[var(--color-text)] transition-shadow hover:shadow-md">
              {s.title}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
