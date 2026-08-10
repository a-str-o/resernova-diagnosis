import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

export function ScoreDial({ score, label, className }: { score: number; label: string; className?: string }) {
  const radius = 62;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, score)) / 100);

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative size-40">
        <svg viewBox="0 0 160 160" className="size-full -rotate-90" aria-hidden>
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-secondary)" strokeWidth="12" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-4xl font-bold tabular-nums">
              <AnimatedCounter value={score} />
            </div>
            <div className="text-xs font-medium text-muted-foreground">/ 100</div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-muted-foreground">{label}</p>
    </div>
  );
}

export function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="min-w-0 truncate text-sm font-medium">{label}</span>
        <span className="shrink-0 text-sm font-semibold tabular-nums">{value}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-1000 ease-out",
            value >= 70 ? "bg-success" : value >= 45 ? "bg-warning" : "bg-danger",
          )}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
