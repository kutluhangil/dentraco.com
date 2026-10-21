"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { AdminTitle, btn } from "@/components/admin/admin-shell";
import { toast } from "@/components/ui/toast";
import { repo, useStore } from "@/lib/repo";
import { STORE_KEY } from "@/lib/repo/store";

export default function AdminSettingsPage() {
  const [confirm, setConfirm] = useState(false);
  const size = useStore((s) => JSON.stringify({ users: s.users, reviews: s.reviews, hospitals: s.hospitals, doctors: s.doctors, articles: s.articles }).length);

  return (
    <>
      <AdminTitle title="Ayarlar" sub="Demo sürümüne özel ayarlar." />
      <section className="max-w-2xl rounded-[var(--radius-panel)] bg-enamel p-6">
        <h2 className="font-semibold">Veri saklama</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Bu prototipte tüm değişiklikler tarayıcının yerel deposunda (<code>{STORE_KEY}</code>) tutulur; yaklaşık{" "}
          <span className="tabular">{Math.round(size / 1024)}</span> KB. Başka bir tarayıcı ya da cihazda değişiklikler görünmez. Gerçek kullanımda bu
          katman Supabase veritabanına taşınacaktır.
        </p>
      </section>
      <section className="mt-4 max-w-2xl rounded-[var(--radius-panel)] border border-gum/30 bg-enamel p-6">
        <h2 className="font-semibold">Demo verilerini sıfırla</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Eklenen ve düzenlenen tüm hastaneler, hekimler, yazılar, kullanıcılar ve yorumlar silinir; site ilk haline döner. Oturumunuz kapanır.
        </p>
        {confirm ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={btn.danger}
              onClick={() => {
                repo.resetDemo();
                toast("Demo verileri sıfırlandı.", "info");
              }}
            >
              <RotateCcw className="size-4" /> Evet, sıfırla
            </button>
            <button type="button" className={btn.ghost} onClick={() => setConfirm(false)}>
              Vazgeç
            </button>
          </div>
        ) : (
          <button type="button" className={`${btn.danger} mt-4`} onClick={() => setConfirm(true)}>
            <RotateCcw className="size-4" /> Verileri sıfırla
          </button>
        )}
      </section>
    </>
  );
}
