import type { Lang } from "@/i18n/translations";

export type L10n = Record<Lang, string>;

export type QuestionType =
  | "single_choice"
  | "multiple_choice"
  | "number"
  | "currency"
  | "slider"
  | "yes_no"
  | "text"
  | "email"
  | "phone"
  | "url";

export type Option = { value: string; label: L10n };

export type Answers = Record<string, unknown>;

export type Question = {
  id: string;
  step: number;
  type: QuestionType;
  title: L10n;
  help?: L10n;
  placeholder?: L10n;
  options?: Option[];
  required?: boolean;
  min?: number;
  max?: number;
  stepSize?: number;
  unit?: L10n;
  /** Grouped compact fields render side by side on desktop. */
  compact?: boolean;
  condition?: (a: Answers) => boolean;
};

const t3 = (en: string, fr: string, ar: string): L10n => ({ en, fr, ar });

export const STEPS = [
  { index: 1, key: "step.1.name", titleKey: "step.1.title" },
  { index: 2, key: "step.2.name", titleKey: "step.2.title" },
  { index: 3, key: "step.3.name", titleKey: "step.3.title" },
  { index: 4, key: "step.4.name", titleKey: "step.4.title" },
  { index: 5, key: "step.5.name", titleKey: "step.5.title" },
  { index: 6, key: "step.6.name", titleKey: "step.6.title" },
  { index: 7, key: "step.7.name", titleKey: "step.7.title" },
  { index: 8, key: "step.8.name", titleKey: "step.8.title" },
  { index: 9, key: "step.9.name", titleKey: "results.title" },
];

const num = (a: Answers, id: string, fallback = 0): number => {
  const v = a[id];
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && !Number.isNaN(Number(v))) return Number(v);
  return fallback;
};

const has = (a: Answers, id: string, value: string): boolean => {
  const v = a[id];
  return Array.isArray(v) ? (v as string[]).includes(value) : v === value;
};

export const usesWhatsApp = (a: Answers) => has(a, "booking_channels", "whatsapp");
export const isMultiLocation = (a: Answers) => {
  const v = a["locations"];
  return v === "2" || v === "3_5" || v === "6plus";
};
export const isSolo = (a: Answers) => a["team_size"] === "solo";
export const hasNoShows = (a: Answers) => num(a, "noshows_per_month", 0) > 0;
export const isHighRevenue = (a: Answers) =>
  a["monthly_revenue"] === "100_250k" || a["monthly_revenue"] === "250k_plus" || a["monthly_revenue"] === "50_100k";

export const QUESTIONS: Question[] = [
  /* ---------------------------- STEP 1 — BUSINESS --------------------------- */
  {
    id: "business_name",
    step: 1,
    type: "text",
    required: true,
    compact: true,
    title: t3("Business name", "Nom de l'établissement", "سمية المحل"),
    placeholder: t3("Salon Amal", "Salon Amal", "صالون أمل"),
  },
  {
    id: "owner_name",
    step: 1,
    type: "text",
    required: true,
    compact: true,
    title: t3("Owner or decision maker", "Propriétaire ou décideur", "المالك ولا صاحب القرار"),
  },
  {
    id: "phone",
    step: 1,
    type: "phone",
    required: true,
    compact: true,
    title: t3("Phone number", "Numéro de téléphone", "رقم التيليفون"),
    placeholder: t3("06 12 34 56 78", "06 12 34 56 78", "06 12 34 56 78"),
  },
  {
    id: "whatsapp",
    step: 1,
    type: "phone",
    compact: true,
    title: t3("WhatsApp number", "Numéro WhatsApp", "رقم واتساب"),
    help: t3("Leave empty if it's the same number.", "Laissez vide si c'est le même numéro.", "خليه خاوي إلا كان نفس الرقم."),
  },
  {
    id: "email",
    step: 1,
    type: "email",
    compact: true,
    title: t3("Email", "E-mail", "الإيميل"),
  },
  {
    id: "city",
    step: 1,
    type: "text",
    required: true,
    compact: true,
    title: t3("City", "Ville", "المدينة"),
    placeholder: t3("Casablanca", "Casablanca", "الدار البيضاء"),
  },
  {
    id: "neighborhood",
    step: 1,
    type: "text",
    compact: true,
    title: t3("Neighborhood", "Quartier", "الحي"),
  },
  {
    id: "business_type",
    step: 1,
    type: "single_choice",
    required: true,
    title: t3("What type of business do you run?", "Quel type d'établissement gérez-vous ?", "شنو نوع المحل ديالك؟"),
    options: [
      { value: "hair_salon", label: t3("Hair Salon", "Salon de coiffure", "صالون الحلاقة") },
      { value: "barber", label: t3("Barber", "Barbier", "حلاق الرجال") },
      { value: "beauty_salon", label: t3("Beauty Salon", "Institut de beauté", "صالون التجميل") },
      { value: "nail_salon", label: t3("Nail Salon", "Onglerie", "صالون الأظافر") },
      { value: "spa", label: t3("Spa", "Spa", "سبا") },
      { value: "hammam", label: t3("Hammam", "Hammam", "حمام") },
      { value: "massage", label: t3("Massage", "Massage", "مساج") },
      { value: "aesthetic", label: t3("Aesthetic / Laser", "Esthétique / Laser", "طب التجميل / ليزر") },
      { value: "other", label: t3("Other", "Autre", "شي حاجة أخرى") },
    ],
  },
  {
    id: "locations",
    step: 1,
    type: "single_choice",
    required: true,
    title: t3("How many locations do you have?", "Combien d'établissements avez-vous ?", "شحال من فرع عندك؟"),
    options: [
      { value: "1", label: t3("1 location", "1 établissement", "فرع وحد") },
      { value: "2", label: t3("2 locations", "2 établissements", "جوج فروع") },
      { value: "3_5", label: t3("3–5 locations", "3–5 établissements", "3 حتى 5 فروع") },
      { value: "6plus", label: t3("6+ locations", "6+ établissements", "6 ولا كثر") },
    ],
  },
  {
    id: "years_in_business",
    step: 1,
    type: "single_choice",
    title: t3("How long have you been open?", "Depuis combien de temps êtes-vous ouvert ?", "شحال هادي وانت خدام؟"),
    options: [
      { value: "lt1", label: t3("Less than 1 year", "Moins d'un an", "أقل من عام") },
      { value: "1_3", label: t3("1–3 years", "1–3 ans", "من عام ل 3") },
      { value: "3_7", label: t3("3–7 years", "3–7 ans", "من 3 ل 7 سنين") },
      { value: "7plus", label: t3("More than 7 years", "Plus de 7 ans", "كثر من 7 سنين") },
    ],
  },
  {
    id: "online_presence",
    step: 1,
    type: "multiple_choice",
    title: t3("Where can clients find you online?", "Où vos clients vous trouvent-ils en ligne ?", "فين كيلقاوك الزبناء فالأنترنت؟"),
    options: [
      { value: "website", label: t3("Website", "Site web", "موقع إلكتروني") },
      { value: "instagram", label: t3("Instagram", "Instagram", "إنستغرام") },
      { value: "facebook", label: t3("Facebook", "Facebook", "فيسبوك") },
      { value: "google", label: t3("Google Maps", "Google Maps", "خرائط Google") },
      { value: "none", label: t3("Nowhere yet", "Nulle part encore", "مازال حتى بلاصة") },
    ],
  },
  {
    id: "website_url",
    step: 1,
    type: "url",
    title: t3("Website or Instagram link", "Lien du site ou Instagram", "رابط الموقع ولا إنستغرام"),
    placeholder: t3("instagram.com/…", "instagram.com/…", "instagram.com/…"),
    condition: (a) => has(a, "online_presence", "website") || has(a, "online_presence", "instagram"),
  },

  /* --------------------------- STEP 2 — OPERATIONS -------------------------- */
  {
    id: "team_size",
    step: 2,
    type: "single_choice",
    required: true,
    title: t3(
      "How many people currently work in your business?",
      "Combien de personnes travaillent actuellement chez vous ?",
      "شحال من واحد خدام معاك دابا؟",
    ),
    options: [
      { value: "solo", label: t3("Just me", "Seulement moi", "غير أنا") },
      { value: "2_3", label: t3("2–3", "2–3", "2 حتى 3") },
      { value: "4_7", label: t3("4–7", "4–7", "4 حتى 7") },
      { value: "8_15", label: t3("8–15", "8–15", "8 حتى 15") },
      { value: "15plus", label: t3("15+", "15+", "كثر من 15") },
    ],
  },
  {
    id: "service_providers",
    step: 2,
    type: "number",
    min: 1,
    max: 60,
    title: t3("How many of them provide services?", "Combien d'entre eux réalisent des prestations ?", "شحال فيهم كيخدمو مع الزبناء؟"),
    help: t3(
      "Only the people who actually take appointments.",
      "Uniquement celles et ceux qui prennent des rendez-vous.",
      "غير اللي كياخدو مواعد مع الزبناء.",
    ),
    condition: (a) => !isSolo(a),
  },
  {
    id: "hours_per_day",
    step: 2,
    type: "slider",
    min: 4,
    max: 16,
    stepSize: 1,
    compact: true,
    title: t3("How many hours do you operate per day?", "Combien d'heures ouvrez-vous par jour ?", "شحال من ساعة كتخدم فالنهار؟"),
    unit: t3("hours", "heures", "ساعة"),
  },
  {
    id: "days_per_week",
    step: 2,
    type: "slider",
    min: 1,
    max: 7,
    stepSize: 1,
    compact: true,
    title: t3("How many days per week?", "Combien de jours par semaine ?", "شحال من نهار فالسيمانة؟"),
    unit: t3("days", "jours", "أيام"),
  },
  {
    id: "individual_schedules",
    step: 2,
    type: "yes_no",
    title: t3("Do employees have individual schedules?", "Vos employés ont-ils des horaires individuels ?", "واش كل موظف عندو الوقت ديالو؟"),
    condition: (a) => !isSolo(a),
  },
  {
    id: "availability_tool",
    step: 2,
    type: "single_choice",
    title: t3(
      "How do you currently manage availability?",
      "Comment gérez-vous les disponibilités aujourd'hui ?",
      "كيفاش كتدبّر الأوقات المتاحة دابا؟",
    ),
    options: [
      { value: "notebook", label: t3("Notebook", "Carnet", "كناش") },
      { value: "whatsapp", label: t3("WhatsApp", "WhatsApp", "واتساب") },
      { value: "excel", label: t3("Excel", "Excel", "إكسيل") },
      { value: "google_calendar", label: t3("Google Calendar", "Google Agenda", "أجندة Google") },
      { value: "software", label: t3("Another software", "Un autre logiciel", "برنامج آخر") },
      { value: "nothing", label: t3("Nothing specific", "Rien de particulier", "ما كاين حتى حاجة") },
    ],
  },
  {
    id: "double_booking",
    step: 2,
    type: "single_choice",
    title: t3("How do you prevent double bookings?", "Comment évitez-vous les doubles réservations ?", "كيفاش كتمنع تضارب المواعد؟"),
    options: [
      { value: "calendar_software", label: t3("Calendar software", "Logiciel d'agenda", "برنامج أجندة") },
      { value: "manual", label: t3("Manual checking", "Vérification manuelle", "كنتشيكي باليد") },
      { value: "whatsapp", label: t3("WhatsApp", "WhatsApp", "واتساب") },
      { value: "notebook", label: t3("Notebook", "Carnet", "كناش") },
      { value: "conflicts", label: t3("We sometimes have conflicts", "Il y a parfois des conflits", "شي مرات كيتلاقاو المواعد") },
      { value: "none", label: t3("We don't have a system", "Nous n'avons pas de système", "ما عندنا حتى نظام") },
    ],
  },

  /* ---------------------------- STEP 3 — BOOKINGS --------------------------- */
  {
    id: "booking_channels",
    step: 3,
    type: "multiple_choice",
    required: true,
    title: t3(
      "Where do your clients usually contact you when they want to book?",
      "Par quel moyen vos clients vous contactent-ils généralement pour prendre rendez-vous ?",
      "فين كيتواصلو معاك الزبناء غالباً باش ياخدو موعد؟",
    ),
    options: [
      { value: "whatsapp", label: t3("WhatsApp", "WhatsApp", "واتساب") },
      { value: "phone", label: t3("Phone", "Téléphone", "التلفون") },
      { value: "instagram", label: t3("Instagram", "Instagram", "إنستغرام") },
      { value: "facebook", label: t3("Facebook", "Facebook", "فيسبوك") },
      { value: "walk_in", label: t3("Walk-in", "Sans rendez-vous", "كيجيو للصالون مباشرة") },
      { value: "website", label: t3("Website", "Site web", "الموقع") },
      { value: "platform", label: t3("Booking platform", "Plateforme de réservation", "منصة حجز") },
      { value: "other", label: t3("Other", "Autre", "شي حاجة أخرى") },
    ],
  },
  {
    id: "requests_per_week",
    step: 3,
    type: "slider",
    min: 0,
    max: 500,
    stepSize: 5,
    required: true,
    title: t3(
      "Approximately how many appointment requests do you receive every week?",
      "Combien de demandes de rendez-vous recevez-vous environ chaque semaine ?",
      "تقريباً شحال من طلب ديال موعد كيوصلك كل سيمانة؟",
    ),
    help: t3(
      "This helps us estimate how much booking demand your business handles.",
      "Cela nous aide à estimer le volume de demandes que vous gérez.",
      "هادشي كيعاونا نعرفو شحال ديال الطلب كتدبّر.",
    ),
    unit: t3("requests / week", "demandes / semaine", "طلب / فالسيمانة"),
  },
  {
    id: "response_time",
    step: 3,
    type: "single_choice",
    required: true,
    title: t3(
      "How quickly do you usually respond to WhatsApp booking requests?",
      "En combien de temps répondez-vous aux demandes WhatsApp ?",
      "فشحال كتجاوب على طلبات الحجز فواتساب؟",
    ),
    condition: usesWhatsApp,
    options: [
      { value: "immediately", label: t3("Immediately", "Immédiatement", "دغيا") },
      { value: "lt5", label: t3("Less than 5 minutes", "Moins de 5 minutes", "أقل من 5 دقايق") },
      { value: "5_15", label: t3("5–15 minutes", "5–15 minutes", "من 5 ل 15 دقيقة") },
      { value: "15_30", label: t3("15–30 minutes", "15–30 minutes", "من 15 ل 30 دقيقة") },
      { value: "30_60", label: t3("30–60 minutes", "30–60 minutes", "من 30 ل 60 دقيقة") },
      { value: "gt60", label: t3("More than 1 hour", "Plus d'une heure", "كثر من ساعة") },
      { value: "next_day", label: t3("Sometimes the next day", "Parfois le lendemain", "شي مرات غدا") },
    ],
  },
  {
    id: "who_handles",
    step: 3,
    type: "single_choice",
    title: t3("Who usually handles booking messages?", "Qui gère habituellement les messages de réservation ?", "شكون غالباً كيرد على رسائل الحجز؟"),
    options: [
      { value: "me", label: t3("Me", "Moi", "أنا") },
      { value: "receptionist", label: t3("Receptionist", "Réceptionniste", "موظفة الاستقبال") },
      { value: "staff", label: t3("Staff members", "Les employés", "الموظفين") },
      { value: "multiple", label: t3("Multiple people", "Plusieurs personnes", "بزاف ديال الناس") },
      { value: "nobody", label: t3("Nobody specifically", "Personne en particulier", "ما كاين حتى واحد بالضبط") },
    ],
  },

  /* ------------------------ STEP 4 — MISSED OPPORTUNITIES ------------------- */
  {
    id: "busy_hours_behavior",
    step: 4,
    type: "single_choice",
    required: true,
    title: t3(
      "During busy hours, what happens when a new client sends a WhatsApp message?",
      "Aux heures de pointe, que se passe-t-il quand un nouveau client envoie un message WhatsApp ?",
      "منين تكون مشغول بزاف، شنو كيوقع ملي شي زبون جديد كيصيفط رسالة فواتساب؟",
    ),
    options: [
      { value: "immediate", label: t3("I answer immediately", "Je réponds immédiatement", "كنجاوب دغيا") },
      { value: "team", label: t3("Someone on my team answers", "Quelqu'un de mon équipe répond", "شي واحد من الفريق كيجاوب") },
      { value: "when_free", label: t3("We answer when we're free", "Nous répondons quand nous sommes libres", "كنجاوبو ملي نتفرغو") },
      { value: "forget", label: t3("Sometimes we forget", "Parfois nous oublions", "شي مرات كننساو") },
      { value: "miss", label: t3("We often miss messages", "Nous ratons souvent des messages", "بزاف ديال المرات كتفوتنا رسائل") },
    ],
  },
  {
    id: "late_discovery",
    step: 4,
    type: "single_choice",
    required: true,
    title: t3(
      "Have you ever discovered a WhatsApp message hours later and realized the client wanted to book?",
      "Vous est-il arrivé de découvrir un message WhatsApp des heures plus tard en réalisant que le client voulait réserver ?",
      "واش وقع ليك لقيتي رسالة فواتساب من بعد شي ساعات وعرفتي بلي الزبون كان باغي ياخد موعد؟",
    ),
    options: [
      { value: "never", label: t3("Never", "Jamais", "عمرها") },
      { value: "rarely", label: t3("Rarely", "Rarement", "قليل") },
      { value: "sometimes", label: t3("Sometimes", "Parfois", "شي مرات") },
      { value: "often", label: t3("Often", "Souvent", "بزاف") },
      { value: "very_often", label: t3("Very often", "Très souvent", "بزاف بزاف") },
    ],
  },
  {
    id: "unconverted_per_month",
    step: 4,
    type: "slider",
    min: 0,
    max: 200,
    stepSize: 1,
    required: true,
    title: t3(
      "Approximately how many booking requests do you think you don't convert each month?",
      "Combien de demandes de rendez-vous pensez-vous ne pas convertir chaque mois ?",
      "تقريباً شحال من طلب موعد كتحس بلي ما كيتحولش لموعد كل شهر؟",
    ),
    help: t3(
      "An approximation is enough — we only need an order of magnitude.",
      "Une estimation suffit — nous cherchons un ordre de grandeur.",
      "تقدير كافي — غير باش نعرفو الحجم تقريباً.",
    ),
    unit: t3("requests / month", "demandes / mois", "طلب / فالشهر"),
  },
  {
    id: "average_ticket",
    step: 4,
    type: "currency",
    min: 0,
    max: 5000,
    required: true,
    title: t3("What is the average value of one appointment?", "Quelle est la valeur moyenne d'un rendez-vous ?", "شحال معدل ثمن الموعد الواحد؟"),
    unit: t3("DH", "DH", "درهم"),
  },

  /* ----------------------------- STEP 5 — NO-SHOWS -------------------------- */
  {
    id: "appointments_per_month",
    step: 5,
    type: "slider",
    min: 0,
    max: 2000,
    stepSize: 10,
    required: true,
    title: t3(
      "How many appointments do you handle per month?",
      "Combien de rendez-vous réalisez-vous par mois ?",
      "شحال من موعد كتدبّر فالشهر؟",
    ),
    unit: t3("appointments / month", "rendez-vous / mois", "موعد / فالشهر"),
  },
  {
    id: "noshows_per_month",
    step: 5,
    type: "slider",
    min: 0,
    max: 300,
    stepSize: 1,
    required: true,
    title: t3(
      "Approximately how many clients don't show up?",
      "Environ combien de clients ne se présentent pas ?",
      "تقريباً شحال من زبون ما كيجيش؟",
    ),
    unit: t3("no-shows / month", "absences / mois", "غياب / فالشهر"),
  },
  {
    id: "sends_reminders",
    step: 5,
    type: "yes_no",
    title: t3("Do you send appointment reminders?", "Envoyez-vous des rappels de rendez-vous ?", "واش كتصيفط تذكير بالموعد؟"),
    condition: hasNoShows,
  },
  {
    id: "reminder_channel",
    step: 5,
    type: "single_choice",
    title: t3("How are reminders sent?", "Comment les rappels sont-ils envoyés ?", "كيفاش كتصيفط التذكير؟"),
    condition: (a) => hasNoShows(a) && a["sends_reminders"] === "yes",
    options: [
      { value: "manual_whatsapp", label: t3("Manually on WhatsApp", "Manuellement sur WhatsApp", "باليد فواتساب") },
      { value: "manual_call", label: t3("By calling the client", "En appelant le client", "بالتيليفون") },
      { value: "sms", label: t3("SMS", "SMS", "رسالة SMS") },
      { value: "automatic", label: t3("Automatically by software", "Automatiquement par logiciel", "أوتوماتيك ببرنامج") },
    ],
  },

  /* -------------------------------- STEP 6 — CRM ---------------------------- */
  {
    id: "client_data_location",
    step: 6,
    type: "single_choice",
    required: true,
    title: t3(
      "Where do you keep information about your clients?",
      "Où conservez-vous les informations sur vos clients ?",
      "فين كتحتافظ بمعلومات الزبناء؟",
    ),
    options: [
      { value: "nowhere", label: t3("Nowhere", "Nulle part", "حتى بلاصة") },
      { value: "contacts", label: t3("Phone contacts", "Contacts du téléphone", "أرقام التيليفون") },
      { value: "whatsapp", label: t3("WhatsApp", "WhatsApp", "واتساب") },
      { value: "notebook", label: t3("Notebook", "Carnet", "كناش") },
      { value: "excel", label: t3("Excel", "Excel", "إكسيل") },
      { value: "software", label: t3("Another software", "Un autre logiciel", "برنامج آخر") },
      { value: "crm", label: t3("A CRM", "Un CRM", "CRM") },
    ],
  },
  {
    id: "crm_name",
    step: 6,
    type: "text",
    title: t3("Which CRM do you use?", "Quel CRM utilisez-vous ?", "شنو CRM اللي كتستعمل؟"),
    condition: (a) => a["client_data_location"] === "crm" || a["client_data_location"] === "software",
  },
  {
    id: "crm_feedback",
    step: 6,
    type: "text",
    title: t3(
      "What works well and what doesn't with it?",
      "Qu'est-ce qui fonctionne bien ou non avec cet outil ?",
      "شنو كيعجبك وشنو ما كيعجبكش فيه؟",
    ),
    condition: (a) => a["client_data_location"] === "crm" || a["client_data_location"] === "software",
  },
  {
    id: "sees_history",
    step: 6,
    type: "yes_no",
    compact: true,
    title: t3("Can you see a client's previous appointments?", "Pouvez-vous voir les rendez-vous passés d'un client ?", "واش تقدر تشوف المواعد القدام ديال شي زبون؟"),
  },
  {
    id: "sees_spend",
    step: 6,
    type: "yes_no",
    compact: true,
    title: t3(
      "Can you see how much a client has spent with your business?",
      "Pouvez-vous voir combien un client a dépensé chez vous ?",
      "واش تقدر تشوف شحال صرف عندك شي زبون؟",
    ),
  },
  {
    id: "sees_inactive",
    step: 6,
    type: "yes_no",
    compact: true,
    title: t3(
      "Can you identify clients who haven't visited recently?",
      "Pouvez-vous repérer les clients qui ne sont pas revenus récemment ?",
      "واش تقدر تعرف الزبناء اللي مدة ما جاو؟",
    ),
  },
  {
    id: "personalized_offers",
    step: 6,
    type: "single_choice",
    title: t3(
      "Do you send personalized offers to existing clients?",
      "Envoyez-vous des offres personnalisées à vos clients existants ?",
      "واش كتصيفط عروض خاصة للزبناء ديالك؟",
    ),
    options: [
      { value: "never", label: t3("Never", "Jamais", "عمرني") },
      { value: "rarely", label: t3("Rarely", "Rarement", "قليل") },
      { value: "sometimes", label: t3("Sometimes", "Parfois", "شي مرات") },
      { value: "frequently", label: t3("Frequently", "Fréquemment", "بزاف") },
    ],
  },
  {
    id: "wants_reactivation",
    step: 6,
    type: "yes_no",
    title: t3(
      "If a client hasn't visited for 60 days, would you like to automatically identify them and contact them?",
      "Si un client n'est pas venu depuis 60 jours, aimeriez-vous le repérer et le recontacter automatiquement ?",
      "إلا شي زبون دازو 60 يوم ما جا، واش كتبغي تعرفو وتتواصل معاه أوتوماتيكياً؟",
    ),
  },

  /* ------------------------------- STEP 7 — GROWTH -------------------------- */
  {
    id: "monthly_revenue",
    step: 7,
    type: "single_choice",
    required: true,
    title: t3("What is your monthly revenue range?", "Quelle est votre tranche de chiffre d'affaires mensuel ?", "شحال دخلك الشهري تقريباً؟"),
    help: t3("An approximate range is enough.", "Une fourchette approximative suffit.", "غير تقريباً، ماشي بالضبط."),
    options: [
      { value: "lt10k", label: t3("Under 10,000 DH", "Moins de 10 000 DH", "أقل من 10.000 درهم") },
      { value: "10_25k", label: t3("10,000–25,000 DH", "10 000–25 000 DH", "من 10.000 ل 25.000 درهم") },
      { value: "25_50k", label: t3("25,000–50,000 DH", "25 000–50 000 DH", "من 25.000 ل 50.000 درهم") },
      { value: "50_100k", label: t3("50,000–100,000 DH", "50 000–100 000 DH", "من 50.000 ل 100.000 درهم") },
      { value: "100_250k", label: t3("100,000–250,000 DH", "100 000–250 000 DH", "من 100.000 ل 250.000 درهم") },
      { value: "250k_plus", label: t3("250,000+ DH", "250 000+ DH", "كثر من 250.000 درهم") },
    ],
  },
  {
    id: "biggest_challenges",
    step: 7,
    type: "multiple_choice",
    required: true,
    title: t3("What is your biggest challenge right now?", "Quel est votre plus grand défi actuellement ?", "شنو أكبر مشكل عندك دابا؟"),
    options: [
      { value: "new_clients", label: t3("Getting new clients", "Trouver de nouveaux clients", "جلب زبناء جدد") },
      { value: "retention", label: t3("Keeping existing clients", "Fidéliser les clients", "الحفاظ على الزبناء") },
      { value: "bookings", label: t3("Managing bookings", "Gérer les réservations", "تدبير المواعد") },
      { value: "noshows", label: t3("No-shows", "Les absences", "الزبناء اللي ما كيجيوش") },
      { value: "staff", label: t3("Staff management", "Gestion du personnel", "تدبير الموظفين") },
      { value: "whatsapp", label: t3("WhatsApp messages", "Les messages WhatsApp", "رسائل واتساب") },
      { value: "revenue", label: t3("Increasing revenue", "Augmenter le revenu", "زيادة المداخيل") },
      { value: "multi_location", label: t3("Managing multiple locations", "Gérer plusieurs sites", "تدبير بزاف ديال الفروع") },
      { value: "performance", label: t3("Understanding business performance", "Comprendre la performance", "فهم أداء المشروع") },
    ],
  },
  {
    id: "expansion_plan",
    step: 7,
    type: "single_choice",
    title: t3("Are you planning to open another location?", "Prévoyez-vous d'ouvrir un autre établissement ?", "واش ناوي تحل شي فرع آخر؟"),
    options: [
      { value: "12m", label: t3("Yes, within 12 months", "Oui, d'ici 12 mois", "أه، فأقل من 12 شهر") },
      { value: "eventually", label: t3("Yes, eventually", "Oui, un jour", "أه، من بعد") },
      { value: "maybe", label: t3("Maybe", "Peut-être", "يمكن") },
      { value: "no", label: t3("No", "Non", "لا") },
    ],
  },
  {
    id: "cross_location_visibility",
    step: 7,
    type: "yes_no",
    title: t3(
      "Can you compare performance between your locations today?",
      "Pouvez-vous comparer la performance entre vos établissements ?",
      "واش تقدر تقارن الأداء بين الفروع ديالك؟",
    ),
    condition: isMultiLocation,
  },
  {
    id: "reporting_frequency",
    step: 7,
    type: "single_choice",
    title: t3(
      "How often do you review your business numbers?",
      "À quelle fréquence analysez-vous vos chiffres ?",
      "شحال من مرة كتشوف الأرقام ديال المشروع؟",
    ),
    condition: isHighRevenue,
    options: [
      { value: "daily", label: t3("Daily", "Chaque jour", "كل نهار") },
      { value: "weekly", label: t3("Weekly", "Chaque semaine", "كل سيمانة") },
      { value: "monthly", label: t3("Monthly", "Chaque mois", "كل شهر") },
      { value: "rarely", label: t3("Rarely", "Rarement", "قليل") },
      { value: "never", label: t3("Never", "Jamais", "عمرني") },
    ],
  },

  /* --------------------------- STEP 8 — BUYING INTENT ----------------------- */
  {
    id: "decision_maker",
    step: 8,
    type: "single_choice",
    required: true,
    title: t3(
      "Who usually makes decisions about new software?",
      "Qui décide habituellement pour les nouveaux logiciels ?",
      "شكون غالباً كياخد القرار على البرامج الجديدة؟",
    ),
    options: [
      { value: "me", label: t3("Me", "Moi", "أنا") },
      { value: "partner", label: t3("My partner", "Mon associé", "الشريك ديالي") },
      { value: "manager", label: t3("Manager", "Le manager", "المسؤول") },
      { value: "someone_else", label: t3("Someone else", "Quelqu'un d'autre", "شي واحد آخر") },
    ],
  },
  {
    id: "timeline",
    step: 8,
    type: "single_choice",
    required: true,
    title: t3(
      "If you found a solution that could save time and increase revenue, when would you consider implementing it?",
      "Si vous trouviez une solution qui fait gagner du temps et augmente le revenu, quand l'implémenteriez-vous ?",
      "إلا لقيتي حل كيربح ليك الوقت وكيزيد الدخل، إمتا غادي تفكر تستعملو؟",
    ),
    options: [
      { value: "immediately", label: t3("Immediately", "Immédiatement", "دابا") },
      { value: "this_month", label: t3("This month", "Ce mois-ci", "هاد الشهر") },
      { value: "3m", label: t3("Within 3 months", "D'ici 3 mois", "فأقل من 3 شهور") },
      { value: "3_6m", label: t3("3–6 months", "3–6 mois", "من 3 ل 6 شهور") },
      { value: "researching", label: t3("Just researching", "Je me renseigne", "غير كنقلب") },
    ],
  },
  {
    id: "objections",
    step: 8,
    type: "multiple_choice",
    title: t3(
      "What would prevent you from adopting a new system?",
      "Qu'est-ce qui vous empêcherait d'adopter un nouveau système ?",
      "شنو ممكن يمنعك تستعمل نظام جديد؟",
    ),
    options: [
      { value: "price", label: t3("Price", "Le prix", "الثمن") },
      { value: "difficult", label: t3("Difficult to use", "Difficile à utiliser", "صعيب يتستعمل") },
      { value: "team_adoption", label: t3("Team won't use it", "L'équipe ne l'utilisera pas", "الفريق ما غاديش يستعملو") },
      { value: "whatsapp_change", label: t3("Don't want to change WhatsApp", "Ne pas vouloir changer WhatsApp", "ما بغيتش نبدل واتساب") },
      { value: "trust_automation", label: t3("Don't trust automation", "Méfiance envers l'automatisation", "ما كنثيقش فالأوتوماتيك") },
      { value: "features", label: t3("Need specific features", "Besoin de fonctionnalités précises", "خاصني خصائص معينة") },
      { value: "partner", label: t3("Need to discuss with partner", "Doit en parler à mon associé", "خاصني نتشاور مع الشريك") },
      { value: "nothing", label: t3("Nothing", "Rien", "والو") },
    ],
  },
];

export function visibleQuestions(answers: Answers, step: number): Question[] {
  return QUESTIONS.filter((q) => q.step === step && (!q.condition || q.condition(answers)));
}

export function answeredValue(answers: Answers, id: string) {
  return answers[id];
}

export function isAnswered(q: Question, answers: Answers): boolean {
  const v = answers[q.id];
  if (v === undefined || v === null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "string") return v.trim() !== "";
  return true;
}

export const numAnswer = num;
export const hasAnswer = has;
