import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Field({ label, id, className = "", ...props }: FieldProps) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-[var(--color-text)]">{label}</span>
      <input
        id={id}
        className={`min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
