# KounKour — Instructions pour l'agent de développement

Ce dépôt implémente **KounKour**, plateforme marocaine de concours publics et
communauté. Sources de vérité produit : `docs/cahier-des-charges.md` et
`docs/annexe-design-ux-ui.md` (transcriptions versionnées des documents
fournis par le propriétaire). Statut d'avancement et plan par phases :
`docs/phase-0-audit-architecture.md`.

## Règles non négociables

1. **Une phase à la fois.** Ne jamais construire au-delà de la phase en
   cours (voir le plan dans `docs/phase-0-audit-architecture.md` §6) sans
   validation explicite du propriétaire pour la phase suivante.
2. **Jamais de donnée inventée.** Pas de dates, conditions, diplômes,
   nombre de postes, liens officiels, documents ou résultats fabriqués. Un
   champ inconnu reste "Non précisé", jamais zéro ni une valeur plausible.
   Toute donnée de démonstration est étiquetée clairement `DEMO / DONNÉES
   FICTIVES`.
3. **Provenance obligatoire.** Toute donnée de concours (critère, document,
   date) doit porter sa source et sa date de vérification.
4. **Pas de fonctionnalité présentée comme terminée sans test de bout en
   bout.** Pas de faux boutons, fausses notifications, faux scraping,
   fausses intégrations.
5. **Simplicité et coût maîtrisé.** Tout service ou API payante nécessite :
   utilité, coût, alternative gratuite, et l'accord explicite du
   propriétaire avant ajout.
6. **Sécurité serveur, pas client.** RLS obligatoire sur toute table
   exposée ; toute permission sensible est vérifiée côté serveur — masquer
   un bouton côté client n'est jamais une mesure de sécurité.
7. **Secrets** uniquement en variables d'environnement serveur — jamais
   dans Git, les logs, le HTML ou le bundle client. `.env.example` ne
   contient que des noms.
8. **Dates locales.** "Aujourd'hui" et les échéances se calculent dans le
   fuseau de l'utilisateur (Maroc), jamais un UTC brut côté client.
9. **Bilingue dès la V1.** Chaque page majeure fonctionne en arabe (RTL) et
   français (LTR) ; CSS logique (`start`/`end`) plutôt que `left`/`right`.
10. **Radar et Smart Match restent V2.** Ne jamais faire apparaître ces
    fonctionnalités comme actives dans l'UI avant que leurs garde-fous
    respectifs existent réellement (file de validation humaine pour Radar,
    résultat en trois groupes + mention légale pour Smart Match — voir
    cahier §13-14).
11. **Ne jamais supprimer/remplacer une fonctionnalité spécifiée** sans
    signaler le conflit et demander une décision au propriétaire.
12. **Après chaque phase** : livrer fichiers modifiés, migrations,
    commandes d'installation, variables d'environnement (noms), tests
    exécutés et résultats, limites connues, procédure de rollback.

## Contrat de données inter-modules

Une seule source de vérité par concept partagé (profil, concours, critère,
session QCM…). Un module qui a besoin d'une donnée possédée par un autre
passe par ce module — jamais de copie/recalcul local. Documenter tout
nouveau concept partagé dans `docs/phase-0-audit-architecture.md` avant
d'en coder une seconde implémentation.

## Structure

Voir `src/modules/README.md` pour l'organisation modulaire et la phase de
rattachement de chaque module.
