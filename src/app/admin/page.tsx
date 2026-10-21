"use client";

import Link from "next/link";
import { useMemo } from "react";
import { AdminTitle } from "@/components/admin/admin-shell";
import { RatingBreakdown, RatingInline } from "@/components/rating/shade-rating";
import { doctorName, formatDate } from "@/lib/format";
import { emptySummary, summarize } from "@/lib/rating";
import { useActivity, useAllArticles, useDoctors, useHospitals, useReviews, useSession, useSummaries, useUsers } from "@/lib/repo";

export default function AdminOverview() {
  const me = useSession();
  const reviews = useReviews();
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const users = useUsers();
  const articles = useAllArticles();
  const activity = useActivity();
  const docSummaries = useSummaries("doctor");

  const pending = reviews.filter((r) => r.status === "pending");
  const flagged = pending.filter((r) => r.flags.length);
  const all = useMemo(() => summarize(reviews), [reviews]);
  const mostReviewed = [...doctors].sort((a, b) => (docSummaries.get(b.id)?.count ?? 0) - (docSummaries.get(a.id)?.count ?? 0)).slice(0, 5);

  const tiles = [
    { label: "Onay bekleyen yorum", value: pending.length, href: "/admin/yorumlar", accent: pending.length > 0 },
    { label: "Yayındaki yorum", value: reviews.filter((r) => r.status === "published").length, href: "/admin/yorumlar?durum=published" },
    { label: "Hastane", value: hospitals.length, href: "/admin/hastaneler" },
    { label: "Doktor", value: doctors.length, href: "/admin/doktorlar" },
    { label: "Sağlık yazısı", value: articles.length, href: "/admin/yazilar" },
    { label: "Kullanıcı", value: users.length, href: "/admin/kullanicilar" },
  ];

  return (
    <>
      <AdminTitle title={`Merhaba, ${me?.name.split(" ")[0] ?? ""}`} sub="Sitedeki içeriklerin ve moderasyon kuyruğunun özeti." />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {tiles.map((t) => (
          <li key={t.label}>
            <Link href={t.href} className={`block rounded-[var(--radius-panel)] p-4 transition-colors ${t.accent ? "bg-ink text-white hover:bg-curing" : "bg-enamel hover:bg-white"}`}>
              <p className={`text-sm ${t.accent ? "text-white/70" : "text-ink-soft"}`}>{t.label}</p>
              <p className="tabular display-tight mt-2 text-4xl font-semibold">{t.value}</p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <section className="rounded-[var(--radius-panel)] bg-enamel p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Moderasyon kuyruğu</h2>
            <Link href="/admin/yorumlar" className="text-sm text-curing-deep hover:underline">
              Tümünü incele
            </Link>
          </div>
          {flagged.length > 0 && (
            <p className="mt-2 text-sm text-ink-soft">
              {flagged.length} yorum otomatik olarak işaretlendi.
            </p>
          )}
          {pending.length === 0 ? (
            <p className="mt-4 text-ink-soft">Bekleyen yorum yok.</p>
          ) : (
            <ul className="mt-4 divide-y divide-line">
              {pending.slice(0, 5).map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.title}</p>
                    <p className="text-xs text-ink-soft">
                      {r.authorName}, {formatDate(r.createdAt)}
                    </p>
                  </div>
                  {r.flags.length > 0 ? (
                    <span className="shrink-0 rounded-full bg-gum-soft px-2.5 py-0.5 text-xs text-gum">{r.flags.length} işaret</span>
                  ) : (
                    <span className="shrink-0 rounded-full bg-porcelain px-2.5 py-0.5 text-xs text-ink-soft">Temiz</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[var(--radius-panel)] bg-enamel p-5">
          <h2 className="font-semibold">Tüm yayındaki yorumların puan dağılımı</h2>
          <div className="mt-4">
            <RatingBreakdown summary={all} />
          </div>
        </section>

        <section className="rounded-[var(--radius-panel)] bg-enamel p-5">
          <h2 className="font-semibold">En çok yorum alan hekimler</h2>
          <ul className="mt-3 divide-y divide-line">
            {mostReviewed.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 py-2.5">
                <Link href={`/doktorlar/${d.slug}`} className="truncate text-[0.9375rem] hover:underline">
                  {doctorName(d)}
                </Link>
                <RatingInline summary={docSummaries.get(d.id) ?? emptySummary} />
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[var(--radius-panel)] bg-enamel p-5">
          <h2 className="font-semibold">Son işlemler</h2>
          {activity.length === 0 ? (
            <p className="mt-3 text-sm text-ink-soft">Bu oturumda henüz bir işlem yapılmadı. Onay, düzenleme ve silme işlemleri burada listelenir.</p>
          ) : (
            <ul className="mt-3 space-y-2.5 text-sm">
              {activity.slice(0, 8).map((a) => (
                <li key={a.id} className="flex justify-between gap-4">
                  <span>
                    <span className="font-medium">{a.actor}</span> — {a.text}
                  </span>
                  <span className="shrink-0 text-xs text-ink-faint">{new Date(a.at).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
