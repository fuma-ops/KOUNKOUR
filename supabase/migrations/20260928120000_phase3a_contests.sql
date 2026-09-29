-- Phase 3a : concours (données + admin manuel) — cahier des charges §6, §7, §12, §18, §19.
-- Publication manuelle par un éditeur/administrateur. Radar (V2) écrira plus
-- tard dans ces MÊMES tables via la file de validation, jamais en parallèle.

-- Statuts éditoriaux contrôlés et auditables (cahier §7).
create type public.contest_status as enum (
  'brouillon', 'a_verifier', 'publie', 'mis_a_jour',
  'cloture', 'annule', 'resultats_publies', 'archive'
);

-- Statut de vérification d'un critère extrait/saisi (cahier §13.4).
create type public.verification_state as enum ('a_verifier', 'verifie', 'incertain');

-- ── Administrations / organismes publics ───────────────────────────────────
create table public.administrations (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_ar text,
  official_site text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.administrations is 'Référentiel des administrations/organismes (cahier §18).';

-- ── Concours ───────────────────────────────────────────────────────────────
create table public.contests (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  administration_id uuid references public.administrations(id) on delete restrict,
  -- Titres : original (langue de l'annonce) + traductions indépendantes (cahier §3).
  title_original text not null,
  title_fr text,
  title_ar text,
  reference text,
  status public.contest_status not null default 'brouillon',
  -- Résumé simplifié KounKour, distinct du texte officiel (cahier §7).
  summary_fr text,
  summary_ar text,
  diploma_fr text,
  diploma_ar text,
  positions integer check (positions is null or positions >= 0),
  region_fr text,
  region_ar text,
  deadline_date date,
  exam_date date,
  apply_url text,
  -- Bloc "Source officielle" obligatoire (cahier §7) : toute fiche cite sa source.
  source_url text not null,
  source_org text,
  -- Traçabilité éditoriale (cahier §7, §12).
  created_by uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  verified_at timestamptz,
  verified_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.contests is 'Concours (cahier §7/§18). status pilote la visibilité publique via RLS.';
comment on column public.contests.source_url is 'URL exacte de l''annonce officielle — obligatoire, jamais inventée (cahier §0/§7).';

create index contests_status_idx on public.contests (status);
create index contests_deadline_idx on public.contests (deadline_date);
create index contests_administration_idx on public.contests (administration_id);

-- ── Critères structurés + provenance (cahier §7, §13.4) ────────────────────
create table public.contest_criteria (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  criterion_type text not null,
  value_fr text,
  value_ar text,
  source_excerpt text,
  source_page text,
  verification_state public.verification_state not null default 'a_verifier',
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index contest_criteria_contest_idx on public.contest_criteria (contest_id);

-- ── Documents associés (cahier §7) ─────────────────────────────────────────
create table public.contest_documents (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  doc_type text not null,
  title_fr text,
  title_ar text,
  url text not null,
  format text,
  size_kb integer,
  language text check (language is null or language in ('fr','ar')),
  -- Provenance et droits (cahier §7, §8 : afficher la source, respecter les droits).
  source_label text,
  rights_status text,
  file_hash text,
  position integer not null default 0,
  created_at timestamptz not null default now()
);
create index contest_documents_contest_idx on public.contest_documents (contest_id);

-- ── Historique / snapshots des champs officiels (cahier §7, §13.4) ─────────
create table public.contest_versions (
  id uuid primary key default gen_random_uuid(),
  contest_id uuid not null references public.contests(id) on delete cascade,
  snapshot jsonb not null,
  source_url text,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);
create index contest_versions_contest_idx on public.contest_versions (contest_id);

-- ── Favoris (cahier §10) ───────────────────────────────────────────────────
create table public.contest_bookmarks (
  user_id uuid not null references auth.users(id) on delete cascade,
  contest_id uuid not null references public.contests(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, contest_id)
);

-- ── Triggers updated_at ────────────────────────────────────────────────────
create trigger set_administrations_updated_at
  before update on public.administrations
  for each row execute function public.set_updated_at();
create trigger set_contests_updated_at
  before update on public.contests
  for each row execute function public.set_updated_at();

-- ── RLS ────────────────────────────────────────────────────────────────────
-- Visibilité publique : uniquement les statuts publiés (cahier §6/§19).
create or replace function public.contest_is_public(s public.contest_status)
returns boolean
language sql
immutable
as $$
  select s in ('publie','mis_a_jour','cloture','annule','resultats_publies');
$$;

alter table public.administrations enable row level security;
alter table public.contests enable row level security;
alter table public.contest_criteria enable row level security;
alter table public.contest_documents enable row level security;
alter table public.contest_versions enable row level security;
alter table public.contest_bookmarks enable row level security;

-- Administrations : lecture publique, écriture staff.
create policy "administrations_select_public" on public.administrations
  for select using (true);
create policy "administrations_write_staff" on public.administrations
  for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- Concours : public voit les publiés ; staff voit tout et écrit.
create policy "contests_select_public" on public.contests
  for select using (public.contest_is_public(status));
create policy "contests_select_staff" on public.contests
  for select to authenticated using (public.is_staff(auth.uid()));
create policy "contests_write_staff" on public.contests
  for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- Critères : lisibles si le concours parent est public ; staff plein accès.
create policy "contest_criteria_select_public" on public.contest_criteria
  for select using (
    exists (select 1 from public.contests c where c.id = contest_id and public.contest_is_public(c.status))
  );
create policy "contest_criteria_write_staff" on public.contest_criteria
  for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- Documents : idem critères.
create policy "contest_documents_select_public" on public.contest_documents
  for select using (
    exists (select 1 from public.contests c where c.id = contest_id and public.contest_is_public(c.status))
  );
create policy "contest_documents_write_staff" on public.contest_documents
  for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- Versions/snapshots : staff uniquement (historique éditorial interne).
create policy "contest_versions_staff" on public.contest_versions
  for all to authenticated using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

-- Favoris : chacun gère les siens.
create policy "contest_bookmarks_select_own" on public.contest_bookmarks
  for select to authenticated using (auth.uid() = user_id);
create policy "contest_bookmarks_insert_own" on public.contest_bookmarks
  for insert to authenticated with check (auth.uid() = user_id);
create policy "contest_bookmarks_delete_own" on public.contest_bookmarks
  for delete to authenticated using (auth.uid() = user_id);
