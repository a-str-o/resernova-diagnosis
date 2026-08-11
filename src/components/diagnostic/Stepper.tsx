import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language";
import { STEPS } from "@/diagnostic/questions";

export function Stepper({
  current,
  total,
  invalidSteps,
  onSelect,
}: {
  current: number;
  total: number;
  /** Steps that have at least one unanswered required question. */
  invalidSteps?: ReadonlySet<number>;
  /** Called when the user clicks a step. Receives the 1-based step index. */
  onSelect?: (step: number) => void;
}) {
  const { t } = useLanguage();
  const steps = STEPS.slice(0, total);
  const invalid = invalidSteps ?? new Set<number>();

  return (
    <>
      {/* Desktop vertical stepper */}
      <nav aria-label="Progress" className="hidden lg:block">
        <ol className="space-y-1">
          {steps.map((s) => {
            const done = s.index < current;
            const active = s.index === current;
            const hasError = invalid.has(s.index);
            return (
              <li key={s.index}>
                <button
                  type="button"
                  onClick={() => onSelect?.(s.index)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start transition-colors",
                    "hover:bg-card/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active && "bg-card shadow-card",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg border text-xs font-semibold tabular-nums transition-colors",
                      hasError
                        ? "border-danger bg-danger/15 text-danger"
                        : done
                          ? "border-primary bg-primary text-primary-foreground"
                          : active
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="size-4" aria-hidden /> : String(s.index).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 truncate text-sm",
                      hasError
                        ? "font-semibold text-danger"
                        : active
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground",
                    )}
                  >
                    {t(s.key)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile step pills — same clickability, compact horizontal layout. */}
      <nav aria-label="Progress" className="lg:hidden">
        <ol className="flex flex-wrap gap-1.5">
          {steps.map((s) => {
            const done = s.index < current;
            const active = s.index === current;
            const hasError = invalid.has(s.index);
            return (
              <li key={s.index}>
                <button
                  type="button"
                  onClick={() => onSelect?.(s.index)}
                  aria-current={active ? "step" : undefined}
                  className={cn(
                    "grid size-9 place-items-center rounded-lg border text-xs font-semibold tabular-nums transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    hasError
                      ? "border-danger bg-danger/15 text-danger"
                      : done
                        ? "border-primary bg-primary text-primary-foreground"
                        : active
                          ? "border-primary bg-primary-soft text-primary"
                          : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {done ? <Check className="size-4" aria-hidden /> : String(s.index).padStart(2, "0")}
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
