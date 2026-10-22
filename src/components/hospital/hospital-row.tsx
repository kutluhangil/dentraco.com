"use client";

import Link from "next/link";
import { treatmentById } from "@/data/specialties";
import { RatingInline } from "@/components/rating/shade-rating";
import { hospitalPlace } from "@/lib/format";
import type { RatingSummary } from "@/lib/rating";
import type { Hospital } from "@/lib/types";
import { HospitalImage } from "./hospital-visual";

export function HospitalRow({ hospital, summary, doctorCount }: { hospital: Hospital; summary: RatingSummary; doctorCount: number }) {
  return (
    <Link
      href={`/hastaneler/${hospital.slug}`}
      className="group grid gap-4 rounded-[var(--radius-panel)] bg-enamel p-3 transition-colors hover:bg-white sm:grid-cols-[220px_1fr] sm:gap-6 sm:p-4 lg:grid-cols-[260px_1fr_auto]"
    >
      <HospitalImage hospital={hospital} sizes="(min-width: 640px) 260px, 100vw" className="aspect-[16/10] rounded-[14px]" />
      <div className="min-w-0 py-1">
        <p className="text-sm text-ink-soft">
          {hospital.type} — {hospitalPlace(hospital)}
        </p>
        <h3 className="mt-0.5 text-xl leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
          {hospital.name}
        </h3>
        <p className="mt-2 line-clamp-2 max-w-prose text-[0.9375rem] text-ink-soft">{hospital.summary}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {hospital.treatments.slice(0, 4).map((t) => (
            <li key={t} className="rounded-full bg-porcelain px-2.5 py-1 text-xs text-ink-soft">
              {treatmentById[t]?.name}
            </li>
          ))}
          {hospital.treatments.length > 4 && (
            <li className="rounded-full px-1 py-1 text-xs text-ink-faint">+{hospital.treatments.length - 4} tedavi</li>
          )}
        </ul>
        <div className="mt-3 lg:hidden">
          <RatingInline summary={summary} />
        </div>
      </div>
      <div className="hidden min-w-36 flex-col items-end justify-between py-1 text-right lg:flex">
        <RatingInline summary={summary} />
        <p className="tabular text-sm text-ink-soft">{doctorCount} hekim</p>
      </div>
    </Link>
  );
}
