"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Baby, ChevronRight, Sparkles } from "lucide-react";
import { gumArea, permanentTeeth, primaryTeeth } from "@/data/teeth";
import { specialtyById, treatmentById } from "@/data/specialties";
import { useDoctors } from "@/lib/repo";
import type { SpecialtyId, ToothInfo, TreatmentId } from "@/lib/types";
import { VIEW, groovePath, gumArcPath, layoutArch, toothPath, type ToothShape } from "./geometry";

type Selection = { type: "tooth"; fdi: number } | { type: "gum" } | null;

const quadrants = [
  { q: 1, label: "Üst sağ" },
  { q: 2, label: "Üst sol" },
  { q: 4, label: "Alt sağ" },
  { q: 3, label: "Alt sol" },
];

export function Odontogram({ initial = 36 }: { initial?: number }) {
  const [primary, setPrimary] = useState(false);
  const [selection, setSelection] = useState<Selection>({ type: "tooth", fdi: initial });
  const [hover, setHover] = useState<number | null>(null);
  const [mobileQuadrant, setMobileQuadrant] = useState(3);
  const reduce = useReducedMotion();
  const refs = useRef(new Map<number, SVGGElement>());

  const shapes = useMemo(() => layoutArch(primary), [primary]);
  const teeth = primary ? primaryTeeth : permanentTeeth;
  const info = useMemo(() => new Map(teeth.map((t) => [t.fdi, t])), [teeth]);

  // Ekranda soldan sağa sıra (klavyeyle gezinme için).
  const rings = useMemo(() => {
    const byArch = (arch: ToothShape["arch"]) => shapes.filter((s) => s.arch === arch).sort((a, b) => a.x - b.x);
    return { upper: byArch("upper"), lower: byArch("lower") };
  }, [shapes]);

  const select = (fdi: number) => setSelection({ type: "tooth", fdi });

  const onKey = (e: KeyboardEvent, shape: ToothShape) => {
    const ring = rings[shape.arch];
    const i = ring.findIndex((s) => s.fdi === shape.fdi);
    let next: ToothShape | undefined;
    if (e.key === "ArrowRight") next = ring[Math.min(i + 1, ring.length - 1)];
    if (e.key === "ArrowLeft") next = ring[Math.max(i - 1, 0)];
    if (e.key === "ArrowDown" && shape.arch === "upper") next = rings.lower[i];
    if (e.key === "ArrowUp" && shape.arch === "lower") next = rings.upper[i];
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      select(shape.fdi);
      return;
    }
    if (next) {
      e.preventDefault();
      refs.current.get(next.fdi)?.focus();
      select(next.fdi);
    }
  };

  const togglePrimary = () => {
    const nextPrimary = !primary;
    setPrimary(nextPrimary);
    setSelection({ type: "tooth", fdi: nextPrimary ? 74 : 36 });
    setMobileQuadrant(nextPrimary ? 7 : 3);
  };

  const selectedTooth = selection?.type === "tooth" ? info.get(selection.fdi) : undefined;
  const gumSelected = selection?.type === "gum";

  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-ink-soft">
          {primary ? "Süt dişleri (20)" : "Daimi dişler (32)"} — hekim bakışı, hastanın sağı solda
        </p>
        <button
          type="button"
          onClick={togglePrimary}
          aria-pressed={primary}
          className={`inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors ${
            primary ? "border-curing bg-curing text-white" : "border-line bg-enamel text-ink hover:border-ink-faint"
          }`}
        >
          <Baby className="size-4" /> Çocuk dişleri
        </button>
      </div>

      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        className="mt-2 w-full select-none"
        role="group"
        aria-label="Etkileşimli diş haritası. Bir dişe tıklayın ya da ok tuşlarıyla gezinin."
      >
        <defs>
          <radialGradient id="curing-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2d4bff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2d4bff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Diş eti bandı */}
        {(["upper", "lower"] as const).map((arch) => (
          <path
            key={`${arch}-${primary}`}
            d={gumArcPath(arch, primary)}
            fill="none"
            stroke={gumSelected ? "#f4c9d2" : "#f7dde3"}
            strokeWidth={primary ? 62 : 66}
            strokeLinecap="round"
            className="cursor-pointer transition-[stroke] duration-200 hover:stroke-[#f4c9d2]"
            onClick={() => setSelection({ type: "gum" })}
          />
        ))}

        <text x={VIEW.w / 2} y={VIEW.h / 2 + 5} textAnchor="middle" className="fill-ink-faint text-[13px]">
          {primary ? "Süt dişleri" : "Orta hat"}
        </text>
        <text x={18} y={VIEW.h / 2 + 5} className="fill-ink-faint text-[13px]">
          Sağ
        </text>
        <text x={VIEW.w - 18} y={VIEW.h / 2 + 5} textAnchor="end" className="fill-ink-faint text-[13px]">
          Sol
        </text>

        <g key={primary ? "p" : "d"}>
          {shapes.map((s) => {
            const t = info.get(s.fdi);
            const active = selection?.type === "tooth" && selection.fdi === s.fdi;
            const hovered = hover === s.fdi;
            const order = s.arch === "upper" ? rings.upper.indexOf(s) : 16 + rings.lower.indexOf(s);
            return (
              <g
                key={s.fdi}
                ref={(el) => {
                  if (el) refs.current.set(s.fdi, el);
                  else refs.current.delete(s.fdi);
                }}
                role="button"
                tabIndex={active ? 0 : -1}
                aria-pressed={active}
                aria-label={`${s.fdi} numaralı diş: ${t?.name ?? ""}`}
                onClick={() => select(s.fdi)}
                onKeyDown={(e) => onKey(e, s)}
                onFocus={() => setHover(s.fdi)}
                onBlur={() => setHover(null)}
                onMouseEnter={() => setHover(s.fdi)}
                onMouseLeave={() => setHover(null)}
                className="cursor-pointer outline-none [&:focus-visible_.tooth]:stroke-curing [&:focus-visible_.tooth]:stroke-[3]"
              >
                <motion.g
                  initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: reduce ? 0 : 0.15 + order * 0.026, duration: 0.42, ease: [0.25, 1, 0.5, 1] }}
                  style={{ originX: `${s.x}px`, originY: `${s.y}px` }}
                >
                  <g transform={`translate(${s.x} ${s.y}) rotate(${s.rotate})`}>
                    <motion.path
                      className="tooth"
                      d={toothPath(s.kind, s.w, s.d)}
                      stroke={active ? "#1f36cc" : "#b9c8c5"}
                      strokeWidth={1.4}
                      initial={reduce ? false : { fill: "#ffffff" }}
                      animate={{
                        fill: active
                          ? "#2d4bff"
                          : hovered
                            ? "#e3e8ff"
                            : reduce
                              ? "#ffffff"
                              : ["#ffffff", "#ffffff", "#c9d3ff", "#ffffff"],
                      }}
                      transition={
                        active || hovered || reduce
                          ? { duration: 0.18 }
                          : { duration: 0.9, delay: 1.15 + order * 0.035, times: [0, 0.1, 0.4, 1] }
                      }
                    />
                    <path
                      d={groovePath(s.kind, s.w, s.d)}
                      fill="none"
                      stroke={active ? "#ffffff" : "#0f2a33"}
                      strokeOpacity={active ? 0.6 : 0.16}
                      strokeWidth={1.2}
                      strokeLinecap="round"
                    />
                  </g>
                  <text
                    x={s.labelX}
                    y={s.labelY + 4}
                    textAnchor="middle"
                    className={`tabular text-[12px] transition-colors ${active ? "fill-curing font-semibold" : "fill-ink-faint"}`}
                  >
                    {s.fdi}
                  </text>
                </motion.g>
              </g>
            );
          })}
        </g>

        {/* Polimerizasyon ışığı: yükleme sonrası ark boyunca bir kez geçen mavi parıltı */}
        {!reduce && (
          <motion.circle
            r={70}
            fill="url(#curing-glow)"
            initial={{ opacity: 0, cx: 90, cy: 230 }}
            animate={{
              opacity: [0, 1, 1, 1, 0],
              cx: [90, 180, 320, 470, 560],
              cy: [230, 110, 60, 110, 230],
            }}
            transition={{ delay: 1.1, duration: 1.3, ease: "easeInOut" }}
            pointerEvents="none"
          />
        )}
      </svg>

      {/* Mobil: küçük dişler için büyük dokunma alanları */}
      <div className="mt-2 md:hidden">
        <div role="tablist" aria-label="Çeyrek seçin" className="grid grid-cols-4 gap-1 rounded-full bg-porcelain-deep p-1">
          {quadrants.map(({ q, label }) => {
            const qq = primary ? q + 4 : q;
            return (
              <button
                key={q}
                role="tab"
                aria-selected={mobileQuadrant === qq}
                onClick={() => setMobileQuadrant(qq)}
                className={`h-8 rounded-full text-xs ${mobileQuadrant === qq ? "bg-enamel font-medium shadow-sm" : "text-ink-soft"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {teeth
            .filter((t) => Math.floor(t.fdi / 10) === mobileQuadrant)
            .map((t) => {
              const active = selection?.type === "tooth" && selection.fdi === t.fdi;
              return (
                <button
                  key={t.fdi}
                  type="button"
                  onClick={() => select(t.fdi)}
                  aria-pressed={active}
                  aria-label={`${t.fdi}: ${t.name}`}
                  className={`tabular h-10 min-w-10 flex-1 rounded-[var(--radius-control)] border text-sm ${
                    active ? "border-curing bg-curing text-white" : "border-line bg-enamel"
                  }`}
                >
                  {t.fdi}
                </button>
              );
            })}
          <button
            type="button"
            onClick={() => setSelection({ type: "gum" })}
            aria-pressed={gumSelected}
            className={`h-10 rounded-[var(--radius-control)] border px-3 text-sm ${
              gumSelected ? "border-gum bg-gum-soft text-gum" : "border-line bg-enamel"
            }`}
          >
            Diş eti
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTooth ? `t${selectedTooth.fdi}` : gumSelected ? "gum" : "none"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
        >
          {selectedTooth ? (
            <SelectionPanel
              heading={`${selectedTooth.fdi} — ${selectedTooth.name}`}
              tag={selectedTooth.kind === "yirmi yaş" ? "20 yaş dişi" : selectedTooth.kind}
              concerns={selectedTooth.concerns}
              treatments={selectedTooth.treatments}
              specialties={selectedTooth.specialties}
            />
          ) : gumSelected ? (
            <SelectionPanel
              heading="Diş eti"
              tag="yumuşak doku"
              concerns={gumArea.concerns}
              treatments={gumArea.treatments}
              specialties={gumArea.specialties}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SelectionPanel({
  heading,
  tag,
  concerns,
  treatments,
  specialties,
}: {
  heading: string;
  tag: ToothInfo["kind"] | string;
  concerns: string[];
  treatments: TreatmentId[];
  specialties: SpecialtyId[];
}) {
  const doctors = useDoctors();
  return (
    <div className="mt-4 rounded-[var(--radius-panel)] border border-line bg-enamel p-5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="tabular text-lg font-semibold">{heading}</h3>
        <span className="text-sm text-ink-soft">{tag}</span>
      </div>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-ink-soft">Sık görülen şikâyetler</p>
          <ul className="mt-1.5 space-y-1 text-[0.9375rem]">
            {concerns.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-curing" />
                {c}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-ink-soft">Olası tedaviler</p>
          <ul className="mt-1.5 flex flex-wrap gap-1.5">
            {treatments.map((t) => (
              <li key={t}>
                <Link href={`/hastaneler?tedavi=${t}`} className="inline-flex rounded-full bg-porcelain px-2.5 py-1 text-sm hover:bg-curing-soft">
                  {treatmentById[t]?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
        {specialties.map((sp) => {
          const count = doctors.filter((d) => d.specialty === sp).length;
          return (
            <Link
              key={sp}
              href={`/doktorlar?uzmanlik=${sp}`}
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink py-2 pr-3 pl-4 text-sm text-white hover:bg-curing"
            >
              <Sparkles className="size-3.5 text-fluoride" />
              {count} {specialtyById[sp].practitioner.toLocaleLowerCase("tr-TR")}
              <ChevronRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
