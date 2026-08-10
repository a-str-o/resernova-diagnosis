import { supabase } from "@/integrations/supabase/client";
import type { Answers } from "@/diagnostic/questions";
import { computeDiagnosis, type Diagnosis } from "@/diagnostic/engine";
import type { Lang } from "@/i18n/translations";

export async function createDiagnostic(lang: Lang): Promise<string | null> {
  const { data, error } = await supabase.from("diagnostics").insert({ language: lang }).select("id").single();
  if (error) return null;
  return data.id as string;
}

export async function saveAnswers(diagnosticId: string, answers: Answers, lang: Lang) {
  await supabase
    .from("diagnostics")
    .update({ answers: answers as never, language: lang, updated_at: new Date().toISOString() })
    .eq("id", diagnosticId);

  const rows = Object.entries(answers).map(([question_id, answer]) => ({
    diagnostic_id: diagnosticId,
    question_id,
    answer: (answer ?? null) as never,
    language: lang,
  }));
  if (rows.length) {
    await supabase.from("diagnostic_answers").upsert(rows, { onConflict: "diagnostic_id,question_id" });
  }
}

export async function completeDiagnostic(
  diagnosticId: string,
  answers: Answers,
  lang: Lang,
  lead: { business_name: string; owner_name?: string; whatsapp?: string; email?: string; city?: string },
): Promise<Diagnosis> {
  const d = computeDiagnosis(answers);
  await saveAnswers(diagnosticId, answers, lang);

  await supabase
    .from("diagnostics")
    .update({
      status: "completed",
      total_score: d.totalScore,
      priority: d.leadPriority,
      recommended_plan: d.plan,
      estimated_opportunity: d.roi.totalOpportunity,
      missed_revenue: d.roi.missedRevenue,
      noshow_revenue: d.roi.noShowRevenue,
      completed_at: new Date().toISOString(),
    })
    .eq("id", diagnosticId);

  await supabase.from("leads").insert({
    diagnostic_id: diagnosticId,
    business_name: lead.business_name || "—",
    owner_name: lead.owner_name ?? null,
    phone: (answers["phone"] as string) ?? null,
    whatsapp: lead.whatsapp ?? null,
    email: lead.email ?? null,
    city: lead.city ?? null,
    neighborhood: (answers["neighborhood"] as string) ?? null,
    business_type: (answers["business_type"] as string) ?? null,
    locations: (answers["locations"] as string) ?? null,
  });

  // Flat snapshot for the staff admin UI. No FK, no relationships — the
  // admin reads from this table directly, the public report reads from
  // `diagnostics`. The two writes are independent.
  await supabase.from("clients").insert({
    business_name: lead.business_name || "—",
    owner_name: lead.owner_name ?? null,
    email: lead.email ?? null,
    whatsapp: lead.whatsapp ?? null,
    phone: (answers["phone"] as string) ?? null,
    city: lead.city ?? null,
    neighborhood: (answers["neighborhood"] as string) ?? null,
    business_type: (answers["business_type"] as string) ?? null,
    locations: (answers["locations"] as string) ?? null,
    status: "new",
    language: lang,
    total_score: d.totalScore,
    priority: d.leadPriority,
    recommended_plan: d.plan,
    estimated_opportunity: d.roi.totalOpportunity,
    missed_revenue: d.roi.missedRevenue,
    noshow_revenue: d.roi.noShowRevenue,
    submitted_at: new Date().toISOString(),
  });

  await supabase.from("lead_scores").insert(
    Object.entries(d.scores).map(([category, score]) => ({
      diagnostic_id: diagnosticId,
      category,
      score,
      max_score:
        ({
          business_size: 20,
          booking_volume: 20,
          whatsapp_dependency: 15,
          missed_bookings: 15,
          noshow: 10,
          crm_maturity: 10,
          growth: 5,
          urgency: 5,
        } as Record<string, number>)[category] ?? 10,
    })),
  );

  if (d.painPoints.length) {
    await supabase.from("pain_points").insert(
      d.painPoints.map((p) => ({
        diagnostic_id: diagnosticId,
        key: p.key,
        severity: p.severity,
        recommended_product: p.product,
        estimated_impact: p.estimatedImpact ?? null,
      })),
    );
  }

  if (d.recommendations.length) {
    await supabase.from("recommendations").insert(
      d.recommendations.map((r) => ({
        diagnostic_id: diagnosticId,
        product: r.product,
        priority: r.priority,
        rank: r.rank,
      })),
    );
  }

  return d;
}

export async function fetchDiagnostic(id: string) {
  const { data, error } = await supabase.from("diagnostics").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}
