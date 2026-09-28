# Organisation modulaire

Référence : `docs/cahier-des-charges.md` §17. Chaque module regroupe ses
composants UI, sa validation de schémas, son accès aux données et ses règles
métier propres. Pas de logique métier partagée dans `src/app` — les routes
appellent les modules.

| Module | Responsabilité | Phase |
| --- | --- | --- |
| `auth` | Inscription/connexion/reset, session, rôles | 2 |
| `contests` | Concours, critères, documents, versions, favoris | 3 |
| `administrations` | Référentiel des administrations/organismes | 3 |
| `documents` | Gestion des pièces jointes (annonces, formulaires, résultats) | 3 |
| `preparation` | Hub préparation, examens antérieurs, ressources | 4 |
| `qcm` | Catalogue QCM, passage, correction, résultats | 4 |
| `community` | Fil, publications, commentaires, réactions | 5 |
| `profiles` | Profil utilisateur, préférences, mes concours/résultats | 6 |
| `notifications` | Centre de notifications, rappels, préférences | 6 |
| `moderation` | Signalements, actions de modération, audit | 5 |
| `admin` | Back-office, CRUD, import, dashboard | 3 |
| `seo` | Sitemap, structured data, métadonnées | 3/7 |
| `pwa` | Manifest, service worker, état hors ligne | 7 |

Modules V2 (non créés en Phase 0/1, isolés quand ils arrivent) :
`radar` (sources/collectors/parsers/ocr/deduplication/review-queue) et
`smart-match` (rules/explanations/alerts) — voir §13-14 du cahier des charges.
