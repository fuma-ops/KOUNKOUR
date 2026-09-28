"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { t } = useLanguage();

  // Phase 1 : aucune authentification (Phase 2). L'état "invité" est affiché
  // ici uniquement, jamais imposé avant d'avoir montré la valeur du service
  // (annexe §4 — corrige l'écart identifié dans l'onboarding des maquettes).
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-alt)]">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-[var(--color-text-muted)]" fill="none">
          <path
            d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </div>
      <h1 className="text-lg font-semibold text-[var(--color-text)]">{t.profile.guestTitle}</h1>
      <p className="text-sm text-[var(--color-text-muted)]">{t.profile.guestDesc}</p>
      <div className="mt-2 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Button variant="primary" className="flex-1">
          {t.profile.register}
        </Button>
        <Button variant="secondary" className="flex-1">
          {t.profile.login}
        </Button>
      </div>
    </div>
  );
}
