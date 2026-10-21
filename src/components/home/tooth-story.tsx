"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const steps = [
  { title: "Sağlıklı mine", text: "Florürlü macun ve günde iki kez fırçalama mineyi asitlere karşı korur." },
  { title: "Çürük başlıyor", text: "Asit mineden mineral çeker. Erken fark edilirse dolgu gerekmeden durdurulabilir." },
  { title: "Polimerizasyon ışığı", text: "Kompozit dolgu yerleştirilir ve mavi ışıkla saniyeler içinde sertleştirilir." },
  { title: "Sağlam ve parlak", text: "Diş yeniden işlevini görür; düzenli kontrol yeni çürüğü önler." },
];

const STEP_MS = 2800;
const ease = [0.25, 1, 0.5, 1] as const;

// Logo ile aynı azı dişi silüeti, 4 kat büyütülmüş (viewBox 0 0 128 128).
const molar =
  "M20 38C20 22 36 16 48 19.2c8 2 12 4.8 16 4.8s8-2.8 16-4.8C92 16 108 22 108 38c0 14-4 22-8 30l-5.6 34c-1.6 10-12.8 10-14.4 0l-5.6-28c-1.2-6-5.6-8.4-10.4-8.4s-9.2 2.4-10.4 8.4l-5.6 28c-1.6 10-12.8 10-14.4 0L28 68c-4-8-8-16-8-30Z";

function Sparkle({ x, y, delay, size = 7 }: { x: number; y: number; delay: number; size?: number }) {
  return (
    <motion.path
      d={`M${x} ${y - size}Q${x} ${y} ${x + size} ${y}Q${x} ${y} ${x} ${y + size}Q${x} ${y} ${x - size} ${y}Q${x} ${y} ${x} ${y - size}Z`}
      fill="#2D4BFF"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 0.6, 1], opacity: [0, 1, 0.7, 1] }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      style={{ transformOrigin: `${x}px ${y}px` }}
    />
  );
}

function ToothArt({ step, reduce }: { step: number; reduce: boolean }) {
  const decayVisible = step === 1 || step === 2;
  const filled = step >= 2;
  return (
    <motion.svg
      viewBox="0 0 128 128"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="ts-enamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#F3EAD7" />
        </linearGradient>
        <linearGradient id="ts-beam" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2D4BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2D4BFF" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="ts-glow">
          <stop offset="0" stopColor="#2D4BFF" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2D4BFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Diş eti */}
      <path d="M14 70c18 8 34 10 50 10s32-2 50-10" fill="none" stroke="#f7dde3" strokeWidth="14" strokeLinecap="round" />

      <path d={molar} fill="url(#ts-enamel)" stroke="#b9c8c5" strokeWidth="1.6" />
      {/* Mine parlaması */}
      <path d="M34 32c4-6 11-8 18-6" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.9" />

      {/* Çürük lekesi */}
      <AnimatePresence>
        {decayVisible && (
          <motion.g key="decay" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }} style={{ transformOrigin: "78px 36px" }}>
            <ellipse cx="78" cy="36" rx="11" ry="8" fill="#8a6a3c" opacity={step === 2 ? 0 : 0.85} />
            <ellipse cx="80" cy="35" rx="5" ry="3.5" fill="#5b4425" opacity={step === 2 ? 0 : 0.9} />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Dolgu: fildişi yama, mavi kenar ışığı sertleşince söner */}
      <AnimatePresence>
        {filled && (
          <motion.ellipse
            key="fill"
            cx="78"
            cy="36"
            rx="11"
            ry="8"
            fill="#F3EAD7"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, stroke: step === 2 ? "#2D4BFF" : "rgba(45,75,255,0)" }}
            exit={{ opacity: 0 }}
            strokeWidth="2"
            transition={{ duration: 0.6, ease }}
            style={{ transformOrigin: "78px 36px" }}
          />
        )}
      </AnimatePresence>

      {/* Polimerizasyon lambası ve ışık konisi */}
      <AnimatePresence>
        {step === 2 && (
          <motion.g key="lamp" initial={{ opacity: 0, x: 18, y: -18 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, x: 18, y: -18 }} transition={{ duration: 0.5, ease }}>
            <motion.polygon
              points="104,4 116,14 86,40 72,32"
              fill="url(#ts-beam)"
              animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
            <rect x="100" y="-14" width="14" height="30" rx="7" transform="rotate(45 107 1)" fill="#0F2A33" />
            <circle cx="78" cy="36" r="22" fill="url(#ts-glow)" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* Parıltılar */}
      <AnimatePresence>
        {step === 3 && (
          <motion.g key="sparkles" exit={{ opacity: 0 }}>
            <Sparkle x={100} y={20} delay={0} />
            <Sparkle x={22} y={28} delay={0.15} size={5} />
            <Sparkle x={108} y={58} delay={0.3} size={4} />
          </motion.g>
        )}
      </AnimatePresence>
    </motion.svg>
  );
}

export function ToothStory() {
  const reduce = useReducedMotion() ?? false;
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % steps.length), STEP_MS);
    return () => clearTimeout(t);
  }, [step, reduce, paused]);

  return (
    <section
      aria-label="Bir dişin hikâyesi: çürükten tedaviye"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mt-10 rounded-[var(--radius-panel)] border border-line bg-enamel/70 p-5 backdrop-blur"
    >
      <div className="flex items-center gap-5">
        <div className="relative size-32 shrink-0 rounded-2xl bg-porcelain">
          <div className="absolute inset-2">
            <ToothArt step={step} reduce={reduce} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-ink-faint">Bir dişin hikâyesi</p>
          <div className="relative mt-1 min-h-[5.25rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                aria-live="polite"
              >
                <p className="font-semibold">{steps[step].title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{steps[step].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div role="tablist" aria-label="Adımlar" className="flex flex-1 gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={step === i}
              aria-label={`${i + 1}. adım: ${s.title}`}
              onClick={() => setStep(i)}
              className="group relative h-6 flex-1"
            >
              <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-porcelain-deep">
                {i < step && <span className="absolute inset-0 bg-curing" />}
                {i === step && (
                  <motion.span
                    key={`${step}-${paused}`}
                    className="absolute inset-y-0 left-0 bg-curing"
                    initial={{ width: reduce || paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: reduce || paused ? 0 : STEP_MS / 1000, ease: "linear" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <Link href="/saglik-rehberi/dis-curukleri" className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-curing-deep hover:underline">
          Rehberde oku
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  );
}
