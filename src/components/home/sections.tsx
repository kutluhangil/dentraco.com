"use client";

import Link from "next/link";
import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight, LogIn, PenLine, ScanSearch, ShieldCheck, Sparkles } from "lucide-react";
import { specialties, treatments } from "@/data/specialties";
import { DoctorCard } from "@/components/doctor/doctor-card";
import { HospitalImage } from "@/components/hospital/hospital-visual";
import { RatingInline } from "@/components/rating/shade-rating";
import { SmartImage } from "@/components/ui/smart-image";
import { emptySummary, weightedScore } from "@/lib/rating";
import { useArticles, useDoctors, useHospitals, useReviews, useSummaries } from "@/lib/repo";
import { CountUp, Marquee, Reveal, TiltCard } from "./motion-bits";

const ease = [0.25, 1, 0.5, 1] as const;

function SectionHead({ title, sub, href, cta }: { title: string; sub: string; href: string; cta: string }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="display-tight text-[clamp(2rem,4vw,3.0625rem)] leading-[1]">{title}</h2>
        <p className="mt-2 max-w-xl text-ink-soft">{sub}</p>
      </div>
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium transition-colors hover:border-ink hover:bg-ink hover:text-white"
      >
        {cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </Reveal>
  );
}

export function StatsStrip() {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const reviews = useReviews();
  const stats = [
    { value: hospitals.length, label: "ağız ve diş sağlığı merkezi" },
    { value: doctors.length, label: "hekim profili ve özgeçmişi" },
    { value: reviews.filter((r) => r.status === "published").length, label: "onaylı örnek yorum" },
    { value: specialties.length, label: "uzmanlık alanı" },
  ];
  return (
    <section aria-label="Rakamlarla Dentraco" className="page">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} y={12} className="bg-enamel px-5 py-6">
            <CountUp to={s.value} className="display-tight block text-4xl sm:text-5xl" />
            <p className="mt-1 text-sm text-ink-soft">{s.label}</p>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-faint">Tüm merkezler, hekimler ve yorumlar okul projesi kapsamında oluşturulmuş kurgusal örneklerdir.</p>
    </section>
  );
}

export function TreatmentMarquee() {
  const chip = "inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-enamel px-4 py-2 text-[0.9375rem] whitespace-nowrap";
  return (
    <section aria-label="Tedaviler ve uzmanlıklar" className="space-y-3 py-14">
      <Marquee speed={55}>
        {treatments.map((t) => (
          <Link key={t.id} href={`/hastaneler?tedavi=${t.id}`} className={`${chip} hover:border-curing hover:text-curing-deep`}>
            <span className="shade-tab block h-4 w-2 bg-curing" aria-hidden="true" />
            {t.name}
          </Link>
        ))}
      </Marquee>
      <Marquee speed={45} reverse>
        {specialties.map((s) => (
          <Link key={s.id} href={`/doktorlar?uzmanlik=${s.id}`} className={`${chip} bg-ink text-white hover:bg-curing`}>
            <Sparkles className="size-3.5 text-fluoride" aria-hidden="true" />
            {s.name}
          </Link>
        ))}
      </Marquee>
    </section>
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
        {featured.map((d, i) => (
          <li key={d.id}>
            <Reveal delay={i * 0.1} y={40}>
              <TiltCard className="group">
                <DoctorCard doctor={d} hospital={byId.get(d.hospitalId)} summary={summaries.get(d.id) ?? emptySummary} />
              </TiltCard>
            </Reveal>
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
  const reduce = useReducedMotion();
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
          {hospitals.slice(0, 8).map((h, i) => (
            <motion.li
              key={h.id}
              initial={reduce ? false : { clipPath: "inset(18% 18% 18% 18% round 20px)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 4) * 0.08, ease }}
            >
              <Link href={`/hastaneler/${h.slug}`} className="group block">
                <div className="overflow-hidden rounded-[14px]">
                  <HospitalImage
                    hospital={h}
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[16/10] transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-3 text-sm text-ink-soft">
                  {h.district}, {h.city}
                </p>
                <h3 className="leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">{h.name}</h3>
                <div className="mt-1.5 flex items-center justify-between">
                  <RatingInline summary={summaries.get(h.id) ?? emptySummary} />
                  <span className="tabular text-xs text-ink-faint">{doctors.filter((d) => d.hospitalId === h.id).length} hekim</span>
                </div>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const steps = [
  { icon: LogIn, title: "Üye girişi", text: "Yorum yazmak için hesap gerekir. Böylece aynı kişinin aynı hekime birden çok yorum yazması engellenir." },
  { icon: PenLine, title: "Puan ve deneyim", text: "1–5 arası puan, kısa bir başlık ve en az 30 karakterlik deneyim yazılır. Tedavi türü ve ziyaret ayı isteğe bağlıdır." },
  { icon: ScanSearch, title: "Otomatik kontrol", text: "Telefon, e-posta, T.C. kimlik no ve IBAN içeren yorumlar gönderilmeden durdurulur. Hakaret, reklam ve spam işaretlenir." },
  { icon: ShieldCheck, title: "Yönetici onayı", text: "Her yorum moderasyon kuyruğuna düşer. Yönetici onaylar, düzenleyip maskeler ya da nedeniyle birlikte reddeder." },
  { icon: Sparkles, title: "Yayın", text: "Onaylanan yorum profilde görünür ve ortalamaya katılır. Bekleyen ve reddedilen yorumlar puanı etkilemez." },
];

function Step({ step, index, progress }: { step: (typeof steps)[number]; index: number; progress: MotionValue<number> }) {
  const start = index / steps.length;
  const lit = useTransform(progress, [start, start + 0.12], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["rgba(255,255,255,0.06)", "rgba(45,75,255,1)"]);
  const scale = useTransform(lit, [0, 1], [0.9, 1]);
  const textOpacity = useTransform(lit, [0, 1], [0.45, 1]);
  const Icon = step.icon;
  return (
    <li className="relative">
      <motion.span style={{ backgroundColor: bg, scale }} className="relative z-10 grid size-12 place-items-center rounded-2xl text-white">
        <Icon className="size-5" />
      </motion.span>
      <p className="tabular mt-5 text-sm text-white/40">Adım {index + 1}</p>
      <h3 className="mt-1 font-semibold">{step.title}</h3>
      <motion.p style={{ opacity: textOpacity }} className="mt-2 text-sm leading-relaxed text-white/70">
        {step.text}
      </motion.p>
    </li>
  );
}

export function ModerationSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const lineScale = useTransform(progress, [0, 1], [0, 1]);
  const dot = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-24" aria-labelledby="moderasyon-baslik">
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 size-[480px] rounded-full bg-curing/25 blur-3xl" />
      <div className="page relative">
        <Reveal>
          <h2 id="moderasyon-baslik" className="display-tight text-[clamp(2rem,4vw,3.0625rem)] leading-[1]">
            Bir yorum nasıl yayımlanır?
          </h2>
          <p className="mt-4 max-w-lg text-white/70">
            Prototipteki örnek yorumlar “Örnek yorum” etiketiyle gösterilir; gerçek hasta deneyimi gibi sunulmaz.
          </p>
        </Reveal>
        <div ref={ref} className="relative mt-14">
          {/* Masaüstü: kaydırdıkça dolan yatay hat ve üzerinde ilerleyen yorum işareti */}
          <div aria-hidden="true" className="absolute top-6 right-[10%] left-6 hidden h-px bg-white/10 lg:block">
            <motion.div style={{ scaleX: lineScale }} className="h-full origin-left bg-curing" />
            <motion.span style={{ left: dot }} className="absolute top-1/2 -ml-2 size-4 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_6px_rgb(45_75_255/0.6)]" />
          </div>
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
            {steps.map((s, i) => (
              <Step key={s.title} step={s} index={i} progress={progress} />
            ))}
          </ol>
        </div>
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
        <Reveal>
          <Link href={`/saglik-rehberi/${lead.slug}`} className="group block">
            <div className="overflow-hidden rounded-[var(--radius-panel)]">
              <SmartImage
                src={lead.cover}
                alt=""
                sizes="(min-width: 1024px) 700px, 100vw"
                className="aspect-[16/9] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                placeholder={<ArticlePlaceholder />}
              />
            </div>
            <p className="mt-4 text-sm text-curing-deep">{lead.category}</p>
            <h3 className="display-tight mt-1 text-3xl leading-tight group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
              {lead.title}
            </h3>
            <p className="mt-2 max-w-prose text-ink-soft">{lead.summary}</p>
          </Link>
        </Reveal>
        <ul className="divide-y divide-line">
          {rest.slice(0, 4).map((a, i) => (
            <li key={a.id}>
              <Reveal delay={0.1 + i * 0.08} y={16}>
                <Link href={`/saglik-rehberi/${a.slug}`} className="group flex items-start justify-between gap-4 py-5">
                  <span>
                    <span className="block text-sm text-curing-deep">
                      {a.category} — {a.readingMinutes} dk okuma
                    </span>
                    <span className="mt-1 block text-xl leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">
                      {a.title}
                    </span>
                  </span>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-curing" />
                </Link>
              </Reveal>
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
          <rect key={i} x={46 + i * 14} y={22 + (i % 2) * 4} width="10" height={40 - (i % 3) * 5} rx="4" fill={["#F3EAD7", "#EBDDBF", "#E1CDA6", "#F5EEDD", "#E6D7B4"][i]} />
        ))}
      </svg>
    </div>
  );
}
