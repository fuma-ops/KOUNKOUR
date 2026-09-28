import type { ReactNode } from "react";
import { Button } from "./button";

export function CardSkeleton() {
  return (
    <div className="animate-pulse rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex gap-3">
        <div className="h-12 w-12 shrink-0 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-[var(--color-surface-alt)]" />
          <div className="h-3 w-1/2 rounded bg-[var(--color-surface-alt)]" />
          <div className="h-3 w-1/3 rounded bg-[var(--color-surface-alt)]" />
        </div>
      </div>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-alt)] px-6 py-12 text-center">
      <svg aria-hidden viewBox="0 0 48 48" className="h-10 w-10 text-[var(--color-text-muted)]">
        <rect x="8" y="14" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M8 20h32" stroke="currentColor" strokeWidth="2" />
      </svg>
      <p className="font-medium text-[var(--color-text)]">{title}</p>
      <p className="max-w-xs text-sm text-[var(--color-text-muted)]">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction} className="mt-1">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function ErrorState({
  title,
  description,
  retryLabel,
  onRetry,
}: {
  title: string;
  description: string;
  retryLabel?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
      <svg aria-hidden viewBox="0 0 48 48" className="h-10 w-10 text-[var(--color-warning)]">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M24 16v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="32" r="1.6" fill="currentColor" />
      </svg>
      <p className="font-medium text-[var(--color-text)]">{title}</p>
      <p className="max-w-xs text-sm text-[var(--color-text-muted)]">{description}</p>
      {retryLabel && onRetry && (
        <Button variant="primary" onClick={onRetry} className="mt-1">
          {retryLabel}
        </Button>
      )}
    </div>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-[var(--color-text)]">{children}</h2>;
}
