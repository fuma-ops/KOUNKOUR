"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/language-provider";
import { getNavItems } from "./nav-items";
import { NavIconGlyph } from "./nav-icon";

// Navigation mobile persistante à 5 entrées, onglet actif mis en évidence
// (cahier des charges §4, annexe §3 "Profil et navigation").
export function BottomNav() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const items = getNavItems(t);

  return (
    <nav
      aria-label={t.nav.home}
      className="fixed inset-x-0 bottom-0 z-20 border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur md:hidden"
    >
      <ul className="flex justify-between px-1">
        {items.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
                  isActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-muted)]"
                }`}
              >
                <span
                  className={`flex h-7 w-11 items-center justify-center rounded-full transition-colors ${
                    isActive ? "bg-[var(--color-surface-alt)]" : ""
                  }`}
                >
                  <NavIconGlyph icon={item.icon} className="h-5 w-5" />
                </span>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
