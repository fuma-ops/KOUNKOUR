-- Phase Radar R1 : fondations de la veille assistée (cahier des charges §13).
-- Principe : collecte ASSISTÉE, jamais de publication automatique. Tout élément
-- détecté arrive en file de validation humaine (status 'pending_review'). Un
-- éditeur/administrateur valide → promotion vers les tables `contests`
-- (§13.2/§13.4). Aucune donnée inventée : un champ non extrait reste vide et
-- devient 'a_verifier' à la promotion (§0/§7).
--
-- Accès : ces tables sont INTERNES (back-office). RLS = staff uniquement,
-- jamais de lecture publique.

-- Statut d'un candidat dans la file de validation (§13.2).
create type public.radar_candidate_status as enum (
  'pending_review', 'imported', 'ignored'
);

-- Statut d'une exécution de collecte.
create type public.radar_run_status as enum (
  'running', 'success', 'error'
);

-- ── Sources de collecte (portails officiels) ───────────────────────────────
create table public.radar_sources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_fr text not null,
  name_ar text,
  domain text not null,
  base_url text not null,
  category text,
  -- Conformité collecte (§13.1) : robots.txt / conditions d'utilisation.
  robots_checked boolean not null default false,
  robots_allowed boolean,
  tos_url text,
  -- Politesse : intervalle minimal entre requêtes (secondes).
  min_delay_seconds integer not null default 5 check (min_delay_seconds >= 0),
  active boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.radar_sources is 'Portails surveillés par le Radar (§13.1). active=false tant que le feu vert juridique/robots.txt n''est pas donné.';
comment on column public.radar_sources.robots_allowed is 'Résultat de la vérification robots.txt/ToS — la collecte reste inactive tant que ce n''est pas explicitement autorisé.';

-- ── Exécutions de collecte (journal) ───────────────────────────────────────
create table public.radar_runs (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.radar_sources(id) on delete cascade,
  status public.radar_run_status not null default 'running',
  started_at timestamptz not null default now(),
  finished_at timestamptz,
  items_detected integer not null default 0 check (items_detected >= 0),
  items_new integer not null default 0 check (items_new >= 0),
  error_message text,
  -- 'seed_import' pour un chargement manuel de données existantes, 'scrape' pour
  -- une collecte automatisée à venir.
  trigger text not null default 'scrape',
  created_at timestamptz not null default now()
);
create index radar_runs_source_idx on public.radar_runs (source_id);
create index radar_runs_started_idx on public.radar_runs (started_at desc);

-- ── Candidats détectés (file de validation humaine) ────────────────────────
create table public.radar_candidates (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.radar_sources(id) on delete restrict,
  run_id uuid references public.radar_runs(id) on delete set null,
  -- Identifiant du portail source (déduplication) — jamais inventé.
  external_id text,
  -- Provenance obligatoire (§7) : URL exacte de l'annonce.
  source_url text not null,
  scraped_at timestamptz not null default now(),
  -- Champs extraits TELS QUELS. Aucun n'est obligatoire hormis le titre
  -- original ; un champ absent reste NULL (jamais deviné).
  title_original text not null,
  title_ar text,
  administration_name text,
  administration_site text,
  administration_category text,
  degree_level text,
  specialty text,
  region text,
  positions integer check (positions is null or positions >= 0),
  -- Date : texte brut conservé + date parsée si non ambiguë (sinon NULL = à vérifier).
  deadline_text text,
  deadline_date date,
  publication_text text,
  -- Charge brute nettoyée (audit/provenance) — sans champ fabriqué.
  raw jsonb not null default '{}'::jsonb,
  status public.radar_candidate_status not null default 'pending_review',
  -- Lien vers le concours créé lors de la validation (§13.2).
  imported_contest_id uuid references public.contests(id) on delete set null,
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Un même élément d'une source n'entre qu'une fois dans la file.
  unique (source_id, external_id)
);
comment on table public.radar_candidates is 'File de validation humaine du Radar (§13.2). Rien n''est visible du public : promotion manuelle vers public.contests.';
comment on column public.radar_candidates.source_url is 'URL exacte de l''annonce officielle — obligatoire, jamais inventée (§0/§7).';
comment on column public.radar_candidates.deadline_date is 'Date parsée depuis deadline_text ; NULL si non parsable sans ambiguïté (à vérifier par un humain).';

create index radar_candidates_status_idx on public.radar_candidates (status);
create index radar_candidates_source_idx on public.radar_candidates (source_id);
create index radar_candidates_deadline_idx on public.radar_candidates (deadline_date);

-- ── Triggers updated_at (fonction déjà définie en Phase 2) ──────────────────
create trigger set_radar_sources_updated_at
  before update on public.radar_sources
  for each row execute function public.set_updated_at();
create trigger set_radar_candidates_updated_at
  before update on public.radar_candidates
  for each row execute function public.set_updated_at();

-- ── RLS : staff uniquement, aucune exposition publique ─────────────────────
alter table public.radar_sources enable row level security;
alter table public.radar_runs enable row level security;
alter table public.radar_candidates enable row level security;

create policy "radar_sources_staff" on public.radar_sources
  for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "radar_runs_staff" on public.radar_runs
  for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));

create policy "radar_candidates_staff" on public.radar_candidates
  for all to authenticated
  using (public.is_staff(auth.uid())) with check (public.is_staff(auth.uid()));
