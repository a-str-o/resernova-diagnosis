import { cn } from "@/lib/utils";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  showWordmark?: boolean;
  className?: string;
};

const sizes = {
  sm: { box: "size-8", img: "size-8", text: "text-sm" },
  md: { box: "size-10", img: "size-10", text: "text-base" },
  lg: { box: "size-12", img: "size-12", text: "text-lg" },
};

export function Logo({ size = "md", showWordmark = true, className }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <img src="/logo.png" alt="" width={48} height={48} className={cn(s.img, "shrink-0 rounded-lg")} />
      {showWordmark && (
        <span className={cn("truncate font-bold", s.text)}>
          ReserNova <span className="font-medium text-muted-foreground">Diagnostic</span>
        </span>
      )}
    </div>
  );
}
