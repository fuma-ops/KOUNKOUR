// Données de démonstration FICTIVES — cahier des charges §0.
export interface DemoQcmSet {
  id: string;
  title: { fr: string; ar: string };
  category: { fr: string; ar: string };
  level: { fr: string; ar: string };
  questionCount: number;
  durationMin: number | null;
}

export const demoQcmSets: DemoQcmSet[] = [
  {
    id: "culture-generale-1",
    title: { fr: "Culture générale — session 1", ar: "الثقافة العامة — الحصة 1" },
    category: { fr: "Culture générale", ar: "الثقافة العامة" },
    level: { fr: "Niveau moyen", ar: "مستوى متوسط" },
    questionCount: 25,
    durationMin: 30,
  },
  {
    id: "psychotechnique-1",
    title: { fr: "Tests psychotechniques — série A", ar: "اختبارات نفسية تقنية — سلسلة أ" },
    category: { fr: "Psychotechnique", ar: "نفسي تقني" },
    level: { fr: "Entraînement libre", ar: "تدريب حر" },
    questionCount: 20,
    durationMin: null,
  },
  {
    id: "francais-1",
    title: { fr: "Français — grammaire et compréhension", ar: "الفرنسية — القواعد والفهم" },
    category: { fr: "Français", ar: "الفرنسية" },
    level: { fr: "Niveau débutant", ar: "مستوى مبتدئ" },
    questionCount: 15,
    durationMin: 20,
  },
];
