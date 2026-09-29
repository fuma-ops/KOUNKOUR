"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AuthCard } from "@/components/layout/auth-card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { signUp, type AuthActionState } from "@/modules/auth/actions";
import { GoogleButton } from "@/modules/auth/google-button";

const initialState: AuthActionState = { error: null };

export default function RegisterPage() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(signUp, initialState);

  return (
    <AuthCard title={t.auth.registerTitle}>
      <GoogleButton label={t.auth.continueWithGoogle} />
      <div className="my-4 flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
        <span className="h-px flex-1 bg-[var(--color-border)]" />
        {t.auth.orSeparator}
        <span className="h-px flex-1 bg-[var(--color-border)]" />
      </div>
      <form action={formAction} className="space-y-4">
        <Field label={t.auth.emailLabel} type="email" name="email" required autoComplete="email" />
        <Field
          label={t.auth.passwordLabel}
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        {state.error && <p className="text-sm text-[var(--color-warning)]">{state.error}</p>}
        <Button type="submit" variant="primary" className="w-full" disabled={pending}>
          {t.auth.registerSubmit}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/auth/connexion" className="text-[var(--color-text-muted)]">
          {t.auth.registerSwitch}
        </Link>
      </div>
    </AuthCard>
  );
}
