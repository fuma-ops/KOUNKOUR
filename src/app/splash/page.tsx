"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LogoMark } from "@/components/brand/logo-mark";
import { MoroccanPatternStrip } from "@/components/brand/moroccan-pattern";

// Écran de démarrage (splash) — visuel uniquement à ce stade pour validation
// avec le propriétaire. Photos fournies par le propriétaire (Tour Hassan,
// coucher de soleil) + logo livre/étoile + motifs géométriques marocains en
// bordure, conformément au moodboard.
export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden">
      <Image
        src="/images/splash-mobile.png"
        alt=""
        fill
        priority
        className="object-cover md:hidden"
      />
      <Image
        src="/images/splash-desktop.png"
        alt=""
        fill
        priority
        className="hidden object-cover md:block"
      />

      {/* Touche marocaine demandée : motifs géométriques en bordure gauche/droite */}
      <MoroccanPatternStrip side="left" color="#8D174B" className="absolute inset-y-0 left-0 w-8 sm:w-12" />
      <MoroccanPatternStrip side="right" color="#8D174B" className="absolute inset-y-0 right-0 w-8 sm:w-12" />

      <div className="relative z-10 flex flex-col items-center gap-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)]/85 px-8 py-8 text-center shadow-lg backdrop-blur-sm">
        <LogoMark size={104} />
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary)]">{t.appName}</h1>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t.tagline}</p>
        </div>

        {/* Barre de chargement indicative (annexe : état loading systématique, jamais un écran figé) */}
        <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-[var(--color-surface-alt)]">
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
