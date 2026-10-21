import type { ReactNode } from "react";

export function PageIntro({ title, children, aside }: { title: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <div className="page flex flex-wrap items-end justify-between gap-6 pt-10 pb-8 lg:pt-14">
      <div className="max-w-2xl">
        <h1 className="display-tight text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-semibold">{title}</h1>
        {children && <div className="mt-4 text-lg leading-relaxed text-ink-soft">{children}</div>}
      </div>
      {aside}
    </div>
  );
}

export function ListSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]" aria-hidden="true">
      <div className="hidden h-[520px] animate-pulse rounded-[var(--radius-panel)] bg-enamel/70 lg:block" />
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="h-28 animate-pulse rounded-[var(--radius-panel)] bg-enamel/70" />
        ))}
      </div>
    </div>
  );
}
