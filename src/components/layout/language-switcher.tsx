"use client";

import { useLanguage } from "@/lib/i18n/language-provider";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t.common.language}
      className="flex items-center rounded-full border border-[var(--color-border)] p-0.5 text-xs font-medium"
    >
      <button
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
        className={`min-h-8 rounded-full px-2.5 transition-colors ${
          lang === "fr" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-muted)]"
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
        className={`min-h-8 rounded-full px-2.5 transition-colors ${
          lang === "ar" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-muted)]"
        }`}
      >
        عربي
      </button>
    </div>
  );
}
