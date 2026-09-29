-- Phase 2 : corrections des avertissements du linter de sécurité Supabase.
-- Migration appliquée le 2026-09-28. Copie versionnée dans le dépôt (§25).
-- 1) search_path mutable sur set_updated_at
-- 2) fonctions SECURITY DEFINER appelables directement en RPC par anon/authenticated

alter function public.set_updated_at() set search_path = '';

revoke all on function public.handle_new_user() from public, anon, authenticated;

revoke all on function public.is_staff(uuid) from public, anon;
grant execute on function public.is_staff(uuid) to authenticated;

drop policy "profiles_select_own" on public.profiles;
drop policy "profiles_select_staff" on public.profiles;
drop policy "profiles_update_own" on public.profiles;
drop policy "profiles_insert_own" on public.profiles;
drop policy "user_roles_select_own" on public.user_roles;
drop policy "user_roles_select_staff" on public.user_roles;

create policy "profiles_select_own" on public.profiles
  for select to authenticated using (auth.uid() = id);
create policy "profiles_select_staff" on public.profiles
  for select to authenticated using (public.is_staff(auth.uid()));
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (auth.uid() = id);
create policy "user_roles_select_own" on public.user_roles
  for select to authenticated using (auth.uid() = user_id);
create policy "user_roles_select_staff" on public.user_roles
  for select to authenticated using (public.is_staff(auth.uid()));
