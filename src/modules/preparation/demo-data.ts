// Données de démonstration FICTIVES — cahier des charges §0.
export interface DemoQcmSet {
  id: string;
  title: { fr: string; ar: string };
  category: { fr: string; ar: string };
  level: { fr: string; ar: string };
  questionCount: number;
  durationMin: number | null;
}

export interface DemoQcmOption {
  id: string;
  text: { fr: string; ar: string };
}

export interface DemoQcmQuestion {
  id: string;
  text: { fr: string; ar: string };
  options: DemoQcmOption[];
  correctOptionId: string;
  explanation: { fr: string; ar: string };
}

// Questions de démonstration FICTIVES, propres à chaque QCM (clé = DemoQcmSet.id).
// Aucune ne provient d'une annale ou d'un concours réel — cahier des charges §0/§8.
export const demoQcmQuestions: Record<string, DemoQcmQuestion[]> = {
  "culture-generale-1": [
    {
      id: "q1",
      text: {
        fr: "Quelle est la capitale administrative du Maroc ?",
        ar: "ما هي العاصمة الإدارية للمغرب؟",
      },
      options: [
        { id: "a", text: { fr: "Casablanca", ar: "الدار البيضاء" } },
        { id: "b", text: { fr: "Rabat", ar: "الرباط" } },
        { id: "c", text: { fr: "Fès", ar: "فاس" } },
        { id: "d", text: { fr: "Marrakech", ar: "مراكش" } },
      ],
      correctOptionId: "b",
      explanation: {
        fr: "Rabat est la capitale administrative et politique du Royaume.",
        ar: "الرباط هي العاصمة الإدارية والسياسية للمملكة.",
      },
    },
    {
      id: "q2",
      text: {
        fr: "Combien de régions compte le découpage administratif actuel du Maroc ?",
        ar: "كم عدد الجهات في التقسيم الإداري الحالي للمغرب؟",
      },
      options: [
        { id: "a", text: { fr: "10", ar: "10" } },
        { id: "b", text: { fr: "12", ar: "12" } },
        { id: "c", text: { fr: "16", ar: "16" } },
        { id: "d", text: { fr: "Non précisé dans l'annonce", ar: "غير محدد في الإعلان" } },
      ],
      correctOptionId: "b",
      explanation: {
        fr: "Le découpage régional en vigueur compte 12 régions.",
        ar: "التقسيم الجهوي المعمول به يضم 12 جهة.",
      },
    },
    {
      id: "q3",
      text: {
        fr: "Quel jour férié commémore la Marche Verte ?",
        ar: "ما هو التاريخ الذي يخلد ذكرى المسيرة الخضراء؟",
      },
      options: [
        { id: "a", text: { fr: "6 novembre", ar: "6 نونبر" } },
        { id: "b", text: { fr: "18 novembre", ar: "18 نونبر" } },
        { id: "c", text: { fr: "3 mars", ar: "3 مارس" } },
        { id: "d", text: { fr: "1er mai", ar: "فاتح ماي" } },
      ],
      correctOptionId: "a",
      explanation: {
        fr: "La Marche Verte est commémorée le 6 novembre.",
        ar: "يتم إحياء ذكرى المسيرة الخضراء في 6 نونبر.",
      },
    },
  ],
  "psychotechnique-1": [
    {
      id: "q1",
      text: {
        fr: "Complétez la suite logique : 2, 4, 8, 16, … ?",
        ar: "أكمل السلسلة المنطقية: 2، 4، 8، 16، …؟",
      },
      options: [
        { id: "a", text: { fr: "20", ar: "20" } },
        { id: "b", text: { fr: "24", ar: "24" } },
        { id: "c", text: { fr: "32", ar: "32" } },
        { id: "d", text: { fr: "18", ar: "18" } },
      ],
      correctOptionId: "c",
      explanation: {
        fr: "Chaque terme est multiplié par 2 : 16 × 2 = 32.",
        ar: "كل حد يُضرب في 2: 16 × 2 = 32.",
      },
    },
    {
      id: "q2",
      text: {
        fr: "Quel mot n'appartient pas à la série : Marteau, Tournevis, Pince, Assiette ?",
        ar: "أي كلمة لا تنتمي إلى السلسلة: مطرقة، مفك، كماشة، صحن؟",
      },
      options: [
        { id: "a", text: { fr: "Marteau", ar: "مطرقة" } },
        { id: "b", text: { fr: "Tournevis", ar: "مفك" } },
        { id: "c", text: { fr: "Pince", ar: "كماشة" } },
        { id: "d", text: { fr: "Assiette", ar: "صحن" } },
      ],
      correctOptionId: "d",
      explanation: {
        fr: "Les trois autres sont des outils ; l'assiette est un ustensile de cuisine.",
        ar: "الثلاثة الأخرى أدوات؛ الصحن أداة مطبخ.",
      },
    },
  ],
  "francais-1": [
    {
      id: "q1",
      text: {
        fr: "Choisissez la phrase correctement accordée :",
        ar: "اختر الجملة الصحيحة نحويا (سؤال بالفرنسية — يقيّم مادة الفرنسية) :",
      },
      options: [
        { id: "a", text: { fr: "Les candidats qu'elle a reçu.", ar: "Les candidats qu'elle a reçu." } },
        { id: "b", text: { fr: "Les candidats qu'elle a reçus.", ar: "Les candidats qu'elle a reçus." } },
        { id: "c", text: { fr: "Les candidats qu'elle a reçue.", ar: "Les candidats qu'elle a reçue." } },
        { id: "d", text: { fr: "Les candidats qu'elle as reçus.", ar: "Les candidats qu'elle as reçus." } },
      ],
      correctOptionId: "b",
      explanation: {
        fr: "Le participe passé s'accorde avec « candidats », complément d'objet direct placé avant.",
        ar: "يتوافق اسم المفعول مع المفعول به المباشر «candidats» المتقدم على الفعل.",
      },
    },
  ],
};

export const demoQcmSets: DemoQcmSet[] = [
  {
    id: "culture-generale-1",
    title: { fr: "Culture générale — session 1", ar: "الثقافة العامة — الحصة 1" },
    category: { fr: "Culture générale", ar: "الثقافة العامة" },
    level: { fr: "Niveau moyen", ar: "مستوى متوسط" },
    questionCount: 3,
    durationMin: 30,
  },
  {
    id: "psychotechnique-1",
    title: { fr: "Tests psychotechniques — série A", ar: "اختبارات نفسية تقنية — سلسلة أ" },
    category: { fr: "Psychotechnique", ar: "نفسي تقني" },
    level: { fr: "Entraînement libre", ar: "تدريب حر" },
    questionCount: 2,
    durationMin: null,
  },
  {
    id: "francais-1",
    title: { fr: "Français — grammaire et compréhension", ar: "الفرنسية — القواعد والفهم" },
    category: { fr: "Français", ar: "الفرنسية" },
    level: { fr: "Niveau débutant", ar: "مستوى مبتدئ" },
    questionCount: 1,
    durationMin: 20,
  },
];
