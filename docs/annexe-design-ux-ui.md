# KounKour — Annexe Design & UX/UI

_Direction artistique et expérience utilisateur — intégrée au cahier des charges V2.0_

> **Objectif** : une interface simple, professionnelle, chaleureuse et confortable, qui donne envie de revenir parce qu'elle aide réellement le candidat à avancer — sans surcharge ni mécanismes manipulateurs.

Transcrit tel quel depuis `KounKour_Annexe_Design_UX_UI.pdf` (fourni par le propriétaire). En cas de doute sur une formulation, le PDF original fait foi.

## 1. Direction artistique générale

KounKour doit ressembler à une application EdTech / service public moderne, pas à un portail administratif chargé ni à un réseau social bruyant. L'interface doit inspirer confiance, clarté et progression.

### Principes visuels

- Minimalisme utile : beaucoup d'espace blanc, hiérarchie claire, peu d'éléments simultanés et aucun décor qui gêne la lecture.
- Professionnel mais humain : cartes douces, coins modérément arrondis, micro-illustrations sobres et ton encourageant sans infantiliser.
- Mobile-first : concevoir d'abord pour écran Android courant, puis adapter tablette et desktop.
- Une action principale claire par écran; actions secondaires moins visibles mais faciles à trouver.
- Éviter les animations permanentes, pop-ups répétitifs, compteurs artificiels, fausses urgences et scroll infini agressif. L'engagement doit venir de l'utilité, pas de la manipulation.

### Palette indicative

| Usage | Couleur indicative | Règle |
| --- | --- | --- |
| Primary / actions | Bordeaux profond `#8D174B` | CTA, liens actifs, éléments de marque. |
| Accent | Rose/magenta `#C73578` | Badges, petites mises en évidence; avec parcimonie. |
| Fond principal | `#FFFDFE` ou blanc cassé | Fond clair et reposant. |
| Surface / cartes | `#FFFFFF` | Cartes et panneaux, bordure légère. |
| Fond secondaire | `#F8F2F5` | Sections alternatives et filtres. |
| Texte principal | `#242126` | Contraste fort, éviter texte gris trop pâle. |
| Succès / officiel | Vert sobre | Uniquement statut positif/vérifié, pas décoration. |
| Alerte / échéance | Ambre sobre | Avertissement informatif, jamais fausse urgence. |

> Les couleurs exactes doivent être validées sur prototypes et testées pour contraste WCAG AA. Ne pas utiliser la couleur seule pour communiquer un statut.

## 2. Design system et composants

- Définir tokens centralisés : couleurs, typographie, tailles, espacements, rayons, ombres, breakpoints, z-index et états focus/disabled/loading.
- Typographie : police lisible pour le français et une police arabe de bonne qualité; vérifier les caractères arabes, chiffres, ponctuation et mélange RTL/LTR.
- Échelle d'espacement cohérente (ex. 4/8/12/16/24/32 px) et grille responsive.
- Composants réutilisables : bouton primaire/secondaire/texte, champ, recherche, select, date, tabs, badge de statut, carte concours, carte QCM, post, commentaire, modal, toast, skeleton, pagination, empty state et error state.
- Boutons et zones tactiles d'au moins environ 44×44 CSS px lorsque possible. Focus clavier visible, labels persistants et messages d'erreur proches du champ.
- Ombres légères et bordures fines; éviter les cartes imbriquées sans raison, les dégradés excessifs et les effets glassmorphism lourds.

## 3. Structure des écrans

### Accueil

- En-tête compact : logo, langue, connexion/profil et notifications si connecté.
- Bloc de bienvenue court avec recherche centrale très visible : "Quel concours recherchez-vous ?".
- Section "Nouveaux concours" en cartes simples, avec statut, administration, diplôme, date limite et bouton détails.
- Section "Dates limites proches" triée par date réelle et affichant clairement la date exacte.
- Accès rapide à Préparation, QCM et Communauté; aperçu limité des discussions récentes.
- Ne pas surcharger l'accueil : limiter le nombre de sections et utiliser "Voir tout" vers les pages dédiées.

### Liste des concours

- Recherche en haut, filtres accessibles dans un panneau/drawer sur mobile et visibles en barre latérale sur desktop.
- Afficher filtres actifs sous forme de chips supprimables; bouton effacer filtres.
- Cartes en format vertical sur mobile; informations clés scannables en 2–3 secondes.
- Indiquer "Mis à jour le…" seulement si une vérification réelle est enregistrée; distinguer annonce officielle et résumé KounKour.
- État vide utile : proposer d'enlever un filtre ou consulter les concours récents; ne pas afficher une page blanche.

### Fiche concours

- Au-dessus de la ligne de flottaison : titre, administration, statut, date limite, bouton source officielle et favori.
- Résumé structuré par sections repliables : conditions, diplômes, postes, dossier, candidature, épreuves, documents et source.
- Tableau ou liste claire pour les critères; sur téléphone, préférer des blocs lisibles aux grands tableaux horizontaux.
- Afficher l'avertissement que l'annonce officielle prévaut et lier directement la source.
- Actions secondaires : partager, enregistrer, rappel, signaler une erreur, rejoindre la discussion.

## 4. Communauté et préparation

### Communauté

- Fil lisible avec typographie confortable, espaces entre publications et identité visuelle discrète.
- Chaque publication montre auteur/pseudonyme, date, catégorie, concours lié si applicable, texte, pièce jointe et actions utiles.
- Prioriser les réponses utiles et les discussions récentes avec un contrôle de tri compréhensible; éviter les mécaniques de popularité excessives.
- Composer une question en étapes simples : sujet, concours lié facultatif, description, pièce jointe et aperçu.
- Séparer visuellement contenu officiel, conseils de membres et réponses vérifiées. Ne jamais laisser croire qu'un avis communautaire est une règle officielle.
- Prévoir signaler, masquer et modération accessibles sans encombrer chaque carte.

### QCM / apprentissage

- Écran sans distractions : une question claire, options espacées, progression et numéro de question.
- Afficher le temps uniquement pour les examens chronométrés; permettre mode entraînement sans pression si le QCM le prévoit.
- Après réponse ou soumission, expliquer pourquoi la réponse est correcte et afficher une correction pédagogique.
- Écran résultat : score, points à revoir, correction et bouton "Revoir mes erreurs" ou "Recommencer".
- Sauvegarder la progression connectée avec indication réelle; ne jamais simuler une sauvegarde ou une série/streak inexistante.

### Profil et navigation

- Navigation mobile persistante avec cinq entrées : Accueil, Concours, Préparation, Communauté, Profil.
- Mettre en évidence l'onglet actif; conserver une navigation cohérente entre pages.
- Profil organisé en sections : mes concours, mes résultats, mes publications, notifications, préférences et confidentialité.
- Ne pas demander de créer un compte avant de montrer la valeur du service; demander la connexion au moment où elle est utile (favori synchronisé, sauvegarde, publication).

## 5. Rétention saine et confort d'usage

La durée de session n'est pas une fin en soi. Le produit doit aider l'utilisateur à trouver une annonce, comprendre ses conditions, préparer une épreuve et échanger efficacement. Les mécanismes de retour doivent être transparents et contrôlables.

- Personnalisation facultative : choix des domaines, diplômes et régions pour afficher des concours pertinents, sans masquer la liste complète.
- Rappels utiles et réglables : échéance officielle, nouveau concours correspondant aux préférences, réponse à une question suivie.
- Continuité : reprendre un QCM là où l'utilisateur s'est arrêté si cette fonction est réellement disponible; retrouver favoris et historique.
- Progression honnête : historique des QCM et thèmes à réviser, sans culpabiliser ni inventer des séries quotidiennes.
- Contenu frais avec date/source : nouveaux concours, corrections et réponses, sans notifications excessives.
- Contrôle utilisateur : fréquence des notifications, désactivation, suppression du profil et préférences faciles à modifier.
- Performance : chargement rapide, skeletons courts, images optimisées, pas d'animation bloquant l'accès à l'information.

## 6. Motion, micro-interactions et états

- Animations courtes et discrètes (environ 150–250 ms) pour transitions d'état, ouverture de panneau et confirmation; respecter `prefers-reduced-motion`.
- Feedback immédiat après favori, réponse QCM, publication ou filtre, uniquement lorsque l'action serveur a réussi.
- Skeletons au chargement, erreurs avec action de reprise, confirmations avant suppression, toast non bloquant après succès.
- Pas d'auto-play vidéo/son, de pop-up plein écran à répétition ni d'éléments qui sautent pendant le chargement.
- Tester les interactions au clavier et au tactile; ne pas dépendre du hover sur mobile.

## 7. Design responsive, RTL/LTR et accessibilité

- Tester au minimum petits écrans Android, écran moyen, tablette et desktop; les cartes doivent s'adapter sans texte coupé.
- Utiliser les propriétés CSS logiques (start/end, margin-inline) plutôt que left/right fixes pour prendre en charge RTL.
- Vérifier numéros de concours, dates, URLs, emails et textes mixtes AR/FR avec direction isolée (bidi) lorsque nécessaire.
- Contraste WCAG AA visé pour texte normal; états focus visibles; ordre de tabulation cohérent; titres hiérarchisés.
- Formulaires avec label, aide, erreurs accessibles; icônes accompagnées de texte ou libellé accessible.
- Prévoir zoom navigateur et taille de texte sans perte de contenu; ne pas verrouiller le zoom.

## 8. Instructions à ajouter au prompt de Cloud Code

Copier ce bloc dans le prompt de référence ou l'ajouter au cahier des charges maître :

> "Avant de développer les pages, propose un mini design system et des maquettes/wireframes pour Accueil, Liste concours, Détail concours, QCM, Communauté et Profil. Respecte l'annexe Design & UX/UI. Attends ma validation visuelle avant d'implémenter l'ensemble. Construis ensuite les composants réutilisables et applique-les de manière cohérente. Priorité à une interface mobile-first, simple, premium/professionnelle, lisible, rapide, bilingue AR/FR avec RTL/LTR impeccable. L'engagement doit être sain : utilité, progression réelle, rappels choisis par l'utilisateur et contenu fiable; aucun dark pattern, fausse urgence, faux compteur, fausse notification ou bouton décoratif. Pour chaque écran, montre les états normal, loading, vide, erreur et succès. N'invente pas les concours ni les contenus officiels."

Fin de l'annexe. Cette annexe complète le cahier des charges fonctionnel et technique KounKour V2.0; en cas de conflit visuel, le propriétaire valide les maquettes avant codage.

## Addendum — maquettes fournies (2026-09-28)

Le propriétaire a fourni des maquettes haute-fidélité (Splash/Onboarding, Accueil non-connecté/connecté, Liste des concours, Fiche concours) destinées à l'**application mobile**; le **web** suit l'architecture Next.js/PWA du cahier des charges (§17), les deux consommant la même logique métier/API.

Écarts identifiés entre ces maquettes et les règles ci-dessus, à corriger avant de les considérer comme référence de build définitive :

1. **Onboarding sans échappatoire** : le dernier écran ne propose que "Créer un compte" / "Se connecter", sans accès direct à la consultation publique — contredit §3/§10 du cahier et §4 de cette annexe ("ne pas demander de créer un compte avant de montrer la valeur"). Ajouter un accès "continuer sans compte".
2. **Badges de correspondance ("Match 95 %")** affichés dès l'accueil connecté : relève de Smart Match (V2, chapitre 14 du cahier), qui exige un résultat en trois groupes explicables et jamais un pourcentage brut présenté comme une certitude. Ne pas construire cet écran en Phase 1/MVP; le réserver à la Phase 9 avec le garde-fou textuel obligatoire.
3. **Nom de l'onglet de navigation** : maquettes = "QCM", cahier/annexe = "Préparation" (hub englobant QCM + examens + ressources). À trancher explicitement avant Phase 1.
4. **Photo d'en-tête de bâtiment institutionnel** répétée sur plusieurs fiches concours : à clarifier comme visuel décoratif générique, jamais une photo présentée comme officielle/spécifique à l'administration concernée (cf. §0 du cahier — ne jamais fabriquer un élément qui semble officiel).
5. **Provenance des documents** : afficher une source par document (ex. "Source : interieur.gov.ma"), pas seulement un bloc générique "Liens utiles" en bas de page, conformément au §7 du cahier.

Ces cinq points doivent être tranchés par le propriétaire avant que la Phase 1 (Fondations UI) ne fige les écrans correspondants.
