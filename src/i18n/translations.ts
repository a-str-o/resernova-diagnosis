export type Lang = "en" | "fr" | "ar";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇲🇦" },
];

type Entry = Record<Lang, string>;

export const translations: Record<string, Entry> = {
  "app.name": {
    en: "ReserNova",
    fr: "ReserNova",
    ar: "ReserNova",
  },
  "app.product": {
    en: "Business Diagnostic",
    fr: "Diagnostic Business",
    ar: "تشخيص المشروع",
  },

  // Landing
  "landing.badge": {
    en: "Business health check for beauty businesses",
    fr: "Bilan de santé pour les métiers de la beauté",
    ar: "تشخيص ديال المشروع لصالونات التجميل",
  },
  "landing.title": {
    en: "Understand what your salon is really losing every month",
    fr: "Comprenez ce que votre salon perd réellement chaque mois",
    ar: "فهم شنو كيخسر صالونك بصح كل شهر",
  },
  "landing.subtitle": {
    en: "Answer a few simple questions about how you work today. We'll show you where bookings, clients and revenue slip away — and what to do about it.",
    fr: "Répondez à quelques questions simples sur votre fonctionnement actuel. Nous vous montrerons où partent les rendez-vous, les clients et le chiffre d'affaires — et quoi faire.",
    ar: "جاوب على شي أسئلة ساهلة على كيفاش كتخدم دابا. غادي نوريوك فين كتضيع المواعد والزبناء والفلوس — وشنو تقدر دير.",
  },
  "landing.time": {
    en: "This diagnostic takes about 5–7 minutes.",
    fr: "Ce diagnostic prend environ 5 à 7 minutes.",
    ar: "هاد التشخيص كياخد تقريباً 5 حتى 7 دقايق.",
  },
  "landing.privacy": {
    en: "Your answers are used to understand your business and prepare a personalized ReserNova recommendation.",
    fr: "Vos réponses servent à comprendre votre activité et à préparer une recommandation ReserNova personnalisée.",
    ar: "الأجوبة ديالك كنستعملوها باش نفهمو المشروع ديالك ونوجدو ليك توصية ReserNova خاصة بيك.",
  },
  "landing.start": {
    en: "Start my diagnostic",
    fr: "Commencer mon diagnostic",
    ar: "بدا التشخيص ديالي",
  },
  "landing.resume": {
    en: "Resume where I stopped",
    fr: "Reprendre où je me suis arrêté",
    ar: "كمّل من فين وقفت",
  },
  "landing.point1.title": {
    en: "Missed bookings",
    fr: "Rendez-vous manqués",
    ar: "مواعد ضايعة",
  },
  "landing.point1.body": {
    en: "See how many WhatsApp requests never turn into appointments.",
    fr: "Voyez combien de demandes WhatsApp ne deviennent jamais des rendez-vous.",
    ar: "شوف شحال من طلب فواتساب ما كيولّيش موعد.",
  },
  "landing.point2.title": {
    en: "No-shows",
    fr: "Absences",
    ar: "زبناء ما كيجيوش",
  },
  "landing.point2.body": {
    en: "Estimate the revenue affected by clients who don't come.",
    fr: "Estimez le chiffre d'affaires affecté par les clients absents.",
    ar: "قدّر الفلوس اللي كتضيع بسباب الزبناء اللي ما كيجيوش.",
  },
  "landing.point3.title": {
    en: "Client retention",
    fr: "Fidélisation",
    ar: "الحفاظ على الزبناء",
  },
  "landing.point3.body": {
    en: "Find out who stopped coming back — and why it matters.",
    fr: "Découvrez qui ne revient plus — et pourquoi c'est important.",
    ar: "عرف شكون بقا ما رجعش — وعلاش هادشي مهم.",
  },

  // Wizard chrome
  "wizard.step": { en: "Step", fr: "Étape", ar: "المرحلة" },
  "wizard.of": { en: "of", fr: "sur", ar: "من" },
  "wizard.back": { en: "Back", fr: "Retour", ar: "رجوع" },
  "wizard.continue": { en: "Continue", fr: "Continuer", ar: "كمّل" },
  "wizard.seeResults": {
    en: "See my diagnosis",
    fr: "Voir mon diagnostic",
    ar: "شوف التشخيص ديالي",
  },
  "wizard.saved": { en: "Progress saved", fr: "Progression enregistrée", ar: "تسجل التقدم" },
  "wizard.saving": { en: "Saving…", fr: "Enregistrement…", ar: "كيتسجل…" },
  "wizard.optional": { en: "Optional", fr: "Facultatif", ar: "اختياري" },
  "wizard.selectMultiple": {
    en: "Select all that apply",
    fr: "Sélectionnez tout ce qui s'applique",
    ar: "ختار كلشي اللي كينطبق",
  },
  "wizard.yes": { en: "Yes", fr: "Oui", ar: "أه" },
  "wizard.no": { en: "No", fr: "Non", ar: "لا" },

  // Validation
  "error.required": {
    en: "This answer is required",
    fr: "Cette réponse est obligatoire",
    ar: "هاد الجواب ضروري",
  },
  "error.email": {
    en: "Enter a valid email address",
    fr: "Saisissez une adresse e-mail valide",
    ar: "دخل إيميل صحيح",
  },
  "error.phone": {
    en: "Enter a valid phone number",
    fr: "Saisissez un numéro de téléphone valide",
    ar: "دخل رقم تيليفون صحيح",
  },
  "error.number": {
    en: "Enter a valid number",
    fr: "Saisissez un nombre valide",
    ar: "دخل رقم صحيح",
  },
  "error.generic": {
    en: "Something went wrong. Please try again.",
    fr: "Une erreur est survenue. Réessayez.",
    ar: "وقع شي مشكل. عاود حاول.",
  },
  "error.network": {
    en: "Network issue — your answers are still saved on this device.",
    fr: "Problème réseau — vos réponses restent enregistrées sur cet appareil.",
    ar: "مشكل فالأنترنت — الأجوبة ديالك مازال محفوظة فهاد الجهاز.",
  },
  "error.notFound.title": {
    en: "This diagnostic link is not valid",
    fr: "Ce lien de diagnostic n'est pas valide",
    ar: "هاد الرابط ماشي صحيح",
  },
  "error.notFound.body": {
    en: "The diagnostic you're looking for doesn't exist or was removed.",
    fr: "Le diagnostic recherché n'existe pas ou a été supprimé.",
    ar: "التشخيص اللي كتقلب عليه ماكاينش ولا تمسح.",
  },
  "state.loading": { en: "Loading…", fr: "Chargement…", ar: "كيتحمل…" },

  // Steps
  "step.1.name": { en: "Business", fr: "Établissement", ar: "المشروع" },
  "step.2.name": { en: "Operations", fr: "Opérations", ar: "الخدمة" },
  "step.3.name": { en: "Bookings", fr: "Réservations", ar: "المواعد" },
  "step.4.name": { en: "Revenue leakage", fr: "Pertes de revenus", ar: "الفلوس الضايعة" },
  "step.5.name": { en: "No-shows", fr: "Absences", ar: "الغيابات" },
  "step.6.name": { en: "Customers", fr: "Clients", ar: "الزبناء" },
  "step.7.name": { en: "Growth", fr: "Croissance", ar: "التطور" },
  "step.8.name": { en: "Decision", fr: "Décision", ar: "القرار" },
  "step.9.name": { en: "Results", fr: "Résultats", ar: "النتائج" },

  "step.1.title": {
    en: "Let's start with your business",
    fr: "Commençons par votre établissement",
    ar: "نبداو بالمشروع ديالك",
  },
  "step.2.title": {
    en: "Let's understand how your business operates",
    fr: "Comprenons comment votre activité fonctionne",
    ar: "خلينا نفهمو كيفاش كتخدمو",
  },
  "step.3.title": {
    en: "How do your clients book appointments?",
    fr: "Comment vos clients prennent-ils rendez-vous ?",
    ar: "كيفاش الزبناء كياخدو المواعد؟",
  },
  "step.4.title": {
    en: "What happens when you're busy",
    fr: "Ce qui se passe quand vous êtes occupé",
    ar: "شنو كيوقع منين تكون مشغول",
  },
  "step.5.title": {
    en: "Let's look at missed appointments",
    fr: "Regardons les rendez-vous manqués",
    ar: "نشوفو المواعد اللي ضاعت",
  },
  "step.6.title": {
    en: "How well do you know your clients?",
    fr: "Connaissez-vous bien vos clients ?",
    ar: "واش كتعرف زبناءك مزيان؟",
  },
  "step.7.title": {
    en: "Where do you want your business to go?",
    fr: "Où voulez-vous emmener votre activité ?",
    ar: "فين باغي توصل بالمشروع ديالك؟",
  },
  "step.8.title": { en: "One last thing", fr: "Une dernière chose", ar: "آخر حاجة" },

  // Live estimate cards
  "estimate.basedOn": {
    en: "Based on your answers…",
    fr: "D'après vos réponses…",
    ar: "على حساب الأجوبة ديالك…",
  },
  "estimate.missedRevenue": {
    en: "Estimated missed revenue",
    fr: "Revenu manqué estimé",
    ar: "الفلوس اللي كتضيع تقريباً",
  },
  "estimate.noshowRevenue": {
    en: "Estimated revenue affected by no-shows",
    fr: "Revenu affecté par les absences",
    ar: "الفلوس المتأثرة بالغيابات",
  },
  "estimate.noshowRate": { en: "No-show rate", fr: "Taux d'absence", ar: "نسبة الغياب" },
  "estimate.perMonth": { en: "/ month", fr: "/ mois", ar: "/ فالشهر" },
  "estimate.disclaimer": {
    en: "This is an estimate based on the information you provided and is not a guaranteed result.",
    fr: "Il s'agit d'une estimation basée sur les informations fournies, sans garantie de résultat.",
    ar: "هادي غير تقديرات على حساب المعلومات اللي عطيتينا، وماشي نتيجة مضمونة.",
  },

  // Lead capture
  "lead.title": {
    en: "Where should we send your report?",
    fr: "Où devons-nous envoyer votre rapport ?",
    ar: "فين نصيفطو ليك التقرير؟",
  },
  "lead.subtitle": {
    en: "Your personalized business diagnosis is ready. Confirm your details to open it.",
    fr: "Votre diagnostic personnalisé est prêt. Confirmez vos coordonnées pour l'ouvrir.",
    ar: "التشخيص ديالك وجد. أكد المعلومات ديالك باش تحلّو.",
  },
  "lead.name": { en: "Your name", fr: "Votre nom", ar: "سميتك" },
  "lead.business": { en: "Business name", fr: "Nom de l'établissement", ar: "سمية المحل" },
  "lead.whatsapp": { en: "WhatsApp number", fr: "Numéro WhatsApp", ar: "رقم واتساب" },
  "lead.email": { en: "Email", fr: "E-mail", ar: "الإيميل" },
  "lead.city": { en: "City", fr: "Ville", ar: "المدينة" },
  "lead.cta": {
    en: "Send my business report",
    fr: "Envoyer mon rapport",
    ar: "صيفط ليا التقرير ديالي",
  },
  "lead.submitting": {
    en: "Preparing your report…",
    fr: "Préparation du rapport…",
    ar: "كنوجدو التقرير…",
  },

  // Results
  "results.title": {
    en: "Your business diagnosis",
    fr: "Votre diagnostic business",
    ar: "التشخيص ديال المشروع ديالك",
  },
  "results.subtitle": {
    en: "Here is what your answers say about how your business runs today.",
    fr: "Voici ce que vos réponses révèlent sur le fonctionnement actuel de votre activité.",
    ar: "هاهو شنو كيبان من الأجوبة ديالك على كيفاش خدام المشروع ديالك دابا.",
  },
  "results.welcome": {
    en: "Welcome, {name}",
    fr: "Bienvenue, {name}",
    ar: "مرحبا، {name}",
  },
  "results.businessFor": {
    en: "Personalized report for {business}",
    fr: "Rapport personnalisé pour {business}",
    ar: "تقرير مخصص لـ {business}",
  },
  "results.greeting": {
    en: "Hi {name} — we built this report for {business}. Here is your diagnostic and the analytics behind it.",
    fr: "Bonjour {name} — nous avons préparé ce rapport pour {business}. Voici votre diagnostic et les analyses associées.",
    ar: "سلام {name} — حضرنا هاد التقرير لـ {business}. هاهو التشخيص ديالك والتحاليل ديالو.",
  },
  "results.analytics.title": {
    en: "Analytics & insights",
    fr: "Analyses et indicateurs",
    ar: "التحاليل والمؤشرات",
  },
  "results.analytics.subtitle": {
    en: "Visual breakdowns of the scores, pain points and revenue impact detected in your answers.",
    fr: "Visualisation des scores, des problèmes détectés et de l'impact financier de vos réponses.",
    ar: "عرض بياني للنقط والمشاكل المكتشفة والأثر المالي ديال الأجوبة ديالك.",
  },
  "results.analytics.scoreBreakdown": {
    en: "Score breakdown",
    fr: "Détail des scores",
    ar: "تفصيل النقط",
  },
  "results.analytics.scoreBreakdown.help": {
    en: "Each axis shows one area of your business as a percentage of its maximum.",
    fr: "Chaque axe représente un domaine de votre activité en pourcentage de son maximum.",
    ar: "كل محور كيمثل مجال من المشروع كنسبة مئوية من الحد الأقصى ديالو.",
  },
  "results.analytics.monthlyNumbers": {
    en: "Your monthly numbers",
    fr: "Vos chiffres du mois",
    ar: "الأرقام ديالك فالشهر",
  },
  "results.analytics.monthlyNumbers.help": {
    en: "How much demand you receive vs. what actually turns into appointments.",
    fr: "Combien de demandes vous recevez vs ce qui devient réellement un rendez-vous.",
    ar: "شحال من طلب كيوصلكم مقابل شنو كيتحول فالحقيقة لموعد.",
  },
  "results.analytics.overview.title": {
    en: "Monthly numbers & revenue impact",
    fr: "Chiffres du mois & impact financier",
    ar: "أرقام الشهر والأثر المالي",
  },
  "results.analytics.overview.help": {
    en: "Side-by-side view of what your business handles each month and what that translates to in revenue.",
    fr: "Vue côte à côte de l'activité mensuelle et de son impact en chiffre d'affaires.",
    ar: "نظرة جنبا لجنب على النشاط الشهري وأثرو على المداخيل.",
  },
  "results.analytics.footprint.title": {
    en: "Your operating footprint",
    fr: "Votre empreinte d'exploitation",
    ar: "البصمة ديال الخدمة ديالك",
  },
  "results.analytics.footprint.help": {
    en: "The hours, days and ticket value you reported.",
    fr: "Les heures, jours et valeur moyenne que vous avez indiqués.",
    ar: "ساعات الخدمة والأيام ومتوسط القيمة اللي عطيتينا.",
  },
  "results.analytics.footprint.hoursPerDay": {
    en: "Hours per day",
    fr: "Heures / jour",
    ar: "ساعات فالنهار",
  },
  "results.analytics.footprint.daysPerWeek": {
    en: "Days per week",
    fr: "Jours / semaine",
    ar: "أيام فالسيمانة",
  },
  "results.analytics.footprint.hoursPerWeek": {
    en: "Hours per week",
    fr: "Heures / semaine",
    ar: "ساعات فالسيمانة",
  },
  "results.analytics.footprint.avgTicket": {
    en: "Average ticket",
    fr: "Panier moyen",
    ar: "متوسط الثمن",
  },
  "results.analytics.footprint.hoursUnit": {
    en: "hrs",
    fr: "h",
    ar: "س",
  },
  "results.analytics.footprint.daysUnit": {
    en: "days",
    fr: "jours",
    ar: "يوم",
  },
  "results.analytics.legend.monthlyDemand": {
    en: "Monthly demand",
    fr: "Demandes mensuelles",
    ar: "الطلب الشهري",
  },
  "results.analytics.legend.appointments": {
    en: "Appointments",
    fr: "Rendez-vous",
    ar: "المواعد",
  },
  "results.analytics.legend.noshowCount": {
    en: "No-shows",
    fr: "Absences",
    ar: "الغيابات",
  },
  "results.analytics.legend.unconverted": {
    en: "Unconverted",
    fr: "Non convertis",
    ar: "ما تحولوش",
  },
  "results.analytics.painImpact": {
    en: "Estimated financial impact by pain point",
    fr: "Impact financier estimé par problème",
    ar: "الأثر المالي المقدر لكل مشكل",
  },
  "results.analytics.painImpact.help": {
    en: "Each bar shows the monthly DH opportunity lost to that pain point.",
    fr: "Chaque barre indique le manque à gagner mensuel en DH lié à ce problème.",
    ar: "كل عمود كيبين الفرصة الشهرية بالدرهم اللي كتضيع بسبب هاد المشكل.",
  },
  "results.analytics.revenueBreakdown": {
    en: "Monthly revenue breakdown",
    fr: "Répartition du revenu mensuel",
    ar: "تفصيل المداخيل الشهرية",
  },
  "results.analytics.revenueBreakdown.help": {
    en: "How missed revenue and no-show impact compare to your monthly plan cost.",
    fr: "Comment le revenu manqué et l'impact des absences se comparent au coût mensuel du plan.",
    ar: "كيفاش كيتقارن المدخول الضايع وأثر الغيابات مع الثمن الشهري ديال الخطة.",
  },
  "results.analytics.legend.missed": {
    en: "Missed bookings",
    fr: "Réservations manquées",
    ar: "مواعد ضايعة",
  },
  "results.analytics.legend.noshow": {
    en: "No-shows",
    fr: "Absences",
    ar: "الغيابات",
  },
  "results.analytics.legend.total": {
    en: "Total opportunity",
    fr: "Opportunité totale",
    ar: "مجموع الفرصة",
  },
  "results.analytics.legend.planCost": {
    en: "Plan cost / month",
    fr: "Coût du plan / mois",
    ar: "ثمن الخطة / فالشهر",
  },
  "results.analytics.legend.score": {
    en: "Score",
    fr: "Score",
    ar: "النقطة",
  },
  "results.analytics.noPainImpact": {
    en: "No significant financial impact detected — your operations look solid.",
    fr: "Aucun impact financier significatif détecté — votre activité semble saine.",
    ar: "ما تكاشف حتى أثر مالي مهم — الخدمة ديالك كتبان مزيانة.",
  },
  "results.overall": { en: "Overall business score", fr: "Score global", ar: "النقطة العامة" },
  "results.category.operations": { en: "Operations", fr: "Opérations", ar: "التنظيم" },
  "results.category.bookings": { en: "Bookings", fr: "Réservations", ar: "المواعد" },
  "results.category.retention": {
    en: "Customer retention",
    fr: "Fidélisation client",
    ar: "الحفاظ على الزبناء",
  },
  "results.category.visibility": {
    en: "Revenue visibility",
    fr: "Visibilité du revenu",
    ar: "وضوح المداخيل",
  },
  "results.scoreHelp": {
    en: "A higher score means your current process already handles that area well.",
    fr: "Un score élevé signifie que ce domaine est déjà bien géré aujourd'hui.",
    ar: "كلما كانت النقطة عالية، كلما كان هاد الجانب مدبر مزيان دابا.",
  },
  "results.opportunities": {
    en: "Your 3 biggest opportunities",
    fr: "Vos 3 plus grandes opportunités",
    ar: "أكبر 3 فرص عندك",
  },
  "results.estOpportunity": {
    en: "Estimated opportunity",
    fr: "Opportunité estimée",
    ar: "الفرصة المقدرة",
  },
  "results.roi.title": { en: "Financial impact", fr: "Impact financier", ar: "الأثر المالي" },
  "results.roi.missedBookings": {
    en: "Estimated missed bookings",
    fr: "Réservations manquées estimées",
    ar: "مواعد ضايعة تقريباً",
  },
  "results.roi.avgTicket": {
    en: "Average appointment value",
    fr: "Valeur moyenne d'un rendez-vous",
    ar: "معدل ثمن الموعد",
  },
  "results.roi.missedRevenue": {
    en: "Potential missed revenue",
    fr: "Revenu potentiellement manqué",
    ar: "الفلوس اللي ممكن تضيع",
  },
  "results.roi.noshowImpact": {
    en: "No-show impact",
    fr: "Impact des absences",
    ar: "أثر الغيابات",
  },
  "results.roi.total": {
    en: "Total estimated opportunity",
    fr: "Opportunité totale estimée",
    ar: "مجموع الفرصة المقدرة",
  },
  "results.roi.ratio": {
    en: "Estimated opportunity-to-cost ratio",
    fr: "Ratio opportunité / coût estimé",
    ar: "نسبة الفرصة مقارنة بالتكلفة",
  },
  "results.roi.note": {
    en: "Potential opportunity based on your answers. Not a guarantee of results.",
    fr: "Opportunité potentielle basée sur vos réponses. Aucun résultat garanti.",
    ar: "فرصة ممكنة على حساب الأجوبة ديالك. ماشي ضمانة ديال النتائج.",
  },
  "results.reco.title": {
    en: "How ReserNova can help",
    fr: "Comment ReserNova peut aider",
    ar: "كيفاش ReserNova يقدر يعاون",
  },
  "results.reco.subtitle": {
    en: "Based only on the problems detected in your answers.",
    fr: "Uniquement à partir des problèmes détectés dans vos réponses.",
    ar: "غير على حساب المشاكل اللي بانو فالأجوبة ديالك.",
  },
  "priority.high": { en: "High priority", fr: "Priorité haute", ar: "أولوية عالية" },
  "priority.medium": { en: "Medium priority", fr: "Priorité moyenne", ar: "أولوية متوسطة" },
  "priority.low": { en: "Nice to have", fr: "Utile", ar: "مفيد" },
  "severity.high": { en: "High", fr: "Élevé", ar: "مرتفع" },
  "severity.medium": { en: "Medium", fr: "Moyen", ar: "متوسط" },
  "severity.low": { en: "Low", fr: "Faible", ar: "ضعيف" },
  "results.plan.title": {
    en: "Recommended for your business",
    fr: "Recommandé pour votre établissement",
    ar: "منصوح بيه للمشروع ديالك",
  },
  "results.plan.month": { en: "DH / month", fr: "DH / mois", ar: "درهم / فالشهر" },
  "results.plan.custom": { en: "Custom pricing", fr: "Tarif sur mesure", ar: "ثمن حسب الطلب" },
  "results.plan.freeUnit": { en: "DH / forever", fr: "DH / pour toujours", ar: "درهم / للأبد" },
  "results.plan.forever": { en: "forever", fr: "pour toujours", ar: "للأبد" },
  "results.plan.popular": { en: "Most popular", fr: "Le plus choisi", ar: "الأكثر اختياراً" },
  "results.plan.gridTitle": {
    en: "Compare ReserNova plans",
    fr: "Comparer les plans ReserNova",
    ar: "قارن خطط ReserNova",
  },
  "results.plan.gridSubtitle": {
    en: "Start free and upgrade as your business grows. Cancel anytime.",
    fr: "Commencez gratuitement et évoluez avec votre activité. Annulation libre.",
    ar: "ابدا بالمجان وكبّر مع المشروع ديالك. إلغاء فأي وقت.",
  },
  "results.plan.cta.free": { en: "Get started free", fr: "Commencer gratuitement", ar: "ابدا بالمجان" },
  "results.plan.cta.trial": { en: "Start free trial", fr: "Essai gratuit", ar: "جرب بالمجان" },
  "results.plan.recommended": { en: "Recommended for you", fr: "Recommandé pour vous", ar: "منصوح بيه ليك" },
  "results.cta.demo": {
    en: "Book a ReserNova demo",
    fr: "Réserver une démo ReserNova",
    ar: "حجز ديمو مع ReserNova",
  },
  "results.cta.specialist": {
    en: "Talk to a ReserNova specialist",
    fr: "Parler à un spécialiste ReserNova",
    ar: "تكلم مع مختص من ReserNova",
  },
  "results.share": {
    en: "Report link copied",
    fr: "Lien du rapport copié",
    ar: "تنسخ رابط التقرير",
  },
  "results.copyLink": { en: "Copy report link", fr: "Copier le lien", ar: "نسخ الرابط" },

  // Plans
  "plan.free": { en: "Free", fr: "Gratuit", ar: "مجاناً" },
  "plan.starter": { en: "Starter", fr: "Starter", ar: "Starter" },
  "plan.pro": { en: "Pro", fr: "Pro", ar: "Pro" },
  "plan.custom": { en: "Custom", fr: "Sur mesure", ar: "مخصص" },
  "plan.free.tagline": {
    en: "Perfect for getting started",
    fr: "Idéal pour démarrer",
    ar: "مثالي للبداية",
  },
  "plan.starter.tagline": {
    en: "For growing businesses",
    fr: "Pour les entreprises en croissance",
    ar: "للمشاريع اللي كتربح",
  },
  "plan.pro.tagline": {
    en: "For ambitious businesses",
    fr: "Pour les entreprises ambitieuses",
    ar: "للمشاريع الطموحة",
  },
  "plan.free.features": {
    en: "1 Location\nLimited Staff (1 profile)\nSimple Calendar\nManual Booking Management",
    fr: "1 établissement\nPersonnel limité (1 profil)\nCalendrier simple\nGestion manuelle des rendez-vous",
    ar: "1 فرع\nطاقم محدود (1 بروفايل)\nأجندة بسيطة\nتدبير يدوي ديال المواعد",
  },
  "plan.starter.features": {
    en:
      "1 Location · 1 Phone Number\nSmart Calendar\nWhatsApp AI Bot — Fully Automated Bookings (No number change required)\nUnlimited Staff Accounts & Management\nRevenue & Client Tracking\nGift Cards & Loyalty Discounts",
    fr:
      "1 établissement · 1 numéro de téléphone\nCalendrier intelligent\nBot WhatsApp IA — réservations 100% automatisées (sans changer de numéro)\nComptes staff illimités et gestion\nSuivi du chiffre d'affaires et des clients\nCartes cadeaux & fidélité",
    ar:
      "1 فرع · 1 رقم هاتف\nأجندة ذكية\nبوت واتساب بالذكاء الاصطناعي — مواعد أوتوماتيكية بالكامل (بلا ما تبدل الرقم)\nعدد لا محدود ديال الحسابات والتدبير ديال الطاقم\nتتبع المداخيل والزبناء\nكارتات الهدية وبرامج الولاء",
  },
  "plan.pro.features": {
    en:
      "Up to 2 Locations\nSmart Calendar\nWhatsApp AI Bot — Fully Automated Bookings (No number change required)\nUnlimited Staff Accounts & Management\nRevenue & Client Tracking with Loyalty Discounts\nGoogle Calendar Sync\nCashier System Integration (if applicable)\nAI Growth Analytics & Direct WhatsApp Support",
    fr:
      "Jusqu'à 2 établissements\nCalendrier intelligent\nBot WhatsApp IA — réservations 100% automatisées (sans changer de numéro)\nComptes staff illimités et gestion\nSuivi du CA et des clients avec programmes de fidélité\nSynchronisation Google Calendar\nIntégration système de caisse (si applicable)\nAnalyses IA de croissance et support WhatsApp direct",
    ar:
      "حتى 2 فروع\nأجندة ذكية\nبوت واتساب بالذكاء الاصطناعي — مواعد أوتوماتيكية بالكامل (بلا ما تبدل الرقم)\nعدد لا محدود ديال الحسابات والتدبير ديال الطاقم\nتتبع المداخيل والزبناء مع برامج الولاء\nمزامنة مع Google Calendar\nدمج مع نظام الكاشير (إلا متوفر)\nتحاليل نمو بالذكاء الاصطناعي ودعم مباشر عبر واتساب",
  },
  "plan.free.desc": {
    en: "Get started with the essentials — no card required.",
    fr: "Démarrez avec l'essentiel — sans carte bancaire.",
    ar: "ابدا بالأساسيات — بلا ما تحتاج كارت بنكي.",
  },
  "plan.starter.desc": {
    en: "For a single location with steady booking volume.",
    fr: "Pour un seul établissement avec un volume régulier.",
    ar: "لمحل وحيد بعدد مواعد عادي.",
  },
  "plan.pro.desc": {
    en: "For busy teams with high booking volume and retention needs.",
    fr: "Pour les équipes chargées avec un volume élevé et des besoins de fidélisation.",
    ar: "للفرق المشغولة بزاف المواعد واللي محتاجة تحافظ على الزبناء.",
  },
  "plan.custom.desc": {
    en: "For multi-location businesses and larger teams.",
    fr: "Pour les établissements multi-sites et grandes équipes.",
    ar: "للمشاريع اللي عندها بزاف ديال الفروع وفريق كبير.",
  },

  // Products
  "product.ai_receptionist": {
    en: "AI Receptionist",
    fr: "Réceptionniste IA",
    ar: "موظف الاستقبال الذكي",
  },
  "product.ai_receptionist.desc": {
    en: "Automatically answer booking requests and help clients book through WhatsApp.",
    fr: "Répondez automatiquement aux demandes et laissez vos clients réserver via WhatsApp.",
    ar: "كيجاوب بوحدو على طلبات المواعد وكيخلي الزبناء ياخدو موعد عبر واتساب.",
  },
  "product.smart_calendar": {
    en: "Smart Calendar",
    fr: "Calendrier intelligent",
    ar: "الأجندة الذكية",
  },
  "product.smart_calendar.desc": {
    en: "Manage availability across your team and reduce scheduling conflicts.",
    fr: "Gérez les disponibilités de l'équipe et réduisez les conflits d'agenda.",
    ar: "دبّر أوقات الفريق ديالك وقلل من تضارب المواعد.",
  },
  "product.reminders": {
    en: "Automated Reminders",
    fr: "Rappels automatiques",
    ar: "التذكيرات الأوتوماتيكية",
  },
  "product.reminders.desc": {
    en: "Reduce no-shows with automatic appointment reminders.",
    fr: "Réduisez les absences grâce aux rappels automatiques.",
    ar: "قلل من الغيابات بتذكيرات أوتوماتيكية قبل الموعد.",
  },
  "product.crm": {
    en: "CRM & Customer History",
    fr: "CRM & historique client",
    ar: "CRM وتاريخ الزبون",
  },
  "product.crm.desc": {
    en: "Keep customer history, understand behaviour and spot retention opportunities.",
    fr: "Conservez l'historique client, comprenez les comportements et repérez les opportunités.",
    ar: "احتافظ بتاريخ الزبون، فهم سلوكو، ولقا فرص باش يرجع.",
  },
  "product.analytics": { en: "Revenue Analytics", fr: "Analyses de revenus", ar: "تحليل المداخيل" },
  "product.analytics.desc": {
    en: "See what your business really earns, by service, staff member and period.",
    fr: "Visualisez vos revenus réels par service, employé et période.",
    ar: "شوف بصح شحال كتربح، حسب الخدمة والموظف والمدة.",
  },
  "product.team": { en: "Team Management", fr: "Gestion d'équipe", ar: "تدبير الفريق" },
  "product.team.desc": {
    en: "Individual schedules, workloads and staff performance in one place.",
    fr: "Plannings individuels, charge de travail et performance en un seul endroit.",
    ar: "أوقات كل واحد، الخدمة ديالو والأداء ديالو فبلاصة وحدة.",
  },
  "product.multi_location": {
    en: "Multi-location Tools",
    fr: "Outils multi-sites",
    ar: "تدبير عدة فروع",
  },
  "product.multi_location.desc": {
    en: "Run several branches with shared visibility and per-branch performance.",
    fr: "Pilotez plusieurs points de vente avec une vue partagée par site.",
    ar: "دبّر بزاف ديال الفروع بنظرة شاملة وأداء كل فرع.",
  },
  "product.whatsapp_booking": {
    en: "WhatsApp Booking",
    fr: "Réservation WhatsApp",
    ar: "الحجز عبر واتساب",
  },
  "product.whatsapp_booking.desc": {
    en: "Turn WhatsApp conversations into confirmed appointments automatically.",
    fr: "Transformez vos conversations WhatsApp en rendez-vous confirmés.",
    ar: "حوّل المحادثات ديال واتساب لمواعد مأكدة أوتوماتيكياً.",
  },

  // Pain points
  "pain.missed_whatsapp": {
    en: "Missed WhatsApp opportunities",
    fr: "Opportunités WhatsApp manquées",
    ar: "فرص ضايعة فواتساب",
  },
  "pain.missed_whatsapp.desc": {
    en: "Booking requests arrive when you're with a client, and some are answered too late — or never.",
    fr: "Les demandes arrivent pendant que vous êtes avec un client, et certaines reçoivent une réponse trop tard — ou jamais.",
    ar: "الطلبات كتوصل ملي تكون مع شي زبون، وشي وحدين كيتجاوبو معطلين — ولا عمرهم.",
  },
  "pain.slow_response": {
    en: "Slow response time",
    fr: "Temps de réponse lent",
    ar: "الرد كيتعطل",
  },
  "pain.slow_response.desc": {
    en: "Clients who wait more than a few minutes often book somewhere else.",
    fr: "Les clients qui attendent plus de quelques minutes réservent souvent ailleurs.",
    ar: "الزبون اللي كيتسنى بزاف غالباً كيمشي يحجز عند شي حد آخر.",
  },
  "pain.high_noshow": {
    en: "High no-show rate",
    fr: "Taux d'absence élevé",
    ar: "نسبة غياب مرتفعة",
  },
  "pain.high_noshow.desc": {
    en: "Empty slots that were already booked cost you both time and revenue.",
    fr: "Des créneaux réservés puis vides vous coûtent du temps et du revenu.",
    ar: "بلاصات محجوزة وبقات خاوية كتخسرك الوقت والفلوس.",
  },
  "pain.manual_scheduling": {
    en: "Manual scheduling",
    fr: "Planification manuelle",
    ar: "تنظيم المواعد باليد",
  },
  "pain.manual_scheduling.desc": {
    en: "Notebooks and chat messages make double bookings and conflicts likely.",
    fr: "Carnets et messages augmentent le risque de doubles réservations.",
    ar: "الكناش والرسائل كيزيدو احتمال تضارب المواعد.",
  },
  "pain.no_crm": {
    en: "Limited customer visibility",
    fr: "Visibilité client limitée",
    ar: "معرفة ناقصة بالزبناء",
  },
  "pain.no_crm.desc": {
    en: "You currently don't have a reliable system for identifying clients who haven't returned.",
    fr: "Vous n'avez pas de système fiable pour repérer les clients qui ne reviennent plus.",
    ar: "ما عندكش نظام مضمون باش تعرف شكون من الزبناء بقا ما رجعش.",
  },
  "pain.no_reminders": {
    en: "No appointment reminders",
    fr: "Aucun rappel de rendez-vous",
    ar: "ما كاينش تذكير بالمواعد",
  },
  "pain.no_reminders.desc": {
    en: "Clients forget appointments when nothing reminds them the day before.",
    fr: "Sans rappel la veille, les clients oublient leurs rendez-vous.",
    ar: "بلا تذكير قبل بنهار، الزبناء كينساو المواعد.",
  },
  "pain.multi_location": {
    en: "Multi-location management",
    fr: "Gestion multi-sites",
    ar: "تدبير عدة فروع",
  },
  "pain.multi_location.desc": {
    en: "Running several branches without shared visibility hides where performance drops.",
    fr: "Piloter plusieurs sites sans vue partagée masque les baisses de performance.",
    ar: "تدبير بزاف ديال الفروع بلا نظرة شاملة كيخبي فين كينقص الأداء.",
  },
  "pain.no_analytics": {
    en: "No revenue visibility",
    fr: "Pas de visibilité sur le revenu",
    ar: "ما كاينش وضوح فالمداخيل",
  },
  "pain.no_analytics.desc": {
    en: "Without reporting, it's hard to know which services and staff actually drive revenue.",
    fr: "Sans reporting, difficile de savoir quels services et employés génèrent le revenu.",
    ar: "بلا تقارير، صعيب تعرف شنو من الخدمات وشكون من الموظفين كيجيب الفلوس.",
  },
  "pain.team_coordination": {
    en: "Team coordination",
    fr: "Coordination d'équipe",
    ar: "تنسيق الفريق",
  },
  "pain.team_coordination.desc": {
    en: "Individual availability handled by hand slows everyone down.",
    fr: "Gérer les disponibilités à la main ralentit toute l'équipe.",
    ar: "تدبير أوقات كل واحد باليد كيعطل الجميع.",
  },

  // Auth / dashboard
  "auth.title": {
    en: "ReserNova sales sign in",
    fr: "Connexion équipe ReserNova",
    ar: "دخول فريق ReserNova",
  },
  "auth.subtitle": {
    en: "Internal access for the ReserNova team.",
    fr: "Accès interne réservé à l'équipe ReserNova.",
    ar: "دخول داخلي لفريق ReserNova.",
  },
  "auth.email": { en: "Work email", fr: "E-mail professionnel", ar: "الإيميل ديال الخدمة" },
  "auth.password": { en: "Password", fr: "Mot de passe", ar: "كلمة السر" },
  "auth.signIn": { en: "Sign in", fr: "Se connecter", ar: "دخول" },
  "auth.signUp": { en: "Create account", fr: "Créer un compte", ar: "إنشاء حساب" },
  "auth.toggleToSignUp": {
    en: "New here? Create an account",
    fr: "Nouveau ? Créer un compte",
    ar: "جديد؟ صاوب حساب",
  },
  "auth.toggleToSignIn": {
    en: "Already have an account? Sign in",
    fr: "Déjà un compte ? Se connecter",
    ar: "عندك حساب؟ دخل",
  },
  "auth.google": { en: "Continue with Google", fr: "Continuer avec Google", ar: "كمّل بـ Google" },
  "auth.checkEmail": {
    en: "Check your inbox to confirm your email address.",
    fr: "Vérifiez votre boîte mail pour confirmer votre adresse.",
    ar: "شوف الإيميل ديالك باش تأكد العنوان.",
  },
  "auth.signOut": { en: "Sign out", fr: "Déconnexion", ar: "خروج" },

  "dash.overview": { en: "Overview", fr: "Vue d'ensemble", ar: "نظرة عامة" },
  "dash.leads": { en: "Leads", fr: "Prospects", ar: "الزبناء المحتملين" },
  "dash.diagnostics": { en: "Diagnostics", fr: "Diagnostics", ar: "التشخيصات" },
  "dash.analytics": { en: "Analytics", fr: "Analyses", ar: "التحليلات" },
  "dash.settings": { en: "Settings", fr: "Paramètres", ar: "الإعدادات" },
  "dash.title": { en: "Sales dashboard", fr: "Tableau de bord commercial", ar: "لوحة المبيعات" },
  "dash.totalLeads": { en: "Total leads", fr: "Total prospects", ar: "مجموع الزبناء المحتملين" },
  "dash.hotLeads": { en: "Hot leads", fr: "Prospects chauds", ar: "زبناء ساخنين" },
  "dash.avgScore": { en: "Average score", fr: "Score moyen", ar: "معدل النقطة" },
  "dash.pipelineValue": {
    en: "Detected monthly opportunity",
    fr: "Opportunité mensuelle détectée",
    ar: "الفرصة الشهرية المكتشفة",
  },
  "dash.search": {
    en: "Search business, owner or city",
    fr: "Rechercher établissement, propriétaire ou ville",
    ar: "قلب على محل، مالك ولا مدينة",
  },
  "dash.noLeads": {
    en: "No leads yet",
    fr: "Aucun prospect pour l'instant",
    ar: "مازال ماكاين حتى زبون",
  },
  "dash.noLeads.body": {
    en: "Completed diagnostics will appear here automatically.",
    fr: "Les diagnostics terminés apparaîtront ici automatiquement.",
    ar: "التشخيصات المكملة غادي يبانو هنا بوحدهم.",
  },
  "dash.noResults": {
    en: "No results match your search",
    fr: "Aucun résultat ne correspond",
    ar: "ماكاين حتى نتيجة",
  },
  "dash.col.business": { en: "Business", fr: "Établissement", ar: "المحل" },
  "dash.col.owner": { en: "Owner", fr: "Propriétaire", ar: "المالك" },
  "dash.col.city": { en: "City", fr: "Ville", ar: "المدينة" },
  "dash.col.score": { en: "Score", fr: "Score", ar: "النقطة" },
  "dash.col.priority": { en: "Priority", fr: "Priorité", ar: "الأولوية" },
  "dash.col.plan": { en: "Plan", fr: "Offre", ar: "العرض" },
  "dash.col.pain": { en: "Main pain", fr: "Problème principal", ar: "المشكل الأساسي" },
  "dash.col.intent": { en: "Buying intent", fr: "Intention d'achat", ar: "نية الشراء" },
  "dash.col.created": { en: "Created", fr: "Créé", ar: "التاريخ" },
  "dash.col.status": { en: "Status", fr: "Statut", ar: "الحالة" },
  "dash.backToLeads": { en: "Back to leads", fr: "Retour aux prospects", ar: "رجوع للائحة" },
  "dash.leadScore": { en: "Lead score", fr: "Score du prospect", ar: "نقطة الزبون المحتمل" },
  "dash.mainPains": {
    en: "Main pain points",
    fr: "Points de douleur principaux",
    ar: "المشاكل الأساسية",
  },
  "dash.salesApproach": {
    en: "Recommended sales approach",
    fr: "Approche commerciale recommandée",
    ar: "الطريقة المنصوح بيها فالبيع",
  },
  "dash.primaryAngle": { en: "Primary angle", fr: "Angle principal", ar: "المدخل الأساسي" },
  "dash.objections": {
    en: "Expected objections",
    fr: "Objections attendues",
    ar: "الاعتراضات المتوقعة",
  },
  "dash.response": {
    en: "Recommended response",
    fr: "Réponse recommandée",
    ar: "الجواب المنصوح بيه",
  },
  "dash.nextAction": { en: "Next action", fr: "Prochaine action", ar: "الخطوة الجاية" },
  "dash.allAnswers": {
    en: "Full questionnaire answers",
    fr: "Toutes les réponses",
    ar: "جميع الأجوبة",
  },
  "dash.notes": { en: "Internal notes", fr: "Notes internes", ar: "ملاحظات داخلية" },
  "dash.addNote": { en: "Add a note", fr: "Ajouter une note", ar: "زيد ملاحظة" },
  "dash.saveNote": { en: "Save note", fr: "Enregistrer", ar: "سجل" },
  "dash.noNotes": { en: "No notes yet", fr: "Aucune note", ar: "ماكاين حتى ملاحظة" },
  "dash.statusUpdated": { en: "Status updated", fr: "Statut mis à jour", ar: "تبدلت الحالة" },
  "dash.unauthorized": {
    en: "You need to sign in to view this page",
    fr: "Connectez-vous pour voir cette page",
    ar: "خاصك تدخل باش تشوف هاد الصفحة",
  },
  "dash.openReport": {
    en: "Open client report",
    fr: "Ouvrir le rapport client",
    ar: "حل تقرير الزبون",
  },

  "status.new": { en: "New", fr: "Nouveau", ar: "جديد" },
  "status.contacted": { en: "Contacted", fr: "Contacté", ar: "تواصلنا" },
  "status.demo_scheduled": { en: "Demo scheduled", fr: "Démo planifiée", ar: "تحدد ديمو" },
  "status.trial": { en: "Trial", fr: "Essai", ar: "تجربة" },
  "status.won": { en: "Won", fr: "Gagné", ar: "ربحنا" },
  "status.lost": { en: "Lost", fr: "Perdu", ar: "خسرنا" },
  "status.nurture": { en: "Nurture", fr: "À nourrir", ar: "متابعة" },

  "lead.priority.hot": { en: "Hot", fr: "Chaud", ar: "ساخن" },
  "lead.priority.qualified": { en: "Qualified", fr: "Qualifié", ar: "مؤهل" },
  "lead.priority.nurture": { en: "Nurture", fr: "À nourrir", ar: "متابعة" },
  "lead.priority.low": { en: "Low priority", fr: "Priorité basse", ar: "أولوية ضعيفة" },

  "score.business_size": {
    en: "Business size",
    fr: "Taille de l'établissement",
    ar: "حجم المشروع",
  },
  "score.booking_volume": { en: "Booking volume", fr: "Volume de réservations", ar: "عدد المواعد" },
  "score.whatsapp_dependency": {
    en: "WhatsApp dependency",
    fr: "Dépendance WhatsApp",
    ar: "الاعتماد على واتساب",
  },
  "score.missed_bookings": {
    en: "Missed booking pain",
    fr: "Réservations manquées",
    ar: "المواعد الضايعة",
  },
  "score.noshow": { en: "No-show pain", fr: "Absences", ar: "الغيابات" },
  "score.crm_maturity": { en: "CRM maturity", fr: "Maturité CRM", ar: "نضج تدبير الزبناء" },
  "score.growth": { en: "Growth potential", fr: "Potentiel de croissance", ar: "إمكانية التطور" },
  "score.urgency": { en: "Buying urgency", fr: "Urgence d'achat", ar: "استعجال الشراء" },
};

export function translate(key: string, lang: Lang, params?: Record<string, string | number>): string {
  const entry = translations[key];
  const raw = !entry ? key : entry[lang] ?? entry.en;
  if (!params) return raw;
  return raw.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}
