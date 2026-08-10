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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 rounded-full border-border/80 bg-card px-3">
          <Globe className="size-4 text-muted-foreground" aria-hidden />
          <span aria-hidden>{current.flag}</span>
          {!compact && <span className="text-sm font-medium">{current.label}</span>}
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
