import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession, signInWithPassword } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign in | ReserNova" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  // Start with an empty field so users see a fresh form. Browser autofill
  // will still offer previously used addresses; that's expected.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void getSession().then((s) => {
      if (!cancelled && s) navigate({ to: "/admin/clients" });
    });
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await signInWithPassword(email, password);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.message);
      toast.error(res.message);
      return;
    }
    navigate({ to: "/admin/clients" });
  };

  return (
    <main className="grid min-h-screen place-items-center surface-grid px-4 py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-lift sm:p-8"
      >
        <div className="flex justify-center">
          <Logo size="md" showWordmark={false} />
        </div>
        <h1 className="mt-4 text-center text-xl font-bold">Sign in</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Staff access only.</p>

        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-md bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>
        )}

        <Button type="submit" size="lg" className="mt-6 w-full gap-2" disabled={submitting}>
          {submitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {submitting ? "Signing in…" : "Sign in"}
        </Button>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3" aria-hidden />
          Restricted to authorized staff.
        </p>
      </form>
    </main>
  );
}
