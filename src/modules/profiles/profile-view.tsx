"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { signOut } from "@/modules/auth/actions";

interface ProfileViewProps {
  session: { email: string; displayName: string | null } | null;
}

export function ProfileView({ session }: ProfileViewProps) {
  const { t } = useLanguage();

  if (session) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-3 px-4 py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-surface-alt)] text-lg font-semibold text-[var(--color-primary)]">
          {(session.displayName || session.email)[0]?.toUpperCase()}
        </div>
        <h1 className="text-lg font-semibold text-[var(--color-text)]">
          {t.profile.connectedTitle} {session.displayName || session.email}
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">{session.email}</p>
        <Link href="/profil/smart-match" className="mt-2 w-full">
          <Button variant="primary" className="w-full">
            {t.smartMatch.navLabel}
          </Button>
        </Link>
        <form action={signOut} className="w-full">
          <Button type="submit" variant="secondary" className="w-full">
            {t.profile.logout}
          </Button>
        </form>
      </div>
    );
  }

  // Invité : jamais imposé avant d'avoir montré la valeur du service
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
        <Link href="/auth/inscription" className="flex-1">
          <Button variant="primary" className="w-full">
            {t.profile.register}
          </Button>
        </Link>
        <Link href="/auth/connexion" className="flex-1">
          <Button variant="secondary" className="w-full">
            {t.profile.login}
          </Button>
        </Link>
      </div>
    </div>
  );
}
