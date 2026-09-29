import { notFound } from "next/navigation";
import { ContestForm } from "@/modules/contests/contest-form";
import { updateContest } from "@/modules/contests/admin-actions";
import { getContestByIdForStaff } from "@/modules/contests/queries";

export default async function EditContestPage({ params }: PageProps<"/admin/concours/[id]">) {
  const { id } = await params;
  const contest = await getContestByIdForStaff(id);
  if (!contest) notFound();

  const action = updateContest.bind(null, id);

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[var(--color-text)]">Modifier le concours</h1>
        <a
          href={`/concours/${contest.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[var(--color-primary)]"
        >
          Prévisualiser la fiche publique
        </a>
      </div>
      <ContestForm action={action} contest={contest} />
    </div>
  );
}
