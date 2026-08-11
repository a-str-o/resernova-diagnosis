import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Loader2, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/language";
import { Stepper } from "@/components/diagnostic/Stepper";
import { QuestionField } from "@/components/diagnostic/QuestionField";
import { AnimatedCounter } from "@/components/diagnostic/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  STEPS,
  isAnswered,
  numAnswer,
  visibleQuestions,
  type Answers,
} from "@/diagnostic/questions";
import { computeDiagnosis, formatMAD } from "@/diagnostic/engine";
import { clearSession, loadSession, saveSession } from "@/diagnostic/session";
import { fetchDiagnostic, submitDiagnostic, updateDiagnostic } from "@/lib/diagnostic-api";
import { getSession, isAllowedEmail, signOut } from "@/lib/auth";

export const Route = createFileRoute("/")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): { edit?: string } => {
    const edit = typeof search["edit"] === "string" ? (search["edit"] as string) : undefined;
    return edit ? { edit } : {};
  },
  // Whole app is gated behind Supabase login. Only the allowed email
  // passes; anyone else is signed out and bounced to /login.
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    if (!isAllowedEmail(session.user.email)) {
      await signOut();
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "ReserNova Business Diagnostic for Salons & Spas" },
      {
        name: "description",
        content:
          "A 5-minute business health check for Moroccan salons, barbers and spas: find missed WhatsApp bookings, no-show impact and the right ReserNova plan.",
      },
      { property: "og:title", content: "ReserNova Business Diagnostic for Salons & Spas" },
      {
        property: "og:description",
        content:
          "Discover what your salon loses each month — missed bookings, no-shows and retention — in 5 minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DiagnosticPage,
});

const TOTAL_STEPS = 8;

function DiagnosticPage() {
  const { t, lang } = useLanguage();
  const navigate = useNavigate();
  const { edit: editId } = Route.useSearch() as { edit?: string };
  const [started, setStarted] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"wizard" | "lead">("wizard");
  const [submitting, setSubmitting] = useState(false);
  const [leadEmail, setLeadEmail] = useState("");

  useEffect(() => {
    // Edit mode: fetch the row, hydrate answers, jump straight to step 1.
    // We never want to show the landing page when reopening a record.
    if (editId) {
      let cancelled = false;
      void (async () => {
        const row = await fetchDiagnostic(editId);
        if (cancelled || !row) return;
        const seeded: Answers = { ...((row.answers as Answers) ?? {}) };
        // Make sure the lead fields are present in the answers object so
        // the wizard re-validates them and the lead form pre-fills.
        const existing = seeded as Record<string, unknown>;
        existing["owner_name"] = row.owner_name ?? existing["owner_name"] ?? "";
        existing["business_name"] = row.business_name ?? existing["business_name"] ?? "";
        existing["whatsapp"] = row.whatsapp ?? existing["whatsapp"] ?? "";
        existing["email"] = row.email ?? existing["email"] ?? "";
        existing["city"] = row.city ?? existing["city"] ?? "";
        setAnswers(seeded);
        setStep(1);
        setStarted(true);
        setLeadEmail(String(row.email ?? ""));
      })();
      return () => {
        cancelled = true;
      };
    }
    const s = loadSession();
    if (Object.keys(s.answers).length) {
      setHasSaved(true);
      setAnswers(s.answers);
      setStep(s.step || 1);
    }
    return undefined;
  }, [editId]);

  useEffect(() => {
    if (!started) return;
    saveSession({ step, answers, updatedAt: Date.now() });
  }, [started, step, answers]);

  const questions = useMemo(() => visibleQuestions(answers, step), [answers, step]);

  const setAnswer = useCallback((id: string, value: unknown) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  }, []);

  const begin = async (resume: boolean) => {
    setStarted(true);
    if (!resume) {
      clearSession();
      setAnswers({});
      setStep(1);
    }
    // Progress lives in localStorage; the server only sees the final
    // submission in `submitLead` below.
  };

  const validateStep = useCallback(
    (n: number): boolean => {
      // Returns true when every required question on step `n` is answered
      // and format-valid. Does NOT mutate component state.
      const stepQs = visibleQuestions(answers, n);
      for (const q of stepQs) {
        if (!q.required) continue;
        if (!isAnswered(q, answers)) return false;
        const v = String(answers[q.id] ?? "");
        if (q.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return false;
        if (q.type === "phone" && v.replace(/\D/g, "").length < 8) return false;
      }
      return true;
    },
    [answers],
  );

  const validate = () => {
    const next: Record<string, string> = {};
    questions.forEach((q) => {
      if (!q.required) return;
      if (!isAnswered(q, answers)) next[q.id] = t("error.required");
      else if (q.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(answers[q.id])))
        next[q.id] = t("error.email");
      else if (q.type === "phone" && String(answers[q.id]).replace(/\D/g, "").length < 8)
        next[q.id] = t("error.phone");
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // Recompute the set of steps that have any unanswered required question.
  // Used by the stepper to color the step pill red.
  const invalidSteps = useMemo(() => {
    const set = new Set<number>();
    for (let n = 1; n <= TOTAL_STEPS; n += 1) {
      if (!validateStep(n)) set.add(n);
    }
    return set;
  }, [validateStep]);

  const goToStep = useCallback((n: number) => {
    // Free navigation — the stepper lets the operator jump anywhere so
    // they can review/edit any step without going through the previous
    // ones. Submission is gated separately on the final step.
    const clamped = Math.max(1, Math.min(TOTAL_STEPS, n));
    setStep(clamped);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goNext = async () => {
    if (!validate()) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Final step → lead form. Validate every step first. If anything is
      // missing, jump to the first invalid step and refuse to advance.
      const firstInvalid = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).find(
        (n) => !validateStep(n),
      );
      if (firstInvalid) {
        setStep(firstInvalid);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setPhase("lead");
      setLeadEmail(String(answers["email"] ?? ""));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submitLead = async () => {
    // Re-check every wizard step before touching the lead form. The stepper
    // already turned incomplete steps red, but a stale `errors` map would
    // hide that, so this is the final gate.
    const firstInvalid = Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).find(
      (n) => !validateStep(n),
    );
    if (firstInvalid) {
      setPhase("wizard");
      setStep(firstInvalid);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!leadEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(leadEmail)) {
      toast.error(t("error.email"));
      return;
    }
    const requiredLead: Array<[string, string]> = [
      ["owner_name", t("lead.name")],
      ["business_name", t("lead.business")],
      ["whatsapp", t("lead.whatsapp")],
      ["city", t("lead.city")],
    ];
    const missing = requiredLead.find(([k]) => !String(answers[k] ?? "").trim());
    if (missing) {
      toast.error(`${t("error.required")}: ${missing[1]}`);
      return;
    }
    setSubmitting(true);
    try {
      const lead = {
        business_name: String(answers["business_name"] ?? ""),
        owner_name: String(answers["owner_name"] ?? ""),
        whatsapp: String(answers["whatsapp"] ?? answers["phone"] ?? ""),
        email: leadEmail,
        city: String(answers["city"] ?? ""),
      };
      if (editId) {
        // Edit flow: overwrite the existing row instead of inserting a new one.
        const ok = await updateDiagnostic(editId, { ...answers, email: leadEmail }, lang, lead);
        if (!ok) throw new Error("update failed");
        clearSession();
        navigate({ to: "/diagnostic/$id", params: { id: editId } });
        return;
      }
      const id = await submitDiagnostic({ ...answers, email: leadEmail }, lang, lead);
      if (!id) throw new Error("submit failed");
      clearSession();
      navigate({ to: "/diagnostic/$id", params: { id } });
    } catch {
      toast.error(t("error.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  /* --------------------------------- landing -------------------------------- */
  if (!started) {
    return (
      <main className="min-h-screen surface-grid">
        <div className="mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-6 sm:pt-10">
          <section className="mx-auto mt-8 max-w-2xl text-center sm:mt-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-card">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden />
              {t("landing.badge")}
            </p>
            <h1 className="mt-6 text-4xl font-bold text-balance-tight sm:text-5xl">
              {t("landing.title")}
            </h1>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {t("landing.subtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="w-full gap-2 sm:w-auto"
                onClick={() => void begin(false)}
              >
                {t("landing.start")}
                <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
              </Button>
              {hasSaved && (
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full bg-card sm:w-auto"
                  onClick={() => void begin(true)}
                >
                  {t("landing.resume")}
                </Button>
              )}
            </div>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="size-4" aria-hidden />
              {t("landing.time")}
            </p>
          </section>

          <section className="mt-16 grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <article key={i} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <h2 className="text-base font-semibold">{t(`landing.point${i}.title`)}</h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t(`landing.point${i}.body`)}
                </p>
              </article>
            ))}
          </section>

          <p className="mx-auto mt-10 max-w-xl pb-10 text-center text-xs text-muted-foreground">
            <Lock className="me-1 inline size-3" aria-hidden />
            {t("landing.privacy")}
          </p>
        </div>
      </main>
    );
  }

  /* ------------------------------ lead capture ------------------------------ */
  if (phase === "lead") {
    return (
      <main className="min-h-screen surface-grid">
        <div className="mx-auto flex max-w-5xl flex-col px-4 py-6 sm:px-6 sm:pt-10">
          <div className="mx-auto mt-8 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8">
          <h1 className="text-2xl font-bold text-balance-tight">{t("lead.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("lead.subtitle")}</p>
          <div className="mt-6 space-y-4">
            {[
              { key: "owner_name", label: t("lead.name") },
              { key: "business_name", label: t("lead.business") },
              { key: "whatsapp", label: t("lead.whatsapp") },
              { key: "city", label: t("lead.city") },
            ].map((f) => (
              <div key={f.key} className="space-y-1.5">
                <label htmlFor={f.key} className="text-sm font-medium">
                  {f.label}
                </label>
                <Input
                  id={f.key}
                  value={String(answers[f.key] ?? "")}
                  onChange={(e) => setAnswer(f.key, e.target.value)}
                  className="h-11"
                />
              </div>
            ))}
            <div className="space-y-1.5">
              <label htmlFor="lead-email" className="text-sm font-medium">
                {t("lead.email")}
              </label>
              <Input
                id="lead-email"
                type="email"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="h-11"
              />
            </div>
          </div>
          <Button
            size="lg"
            className="mt-6 w-full gap-2"
            disabled={submitting}
            onClick={() => void submitLead()}
          >
            {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {submitting ? t("lead.submitting") : t("lead.cta")}
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">{t("landing.privacy")}</p>
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------------- wizard --------------------------------- */
  const live = computeDiagnosis(answers);
  const showMissed = step === 4 && numAnswer(answers, "average_ticket") > 0;
  const showNoShow =
    step === 5 && numAnswer(answers, "average_ticket") > 0 && live.roi.appointmentsPerMonth > 0;

  return (
    <main className="min-h-screen surface-grid">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="mt-2 grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <Stepper
              current={step}
              total={TOTAL_STEPS + 1}
              invalidSteps={invalidSteps}
              onSelect={goToStep}
            />
          </aside>

          <section className="min-w-0">
            <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-card backdrop-blur sm:p-8">
              <h1 className="text-2xl font-bold text-balance-tight sm:text-3xl">
                {t(STEPS[step - 1]?.titleKey ?? "step.1.title")}
              </h1>

              <div className="mt-8 space-y-8">
                {questions.map((q) => (
                  <QuestionField
                    key={q.id}
                    question={q}
                    value={answers[q.id]}
                    error={errors[q.id] || null}
                    onChange={(v) => setAnswer(q.id, v)}
                  />
                ))}
              </div>

              {(showMissed || showNoShow) && (
                <div className="mt-8 animate-fade-up rounded-xl bg-primary-soft p-5">
                  <p className="text-xs font-medium text-muted-foreground">
                    {t("estimate.basedOn")}
                  </p>
                  {showMissed && (
                    <p className="mt-1">
                      <span className="block text-sm font-medium">
                        {t("estimate.missedRevenue")}
                      </span>
                      <span className="text-3xl font-bold tabular-nums text-primary">
                        <AnimatedCounter
                          value={live.roi.missedRevenue}
                          format={(n) => formatMAD(n, lang)}
                        />{" "}
                        DH
                      </span>
                      <span className="ms-1 text-sm text-muted-foreground">
                        {t("estimate.perMonth")}
                      </span>
                    </p>
                  )}
                  {showNoShow && (
                    <div className="mt-1">
                      <p className="text-sm font-medium">
                        {t("estimate.noshowRate")}:{" "}
                        <span className="tabular-nums">{live.roi.noShowRate}%</span>
                      </p>
                      <p className="text-sm font-medium">{t("estimate.noshowRevenue")}</p>
                      <p className="text-3xl font-bold tabular-nums text-primary">
                        <AnimatedCounter
                          value={live.roi.noShowRevenue}
                          format={(n) => formatMAD(n, lang)}
                        />{" "}
                        DH
                        <span className="ms-1 text-sm font-medium text-muted-foreground">
                          {t("estimate.perMonth")}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className="mt-3 text-xs text-muted-foreground">{t("estimate.disclaimer")}</p>
                </div>
              )}

              <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
                <Button
                  type="button"
                  variant="ghost"
                  className="gap-2"
                  disabled={step === 1}
                  onClick={() => {
                    setStep(Math.max(1, step - 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <ArrowLeft className="size-4 rtl:rotate-180" aria-hidden />
                  {t("wizard.back")}
                </Button>
                <Button type="button" size="lg" className="gap-2" onClick={() => void goNext()}>
                  {step === TOTAL_STEPS ? t("wizard.seeResults") : t("wizard.continue")}
                  <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
