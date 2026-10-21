"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Trash2 } from "lucide-react";
import { ShadeTabs } from "@/components/rating/shade-rating";
import { StatusBadge } from "@/components/ui/badges";
import { toast } from "@/components/ui/toast";
import { doctorName, formatDate } from "@/lib/format";
import { repo, useDoctors, useHospitals, useHydrated, useMyReviews, useSession } from "@/lib/repo";

export function ProfileView() {
  const hydrated = useHydrated();
  const me = useSession();
  const reviews = useMyReviews();
  const doctors = useDoctors();
  const hospitals = useHospitals();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!hydrated) return <div className="page h-[60vh]" />;
  if (!me) {
    return (
      <div className="page py-20">
        <h1 className="display-tight text-5xl font-semibold">Profilim</h1>
        <p className="mt-3 text-ink-soft">Yorumlarınızı görmek için giriş yapın.</p>
        <Link href="/giris?next=/profil" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-white">
          Giriş yap
        </Link>
      </div>
    );
  }

  const targetOf = (type: string, id: string) => {
    if (type === "doctor") {
      const d = doctors.find((x) => x.id === id);
      return d ? { label: doctorName(d), href: `/doktorlar/${d.slug}` } : { label: "Silinmiş profil", href: "#" };
    }
    const h = hospitals.find((x) => x.id === id);
    return h ? { label: h.name, href: `/hastaneler/${h.slug}` } : { label: "Silinmiş profil", href: "#" };
  };
  const counts = {
    pending: reviews.filter((r) => r.status === "pending").length,
    published: reviews.filter((r) => r.status === "published").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="page grid gap-12 py-12 lg:grid-cols-[320px_1fr] lg:py-16">
      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-[var(--radius-panel)] bg-enamel p-5">
          <p className="text-sm text-ink-soft">{me.role === "admin" ? "Yönetici hesabı" : "Üye"}</p>
          <h1 className="display-tight mt-1 text-4xl font-semibold">{me.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">{me.email}</p>
          <p className="mt-1 text-xs text-ink-faint">Üyelik: {formatDate(me.createdAt)}</p>
          <form
            className="mt-5 border-t border-line pt-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!name || name.trim().length < 3) return;
              repo.updateProfile(name);
              setName(null);
              toast("Adınız güncellendi.");
            }}
          >
            <label htmlFor="ad" className="text-sm font-medium">
              Görünen ad
            </label>
            <div className="mt-1.5 flex gap-2">
              <input id="ad" value={name ?? me.name} onChange={(e) => setName(e.target.value)} className="h-10 min-w-0 flex-1 rounded-[var(--radius-control)] border border-line px-3" />
              <button type="submit" disabled={name === null || name.trim().length < 3} className="h-10 rounded-full bg-ink px-4 text-sm text-white disabled:opacity-40">
                Kaydet
              </button>
            </div>
          </form>
        </div>
        {me.role === "admin" && (
          <Link href="/admin" className="flex items-center gap-2 rounded-[var(--radius-panel)] bg-ink p-4 text-sm font-medium text-white hover:bg-curing">
            <LayoutDashboard className="size-4" /> Yönetim paneline git
          </Link>
        )}
        <div className="rounded-[var(--radius-panel)] border border-dashed border-gum/40 p-4">
          {confirmDelete ? (
            <>
              <p className="text-sm">Hesabınız ve tüm yorumlarınız kalıcı olarak silinecek. Emin misiniz?</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    repo.deleteAccount();
                    toast("Hesabınız silindi.", "info");
                    router.push("/");
                  }}
                  className="rounded-full bg-gum px-4 py-2 text-sm text-white"
                >
                  Hesabı sil
                </button>
                <button type="button" onClick={() => setConfirmDelete(false)} className="rounded-full border border-line px-4 py-2 text-sm">
                  Vazgeç
                </button>
              </div>
            </>
          ) : (
            <button type="button" onClick={() => setConfirmDelete(true)} disabled={me.role === "admin"} className="flex items-center gap-2 text-sm text-gum disabled:opacity-40" title={me.role === "admin" ? "Yönetici hesapları buradan silinemez" : undefined}>
              <Trash2 className="size-4" /> Hesabımı sil
            </button>
          )}
        </div>
      </aside>

      <section aria-labelledby="yorumlarim">
        <h2 id="yorumlarim" className="display-tight text-4xl font-semibold">
          Yorumlarım
        </h2>
        <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-[var(--radius-panel)] bg-line">
          {(
            [
              ["Onay bekliyor", counts.pending],
              ["Yayında", counts.published],
              ["Reddedildi", counts.rejected],
            ] as const
          ).map(([l, c]) => (
            <div key={l} className="bg-enamel p-4">
              <dt className="text-xs text-ink-faint">{l}</dt>
              <dd className="tabular mt-1 text-2xl font-semibold">{c}</dd>
            </div>
          ))}
        </dl>
        {reviews.length === 0 ? (
          <div className="mt-6 rounded-[var(--radius-panel)] border border-dashed border-line p-8">
            <p className="font-semibold">Henüz yorum yazmadınız.</p>
            <p className="mt-1 text-ink-soft">Bir hekimin ya da kliniğin profil sayfasının altından deneyiminizi paylaşabilirsiniz.</p>
            <Link href="/doktorlar" className="mt-4 inline-flex rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white">
              Doktorlara göz at
            </Link>
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {reviews.map((r) => {
              const t = targetOf(r.targetType, r.targetId);
              return (
                <li key={r.id} className="rounded-[var(--radius-panel)] bg-enamel p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link href={t.href} className="text-sm text-curing-deep hover:underline">
                      {t.label}
                    </Link>
                    <StatusBadge status={r.status} />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <ShadeTabs value={r.rating} size="sm" />
                    <h3 className="font-semibold">{r.title}</h3>
                  </div>
                  <p className="reading mt-2 text-[1rem]">{r.body}</p>
                  <p className="mt-2 text-xs text-ink-faint">Gönderildi: {formatDate(r.createdAt)}</p>
                  {r.status === "rejected" && (
                    <p className="mt-3 rounded-[var(--radius-control)] bg-gum-soft px-3 py-2 text-sm text-gum">Ret nedeni: {r.rejectReason ?? "Yorum ilkelerine uygun bulunmadı."}</p>
                  )}
                  {r.status === "pending" && <p className="mt-3 text-sm text-ink-soft">Yönetici incelemesinden sonra yayımlanacak. Bu süre içinde puan ortalamasına katılmaz.</p>}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
