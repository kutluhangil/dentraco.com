import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Proje hakkında",
  description: "Dentraco okul projesinin kapsamı, teknik altyapısı, yorum ilkeleri ve alan adı / barındırma maliyet analizi.",
};

const scope = [
  "8 kurgusal ağız ve diş sağlığı merkezi, her birinde 5 hekim (toplam 40 profil)",
  "Hekim profillerinde eğitim, deneyim, tez, sertifika, üyelik ve çalışma günleri",
  "Hastane profillerinde adres, iletişim, tedaviler, hekim listesi, puan ve yorumlar",
  "Üyelik ile 1–5 puan ve yazılı yorum; yönetici onayı sonrası yayın",
  "Kişisel veri, hakaret, reklam ve spam için otomatik moderasyon",
  "İsim, uzmanlık, şehir, tedavi ve puana göre arama ve filtreleme",
  "Etkileşimli diş haritası (odontogram) ile şikâyetten uzmana yönlendirme",
  "8 konuda kaynakçalı sağlık rehberi",
  "Hastane, hekim, yorum, kullanıcı ve yazı yönetimi için yönetim paneli",
  "Telefon, tablet ve bilgisayarda uyumlu (responsive) tasarım",
];

const stack = [
  ["Next.js 16 (App Router)", "Sayfalar statik olarak üretilir; dinamik içerik istemci tarafında yüklenir."],
  ["TypeScript", "Hastane, hekim, yorum ve yazı veri modelleri tiplidir."],
  ["Tailwind CSS 4", "Renk, yazı ve aralık token'ları tek dosyada tanımlıdır."],
  ["Motion", "Diş haritası, puan sekmeleri ve geçiş animasyonları."],
  ["Zustand", "Demo veri katmanı; değişiklikler tarayıcının yerel deposunda saklanır."],
  ["Vitest", "Moderasyon, puan hesaplama ve arama için birim testleri."],
];

const costs = [
  { item: "Barındırma — Vercel Hobby", now: "0 TL", note: "Kişisel ve ticari olmayan projeler için ücretsiz. Okul projesine uygundur." },
  { item: "Barındırma — Vercel Pro", now: "≈ 20 $ / ay / kullanıcı", note: "Ticari kullanıma geçilirse gerekir." },
  { item: "Alan adı — .com (Cloudflare Registrar)", now: "≈ 10–11 $ / yıl", note: "Maliyetine satış; yenileme fiyatı aynı kalır." },
  { item: "Alan adı — .com.tr (yerli kayıt kuruluşları)", now: "≈ 450–600 TL / yıl", note: "Firmaya göre değişir; ilk yıl kampanyaları ve yenileme fiyatı ayrı kontrol edilmeli." },
  { item: "Veritabanı — Supabase Free", now: "0 TL", note: "500 MB veritabanı, 50.000 aylık aktif kullanıcı; 1 hafta işlem olmazsa duraklar." },
  { item: "Veritabanı — Supabase Pro", now: "≈ 25 $ / ay", note: "Duraklama yok, 8 GB veritabanı; canlı kullanımda önerilir." },
];

export default function ProjectPage() {
  return (
    <>
      <PageIntro title="Proje hakkında">
        Dentraco, diş hekimi ve klinik arayan kullanıcıların hekimleri uzmanlık alanı, özgeçmiş ve onaylı hasta yorumlarıyla karşılaştırabilmesi
        için hazırlanmış bir okul projesi prototipidir.
      </PageIntro>

      <div className="page grid gap-16 pb-24 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 space-y-16">
          <section aria-labelledby="kapsam">
            <h2 id="kapsam" className="border-b border-ink pb-2 text-2xl font-semibold">
              Kapsam
            </h2>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {scope.map((s) => (
                <li key={s} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-fluoride-deep" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="moderasyon" id="moderasyon" className="scroll-mt-24">
            <h2 className="border-b border-ink pb-2 text-2xl font-semibold">Yorum ilkeleri</h2>
            <div className="reading mt-5 max-w-[68ch]">
              <p>
                Yorumlar yalnızca üye girişi yapmış kullanıcılar tarafından yazılabilir ve her kullanıcı bir hekim ya da merkez için tek yorum
                bırakabilir. Gönderilen her yorum önce “onay bekliyor” durumuna geçer; yönetici onaylamadan yayımlanmaz ve puan ortalamasına katılmaz.
              </p>
              <p>
                Telefon numarası, e-posta adresi, T.C. kimlik numarası ya da IBAN içeren yorumlar gönderilmeden durdurulur ve kullanıcıdan bu bilgiyi
                kaldırması istenir. Hakaret, reklam (bağlantı, kampanya ifadesi, sosyal medya hesabı) ve spam (tamamı büyük harf, tekrarlanan karakter
                ya da aynı içeriğin yeniden gönderilmesi) içeren yorumlar otomatik olarak işaretlenir. Yönetici bu yorumları onaylayabilir, ilgili
                kısmı maskeleyebilir ya da nedenini belirterek reddedebilir.
              </p>
              <p>
                Prototipte yer alan tüm örnek yorumlar “Örnek yorum” etiketiyle gösterilir. Bunlar gerçek hasta deneyimleri değildir ve gerçek
                deneyim gibi sunulmaz.
              </p>
            </div>
          </section>

          <section aria-labelledby="teknik">
            <h2 id="teknik" className="border-b border-ink pb-2 text-2xl font-semibold">
              Teknik altyapı
            </h2>
            <dl className="mt-5 divide-y divide-line">
              {stack.map(([k, v]) => (
                <div key={k} className="grid gap-1 py-3 sm:grid-cols-[220px_1fr]">
                  <dt className="font-medium">{k}</dt>
                  <dd className="text-ink-soft">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="reading mt-6 max-w-[68ch]">
              Prototip, sunucu ve veritabanı gerektirmeden çalışır: içerik kodla birlikte gelir, kullanıcı hesapları, yorumlar ve yönetici
              değişiklikleri tarayıcıda saklanır. Bu nedenle bir cihazda yapılan değişiklik başka bir cihazda görünmez. Bileşenler veriye tek bir
              erişim katmanı üzerinden ulaştığı için bir sonraki aşamada Supabase (PostgreSQL, kimlik doğrulama ve satır düzeyi güvenlik) gibi
              gerçek bir arka uca geçmek, arayüzü değiştirmeden yapılabilir. Önerilen veritabanı şeması proje deposundaki{" "}
              <code className="rounded bg-enamel px-1.5 py-0.5 font-sans text-sm">docs/VERITABANI_SEMASI.md</code> dosyasındadır.
            </p>
          </section>

          <section aria-labelledby="maliyet" id="maliyet" className="scroll-mt-24">
            <h2 className="border-b border-ink pb-2 text-2xl font-semibold">Alan adı ve barındırma maliyeti</h2>
            <p className="mt-4 max-w-[68ch] text-ink-soft">
              Rakamlar Ekim 2026 itibarıyla yaklaşık değerlerdir ve kur ile kampanyalara göre değişebilir. Satın almadan önce sağlayıcının kendi fiyat
              sayfasından doğrulanmalıdır.
            </p>
            <div className="mt-5 overflow-x-auto rounded-[var(--radius-panel)] bg-enamel">
              <table className="w-full min-w-[560px] text-left text-[0.9375rem]">
                <thead className="border-b border-line text-sm text-ink-soft">
                  <tr>
                    <th className="px-4 py-3 font-medium">Kalem</th>
                    <th className="px-4 py-3 font-medium">Maliyet</th>
                    <th className="px-4 py-3 font-medium">Not</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {costs.map((c) => (
                    <tr key={c.item}>
                      <td className="px-4 py-3 font-medium">{c.item}</td>
                      <td className="tabular px-4 py-3 whitespace-nowrap">{c.now}</td>
                      <td className="px-4 py-3 text-ink-soft">{c.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[var(--radius-panel)] bg-ink p-5 text-white">
                <p className="text-sm text-white/60">Okul projesi (önerilen)</p>
                <p className="display-tight mt-1 text-4xl font-semibold">0 TL</p>
                <p className="mt-2 text-sm text-white/70">Vercel Hobby + ücretsiz *.vercel.app adresi. Bu prototip için yeterlidir.</p>
              </div>
              <div className="rounded-[var(--radius-panel)] bg-enamel p-5">
                <p className="text-sm text-ink-soft">Canlıya geçiş (ilk yıl)</p>
                <p className="display-tight mt-1 text-4xl font-semibold">≈ 600 TL + 45 $/ay</p>
                <p className="mt-2 text-sm text-ink-soft">.com.tr alan adı, Vercel Pro ve Supabase Pro ile ticari kullanıma uygun kurulum.</p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[var(--radius-panel)] border border-dashed border-ink-faint/60 p-5">
            <p className="font-semibold">Kurgusallık beyanı</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Sitedeki hastane, doktor, yorum ve iletişim bilgileri kurgusaldır; gerçek kişi ve kurumlarla ilgisi yoktur. Benzerlikler
              tesadüfidir. Eğitim bilgilerinde geçen fakülteler gerçek kurumlardır ancak bu kurumlarla herhangi bir bağlantı ima edilmez. Sağlık
              içerikleri genel bilgilendirme amaçlıdır ve hekim muayenesinin yerini tutmaz.
            </p>
            <Link href="/giris" className="mt-4 inline-flex rounded-full bg-ink px-4 py-2 text-sm font-medium text-white">
              Demo hesaplarla dene
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
