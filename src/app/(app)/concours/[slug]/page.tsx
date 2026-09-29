import { notFound } from "next/navigation";
import { getContestDetailBySlug, isContestBookmarked } from "@/modules/contests/queries";
import { ContestDetailView } from "@/modules/contests/contest-detail-view";

export default async function ContestDetailPage({ params }: PageProps<"/concours/[slug]">) {
  const { slug } = await params;
  const detail = await getContestDetailBySlug(slug);
  if (!detail) notFound();

  const bookmarked = await isContestBookmarked(slug);

  return <ContestDetailView detail={detail} initiallyBookmarked={bookmarked} />;
}
