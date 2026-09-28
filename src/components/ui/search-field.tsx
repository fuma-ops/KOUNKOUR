import type { InputHTMLAttributes } from "react";

export function SearchField({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div
      className={`flex items-center gap-2 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 min-h-11 ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        fill="none"
        className="h-4 w-4 shrink-0 text-[var(--color-text-muted)]"
      >
        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
        <path d="m14 14 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <input
        type="search"
        className="w-full bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
        {...props}
      />
    </div>
  );
}
