# Dentraco

Diş hekimlerini ve ağız-diş sağlığı merkezlerini uzmanlık alanı, özgeçmiş ve onaylı hasta yorumlarıyla karşılaştırmak için hazırlanmış bir **okul projesi prototipi**.

> Sitedeki hastane, doktor, yorum ve iletişim bilgileri kurgusaldır; gerçek kişi ve kurumlarla ilgisi yoktur. Sağlık içerikleri genel bilgilendirme amaçlıdır.

## Özellikler

- 8 kurgusal merkez, 40 hekim profili (eğitim, deneyim, tez, sertifika, üyelik, çalışma günleri)
- Etkileşimli **odontogram**: dişe ya da diş etine tıklayınca olası tedaviler ve ilgili uzmanlar; süt dişleri görünümü
- İsim, uzmanlık, şehir, hastane, tedavi ve en düşük puana göre filtreleme (URL ile paylaşılabilir)
- Üyelik, 1–5 puan ve yorum; **yönetici onayı** olmadan yayın yok
- Otomatik moderasyon: telefon, e-posta, T.C. kimlik no, IBAN engellenir; hakaret, reklam ve spam işaretlenir
- 8 konuda kaynakçalı sağlık rehberi
- Yönetim paneli: yorum kuyruğu, hastane/doktor/yazı ekleme-düzenleme-silme, kullanıcı rolleri, demo sıfırlama
- Telefon, tablet ve masaüstü uyumlu; klavye ile gezinilebilir; `prefers-reduced-motion` desteği

## Çalıştırma

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # birim testleri (vitest)
pnpm lint
pnpm build
pnpm prompts      # docs/GORSEL_PROMPTLARI.md dosyasını veriden yeniden üretir
```

### Demo hesapları

| Rol | E-posta | Şifre |
|---|---|---|
| Yönetici | `admin@dentraco.demo` | `Dentraco2026!` |
| İkinci yönetici | `editor@dentraco.demo` | `Dentraco2026!` |
| Kullanıcı | `kullanici@dentraco.demo` | `Demo2026!` |

Demo sürümde veriler tarayıcının yerel deposunda tutulur; bir cihazdaki değişiklik başka cihazda görünmez. Yönetim panelindeki **Ayarlar → Demo verilerini sıfırla** ile başlangıç haline dönülür.

## Görseller

Görseller Gemini ile üretilecek. Tüm prompt'lar, dosya adları, oranlar ve çözünürlükler `docs/GORSEL_PROMPTLARI.md` dosyasında. Görseller eklenene kadar site otomatik yer tutucular gösterir; dosyalar `public/images/...` altına konunca kod değişikliği gerekmez.

## Yapı

```
src/app/(site)/      herkese açık sayfalar
src/app/admin/       yönetim paneli
src/components/      arayüz bileşenleri (odontogram, puan sekmeleri, yorumlar, filtreler…)
src/data/            seed içerik (hastaneler, doktorlar, yorumlar, makaleler)
src/lib/repo/        veri erişim katmanı (demo: zustand + localStorage)
src/lib/moderation.ts  otomatik yorum denetimi
docs/                görsel prompt'ları, maliyet analizi, veritabanı şeması
supabase/schema.sql  ileriki aşama için önerilen şema
```

## Teknoloji

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, Zustand, Zod, Fuse.js, Vitest.

## Dağıtım

Vercel Hobby planı (ücretsiz, ticari olmayan kullanım) önerilir. Maliyet karşılaştırması: `docs/MALIYET_VE_BARINDIRMA.md`.
