import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/i18n/language";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Logo } from "@/components/Logo";
import { ResultsReport } from "@/components/diagnostic/ResultsReport";
import { fetchDiagnostic } from "@/lib/diagnostic-api";
import { computeDiagnosis } from "@/diagnostic/engine";
import type { Answers } from "@/diagnostic/questions";

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
        content: "Your salon's diagnostic: missed bookings, no-show impact and the recommended ReserNova plan.",
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

  const diagnosis = computeDiagnosis((data.answers ?? {}) as Answers);

  return (
    <main className="min-h-screen surface-grid">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-14">
        <header className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Logo size="md" />
          <LanguageSwitcher />
        </header>
        <ResultsReport diagnosis={diagnosis} reportUrl={typeof window !== "undefined" ? window.location.href : undefined} />
      </div>
    </main>
  );
}
