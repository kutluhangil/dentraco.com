"use client";

import { useState, type ReactNode } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import { btn, field } from "./admin-shell";

export function FormSection({ title, children, hint }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section className="rounded-[var(--radius-panel)] bg-enamel p-5 sm:p-6">
      <h2 className="font-semibold">{title}</h2>
      {hint && <p className="mt-0.5 text-sm text-ink-soft">{hint}</p>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function Input({
  label,
  value,
  onChange,
  type = "text",
  wide,
  required,
  hint,
  placeholder,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  wide?: boolean;
  required?: boolean;
  hint?: string;
  placeholder?: string;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-gum"> *</span>}
      </span>
      <input type={type} value={value} required={required} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className={field} />
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  hint,
  required,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
  required?: boolean;
  mono?: boolean;
}) {
  return (
    <label className="block sm:col-span-2">
      <span className="mb-1.5 block text-sm font-medium">
        {label}
        {required && <span aria-hidden="true" className="text-gum"> *</span>}
      </span>
      <textarea
        value={value}
        rows={rows}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className={`${field} h-auto py-2.5 leading-relaxed ${mono ? "font-mono text-sm" : ""}`}
      />
      {hint && <span className="mt-1 block text-xs text-ink-faint">{hint}</span>}
    </label>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  wide,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  wide?: boolean;
}) {
  return (
    <label className={`block ${wide ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={field}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function CheckGrid<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T[];
  onChange: (v: T[]) => void;
}) {
  return (
    <div className="sm:col-span-2">
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
        {options.map((o) => (
          <label key={o.value} className="flex items-center gap-2 rounded-lg px-1.5 py-1 text-sm hover:bg-porcelain">
            <input
              type="checkbox"
              checked={value.includes(o.value)}
              onChange={(e) => onChange(e.target.checked ? [...value, o.value] : value.filter((x) => x !== o.value))}
              className="size-4 accent-[#2d4bff]"
            />
            {o.label}
          </label>
        ))}
      </div>
    </div>
  );
}

/** Eğitim, deneyim, sertifika gibi tekrarlanan satırlar için. */
export function Repeater<T>({
  label,
  items,
  onChange,
  empty,
  render,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  empty: T;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
}) {
  return (
    <div className="sm:col-span-2">
      <p className="mb-2 text-sm font-medium">{label}</p>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 rounded-[var(--radius-control)] border border-line p-3">
            <div className="grid flex-1 gap-2 sm:grid-cols-[2fr_2fr_90px_90px]">
              {render(item, (patch) => onChange(items.map((x, j) => (j === i ? { ...x, ...patch } : x))))}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="grid size-10 shrink-0 place-items-center rounded-full text-gum hover:bg-gum-soft"
              aria-label="Satırı sil"
            >
              <Trash2 className="size-4" />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => onChange([...items, empty])} className={`${btn.ghost} mt-2`}>
        <Plus className="size-4" /> Satır ekle
      </button>
    </div>
  );
}

export function RowInput({ value, onChange, placeholder, type = "text" }: { value: string | number | null; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return <input type={type} value={value ?? ""} placeholder={placeholder} aria-label={placeholder} onChange={(e) => onChange(e.target.value)} className={field} />;
}

export function TableToolbar({ q, setQ, placeholder, action }: { q: string; setQ: (v: string) => void; placeholder: string; action: ReactNode }) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <label className="relative w-full max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-faint" />
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label={placeholder} className={`${field} pl-9`} />
      </label>
      {action}
    </div>
  );
}

export function ConfirmDelete({ label, warning, onConfirm }: { label: string; warning?: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);
  if (!open)
    return (
      <button type="button" onClick={() => setOpen(true)} className="rounded-full px-3 py-1.5 text-sm text-gum hover:bg-gum-soft" aria-label={`${label} sil`}>
        Sil
      </button>
    );
  return (
    <span className="inline-flex flex-wrap items-center gap-2 rounded-[var(--radius-control)] bg-gum-soft px-3 py-1.5 text-sm">
      <span className="text-gum">{warning ?? "Kalıcı olarak silinsin mi?"}</span>
      <button type="button" onClick={onConfirm} className="font-medium text-gum underline">
        Evet, sil
      </button>
      <button type="button" onClick={() => setOpen(false)} className="text-ink-soft">
        Vazgeç
      </button>
    </span>
  );
}

export const lines = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
export const paragraphs = (s: string) =>
  s
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean);
