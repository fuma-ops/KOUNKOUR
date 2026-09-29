import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContestDetailBySlug, isContestBookmarked } from "@/modules/contests/queries";
import { ContestDetailView } from "@/modules/contests/contest-detail-view";
import { MatchPanel } from "@/modules/smart-match/match-panel";
import { getMyPreferences, toMatchProfile } from "@/modules/smart-match/preferences";
import { evaluateMatch, type MatchResult } from "@/modules/smart-match/rules";
import { createClient } from "@/lib/supabase/server";
import { todayLocalISO } from "@/lib/local-date";
import { SITE_URL } from "@/lib/supabase/config";

// Mémoïse la lecture pour éviter un double appel entre generateMetadata et la page.
const getDetail = cache(getContestDetailBySlug);

export async function generateMetadata({
  params,
}: PageProps<"/concours/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getDetail(slug);
  if (!detail) return { title: "Concours introuvable" };

  const { view } = detail;
  const title = view.title.fr || view.title.ar;
  const description =
    (view.summary?.fr || view.summary?.ar || `${view.administration.fr} — concours public au Maroc.`).slice(
      0,
      160
    );
  const url = `${SITE_URL}/concours/${view.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article" },
  };
}

// JSON-LD JobPosting — uniquement si la fiche remplit réellement les champs
// requis (cahier §15 : ne pas transformer une annonce inadmissible en offre).
function jobPostingLd(detail: NonNullable<Awaited<ReturnType<typeof getDetail>>>) {
  const { view } = detail;
  const description = view.summary?.fr || view.summary?.ar;
  if (!description || !view.publishedISO || !view.deadlineISO) return null;

  return {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: view.title.fr || view.title.ar,
    description,
    datePosted: view.publishedISO,
    validThrough: view.deadlineISO,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: view.administration.fr || view.administration.ar,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "MA",
        addressRegion: view.region?.fr || undefined,
      },
    },
    ...(view.positions ? { totalJobOpenings: view.positions } : {}),
  };
}

export default async function ContestDetailPage({ params }: PageProps<"/concours/[slug]">) {
  const { slug } = await params;
  const detail = await getDetail(slug);
  if (!detail) notFound();

  const bookmarked = await isContestBookmarked(slug);
  const ld = jobPostingLd(detail);

  // Smart Match : panneau affiché uniquement à un utilisateur connecté.
  const supabase = await createClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  let matchResult: MatchResult | null = null;
  let showMatch = false;
  if (user) {
    showMatch = true;
    const profile = toMatchProfile(await getMyPreferences());
    if (profile) {
      const { view } = detail;
      matchResult = evaluateMatch(
        profile,
        {
          diplomaText: view.diploma?.fr ?? null,
          regionText: view.region?.fr ?? null,
          title: view.title.fr,
          deadlineISO: view.deadlineISO,
          status: view.status === "closed" ? "cloture" : "publie",
        },
        todayLocalISO()
      );
    }
  }

  return (
    <>
      {ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      )}
      <ContestDetailView detail={detail} initiallyBookmarked={bookmarked} />
      {showMatch && (
        <div className="mx-auto max-w-4xl px-4 pb-28">
          <MatchPanel result={matchResult} />
        </div>
      )}
    </>
  );
}
