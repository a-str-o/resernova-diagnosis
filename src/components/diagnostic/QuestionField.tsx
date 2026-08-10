import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/language";
import type { Question } from "@/diagnostic/questions";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Props = {
  question: Question;
  value: unknown;
  error?: string | null;
  onChange: (value: unknown) => void;
};

function OptionCard({
  selected,
  label,
  onClick,
  multi,
}: {
  selected: boolean;
  label: string;
  onClick: () => void;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-start transition-all duration-200",
        "hover:border-primary/60 hover:bg-primary-soft/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected ? "border-primary bg-primary-soft shadow-card" : "border-border bg-card",
      )}
    >
      <span
        className={cn(
          "grid size-5 shrink-0 place-items-center border transition-colors",
          multi ? "rounded-md" : "rounded-full",
          selected ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background",
        )}
      >
        {selected && <Check className="size-3.5" aria-hidden />}
      </span>
      <span className={cn("min-w-0 text-sm sm:text-base", selected ? "font-semibold" : "font-medium")}>{label}</span>
    </button>
  );
}

export function QuestionField({ question, value, error, onChange }: Props) {
  const { lang, t } = useLanguage();
  const label = question.title[lang];
  const help = question.help?.[lang];
  const unit = question.unit?.[lang];
  const inputId = `q-${question.id}`;

  const numberValue =
    typeof value === "number" ? value : typeof value === "string" && value !== "" ? Number(value) : undefined;

  return (
    <div className="animate-fade-up space-y-4">
      <div className="space-y-1.5">
        <label htmlFor={inputId} className="block text-lg font-semibold text-balance-tight sm:text-xl">
          {label}
          {!question.required && (
            <span className="ms-2 align-middle text-xs font-medium text-muted-foreground">
              ({t("wizard.optional")})
            </span>
          )}
        </label>
        {help && <p className="text-sm text-muted-foreground">{help}</p>}
        {question.type === "multiple_choice" && (
          <p className="text-xs font-medium text-primary">{t("wizard.selectMultiple")}</p>
        )}
      </div>

      {question.type === "single_choice" && (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {question.options?.map((o) => (
            <OptionCard
              key={o.value}
              label={o.label[lang]}
              selected={value === o.value}
              onClick={() => onChange(o.value)}
            />
          ))}
        </div>
      )}

      {question.type === "multiple_choice" && (
        <div className="grid gap-2.5 sm:grid-cols-2">
          {question.options?.map((o) => {
            const list = Array.isArray(value) ? (value as string[]) : [];
            const selected = list.includes(o.value);
            return (
              <OptionCard
                key={o.value}
                multi
                label={o.label[lang]}
                selected={selected}
                onClick={() =>
                  onChange(selected ? list.filter((v) => v !== o.value) : [...list, o.value])
                }
              />
            );
          })}
        </div>
      )}

      {question.type === "yes_no" && (
        <div className="grid max-w-md grid-cols-2 gap-2.5">
          {[
            { v: "yes", l: t("wizard.yes") },
            { v: "no", l: t("wizard.no") },
          ].map((o) => (
            <button
              key={o.v}
              type="button"
              onClick={() => onChange(o.v)}
              aria-pressed={value === o.v}
              className={cn(
                "rounded-xl border px-4 py-3.5 text-base font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                value === o.v
                  ? "border-primary bg-primary text-primary-foreground shadow-card"
                  : "border-border bg-card hover:border-primary/60 hover:bg-primary-soft/60",
              )}
            >
              {o.l}
            </button>
          ))}
        </div>
      )}

      {(question.type === "slider" || question.type === "number" || question.type === "currency") && (
        <div className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-end gap-3">
            <Input
              id={inputId}
              type="number"
              inputMode="numeric"
              min={question.min}
              max={question.max}
              value={numberValue ?? ""}
              onChange={(e) => onChange(e.target.value === "" ? undefined : Number(e.target.value))}
              className="h-14 max-w-40 rounded-lg text-2xl font-bold tabular-nums"
            />
            {unit && <span className="pb-3.5 text-sm font-medium text-muted-foreground">{unit}</span>}
          </div>
          {question.type !== "number" && (
            <Slider
              value={[Math.min(question.max ?? 100, Math.max(question.min ?? 0, numberValue ?? question.min ?? 0))]}
              min={question.min ?? 0}
              max={question.max ?? 100}
              step={question.stepSize ?? 1}
              onValueChange={(v) => onChange(v[0])}
              aria-label={label}
            />
          )}
        </div>
      )}

      {["text", "email", "phone", "url"].includes(question.type) && (
        <Input
          id={inputId}
          type={question.type === "email" ? "email" : question.type === "phone" ? "tel" : "text"}
          inputMode={question.type === "phone" ? "tel" : undefined}
          placeholder={question.placeholder?.[lang]}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 rounded-lg text-base"
        />
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
