import { hasAnswer, isMultiLocation, numAnswer, type Answers } from "./questions";

export type ScoreCategory =
  | "business_size"
  | "booking_volume"
  | "whatsapp_dependency"
  | "missed_bookings"
  | "noshow"
  | "crm_maturity"
  | "growth"
  | "urgency";

export const SCORE_MAX: Record<ScoreCategory, number> = {
  business_size: 20,
  booking_volume: 20,
  whatsapp_dependency: 15,
  missed_bookings: 15,
  noshow: 10,
  crm_maturity: 10,
  growth: 5,
  urgency: 5,
};

export type PainKey =
  | "missed_whatsapp"
  | "slow_response"
  | "high_noshow"
  | "manual_scheduling"
  | "no_crm"
  | "no_reminders"
  | "multi_location"
  | "no_analytics"
  | "team_coordination";

export type ProductKey =
  | "ai_receptionist"
  | "whatsapp_booking"
  | "smart_calendar"
  | "reminders"
  | "crm"
  | "analytics"
  | "team"
  | "multi_location";

export type Severity = "high" | "medium" | "low";
export type Priority = "high" | "medium" | "low";
export type PlanKey = "free" | "starter" | "pro" | "custom";
export type LeadPriority = "hot" | "qualified" | "nurture" | "low";

export type PainPoint = {
  key: PainKey;
  severity: Severity;
  product: ProductKey;
  estimatedImpact?: number;
};

export type Recommendation = { product: ProductKey; priority: Priority; rank: number };

export type Diagnosis = {
  scores: Record<ScoreCategory, number>;
  totalScore: number;
  leadPriority: LeadPriority;
  categoryHealth: { key: "operations" | "bookings" | "retention" | "visibility"; value: number }[];
  painPoints: PainPoint[];
  recommendations: Recommendation[];
  roi: {
    missedBookingsPerMonth: number;
    averageTicket: number;
    missedRevenue: number;
    appointmentsPerMonth: number;
    noShowsPerMonth: number;
    noShowRate: number;
    noShowRevenue: number;
    totalOpportunity: number;
    planPrice: number;
    ratio: number;
  };
  plan: PlanKey;
  objections: string[];
};

export const PLAN_PRICES: Record<PlanKey, number> = { free: 0, starter: 299, pro: 549, custom: 0 };

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const TEAM_POINTS: Record<string, number> = { solo: 4, "2_3": 9, "4_7": 14, "8_15": 18, "15plus": 20 };
const LOCATION_BONUS: Record<string, number> = { "1": 0, "2": 3, "3_5": 5, "6plus": 6 };
const REVENUE_POINTS: Record<string, number> = {
  lt10k: 2,
  "10_25k": 5,
  "25_50k": 9,
  "50_100k": 13,
  "100_250k": 17,
  "250k_plus": 20,
};
const RESPONSE_LAG: Record<string, number> = {
  immediately: 0,
  lt5: 1,
  "5_15": 4,
  "15_30": 7,
  "30_60": 10,
  gt60: 13,
  next_day: 15,
};
const LATE_DISCOVERY: Record<string, number> = { never: 0, rarely: 3, sometimes: 7, often: 11, very_often: 15 };
const BUSY_BEHAVIOR: Record<string, number> = { immediate: 0, team: 2, when_free: 7, forget: 11, miss: 15 };
const URGENCY: Record<string, number> = { immediately: 5, this_month: 4, "3m": 3, "3_6m": 2, researching: 1 };

export function computeDiagnosis(answers: Answers): Diagnosis {
  /* ------------------------------- scoring -------------------------------- */
  const teamPts = TEAM_POINTS[String(answers["team_size"] ?? "")] ?? 4;
  const revenuePts = REVENUE_POINTS[String(answers["monthly_revenue"] ?? "")] ?? 4;
  const locBonus = LOCATION_BONUS[String(answers["locations"] ?? "1")] ?? 0;
  const business_size = clamp(Math.round((teamPts + revenuePts) / 2) + locBonus, 0, 20);

  const requestsPerWeek = numAnswer(answers, "requests_per_week", 0);
  const booking_volume = clamp(Math.round((requestsPerWeek / 150) * 20), 0, 20);

  const channels = Array.isArray(answers["booking_channels"]) ? (answers["booking_channels"] as string[]) : [];
  const usesWa = channels.includes("whatsapp");
  const usesInsta = channels.includes("instagram") || channels.includes("facebook");
  const manualChannels = channels.filter((c) => ["whatsapp", "phone", "instagram", "facebook"].includes(c)).length;
  const whatsapp_dependency = clamp((usesWa ? 8 : 0) + (usesInsta ? 3 : 0) + manualChannels * 1.5, 0, 15);

  const responseLag = RESPONSE_LAG[String(answers["response_time"] ?? "")] ?? 5;
  const late = LATE_DISCOVERY[String(answers["late_discovery"] ?? "")] ?? 0;
  const busy = BUSY_BEHAVIOR[String(answers["busy_hours_behavior"] ?? "")] ?? 0;
  const missed_bookings = clamp(Math.round((responseLag + late + busy) / 3), 0, 15);

  const appointmentsPerMonth = numAnswer(answers, "appointments_per_month", 0);
  const noShowsPerMonth = numAnswer(answers, "noshows_per_month", 0);
  const noShowRate = appointmentsPerMonth > 0 ? (noShowsPerMonth / appointmentsPerMonth) * 100 : 0;
  const noshow = clamp(Math.round((noShowRate / 15) * 10), 0, 10);

  const dataLoc = String(answers["client_data_location"] ?? "nowhere");
  const crmBase: Record<string, number> = {
    nowhere: 10,
    contacts: 9,
    whatsapp: 8,
    notebook: 8,
    excel: 6,
    software: 3,
    crm: 1,
  };
  const visibilityGaps =
    (answers["sees_history"] === "no" ? 1 : 0) +
    (answers["sees_spend"] === "no" ? 1 : 0) +
    (answers["sees_inactive"] === "no" ? 1 : 0);
  const crm_maturity = clamp(Math.round(((crmBase[dataLoc] ?? 8) + visibilityGaps) / 1.3), 0, 10);

  const expansion = String(answers["expansion_plan"] ?? "");
  const growth = clamp(
    (expansion === "12m" ? 5 : expansion === "eventually" ? 3 : expansion === "maybe" ? 2 : 1) +
      (isMultiLocation(answers) ? 1 : 0),
    0,
    5,
  );

  const urgency = URGENCY[String(answers["timeline"] ?? "")] ?? 1;

  const scores: Record<ScoreCategory, number> = {
    business_size,
    booking_volume,
    whatsapp_dependency: Math.round(whatsapp_dependency),
    missed_bookings,
    noshow,
    crm_maturity,
    growth,
    urgency,
  };

  const totalScore = Object.values(scores).reduce((s, v) => s + v, 0);
  const leadPriority: LeadPriority =
    totalScore >= 80 ? "hot" : totalScore >= 60 ? "qualified" : totalScore >= 40 ? "nurture" : "low";

  /* --------------------------- health categories --------------------------- */
  const schedulingManual = ["notebook", "whatsapp", "nothing", "excel"].includes(
    String(answers["availability_tool"] ?? "nothing"),
  );
  const conflictRisk = ["conflicts", "none", "manual", "notebook", "whatsapp"].includes(
    String(answers["double_booking"] ?? "none"),
  );
  const operations = clamp(
    100 - (schedulingManual ? 30 : 0) - (conflictRisk ? 22 : 0) - (answers["individual_schedules"] === "no" ? 10 : 0),
    10,
    98,
  );
  const bookings = clamp(100 - responseLag * 3 - busy * 2 - (usesWa && !answers["response_time"] ? 5 : 0), 10, 98);
  const retention = clamp(
    100 - crm_maturity * 7 - (answers["personalized_offers"] === "never" ? 12 : 0),
    8,
    98,
  );
  const reportingWeak = ["rarely", "never", ""].includes(String(answers["reporting_frequency"] ?? ""));
  const visibility = clamp(
    100 - (answers["sees_spend"] === "no" ? 30 : 0) - (dataLoc === "nowhere" ? 25 : 0) - (reportingWeak ? 15 : 0),
    8,
    98,
  );

  /* ------------------------------ pain points ------------------------------ */
  const averageTicket = numAnswer(answers, "average_ticket", 0);
  const unconverted = numAnswer(answers, "unconverted_per_month", 0);
  const missedRevenue = Math.round(unconverted * averageTicket);
  const noShowRevenue = Math.round(noShowsPerMonth * averageTicket);

  const pains: PainPoint[] = [];
  if (usesWa && (responseLag >= 4 || busy >= 7 || late >= 7)) {
    pains.push({
      key: "missed_whatsapp",
      severity: responseLag >= 10 || busy >= 11 ? "high" : "medium",
      product: "ai_receptionist",
      estimatedImpact: missedRevenue,
    });
  }
  if (responseLag >= 7) {
    pains.push({ key: "slow_response", severity: responseLag >= 13 ? "high" : "medium", product: "whatsapp_booking" });
  }
  if (noShowRate > 5) {
    pains.push({
      key: "high_noshow",
      severity: noShowRate > 10 ? "high" : "medium",
      product: "reminders",
      estimatedImpact: noShowRevenue,
    });
  }
  if (answers["sends_reminders"] === "no" && noShowsPerMonth > 0) {
    pains.push({ key: "no_reminders", severity: "medium", product: "reminders", estimatedImpact: noShowRevenue });
  }
  if (schedulingManual || conflictRisk) {
    pains.push({ key: "manual_scheduling", severity: conflictRisk ? "high" : "medium", product: "smart_calendar" });
  }
  if (["nowhere", "contacts", "whatsapp", "notebook"].includes(dataLoc) || visibilityGaps >= 2) {
    pains.push({ key: "no_crm", severity: dataLoc === "nowhere" ? "high" : "medium", product: "crm" });
  }
  if (isMultiLocation(answers)) {
    pains.push({
      key: "multi_location",
      severity: answers["cross_location_visibility"] === "no" ? "high" : "medium",
      product: "multi_location",
    });
  }
  if (answers["sees_spend"] === "no" || reportingWeak) {
    pains.push({ key: "no_analytics", severity: "medium", product: "analytics" });
  }
  if (
    !["solo"].includes(String(answers["team_size"])) &&
    (answers["individual_schedules"] === "no" || hasAnswer(answers, "biggest_challenges", "staff"))
  ) {
    pains.push({ key: "team_coordination", severity: "medium", product: "team" });
  }

  const severityWeight: Record<Severity, number> = { high: 3, medium: 2, low: 1 };
  pains.sort(
    (a, b) =>
      severityWeight[b.severity] - severityWeight[a.severity] || (b.estimatedImpact ?? 0) - (a.estimatedImpact ?? 0),
  );

  /* ---------------------------- recommendations ---------------------------- */
  const recoMap = new Map<ProductKey, Priority>();
  pains.forEach((p) => {
    const priority: Priority = p.severity === "high" ? "high" : "medium";
    const existing = recoMap.get(p.product);
    if (!existing || (existing !== "high" && priority === "high")) recoMap.set(p.product, priority);
  });
  if (!recoMap.has("smart_calendar")) recoMap.set("smart_calendar", "medium");
  if (usesWa && !recoMap.has("ai_receptionist")) recoMap.set("ai_receptionist", "medium");

  const order: Priority[] = ["high", "medium", "low"];
  const recommendations: Recommendation[] = [...recoMap.entries()]
    .sort((a, b) => order.indexOf(a[1]) - order.indexOf(b[1]))
    .map(([product, priority], i) => ({ product, priority, rank: i + 1 }));

  /* --------------------------------- plan ---------------------------------- */
  const bigTeam = ["8_15", "15plus"].includes(String(answers["team_size"]));
  const manyLocations = ["3_5", "6plus"].includes(String(answers["locations"]));
  const highVolume = requestsPerWeek >= 120;
  const midVolume = requestsPerWeek >= 45;
  const plan: PlanKey =
    manyLocations || (bigTeam && highVolume)
      ? "custom"
      : highVolume || midVolume || bigTeam || answers["locations"] === "2" || crm_maturity >= 7
        ? "pro"
        : "starter";

  const planPrice = PLAN_PRICES[plan] || PLAN_PRICES.pro;
  const totalOpportunity = missedRevenue + noShowRevenue;

  return {
    scores,
    totalScore,
    leadPriority,
    categoryHealth: [
      { key: "operations", value: Math.round(operations) },
      { key: "bookings", value: Math.round(bookings) },
      { key: "retention", value: Math.round(retention) },
      { key: "visibility", value: Math.round(visibility) },
    ],
    painPoints: pains,
    recommendations,
    roi: {
      missedBookingsPerMonth: unconverted,
      averageTicket,
      missedRevenue,
      appointmentsPerMonth,
      noShowsPerMonth,
      noShowRate: Math.round(noShowRate * 10) / 10,
      noShowRevenue,
      totalOpportunity,
      planPrice,
      ratio: planPrice > 0 ? Math.round((totalOpportunity / planPrice) * 10) / 10 : 0,
    },
    plan,
    objections: Array.isArray(answers["objections"]) ? (answers["objections"] as string[]) : [],
  };
}

/* ------------------------------ sales insights ----------------------------- */

export type SalesInsight = {
  angleKey: PainKey | "generic";
  objectionResponses: { objection: string; response: string }[];
  nextAction: string;
};

const OBJECTION_RESPONSES: Record<string, string> = {
  price:
    "Anchor on the detected monthly opportunity versus the plan price — the diagnostic already quantifies the gap in DH.",
  difficult:
    "Show the WhatsApp-first flow: the owner keeps the same habits, ReserNova works inside the conversation they already have.",
  team_adoption:
    "Offer a staged rollout: start with bookings and reminders only, add team schedules once the staff sees fewer conflicts.",
  whatsapp_change:
    "Reassure explicitly: the number does not change. ReserNova is designed to work with existing WhatsApp Business workflows.",
  trust_automation:
    "Propose supervised mode first — the AI drafts replies and the owner confirms, then switch to full automation.",
  features: "Collect the exact feature list during the demo and map each one to an existing ReserNova module.",
  partner: "Invite the partner to the demo and send the written diagnostic report before the call.",
  nothing: "No stated blocker — push directly for a demo slot in the next 48 hours.",
};

export function buildSalesInsight(d: Diagnosis): SalesInsight {
  const angleKey = d.painPoints[0]?.key ?? "generic";
  const objectionResponses = d.objections.map((o) => ({
    objection: o,
    response: OBJECTION_RESPONSES[o] ?? "Explore the concern during discovery and address it with a concrete example.",
  }));
  const nextAction =
    d.leadPriority === "hot"
      ? "Book a demo within 48 hours."
      : d.leadPriority === "qualified"
        ? "Book a demo this week and send the report on WhatsApp."
        : d.leadPriority === "nurture"
          ? "Send the report and follow up in 2 weeks."
          : "Add to the long-term nurture list.";
  return { angleKey, objectionResponses, nextAction };
}

export function formatMAD(value: number, lang: string): string {
  const locale = lang === "fr" ? "fr-MA" : lang === "ar" ? "ar-MA" : "en-US";
  try {
    return new Intl.NumberFormat(locale === "ar-MA" ? "en-US" : locale, { maximumFractionDigits: 0 }).format(
      Math.round(value),
    );
  } catch {
    return String(Math.round(value));
  }
}
