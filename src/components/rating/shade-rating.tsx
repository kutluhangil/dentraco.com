"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { formatRating } from "@/lib/format";
import type { RatingSummary } from "@/lib/rating";

const sizes = {
  sm: { w: 7, h: 14, gap: 2.5, text: "text-sm" },
  md: { w: 9, h: 18, gap: 3, text: "text-base" },
  lg: { w: 14, h: 30, gap: 4, text: "text-2xl" },
};

/** Puanı, VITA renk skalası sekmelerini andıran beş dikey sekmeyle gösterir. */
export function ShadeTabs({ value, size = "md", animate = false }: { value: number; size?: keyof typeof sizes; animate?: boolean }) {
  const s = sizes[size];
  return (
    <span className="inline-flex items-end" style={{ gap: s.gap }} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        return (
          <span
            key={i}
            className="shade-tab relative overflow-hidden bg-line"
            style={{ width: s.w, height: s.h }}
          >
            <motion.span
              className="absolute inset-x-0 bottom-0 bg-curing"
              initial={animate ? { height: 0 } : false}
              whileInView={animate ? { height: `${fill * 100}%` } : undefined}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
              style={animate ? undefined : { height: `${fill * 100}%` }}
            />
          </span>
        );
      })}
    </span>
  );
}

export function RatingInline({
  summary,
  size = "sm",
  showCount = true,
}: {
  summary: Pick<RatingSummary, "average" | "count">;
  size?: keyof typeof sizes;
  showCount?: boolean;
}) {
  if (!summary.count) return <span className="text-sm text-ink-faint">Henüz yorum yok</span>;
  return (
    <span className="inline-flex items-center gap-2" aria-label={`5 üzerinden ${formatRating(summary.average)} puan, ${summary.count} yorum`}>
      <ShadeTabs value={summary.average} size={size} />
      <span className={`tabular font-semibold ${sizes[size].text}`}>{formatRating(summary.average)}</span>
      {showCount && <span className="tabular text-sm text-ink-soft">({summary.count})</span>}
    </span>
  );
}

const labels = ["Çok kötü", "Kötü", "Orta", "İyi", "Çok iyi"];

export function RatingInput({ value, onChange, name = "puan" }: { value: number; onChange: (v: number) => void; name?: string }) {
  const [hover, setHover] = useState(0);
  const id = useId();
  const shown = hover || value;
  return (
    <fieldset>
      <legend className="text-sm font-medium">Puanınız</legend>
      <div className="mt-2 flex items-end gap-4" onMouseLeave={() => setHover(0)}>
        <div className="flex items-end gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} onMouseEnter={() => setHover(n)} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={n}
                checked={value === n}
                onChange={() => onChange(n)}
                className="peer sr-only"
                aria-describedby={`${id}-label`}
              />
              <span
                className={`shade-tab block h-9 w-5 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-curing ${
                  n <= shown ? "bg-curing" : "bg-line hover:bg-ink-faint/40"
                }`}
              />
              <span className="sr-only">
                {n} — {labels[n - 1]}
              </span>
            </label>
          ))}
        </div>
        <span id={`${id}-label`} className="pb-1 text-sm text-ink-soft" aria-live="polite">
          {shown ? `${shown} / 5 — ${labels[shown - 1]}` : "Bir sekme seçin"}
        </span>
      </div>
    </fieldset>
  );
}

export function RatingBreakdown({ summary }: { summary: RatingSummary }) {
  const max = Math.max(1, ...summary.distribution);
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
      <div>
        <p className="display-tight tabular text-6xl leading-none font-semibold">{summary.count ? formatRating(summary.average) : "—"}</p>
        <div className="mt-3">
          <ShadeTabs value={summary.average} size="md" animate />
        </div>
        <p className="mt-2 text-sm text-ink-soft">{summary.count} onaylı yorum</p>
      </div>
      <ul className="flex-1 space-y-1.5" aria-label="Puan dağılımı">
        {[5, 4, 3, 2, 1].map((n) => {
          const c = summary.distribution[n - 1];
          return (
            <li key={n} className="flex items-center gap-3 text-sm">
              <span className="tabular w-3 text-ink-soft">{n}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-porcelain-deep">
                <motion.span
                  className="block h-full rounded-full bg-curing"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(c / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                />
              </span>
              <span className="tabular w-6 text-right text-ink-soft">{c}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
