"use client";

import Link from "next/link";
import { useMemo } from "react";
import { DoctorCard } from "@/components/doctor/doctor-card";
import { HospitalImage } from "@/components/hospital/hospital-visual";
import { RatingInline } from "@/components/rating/shade-rating";
import { SmartImage } from "@/components/ui/smart-image";
import { emptySummary, weightedScore } from "@/lib/rating";
import { useArticles, useDoctors, useHospitals, useSummaries } from "@/lib/repo";

function SectionHead({ title, sub, href, cta }: { title: string; sub: string; href: string; cta: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="display-tight text-[clamp(2rem,4vw,3.0625rem)] leading-[1] font-semibold">{title}</h2>
        <p className="mt-2 max-w-xl text-ink-soft">{sub}</p>
      </div>
      <Link href={href} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-medium hover:border-ink">
        {cta}
      </Link>
    </div>
  );
}

export function FeaturedDoctors() {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const summaries = useSummaries("doctor");
  const featured = useMemo(
    () =>
      [...doctors]
        .sort((a, b) => weightedScore(summaries.get(b.id) ?? emptySummary) - weightedScore(summaries.get(a.id) ?? emptySummary))
        .slice(0, 4),
    [doctors, summaries],
  );
  const byId = new Map(hospitals.map((h) => [h.id, h]));

  return (
    <section className="page py-16 lg:py-20" aria-label="Öne çıkan hekimler">
      <SectionHead
        title="Öne çıkan hekimler"
        sub="Onaylı yorumların puanı ve sayısı birlikte değerlendirilerek sıralanır; tek bir yüksek puan öne çıkmak için yeterli olmaz."
        href="/doktorlar"
        cta="Tüm doktorlar"
      />
      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
        {featured.map((d) => (
          <li key={d.id}>
            <DoctorCard doctor={d} hospital={byId.get(d.hospitalId)} summary={summaries.get(d.id) ?? emptySummary} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export function HospitalStrip() {
  const hospitals = useHospitals();
  const doctors = useDoctors();
  const summaries = useSummaries("hospital");
  return (
    <section className="bg-enamel py-16 lg:py-20" aria-label="Hastaneler">
      <div className="page">
        <SectionHead
          title="Yedi şehirde sekiz merkez"
          sub="Diş hastaneleri, ağız ve diş sağlığı merkezleri ve klinikler. Her birinin adresi, tedavileri ve hekim kadrosu tek sayfada."
          href="/hastaneler"
          cta="Tüm hastaneler"
        />
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
          {hospitals.slice(0, 8).map((h) => (
            <li key={h.id}>
              <Link href={`/hastaneler/${h.slug}`} className="group block">
                <HospitalImage hospital={h} sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw" className="aspect-[16/10] rounded-[14px]" />
                <p className="mt-3 text-sm text-ink-soft">
                  {h.district}, {h.city}
                </p>
                <h3 className="font-semibold leading-snug group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
                  {h.name}
                </h3>
                <div className="mt-1.5 flex items-center justify-between">
                  <RatingInline summary={summaries.get(h.id) ?? emptySummary} />
                  <span className="tabular text-xs text-ink-faint">{doctors.filter((d) => d.hospitalId === h.id).length} hekim</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  { title: "Üye girişi", text: "Yorum yazmak için hesap gerekir. Böylece aynı kişinin aynı hekime birden çok yorum yazması engellenir." },
  { title: "Puan ve deneyim", text: "1–5 arası puan, kısa bir başlık ve en az 30 karakterlik deneyim yazılır. Tedavi türü ve ziyaret ayı isteğe bağlıdır." },
  { title: "Otomatik kontrol", text: "Telefon, e-posta, T.C. kimlik no ve IBAN içeren yorumlar gönderilmeden durdurulur. Hakaret, reklam ve spam işaretlenir." },
  { title: "Yönetici onayı", text: "Her yorum, yöneticinin moderasyon kuyruğuna düşer. Yönetici onaylar, düzenleyip maskeler ya da nedeniyle birlikte reddeder." },
  { title: "Yayın", text: "Onaylanan yorum profilde görünür ve ortalama puana katılır. Bekleyen ve reddedilen yorumlar puanı etkilemez." },
];

export function ModerationSteps() {
  return (
    <section className="bg-ink py-16 text-white lg:py-24" aria-labelledby="moderasyon-baslik">
      <div className="page">
        <div>
          <h2 id="moderasyon-baslik" className="display-tight text-[clamp(2rem,4vw,3.0625rem)] leading-[1] font-semibold">
            Bir yorum nasıl yayımlanır?
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Prototipteki örnek yorumlar “Örnek yorum” etiketiyle gösterilir; gerçek hasta deneyimi gibi sunulmaz.
          </p>
        </div>
        <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-panel)] bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-ink p-6 lg:min-h-60">
              <span className="tabular display-tight text-4xl font-semibold text-curing">{i + 1}</span>
              <h3 className="mt-4 font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function GuideTeaser() {
  const articles = useArticles();
  const [lead, ...rest] = articles;
  if (!lead) return null;
  return (
    <section className="page py-16 lg:py-24" aria-label="Sağlık rehberi">
      <SectionHead
        title="Sağlık rehberi"
        sub="Uzman hekimlerin gözden geçirdiği, kaynakçalı ağız ve diş sağlığı yazıları."
        href="/saglik-rehberi"
        cta="Tüm yazılar"
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[7fr_5fr]">
        <Link href={`/saglik-rehberi/${lead.slug}`} className="group block">
          <SmartImage
            src={lead.cover}
            alt=""
            sizes="(min-width: 1024px) 700px, 100vw"
            className="aspect-[16/9] rounded-[var(--radius-panel)]"
            placeholder={<ArticlePlaceholder />}
          />
          <p className="mt-4 text-sm text-curing-deep">{lead.category}</p>
          <h3 className="display-tight mt-1 text-3xl leading-tight font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
            {lead.title}
          </h3>
          <p className="mt-2 max-w-prose text-ink-soft">{lead.summary}</p>
        </Link>
        <ul className="divide-y divide-line">
          {rest.slice(0, 4).map((a) => (
            <li key={a.id}>
              <Link href={`/saglik-rehberi/${a.slug}`} className="group block py-5 first:pt-0">
                <p className="text-sm text-curing-deep">
                  {a.category} — {a.readingMinutes} dk okuma
                </p>
                <h3 className="mt-1 text-xl leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
                  {a.title}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ArticlePlaceholder() {
  return (
    <div className="relative h-full w-full bg-porcelain-deep">
      <svg viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={46 + i * 14} y={22 + (i % 2) * 4} width="10" height={40 - (i % 3) * 5} rx="2" className="shade-tab" fill={["#F3EAD7", "#EBDDBF", "#E1CDA6", "#F5EEDD", "#E6D7B4"][i]} />
        ))}
      </svg>
    </div>
  );
}
