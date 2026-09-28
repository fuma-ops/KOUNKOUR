import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";
import { StatusPill } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { daysUntil, formatDateLong } from "@/lib/local-date";
import type { DemoContest } from "./demo-data";

export function ContestCard({ contest }: { contest: DemoContest }) {
  const { lang, t } = useLanguage();
  const days = daysUntil(contest.deadlineISO);
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
          <span>{contest.diploma[lang]}</span>
          <span>{t.contests.positions(contest.positions)}</span>
          <span>{contest.region ? contest.region[lang] : t.contests.notSpecified}</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[var(--color-border)] pt-3 text-xs">
          <span className="text-[var(--color-text-muted)]">
            {t.contests.deadline} : {formatDateLong(contest.deadlineISO, lang)}
          </span>
          {contest.status !== "closed" && days >= 0 && (
            <span className="font-medium text-[var(--color-warning)]">{t.contests.daysLeft(days)}</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
