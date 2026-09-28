import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KounKour",
  description: "Concours & Communauté Maroc",
};

// Langue/direction par défaut FR/LTR. Le sélecteur AR/RTL réel (avec
// persistance du choix) arrive en Phase 1 — voir docs/phase-0-audit-architecture.md.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" dir="ltr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
