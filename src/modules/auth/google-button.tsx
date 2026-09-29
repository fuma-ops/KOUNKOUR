"use client";

import { useActionState } from "react";
import { signInWithGoogle, type AuthActionState } from "./actions";

const initialState: AuthActionState = { error: null };

export function GoogleButton({ label }: { label: string }) {
  const [state, formAction, pending] = useActionState(
    () => signInWithGoogle(),
    initialState
  );

  return (
    <div>
      <form action={formAction}>
        <button
          type="submit"
          disabled={pending}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5 text-sm font-medium text-[var(--color-text)] transition-colors hover:bg-[var(--color-surface-alt)] disabled:opacity-50"
        >
          <svg aria-hidden viewBox="0 0 18 18" className="h-4 w-4">
            <path
              fill="#4285F4"
              d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z"
            />
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.34A9 9 0 0 0 9 18Z"
            />
            <path
              fill="#FBBC05"
              d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.02-2.34Z"
            />
            <path
              fill="#EA4335"
              d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9 11.43 0 9 0A9 9 0 0 0 .96 4.94l3.02 2.34C4.68 5.16 6.66 3.58 9 3.58Z"
            />
          </svg>
          {label}
        </button>
      </form>
      {state.error && (
        <p className="mt-2 text-center text-xs text-[var(--color-warning)]">{state.error}</p>
      )}
    </div>
  );
}
