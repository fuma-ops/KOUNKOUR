import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { StatusPill } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { daysUntil, formatDateLong } from "@/lib/local-date";
import type { ContestView } from "./types";

export function ContestCard({ contest }: { contest: ContestView }) {
  const { lang, t } = useLanguage();
  const days = contest.deadlineISO ? daysUntil(contest.deadlineISO) : null;
  const statusLabel = t.contests.status[contest.status];

  return (
    <Link href={`/concours/${contest.slug}`} className="block">
      <Card className="p-4 transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {contest.administration[lang]}
            </p>
            <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{contest.title[lang]}</p>
          </div>
          <StatusPill status={contest.status} label={statusLabel} />
        </div>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-text-muted)]">
          <span>{contest.diploma ? contest.diploma[lang] : t.contests.notSpecified}</span>
          <span>
            {contest.positions !== null ? t.contests.positions(contest.positions) : t.contests.notSpecified}
          </span>
          <span>{contest.region ? contest.region[lang] : t.contests.notSpecified}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs">
          <span className="text-[var(--color-text-muted)]">
            {contest.deadlineISO
              ? `${t.contests.deadline} : ${formatDateLong(contest.deadlineISO, lang)}`
              : t.contests.notSpecified}
          </span>
          {contest.status !== "closed" && days !== null && days >= 0 && (
            <span className="font-medium text-[var(--color-warning)]">{t.contests.daysLeft(days)}</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
