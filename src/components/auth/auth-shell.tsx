import type { ReactNode } from "react";
import { ShadeTabs } from "@/components/rating/shade-rating";

export function AuthShell({ title, lead, children }: { title: string; lead: string; children: ReactNode }) {
  return (
    <div className="page grid gap-12 py-12 lg:grid-cols-[1fr_440px] lg:gap-20 lg:py-20">
      <div className="hidden flex-col justify-between rounded-[var(--radius-panel)] bg-ink p-10 text-white lg:flex">
        <div className="flex items-end gap-3">
          <ShadeTabs value={5} size="lg" />
        </div>
        <div>
          <p className="display-tight text-5xl leading-[0.95] font-semibold">Deneyiminiz, bir sonraki hastanın rehberi olur.</p>
          <p className="mt-4 max-w-md text-white/70">
            Yorumlar yönetici onayından geçer; kişisel veri, hakaret ve reklam içeren yorumlar yayımlanmaz. Puan ortalamasına yalnızca onaylı yorumlar
            katılır.
          </p>
        </div>
      </div>
      <div>
        <h1 className="display-tight text-5xl font-semibold">{title}</h1>
        <p className="mt-3 text-ink-soft">{lead}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
