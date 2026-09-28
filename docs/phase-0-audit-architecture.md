# KounKour — Phase 0 : Audit, architecture et plan par phases

Statut : **en attente de validation explicite du propriétaire** avant le début de la Phase 1, conformément à la règle fondamentale du cahier des charges (`docs/cahier-des-charges.md` §0 et §23).

## 1. Audit du dépôt

Dépôt créé le 2026-09-28, entièrement neuf (greenfield). État au moment de cet audit :

- Squelette Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, généré et adapté : tokens de couleur de l'annexe design en variables CSS, layout FR/LTR par défaut, page d'accueil placeholder (aucun écran final construit — volontaire, cf. §0 du cahier : "ne pas générer l'application entière en une seule fois").
- Structure modulaire vide créée sous `src/modules/*` (un dossier par module listé au §17 du cahier), documentée dans `src/modules/README.md`.
- `docs/cahier-des-charges.md` et `docs/annexe-design-ux-ui.md` : transcription versionnée des deux documents fournis, pour qu'ils fassent partie du dépôt (source de vérité accessible à toute session future, pas seulement aux PDF externes).
- `.env.example` : noms de variables uniquement, aucune valeur.
- Aucune dépendance Supabase, aucune authentification, aucune donnée (fictive ou réelle) : normal à ce stade, ce sera la Phase 2.
- Aucun CI/CD, aucun test, aucun déploiement configuré — à traiter en Phase 7 (avec des vérifications légères dès la Phase 1, voir §5).

**Aucun risque de régression** : il n'existe rien à casser. Le seul risque à ce stade est de trop construire avant validation — d'où ce document avant toute Phase 1.

## 2. Architecture proposée

Reprend le chapitre 17 du cahier des charges, avec les choix suivants figés pour la Phase 0 (à confirmer) :

| Couche | Choix | Justification |
| --- | --- | --- |
| Frontend | Next.js App Router (déjà en place), TypeScript strict | SSR/SSG natif requis pour le SEO (§15), déjà scaffoldé. |
| UI | Tailwind CSS v4 + composants accessibles maison (style shadcn/ui) | Cohérent avec §2 de l'annexe (tokens centralisés), évite une dépendance UI lourde avant que le design system ne soit validé en Phase 1. |
| Backend/DB | Supabase (PostgreSQL + Auth + Storage) | Recommandation du cahier ; migrations versionnées, RLS natif, gratuit jusqu'à un palier raisonnable pour un MVP. **Non installé en Phase 0** — décision de créer le projet Supabase à confirmer avant la Phase 2 (implique un compte/coût potentiel, voir §4). |
| API | Server Actions + Route Handlers Next.js | Pas de couche API séparée à maintenir ; validation serveur systématique (Zod ou équivalent, à choisir en Phase 2). |
| Hébergement | À trancher avant Phase 7 (voir §4 - risques) | Doit supporter Next.js SSR + jobs planifiés pour le Radar (V2) ; ex. Vercel (hobby gratuit, mais cron/edge functions limités) ou un hébergeur avec worker dédié. Ne pas décider maintenant : le besoin réel (fréquence Radar, volume) n'est connu qu'en V2. |
| Radar worker | Tâche backend isolée (Phase 8, hors périmètre Phase 0-7) | Cf. cahier §13.2 : jamais dans le navigateur du visiteur. |
| Tests | Vitest (unitaire) + Playwright (E2E) — à installer en Phase 1/2 | Gratuits, standards avec Next.js, couvrent les critères d'acceptation du §22. |
| Déploiement | Git + environnements dev/staging/prod, variables séparées | Standard ; procédure de rollback documentée à chaque phase (§0 du cahier). |

### Schéma des flux (vue Phase 0-7, avant Radar/Smart Match)

```
Visiteur / Candidat
      │
      ▼
Next.js App Router (SSR pages publiques + Server Actions)
      │                         │
      ▼                         ▼
Modules UI (src/modules/*)   Validation serveur (schémas)
      │                         │
      └───────────┬─────────────┘
                   ▼
        Supabase (Postgres + RLS, Auth, Storage)
                   │
                   ▼
     Tables : contests, contest_criteria, contest_documents,
     qcm_*, posts/comments, profiles, reports, notifications…
```

Le Radar (collecte) et Smart Match (moteur de règles) se greffent en V2 comme des modules isolés qui **écrivent dans les mêmes tables `contests`/`contest_criteria`** via la file de validation humaine (§13.5) — jamais un chemin de données parallèle.

## 3. Modèle de données — précisions Phase 0

Le §18 du cahier liste les tables cibles. Pour la Phase 2 (Base/Auth) et la Phase 3 (Concours), voici les précisions nécessaires avant migration :

- **Enums contrôlés côté base** (pas seulement côté UI) pour : statut concours (`brouillon, a_verifier, publie, mis_a_jour, cloture, annule, resultats_publies, archive` — §7), rôle utilisateur (`utilisateur, moderateur, editeur, administrateur` — §9), statut document.
- **Contraintes d'unicité** : `contests.slug`, `contest_bookmarks(user_id, contest_id)`, `reactions(user_id, target_type, target_id)`.
- **Champs de provenance obligatoires** sur `contest_criteria` et `contest_documents` (source_url ou document_id, extrait/page, horodatage de collecte, méthode) — non négociable d'après §13.4, même en saisie manuelle Phase 3 (un éditeur humain doit aussi indiquer sa source).
- **RLS par défaut** : lecture publique uniquement sur les lignes `status = 'publie'` (ou statuts publics équivalents) des tables `contests`/`contest_documents`/`contest_criteria` ; écriture réservée aux rôles `editeur`/`administrateur` vérifiés côté serveur (jamais une policy basée sur une donnée modifiable par le client).
- **Dates** : toutes les colonnes de type date/heure utilisateur (rappels, "aujourd'hui") doivent être interprétées et affichées en heure locale marocaine, jamais un simple UTC brut côté client (cf. bonne pratique déjà appliquée dans d'autres projets de ce compte).

Le détail complet des colonnes/migrations SQL sera livré au début de la Phase 2, une fois Supabase choisi et créé — le produire maintenant serait prématuré (pas encore de projet Supabase, pas de moteur d'auth choisi pour la partie sociale facultative).

## 4. Risques et décisions à trancher avant d'avancer

Repris et priorisés à partir du §24 du cahier. Ordre = urgence réelle pour ne pas construire sur du sable :

1. **Droits de rediffusion du contenu officiel et des annales** (bloquant avant Phase 3/4 en production réelle, sans impact sur un squelette Phase 1 avec données `DEMO`). KounKour republie des annonces et résumés de sites gouvernementaux et des sujets d'examens dont les droits ne sont pas clarifiés dans le cahier. Recommandation : avis juridique avant toute mise en production publique (pas avant Phase 1/2 en local).
2. **Faisabilité réelle de l'OCR arabe** (bloquant pour la Phase 8 uniquement, sans impact sur les phases 0-7). Le cahier prévoit Tesseract gratuit ; en pratique l'OCR arabe sur scans administratifs de qualité moyenne est peu fiable. Recommandation : tester sur un échantillon réel avant de promettre "gratuit only" dans la documentation Radar.
3. **Nom, domaine et marque KounKour** — à vérifier avant toute communication publique (pas bloquant pour le développement).
4. **Charge humaine de modération/validation** non budgétée dans le cahier (coûts uniquement techniques). N'affecte pas la Phase 0-2, mais conditionne la viabilité des Phases 5 et 8.
5. **Modèle économique moyen terme flou** (gratuit + pub + premium + partenariats, rien de validé) — à clarifier avant la Phase 7 (lancement public), sans impact sur le développement des phases précédentes.
6. **Choix d'hébergement définitif** — reporté à la Phase 7, car le besoin réel (trafic, cron Radar) n'est pas encore connu ; un hébergement de développement standard (Vercel hobby ou équivalent) suffit pour les Phases 1-6.

Aucun de ces six points ne bloque le démarrage de la Phase 1 (Fondations UI, purement visuelle, sans données réelles ni publication). Ils bloquent en revanche tout déploiement public — conformément au §0 du cahier ("avant tout déploiement public : vérifier sécurité, RLS, mobile, accessibilité, SEO, droits, confidentialité, sauvegardes, modération").

## 5. Dépendances et coûts récurrents — estimation Phase 0

Aucune dépendance payante n'est nécessaire pour les Phases 1-2 :

| Service | Statut Phase 0 | Coût |
| --- | --- | --- |
| Hébergement Next.js (dev) | À créer en Phase 1 | Gratuit (palier hobby) |
| Supabase | À créer en Phase 2 | Gratuit (palier free) jusqu'à un volume à surveiller |
| Nom de domaine | Non acheté | ~100-150 MAD/an, à l'achat |
| Email transactionnel | Reporté Phase 6 | Gratuit en dev (ex. palier free d'un fournisseur), à chiffrer avant activation |
| OCR/Scheduler/Radar | Reporté Phase 8 | Dépend du test de faisabilité (risque 2 ci-dessus) |

Scénarios bas/moyen/haut détaillés seront produits avant la Phase 7 (lancement), une fois l'hébergement et le volume réels mieux connus — les produire maintenant serait spéculatif et non actionnable.

## 6. Plan de réalisation détaillé (affine le §23 du cahier)

La Phase 3 du cahier ("Concours") est volumineuse (admin + CRUD + recherche + détail + documents + SEO) ; je la découpe en trois sous-étapes pour garder des points de validation fréquents, conformément à l'esprit "une phase à la fois" du cahier :

| Phase | Contenu | Sortie attendue |
| --- | --- | --- |
| **0 – Audit et cadrage** (ce document) | Audit, architecture, modèle de données, risques, coûts, plan | Validation explicite du propriétaire |
| **1 – Fondations UI** | Design system (tokens, boutons, champs, cartes, badges, états vides/erreur/chargement), shell responsive, navigation 5 onglets, sélecteur FR/AR avec RTL réel, pages statiques (légal, à propos) | Revue visuelle sur les écrans clés (Accueil, Liste, Détail, QCM, Communauté, Profil) — sans données réelles |
| **2 – Base/Auth** | Projet Supabase, migrations initiales (profiles, user_roles), RLS, inscription/connexion/reset, session | Tests d'accès (A ne lit pas les données privées de B) |
| **3a – Concours (données + admin manuel)** | Tables contests/criteria/documents/versions, CRUD admin, slug, statuts, provenance obligatoire | Un éditeur peut créer/publier un concours `DEMO` de bout en bout |
| **3b – Concours (public)** | Liste, recherche, filtres, tri, page détail, documents, favoris | Critères d'acceptation §22 "Concours" validés |
| **3c – Concours (SEO)** | SSR/SSG, sitemap, robots, metadata, JSON-LD conforme | Critères d'acceptation §22 "SEO" validés |
| **4 – Préparation** | Catégories, QCM (passage + correction serveur), examens antérieurs, ressources | Critères d'acceptation §22 "QCM" validés |
| **5 – Communauté** | Fil, publications, commentaires, réactions, signalements, rôles de modération | Critères d'acceptation §22 "Communauté" validés |
| **6 – Profil/notifications** | Favoris, suivi, rappels, préférences, notifications in-app (email si fournisseur validé) | Parcours "mes concours"/"mes résultats" testés |
| **7 – Qualité/lancement** | Tests E2E, sécurité, perf, accessibilité, conformité (RGPD/CNDP), backups, staging→prod | Checklist de déploiement public du §0 entièrement cochée |
| **8 – Radar V2** | Sources, scheduler, extraction HTML/PDF/OCR, dédoublonnage, file de validation humaine | Critères d'acceptation §22 "Radar" validés, coûts réels mesurés |
| **9 – Smart Match V2** | Profil minimal, moteur de règles déterministe, explications, cas limites, alertes opt-in | Critères d'acceptation §22 "Smart Match" validés |
| **10 – Croissance** | SEO monitoring, analytics, contenu éditorial, canal d'acquisition initial (réseaux sociaux / partenariats), décision Android natif | Suivi mensuel des indicateurs du §21 |

Chaque phase, à sa clôture, livre : fichiers modifiés, migrations, commandes d'installation, variables d'environnement (noms uniquement), tests exécutés et résultats, limites connues, procédure de rollback — conformément au §0 du cahier.

## 7. Journal de décisions

| # | Décision | Statut | Date |
| --- | --- | --- | --- |
| 1 | Stack technique Next.js/Tailwind/Supabase | Validé implicitement (aucun avis contraire) | 2026-09-28 |
| 2 | Découpage 3a/3b/3c de la Phase 3 | **Validé explicitement par le propriétaire** | 2026-09-28 |
| 3 | 5 écarts maquettes vs cahier/annexe (addendum `docs/annexe-design-ux-ui.md`) | Non tranché explicitement — la Phase 1 applique par défaut les règles du cahier/annexe (pas de mur de compte, pas de badge Match%, nav "Préparation", bandeau décoratif générique, source par document) ; à confirmer ou corriger après revue visuelle | 2026-09-28 |
| 4 | Phase 1 en écrans/valeurs statiques `DEMO`, sans Supabase | Validé implicitement (« lance la Phase 1 ») | 2026-09-28 |

La Phase 1 (design system + shell responsive + écrans de démonstration) démarre sur cette base. Le point 3 reste ouvert : les écrans construits reflètent les règles du cahier plutôt que les maquettes sur ces 5 points précis, à valider ou ajuster lors de la revue.
