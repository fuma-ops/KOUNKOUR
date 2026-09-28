// Données de démonstration — FICTIVES. Jamais des concours officiels réels.
// Cahier des charges §0 : tout jeu de démonstration doit être étiqueté
// clairement DEMO / DONNÉES FICTIVES dans l'UI (voir DemoBadge).
import { addDaysISO, todayLocalISO } from "@/lib/local-date";

export type ContestStatusKey = "open" | "upcoming" | "closed";

export interface DemoContest {
  slug: string;
  administration: { fr: string; ar: string };
  title: { fr: string; ar: string };
  diploma: { fr: string; ar: string };
  positions: number;
  region: { fr: string; ar: string } | null;
  status: ContestStatusKey;
  deadlineISO: string;
  publishedISO: string;
  verifiedISO: string;
  sourceUrl: string;
  summary: { fr: string; ar: string };
  documents: {
    name: { fr: string; ar: string };
    format: string;
    sizeKb: number;
    publishedISO: string;
    sourceLabel: string;
  }[];
}

const today = todayLocalISO();

export const demoContests: DemoContest[] = [
  {
    slug: "technicien-specialise-interieur-demo",
    administration: { fr: "Ministère de l'Intérieur (exemple)", ar: "وزارة الداخلية (مثال)" },
    title: {
      fr: "Concours de recrutement de techniciens spécialisés — exemple",
      ar: "مباراة توظيف تقنيين متخصصين — مثال",
    },
    diploma: { fr: "Bac +2", ar: "باك +2" },
    positions: 120,
    region: { fr: "Plusieurs régions", ar: "عدة جهات" },
    status: "open",
    deadlineISO: addDaysISO(today, 18),
    publishedISO: addDaysISO(today, -6),
    verifiedISO: addDaysISO(today, -1),
    sourceUrl: "https://exemple.gov.ma/concours-demo-1",
    summary: {
      fr: "Résumé fictif à but de démonstration de l'affichage d'une fiche concours.",
      ar: "ملخص وهمي لغرض عرض شكل صفحة تفاصيل مباراة.",
    },
    documents: [
      { name: { fr: "Avis de concours", ar: "إعلان المباراة" }, format: "PDF", sizeKb: 1200, publishedISO: addDaysISO(today, -6), sourceLabel: "exemple.gov.ma" },
      { name: { fr: "Formulaire d'inscription", ar: "استمارة التسجيل" }, format: "PDF", sizeKb: 450, publishedISO: addDaysISO(today, -6), sourceLabel: "exemple.gov.ma" },
    ],
  },
  {
    slug: "enseignants-education-nationale-demo",
    administration: { fr: "Ministère de l'Éducation Nationale (exemple)", ar: "وزارة التربية الوطنية (مثال)" },
    title: { fr: "Concours de recrutement des enseignants — exemple", ar: "مباراة توظيف الأساتذة — مثال" },
    diploma: { fr: "Bac +5", ar: "باك +5" },
    positions: 1500,
    region: null,
    status: "open",
    deadlineISO: addDaysISO(today, 32),
    publishedISO: addDaysISO(today, -3),
    verifiedISO: addDaysISO(today, -3),
    sourceUrl: "https://exemple.gov.ma/concours-demo-2",
    summary: {
      fr: "Résumé fictif à but de démonstration de l'affichage d'une fiche concours.",
      ar: "ملخص وهمي لغرض عرض شكل صفحة تفاصيل مباراة.",
    },
    documents: [
      { name: { fr: "Avis de concours", ar: "إعلان المباراة" }, format: "PDF", sizeKb: 980, publishedISO: addDaysISO(today, -3), sourceLabel: "exemple.gov.ma" },
    ],
  },
  {
    slug: "ingenieurs-eau-electricite-demo",
    administration: { fr: "Régie Autonome de l'Eau et de l'Électricité (exemple)", ar: "الوكالة المستقلة للماء والكهرباء (مثال)" },
    title: { fr: "Concours d'ingénieurs d'État — exemple", ar: "مباراة مهندسي الدولة — مثال" },
    diploma: { fr: "Bac +5", ar: "باك +5" },
    positions: 45,
    region: { fr: "Casablanca-Settat", ar: "الدار البيضاء سطات" },
    status: "upcoming",
    deadlineISO: addDaysISO(today, 60),
    publishedISO: addDaysISO(today, 0),
    verifiedISO: addDaysISO(today, 0),
    sourceUrl: "https://exemple.gov.ma/concours-demo-3",
    summary: {
      fr: "Résumé fictif à but de démonstration de l'affichage d'une fiche concours.",
      ar: "ملخص وهمي لغرض عرض شكل صفحة تفاصيل مباراة.",
    },
    documents: [],
  },
  {
    slug: "techniciens-oncf-demo",
    administration: { fr: "Office National des Chemins de Fer (exemple)", ar: "المكتب الوطني للسكك الحديدية (مثال)" },
    title: { fr: "Concours de techniciens spécialisés — exemple", ar: "مباراة تقنيين متخصصين — مثال" },
    diploma: { fr: "Bac +2", ar: "باك +2" },
    positions: 120,
    region: null,
    status: "closed",
    deadlineISO: addDaysISO(today, -12),
    publishedISO: addDaysISO(today, -40),
    verifiedISO: addDaysISO(today, -40),
    sourceUrl: "https://exemple.gov.ma/concours-demo-4",
    summary: {
      fr: "Résumé fictif à but de démonstration de l'affichage d'une fiche concours.",
      ar: "ملخص وهمي لغرض عرض شكل صفحة تفاصيل مباراة.",
    },
    documents: [],
  },
];
