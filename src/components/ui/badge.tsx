type ContestStatus = "open" | "upcoming" | "closed";

const statusStyles: Record<ContestStatus, string> = {
  open: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  upcoming: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
  closed: "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]",
};

// Le statut est toujours porté par le texte, jamais par la seule couleur
// (annexe Design & UX/UI §1 : "ne pas utiliser la couleur seule").
export function StatusPill({ status, label }: { status: ContestStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

// Étiquette obligatoire sur toute donnée fictive (cahier des charges §0).
export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-[var(--color-warning)] px-2.5 py-1 text-[11px] font-semibold tracking-wide text-[var(--color-warning)] uppercase">
      {label}
    </span>
  );
}
