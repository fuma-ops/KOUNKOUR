import { describe, it, expect } from "vitest";
import {
  evaluateMatch,
  groupCriteria,
  parseDiplomaLevel,
  MATCH_DISCLAIMER,
  type MatchProfile,
  type MatchContestInput,
} from "./rules";

const TODAY = "2026-09-29";

const emptyProfile: MatchProfile = {
  diplomaLevel: null,
  specialty: null,
  region: null,
  domain: null,
};

function contest(overrides: Partial<MatchContestInput> = {}): MatchContestInput {
  return {
    diplomaText: "Bac +2",
    regionText: "Plusieurs régions",
    title: "Concours de techniciens",
    deadlineISO: "2026-12-31",
    status: "publie",
    ...overrides,
  };
}

describe("parseDiplomaLevel", () => {
  it("reconnaît Bac +N", () => {
    expect(parseDiplomaLevel("Bac +2")).toBe(2);
    expect(parseDiplomaLevel("bac+5")).toBe(5);
  });
  it("reconnaît les intitulés courants", () => {
    expect(parseDiplomaLevel("Licence professionnelle")).toBe(3);
    expect(parseDiplomaLevel("Master spécialisé")).toBe(5);
    expect(parseDiplomaLevel("Technicien spécialisé")).toBe(2);
    expect(parseDiplomaLevel("Doctorat")).toBe(8);
  });
  it("renvoie null si non reconnaissable", () => {
    expect(parseDiplomaLevel("Diplôme quelconque")).toBeNull();
    expect(parseDiplomaLevel(null)).toBeNull();
  });
});

describe("evaluateMatch — cas limites (cahier §14)", () => {
  it("profil vide : tous les critères de profil sont 'à vérifier', jamais 'ne correspond pas'", () => {
    const res = evaluateMatch(emptyProfile, contest(), TODAY);
    const g = groupCriteria(res);
    expect(g.nomatch).toHaveLength(0);
    // date limite ouverte => match ; diplôme/région => verify
    expect(g.verify.some((c) => c.key === "diploma")).toBe(true);
    expect(g.verify.some((c) => c.key === "region")).toBe(true);
    expect(res.disclaimer).toBe(MATCH_DISCLAIMER);
  });

  it("date limite dépassée : seul 'ne correspond pas' ferme", () => {
    const res = evaluateMatch(emptyProfile, contest({ deadlineISO: "2020-01-01" }), TODAY);
    const g = groupCriteria(res);
    expect(g.nomatch.some((c) => c.key === "deadline")).toBe(true);
  });

  it("statut clôturé : candidatures fermées", () => {
    const res = evaluateMatch(emptyProfile, contest({ status: "cloture" }), TODAY);
    const g = groupCriteria(res);
    expect(g.nomatch.some((c) => c.key === "deadline")).toBe(true);
  });

  it("diplôme suffisant : correspond", () => {
    const res = evaluateMatch({ ...emptyProfile, diplomaLevel: 5 }, contest({ diplomaText: "Bac +2" }), TODAY);
    const g = groupCriteria(res);
    expect(g.match.some((c) => c.key === "diploma")).toBe(true);
  });

  it("diplôme apparemment inférieur : 'à vérifier' (équivalences), jamais 'ne correspond pas'", () => {
    const res = evaluateMatch({ ...emptyProfile, diplomaLevel: 2 }, contest({ diplomaText: "Bac +5" }), TODAY);
    const g = groupCriteria(res);
    expect(g.verify.some((c) => c.key === "diploma")).toBe(true);
    expect(g.nomatch.some((c) => c.key === "diploma")).toBe(false);
  });

  it("niveau exigé illisible : 'à vérifier'", () => {
    const res = evaluateMatch(
      { ...emptyProfile, diplomaLevel: 3 },
      contest({ diplomaText: "Diplôme non standard" }),
      TODAY
    );
    const g = groupCriteria(res);
    expect(g.verify.some((c) => c.key === "diploma")).toBe(true);
  });

  it("région nationale : correspond quelle que soit la région du profil", () => {
    const res = evaluateMatch(
      { ...emptyProfile, region: "Souss-Massa" },
      contest({ regionText: "Plusieurs régions" }),
      TODAY
    );
    const g = groupCriteria(res);
    expect(g.match.some((c) => c.key === "region")).toBe(true);
  });

  it("région différente : 'à vérifier' (noms hétérogènes), jamais 'ne correspond pas'", () => {
    const res = evaluateMatch(
      { ...emptyProfile, region: "Souss-Massa" },
      contest({ regionText: "Casablanca-Settat" }),
      TODAY
    );
    const g = groupCriteria(res);
    expect(g.verify.some((c) => c.key === "region")).toBe(true);
    expect(g.nomatch.some((c) => c.key === "region")).toBe(false);
  });

  it("spécialité présente dans l'annonce : correspond", () => {
    const res = evaluateMatch(
      { ...emptyProfile, specialty: "informatique" },
      contest({ title: "Concours de techniciens en informatique" }),
      TODAY
    );
    const g = groupCriteria(res);
    expect(g.match.some((c) => c.key === "specialty")).toBe(true);
  });

  it("la mention légale accompagne toujours le résultat", () => {
    const res = evaluateMatch(emptyProfile, contest(), TODAY);
    expect(res.disclaimer).toContain("ne remplace pas");
  });
});
