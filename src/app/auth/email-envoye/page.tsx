"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { AuthCard } from "@/components/layout/auth-card";

export default function ResetSentPage() {
  const { t } = useLanguage();
  return (
    <AuthCard title={t.auth.resetSentTitle}>
      <p className="text-sm text-[var(--color-text-muted)]">{t.auth.resetSentDesc}</p>
    </AuthCard>
  );
}
