"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, CheckCircle2, ShieldCheck } from "lucide-react";
import { treatmentById, treatments } from "@/data/specialties";
import { RatingBreakdown, RatingInput, ShadeTabs } from "@/components/rating/shade-rating";
import { SampleBadge } from "@/components/ui/badges";
import { toast } from "@/components/ui/toast";
import { formatDate, formatMonth } from "@/lib/format";
import { hasBlockingFlags, moderate } from "@/lib/moderation";
import { repo, useHydrated, useMyReviews, usePublishedReviews, useSession, useSummary } from "@/lib/repo";
import type { Review, TargetType, TreatmentId } from "@/lib/types";

type Sort = "yeni" | "yuksek" | "dusuk";

export function ReviewSection({
  targetType,
  targetId,
  targetName,
  treatmentOptions,
}: {
  targetType: TargetType;
  targetId: string;
  targetName: string;
  treatmentOptions?: TreatmentId[];
}) {
  const summary = useSummary(targetType, targetId);
  const reviews = usePublishedReviews(targetType, targetId);
  const [sort, setSort] = useState<Sort>("yeni");
  const [limit, setLimit] = useState(5);

  const sorted = useMemo(() => {
    const list = [...reviews];
    if (sort === "yuksek") list.sort((a, b) => b.rating - a.rating || b.createdAt.localeCompare(a.createdAt));
    if (sort === "dusuk") list.sort((a, b) => a.rating - b.rating || b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [reviews, sort]);

  return (
    <section id="yorumlar" aria-labelledby="yorumlar-baslik" className="scroll-mt-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="yorumlar-baslik" className="display-tight text-3xl font-semibold">
          Hasta yorumları
        </h2>
        <p className="flex items-center gap-1.5 text-sm text-ink-soft">
          <ShieldCheck className="size-4 text-fluoride-deep" /> Yorumlar yönetici onayından sonra yayımlanır.
        </p>
      </div>

      <div className="mt-6 rounded-[var(--radius-panel)] bg-enamel p-5 sm:p-7">
        <RatingBreakdown summary={summary} />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {reviews.length > 0 && (
            <div className="mb-4 flex items-center gap-2 text-sm">
              <label htmlFor={`sirala-${targetId}`} className="text-ink-soft">
                Sırala
              </label>
              <select
                id={`sirala-${targetId}`}
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="h-9 rounded-[var(--radius-control)] border border-line bg-enamel px-2.5"
              >
                <option value="yeni">En yeni</option>
                <option value="yuksek">En yüksek puan</option>
                <option value="dusuk">En düşük puan</option>
              </select>
            </div>
          )}
          {reviews.length === 0 ? (
            <p className="rounded-[var(--radius-panel)] border border-dashed border-line p-6 text-ink-soft">
              {targetName} için henüz onaylanmış yorum yok. Deneyiminizi ilk siz paylaşın.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {sorted.slice(0, limit).map((r) => (
                <ReviewItem key={r.id} review={r} />
              ))}
            </ul>
          )}
          {sorted.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((l) => l + 5)}
              className="mt-4 h-11 rounded-full border border-line px-5 text-sm font-medium hover:border-ink"
            >
              Daha fazla yorum göster ({sorted.length - limit})
            </button>
          )}
        </div>
        <ReviewForm targetType={targetType} targetId={targetId} targetName={targetName} treatmentOptions={treatmentOptions} />
      </div>
    </section>
  );
}

export function ReviewItem({ review }: { review: Review }) {
  return (
    <li className="py-5 first:pt-0">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <ShadeTabs value={review.rating} size="sm" />
        <span className="sr-only">{review.rating} / 5</span>
        <h3 className="font-semibold">{review.title}</h3>
        {review.isSample && <SampleBadge />}
      </div>
      <p className="reading mt-2 text-[1rem]">{review.body}</p>
      <p className="mt-2.5 text-xs text-ink-faint">
        {review.authorName}, {formatDate(review.createdAt)}
        {review.treatment && <> — {treatmentById[review.treatment]?.name}</>}
        {review.visitDate && <> — Ziyaret: {formatMonth(review.visitDate)}</>}
      </p>
    </li>
  );
}

function ReviewForm({
  targetType,
  targetId,
  targetName,
  treatmentOptions,
}: {
  targetType: TargetType;
  targetId: string;
  targetName: string;
  treatmentOptions?: TreatmentId[];
}) {
  const hydrated = useHydrated();
  const me = useSession();
  const mine = useMyReviews().find((r) => r.targetType === targetType && r.targetId === targetId);
  const pathname = usePathname();
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [treatment, setTreatment] = useState("");
  const [visit, setVisit] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  const flags = useMemo(() => (body || title ? moderate(`${title}\n${body}`) : []), [title, body]);
  const blocking = hasBlockingFlags(flags);
  const warnings = flags.filter((f) => f.type !== "kisisel_veri");
  const options = treatmentOptions?.length ? treatmentOptions : treatments.map((t) => t.id);

  const shell = "rounded-[var(--radius-panel)] bg-ink p-6 text-white lg:sticky lg:top-24 lg:self-start";

  if (!hydrated) return <div className={`${shell} h-64 animate-pulse opacity-80`} aria-hidden="true" />;

  if (!me) {
    return (
      <aside className={shell}>
        <h3 className="text-xl font-semibold">Deneyiminizi paylaşın</h3>
        <p className="mt-2 text-sm text-white/70">
          Yorum yapabilmek için üye girişi gerekir. Yorumunuz, moderasyon ekibi tarafından incelendikten sonra yayımlanır.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link href={`/giris?next=${encodeURIComponent(pathname + "#yorumlar")}`} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-curing-soft">
            Giriş yap
          </Link>
          <Link href={`/kayit?next=${encodeURIComponent(pathname + "#yorumlar")}`} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium hover:border-white">
            Üye ol
          </Link>
        </div>
      </aside>
    );
  }

  if (mine) {
    return (
      <aside className={shell}>
        <CheckCircle2 className="size-7 text-fluoride" />
        <h3 className="mt-3 text-xl font-semibold">
          {mine.status === "pending" ? "Yorumunuz alındı" : mine.status === "published" ? "Yorumunuz yayında" : "Yorumunuz yayımlanmadı"}
        </h3>
        <p className="mt-2 text-sm text-white/70">
          {mine.status === "pending"
            ? "Yönetici onayından sonra bu sayfada görünecek. Durumunu profil sayfanızdan takip edebilirsiniz."
            : mine.status === "rejected"
              ? `Ret nedeni: ${mine.rejectReason ?? "Yorum ilkelerine uygun bulunmadı."}`
              : "Paylaştığınız için teşekkürler."}
        </p>
        <Link href="/profil" className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-curing-soft">
          Yorumlarıma git
        </Link>
      </aside>
    );
  }

  const bodyLen = body.trim().length;
  const valid = rating > 0 && title.trim().length >= 4 && bodyLen >= 30 && bodyLen <= 1000 && !blocking;

  return (
    <aside className={shell}>
      <h3 className="text-xl font-semibold">Deneyiminizi paylaşın</h3>
      <p className="mt-1 text-sm text-white/70">{targetName}</p>
      <form
        className="mt-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setTouched(true);
          if (!valid) return;
          const res = repo.addReview({
            targetType,
            targetId,
            rating,
            title,
            body,
            treatment: (treatment || undefined) as TreatmentId | undefined,
            visitDate: visit || undefined,
          });
          if (!res.ok) {
            setError(res.error);
            return;
          }
          toast("Yorumunuz alındı. Onaydan sonra yayımlanacak.");
        }}
      >
        <div className="[&_legend]:text-white [&_.bg-line]:bg-white/20 [&_span.text-ink-soft]:text-white/70">
          <RatingInput value={rating} onChange={setRating} name={`puan-${targetId}`} />
        </div>
        {touched && rating === 0 && <p className="text-xs text-[#ffb3c0]">Bir puan seçin.</p>}

        <Field label="Başlık" htmlFor={`baslik-${targetId}`}>
          <input
            id={`baslik-${targetId}`}
            value={title}
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Kısa bir özet"
            className={inputDark}
          />
        </Field>
        {touched && title.trim().length < 4 && <p className="text-xs text-[#ffb3c0]">Başlık en az 4 karakter olmalı.</p>}

        <Field label="Deneyiminiz" htmlFor={`metin-${targetId}`} hint={`${bodyLen} / 1000`}>
          <textarea
            id={`metin-${targetId}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={5}
            maxLength={1000}
            placeholder="Tedavi süreci, iletişim, bekleme süresi…"
            className={`${inputDark} h-auto py-2.5`}
          />
        </Field>
        {touched && bodyLen < 30 && <p className="text-xs text-[#ffb3c0]">En az 30 karakter yazın ({30 - bodyLen} kaldı).</p>}

        <AnimatePresence>
          {blocking && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-[var(--radius-control)] bg-gum/20 p-3 text-xs text-white"
            >
              <p className="flex items-center gap-1.5 font-medium">
                <AlertTriangle className="size-3.5" /> Kişisel veri paylaşmayın
              </p>
              <p className="mt-1 text-white/80">
                Şunları kaldırın:{" "}
                {flags
                  .filter((f) => f.type === "kisisel_veri")
                  .map((f) => `${f.label} (${f.match})`)
                  .join(", ")}
              </p>
            </motion.div>
          )}
          {!blocking && warnings.length > 0 && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-[var(--radius-control)] bg-amber/20 p-3 text-xs text-white/90"
            >
              Yorumunuz hakaret, reklam ya da spam içeriyor olabilir ve moderasyonda reddedilebilir.
            </motion.p>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Tedavi" htmlFor={`tedavi-${targetId}`}>
            <select id={`tedavi-${targetId}`} value={treatment} onChange={(e) => setTreatment(e.target.value)} className={inputDark}>
              <option value="">Seçin (isteğe bağlı)</option>
              {options.map((t) => (
                <option key={t} value={t}>
                  {treatmentById[t]?.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ziyaret ayı" htmlFor={`ziyaret-${targetId}`}>
            <input id={`ziyaret-${targetId}`} type="month" value={visit} max="2026-10" onChange={(e) => setVisit(e.target.value)} className={inputDark} />
          </Field>
        </div>

        {error && <p className="text-sm text-[#ffb3c0]">{error}</p>}

        <button
          type="submit"
          disabled={blocking}
          className="h-12 w-full rounded-full bg-curing text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#4560ff] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Yorumu gönder
        </button>
        <p className="text-xs leading-relaxed text-white/50">
          Gönderdiğiniz yorum onaylanana kadar yalnızca size ve yöneticilere görünür. Hakaret, reklam ve kişisel veri içeren yorumlar
          yayımlanmaz.
        </p>
      </form>
    </aside>
  );
}

const inputDark =
  "h-11 w-full rounded-[var(--radius-control)] border border-white/15 bg-white/[0.06] px-3 text-[0.9375rem] text-white placeholder:text-white/40 focus:border-curing focus:outline-none [&>option]:text-ink";

function Field({ label, htmlFor, hint, children }: { label: string; htmlFor: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {hint && <span className="tabular text-xs text-white/50">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
