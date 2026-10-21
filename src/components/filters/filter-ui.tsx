"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { ShadeTabs } from "@/components/rating/shade-rating";

export function useQueryState() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const get = useCallback((key: string) => params.get(key) ?? "", [params]);
  const getList = useCallback((key: string) => (params.get(key) ?? "").split(",").filter(Boolean), [params]);

  const set = useCallback(
    (patch: Record<string, string | string[] | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [k, v] of Object.entries(patch)) {
        const value = Array.isArray(v) ? v.join(",") : v;
        if (!value) next.delete(k);
        else next.set(k, value);
      }
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [params, pathname, router],
  );

  return { get, getList, set, params };
}

export function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="border-t border-line pt-4 first-of-type:border-0 first-of-type:pt-0">
      <p id={id} className="mb-2.5 text-sm font-medium">
        {title}
      </p>
      {children}
    </div>
  );
}

export function CheckList({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string; count?: number }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <ul className="space-y-0.5">
      {options.map((o) => {
        const checked = selected.includes(o.value);
        return (
          <li key={o.value}>
            <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1.5 text-[0.9375rem] hover:bg-porcelain">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onChange(checked ? selected.filter((s) => s !== o.value) : [...selected, o.value])}
                className="size-4 accent-[#2d4bff]"
              />
              <span className="flex-1">{o.label}</span>
              {o.count !== undefined && <span className="tabular text-xs text-ink-faint">{o.count}</span>}
            </label>
          </li>
        );
      })}
    </ul>
  );
}

export function MinRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const options = [0, 3, 3.5, 4, 4.5];
  return (
    <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="En düşük puan">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={`flex h-9 items-center gap-1.5 rounded-full border px-3 text-sm ${
            value === o ? "border-curing bg-curing-soft text-curing-deep" : "border-line bg-enamel text-ink-soft hover:border-ink-faint"
          }`}
        >
          {o === 0 ? (
            "Tümü"
          ) : (
            <>
              <ShadeTabs value={o} size="sm" />
              <span className="tabular">{o.toLocaleString("tr-TR")}+</span>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

export function SelectField({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label htmlFor={id} className="flex items-center gap-2 text-sm">
      <span className="text-ink-soft">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-[var(--radius-control)] border border-line bg-enamel px-2.5 text-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/** Masaüstünde yapışkan kenar çubuğu, mobilde alttan açılan sayfa. */
export function FilterShell({ children, activeCount, onClear }: { children: ReactNode; activeCount: number; onClear: () => void }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const header = (
    <div className="mb-4 flex items-center justify-between">
      <p className="font-semibold">Filtreler</p>
      {activeCount > 0 && (
        <button type="button" onClick={onClear} className="text-sm text-curing-deep hover:underline">
          Temizle ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-4 overflow-y-auto rounded-[var(--radius-panel)] bg-enamel p-5">
          {header}
          {children}
        </div>
      </aside>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-1/2 z-40 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white shadow-[0_12px_30px_-10px_rgb(15_42_51/0.6)] lg:hidden"
      >
        <SlidersHorizontal className="size-4" /> Filtreler{activeCount > 0 && ` (${activeCount})`}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[80] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filtreler"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-[24px] bg-enamel p-5 pb-24"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line" />
              <button type="button" onClick={() => setOpen(false)} className="absolute top-4 right-4 grid size-9 place-items-center rounded-full hover:bg-porcelain" aria-label="Kapat">
                <X className="size-5" />
              </button>
              {header}
              <div className="space-y-4">{children}</div>
              <div className="fixed inset-x-0 bottom-0 border-t border-line bg-enamel p-4">
                <button type="button" onClick={() => setOpen(false)} className="h-12 w-full rounded-full bg-curing font-medium text-white">
                  Sonuçları göster
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SearchField({ value, onChange, placeholder, id }: { value: string; onChange: (v: string) => void; placeholder: string; id: string }) {
  const [local, setLocal] = useState(value);
  const [prev, setPrev] = useState(value);
  if (value !== prev) {
    setPrev(value);
    setLocal(value);
  }
  useEffect(() => {
    if (local === value) return;
    const t = setTimeout(() => onChange(local), 220);
    return () => clearTimeout(t);
  }, [local, value, onChange]);
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        id={id}
        type="search"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-[var(--radius-control)] border border-line bg-porcelain/60 px-3.5 text-[0.9375rem] outline-none placeholder:text-ink-faint focus:border-curing focus:bg-enamel"
      />
    </div>
  );
}
