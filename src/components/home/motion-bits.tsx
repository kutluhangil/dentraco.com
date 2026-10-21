"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const ease = [0.25, 1, 0.5, 1] as const;

/** Sayfanın üstünde, kaydırma ilerlemesini gösteren ince mavi çizgi. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-curing" />;
}

/** Görünüme girince aşağıdan maskeyle yükselen blok. */
export function Reveal({ children, delay = 0, className = "", y = 24 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Başlığı kelime kelime, maskenin altından kaydırarak yazar. */
export function SplitWords({ text, delay = 0, stagger = 0.06 }: { text: string; delay?: number; stagger?: number }) {
  const reduce = useReducedMotion();
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease }}
          >
            {w}
          </motion.span>
          {" "}
        </span>
      ))}
    </>
  );
}

/** Belirli aralıklarla değişen kelime; alttan bulanıklaşarak gelir. */
export function RotatingWord({ words, interval = 2600 }: { words: string[]; interval?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [reduce, words.length, interval]);
  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid align-bottom">
      {/* En uzun kelime yeri ayırır, satır zıplamaz */}
      <span className="invisible col-start-1 row-start-1">{longest}</span>
      <span className="col-start-1 row-start-1 overflow-hidden pb-[0.08em]">
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={reduce ? false : { y: "70%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.55, ease }}
        >
          {words[i]}
        </motion.span>
      </span>
      <motion.span
        key={`bar-${i}`}
        aria-hidden="true"
        className="absolute -bottom-[0.02em] left-0 h-[0.09em] w-full origin-left rounded-full bg-curing"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease }}
      />
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}

/** Görünüme girince 0'dan hedefe sayan sayı. */
export function CountUp({ to, duration = 1.4, className = "" }: { to: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className}`}>
      {(reduce ? to : value).toLocaleString("tr-TR")}
    </span>
  );
}

/** Kenarları solan, sonsuz akan yatay şerit. Üzerine gelince durur. */
export function Marquee({ children, reverse = false, speed = 40 }: { children: ReactNode; reverse?: boolean; speed?: number }) {
  return (
    <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      {[0, 1].map((k) => (
        <div
          key={k}
          aria-hidden={k === 1}
          className="flex shrink-0 items-center gap-3 pr-3 motion-safe:animate-[marquee_var(--speed)_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ ["--speed" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

/** İmleç yönüne hafifçe eğilen kart, üstünde ışık parlaması. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });
  const gx = useTransform(x, [0, 1], ["0%", "100%"]);
  const gy = useTransform(y, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgb(255 255 255 / 0.35), transparent 55%)`;

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width);
        y.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        x.set(0.5);
        y.set(0.5);
      }}
    >
      {children}
      <motion.span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[var(--radius-panel)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
    </motion.div>
  );
}

/** Hero arka planı: yavaş süzülen renk lekeleri, nokta ızgarası ve imleci izleyen mavi "polimerizasyon ışığı". */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const spot = useMotionTemplate`radial-gradient(420px circle at ${sx}px ${sy}px, rgb(45 75 255 / 0.10), transparent 70%)`;

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const blobs = [
    { c: "rgb(45 75 255 / 0.16)", size: 520, x: ["-10%", "8%", "-10%"], y: ["-20%", "5%", "-20%"], left: "55%", top: "-10%", d: 22 },
    { c: "rgb(142 220 198 / 0.35)", size: 460, x: ["0%", "-12%", "0%"], y: ["0%", "14%", "0%"], left: "70%", top: "40%", d: 26 },
    { c: "rgb(235 221 191 / 0.7)", size: 420, x: ["0%", "14%", "0%"], y: ["0%", "-10%", "0%"], left: "-8%", top: "30%", d: 30 },
  ];

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{ width: b.size, height: b.size, left: b.left, top: b.top, background: b.c }}
          animate={reduce ? undefined : { x: b.x, y: b.y }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(rgb(15_42_51/0.09)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" />
      {!reduce && <motion.div className="absolute inset-0 hidden md:block" style={{ background: spot }} />}
    </div>
  );
}
