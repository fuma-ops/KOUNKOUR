"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dictionary, type Dictionary, type Lang } from "./dictionary";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "kounkour:lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  // Applique le choix mémorisé au montage (persistance simple Phase 1,
  // sans backend — cf. cahier des charges §3 : conserver le choix durant
  // la navigation et les visites suivantes).
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "ar") {
        setLangState(stored);
      }
    } catch {
      // localStorage indisponible (navigation privée…) : reste sur le défaut FR.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dictionary[lang].dir;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // silencieux : la persistance est un confort, pas une garantie.
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: dictionary[lang].dir, t: dictionary[lang], setLang }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage doit être utilisé sous LanguageProvider");
  }
  return ctx;
}
