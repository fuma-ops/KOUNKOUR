"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { getNavItems } from "./nav-items";
import { LanguageSwitcher } from "./language-switcher";
import { LogoMark } from "@/components/brand/logo-mark";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const items = getNavItems(t);
  const isHome = pathname === "/";

  // Sur l'accueil, l'en-tête flotte (position fixed, transparent/flouté) au-dessus
  // du hero plein cadre au lieu de réserver sa propre bande blanche — l'image
  // de fond se prolonge ainsi jusqu'en haut de l'écran. Sur les autres pages,
  // comportement inchangé (barre pleine, sticky, dans le flux normal).
  return (
    <header
      className={`inset-x-0 top-0 z-20 transition-colors ${
        isHome
          ? "fixed border-b border-transparent bg-[var(--color-surface)]/45 backdrop-blur-md"
          : "sticky border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 ${
          isHome ? "[text-shadow:0_1px_10px_rgba(255,253,254,0.6)]" : ""
        }`}
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-[var(--color-primary)]">
          <LogoMark size={28} />
          {t.appName}
        </Link>

        {/* Nav "barre supérieure" desktop — annexe §4 : adapter la nav sans perdre les sections */}
        <nav aria-label={t.nav.home} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[var(--color-surface-alt)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
