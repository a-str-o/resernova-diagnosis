import { useMemo, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Mail, Search, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSession, isAllowedEmail, signOut } from "@/lib/auth";
import { listDiagnostics, type DiagnosticRow, type DiagnosticsSort } from "@/lib/diagnostic-api";

export const Route = createFileRoute("/admin/clients")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Clients | ReserNova" }, { name: "robots", content: "noindex" }],
  }),
  // Auth + email gate. Runs server-side (SSR is off, but TanStack Router
  // still calls beforeLoad in the loader path). If the user is not signed
  // in, or signed in as someone other than ALLOWED_EMAIL, bounce to /login.
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    if (!isAllowedEmail(session.user.email)) {
      await signOut();
      throw redirect({ to: "/login" });
    }
  },
  component: ClientsPage,
});

const STATUSES = ["new", "contacted", "demo_scheduled", "trial", "won", "lost", "nurture"] as const;
type StatusFilter = (typeof STATUSES)[number] | "all";

function ClientsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState<DiagnosticsSort>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const query = useQuery({
    queryKey: ["clients", search, status, city, sort, order],
    queryFn: () =>
      listDiagnostics({
        ...(search ? { search } : {}),
        ...(status !== "all" ? { status } : {}),
        ...(city ? { city } : {}),
        sort,
        order,
        limit: 200,
      }),
  });

  const rows = query.data ?? [];
  const cities = useMemo(
    () => Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).sort() as string[],
    [rows],
  );

  return (
    <main className="min-h-screen surface-grid">
      <div className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="mt-2 text-2xl font-bold">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "row" : "rows"}
          {query.isFetching && (
            <span className="ms-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" aria-hidden /> refreshing
            </span>
          )}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_auto_auto_auto]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business or owner"
              className="h-10 ps-9"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusFilter)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as DiagnosticsSort)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="created_at">Sort: date</option>
            <option value="total_score">Sort: score</option>
            <option value="business_name">Sort: name</option>
          </select>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-start font-semibold">Business</th>
                  <th className="px-4 py-3 text-start font-semibold">Owner</th>
                  <th className="px-4 py-3 text-start font-semibold">City</th>
                  <th className="px-4 py-3 text-start font-semibold">Contact</th>
                  <th className="px-4 py-3 text-end font-semibold">Score</th>
                  <th className="px-4 py-3 text-start font-semibold">Priority</th>
                  <th className="px-4 py-3 text-start font-semibold">Plan</th>
                  <th className="px-4 py-3 text-end font-semibold">Opportunity</th>
                  <th className="px-4 py-3 text-start font-semibold">Status</th>
                  <th className="px-4 py-3 text-start font-semibold">Submitted</th>
                  <th className="px-4 py-3 text-end font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {query.isLoading ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-muted-foreground">
                      <Loader2 className="mx-auto size-4 animate-spin" aria-hidden />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="px-4 py-10 text-center text-muted-foreground">
                      No clients yet.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => <ClientRowView key={r.id} row={r} />)
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function ClientRowView({ row }: { row: DiagnosticRow }) {
  const navigate = useNavigate();
  const submitted = row.submitted_at ?? row.created_at;
  const open = () => navigate({ to: "/diagnostic/$id", params: { id: row.id } });
  return (
    <tr
      className="cursor-pointer hover:bg-muted/30 focus:bg-muted/30 focus:outline-none"
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
    >
      <td className="px-4 py-3 font-medium">{row.business_name}</td>
      <td className="px-4 py-3 text-muted-foreground">{row.owner_name ?? "—"}</td>
      <td className="px-4 py-3 text-muted-foreground">{row.city ?? "—"}</td>
      <td className="px-4 py-3 text-muted-foreground">
        {row.email ?? row.whatsapp ?? row.phone ?? "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-end tabular-nums">{row.total_score ?? "—"}</td>
      <td className="px-4 py-3">{row.priority ?? "—"}</td>
      <td className="px-4 py-3">{row.recommended_plan ?? "—"}</td>
      <td className="whitespace-nowrap px-4 py-3 text-end tabular-nums">
        {row.estimated_opportunity != null ? row.estimated_opportunity.toLocaleString() : "—"}
      </td>
      <td className="px-4 py-3">
        <span className="whitespace-nowrap rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">
          {row.status}
        </span>
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
        {new Date(submitted).toLocaleString()}
      </td>
      <td className="px-4 py-3 text-end">
        <ShareMenu row={row} />
      </td>
    </tr>
  );
}

function ShareMenu({ row }: { row: DiagnosticRow }) {
  // Build the public report URL. Uses the admin page's origin so the link
  // matches wherever the staff is browsing from (prod vs local).
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/diagnostic/${row.id}`;
  const greeting = row.owner_name ? `Hi ${row.owner_name.split(" ")[0]},` : "Hi,";
  const waText = `${greeting} here is your personalized ReserNova business diagnostic report:\n${url}`;
  const mailSubject = "Your ReserNova business diagnostic report";
  const mailBody = `${greeting}\n\nHere is your personalized ReserNova business diagnostic report:\n${url}\n\nBest,\nReserNova`;

  const stop = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Don't trigger the parent row's click-to-open behaviour.
    e.stopPropagation();
  };

  // Fallback when the OS has no default mail client: copy the body to the
  // clipboard so the user can paste it into Gmail web, Outlook web, etc.
  const copyMailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${mailSubject}\n\n${mailBody}`);
      toast.success("Email content copied — paste it into your mail app");
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  return (
    <div onClick={stop} onKeyDown={stop}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            aria-label={`Share report for ${row.business_name}`}
            onClick={stop}
          >
            <Share2 className="size-4" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-[180px]">
          <DropdownMenuItem asChild>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(waText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              WhatsApp
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
            <a
              href={`mailto:?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`}
              onClick={() => void copyMailToClipboard()}
              className="flex items-center gap-2"
            >
              <Mail className="size-4" aria-hidden />
              Email
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
