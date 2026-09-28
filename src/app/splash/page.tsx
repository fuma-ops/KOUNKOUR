"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LogoMarkNoBadge } from "@/components/brand/logo-mark";
import { MoroccanCornerPattern, MoroccanWaveBand } from "@/components/brand/moroccan-pattern";

// Écran de démarrage (splash) — reproduit fidèlement la référence finale
// fournie par le propriétaire : logo détouré (livre + étoile) sur deux
// lignes de texte bicolores, motifs marocains en coin, bandeau vague en
// bas, photo Tour Hassan en fond. Visuel uniquement à ce stade.
export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden">
      <Image
        src="/images/splash-mobile.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-bottom md:hidden"
      />
      <Image
        src="/images/splash-desktop.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hidden object-cover object-bottom md:block"
      />

      <MoroccanCornerPattern corner="top-left" className="absolute left-0 top-0 h-40 w-40 sm:h-56 sm:w-56" />
      <MoroccanCornerPattern corner="top-right" className="absolute right-0 top-0 h-40 w-40 sm:h-56 sm:w-56" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-3 px-8 pb-24 text-center [text-shadow:0_1px_12px_rgba(255,255,255,0.65)]">
        <LogoMarkNoBadge size={110} />
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span style={{ color: "#5B1330" }}>Koun</span>
          <span style={{ color: "#E0177C" }}>Kour</span>
        </h1>
        <p className="max-w-xs text-sm font-medium text-[#4A1030] sm:text-base">{t.tagline}</p>

        {/* Barre de progression indicative (annexe : état loading systématique, jamais un écran figé) */}
        <div className="mt-3 h-1.5 w-36 overflow-hidden rounded-full bg-[#F4C6DB]">
          <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#7A1440] to-[#E0177C]" />
        </div>
      </div>

      <MoroccanWaveBand className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 w-full sm:h-36" />
    </div>
  );
}
