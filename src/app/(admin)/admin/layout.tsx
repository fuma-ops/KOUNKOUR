import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUserRole, isStaffRole } from "@/modules/contests/queries";

// Back-office sécurisé (cahier §12) : accès réservé au staff, vérifié côté
// serveur. Aucun élément d'admin n'est rendu pour un visiteur non autorisé.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const role = await getCurrentUserRole();
  if (!isStaffRole(role)) {
    redirect("/");
  }

  return (
    <div className="min-h-dvh bg-[var(--color-surface-alt)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-4">
            <Link href="/admin/concours" className="font-bold text-[var(--color-primary)]">
              KounKour · Admin
            </Link>
            <nav className="flex items-center gap-3 text-sm">
              <Link
                href="/admin/concours"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              >
                Concours
              </Link>
              <Link
                href="/admin/radar"
                className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              >
                Radar
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="rounded-full bg-[var(--color-surface-alt)] px-2.5 py-1 text-xs font-medium text-[var(--color-text-muted)]">
              {role}
            </span>
            <Link href="/" className="text-[var(--color-primary)]">
              Voir le site
            </Link>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
