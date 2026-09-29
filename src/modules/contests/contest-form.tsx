"use client";

import { useActionState } from "react";
import Link from "next/link";
import { CONTEST_STATUSES, CONTEST_STATUS_LABELS_FR, type ContestRow } from "./types";
import type { ContestFormState } from "./admin-actions";

const initialState: ContestFormState = { error: null };

type Action = (prev: ContestFormState, formData: FormData) => Promise<ContestFormState>;

function Text({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  dir,
  help,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  required?: boolean;
  type?: string;
  dir?: "rtl" | "ltr";
  help?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-[var(--color-text)]">
        {label} {required && <span className="text-[var(--color-primary)]">*</span>}
      </span>
      <input
        name={name}
        type={type}
        dir={dir}
        required={required}
        defaultValue={defaultValue ?? undefined}
        className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
      />
      {help && <span className="mt-1 block text-xs text-[var(--color-text-muted)]">{help}</span>}
    </label>
  );
}

function Area({
  name,
  label,
  defaultValue,
  dir,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  dir?: "rtl" | "ltr";
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-[var(--color-text)]">{label}</span>
      <textarea
        name={name}
        dir={dir}
        rows={3}
        defaultValue={defaultValue ?? undefined}
        className="w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:border-[var(--color-primary)] focus:outline-none"
      />
    </label>
  );
}

export function ContestForm({ action, contest }: { action: Action; contest?: ContestRow }) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <section className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-semibold text-[var(--color-text)]">Intitulé</h2>
        <Text
          name="title_original"
          label="Titre original de l'annonce"
          required
          defaultValue={contest?.title_original}
          help="Le titre exact tel qu'il figure sur l'annonce officielle."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="title_fr" label="Titre (FR)" defaultValue={contest?.title_fr} />
          <Text name="title_ar" label="Titre (AR)" dir="rtl" defaultValue={contest?.title_ar} />
        </div>
        <Text name="reference" label="Référence / n° d'annonce" defaultValue={contest?.reference} />
      </section>

      <section className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-semibold text-[var(--color-text)]">Détails</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Text name="diploma_fr" label="Diplôme (FR)" defaultValue={contest?.diploma_fr} />
          <Text name="diploma_ar" label="Diplôme (AR)" dir="rtl" defaultValue={contest?.diploma_ar} />
          <Text name="region_fr" label="Région (FR)" defaultValue={contest?.region_fr} />
          <Text name="region_ar" label="Région (AR)" dir="rtl" defaultValue={contest?.region_ar} />
          <Text
            name="positions"
            label="Nombre de postes"
            type="number"
            defaultValue={contest?.positions}
            help="Laisser vide si non précisé dans l'annonce."
          />
          <Text
            name="deadline_date"
            label="Date limite"
            type="date"
            defaultValue={contest?.deadline_date}
          />
          <Text name="exam_date" label="Date d'épreuve" type="date" defaultValue={contest?.exam_date} />
          <Text name="apply_url" label="Lien de candidature" type="url" defaultValue={contest?.apply_url} />
        </div>
        <Area name="summary_fr" label="Résumé KounKour (FR)" defaultValue={contest?.summary_fr} />
        <Area name="summary_ar" label="Résumé KounKour (AR)" dir="rtl" defaultValue={contest?.summary_ar} />
      </section>

      <section className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-semibold text-[var(--color-text)]">Source officielle</h2>
        <Text
          name="source_url"
          label="URL de la source officielle"
          type="url"
          required
          defaultValue={contest?.source_url}
          help="Obligatoire : l'annonce officielle prévaut et doit rester accessible (cahier §7)."
        />
        <Text name="source_org" label="Organisme source" defaultValue={contest?.source_org} />
      </section>

      <section className="space-y-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="font-semibold text-[var(--color-text)]">Statut</h2>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-[var(--color-text)]">Statut éditorial</span>
          <select
            name="status"
            defaultValue={contest?.status ?? "brouillon"}
            className="min-h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-sm focus:border-[var(--color-primary)] focus:outline-none"
          >
            {CONTEST_STATUSES.map((s) => (
              <option key={s} value={s}>
                {CONTEST_STATUS_LABELS_FR[s]}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-[var(--color-text-muted)]">
            Seuls les statuts « Publié », « Mis à jour », « Clôturé », « Annulé » et « Résultats
            publiés » sont visibles publiquement.
          </span>
        </label>
      </section>

      {state.error && (
        <p className="rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] px-3 py-2 text-sm text-[var(--color-warning)]">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-11 items-center rounded-[var(--radius-md)] bg-[var(--color-primary)] px-5 text-sm font-medium text-white hover:bg-[var(--color-primary-hover)] disabled:opacity-50"
        >
          Enregistrer
        </button>
        <Link href="/admin/concours" className="text-sm text-[var(--color-text-muted)]">
          Annuler
        </Link>
      </div>
    </form>
  );
}
