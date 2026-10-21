"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Search } from "lucide-react";
import { Odontogram } from "@/components/odontogram/odontogram";
import { useSearchIndex } from "@/components/layout/search-dialog";
import { normalizeTr } from "@/lib/search";

const quick = [
  { label: "İmplant", href: "/doktorlar?uzmanlik=cerrahi" },
  { label: "Kanal tedavisi", href: "/doktorlar?uzmanlik=endodonti" },
  { label: "Şeffaf plak", href: "/doktorlar?uzmanlik=ortodonti" },
  { label: "Çocuk diş hekimi", href: "/doktorlar?uzmanlik=pedodonti" },
  { label: "Diş eti kanaması", href: "/saglik-rehberi/dis-eti-hastaliklari" },
];

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="page grid gap-10 pt-8 pb-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14 lg:pt-14 lg:pb-24">
      <div className="lg:pt-10">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="display-tight text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95] font-semibold text-balance"
        >
          Doğru diş hekimini, dişinden başlayarak bulun.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft"
        >
          Şikâyetinizin olduğu dişe dokunun; o bölgedeki olası tedavileri ve ilgilenen uzmanları gösterelim. Ya da doğrudan hekim, klinik veya
          tedavi arayın.
        </motion.p>
        <HeroSearch />
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Sık aranan">
          {quick.map((q) => (
            <li key={q.label}>
              <Link href={q.href} className="inline-flex rounded-full border border-line bg-enamel/60 px-3 py-1.5 text-sm text-ink-soft hover:border-ink hover:text-ink">
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-md text-sm text-ink-faint">
          8 ağız ve diş sağlığı merkezi, 40 hekim profili. Tüm profiller ve yorumlar okul projesi kapsamında oluşturulmuş örneklerdir.
        </p>
      </div>
      <div className="min-w-0">
        <Odontogram />
      </div>
    </section>
  );
}

function HeroSearch() {
  const fuse = useSearchIndex();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focused, setFocused] = useState(false);
  const results = useMemo(() => (normalizeTr(q).length >= 2 ? fuse.search(normalizeTr(q), { limit: 6 }).map((r) => r.item) : []), [fuse, q]);

  return (
    <form
      role="search"
      className="relative mt-8 max-w-lg"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) router.push(results[0].href);
        else if (q.trim()) router.push(`/doktorlar?q=${encodeURIComponent(q.trim())}`);
      }}
    >
      <label htmlFor="hero-ara" className="sr-only">
        Doktor, hastane ya da tedavi ara
      </label>
      <div className="flex h-14 items-center gap-2 rounded-full bg-enamel pr-1.5 pl-5 shadow-[0_1px_0_var(--color-line),0_18px_40px_-24px_rgb(15_42_51/0.35)] focus-within:ring-2 focus-within:ring-curing">
        <Search className="size-5 shrink-0 text-ink-faint" />
        <input
          id="hero-ara"
          value={q}
          autoComplete="off"
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Doktor, hastane, tedavi ya da şehir"
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-ink-faint"
        />
        <button type="submit" className="h-11 shrink-0 rounded-full bg-curing px-5 text-sm font-medium text-white hover:bg-curing-deep">
          Ara
        </button>
      </div>
      {focused && results.length > 0 && (
        <ul className="absolute inset-x-0 top-16 z-20 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-enamel p-1.5 shadow-[0_24px_60px_-24px_rgb(15_42_51/0.45)]">
          {results.map((r) => (
            <li key={r.href + r.label}>
              <Link href={r.href} className="block rounded-[var(--radius-control)] px-3.5 py-2.5 hover:bg-porcelain">
                <span className="block text-[0.9375rem] font-medium">{r.label}</span>
                <span className="block text-xs text-ink-soft">{r.sub}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
