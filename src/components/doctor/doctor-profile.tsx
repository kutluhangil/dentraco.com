"use client";

import Link from "next/link";
import { CalendarDays, ChevronRight, GraduationCap, Languages, Phone, Printer } from "lucide-react";
import { specialtyById, treatmentById } from "@/data/specialties";
import { DoctorCard } from "@/components/doctor/doctor-card";
import { RatingInline } from "@/components/rating/shade-rating";
import { ReviewSection } from "@/components/review/review-section";
import { FictionalBadge } from "@/components/ui/badges";
import { NotFoundBlock } from "@/components/ui/not-found-block";
import { CURRENT_YEAR, doctorName, experienceYears, hospitalPlace, telHref } from "@/lib/format";
import { emptySummary } from "@/lib/rating";
import { useDoctor, useDoctors, useHospitals, useHydrated, useSummaries, useSummary } from "@/lib/repo";
import type { Doctor } from "@/lib/types";
import { DoctorPortrait } from "./doctor-portrait";

const dayShort: Record<string, string> = {
  Pazartesi: "Pzt",
  Salı: "Sal",
  Çarşamba: "Çar",
  Perşembe: "Per",
  Cuma: "Cum",
  Cumartesi: "Cmt",
  Pazar: "Paz",
};

export function DoctorProfile({ slug }: { slug: string }) {
  const doctor = useDoctor(slug);
  const hydrated = useHydrated();
  if (!doctor) {
    return hydrated ? (
      <NotFoundBlock title="Bu hekim profili bulunamadı" text="Profil kaldırılmış ya da adresi değişmiş olabilir." href="/doktorlar" cta="Tüm doktorlara dön" />
    ) : (
      <div className="page h-[60vh]" />
    );
  }
  return <Profile doctor={doctor} />;
}

function Profile({ doctor }: { doctor: Doctor }) {
  const hospitals = useHospitals();
  const hospital = hospitals.find((h) => h.id === doctor.hospitalId);
  const summary = useSummary("doctor", doctor.id);
  const specialty = specialtyById[doctor.specialty];
  const years = experienceYears(doctor);

  return (
    <article className="page pt-6 pb-24">
      <nav aria-label="Konum" className="no-print mb-6 flex flex-wrap items-center gap-1 text-sm text-ink-soft">
        <Link href="/doktorlar" className="hover:text-ink hover:underline">
          Doktorlar
        </Link>
        <ChevronRight className="size-3.5" />
        <Link href={`/doktorlar?uzmanlik=${doctor.specialty}`} className="hover:text-ink hover:underline">
          {specialty?.name}
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="text-ink">{doctorName(doctor)}</span>
      </nav>

      <div className="print-full grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
        <aside className="print-full lg:sticky lg:top-24 lg:self-start">
          <DoctorPortrait doctor={doctor} sizes="(min-width: 1024px) 340px, 100vw" priority className="max-w-[340px] rounded-[var(--radius-panel)] max-lg:max-w-[260px]" />
          <div className="mt-5">
            <FictionalBadge />
            <p className="mt-4 text-lg text-ink-soft">{doctor.title}</p>
            <h1 className="display-tight text-[clamp(2.5rem,5vw,3.8rem)] leading-[0.95] font-semibold">
              {doctor.firstName} {doctor.lastName}
            </h1>
            <p className="mt-2 text-lg text-curing-deep">{specialty?.name}</p>
            <div className="mt-4">
              <a href="#yorumlar" className="inline-flex hover:opacity-80">
                <RatingInline summary={summary} size="md" />
              </a>
            </div>
          </div>

          {hospital && (
            <Link href={`/hastaneler/${hospital.slug}`} className="mt-6 block rounded-[var(--radius-panel)] bg-enamel p-4 transition-colors hover:bg-white">
              <p className="text-xs text-ink-faint">Hizmet verdiği merkez</p>
              <p className="mt-0.5 font-semibold">{hospital.name}</p>
              <p className="mt-0.5 text-sm text-ink-soft">
                {hospitalPlace(hospital)}
              </p>
            </Link>
          )}

          <div className="mt-4">
            <p className="flex items-center gap-1.5 text-sm text-ink-soft">
              <CalendarDays className="size-4" /> Çalışma günleri
            </p>
            <ul className="mt-2 grid grid-cols-7 gap-1">
              {Object.entries(dayShort).map(([full, short]) => {
                const on = doctor.workingDays.includes(full);
                return (
                  <li
                    key={full}
                    title={full}
                    className={`rounded-md py-1.5 text-center text-xs ${on ? "bg-ink text-white" : "bg-porcelain-deep text-ink-faint line-through"}`}
                  >
                    {short}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="no-print mt-6 flex flex-wrap gap-2">
            {hospital && (
              <a href={telHref(hospital.phone)} className="inline-flex h-11 items-center gap-2 rounded-full bg-curing px-5 text-sm font-medium text-white hover:bg-curing-deep">
                <Phone className="size-4" /> Randevu için ara
              </a>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-enamel px-5 text-sm font-medium hover:border-ink"
            >
              <Printer className="size-4" /> Özgeçmişi yazdır
            </button>
          </div>
          <p className="no-print mt-3 text-xs text-ink-faint">Dentraco randevu almaz; telefon numarası kurgusaldır.</p>
        </aside>

        <div className="min-w-0">
          <p className="font-serif text-2xl leading-snug text-ink italic sm:text-[1.75rem]">{doctor.headline}</p>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line sm:grid-cols-4">
            <Fact label="Deneyim" value={`${years} yıl`} />
            <Fact label="Mezuniyet" value={String(doctor.graduationYear)} />
            <Fact label="Unvan" value={doctor.title} />
            <Fact label="Diller" value={String(doctor.languages.length)} />
          </dl>

          <CvSection title="Hakkında">
            <div className="reading max-w-[68ch]">
              {doctor.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </CvSection>

          <CvSection title="Eğitim" icon={<GraduationCap className="size-5" />}>
            <Timeline
              items={[...doctor.education]
                .sort((a, b) => b.start - a.start)
                .map((e) => ({ years: `${e.start} – ${e.end}`, title: e.degree, place: e.institution, note: e.note }))}
            />
            {doctor.thesis && (
              <div className="mt-6 rounded-[var(--radius-control)] border-l-[3px] border-curing bg-enamel px-5 py-4">
                <p className="text-sm text-ink-soft">{doctor.title === "Uzm. Dt." ? "Uzmanlık tezi" : "Doktora tezi"}</p>
                <p className="reading mt-1 italic">“{doctor.thesis}”</p>
              </div>
            )}
          </CvSection>

          <CvSection title="Mesleki deneyim">
            <Timeline
              items={[...doctor.experience]
                .sort((a, b) => (b.end ?? CURRENT_YEAR + 1) - (a.end ?? CURRENT_YEAR + 1) || b.start - a.start)
                .map((e) => ({ years: `${e.start} – ${e.end ?? "Halen"}`, title: e.role, place: e.place, note: e.detail, current: e.end === null }))}
            />
          </CvSection>

          {doctor.certificates.length > 0 && (
            <CvSection title="Sertifikalar ve kurslar">
              <ul className="divide-y divide-line">
                {doctor.certificates.map((c) => (
                  <li key={c.name} className="grid gap-1 py-3 sm:grid-cols-[80px_1fr]">
                    <span className="tabular text-sm text-ink-faint">{c.year}</span>
                    <span>
                      <span className="block font-medium">{c.name}</span>
                      <span className="text-sm text-ink-soft">{c.issuer}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </CvSection>
          )}

          {doctor.publications.length > 0 && (
            <CvSection title="Bilimsel çalışmalar">
              <ul className="reading space-y-2.5">
                {doctor.publications.map((p) => (
                  <li key={p} className="border-l-2 border-line pl-4">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-ink-faint">Yayın başlıkları kurgusaldır; gerçek bir dergide yayımlanmamıştır.</p>
            </CvSection>
          )}

          <div className="grid gap-x-10 sm:grid-cols-2">
            <CvSection title="Üyelikler">
              <ul className="space-y-1.5">
                {doctor.memberships.map((m) => (
                  <li key={m} className="flex gap-2">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-curing" />
                    {m}
                  </li>
                ))}
              </ul>
            </CvSection>
            <CvSection title="Diller" icon={<Languages className="size-5" />}>
              <ul className="flex flex-wrap gap-2">
                {doctor.languages.map((l) => (
                  <li key={l} className="rounded-full bg-enamel px-3 py-1 text-sm">
                    {l}
                  </li>
                ))}
              </ul>
            </CvSection>
          </div>

          <CvSection title="İlgilendiği tedaviler">
            <ul className="flex flex-wrap gap-2">
              {doctor.focus.map((t) => (
                <li key={t}>
                  <Link href={`/hastaneler?tedavi=${t}`} className="inline-flex rounded-full border border-line bg-enamel px-3.5 py-1.5 text-sm hover:border-curing hover:text-curing-deep">
                    {treatmentById[t]?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </CvSection>
        </div>
      </div>

      <div className="no-print mt-20">
        <ReviewSection targetType="doctor" targetId={doctor.id} targetName={doctorName(doctor)} treatmentOptions={doctor.focus} />
      </div>

      {hospital && <Colleagues doctor={doctor} hospitalName={hospital.name} />}
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-enamel px-4 py-3.5">
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="tabular mt-0.5 font-semibold">{value}</dd>
    </div>
  );
}

function CvSection({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mt-12 break-inside-avoid">
      <h2 className="mb-4 flex items-center gap-2 border-b border-ink pb-2 text-xl font-semibold">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Timeline({ items }: { items: { years: string; title: string; place: string; note?: string; current?: boolean }[] }) {
  return (
    <ol className="relative space-y-6 border-l border-line pl-6">
      {items.map((it) => (
        <li key={it.years + it.title} className="relative">
          <span
            className={`absolute top-1.5 -left-[29px] size-[9px] rounded-full ring-4 ring-porcelain ${it.current ? "bg-curing" : "bg-ink-faint"}`}
            aria-hidden="true"
          />
          <p className="tabular text-sm text-ink-soft">{it.years}</p>
          <p className="mt-0.5 font-semibold">{it.title}</p>
          <p className="reading text-[1rem]">{it.place}</p>
          {it.note && <p className="mt-1 text-sm text-ink-soft">{it.note}</p>}
        </li>
      ))}
    </ol>
  );
}

function Colleagues({ doctor, hospitalName }: { doctor: Doctor; hospitalName: string }) {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const summaries = useSummaries("doctor");
  const others = doctors.filter((d) => d.hospitalId === doctor.hospitalId && d.id !== doctor.id).slice(0, 4);
  if (!others.length) return null;
  const hospital = hospitals.find((h) => h.id === doctor.hospitalId);
  return (
    <section className="no-print mt-20" aria-labelledby="ekip">
      <h2 id="ekip" className="display-tight text-3xl font-semibold">
        {hospitalName} ekibinden
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {others.map((d) => (
          <li key={d.id}>
            <DoctorCard doctor={d} hospital={hospital} summary={summaries.get(d.id) ?? emptySummary} />
          </li>
        ))}
      </ul>
    </section>
  );
}
