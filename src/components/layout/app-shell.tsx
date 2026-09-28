import type { ReactNode } from "react";
import { Header } from "./header";
import { BottomNav } from "./bottom-nav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {/* padding-bottom réserve l'espace de la nav basse fixe sur mobile */}
      <main className="flex-1 pb-20 md:pb-8">{children}</main>
      <BottomNav />
    </>
  );
}
