"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { getNavItems } from "./nav-items";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const items = getNavItems(t);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-lg font-bold text-[var(--color-primary)]">
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
