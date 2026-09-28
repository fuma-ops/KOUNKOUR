// Squelette Phase 0 : ne préjuge d'aucun écran final.
// Le design system et les pages réelles (Accueil, Concours, etc.) sont
// construits en Phase 1 après validation du document Phase 0.
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-primary)]">
        KounKour
      </h1>
      <p className="max-w-md text-[var(--color-text)]">
        Squelette technique — en attente de validation du document Phase 0
        (architecture, modèle de données, plan par phases) avant construction
        des écrans.
      </p>
    </main>
  );
}
