import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/i18n/language";
import { ResultsReport } from "@/components/diagnostic/ResultsReport";
import { fetchDiagnostic } from "@/lib/diagnostic-api";
import { computeDiagnosis } from "@/diagnostic/engine";
import { numAnswer, type Answers } from "@/diagnostic/questions";

export const Route = createFileRoute("/diagnostic/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Business Diagnostic Report | ReserNova" },
      {
        name: "description",
        content:
          "Personalized business health check for beauty businesses: missed bookings, no-show impact and recommended ReserNova plan.",
      },
      { property: "og:title", content: "Business Diagnostic Report | ReserNova" },
      {
        property: "og:description",
        content:
          "Your salon's diagnostic: missed bookings, no-show impact and the recommended ReserNova plan.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReportPage,
  errorComponent: ReportError,
  notFoundComponent: ReportError,
});

function ReportError() {
  const { t } = useLanguage();
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">{t("error.notFound.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("error.notFound.body")}</p>
      </div>
    </main>
  );
}

function ReportPage() {
  const { id } = Route.useParams();
  const { t } = useLanguage();
  const { data, isLoading, error } = useQuery({
    queryKey: ["diagnostic", id],
    queryFn: async () => {
      const row = await fetchDiagnostic(id);
      if (!row) throw notFound();
      return row;
    },
  });

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center px-4 text-sm text-muted-foreground">
        {t("state.loading")}
      </main>
    );
  }
  if (error || !data) return <ReportError />;

  const answers = (data.answers ?? {}) as Answers;
  const diagnosis = computeDiagnosis(answers);

  const lead = {
    business_name: data.business_name ?? "",
    owner_name: data.owner_name ?? "",
  };

  const inputs = {
    requests_per_week: numAnswer(answers, "requests_per_week", 0),
    appointments_per_month: numAnswer(answers, "appointments_per_month", 0),
    noshows_per_month: numAnswer(answers, "noshows_per_month", 0),
    unconverted_per_month: numAnswer(answers, "unconverted_per_month", 0),
    average_ticket: numAnswer(answers, "average_ticket", 0),
    hours_per_day: numAnswer(answers, "hours_per_day", 0),
    days_per_week: numAnswer(answers, "days_per_week", 0),
  };

  return (
    <main className="min-h-screen surface-grid">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-14">
        <ResultsReport
          diagnosis={diagnosis}
          lead={lead}
          inputs={inputs}
          reportUrl={typeof window !== "undefined" ? window.location.href : undefined}
        />
      </div>
    </main>
  );
}
