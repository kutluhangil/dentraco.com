"use client";

import Link from "next/link";
import { ChevronRight, Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
import { treatmentById } from "@/data/specialties";
import { DoctorRow } from "@/components/doctor/doctor-card";
import { RatingInline } from "@/components/rating/shade-rating";
import { ReviewSection } from "@/components/review/review-section";
import { FictionalBadge } from "@/components/ui/badges";
import { NotFoundBlock } from "@/components/ui/not-found-block";
import { CURRENT_YEAR, telHref } from "@/lib/format";
import { emptySummary } from "@/lib/rating";
import { useDoctors, useHospital, useHydrated, useSummaries, useSummary } from "@/lib/repo";
import type { Hospital } from "@/lib/types";
import { HospitalImage } from "./hospital-visual";

export function HospitalProfile({ slug }: { slug: string }) {
  const hospital = useHospital(slug);
  const hydrated = useHydrated();
  if (!hospital) {
    return hydrated ? (
      <NotFoundBlock title="Bu merkez bulunamadı" text="Kayıt kaldırılmış ya da adresi değişmiş olabilir." href="/hastaneler" cta="Tüm hastanelere dön" />
    ) : (
      <div className="page h-[60vh]" />
    );
  }
  return <Profile hospital={hospital} />;
}

function Profile({ hospital }: { hospital: Hospital }) {
  const summary = useSummary("hospital", hospital.id);
  const doctors = useDoctors().filter((d) => d.hospitalId === hospital.id);
  const doctorSummaries = useSummaries("doctor");
  const [lat, lon] = hospital.coords;
  const bbox = [lon - 0.012, lat - 0.007, lon + 0.012, lat + 0.007].join(",");

  return (
    <article className="pb-24">
      <div className="page pt-6">
        <nav aria-label="Konum" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-soft">
          <Link href="/hastaneler" className="hover:text-ink hover:underline">
            Hastaneler
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href={`/hastaneler?sehir=${encodeURIComponent(hospital.city)}`} className="hover:text-ink hover:underline">
            {hospital.city}
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-ink">{hospital.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[7fr_5fr] lg:items-end">
          <div>
            <FictionalBadge />
            <p className="mt-4 text-lg text-ink-soft">
              {hospital.type} — {hospital.district}, {hospital.city}
            </p>
            <h1 className="display-tight mt-1 text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-semibold text-balance">{hospital.name}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{hospital.summary}</p>
          </div>
          <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line">
            <div className="bg-enamel p-4">
              <dt className="text-xs text-ink-faint">Puan</dt>
              <dd className="mt-1">
                <a href="#yorumlar">
                  <RatingInline summary={summary} />
                </a>
              </dd>
            </div>
            <div className="bg-enamel p-4">
              <dt className="text-xs text-ink-faint">Tedavi ünitesi</dt>
              <dd className="tabular mt-1 font-semibold">{hospital.chairs}</dd>
            </div>
            <div className="bg-enamel p-4">
              <dt className="text-xs text-ink-faint">Hizmet yılı</dt>
              <dd className="tabular mt-1 font-semibold">{CURRENT_YEAR - hospital.founded}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-[2fr_1fr]">
          <HospitalImage hospital={hospital} sizes="(min-width: 640px) 66vw, 100vw" priority className="aspect-[16/9] rounded-[var(--radius-panel)]" />
          <HospitalImage hospital={hospital} variant="ic" sizes="(min-width: 640px) 33vw, 100vw" className="aspect-[16/9] rounded-[var(--radius-panel)] sm:aspect-auto" />
        </div>
      </div>

      <div className="page mt-14 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0">
          <section aria-labelledby="hakkinda">
            <h2 id="hakkinda" className="border-b border-ink pb-2 text-xl font-semibold">
              Merkez hakkında
            </h2>
            <div className="reading mt-4 max-w-[68ch]">
              {hospital.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          <section aria-labelledby="tedaviler" className="mt-12">
            <h2 id="tedaviler" className="border-b border-ink pb-2 text-xl font-semibold">
              Sunulan tedaviler
            </h2>
            <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
              {hospital.treatments.map((t) => (
                <li key={t} className="flex items-center justify-between border-b border-line py-2.5">
                  <span>{treatmentById[t]?.name}</span>
                  <Link href={`/hastaneler?tedavi=${t}`} className="text-xs text-ink-faint hover:text-curing-deep hover:underline">
                    Diğer merkezler
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="hekimler" className="mt-12">
            <h2 id="hekimler" className="border-b border-ink pb-2 text-xl font-semibold">
              Hekim kadrosu <span className="tabular font-normal text-ink-soft">({doctors.length})</span>
            </h2>
            <ul className="mt-4 space-y-3">
              {doctors.map((d) => (
                <li key={d.id}>
                  <DoctorRow doctor={d} hospital={hospital} summary={doctorSummaries.get(d.id) ?? emptySummary} />
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="olanaklar" className="mt-12">
            <h2 id="olanaklar" className="border-b border-ink pb-2 text-xl font-semibold">
              Olanaklar
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {hospital.amenities.map((a) => (
                <li key={a} className="rounded-full bg-enamel px-3.5 py-1.5 text-sm">
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-panel)] bg-enamel p-5">
            <h2 className="font-semibold">İletişim</h2>
            <ul className="mt-3 space-y-3 text-[0.9375rem]">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ink-soft" />
                <span>{hospital.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-ink-soft" />
                <a href={telHref(hospital.phone)} className="tabular hover:underline">
                  {hospital.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-ink-soft" />
                <span className="break-all">{hospital.email}</span>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 size-4 shrink-0 text-ink-soft" />
                <span>{hospital.website}</span>
              </li>
            </ul>
            <p className="mt-3 text-xs text-ink-faint">Adres, telefon ve web bilgileri kurgusaldır.</p>
          </div>
          <div className="rounded-[var(--radius-panel)] bg-enamel p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <Clock className="size-4" /> Çalışma saatleri
            </h2>
            <dl className="mt-3 space-y-2 text-[0.9375rem]">
              {hospital.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4">
                  <dt className="text-ink-soft">{h.days}</dt>
                  <dd className="tabular">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-panel)] bg-enamel">
            <iframe
              title={`${hospital.district}, ${hospital.city} haritası`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
              className="h-56 w-full border-0 grayscale-[35%]"
              loading="lazy"
            />
            <p className="px-4 py-2.5 text-xs text-ink-faint">Konum ilçe merkezini gösterir. Harita verisi © OpenStreetMap katkıcıları.</p>
          </div>
        </aside>
      </div>

      <div className="page mt-20">
        <ReviewSection targetType="hospital" targetId={hospital.id} targetName={hospital.name} treatmentOptions={hospital.treatments} />
      </div>
    </article>
  );
}
