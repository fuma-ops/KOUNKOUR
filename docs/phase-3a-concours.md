# Phase 3a — Concours (données + admin manuel) : rapport de fin de phase

Statut : livré et testé (RLS bout en bout par simulation SQL). En attente de la
promotion d'un premier compte administrateur pour un test dans l'UI réelle.

## 1. Fichiers créés / modifiés

- `supabase/migrations/` — dossier de migrations versionnées (livrable §25) :
  - `20260928111723_phase2_profiles_roles_rls.sql` (copie versionnée Phase 2)
  - `20260928111924_phase2_security_lint_fixes.sql` (copie versionnée Phase 2)
  - `20260928120000_phase3a_contests.sql` (nouvelle migration Phase 3a)
- `src/lib/supabase/database.types.ts` — régénéré avec les tables concours.
- `src/modules/contests/types.ts` — statuts, libellés éditeur, helper de visibilité.
- `src/modules/contests/queries.ts` — accès données serveur (public + staff), rôle courant.
- `src/modules/contests/admin-actions.ts` — Server Actions create/update, garde de rôle serveur.
- `src/modules/contests/contest-form.tsx` — formulaire réutilisable (création/édition).
- `src/app/(admin)/admin/layout.tsx` — back-office protégé par rôle (redirect si non staff).
- `src/app/(admin)/admin/concours/` — liste, création (`nouveau`), édition (`[id]`).

## 2. Modèle de données (migration `phase3a_contests`)

Tables : `administrations`, `contests`, `contest_criteria`, `contest_documents`,
`contest_versions`, `contest_bookmarks` (cahier §18). Enums : `contest_status`
(8 statuts éditoriaux auditables), `verification_state`.

Points clés conformes au cahier :
- `contests.source_url` **NOT NULL** : toute fiche cite sa source officielle (§7, §0).
- `slug` unique ; index sur statut, date limite, administration.
- Titres original + FR + AR indépendants (§3) ; résumé KounKour distinct du texte officiel (§7).
- Traçabilité : `created_by`, `published_at`, `verified_at`, `verified_by`.
- `contest_versions` : snapshots JSON pour l'historique éditorial (§7/§13.4).

## 3. RLS (cahier §19)

- Fonction `contest_is_public(status)` : visible publiquement = `publie`,
  `mis_a_jour`, `cloture`, `annule`, `resultats_publies` (jamais `brouillon`,
  `a_verifier`, `archive`).
- `contests` : lecture publique des seuls statuts publics ; lecture complète +
  écriture réservées au staff (`is_staff`). Idem `contest_criteria` /
  `contest_documents` (lisibles seulement si le concours parent est public).
- `contest_versions` : staff uniquement. `contest_bookmarks` : propriétaire uniquement.
- `administrations` : lecture publique, écriture staff.

## 4. Back-office `/admin`

- Groupe de routes `(admin)` séparé du shell public, layout à garde de rôle
  serveur (un visiteur non staff est redirigé, aucun élément admin rendu — §12/§19).
- Écriture protégée deux fois : garde de rôle dans la Server Action **et** RLS
  en base (masquer un bouton n'est jamais une sécurité — §19).
- Le formulaire impose l'URL de source officielle et le titre original ; le
  statut pilote la publication (`published_at` posé automatiquement au 1er passage
  en publié).

## 5. Tests exécutés et résultats

| Test | Méthode | Résultat |
| --- | --- | --- |
| Build + typecheck | `npm run build` | ✅ 19 routes générées, dont `/admin/concours*` |
| Éditeur crée un concours | Simulation SQL (JWT éditeur) | ✅ insert accepté |
| Anonyme ne voit pas un brouillon | Simulation SQL (rôle anon) | ✅ invisible |
| Éditeur publie | Simulation SQL | ✅ statut `publie`, `published_at` posé |
| Anonyme voit le concours publié | Simulation SQL (rôle anon) | ✅ visible (1) |
| Utilisateur simple tente de créer | Simulation SQL (JWT utilisateur) | ✅ refusé (violation RLS) |
| Avis de sécurité Supabase | `get_advisors` | ✅ seul l'avertissement `is_staff` connu/accepté |

Comptes et données de test créés puis intégralement supprimés (base à 0 ligne après test).

## 6. Limite connue (inchangée depuis Phase 2)

Le réseau sortant de l'environnement cloud ne permet pas d'atteindre
`*.supabase.co` : le test dans le navigateur réel se fait en local ou après
déploiement Vercel avec les variables d'environnement configurées. Le chemin de
données testé en SQL est celui-là même qu'emploie PostgREST/Supabase côté app.

## 7. Premier administrateur — action requise

Aucun compte n'est encore inscrit. Pour activer le back-office :
1. S'inscrire sur l'app (`/auth/inscription`) — un profil + rôle `utilisateur`
   sont créés automatiquement.
2. Promotion au rôle `administrateur` (acte réservé au service_role, jamais
   exposé côté client), à exécuter une fois :
   ```sql
   update public.user_roles set role = 'administrateur'
   where user_id = (select id from auth.users where email = 'VOTRE_EMAIL');
   ```
   Je peux le faire pour `khfuma@gmail.com` dès que le compte existe.

## 8. Procédure de rollback

- Base : `supabase/migrations/20260928120000_phase3a_contests.sql` peut être
  annulée en supprimant les tables `contest_*`, `contests`, `administrations`,
  la fonction `contest_is_public`, et les types `contest_status` /
  `verification_state`.
- Code : `git revert` du commit Phase 3a.

## 9. Prochaine étape

Phase 3b — Concours (public) : brancher la liste, la recherche, les filtres, le
tri, la fiche détail et les favoris sur ces vraies données (les écrans publics
actuels cessent alors d'utiliser `src/modules/contests/demo-data.ts`). Le design
reste identique.
