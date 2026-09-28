"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LogoMarkNoBadge } from "@/components/brand/logo-mark";

// Écran de démarrage (splash) — reproduit la référence finale fournie par le
// propriétaire : photo de Rabat en fond avec un voile bordeaux par-dessus
// (plein en haut, plus léger en bas pour laisser voir la silhouette), logo
// blanc (étoile verte) en grand, descripteur officiel (cahier des charges
// §4 : "Concours & Communauté Maroc") et slogan sur deux lignes.
// Visuel uniquement à ce stade.
export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[#4A0E24]">
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
      {/* Voile bordeaux : teinte la photo, opaque en haut pour le logo et le texte */}
      <div className="absolute inset-0 bg-[#8D174B]/45 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#4A0E24] from-30% via-[#6B1030]/85 via-60% to-[#8D174B]/40" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-start gap-2 px-8 pt-[18dvh] text-center text-white">
        <LogoMarkNoBadge size={150} />
        <h1 className="mt-1 text-5xl font-extrabold tracking-tight sm:text-6xl">{t.appName}</h1>
        <p className="text-sm font-medium text-white/85 sm:text-base">{t.splash.subtitle}</p>

        <div className="mt-8 flex flex-col gap-1 text-lg font-medium sm:text-xl">
          <p>{t.splash.sloganLine1}</p>
          <p>{t.splash.sloganLine2}</p>
        </div>

        {/* Barre de progression indicative (annexe : état loading systématique, jamais un écran figé) */}
        <div className="mt-5 h-1 w-16 overflow-hidden rounded-full bg-white/25">
          <div className="h-full w-2/3 rounded-full bg-white/90" />
        </div>
      </div>
    </div>
  );
}
