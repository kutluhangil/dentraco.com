"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Fuse from "fuse.js";
import { BookOpen, Building2, Search, Stethoscope, UserRound } from "lucide-react";
import { specialties, treatments } from "@/data/specialties";
import { doctorName } from "@/lib/format";
import { useArticles, useDoctors, useHospitals } from "@/lib/repo";
import { normalizeTr } from "@/lib/search";

type Kind = "doktor" | "hastane" | "tedavi" | "rehber";
interface Entry {
  kind: Kind;
  label: string;
  sub: string;
  href: string;
  text: string;
}

const kindMeta: Record<Kind, { label: string; icon: typeof Search }> = {
  doktor: { label: "Doktorlar", icon: UserRound },
  hastane: { label: "Hastaneler", icon: Building2 },
  tedavi: { label: "Uzmanlık ve tedaviler", icon: Stethoscope },
  rehber: { label: "Sağlık rehberi", icon: BookOpen },
};

export function useSearchIndex() {
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const articles = useArticles();

  return useMemo(() => {
    const hospitalName = new Map(hospitals.map((h) => [h.id, h]));
    const entries: Entry[] = [
      ...doctors.map((d) => {
        const h = hospitalName.get(d.hospitalId);
        const sp = specialties.find((s) => s.id === d.specialty);
        return {
          kind: "doktor" as const,
          label: doctorName(d),
          sub: `${sp?.name ?? ""} — ${h?.name ?? ""}`,
          href: `/doktorlar/${d.slug}`,
          text: normalizeTr(`${d.firstName} ${d.lastName} ${sp?.name} ${sp?.practitioner} ${h?.city} ${h?.district}`),
        };
      }),
      ...hospitals.map((h) => ({
        kind: "hastane" as const,
        label: h.name,
        sub: `${h.district}, ${h.city}`,
        href: `/hastaneler/${h.slug}`,
        text: normalizeTr(`${h.name} ${h.city} ${h.district} ${h.type}`),
      })),
      ...specialties.map((s) => ({
        kind: "tedavi" as const,
        label: s.name,
        sub: `${doctors.filter((d) => d.specialty === s.id).length} hekim`,
        href: `/doktorlar?uzmanlik=${s.id}`,
        text: normalizeTr(`${s.name} ${s.practitioner} ${s.description}`),
      })),
      ...treatments.map((t) => ({
        kind: "tedavi" as const,
        label: t.name,
        sub: "Bu tedaviyi sunan hastaneler",
        href: `/hastaneler?tedavi=${t.id}`,
        text: normalizeTr(t.name),
      })),
      ...articles.map((a) => ({
        kind: "rehber" as const,
        label: a.title,
        sub: a.category,
        href: `/saglik-rehberi/${a.slug}`,
        text: normalizeTr(`${a.title} ${a.summary}`),
      })),
    ];
    return new Fuse(entries, { keys: ["text"], threshold: 0.34, ignoreLocation: true, minMatchCharLength: 2 });
  }, [doctors, hospitals, articles]);
}

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>{open && <SearchPanel onClose={onClose} />}</AnimatePresence>;
}

function SearchPanel({ onClose }: { onClose: () => void }) {
  const fuse = useSearchIndex();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const query = normalizeTr(q);
    if (query.length < 2) return [];
    return fuse.search(query, { limit: 12 }).map((r) => r.item);
  }, [fuse, q]);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const grouped = (Object.keys(kindMeta) as Kind[])
    .map((k) => ({ kind: k, items: results.filter((r) => r.kind === k) }))
    .filter((g) => g.items.length);
  const flat = grouped.flatMap((g) => g.items);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center bg-ink/40 px-4 pt-[10vh] backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Sitede ara"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -6, opacity: 0 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-xl overflow-hidden rounded-[var(--radius-panel)] bg-enamel shadow-[0_30px_80px_-20px_rgb(15_42_51/0.5)]"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const target = flat[active];
            if (target) {
              router.push(target.href);
              onClose();
            } else if (q.trim()) {
              router.push(`/doktorlar?q=${encodeURIComponent(q.trim())}`);
              onClose();
            }
          }}
          className="flex items-center gap-3 border-b border-line px-5"
        >
          <Search className="size-5 text-ink-faint" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, flat.length - 1));
              }
              if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
            }}
            placeholder="Doktor adı, klinik, şehir ya da tedavi"
            className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-ink-faint"
            aria-label="Arama"
          />
          <kbd className="rounded border border-line px-1.5 text-xs text-ink-faint">Esc</kbd>
        </form>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {q.trim().length < 2 ? (
            <p className="px-3 py-6 text-sm text-ink-soft">Örneğin “kanal tedavisi”, “Kadıköy”, “ortodonti” ya da bir hekimin adını yazın.</p>
          ) : flat.length === 0 ? (
            <p className="px-3 py-6 text-sm text-ink-soft">“{q}” için sonuç yok. Yazımı kontrol edin ya da uzmanlık adıyla arayın.</p>
          ) : (
            grouped.map((g) => {
              const Icon = kindMeta[g.kind].icon;
              return (
                <div key={g.kind} className="py-1">
                  <p className="px-3 pt-2 pb-1 text-xs font-medium text-ink-faint">{kindMeta[g.kind].label}</p>
                  {g.items.map((item) => {
                    const index = flat.indexOf(item);
                    return (
                      <Link
                        key={item.href + item.label}
                        href={item.href}
                        onClick={onClose}
                        onMouseEnter={() => setActive(index)}
                        className={`flex items-center gap-3 rounded-[var(--radius-control)] px-3 py-2.5 ${index === active ? "bg-curing-soft" : ""}`}
                      >
                        <Icon className="size-4 shrink-0 text-ink-soft" />
                        <span className="min-w-0">
                          <span className="block truncate text-[0.9375rem] font-medium">{item.label}</span>
                          <span className="block truncate text-xs text-ink-soft">{item.sub}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
