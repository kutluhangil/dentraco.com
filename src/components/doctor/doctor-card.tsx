"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { specialtyById } from "@/data/specialties";
import { RatingInline } from "@/components/rating/shade-rating";
import { doctorName, experienceYears } from "@/lib/format";
import type { RatingSummary } from "@/lib/rating";
import type { Doctor, Hospital } from "@/lib/types";
import { DoctorPortrait } from "./doctor-portrait";

export function DoctorCard({ doctor, hospital, summary }: { doctor: Doctor; hospital?: Hospital; summary: RatingSummary }) {
  return (
    <Link href={`/doktorlar/${doctor.slug}`} className="group block">
      <DoctorPortrait
        doctor={doctor}
        sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 80vw"
        className="rounded-[var(--radius-panel)] transition-transform duration-300 group-hover:-translate-y-1"
      />
      <div className="mt-3.5 px-0.5">
        <p className="text-sm text-curing-deep">{specialtyById[doctor.specialty]?.name}</p>
        <h3 className="mt-0.5 text-lg leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
          {doctorName(doctor)}
        </h3>
        {hospital && (
          <p className="mt-1 flex items-center gap-1 text-sm text-ink-soft">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate">
              {hospital.name}, {hospital.city}
            </span>
          </p>
        )}
        <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
          <RatingInline summary={summary} />
          <span className="tabular text-xs text-ink-faint">{experienceYears(doctor)} yıl deneyim</span>
        </div>
      </div>
    </Link>
  );
}

export function DoctorRow({ doctor, hospital, summary }: { doctor: Doctor; hospital?: Hospital; summary: RatingSummary }) {
  return (
    <Link
      href={`/doktorlar/${doctor.slug}`}
      className="group grid grid-cols-[72px_1fr] items-center gap-4 rounded-[var(--radius-panel)] bg-enamel p-3 pr-4 transition-colors hover:bg-white sm:grid-cols-[88px_1fr_auto] sm:gap-6 sm:p-4"
    >
      <DoctorPortrait doctor={doctor} sizes="88px" className="rounded-[14px]" />
      <div className="min-w-0">
        <p className="text-sm text-curing-deep">{specialtyById[doctor.specialty]?.name}</p>
        <h3 className="truncate text-lg leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
          {doctorName(doctor)}
        </h3>
        <p className="mt-0.5 truncate text-sm text-ink-soft">
          {hospital ? `${hospital.name} — ${hospital.district}, ${hospital.city}` : "Hastane bilgisi yok"}
        </p>
        <div className="mt-2 sm:hidden">
          <RatingInline summary={summary} />
        </div>
      </div>
      <div className="hidden text-right sm:block">
        <RatingInline summary={summary} />
        <p className="tabular mt-1.5 text-xs text-ink-faint">{experienceYears(doctor)} yıl deneyim</p>
      </div>
    </Link>
  );
}
