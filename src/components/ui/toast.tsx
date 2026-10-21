"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Info, X } from "lucide-react";
import { create } from "zustand";

type Tone = "success" | "info" | "error";
interface ToastItem {
  id: number;
  tone: Tone;
  text: string;
}

const useToasts = create<{ items: ToastItem[] }>(() => ({ items: [] }));
let counter = 0;

export function toast(text: string, tone: Tone = "success") {
  const id = ++counter;
  useToasts.setState((s) => ({ items: [...s.items, { id, tone, text }].slice(-3) }));
  setTimeout(() => useToasts.setState((s) => ({ items: s.items.filter((t) => t.id !== id) })), 4200);
}

const icon = { success: Check, info: Info, error: X };
const tones: Record<Tone, string> = {
  success: "bg-fluoride text-ink",
  info: "bg-curing-soft text-curing-deep",
  error: "bg-gum-soft text-gum",
};

export function Toaster() {
  const items = useToasts((s) => s.items);
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:right-6 sm:left-auto sm:items-end"
    >
      <AnimatePresence initial={false}>
        {items.map((t) => {
          const Icon = icon[t.tone];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.22 }}
              className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-[var(--radius-control)] bg-ink px-4 py-3 text-sm text-white shadow-[0_12px_32px_-12px_rgb(15_42_51/0.5)]"
            >
              <span className={`grid size-6 shrink-0 place-items-center rounded-full ${tones[t.tone]}`}>
                <Icon className="size-3.5" strokeWidth={2.5} />
              </span>
              {t.text}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
