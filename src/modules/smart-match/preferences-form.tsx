"use client";

import { useActionState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { savePreferences, deletePreferences, type PreferencesState } from "./actions";
import type { PreferencesRow } from "./preferences";

const initialState: PreferencesState = { error: null };

export function PreferencesForm({ prefs }: { prefs: PreferencesRow | null }) {
  const { t } = useLanguage();
  const [state, formAction, pending] = useActionState(savePreferences, initialState);

  return (
    <div className="mx-auto max-w-lg px-4 py-6">
      <h1 className="text-xl font-bold text-[var(--color-text)]">{t.smartMatch.formTitle}</h1>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">{t.smartMatch.formIntro}</p>

      <form action={formAction} className="mt-5 space-y-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[var(--color-text)]">
            {t.smartMatch.diplomaLabel}
          </span>
          <select
            name="diploma_level"
            defaultValue={prefs?.diploma_level ?? ""}
            className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            <option value="">{t.smartMatch.diplomaNone}</option>
            {t.smartMatch.diplomaLevels.map((lvl) => (
              <option key={lvl.value} value={lvl.value}>
                {lvl.label}
              </option>
            ))}
          </select>
        </label>

        <Field label={t.smartMatch.specialtyLabel} name="specialty" defaultValue={prefs?.specialty ?? ""} />
        <Field label={t.smartMatch.regionLabel} name="region" defaultValue={prefs?.region ?? ""} />
        <Field label={t.smartMatch.domainLabel} name="domain" defaultValue={prefs?.domain ?? ""} />

        <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
          <input
            type="checkbox"
            name="match_consent"
            defaultChecked={prefs?.match_consent ?? true}
            className="h-4 w-4 accent-[var(--color-primary)]"
          />
          {t.smartMatch.consentLabel}
        </label>

        {state.error && <p className="text-sm text-[var(--color-warning)]">{state.error}</p>}
        {state.saved && <p className="text-sm text-[var(--color-success)]">{t.smartMatch.saved}</p>}

        <Button type="submit" variant="primary" className="w-full" disabled={pending}>
          {t.smartMatch.save}
        </Button>
      </form>

      {prefs && (
        <form action={deletePreferences} className="mt-3">
          <Button type="submit" variant="text" className="w-full">
            {t.smartMatch.deleteProfile}
          </Button>
        </form>
      )}
    </div>
  );
}
