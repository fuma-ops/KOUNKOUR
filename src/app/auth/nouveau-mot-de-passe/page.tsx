"use client";

import { useActionState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { AuthCard } from "@/components/layout/auth-card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { updatePassword, type AuthActionState } from "@/modules/auth/actions";

const initialState: AuthActionState = { error: null };

export default function NewPasswordPage() {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(updatePassword, initialState);

  return (
    <AuthCard title={t.auth.newPasswordTitle}>
      <form action={formAction} className="space-y-4">
        <Field
          label={t.auth.newPasswordLabel}
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        {state.error && <p className="text-sm text-[var(--color-warning)]">{state.error}</p>}
        <Button type="submit" variant="primary" className="w-full" disabled={pending}>
          {t.auth.newPasswordSubmit}
        </Button>
      </form>
    </AuthCard>
  );
}
