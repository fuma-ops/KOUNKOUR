"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { LogoMark } from "@/components/brand/logo-mark";
import { MoroccanPatternStrip } from "@/components/brand/moroccan-pattern";

// Écran de démarrage (splash) — visuel uniquement à ce stade pour validation
// avec le propriétaire. Reproduit la direction du moodboard : logo livre +
// étoile sur badge dégradé bordeaux, motifs géométriques marocains en
// bordure, fond clair et reposant (annexe Design & UX/UI §1).
export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--color-surface-alt)] via-[var(--color-background)] to-[var(--color-surface-alt)] px-10">
      <MoroccanPatternStrip side="left" className="absolute inset-y-0 left-0 w-14 sm:w-20" />
      <MoroccanPatternStrip side="right" className="absolute inset-y-0 right-0 w-14 sm:w-20" />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <LogoMark size={112} />
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">{t.appName}</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t.tagline}</p>
        </div>

        {/* Barre de chargement indicative (annexe : état loading systématique, jamais un écran figé) */}
        <div className="mt-6 h-1 w-32 overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
          <div className="h-full w-1/3 animate-[splash-loading_1.2s_ease-in-out_infinite] rounded-full bg-[var(--color-primary)]" />
        </div>
      </div>

      <style>{`
        @keyframes splash-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
