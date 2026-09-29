-- Smart Match V1 (cahier §14) : préférences de profil facultatives.
-- Données minimales, aucune donnée sensible obligatoire. L'utilisateur peut
-- tout modifier/effacer. RLS : chacun ne voit et n'écrit que ses préférences.

create table public.smart_match_preferences (
  user_id uuid primary key references auth.users(id) on delete cascade,
  -- Niveau de diplôme exprimé en "Bac +N" (0 = Bac). null = non renseigné.
  diploma_level integer check (diploma_level is null or (diploma_level >= 0 and diploma_level <= 8)),
  specialty text,
  region text,
  domain text,
  -- Consentement explicite à l'usage des préférences pour la correspondance.
  match_consent boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.smart_match_preferences is 'Préférences Smart Match (cahier §14) : facultatives, minimales, effaçables. RLS propriétaire.';

create trigger set_smart_match_preferences_updated_at
  before update on public.smart_match_preferences
  for each row execute function public.set_updated_at();

alter table public.smart_match_preferences enable row level security;

create policy "smp_select_own" on public.smart_match_preferences
  for select to authenticated using (auth.uid() = user_id);
create policy "smp_insert_own" on public.smart_match_preferences
  for insert to authenticated with check (auth.uid() = user_id);
create policy "smp_update_own" on public.smart_match_preferences
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "smp_delete_own" on public.smart_match_preferences
  for delete to authenticated using (auth.uid() = user_id);
