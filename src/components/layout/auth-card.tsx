import type { ReactNode } from "react";

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <h1 className="mb-5 text-center text-xl font-bold text-[var(--color-text)]">{title}</h1>
      <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        {children}
      </div>
    </div>
  );
}
