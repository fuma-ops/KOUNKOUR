"use client";

import { useActionState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AuthCard } from "@/components/layout/auth-card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { requestPasswordReset, type AuthActionState } from "@/modules/auth/actions";

const initialState: AuthActionState = { error: null };

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);

  return (
    <AuthCard title={t.auth.forgotTitle}>
      <form action={formAction} className="space-y-4">
        <Field label={t.auth.emailLabel} type="email" name="email" required autoComplete="email" />
        {state.error && <p className="text-sm text-[var(--color-warning)]">{state.error}</p>}
        <Button type="submit" variant="primary" className="w-full" disabled={pending}>
          {t.auth.forgotSubmit}
        </Button>
      </form>
      <div className="mt-4 text-center text-sm">
        <Link href="/auth/connexion" className="text-[var(--color-text-muted)]">
          {t.auth.backToLogin}
        </Link>
      </div>
    </AuthCard>
  );
}
