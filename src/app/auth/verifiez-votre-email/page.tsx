"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { AuthCard } from "@/components/layout/auth-card";

export default function CheckEmailPage() {
  const { t } = useLanguage();
  return (
    <AuthCard title={t.auth.checkEmailTitle}>
      <p className="text-sm text-[var(--color-text-muted)]">{t.auth.checkEmailDesc}</p>
    </AuthCard>
  );
}
