import { AlertTriangle, ArrowRight, CalendarCheck, Copy, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/language";
import { formatMAD, PLAN_PRICES, type Diagnosis } from "@/diagnostic/engine";
import { ScoreBar, ScoreDial } from "./ScoreDial";
import { AnimatedCounter } from "./AnimatedCounter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Disclaimer({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 text-xs text-muted-foreground">
      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden />
      <span>{text}</span>
    </p>
  );
}

export function ResultsReport({ diagnosis, reportUrl }: { diagnosis: Diagnosis; reportUrl?: string | undefined }) {
  const { t, lang } = useLanguage();
  const { roi } = diagnosis;
  const top = diagnosis.painPoints.slice(0, 3);

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t("app.product")}</p>
        <h1 className="text-3xl font-bold text-balance-tight sm:text-4xl">{t("results.title")}</h1>
        <p className="max-w-2xl text-muted-foreground">{t("results.subtitle")}</p>
      </header>

      {/* Scores */}
      <section className="grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-[auto_1fr] md:gap-10 md:p-8">
        <ScoreDial score={diagnosis.totalScore} label={t("results.overall")} />
        <div className="space-y-4 self-center">
          {diagnosis.categoryHealth.map((c) => (
            <ScoreBar key={c.key} label={t(`results.category.${c.key}`)} value={c.value} />
          ))}
          <p className="pt-1 text-xs text-muted-foreground">{t("results.scoreHelp")}</p>
        </div>
      </section>

      {/* Opportunities */}
      {top.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-balance-tight">{t("results.opportunities")}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {top.map((p, i) => (
              <article
                key={p.key}
                className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold",
                      p.severity === "high" ? "bg-danger/12 text-danger" : "bg-warning/15 text-gold-foreground",
                    )}
                  >
                    {t(`severity.${p.severity}`)}
                  </span>
                </div>
                <h3 className="text-base font-semibold">{t(`pain.${p.key}`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`pain.${p.key}.desc`)}</p>
                {!!p.estimatedImpact && p.estimatedImpact > 0 && (
                  <p className="mt-auto pt-2 text-sm">
                    <span className="block text-xs text-muted-foreground">{t("results.estOpportunity")}</span>
                    <span className="text-xl font-bold text-primary tabular-nums">
                      {formatMAD(p.estimatedImpact, lang)} DH
                    </span>{" "}
                    <span className="text-xs text-muted-foreground">{t("estimate.perMonth")}</span>
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* ROI */}
      <section className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
        <h2 className="text-2xl font-bold text-balance-tight">{t("results.roi.title")}</h2>
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: t("results.roi.missedBookings"), v: `${roi.missedBookingsPerMonth}` },
            { k: t("results.roi.avgTicket"), v: `${formatMAD(roi.averageTicket, lang)} DH` },
            { k: t("results.roi.missedRevenue"), v: `${formatMAD(roi.missedRevenue, lang)} DH` },
            { k: t("results.roi.noshowImpact"), v: `${formatMAD(roi.noShowRevenue, lang)} DH` },
          ].map((item) => (
            <div key={item.k} className="rounded-xl bg-muted/60 p-4">
              <dt className="text-xs font-medium text-muted-foreground">{item.k}</dt>
              <dd className="mt-1 text-lg font-bold tabular-nums">{item.v}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col gap-4 rounded-xl bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{t("results.roi.total")}</p>
            <p className="text-3xl font-bold tabular-nums text-primary">
              <AnimatedCounter value={roi.totalOpportunity} format={(n) => formatMAD(n, lang)} /> DH
              <span className="ms-1 text-base font-medium text-muted-foreground">{t("estimate.perMonth")}</span>
            </p>
          </div>
          {roi.ratio > 0 && (
            <div className="sm:text-end">
              <p className="text-sm font-medium text-muted-foreground">{t("results.roi.ratio")}</p>
              <p className="text-2xl font-bold tabular-nums">{roi.ratio}x</p>
            </div>
          )}
        </div>
        <Disclaimer text={t("results.roi.note")} />
      </section>

      {/* Recommendations */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-balance-tight">{t("results.reco.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("results.reco.subtitle")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {diagnosis.recommendations.map((r, i) => (
            <article
              key={r.product}
              className="animate-fade-up rounded-2xl border border-border bg-card p-5 shadow-card"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-base font-semibold">{t(`product.${r.product}`)}</h3>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase",
                    r.priority === "high" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {t(`priority.${r.priority}`)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{t(`product.${r.product}.desc`)}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Plan */}
      <section className="rounded-2xl border border-primary/30 bg-primary-soft/60 p-6 shadow-card md:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{t("results.plan.title")}</p>
        <div className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-1">
          <h2 className="text-3xl font-bold uppercase">{t(`plan.${diagnosis.plan}`)}</h2>
          <p className="text-lg font-semibold tabular-nums">
            {diagnosis.plan === "custom"
              ? t("results.plan.custom")
              : `${formatMAD(PLAN_PRICES[diagnosis.plan], lang)} ${t("results.plan.month")}`}
          </p>
        </div>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">{t(`plan.${diagnosis.plan}.desc`)}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <a href="https://www.resernova.info/en" target="_blank" rel="noopener noreferrer">
              <CalendarCheck className="size-4" aria-hidden />
              {t("results.cta.demo")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-2 bg-card">
            <a href="https://www.resernova.info/en" target="_blank" rel="noopener noreferrer">
              <Sparkles className="size-4" aria-hidden />
              {t("results.cta.specialist")}
            </a>
          </Button>
          {reportUrl && (
            <Button
              type="button"
              size="lg"
              variant="ghost"
              className="gap-2"
              onClick={() => {
                navigator.clipboard?.writeText(reportUrl);
                toast.success(t("results.share"));
              }}
            >
              <Copy className="size-4" aria-hidden />
              {t("results.copyLink")}
            </Button>
          )}
        </div>
      </section>

      <Disclaimer text={t("estimate.disclaimer")} />
    </div>
  );
}
