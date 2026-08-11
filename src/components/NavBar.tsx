import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { getSession, isAllowedEmail, onAuthChange, signOut } from "@/lib/auth";
import { DIAGNOSTIC_SESSION_KEY } from "@/diagnostic/session";

type NavLink = {
  to: string;
  label: string;
  /** Restrict to authorized staff only. */
  staffOnly?: boolean;
  /** Reset of the diagnostic wizard before navigating — only applies to "/". */
  resetOnClick?: boolean;
};

const LINKS: NavLink[] = [
  { to: "/", label: "Diagnostic", resetOnClick: true },
  { to: "/admin/clients", label: "Clients", staffOnly: true },
];

export function NavBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [email, setEmail] = useState<string | null>(null);

  // Subscribe to auth changes so the nav reflects login/logout live.
  useEffect(() => {
    let mounted = true;
    void getSession().then((s) => {
      if (mounted) setEmail(s?.user.email ?? null);
    });
    const off = onAuthChange((e) => mounted && setEmail(e));
    return () => {
      mounted = false;
      off();
    };
  }, []);

  const isStaff = isAllowedEmail(email);
  const visibleLinks = LINKS.filter((l) => !l.staffOnly || isStaff);

  const onSignOut = async () => {
    await signOut();
    setEmail(null);
    toast.success("Signed out");
    navigate({ to: "/login" });
  };

  const onStartOver = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // The wizard stores progress in localStorage. Clicking "Diagnostic" from
    // any other page should land the user on a fresh flow, not their saved one.
    if (pathname === "/") {
      e.preventDefault();
      try {
        window.localStorage.removeItem(DIAGNOSTIC_SESSION_KEY);
      } catch {
        /* storage unavailable */
      }
      window.location.assign("/");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          onClick={onStartOver}
          className="flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="ReserNova — go to home"
        >
          <Logo size="sm" />
        </Link>

        <nav className="ms-2 hidden flex-1 items-center gap-1 sm:flex" aria-label="Primary">
          {visibleLinks.map((l) => {
            const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
            return (
              <Link
                key={l.to}
                to={l.to}
                onClick={l.resetOnClick && l.to === "/" ? onStartOver : undefined}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          {email ? (
            <>
              <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                <ShieldCheck className="size-3.5 text-primary" aria-hidden />
                {email}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="gap-2"
                onClick={() => void onSignOut()}
              >
                <LogOut className="size-4" aria-hidden />
                Sign out
              </Button>
            </>
          ) : (
            <Button asChild size="sm" variant="outline" className="gap-2">
              <Link to="/login">Sign in</Link>
            </Button>
          )}
          <LanguageSwitcher compact />
        </div>
      </div>

      {/* Mobile nav row — same links, kept simple. */}
      <nav
        className="mx-auto flex w-full max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:hidden"
        aria-label="Primary"
      >
        {visibleLinks.map((l) => {
          const active = pathname === l.to || (l.to !== "/" && pathname.startsWith(l.to));
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={l.resetOnClick && l.to === "/" ? onStartOver : undefined}
              aria-current={active ? "page" : undefined}
              className={cn(
                "whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium",
                active
                  ? "bg-primary-soft text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export const NAVBAR_HIDDEN_PATHS = ["/login"] as const;
