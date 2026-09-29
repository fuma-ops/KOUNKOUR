// Smart Match V1 — moteur de règles déterministe (cahier §14).
//
// Compare un profil facultatif aux critères d'un concours et classe chaque
// critère en 3 groupes. Principes :
//   - jamais de faux négatif : un critère inconnu/ambigu → "à vérifier",
//     jamais "ne correspond pas" ;
//   - le SEUL "ne correspond pas" ferme est une date limite dépassée (fait
//     objectif) ;
//   - aucune conclusion globale d'admissibilité (c'est l'organisme qui décide).
// Fonctions pures, testables sans base ni réseau.

export type MatchStatus = "match" | "verify" | "nomatch";

export interface MatchProfile {
  diplomaLevel: number | null; // Bac +N (0 = Bac)
  specialty: string | null;
  region: string | null;
  domain: string | null;
}

// Sous-ensemble du concours nécessaire à l'évaluation.
export interface MatchContestInput {
  diplomaText: string | null; // ex. "Bac +2"
  regionText: string | null; // ex. "Plusieurs régions" ou "Casablanca-Settat"
  title: string | null;
  deadlineISO: string | null;
  status: string; // statut éditorial
}

export interface MatchCriterion {
  key: "deadline" | "diploma" | "region" | "specialty";
  status: MatchStatus;
  label: string; // libellé du critère
  detail: string; // règle appliquée / explication
}

export interface MatchResult {
  criteria: MatchCriterion[];
  // La mention légale est obligatoire (cahier §14) — portée par l'UI, exposée
  // ici pour garantir qu'elle accompagne toujours un résultat.
  disclaimer: string;
}

export const MATCH_DISCLAIMER =
  "Cette estimation ne remplace pas la lecture de l'annonce officielle ; l'organisme recruteur décide de l'admissibilité.";

function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Extrait un niveau "Bac +N" d'un texte libre FR/AR. null si non reconnaissable.
export function parseDiplomaLevel(text: string | null): number | null {
  if (!text) return null;
  const n = normalize(text);

  const bacPlus = n.match(/bac\s*\+?\s*(\d)/) || n.match(/\+\s*(\d)/);
  if (bacPlus) return Number(bacPlus[1]);

  if (/\b(doctorat|phd|these)\b/.test(n)) return 8;
  if (/\b(master|magistere|ingenieur|ingenieurs?)\b/.test(n)) return 5;
  if (/\b(licence|licencie)\b/.test(n)) return 3;
  if (/\b(technicien\s*specialise|dut|bts|deug|deust|bac\s*\+\s*2)\b/.test(n)) return 2;
  if (/\b(baccalaureat|bac)\b/.test(n)) return 0;
  return null;
}

function daysBetweenTodayAnd(dateISO: string, todayISO: string): number {
  const a = new Date(dateISO + "T00:00:00").getTime();
  const b = new Date(todayISO + "T00:00:00").getTime();
  return Math.round((a - b) / 86400000);
}

// Régions "ouvertes à tous" : le critère région ne restreint pas.
function isNationwide(regionText: string): boolean {
  const n = normalize(regionText);
  return /plusieurs|toutes|national|tout le maroc|ensemble du/.test(n);
}

export function evaluateMatch(
  profile: MatchProfile,
  contest: MatchContestInput,
  todayISO: string
): MatchResult {
  const criteria: MatchCriterion[] = [];

  // 1) Date limite — seul "nomatch" ferme possible.
  if (contest.status === "cloture" || contest.status === "annule" || contest.status === "resultats_publies") {
    criteria.push({
      key: "deadline",
      status: "nomatch",
      label: "Candidatures",
      detail: "Ce concours n'accepte plus de candidatures.",
    });
  } else if (contest.deadlineISO) {
    const days = daysBetweenTodayAnd(contest.deadlineISO, todayISO);
    if (days < 0) {
      criteria.push({
        key: "deadline",
        status: "nomatch",
        label: "Date limite",
        detail: "La date limite de candidature est dépassée.",
      });
    } else {
      criteria.push({
        key: "deadline",
        status: "match",
        label: "Date limite",
        detail: `Candidatures encore ouvertes (${days} jour(s) restant(s)).`,
      });
    }
  } else {
    criteria.push({
      key: "deadline",
      status: "verify",
      label: "Date limite",
      detail: "Date limite non précisée dans l'annonce — à vérifier.",
    });
  }

  // 2) Diplôme.
  const required = parseDiplomaLevel(contest.diplomaText);
  if (profile.diplomaLevel === null) {
    criteria.push({
      key: "diploma",
      status: "verify",
      label: "Diplôme",
      detail: "Renseignez votre niveau de diplôme pour évaluer ce critère.",
    });
  } else if (required === null) {
    criteria.push({
      key: "diploma",
      status: "verify",
      label: "Diplôme",
      detail: "Le niveau exigé n'a pas pu être déterminé automatiquement — à vérifier dans l'annonce.",
    });
  } else if (profile.diplomaLevel >= required) {
    criteria.push({
      key: "diploma",
      status: "match",
      label: "Diplôme",
      detail: `Votre niveau (Bac +${profile.diplomaLevel}) atteint le niveau demandé (Bac +${required}).`,
    });
  } else {
    // Niveau apparemment inférieur : on NE conclut pas "non éligible"
    // (équivalences possibles) → à vérifier.
    criteria.push({
      key: "diploma",
      status: "verify",
      label: "Diplôme",
      detail: `Le niveau demandé (Bac +${required}) semble supérieur au vôtre (Bac +${profile.diplomaLevel}) ; vérifiez les équivalences.`,
    });
  }

  // 3) Région.
  if (!profile.region) {
    criteria.push({
      key: "region",
      status: "verify",
      label: "Région",
      detail: "Renseignez votre région préférée pour évaluer ce critère.",
    });
  } else if (!contest.regionText) {
    criteria.push({
      key: "region",
      status: "verify",
      label: "Région",
      detail: "Région non précisée dans l'annonce — à vérifier.",
    });
  } else if (isNationwide(contest.regionText)) {
    criteria.push({
      key: "region",
      status: "match",
      label: "Région",
      detail: "Concours ouvert sur plusieurs régions.",
    });
  } else if (normalize(contest.regionText).includes(normalize(profile.region))) {
    criteria.push({
      key: "region",
      status: "match",
      label: "Région",
      detail: `Votre région (${profile.region}) correspond à la région du concours.`,
    });
  } else {
    // Noms de régions hétérogènes : ne pas conclure négatif → à vérifier.
    criteria.push({
      key: "region",
      status: "verify",
      label: "Région",
      detail: `La région du concours (${contest.regionText}) diffère de la vôtre (${profile.region}) — à vérifier.`,
    });
  }

  // 4) Spécialité (optionnelle).
  if (profile.specialty) {
    const haystack = normalize([contest.title, contest.diplomaText].filter(Boolean).join(" "));
    if (haystack.includes(normalize(profile.specialty))) {
      criteria.push({
        key: "specialty",
        status: "match",
        label: "Spécialité",
        detail: `Votre spécialité (${profile.specialty}) apparaît dans l'annonce.`,
      });
    } else {
      criteria.push({
        key: "specialty",
        status: "verify",
        label: "Spécialité",
        detail: "Spécialité non retrouvée automatiquement dans l'annonce — à vérifier.",
      });
    }
  }

  return { criteria, disclaimer: MATCH_DISCLAIMER };
}

export function groupCriteria(result: MatchResult) {
  return {
    match: result.criteria.filter((c) => c.status === "match"),
    verify: result.criteria.filter((c) => c.status === "verify"),
    nomatch: result.criteria.filter((c) => c.status === "nomatch"),
  };
}
