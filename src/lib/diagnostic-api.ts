import { supabase } from "@/integrations/supabase/client";
import type { Answers } from "@/diagnostic/questions";
import {
  SCORE_MAX,
  computeDiagnosis,
  type Diagnosis,
  type ScoreCategory,
} from "@/diagnostic/engine";
import type { Lang } from "@/i18n/translations";

export type Lead = {
  business_name: string;
  owner_name?: string;
  whatsapp?: string;
  email?: string;
  city?: string;
};

/**
 * Single INSERT into `public.diagnostics`.
 *
 * The wizard saves progress to localStorage while the user fills it out;
 * nothing hits the server until the lead form is submitted. Then one row
 * goes in with everything: lead info, raw answers, per-category scores,
 * pain points, recommendations, totals, and timestamps.
 *
 * Returns the new diagnostic id (used for the report URL).
 */
export async function submitDiagnostic(
  answers: Answers,
  lang: Lang,
  lead: Lead,
): Promise<string | null> {
  const d = computeDiagnosis(answers);

  const category_scores = (Object.keys(SCORE_MAX) as ScoreCategory[]).map((category) => ({
    category,
    score: d.scores[category],
    max_score: SCORE_MAX[category],
  }));

  const payload = {
    language: lang,
    status: "new" as const,
    // lead / business info
    business_name: lead.business_name || "—",
    owner_name: lead.owner_name ?? null,
    email: lead.email ?? null,
    whatsapp: lead.whatsapp ?? null,
    phone: (answers["phone"] as string) ?? null,
    city: lead.city ?? null,
    neighborhood: (answers["neighborhood"] as string) ?? null,
    business_type: (answers["business_type"] as string) ?? null,
    locations: (answers["locations"] as string) ?? null,
    // form data + computed outputs
    answers: answers as never,
    category_scores,
    pain_points: d.painPoints,
    recommendations: d.recommendations,
    total_score: d.totalScore,
    priority: d.leadPriority,
    recommended_plan: d.plan,
    estimated_opportunity: d.roi.totalOpportunity,
    missed_revenue: d.roi.missedRevenue,
    noshow_revenue: d.roi.noShowRevenue,
    // timestamps
    submitted_at: new Date().toISOString(),
    completed_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("diagnostics").insert(payload).select("id").single();

  if (error) {
    console.error("[diagnostic-api] submitDiagnostic failed:", error.message);
    return null;
  }
  return data.id as string;
}

/**
 * Fetch one completed diagnostic by id — used by the public report page
 * (/diagnostic/:id) to render the results from the row stored in
 * `public.diagnostics`.
 */
export async function fetchDiagnostic(id: string): Promise<DiagnosticRow | null> {
  const { data, error } = await supabase.from("diagnostics").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data ?? null) as DiagnosticRow | null;
}

/**
 * Update an existing diagnostic row. The "edit" action on the admin
 * clients page uses this to overwrite the previous answers/lead/scores
 * instead of inserting a duplicate row.
 */
export async function updateDiagnostic(
  id: string,
  answers: Answers,
  lang: Lang,
  lead: Lead,
): Promise<boolean> {
  const d = computeDiagnosis(answers);

  const category_scores = (Object.keys(SCORE_MAX) as ScoreCategory[]).map((category) => ({
    category,
    score: d.scores[category],
    max_score: SCORE_MAX[category],
  }));

  const patch = {
    language: lang,
    // lead / business info
    business_name: lead.business_name || "—",
    owner_name: lead.owner_name ?? null,
    email: lead.email ?? null,
    whatsapp: lead.whatsapp ?? null,
    phone: (answers["phone"] as string) ?? null,
    city: lead.city ?? null,
    neighborhood: (answers["neighborhood"] as string) ?? null,
    business_type: (answers["business_type"] as string) ?? null,
    locations: (answers["locations"] as string) ?? null,
    // form data + computed outputs
    answers: answers as never,
    category_scores,
    pain_points: d.painPoints,
    recommendations: d.recommendations,
    total_score: d.totalScore,
    priority: d.leadPriority,
    recommended_plan: d.plan,
    estimated_opportunity: d.roi.totalOpportunity,
    missed_revenue: d.roi.missedRevenue,
    noshow_revenue: d.roi.noShowRevenue,
    completed_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("diagnostics").update(patch).eq("id", id);
  if (error) {
    console.error("[diagnostic-api] updateDiagnostic failed:", error.message);
    return false;
  }
  return true;
}

/**
 * Delete a diagnostic row. Used by the admin clients page when the
 * operator removes a client.
 */
export async function deleteDiagnostic(id: string): Promise<boolean> {
  const { error } = await supabase.from("diagnostics").delete().eq("id", id);
  if (error) {
    console.error("[diagnostic-api] deleteDiagnostic failed:", error.message);
    return false;
  }
  return true;
}

/**
 * One row from the public.diagnostics table. The admin page treats every
 * row as a "client" for display purposes — same shape, one table.
 */
export type DiagnosticRow = {
  id: string;
  language: string;
  status: "new" | "contacted" | "demo_scheduled" | "trial" | "won" | "lost" | "nurture";
  business_name: string;
  owner_name: string | null;
  email: string | null;
  whatsapp: string | null;
  phone: string | null;
  city: string | null;
  neighborhood: string | null;
  business_type: string | null;
  locations: string | null;
  answers: unknown;
  category_scores: unknown;
  pain_points: unknown;
  recommendations: unknown;
  total_score: number | null;
  priority: string | null;
  recommended_plan: string | null;
  estimated_opportunity: number | null;
  missed_revenue: number | null;
  noshow_revenue: number | null;
  submitted_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DiagnosticsSort = "created_at" | "total_score" | "business_name";
export type DiagnosticsOrder = "asc" | "desc";

export type DiagnosticsQuery = {
  search?: string;
  status?: DiagnosticRow["status"];
  city?: string;
  sort?: DiagnosticsSort;
  order?: DiagnosticsOrder;
  limit?: number;
};

/**
 * List rows for the admin page. Single round-trip on `diagnostics`,
 * filters + search + sort all done in Postgres.
 */
export async function listDiagnostics(q: DiagnosticsQuery = {}): Promise<DiagnosticRow[]> {
  const { search, status, city, sort = "created_at", order = "desc", limit = 200 } = q;

  let query = supabase.from("diagnostics").select("*");

  if (search && search.trim()) {
    const term = `%${search.trim()}%`;
    query = query.or(`business_name.ilike.${term},owner_name.ilike.${term}`);
  }
  if (status) query = query.eq("status", status);
  if (city) query = query.eq("city", city);
  query = query.order(sort, { ascending: order === "asc" }).limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[diagnostic-api] listDiagnostics failed:", error.message);
    return [];
  }
  return (data ?? []) as unknown as DiagnosticRow[];
}

/**
 * Re-export the diagnosis type for convenience to callers that only
 * imported from this module.
 */
export type { Diagnosis };
