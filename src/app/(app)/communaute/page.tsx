"use client";

import { useState } from "react";
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

  // État local uniquement (like/signalement) : aucune écriture serveur,
  // la modération réelle et la persistance des réactions sont Phase 5
  // (cahier §9). On évite ainsi un bouton qui ne ferait rien ("pas de
  // faux bouton", cahier §0) sans prétendre à une action enregistrée.
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [reported, setReported] = useState<Record<string, boolean>>({});

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
        {demoPosts.map((post) => {
          const isLiked = liked[post.id] ?? false;
          const isReported = reported[post.id] ?? false;
          const likeCount = post.likes + (isLiked ? 1 : 0);

          return (
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

              <div className="mt-3 flex items-center gap-4 border-t border-[var(--color-border)] pt-2 text-xs text-[var(--color-text-muted)]">
                <button
                  type="button"
                  aria-pressed={isLiked}
                  onClick={() => setLiked((prev) => ({ ...prev, [post.id]: !prev[post.id] }))}
                  className={`flex min-h-8 items-center gap-1 rounded-full px-2 font-medium transition-colors ${
                    isLiked ? "text-[var(--color-primary)]" : "hover:text-[var(--color-text)]"
                  }`}
                >
                  👍 {t.community.like} · {likeCount}
                </button>
                <span>{t.community.replies(post.replies)}</span>
                <button
                  type="button"
                  disabled={isReported}
                  onClick={() => setReported((prev) => ({ ...prev, [post.id]: true }))}
                  className="ms-auto min-h-8 rounded-full px-2 font-medium hover:text-[var(--color-warning)] disabled:pointer-events-none disabled:text-[var(--color-warning)]"
                >
                  {isReported ? t.community.reported : t.community.report}
                </button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
