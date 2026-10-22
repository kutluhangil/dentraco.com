<div align="center">

<a href="https://dentraco.vercel.app">
  <img src="docs/readme/banner.svg" alt="Dentraco — diş hekimi ve klinik rehberi" width="100%">
</a>

<br>

<img src="docs/readme/headline.svg" alt="Doğru diş hekimini dişinden, şikâyetinden, şehrinden ya da tedavisinden başlayarak bulun." width="80%">

<br><br>

<a href="https://dentraco.vercel.app"><img src="https://img.shields.io/badge/Canlı_demo-dentraco.vercel.app-2D4BFF?style=for-the-badge&logo=vercel&logoColor=white" alt="Canlı demo"></a>

<br><br>

<img src="https://img.shields.io/badge/Next.js-16-0F2A33?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16">
<img src="https://img.shields.io/badge/React-19-0F2A33?style=flat-square&logo=react&logoColor=8EDCC6" alt="React 19">
<img src="https://img.shields.io/badge/TypeScript-5-0F2A33?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-4-0F2A33?style=flat-square&logo=tailwindcss&logoColor=8EDCC6" alt="Tailwind CSS 4">
<img src="https://img.shields.io/badge/Motion-animasyon-0F2A33?style=flat-square&logo=framer&logoColor=white" alt="Motion">
<img src="https://img.shields.io/badge/Vitest-19_test-0F2A33?style=flat-square&logo=vitest&logoColor=8EDCC6" alt="Vitest">
<img src="https://img.shields.io/badge/Responsive-320–1920px-0F2A33?style=flat-square" alt="Responsive">

<br><br>

<sub>Okul projesi prototipi — sitedeki hastane, doktor, yorum ve iletişim bilgileri <b>kurgusaldır</b>.</sub>

</div>

<img src="docs/readme/divider.svg" width="100%" alt="">

## Nedir?

**Dentraco**, diş hekimi arayan kullanıcıların hastaneleri ve hekimleri karşılaştırabildiği bir rehber sitesidir. Kullanıcılar hekimlerin uzmanlık alanını ve özgeçmişini inceler, onaylı hasta yorumlarını okur, üye olup kendi deneyimini puanlar. Her yorum önce otomatik denetimden, sonra yönetici onayından geçer.

<table>
<tr>
<td width="25%" align="center"><h3>8</h3>ağız ve diş sağlığı merkezi</td>
<td width="25%" align="center"><h3>40</h3>ayrıntılı hekim özgeçmişi</td>
<td width="25%" align="center"><h3>200+</h3>örnek yorum</td>
<td width="25%" align="center"><h3>8</h3>kaynakçalı sağlık yazısı</td>
</tr>
</table>

<img src="docs/readme/divider.svg" width="100%" alt="">

## Öne çıkanlar

<table>
<tr>
<td width="50%" valign="top">

### 🦷 Etkileşimli diş haritası
Ana sayfada 32 dişlik, FDI numaralı bir **odontogram** var. Bir dişe ya da diş etine dokununca o bölgedeki olası şikâyetler, tedaviler ve ilgilenen uzmanlar çıkar. “Çocuk dişleri” düğmesiyle 20 süt dişine geçilir. Ok tuşlarıyla klavyeden de gezilebilir.

</td>
<td width="50%" valign="top">

### 📊 Diş rengi skalasıyla puan
Puanlar yıldız yerine diş hekimlerinin kullandığı **VITA renk skalası** sekmelerine benzeyen beş dikey çubukla gösterilir. Ortalamaya yalnızca yönetici onaylı yorumlar katılır.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 🛡️ Moderasyon
Telefon, e-posta, T.C. kimlik no ve IBAN içeren yorumlar **gönderilemez**. Hakaret, reklam ve spam otomatik **işaretlenir**. Yönetici onaylar, maskeler ya da nedeniyle reddeder.

</td>
<td width="50%" valign="top">

### ✨ Animasyonlu arayüz
Dönen kelimeli başlık, hareketli arka plan, imleci izleyen ışık, sayan rakamlar, kayan bantlar, eğilen kartlar ve kaydırdıkça dolan süreç hattı. “Hareketi azalt” ayarında hepsi kapanır.

</td>
</tr>
</table>

<img src="docs/readme/divider.svg" width="100%" alt="">

## Ekran görüntüleri

<p align="center"><img src="docs/readme/home.jpg" alt="Ana sayfa: başlık, arama ve etkileşimli diş haritası" width="100%"></p>

<table>
<tr>
<td width="50%"><img src="docs/readme/doktor.jpg" alt="Hekim profili: özgeçmiş düzeni"><p align="center"><sub>Hekim profili — özgeçmiş düzeni</sub></p></td>
<td width="50%"><img src="docs/readme/liste.jpg" alt="Doktor listesi ve filtreler"><p align="center"><sub>Uzmanlık, hastane ve puana göre filtreleme</sub></p></td>
</tr>
<tr>
<td width="50%"><img src="docs/readme/admin.jpg" alt="Yönetim paneli: yorum moderasyonu"><p align="center"><sub>Yönetim paneli — işaretli yorumlar</sub></p></td>
<td width="50%"><img src="docs/readme/mobil.jpg" alt="Telefon görünümleri"><p align="center"><sub>Telefon görünümü</sub></p></td>
</tr>
</table>

<img src="docs/readme/divider.svg" width="100%" alt="">

## Bir yorumun yolculuğu

```mermaid
flowchart LR
    A([Üye girişi]) --> B[Puan + yorum yazılır]
    B --> C{Otomatik kontrol}
    C -- Kişisel veri --> X[Gönderim engellenir]
    C -- Hakaret / reklam / spam --> D[İşaretli olarak kuyruğa]
    C -- Temiz --> E[Kuyruğa]
    D --> F{Yönetici}
    E --> F
    F -- Onay --> G([Yayında, ortalamaya katılır])
    F -- Ret + neden --> H([Kullanıcı profilinde görür])
```

<img src="docs/readme/divider.svg" width="100%" alt="">

## Sayfalar

| Sayfa | Adres | İçerik |
|---|---|---|
| Ana sayfa | `/` | Diş haritası, arama, rakamlar, tedavi bantları, öne çıkan hekimler, merkezler, rehber |
| Doktorlar | `/doktorlar` | 40 hekim; isim, uzmanlık, hastane ve puan filtresi (bağlantıyla paylaşılabilir) |
| Hekim profili | `/doktorlar/[ad-soyad]` | Eğitim, tez, deneyim, sertifika, yayın, üyelik, çalışma günleri, yorumlar; yazdırılabilir |
| Hastaneler | `/hastaneler` | 8 merkez (hepsi İstanbul Fatih'te); semt, tedavi ve puan filtresi |
| Hastane profili | `/hastaneler/[ad]` | Adres, iletişim, harita, saatler, tedaviler, hekim kadrosu, yorumlar |
| Sağlık rehberi | `/saglik-rehberi` | Çürük, kanal, diş taşı, diş eti, implant, ortodonti, hijyen, koruyucu |
| Profilim | `/profil` | Kullanıcının yorumları: onay bekliyor / yayında / reddedildi |
| Yönetim | `/admin` | Yorum kuyruğu, hastane-doktor-yazı yönetimi, kullanıcılar, demo sıfırlama |
| Proje | `/proje-hakkinda` | Kapsam, yorum ilkeleri, alan adı ve barındırma maliyeti |

Her sayfadan <kbd>Ctrl</kbd> + <kbd>K</kbd> (Mac'te <kbd>⌘</kbd> + <kbd>K</kbd>) ile arama açılır.

<img src="docs/readme/divider.svg" width="100%" alt="">

## Hızlı başlangıç

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

<details>
<summary><b>Tüm komutlar</b></summary>

| Komut | Açıklama |
|---|---|
| `pnpm dev` | Geliştirme sunucusu |
| `pnpm build` | Production derlemesi |
| `pnpm test` | Birim testleri (moderasyon, puan, Türkçe arama, veri tutarlılığı) |
| `pnpm lint` | Kod denetimi |
| `pnpm typecheck` | Tip kontrolü |
| `pnpm prompts` | `docs/GORSEL_PROMPTLARI.md` dosyasını veriden yeniden üretir |

</details>

### Demo hesapları

| Rol | E-posta | Şifre |
|---|---|---|
| Yönetici | `admin@dentraco.demo` | `Dentraco2026!` |
| İkinci yönetici | `editor@dentraco.demo` | `Dentraco2026!` |
| Kullanıcı | `kullanici@dentraco.demo` | `Demo2026!` |

> [!NOTE]
> Demo sürümde veriler tarayıcının yerel deposunda tutulur; bir cihazdaki yorum başka cihazda görünmez. Sunumda yorumu yazma ve onaylama işini aynı tarayıcıda yapın. Yönetim → Ayarlar → **Demo verilerini sıfırla** ile başa dönülür.

<img src="docs/readme/divider.svg" width="100%" alt="">

## Mimari

```mermaid
flowchart TB
    subgraph Tarayıcı
      UI[Sayfalar ve bileşenler] --> R[src/lib/repo — veri erişim katmanı]
      R --> S[(localStorage<br/>dentraco-v1)]
      UI --> M[src/lib/moderation.ts]
    end
    D[src/data — seed içerik] --> R
    R -. ileride .-> SB[(Supabase<br/>PostgreSQL + Auth + RLS)]
```

```
src/app/(site)/        herkese açık sayfalar
src/app/admin/         yönetim paneli
src/components/        odontogram, puan sekmeleri, yorumlar, filtreler, animasyonlar
src/data/              hastaneler, doktorlar, yorumlar, makaleler (kurgusal)
src/lib/repo/          veri katmanı — Supabase'e geçişte yalnızca burası değişir
src/lib/moderation.ts  otomatik yorum denetimi
docs/                  görsel prompt'ları, maliyet analizi, veritabanı şeması
supabase/schema.sql    ileriki aşama için şema ve güvenlik kuralları
```

<details>
<summary><b>Tasarım sistemi</b></summary>

| Renk | Kod | Kullanım |
|---|---|---|
| ![](https://img.shields.io/badge/-%20-EEF3F2?style=flat-square) Porselen | `#EEF3F2` | Sayfa zemini |
| ![](https://img.shields.io/badge/-%20-0F2A33?style=flat-square) Petrol mürekkebi | `#0F2A33` | Metin, koyu bölümler |
| ![](https://img.shields.io/badge/-%20-2D4BFF?style=flat-square) Polimerizasyon mavisi | `#2D4BFF` | Vurgu, düğmeler, puan |
| ![](https://img.shields.io/badge/-%20-8EDCC6?style=flat-square) Florür yeşili | `#8EDCC6` | Onaylandı |
| ![](https://img.shields.io/badge/-%20-C8435A?style=flat-square) Diş eti kırmızısı | `#C8435A` | Hata, reddedildi |

- **Yazı tipleri:** Figtree (başlık ve arayüz), Source Serif 4 (özgeçmiş ve makaleler)
- **Vurgu rengi:** Dolgu sertleştirme lambasının mavisinden esinlenildi.

</details>

<details>
<summary><b>Görseller (Gemini)</b></summary>

64 görselin tamamı için prompt, oran, çözünürlük ve dosya adı [`docs/GORSEL_PROMPTLARI.md`](docs/GORSEL_PROMPTLARI.md) dosyasındadır: 40 doktor portresi, 8 hastane dış cephesi, 8 tedavi odası ve 8 makale kapağı. Görseller eklenene kadar site otomatik yer tutucu gösterir; dosyalar `public/images/` altına konunca kod değişikliği gerekmez.

</details>

<details>
<summary><b>Maliyet</b></summary>

| Senaryo | Maliyet |
|---|---|
| Okul projesi (Vercel Hobby + `*.vercel.app`) | **0 TL** |
| `.com` alan adı | ≈ 10–11 $ / yıl |
| `.com.tr` alan adı | ≈ 450–600 TL / yıl |
| Supabase Free / Pro | 0 TL / ≈ 25 $ ay |

Fiyatlar Ekim 2026 itibarıyla yaklaşıktır. Ayrıntı ve kaynaklar: [`docs/MALIYET_VE_BARINDIRMA.md`](docs/MALIYET_VE_BARINDIRMA.md).

</details>

<img src="docs/readme/divider.svg" width="100%" alt="">

<div align="center">

**Dentraco** bir okul projesi kapsamında hazırlanmış bir prototiptir.<br>
<sub>Sitedeki hastane, doktor, yorum ve iletişim bilgileri kurgusaldır; gerçek kişi ve kurumlarla ilgisi yoktur.<br>Sağlık içerikleri yalnızca genel bilgilendirme amaçlıdır ve hekim muayenesinin yerini tutmaz.</sub>

<br><br>

<a href="https://dentraco.vercel.app"><img src="https://img.shields.io/badge/Siteyi_aç-2D4BFF?style=for-the-badge" alt="Siteyi aç"></a>

</div>
