# Phase 2 — Base / Auth : rapport de fin de phase

Statut : livré, en attente de test local par le propriétaire avant la Phase 3
(limite d'environnement expliquée en §5 ci-dessous).

## 1. Fichiers modifiés / créés

- `src/lib/supabase/client.ts`, `server.ts`, `middleware.ts`, `database.types.ts`
- `middleware.ts` (racine) — rafraîchissement de session sur chaque requête
- `src/modules/auth/actions.ts` — signUp, signIn, signOut, requestPasswordReset, updatePassword (Server Actions)
- `src/app/auth/inscription`, `/connexion`, `/mot-de-passe-oublie`, `/nouveau-mot-de-passe`, `/verifiez-votre-email`, `/email-envoye`, `/callback` (route handler)
- `src/modules/profiles/profile-view.tsx` + `src/app/profil/page.tsx` réécrit en Server Component (état invité/connecté réel, plus de state figé)
- `src/components/ui/field.tsx`, `src/components/layout/auth-card.tsx`
- Dictionnaire i18n : section `auth` + compléments `profile` (FR/AR)
- `.env.example` : ajout de `NEXT_PUBLIC_SITE_URL`

## 2. Projet Supabase et migrations

Projet créé : `kounkour` (organisation `fuma-ops`, région `eu-west-3`, plan gratuit).

Migrations appliquées (versionnées côté Supabase, à rejouer via `apply_migration` ou la CLI Supabase si le projet est recréé) :

1. `phase2_profiles_roles_rls` — tables `profiles`, `user_roles` (enum `app_role`), triggers `updated_at`, provisionnement automatique (`handle_new_user`) à l'inscription, fonction `is_staff`, RLS activée + policies.
2. `phase2_security_lint_fixes` — corrige 3 avertissements du linter de sécurité Supabase : `search_path` mutable sur `set_updated_at`, et `handle_new_user`/`is_staff` appelables directement en RPC par des rôles non prévus. Policies restreintes au rôle `authenticated`.

Avertissement résiduel accepté : `is_staff(uuid)` reste appelable en RPC par un utilisateur connecté (nécessaire pour que les policies RLS "staff" fonctionnent). Impact limité : révèle seulement si un uid donné a un rôle staff, aucune donnée privée.

## 3. Commandes d'installation

```bash
npm install   # ajoute @supabase/supabase-js et @supabase/ssr (déjà dans package.json)
cp .env.example .env.local
# renseigner NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, NEXT_PUBLIC_SITE_URL
npm run dev
```

## 4. Variables d'environnement nécessaires (noms uniquement)

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (clé publique/anon — pas un secret, mais à ne pas committer par convention)
- `NEXT_PUBLIC_SITE_URL` (`http://localhost:3000` en local)

Le projet Supabase est visible dans le dashboard du compte `fuma-ops` (organisation "fuma-ops's Org"), projet **kounkour**, région eu-west-3. L'URL et la clé publique sont dans le dashboard (Project Settings → API) — jamais la clé `service_role`, qui n'a pas été récupérée dans cette session et ne doit jamais l'être côté client.

## 5. Tests exécutés et résultats

| Test | Méthode | Résultat |
| --- | --- | --- |
| Build + typecheck | `npm run build`, `npm run typecheck` | ✅ OK |
| RLS — A ne lit pas le profil de B | Simulation SQL (`set_config('request.jwt.claims', …)` + `set local role authenticated`) avec 2 comptes de test créés puis supprimés | ✅ SELECT ne retourne que la ligne de l'utilisateur courant |
| RLS — A ne peut pas modifier le profil de B | Idem, `UPDATE … where id = B` | ✅ 0 ligne affectée |
| RLS — A ne peut pas s'auto-promouvoir `administrateur` | Idem, `UPDATE user_roles … where user_id = A` | ✅ 0 ligne affectée (aucune policy d'update sur `user_roles`) |
| Provisionnement automatique profil + rôle à l'inscription | Insertion directe dans `auth.users` (déclenche le même trigger qu'un vrai signup) | ✅ `profiles` et `user_roles` créés automatiquement |
| Formulaire d'inscription réel (bout en bout, navigateur) | Playwright contre `npm run dev` local | ❌ Bloqué — voir limite ci-dessous, **pas un bug du code** |

### Limite connue : réseau sortant de cette session

Le réseau sortant de cet environnement cloud a une politique qui **n'autorise pas l'accès direct à `*.supabase.co`** (seuls certains domaines sont en liste blanche). Résultat : le serveur Next.js qui tourne dans cette même session ne peut pas atteindre l'API Supabase pour un vrai appel réseau (`Unexpected token 'H', "Host not i"...` — réponse de blocage du proxy interprétée comme du JSON invalide). Ce n'est pas une erreur de code : le projet Supabase MCP a bien pu créer/migrer/interroger la base (canal différent), et le pattern d'intégration Next.js/Supabase utilisé suit exactement la documentation officielle `@supabase/ssr`.

**Deux façons de vérifier réellement le flux d'inscription/connexion :**
1. Cloner le dépôt en local (votre machine), `npm install`, créer `.env.local` avec les vraies valeurs du dashboard Supabase, `npm run dev`, tester `/auth/inscription`.
2. Élargir la politique réseau de cet environnement cloud (menu de l'environnement → Network access → ajouter `*.supabase.co` ou un niveau d'accès plus large), puis redemander un test dans une prochaine session.

### Autre limite connue

Emails d'inscription/réinitialisation envoyés via le service email par défaut de Supabase (aucun fournisseur SMTP personnalisé configuré). Suffisant pour le développement, mais à remplacer par un fournisseur dédié avant tout lancement public (cahier des charges §11).

## 6. Procédure de rollback

- Code : `git revert` du commit de cette phase, ou retour au commit de la Phase 1.
- Base de données : les deux migrations peuvent être annulées avec :
  ```sql
  drop trigger if exists on_auth_user_created on auth.users;
  drop function if exists public.handle_new_user();
  drop function if exists public.is_staff(uuid);
  drop function if exists public.set_updated_at();
  drop table if exists public.user_roles;
  drop table if exists public.profiles;
  drop type if exists public.app_role;
  ```
- Projet Supabase : peut être mis en pause ou supprimé depuis le dashboard si la Phase 2 est abandonnée.

## 7. Prochaine étape proposée

Phase 3a — Concours (données + admin manuel) : tables `contests`/`contest_criteria`/`contest_documents`/`contest_versions`, CRUD admin réservé aux rôles `editeur`/`administrateur`, provenance obligatoire. Recommandation : valider d'abord que l'inscription/connexion fonctionne réellement en local (ou après élargissement réseau) avant d'empiler la Phase 3 dessus.
