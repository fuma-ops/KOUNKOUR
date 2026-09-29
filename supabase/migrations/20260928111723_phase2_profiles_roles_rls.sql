-- Phase 2 : profils, rôles et RLS (cahier des charges §9, §10, §12, §19)
-- Migration appliquée le 2026-09-28. Copie versionnée dans le dépôt du DDL
-- exécuté sur Supabase (livrable §25).

create type public.app_role as enum ('utilisateur', 'moderateur', 'editeur', 'administrateur');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  language text not null default 'fr' check (language in ('fr','ar')),
  region text,
  preferences jsonb not null default '{}'::jsonb,
  consents jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.profiles is 'Profil utilisateur (cahier des charges §10) : données minimales, jamais email/date de naissance exacte exposées publiquement.';

create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'utilisateur',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
comment on table public.user_roles is 'Rôle vérifié exclusivement côté serveur (cahier des charges §9/§12). Aucune policy d''écriture pour authenticated/anon : seule la service_role peut modifier un rôle.';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger set_user_roles_updated_at
  before update on public.user_roles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, language)
  values (new.id, split_part(new.email, '@', 1), coalesce(new.raw_user_meta_data->>'language', 'fr'));

  insert into public.user_roles (user_id, role)
  values (new.id, 'utilisateur');

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff(uid uuid)
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = uid and role in ('moderateur','editeur','administrateur')
  );
$$;

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_select_staff" on public.profiles
  for select using (public.is_staff(auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);
create policy "user_roles_select_own" on public.user_roles
  for select using (auth.uid() = user_id);
create policy "user_roles_select_staff" on public.user_roles
  for select using (public.is_staff(auth.uid()));
