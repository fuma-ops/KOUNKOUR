export type Lang = "fr" | "ar";

export interface Dictionary {
  dir: "ltr" | "rtl";
  appName: string;
  tagline: string;
  splash: {
    subtitle: string;
    sloganLine1: string;
    sloganLine2: string;
  };
  nav: {
    home: string;
    contests: string;
    preparation: string;
    community: string;
    profile: string;
  };
  home: {
    searchPlaceholder: string;
    heading: string;
    headingHighlight: string;
    subheading: string;
    categories: string[];
    recent: string;
    seeAll: string;
    deadlinesNear: string;
    whyTitle: string;
    why: { title: string; desc: string }[];
  };
  contests: {
    title: string;
    subtitle: string;
    filters: string;
    clearFilters: string;
    results: (n: number) => string;
    status: { all: string; open: string; upcoming: string; closed: string };
    emptyTitle: string;
    emptyDesc: string;
    emptyAction: string;
    errorTitle: string;
    errorDesc: string;
    retry: string;
    updatedOn: string;
    notSpecified: string;
    positions: (n: number) => string;
    deadline: string;
    daysLeft: (n: number) => string;
    stateSwitcherLabel: string;
    states: { normal: string; loading: string; empty: string; error: string };
  };
  contestDetail: {
    tabs: { overview: string; conditions: string; exams: string; documents: string; discussions: string };
    officialSource: string;
    officialSourceNote: string;
    apply: string;
    generalInfo: string;
    documentsTitle: string;
    source: string;
    publishedOn: string;
    download: string;
    fields: { positions: string; diploma: string; region: string; verified: string };
  };
  preparation: {
    title: string;
    subtitle: string;
    qcmCatalog: string;
    examsArchive: string;
    resources: string;
    startPractice: string;
    demoNotice: string;
  };
  qcm: {
    questionOf: (n: number, total: number) => string;
    trainingMode: string;
    previous: string;
    next: string;
    finish: string;
    resultTitle: string;
    resultNote: string;
    reviewMistakes: string;
    restart: string;
    backToCatalog: string;
    yourAnswer: string;
    correctAnswerLabel: string;
    noMistakes: string;
  };
  community: {
    title: string;
    subtitle: string;
    askQuestion: string;
    officialTag: string;
    memberTag: string;
    verifiedTag: string;
    replies: (n: number) => string;
    like: string;
    report: string;
    reported: string;
  };
  profile: {
    title: string;
    guestTitle: string;
    guestDesc: string;
    login: string;
    register: string;
    continueGuest: string;
    connectedTitle: string;
    logout: string;
  };
  auth: {
    emailLabel: string;
    passwordLabel: string;
    newPasswordLabel: string;
    registerTitle: string;
    registerSubmit: string;
    registerSwitch: string;
    loginTitle: string;
    loginSubmit: string;
    loginSwitch: string;
    forgotLink: string;
    forgotTitle: string;
    forgotSubmit: string;
    backToLogin: string;
    checkEmailTitle: string;
    checkEmailDesc: string;
    resetSentTitle: string;
    resetSentDesc: string;
    newPasswordTitle: string;
    newPasswordSubmit: string;
  };
  common: {
    demoBadge: string;
    language: string;
  };
}

export const dictionary: Record<Lang, Dictionary> = {
  fr: {
    dir: "ltr",
    appName: "KounKour",
    tagline: "Votre guide vers les concours publics au Maroc",
    splash: {
      subtitle: "Concours & Communauté Maroc",
      sloganLine1: "Chaque concours",
      sloganLine2: "Une seule communauté",
    },
    nav: {
      home: "Accueil",
      contests: "Concours",
      preparation: "Préparation",
      community: "Communauté",
      profile: "Profil",
    },
    home: {
      searchPlaceholder: "Rechercher un concours, une administration…",
      heading: "Trouvez les concours qui vous correspondent",
      headingHighlight: "concours",
      subheading:
        "Tous les concours publics du Maroc au même endroit, avec les documents, les dates et les outils pour bien vous préparer.",
      categories: ["Administration", "Éducation", "Santé", "Finances", "Sécurité", "Collectivités", "Autres"],
      recent: "Concours récents",
      seeAll: "Voir tout",
      deadlinesNear: "Dates limites proches",
      whyTitle: "Pourquoi KounKour ?",
      why: [
        { title: "Infos fiables et à jour", desc: "Sources officielles vérifiées et datées." },
        { title: "Outils de préparation", desc: "QCM, annales et fiches pour progresser." },
        { title: "Une communauté active", desc: "Échangez avec d'autres candidats." },
      ],
    },
    contests: {
      title: "Concours",
      subtitle: "Trouvez les concours qui correspondent à votre profil",
      filters: "Filtres",
      clearFilters: "Réinitialiser",
      results: (n) => `Voir ${n} résultats`,
      status: { all: "Tous", open: "Ouverts", upcoming: "Prochainement", closed: "Clôturés" },
      emptyTitle: "Aucun concours ne correspond à ces filtres",
      emptyDesc: "Essayez de retirer un filtre ou consultez les concours récents.",
      emptyAction: "Réinitialiser les filtres",
      errorTitle: "Impossible de charger les concours",
      errorDesc: "Une erreur est survenue. Vérifiez votre connexion et réessayez.",
      retry: "Réessayer",
      updatedOn: "Vérifié le",
      notSpecified: "Non précisé dans l'annonce",
      positions: (n) => `${n} postes`,
      deadline: "Dernier délai",
      daysLeft: (n) => `${n} jours restants`,
      stateSwitcherLabel: "Aperçu des états (démo)",
      states: { normal: "Normal", loading: "Chargement", empty: "Vide", error: "Erreur" },
    },
    contestDetail: {
      tabs: { overview: "Aperçu", conditions: "Conditions", exams: "Épreuves", documents: "Documents", discussions: "Discussions" },
      officialSource: "Source officielle",
      officialSourceNote: "L'annonce officielle prévaut en cas de différence avec ce résumé.",
      apply: "Postuler maintenant",
      generalInfo: "Informations générales",
      documentsTitle: "Documents officiels",
      source: "Source",
      publishedOn: "Publié le",
      download: "Télécharger",
      fields: { positions: "Nombre de postes", diploma: "Diplôme", region: "Région", verified: "Vérifié le" },
    },
    preparation: {
      title: "Préparation",
      subtitle: "QCM, annales et ressources pour progresser",
      qcmCatalog: "Catalogue QCM",
      examsArchive: "Examens antérieurs",
      resources: "Ressources",
      startPractice: "Commencer",
      demoNotice: "QCM de démonstration — données fictives",
    },
    qcm: {
      questionOf: (n, total) => `Question ${n} sur ${total}`,
      trainingMode: "Mode entraînement — sans minuteur",
      previous: "Précédent",
      next: "Suivant",
      finish: "Terminer",
      resultTitle: "Résultat de cette session",
      resultNote:
        "QCM de démonstration : ce résultat n'est pas enregistré. Le suivi de progression sera disponible avec la Préparation complète.",
      reviewMistakes: "Revoir mes erreurs",
      restart: "Recommencer",
      backToCatalog: "Retour au catalogue",
      yourAnswer: "Votre réponse",
      correctAnswerLabel: "Bonne réponse",
      noMistakes: "Aucune erreur sur cette session de démonstration.",
    },
    community: {
      title: "Communauté",
      subtitle: "Questions, réponses et entraide entre candidats",
      askQuestion: "Poser une question",
      officialTag: "Officiel",
      memberTag: "Avis d'un membre",
      verifiedTag: "Réponse vérifiée",
      replies: (n) => (n <= 1 ? `${n} réponse` : `${n} réponses`),
      like: "Utile",
      report: "Signaler",
      reported: "Signalé",
    },
    profile: {
      title: "Profil",
      guestTitle: "Vous n'êtes pas connecté",
      guestDesc:
        "Connectez-vous pour synchroniser vos favoris, suivre vos concours et enregistrer votre progression QCM.",
      login: "Se connecter",
      register: "Créer un compte",
      continueGuest: "Continuer sans compte",
      connectedTitle: "Bonjour",
      logout: "Se déconnecter",
    },
    auth: {
      emailLabel: "Email",
      passwordLabel: "Mot de passe",
      newPasswordLabel: "Nouveau mot de passe",
      registerTitle: "Créer un compte",
      registerSubmit: "Créer mon compte",
      registerSwitch: "Déjà un compte ? Se connecter",
      loginTitle: "Se connecter",
      loginSubmit: "Se connecter",
      loginSwitch: "Pas encore de compte ? Créer un compte",
      forgotLink: "Mot de passe oublié ?",
      forgotTitle: "Mot de passe oublié",
      forgotSubmit: "Envoyer le lien de réinitialisation",
      backToLogin: "Retour à la connexion",
      checkEmailTitle: "Vérifiez votre email",
      checkEmailDesc: "Un lien de confirmation vous a été envoyé. Cliquez dessus pour activer votre compte.",
      resetSentTitle: "Email envoyé",
      resetSentDesc: "Si un compte existe avec cet email, un lien de réinitialisation vient d'être envoyé.",
      newPasswordTitle: "Choisir un nouveau mot de passe",
      newPasswordSubmit: "Enregistrer le nouveau mot de passe",
    },
    common: {
      demoBadge: "DEMO / DONNÉES FICTIVES",
      language: "Langue",
    },
  },
  ar: {
    dir: "rtl",
    appName: "كونكور",
    tagline: "دليلك نحو المباريات العمومية بالمغرب",
    splash: {
      subtitle: "مباريات ومجتمع المغرب",
      sloganLine1: "كل مباراة",
      sloganLine2: "مجتمع واحد",
    },
    nav: {
      home: "الرئيسية",
      contests: "المباريات",
      preparation: "التحضير",
      community: "المجتمع",
      profile: "حسابي",
    },
    home: {
      searchPlaceholder: "ابحث عن مباراة، إدارة…",
      heading: "اكتشف المباريات التي تناسبك",
      headingHighlight: "المباريات",
      subheading:
        "جميع المباريات العمومية بالمغرب في مكان واحد، مع الوثائق والمواعيد وأدوات التحضير الجيد.",
      categories: ["الإدارة", "التعليم", "الصحة", "المالية", "الأمن", "الجماعات الترابية", "أخرى"],
      recent: "أحدث المباريات",
      seeAll: "عرض الكل",
      deadlinesNear: "آخر الآجال قريبا",
      whyTitle: "لماذا كونكور؟",
      why: [
        { title: "معلومات موثوقة ومحدّثة", desc: "مصادر رسمية موثقة ومؤرخة." },
        { title: "أدوات للتحضير", desc: "اختبارات وملخصات لتطوير مستواك." },
        { title: "مجتمع نشيط", desc: "تبادل مع مترشحين آخرين." },
      ],
    },
    contests: {
      title: "المباريات",
      subtitle: "ابحث عن المباريات التي تناسب ملفك",
      filters: "التصفية",
      clearFilters: "إعادة تعيين",
      results: (n) => `عرض ${n} نتيجة`,
      status: { all: "الكل", open: "مفتوحة", upcoming: "قريبا", closed: "مغلقة" },
      emptyTitle: "لا توجد مباريات مطابقة لهذه التصفية",
      emptyDesc: "حاول إزالة أحد الفلاتر أو تصفح أحدث المباريات.",
      emptyAction: "إعادة تعيين الفلاتر",
      errorTitle: "تعذر تحميل المباريات",
      errorDesc: "حدث خطأ. تحقق من الاتصال وأعد المحاولة.",
      retry: "إعادة المحاولة",
      updatedOn: "تم التحقق في",
      notSpecified: "غير محدد في الإعلان",
      positions: (n) => `${n} منصب`,
      deadline: "آخر أجل",
      daysLeft: (n) => `${n} يوما متبقيا`,
      stateSwitcherLabel: "معاينة الحالات (تجريبي)",
      states: { normal: "عادي", loading: "تحميل", empty: "فارغ", error: "خطأ" },
    },
    contestDetail: {
      tabs: { overview: "نظرة عامة", conditions: "الشروط", exams: "الاختبارات", documents: "الوثائق", discussions: "المناقشات" },
      officialSource: "المصدر الرسمي",
      officialSourceNote: "الإعلان الرسمي هو المرجع في حالة الاختلاف مع هذا الملخص.",
      apply: "أقدم الآن",
      generalInfo: "معلومات عامة",
      documentsTitle: "الوثائق الرسمية",
      source: "المصدر",
      publishedOn: "نُشر في",
      download: "تحميل",
      fields: { positions: "عدد المناصب", diploma: "الدبلوم", region: "الجهة", verified: "تم التحقق في" },
    },
    preparation: {
      title: "التحضير",
      subtitle: "اختبارات وملخصات وموارد لتطوير مستواك",
      qcmCatalog: "قائمة الاختبارات",
      examsArchive: "مواضيع سابقة",
      resources: "موارد",
      startPractice: "ابدأ",
      demoNotice: "اختبار تجريبي — بيانات وهمية",
    },
    qcm: {
      questionOf: (n, total) => `السؤال ${n} من ${total}`,
      trainingMode: "وضع التدريب — بدون مؤقت",
      previous: "السابق",
      next: "التالي",
      finish: "إنهاء",
      resultTitle: "نتيجة هذه الجلسة",
      resultNote:
        "اختبار تجريبي: هذه النتيجة غير محفوظة. تتبع التقدم سيكون متاحا مع وحدة التحضير الكاملة.",
      reviewMistakes: "مراجعة أخطائي",
      restart: "إعادة المحاولة",
      backToCatalog: "العودة إلى القائمة",
      yourAnswer: "إجابتك",
      correctAnswerLabel: "الإجابة الصحيحة",
      noMistakes: "لا توجد أخطاء في هذه الجلسة التجريبية.",
    },
    community: {
      title: "المجتمع",
      subtitle: "أسئلة وأجوبة وتعاون بين المترشحين",
      askQuestion: "طرح سؤال",
      officialTag: "رسمي",
      memberTag: "رأي عضو",
      verifiedTag: "إجابة موثقة",
      replies: (n) => `${n} ردود`,
      like: "مفيد",
      report: "إبلاغ",
      reported: "تم الإبلاغ",
    },
    profile: {
      title: "حسابي",
      guestTitle: "لست متصلا",
      guestDesc: "سجّل الدخول لمزامنة مفضلاتك ومتابعة مبارياتك وحفظ تقدمك في الاختبارات.",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      continueGuest: "المتابعة بدون حساب",
      connectedTitle: "مرحبا",
      logout: "تسجيل الخروج",
    },
    auth: {
      emailLabel: "البريد الإلكتروني",
      passwordLabel: "كلمة المرور",
      newPasswordLabel: "كلمة مرور جديدة",
      registerTitle: "إنشاء حساب",
      registerSubmit: "إنشاء حسابي",
      registerSwitch: "لديك حساب بالفعل؟ تسجيل الدخول",
      loginTitle: "تسجيل الدخول",
      loginSubmit: "تسجيل الدخول",
      loginSwitch: "ليس لديك حساب؟ إنشاء حساب",
      forgotLink: "نسيت كلمة المرور؟",
      forgotTitle: "نسيت كلمة المرور",
      forgotSubmit: "إرسال رابط إعادة التعيين",
      backToLogin: "العودة لتسجيل الدخول",
      checkEmailTitle: "تحقق من بريدك الإلكتروني",
      checkEmailDesc: "تم إرسال رابط تأكيد إليك. اضغط عليه لتفعيل حسابك.",
      resetSentTitle: "تم إرسال البريد",
      resetSentDesc: "إذا كان هذا البريد مرتبطا بحساب، فقد تلقيت للتو رابط إعادة التعيين.",
      newPasswordTitle: "اختر كلمة مرور جديدة",
      newPasswordSubmit: "حفظ كلمة المرور الجديدة",
    },
    common: {
      demoBadge: "تجريبي / بيانات وهمية",
      language: "اللغة",
    },
  },
};
