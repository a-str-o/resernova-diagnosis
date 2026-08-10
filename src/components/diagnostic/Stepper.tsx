import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language";
import { STEPS } from "@/diagnostic/questions";

export function Stepper({ current, total }: { current: number; total: number }) {
  const { t } = useLanguage();
  const steps = STEPS.slice(0, total);

  return (
    <>
      {/* Desktop vertical stepper */}
      <nav aria-label="Progress" className="hidden lg:block">
        <ol className="space-y-1">
          {steps.map((s) => {
            const done = s.index < current;
            const active = s.index === current;
            return (
              <li key={s.index}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors",
                    active && "bg-card shadow-card",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-8 shrink-0 place-items-center rounded-lg border text-xs font-semibold tabular-nums transition-colors",
                      done && "border-primary bg-primary text-primary-foreground",
                      active && !done && "border-primary bg-primary-soft text-primary",
                      !done && !active && "border-border bg-card text-muted-foreground",
                    )}
                  >
                    {done ? <Check className="size-4" aria-hidden /> : String(s.index).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 truncate text-sm",
                      active ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {t(s.key)}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile progress bar */}
      <div className="lg:hidden">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>
            {t("wizard.step")} {current} {t("wizard.of")} {total}
          </span>
          <span className="truncate ps-3 text-foreground">{t(steps[current - 1]?.key ?? "step.1.name")}</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
