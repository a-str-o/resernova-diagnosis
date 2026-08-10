import { useMemo, useState } from "react";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOut, Search } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ALLOWED_EMAIL, getSession, isAllowedEmail, signOut } from "@/lib/auth";
import { listClients, type ClientRow, type ClientsSort } from "@/lib/clients-api";

export const Route = createFileRoute("/admin/clients")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Clients | ReserNova" },
      { name: "robots", content: "noindex" },
    ],
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
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState<ClientsSort>("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const query = useQuery({
    queryKey: ["clients", search, status, city, sort, order],
    queryFn: () =>
      listClients({
        ...(search ? { search } : {}),
        ...(status !== "all" ? { status } : {}),
        ...(city ? { city } : {}),
        sort,
        order,
        limit: 200,
      }),
  });

  const rows = query.data ?? [];
  const cities = useMemo(() => Array.from(new Set(rows.map((r) => r.city).filter(Boolean))).sort() as string[], [rows]);

  const onSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate({ to: "/login" });
  };

  return (
    <main className="min-h-screen surface-grid">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground sm:inline">{ALLOWED_EMAIL}</span>
            <Button size="sm" variant="outline" className="gap-2" onClick={() => void onSignOut()}>
              <LogOut className="size-4" aria-hidden />
              Sign out
            </Button>
          </div>
        </header>

        <h1 className="mt-8 text-2xl font-bold">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {rows.length} {rows.length === 1 ? "row" : "rows"}
          {query.isFetching && (
            <span className="ms-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" aria-hidden /> refreshing
            </span>
          )}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto_auto_auto_auto]">
          <div className="relative">
            <Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
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
            onChange={(e) => setSort(e.target.value as ClientsSort)}
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
            <table className="min-w-full text-sm">
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
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {query.isLoading ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-muted-foreground">
                      <Loader2 className="mx-auto size-4 animate-spin" aria-hidden />
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="px-4 py-10 text-center text-muted-foreground">
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

function ClientRowView({ row }: { row: ClientRow }) {
  const submitted = row.submitted_at ?? row.created_at;
  return (
    <tr className="hover:bg-muted/30">
      <td className="px-4 py-3 font-medium">{row.business_name}</td>
      <td className="px-4 py-3 text-muted-foreground">{row.owner_name ?? "—"}</td>
      <td className="px-4 py-3 text-muted-foreground">{row.city ?? "—"}</td>
      <td className="px-4 py-3 text-muted-foreground">
        {row.email ?? row.whatsapp ?? row.phone ?? "—"}
      </td>
      <td className="px-4 py-3 text-end tabular-nums">{row.total_score ?? "—"}</td>
      <td className="px-4 py-3">{row.priority ?? "—"}</td>
      <td className="px-4 py-3">{row.recommended_plan ?? "—"}</td>
      <td className="px-4 py-3 text-end tabular-nums">
        {row.estimated_opportunity != null ? row.estimated_opportunity.toLocaleString() : "—"}
      </td>
      <td className="px-4 py-3">
        <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium">{row.status}</span>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(submitted).toLocaleString()}</td>
    </tr>
  );
}
