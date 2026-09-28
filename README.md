# KounKour

Plateforme marocaine mobile-first de concours publics et communauté
d'entraide. Voir `docs/cahier-des-charges.md` (spécification fonctionnelle
et technique) et `docs/annexe-design-ux-ui.md` (direction artistique) pour
la référence produit, et `docs/phase-0-audit-architecture.md` pour l'état
d'avancement et le plan par phases.

> **Statut** : Phase 0 (audit et cadrage) — en attente de validation avant
> le début de la Phase 1. Ce squelette ne contient volontairement aucune
> fonctionnalité finale.

## Prérequis

- Node.js 20+
- npm

## Installation locale

```bash
npm install
cp .env.example .env.local   # renseigner les valeurs réelles localement, jamais dans Git
```

## Lancement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Autres commandes

```bash
npm run build       # build de production
npm run start       # sert le build de production
npm run typecheck   # vérification TypeScript sans émission
```

## Tests

Aucun test automatisé pour l'instant (Phase 0 : squelette technique
uniquement). Vitest (unitaire) et Playwright (E2E) seront introduits à
partir de la Phase 1/2, conformément au plan de `docs/phase-0-audit-architecture.md`.

## Migrations et données

Aucune base de données à ce stade (Supabase arrive en Phase 2). Aucune
donnée, réelle ou fictive, n'est présente dans ce squelette.

## Déploiement et rollback

Pas encore configuré (prévu en Phase 7 — voir le plan par phases). Tant
qu'aucun déploiement public n'existe, il n'y a pas de procédure de
rollback à documenter.

## Structure du projet

```
src/
  app/            # routes Next.js App Router
  modules/        # un dossier par domaine métier (voir src/modules/README.md)
docs/
  cahier-des-charges.md         # spécification produit (source de vérité)
  annexe-design-ux-ui.md        # direction artistique et UX
  phase-0-audit-architecture.md # audit, architecture, plan par phases
```

## Règles de développement

Voir `CLAUDE.md` à la racine du dépôt — règles non négociables issues du
cahier des charges (pas de données inventées, RLS obligatoire, une phase à
la fois, etc.).
