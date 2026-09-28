// Données de démonstration FICTIVES — cahier des charges §0.
export type PostTag = "official" | "member" | "verified";

export interface DemoPost {
  id: string;
  author: string;
  dateISO: string;
  category: { fr: string; ar: string };
  text: { fr: string; ar: string };
  tag: PostTag;
  replies: number;
}

export const demoPosts: DemoPost[] = [
  {
    id: "1",
    author: "Candidat_2026",
    dateISO: "2026-09-20",
    category: { fr: "Question générale", ar: "سؤال عام" },
    text: {
      fr: "Exemple fictif de question posée par un candidat, à but de démonstration d'affichage.",
      ar: "مثال وهمي لسؤال طرحه مترشح، لغرض عرض الشكل فقط.",
    },
    tag: "member",
    replies: 3,
  },
  {
    id: "2",
    author: "Modérateur_KounKour",
    dateISO: "2026-09-18",
    category: { fr: "Annonce de ressource", ar: "إعلان عن مورد" },
    text: {
      fr: "Exemple fictif de réponse vérifiée, à but de démonstration d'affichage.",
      ar: "مثال وهمي لإجابة موثقة، لغرض عرض الشكل فقط.",
    },
    tag: "verified",
    replies: 1,
  },
];
