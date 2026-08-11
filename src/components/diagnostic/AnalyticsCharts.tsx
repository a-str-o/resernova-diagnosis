import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatMAD, type Diagnosis, type PlanKey } from "@/diagnostic/engine";
import { useLanguage } from "@/i18n/language";
import { cn } from "@/lib/utils";

type FormInputs = {
  requests_per_week: number;
  appointments_per_month: number;
  noshows_per_month: number;
  unconverted_per_month: number;
  average_ticket: number;
  hours_per_day: number;
  days_per_week: number;
};

const PALETTE = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

const PLAN_LABEL_KEY: Record<PlanKey, string> = {
  free: "plan.free",
  starter: "plan.starter",
  pro: "plan.pro",
  custom: "plan.custom",
};

function ChartCard({
  title,
  help,
  children,
  className,
}: {
  title: string;
  help?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5 shadow-card", className)}>
      <div className="mb-3 space-y-0.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {help && <p className="text-xs text-muted-foreground">{help}</p>}
      </div>
      <div className="h-64 w-full">{children}</div>
    </div>
  );
}

type TooltipPayloadEntry = {
  color?: string;
  fill?: string;
  name?: string;
  value?: number;
};

function ChartTooltipBox({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string | number;
  valueFormatter?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border/60 bg-popover px-3 py-2 text-xs text-popover-foreground shadow-xl">
      {label !== undefined && <div className="mb-1 font-medium">{label}</div>}
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: entry.color ?? entry.fill }} />
          <span className="text-muted-foreground">{entry.name}:</span>
          <span className="font-mono font-medium tabular-nums">
            {valueFormatter && entry.value !== undefined
              ? valueFormatter(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ----------------------- Operating footprint ----------------------- */

export function OperatingFootprintCard({ inputs }: { inputs: FormInputs }) {
  const { t, lang } = useLanguage();
  const hours = inputs.hours_per_day * inputs.days_per_week;

  const stats = [
    {
      label: t("results.analytics.footprint.hoursPerDay"),
      value: `${inputs.hours_per_day}`,
      unit: t("results.analytics.footprint.hoursUnit"),
    },
    {
      label: t("results.analytics.footprint.daysPerWeek"),
      value: `${inputs.days_per_week}`,
      unit: t("results.analytics.footprint.daysUnit"),
    },
    {
      label: t("results.analytics.footprint.hoursPerWeek"),
      value: `${hours}`,
      unit: t("results.analytics.footprint.hoursUnit"),
    },
    {
      label: t("results.analytics.footprint.avgTicket"),
      value: `${formatMAD(inputs.average_ticket, lang)}`,
      unit: "DH",
    },
  ];

  return (
    <ChartCard
      title={t("results.analytics.footprint.title")}
      help={t("results.analytics.footprint.help")}
    >
      <dl className="grid h-full grid-cols-2 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-start justify-center rounded-xl bg-muted/60 px-4 py-3"
          >
            <dt className="text-xs font-medium text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold tabular-nums">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.unit}</span>
            </dd>
          </div>
        ))}
      </dl>
    </ChartCard>
  );
}

/* --------------------------- Pain Point Impact --------------------------- */

export function PainImpactChart({ diagnosis }: { diagnosis: Diagnosis }) {
  const { t, lang } = useLanguage();
  const items = useMemo(
    () =>
      diagnosis.painPoints
        .filter((p) => (p.estimatedImpact ?? 0) > 0)
        .sort((a, b) => (b.estimatedImpact ?? 0) - (a.estimatedImpact ?? 0))
        .slice(0, 6)
        .map((p) => ({
          name: t(`pain.${p.key}`),
          value: p.estimatedImpact ?? 0,
        })),
    [diagnosis.painPoints, t],
  );

  if (items.length === 0) {
    return (
      <ChartCard
        title={t("results.analytics.painImpact")}
        help={t("results.analytics.painImpact.help")}
      >
        <div className="grid h-full place-items-center px-6 text-center">
          <p className="text-sm font-medium text-success">{t("results.analytics.noPainImpact")}</p>
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title={t("results.analytics.painImpact")}
      help={t("results.analytics.painImpact.help")}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout="vertical" margin={{ top: 4, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
          <XAxis
            type="number"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            stroke="var(--color-border)"
            tickFormatter={(v: number) => formatMAD(v, lang)}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
            stroke="var(--color-border)"
            width={140}
          />
          <Tooltip
            cursor={{ fill: "var(--color-muted)" }}
            content={<ChartTooltipBox valueFormatter={(v: number) => `${formatMAD(v, lang)} DH`} />}
          />
          <Bar
            dataKey="value"
            name={t("results.analytics.painImpact")}
            radius={[0, 6, 6, 0]}
            maxBarSize={28}
          >
            {items.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

/* --------------------------- Revenue Breakdown --------------------------- */

/* ----------------------- Monthly overview (full-width) ----------------------- */

function MonthlyOverviewCard({
  inputs,
  diagnosis,
}: {
  inputs: FormInputs;
  diagnosis: Diagnosis;
}) {
  const { t, lang } = useLanguage();
  const { roi } = diagnosis;
  const monthlyRequests = Math.round(inputs.requests_per_week * 4);
  const planCost = roi.planPrice;
  const planLabelKey = PLAN_LABEL_KEY[diagnosis.plan];

  const numbersData = [
    {
      key: "monthlyDemand",
      name: t("results.analytics.legend.monthlyDemand"),
      value: monthlyRequests,
      color: PALETTE[1],
    },
    {
      key: "appointments",
      name: t("results.analytics.legend.appointments"),
      value: inputs.appointments_per_month,
      color: PALETTE[3],
    },
    {
      key: "noshows",
      name: t("results.analytics.legend.noshowCount"),
      value: inputs.noshows_per_month,
      color: PALETTE[2],
    },
    {
      key: "unconverted",
      name: t("results.analytics.legend.unconverted"),
      value: inputs.unconverted_per_month,
      color: PALETTE[4],
    },
  ];

  const revenueData = [
    { name: t("results.analytics.legend.missed"), value: roi.missedRevenue, color: PALETTE[1] },
    { name: t("results.analytics.legend.noshow"), value: roi.noShowRevenue, color: PALETTE[2] },
    {
      name: t("results.analytics.legend.total"),
      value: roi.totalOpportunity,
      color: PALETTE[3],
    },
    ...(planCost > 0
      ? [{ name: t("results.analytics.legend.planCost"), value: planCost, color: PALETTE[4] }]
      : []),
  ];

  const fmtDH = (v: number) => `${formatMAD(v, lang)} DH`;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card md:p-6">
      <div className="mb-4 space-y-0.5">
        <h3 className="text-base font-semibold text-foreground">
          {t("results.analytics.overview.title")}
        </h3>
        <p className="text-xs text-muted-foreground">{t("results.analytics.overview.help")}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("results.analytics.monthlyNumbers")}
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={numbersData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  stroke="var(--color-border)"
                  interval={0}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  stroke="var(--color-border)"
                  allowDecimals={false}
                />
                <Tooltip cursor={{ fill: "var(--color-muted)" }} content={<ChartTooltipBox />} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                  {numbersData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t("results.analytics.revenueBreakdown")} — {t(planLabelKey)}
          </p>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  stroke="var(--color-border)"
                  interval={0}
                />
                <YAxis
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }}
                  stroke="var(--color-border)"
                  tickFormatter={fmtDH}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-muted)" }}
                  content={<ChartTooltipBox valueFormatter={fmtDH} />}
                />
                <Legend wrapperStyle={{ fontSize: 10, color: "var(--color-muted-foreground)" }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                  {revenueData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Wrapper ------------------------------ */

export function AnalyticsCharts({
  diagnosis,
  inputs,
}: {
  diagnosis: Diagnosis;
  inputs: FormInputs;
}) {
  const { t } = useLanguage();
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-balance-tight">{t("results.analytics.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("results.analytics.subtitle")}</p>
      </div>
      <div className="grid gap-4">
        <MonthlyOverviewCard inputs={inputs} diagnosis={diagnosis} />
        <div className="grid gap-4 md:grid-cols-2">
          <OperatingFootprintCard inputs={inputs} />
          <PainImpactChart diagnosis={diagnosis} />
        </div>
      </div>
    </section>
  );
}
