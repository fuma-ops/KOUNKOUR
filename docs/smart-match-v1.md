# Smart Match V1 — rapport

Statut : livré et testé. Module de correspondance profil ↔ concours, moteur de
règles déterministe (cahier §14). Aucune dépendance externe, aucune IA.

## 1. Ce qui est livré

- **Table `smart_match_preferences`** (migration `20260929140000`) : profil
  facultatif et minimal (niveau de diplôme, spécialité, région, domaine,
  consentement). RLS propriétaire (chacun ne voit/écrit que les siennes) —
  vérifié.
- **Moteur de règles** (`src/modules/smart-match/rules.ts`) : fonctions pures.
  Chaque critère est classé en 3 groupes (correspond / à vérifier / ne
  correspond pas) avec la règle appliquée. Principes du cahier §14 respectés :
  - un critère inconnu/ambigu → « à vérifier », **jamais** « ne correspond pas » ;
  - le seul « ne correspond pas » ferme = candidatures closes (date dépassée ou
    statut clôturé/annulé/résultats publiés) ;
  - aucune conclusion globale d'admissibilité ;
  - mention légale obligatoire toujours jointe au résultat.
- **Tests Vitest** (`rules.test.ts`, 13 tests) sur les cas limites : profil vide,
  date dépassée, diplôme équivalent/inférieur/illisible, région nationale/
  différente, spécialité, présence de la mention légale.
- **Formulaire de profil** `/profil/smart-match` (modifiable + suppression du
  profil) et lien depuis le profil connecté.
- **Panneau « Ma correspondance »** sur la fiche concours (connecté) : 3 groupes
  explicables + mention légale. Invité non connecté : panneau masqué. Connecté
  sans profil : invitation à renseigner le profil.
- Vitest installé ; script `npm test`.

## 2. Limites connues (V1)

- **Explications des critères en français uniquement** ; les intitulés de
  groupes, le formulaire et la mention légale sont bilingues FR/AR, mais le
  détail par critère généré par le moteur reste en français. Localisation AR du
  détail = évolution future.
- **Alertes opt-in** (nouveau concours correspondant au profil) : non incluses —
  dépendent de l'infra de notifications (Phase 6). Le cahier les prévoit ; à
  ajouter ensuite.
- Correspondance basée sur les champs structurés disponibles (diplôme, région,
  spécialité, date). S'enrichira quand `contest_criteria` sera davantage rempli.

## 3. Tests

| Test | Résultat |
| --- | --- |
| `npm test` (13 tests de règles) | ✅ |
| `npm run build` | ✅ `/profil/smart-match` généré |
| RLS préférences (autre utilisateur ne voit rien) | ✅ |

## 4. Rollback

- Base : supprimer la table `smart_match_preferences`.
- Code : `git revert` du commit Smart Match V1.

## 5. Suite

Prochain bloc de la priorité V2 : **fondations Radar** (modèle de données
sources/candidats, gestion des sources en admin, écran de validation humaine),
sans le worker de collecte — celui-ci attend les décisions hébergement +
juridique + test OCR (voir mon récap au propriétaire).
