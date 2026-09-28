"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-provider";
import { LogoMarkNoBadge } from "@/components/brand/logo-mark";

// Écran de démarrage (splash) — reproduit la référence finale fournie par le
// propriétaire : fond bordeaux plein (pas de photo pleine page), logo clair
// centré, descripteur officiel (cahier des charges §4 : "Concours &
// Communauté Maroc"), slogan sur deux lignes, puis une bande photo de la
// silhouette de Rabat en duoton (teinte de marque via mix-blend-mode) en bas
// d'écran. Visuel uniquement à ce stade.
export default function SplashPage() {
  const { t } = useLanguage();

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-gradient-to-b from-[#4A0E24] via-[#6B1030] to-[#8D174B]">
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-2 px-8 pb-6 pt-16 text-center text-white">
        <LogoMarkNoBadge size={100} />
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{t.appName}</h1>
        <p className="text-sm font-medium text-white/80 sm:text-base">{t.splash.subtitle}</p>

        <div className="mt-7 flex flex-col gap-1 text-base font-semibold sm:text-lg">
          <p>{t.splash.sloganLine1}</p>
          <p>{t.splash.sloganLine2}</p>
        </div>

        <div className="mt-6 h-px w-20 bg-white/30" />

        {/* Barre de progression indicative (annexe : état loading systématique, jamais un écran figé) */}
        <div className="mt-6 h-1.5 w-36 overflow-hidden rounded-full bg-white/20">
          <div className="h-full w-2/3 rounded-full bg-white/80" />
        </div>
      </div>

      {/* Bande photo Rabat en duoton : désaturée puis teintée bordeaux via
          mix-blend-mode plutôt qu'un nouvel asset — même image que le hero,
          jamais présentée comme une photo officielle (cahier §0). */}
      <div className="relative h-[30%] min-h-[190px] w-full">
        <Image
          src="/images/splash-mobile.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-[#8D174B] mix-blend-color" />
        <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#6B1030] to-transparent" />
      </div>
    </div>
  );
}
