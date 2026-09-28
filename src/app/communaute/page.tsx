"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoBadge } from "@/components/ui/badge";
import { formatDateLong } from "@/lib/local-date";
import { demoPosts, type PostTag } from "@/modules/community/demo-data";

const tagStyles: Record<PostTag, string> = {
  official: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  member: "bg-[var(--color-surface-alt)] text-[var(--color-text-muted)]",
  verified: "bg-[var(--color-warning-bg)] text-[var(--color-warning)]",
};

export default function CommunityPage() {
  const { lang, t } = useLanguage();

  const tagLabel: Record<PostTag, string> = {
    official: t.community.officialTag,
    member: t.community.memberTag,
    verified: t.community.verifiedTag,
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--color-text)]">{t.community.title}</h1>
          <p className="text-sm text-[var(--color-text-muted)]">{t.community.subtitle}</p>
        </div>
        <DemoBadge label={t.common.demoBadge} />
      </div>

      <Button variant="primary" className="mt-4 w-full sm:w-auto">
        {t.community.askQuestion}
      </Button>

      <div className="mt-5 space-y-3">
        {demoPosts.map((post) => (
          <Card key={post.id} className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-[var(--color-text)]">{post.author}</p>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tagStyles[post.tag]}`}>
                {tagLabel[post.tag]}
              </span>
            </div>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              {post.category[lang]} · {formatDateLong(post.dateISO, lang)}
            </p>
            <p className="mt-2 text-sm text-[var(--color-text)]">{post.text[lang]}</p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">{t.community.replies(post.replies)}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
