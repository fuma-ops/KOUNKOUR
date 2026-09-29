# Phase 3c — SEO : rapport de fin de phase

Statut : livré. Clôt le chapitre Concours (3a + 3b + 3c). Design inchangé.

## 1. Livré (cahier §15)

- **`robots.txt`** (`src/app/robots.ts`) : autorise le public, exclut `/admin`,
  `/auth`, `/profil`, `/notifications` ; référence le sitemap. Rappel : la
  protection réelle des zones privées vient de la RLS + gardes serveur, pas de
  robots.txt.
- **`sitemap.xml`** (`src/app/sitemap.ts`) : dynamique, pages publiques statiques
  + fiches concours **publiées uniquement** ; `lastmod` = `updated_at` (honnête).
  Tolère une base indisponible (renvoie au moins les pages statiques).
- **Métadonnées par concours** (`generateMetadata` sur la fiche) : titre,
  description (résumé tronqué à 160), canonical, Open Graph. Lecture mémoïsée
  (`react.cache`) pour éviter le double appel avec le rendu.
- **Métadonnées globales** (layout racine) : `metadataBase`, template de titre
  `%s · KounKour`, description et Open Graph par défaut.
- **JSON-LD `JobPosting`** : émis **seulement** si la fiche a description +
  date de publication + date limite (sinon omis) — conforme au §15 (ne pas
  transformer une annonce incomplète en offre d'emploi, jamais sur les listes).

## 2. Limite / à compléter plus tard

- **hreflang AR/FR** : le site sert les deux langues sur la même URL (bascule
  client), il n'y a pas encore d'URL distincte par langue ; les alternances
  hreflang seront ajoutées si/quand des URLs par langue sont introduites.
- Vérification Google Search Console (soumission sitemap, suivi indexation) :
  à faire au lancement (Phase 7), côté propriétaire.

## 3. Tests

| Test | Résultat |
| --- | --- |
| Build | ✅ `/robots.txt` et `/sitemap.xml` générés |
| Contenu robots.txt | ✅ règles + lien sitemap corrects |
| Contenu sitemap.xml | ✅ pages statiques (concours ajoutés en prod via Supabase) |

## 4. Prochaine étape

Phase 4 — Préparation / QCM sur vraies données (catégories, passage, correction
serveur, résultats). Rappel : l'import manuel/CSV admin est reporté en dernier
(journal de décisions §7).
