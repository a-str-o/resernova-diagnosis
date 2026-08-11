import { Globe } from "lucide-react";
import { LANGS, useLanguage } from "@/i18n/language";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage();
  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="gap-2 rounded-full border-primary bg-primary px-3 text-primary-foreground hover:bg-primary/90"
        >
          <Globe className="size-4 text-primary-foreground" aria-hidden />
          <span aria-hidden>{current.flag}</span>
          {!compact && <span className="text-sm font-medium text-primary-foreground">{current.label}</span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {LANGS.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onSelect={() => setLang(l.code)}
            className={l.code === lang ? "bg-primary-soft font-semibold" : ""}
          >
            <span className="me-2" aria-hidden>
              {l.flag}
            </span>
            {l.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
