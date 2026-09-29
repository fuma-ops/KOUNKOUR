import { ContestForm } from "@/modules/contests/contest-form";
import { createContest } from "@/modules/contests/admin-actions";

export default function NewContestPage() {
  return (
    <div>
      <h1 className="mb-5 text-xl font-bold text-[var(--color-text)]">Nouveau concours</h1>
      <ContestForm action={createContest} />
    </div>
  );
}
