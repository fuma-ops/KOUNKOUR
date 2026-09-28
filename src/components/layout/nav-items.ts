import type { Dictionary } from "@/lib/i18n/dictionary";

export function getNavItems(t: Dictionary) {
  return [
    { href: "/", label: t.nav.home, icon: "home" as const },
    { href: "/concours", label: t.nav.contests, icon: "contests" as const },
    { href: "/preparation", label: t.nav.preparation, icon: "preparation" as const },
    { href: "/communaute", label: t.nav.community, icon: "community" as const },
    { href: "/profil", label: t.nav.profile, icon: "profile" as const },
  ];
}

export type NavIcon = ReturnType<typeof getNavItems>[number]["icon"];
