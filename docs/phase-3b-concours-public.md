# Phase 3b — Concours (public) : rapport de fin de phase

Statut : livré. Design public inchangé ; les écrans consomment désormais les
vraies données Supabase au lieu de `demo-data`.

## 1. Ce qui change

- **Liste `/concours`** : rendue côté serveur (SEO, cahier §15) via
  `listPublicContestViews`, avec recherche plein texte + filtres de statut +
  états vide, dans le composant client `ContestsBrowser`. Le sélecteur d'états
  de démonstration (échafaudage Phase 1) est retiré.
- **Fiche `/concours/[slug]`** : rendue côté serveur via `getContestDetailBySlug`
  (concours + critères + documents + source), affichée par `ContestDetailView`
  (design identique). Documents et critères réels ; source par document.
- **Accueil** : sections « récents » et « échéances proches » sur vraies données
  (`HomeContestSections`, client, via le client navigateur Supabase).
- **Favoris** : bouton cœur de la fiche relié à `toggleBookmark` (Server Action,
  RLS par utilisateur) ; un visiteur non connecté est redirigé vers la connexion.
- `src/modules/contests/demo-data.ts` supprimé (plus référencé).

## 2. Données

- View-model `ContestView` + `toContestView` (`mapper.ts`) : découplent les
  composants du schéma DB (contrat de données). Statut d'affichage
  ouvert/prochainement/clôturé dérivé du statut éditorial + dates.
- Migration `20260929120000_phase3b_opening_date` : colonne `opening_date`
  (statut « prochainement », maquette « Ouverture : … »).
- Données d'exemple insérées (3 concours + 2 administrations), **clairement
  étiquetées « (exemple) / donnée fictive »** (cahier §0), supprimables via
  `/admin`.

## 3. Tests

| Test | Résultat |
| --- | --- |
| Build + typecheck | ✅ |
| Lecture publique anon (liste + jointure administration) | ✅ 3 concours publiés visibles |
| Statut d'affichage (opening_date futur → « prochainement ») | ✅ |
| Favoris : RLS par utilisateur (Phase 3a) | ✅ (toggle via Server Action) |

Limite connue (inchangée) : test navigateur réel sur Vercel, l'environnement
cloud ne joignant pas `*.supabase.co`.

## 4. Rollback

- Code : `git revert` du commit Phase 3b.
- Base : supprimer la colonne `opening_date` et les lignes d'exemple.

## 5. Prochaine étape

Phase 3c — SEO : sitemap.xml, robots.txt, métadonnées par concours, JSON-LD
JobPosting conforme, hreflang AR/FR. Puis Phase 4 (Préparation/QCM sur données
réelles).
