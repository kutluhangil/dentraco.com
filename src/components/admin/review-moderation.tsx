"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import { useQueryState } from "@/components/filters/filter-ui";
import { ShadeTabs } from "@/components/rating/shade-rating";
import { SampleBadge, StatusBadge } from "@/components/ui/badges";
import { toast } from "@/components/ui/toast";
import { doctorName, formatDate } from "@/lib/format";
import { flagTypeLabel, maskText } from "@/lib/moderation";
import { repo, useDoctors, useHospitals, useReviews } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import type { ModerationFlag, Review, ReviewStatus } from "@/lib/types";
import { AdminTitle, btn, field } from "./admin-shell";

const reasons = [
  "Hakaret veya aşağılayıcı ifade içeriyor",
  "Reklam ya da yönlendirme içeriyor",
  "Spam veya anlamsız içerik",
  "Kişisel veri içeriyor",
  "Hekim/kurumla ilgili değil",
  "Doğrulanamayan ağır iddia içeriyor",
];

const tabs: { value: ReviewStatus; label: string }[] = [
  { value: "pending", label: "Bekleyen" },
  { value: "published", label: "Onaylanan" },
  { value: "rejected", label: "Reddedilen" },
];

export function ReviewModeration() {
  const reviews = useReviews();
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const { get, set } = useQueryState();
  const status = (get("durum") || "pending") as ReviewStatus;
  const [q, setQ] = useState("");
  const [onlyFlagged, setOnlyFlagged] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [limit, setLimit] = useState(30);

  const targetLabel = (r: Review) => {
    if (r.targetType === "doctor") {
      const d = doctors.find((x) => x.id === r.targetId);
      return d ? { label: doctorName(d), href: `/doktorlar/${d.slug}` } : { label: "Silinmiş hekim", href: "#" };
    }
    const h = hospitals.find((x) => x.id === r.targetId);
    return h ? { label: h.name, href: `/hastaneler/${h.slug}` } : { label: "Silinmiş merkez", href: "#" };
  };

  const list = useMemo(
    () =>
      reviews
        .filter((r) => r.status === status)
        .filter((r) => !onlyFlagged || r.flags.length > 0)
        .filter((r) => !q || matchesQuery([r.title, r.body, r.authorName], q))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [reviews, status, onlyFlagged, q],
  );

  const counts = Object.fromEntries(tabs.map((t) => [t.value, reviews.filter((r) => r.status === t.value).length]));
  const selectedClean = selected.filter((id) => !reviews.find((r) => r.id === id)?.flags.length);

  return (
    <>
      <AdminTitle title="Yorum moderasyonu" sub="Yorumlar onaylanana kadar yayımlanmaz ve puan ortalamasına katılmaz." />

      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" className="flex gap-1 rounded-full bg-porcelain-deep p-1">
          {tabs.map((t) => (
            <button
              key={t.value}
              role="tab"
              aria-selected={status === t.value}
              onClick={() => {
                set({ durum: t.value === "pending" ? null : t.value });
                setSelected([]);
              }}
              className={`h-9 rounded-full px-4 text-sm ${status === t.value ? "bg-enamel font-medium shadow-sm" : "text-ink-soft"}`}
            >
              {t.label} <span className="tabular text-ink-faint">{counts[t.value]}</span>
            </button>
          ))}
        </div>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Yorumlarda ara" aria-label="Yorumlarda ara" className={`${field} max-w-64`} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyFlagged} onChange={(e) => setOnlyFlagged(e.target.checked)} className="size-4 accent-[#2d4bff]" />
          Yalnızca işaretliler
        </label>
      </div>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="sticky top-2 z-20 mt-4 flex flex-wrap items-center gap-3 rounded-[var(--radius-panel)] bg-ink p-3 pl-5 text-sm text-white"
          >
            <span>{selected.length} yorum seçildi</span>
            {status !== "published" && (
              <button
                type="button"
                disabled={!selectedClean.length}
                onClick={() => {
                  selectedClean.forEach((id) => repo.moderateReview(id, "published"));
                  toast(`${selectedClean.length} yorum onaylandı.`);
                  setSelected([]);
                }}
                className={btn.approve}
                title={selectedClean.length < selected.length ? "İşaretli yorumlar toplu onaylanamaz" : undefined}
              >
                <Check className="size-4" /> Temiz olanları onayla ({selectedClean.length})
              </button>
            )}
            {status !== "rejected" && (
              <button
                type="button"
                onClick={() => {
                  selected.forEach((id) => repo.moderateReview(id, "rejected", "Yorum ilkelerine uygun bulunmadı"));
                  toast(`${selected.length} yorum reddedildi.`, "info");
                  setSelected([]);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/30 px-3.5 font-medium hover:bg-white/10"
              >
                <X className="size-4" /> Reddet
              </button>
            )}
            <button type="button" onClick={() => setSelected([])} className="ml-auto text-white/70 hover:text-white">
              Seçimi kaldır
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {list.length === 0 ? (
        <div className="mt-6 rounded-[var(--radius-panel)] border border-dashed border-line p-10 text-center">
          <p className="font-semibold">{status === "pending" ? "Kuyruk boş" : "Bu listede yorum yok"}</p>
          <p className="mt-1 text-sm text-ink-soft">
            {status === "pending" ? "Yeni yorumlar geldiğinde burada görünür." : "Filtreleri değiştirerek tekrar deneyin."}
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {list.slice(0, limit).map((r) => (
            <ReviewCard
              key={r.id}
              review={r}
              target={targetLabel(r)}
              selected={selected.includes(r.id)}
              onSelect={(v) => setSelected((s) => (v ? [...s, r.id] : s.filter((x) => x !== r.id)))}
            />
          ))}
        </ul>
      )}
      {list.length > limit && (
        <button type="button" onClick={() => setLimit((l) => l + 30)} className={`${btn.ghost} mt-4`}>
          Daha fazla göster ({list.length - limit})
        </button>
      )}
    </>
  );
}

// Moderasyon eşleşmeleri sadeleştirilmiş harflerle gelir ("beceriksiz"); metindeki "BECERİKSİZ" de vurgulansın diye
// her harf Türkçe karşılıklarıyla birlikte aranır.
const letterVariants: Record<string, string> = { i: "iıİI", c: "cçCÇ", g: "gğGĞ", o: "oöOÖ", s: "sşSŞ", u: "uüUÜ" };

function termPattern(term: string) {
  return [...term]
    .map((ch) => {
      const v = letterVariants[ch.toLocaleLowerCase("tr-TR")];
      return v ? `[${v}]` : ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    })
    .join("");
}

function Highlighted({ text, flags }: { text: string; flags: ModerationFlag[] }) {
  const terms = flags.map((f) => f.match).filter((m) => m.length > 1);
  if (!terms.length) return <>{text}</>;
  const re = new RegExp(`(${terms.map(termPattern).join("|")})`, "giu");
  return (
    <>
      {text.split(re).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded bg-gum-soft px-0.5 text-gum">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function ReviewCard({
  review: r,
  target,
  selected,
  onSelect,
}: {
  review: Review;
  target: { label: string; href: string };
  selected: boolean;
  onSelect: (v: boolean) => void;
}) {
  const [mode, setMode] = useState<"view" | "reject" | "edit" | "confirm" | "delete">("view");
  const [reason, setReason] = useState(reasons[0]);
  const [title, setTitle] = useState(r.title);
  const [body, setBody] = useState(r.body);
  const flagged = r.flags.length > 0;

  const approve = () => {
    repo.moderateReview(r.id, "published");
    toast("Yorum onaylandı ve yayımlandı.");
  };

  return (
    <li className={`rounded-[var(--radius-panel)] bg-enamel p-5 ${flagged && r.status === "pending" ? "ring-1 ring-gum/30" : ""}`}>
      <div className="flex gap-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(e.target.checked)}
          aria-label={`“${r.title}” yorumunu seç`}
          className="mt-1 size-4 shrink-0 accent-[#2d4bff]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <Link href={target.href} className="font-medium text-curing-deep hover:underline">
              {target.label}
            </Link>
            <span className="text-ink-faint">{r.targetType === "doctor" ? "Hekim" : "Merkez"}</span>
            <StatusBadge status={r.status} />
            {r.isSample && <SampleBadge />}
          </div>

          {mode === "edit" ? (
            <form
              className="mt-3 space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                repo.editReview(r.id, { title, body });
                toast("Yorum güncellendi; işaretler yeniden hesaplandı.");
                setMode("view");
              }}
            >
              <input value={title} onChange={(e) => setTitle(e.target.value)} className={field} aria-label="Başlık" />
              <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className={`${field} h-auto py-2`} aria-label="Yorum metni" />
              <div className="flex flex-wrap gap-2">
                <button type="submit" className={btn.primary}>
                  Kaydet
                </button>
                <button
                  type="button"
                  className={btn.ghost}
                  onClick={() => {
                    setTitle(maskText(title, r.flags));
                    setBody(maskText(body, r.flags));
                  }}
                >
                  İşaretli kısımları maskele
                </button>
                <button type="button" className={btn.ghost} onClick={() => setMode("view")}>
                  Vazgeç
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mt-2 flex items-center gap-3">
                <ShadeTabs value={r.rating} size="sm" />
                <h3 className="font-semibold">
                  <Highlighted text={r.title} flags={r.flags} />
                </h3>
              </div>
              <p className="reading mt-1.5 text-[1rem]">
                <Highlighted text={r.body} flags={r.flags} />
              </p>
            </>
          )}

          <p className="mt-2 text-xs text-ink-faint">
            {r.authorName} — {formatDate(r.createdAt)}
            {r.moderatedBy && r.status !== "pending" && ` — ${r.status === "published" ? "Onaylayan" : "Reddeden"}: ${r.moderatedBy}`}
          </p>
          {r.status === "rejected" && r.rejectReason && <p className="mt-2 text-sm text-gum">Ret nedeni: {r.rejectReason}</p>}

          {flagged && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {r.flags.map((f, i) => (
                <li key={i} className="rounded-full bg-gum-soft px-2.5 py-1 text-xs text-gum">
                  {flagTypeLabel[f.type]}: {f.label}
                </li>
              ))}
            </ul>
          )}

          {mode === "reject" && (
            <div className="mt-4 rounded-[var(--radius-control)] bg-porcelain p-4">
              <label htmlFor={`neden-${r.id}`} className="text-sm font-medium">
                Ret nedeni (kullanıcıya gösterilir)
              </label>
              <select id={`neden-${r.id}`} value={reason} onChange={(e) => setReason(e.target.value)} className={`${field} mt-1.5`}>
                {reasons.map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  className={btn.danger}
                  onClick={() => {
                    repo.moderateReview(r.id, "rejected", reason);
                    toast("Yorum reddedildi.", "info");
                  }}
                >
                  Reddet
                </button>
                <button type="button" className={btn.ghost} onClick={() => setMode("view")}>
                  Vazgeç
                </button>
              </div>
            </div>
          )}

          {mode === "confirm" && (
            <div className="mt-4 rounded-[var(--radius-control)] bg-gum-soft p-4 text-sm">
              <p className="font-medium text-gum">Bu yorumda otomatik işaretlenmiş içerik var.</p>
              <p className="mt-1 text-ink-soft">Yayımlamadan önce işaretli kısımları maskelemeniz önerilir.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button type="button" className={btn.primary} onClick={() => setMode("edit")}>
                  Düzenle ve maskele
                </button>
                <button type="button" className={btn.ghost} onClick={approve}>
                  Yine de onayla
                </button>
                <button type="button" className={btn.ghost} onClick={() => setMode("view")}>
                  Vazgeç
                </button>
              </div>
            </div>
          )}

          {mode === "delete" && (
            <div className="mt-4 flex flex-wrap items-center gap-2 rounded-[var(--radius-control)] bg-gum-soft p-4 text-sm">
              <span className="text-gum">Yorum kalıcı olarak silinecek.</span>
              <button
                type="button"
                className={btn.danger}
                onClick={() => {
                  repo.deleteReview(r.id);
                  toast("Yorum silindi.", "info");
                }}
              >
                Sil
              </button>
              <button type="button" className={btn.ghost} onClick={() => setMode("view")}>
                Vazgeç
              </button>
            </div>
          )}

          {mode === "view" && (
            <div className="mt-4 flex flex-wrap gap-2">
              {r.status !== "published" && (
                <button type="button" className={btn.approve} onClick={() => (flagged ? setMode("confirm") : approve())}>
                  <Check className="size-4" /> Onayla
                </button>
              )}
              {r.status !== "rejected" && (
                <button type="button" className={btn.ghost} onClick={() => setMode("reject")}>
                  <X className="size-4" /> Reddet
                </button>
              )}
              {r.status !== "pending" && (
                <button type="button" className={btn.ghost} onClick={() => repo.moderateReview(r.id, "pending")}>
                  Kuyruğa geri al
                </button>
              )}
              <button type="button" className={btn.ghost} onClick={() => setMode("edit")}>
                <Pencil className="size-4" /> Düzenle
              </button>
              <button type="button" className={btn.danger} onClick={() => setMode("delete")}>
                <Trash2 className="size-4" /> Sil
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
