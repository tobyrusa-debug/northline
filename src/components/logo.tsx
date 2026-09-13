import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({ className, mark = true }: { className?: string; mark?: boolean }) {
  return (
    <Link
      to="/"
      className={cn("inline-flex shrink-0 items-center gap-2.5 text-fg", className)}
      aria-label="Northline home"
    >
      {mark ? (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
          <rect x="3.5" y="4" width="2.4" height="14" fill="currentColor" />
          <rect x="16.1" y="4" width="2.4" height="14" fill="currentColor" />
          <path d="M6.4 4h9.2L11 10.2 6.4 4z" fill="currentColor" />
        </svg>
      ) : null}
      <span className="whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.12em] sm:text-[13px]">
        Northline
      </span>
    </Link>
  );
}
