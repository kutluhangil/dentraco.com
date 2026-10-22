# Dentraco — Proje notları

**Canlı site:** https://dentraco.vercel.app

Bu dosya, projeye sonradan katılan ya da sunumu hazırlayan arkadaşlar için yazıldı. Projenin ne olduğunu, nasıl çalıştırılacağını, neyin nerede durduğunu ve bilinmesi gerekenleri tek yerde toplar.

---

## 1. Proje nedir?

Dentraco, diş hekimi arayan kullanıcıların hastaneleri ve hekimleri inceleyebildiği, uzmanlık alanlarını ve özgeçmişlerini görebildiği, diğer kullanıcıların yorumlarını okuyup puan verebildiği bir **okul projesi prototipidir**.

- Site yalnızca Türkçedir.
- Tüm hastane, doktor, yorum ve iletişim bilgileri **kurgusaldır**. Bu durum her sayfanın altındaki footer'da, profillerdeki "Kurgusal profil" rozetinde ve yorumlardaki "Örnek yorum" etiketinde açıkça belirtilir.
- Doktorların eğitim bilgilerinde gerçek diş hekimliği fakültelerinin adları geçer; kişiler, hastaneler, yayın başlıkları ve telefonlar kurgusaldır.

## 2. Nasıl çalıştırılır?

Gereken: Node.js 20 veya üstü ve pnpm.

```bash
pnpm install      # bağımlılıkları kur
pnpm dev          # http://localhost:3000 adresinde açılır
pnpm test         # birim testleri
pnpm lint         # kod denetimi
pnpm build        # production derlemesi
pnpm prompts      # görsel prompt dosyasını veriden yeniden üretir
```

## 3. Demo hesapları

Giriş sayfasındaki "Demo hesaplar" kutusundan tek tıkla doldurulabilir.

| Rol | E-posta | Şifre |
|---|---|---|
| Yönetici | `admin@dentraco.demo` | `Dentraco2026!` |
| İkinci yönetici | `editor@dentraco.demo` | `Dentraco2026!` |
| Kullanıcı | `kullanici@dentraco.demo` | `Demo2026!` |

Yeni üye kaydı da açıktır.

## 4. Sitede neler var?

### Herkese açık sayfalar

| Sayfa | Adres | İçerik |
|---|---|---|
| Ana sayfa | `/` | Etkileşimli diş haritası, arama, rakamlar, kayan tedavi bandı, öne çıkan hekimler, merkezler, rehber, yorum yayın süreci |
| Doktorlar | `/doktorlar` | 40 hekim; isim, uzmanlık, hastane ve en düşük puana göre filtre |
| Doktor profili | `/doktorlar/[ad-soyad]` | Özgeçmiş: eğitim, tez, deneyim, sertifikalar, yayınlar, üyelikler, diller, çalışma günleri, yorumlar. Yazdırılabilir. |
| Hastaneler | `/hastaneler` | 8 merkez (hepsi İstanbul Fatih'te); semt, tedavi ve puana göre filtre |
| Hastane profili | `/hastaneler/[ad]` | Adres, iletişim, harita, çalışma saatleri, tedaviler, hekim kadrosu, yorumlar |
| Sağlık rehberi | `/saglik-rehberi` | 8 kaynakçalı yazı: diş çürükleri, kanal tedavisi, diş taşı, diş eti hastalıkları, implant, ortodonti, ağız hijyeni, koruyucu diş hekimliği |
| Giriş / Üye ol | `/giris`, `/kayit` | Demo hesaplar giriş sayfasında |
| Profilim | `/profil` | Kullanıcının yorumları ve durumları (onay bekliyor / yayında / reddedildi + neden) |
| Proje hakkında | `/proje-hakkinda` | Kapsam, yorum ilkeleri, teknik altyapı, alan adı ve barındırma maliyet tablosu |

Her sayfadan **Ctrl+K** (Mac'te **⌘K**) ile arama penceresi açılır.

### Yönetim paneli (`/admin`, yalnızca yönetici)

- **Genel bakış:** sayılar, bekleyen yorumlar, puan dağılımı, son işlemler
- **Yorumlar:** bekleyen / onaylanan / reddedilen sekmeleri; otomatik işaretlenen kısımlar kırmızıyla vurgulanır; onayla, düzenle-maskele, nedenle reddet, sil, toplu işlem
- **Hastaneler, Doktorlar, Sağlık yazıları:** ekle, düzenle, sil (yazılarda markdown editörü ve önizleme)
- **Kullanıcılar:** yönetici yap / üye yap, askıya al
- **Ayarlar:** "Demo verilerini sıfırla"

## 5. Yorum ve moderasyon kuralları

1. Yorum yazmak için giriş gerekir. Bir kullanıcı aynı hekime ya da merkeze yalnızca bir yorum yazabilir.
2. Puan 1–5 arasıdır. Başlık en az 4, metin 30–1000 karakter olmalıdır.
3. Gönderimden önce otomatik kontrol yapılır:
   - **Engellenir:** telefon numarası, e-posta, T.C. kimlik numarası (sağlama hanesiyle doğrulanır), IBAN. Kullanıcıya neyi kaldırması gerektiği gösterilir.
   - **İşaretlenir:** hakaret (harf tekrarı ve "s.a.l.a.k" gibi ayrık yazımlar dahil), reklam (bağlantı, kampanya ifadesi, sosyal medya hesabı), spam (tamamı büyük harf, tekrarlanan karakter, aynı içeriğin tekrar gönderilmesi).
4. Her yorum "onay bekliyor" durumunda başlar. Yönetici onaylamadan yayımlanmaz.
5. Ortalama puana **yalnızca onaylanmış** yorumlar katılır.
6. Hazır örnek yorumların hepsi "Örnek yorum" etiketiyle gösterilir.

## 6. Tasarım kararları

- **Fikir:** Sitenin kimliği diş hekimliğine ait iki nesneden gelir:
  - **Odontogram:** FDI numaralı diş haritası. Ana sayfada bir dişe tıklayınca olası şikâyetler, tedaviler ve ilgili uzmanlar çıkar. "Çocuk dişleri" düğmesiyle 20 süt dişine geçilir. Klavyeyle ok tuşları kullanılarak da gezilebilir.
  - **VITA renk skalası sekmeleri:** Puanlar yıldız yerine diş rengi skalasındaki sekmelere benzeyen 5 dikey çubukla gösterilir.
- **Renkler:**

  | Renk | Kod | Kullanım |
  |---|---|---|
  | Porselen | `#EEF3F2` | Sayfa zemini |
  | Petrol mürekkebi | `#0F2A33` | Metin, koyu bölümler |
  | Polimerizasyon mavisi | `#2D4BFF` | Vurgu, düğmeler, puan dolgusu |
  | Florür yeşili | `#8EDCC6` | Onaylandı / yayında |
  | Diş eti kırmızısı | `#C8435A` | Hata, reddedildi |

  Vurgu rengi, kliniklerde dolgu sertleştirmede kullanılan lambanın mavisinden esinlendi.
- **Yazı tipleri:**
  - **Figtree:** başlıklar ve arayüz. Temiz, güven veren ve Türkçe karakterleri tam destekler.
  - **Source Serif 4:** özgeçmiş ve makale metinleri gibi uzun okumalar.
- **Ana sayfa animasyonları:**
  - Sayfanın üstünde kaydırma ilerleme çizgisi
  - Hero arka planında yavaş süzülen renk lekeleri, nokta ızgarası ve imleci izleyen mavi ışık
  - Başlığın kelime kelime açılması; "dişinden / şikâyetinden / semtinden / tedavisinden" diye dönen kelime
  - Diş haritasında dişlerin sırayla belirmesi ve arkın üzerinden geçen mavi ışık taraması
  - Görünüme girince 0'dan sayan rakamlar
  - Ters yönlerde akan tedavi ve uzmanlık bantları (üzerine gelince durur)
  - Fareyle hafifçe eğilen ve parlayan doktor kartları
  - Hastane kartlarının maske açılımıyla gelmesi, üzerine gelince görselin yakınlaşması
  - "Bir yorum nasıl yayımlanır?" bölümünde kaydırdıkça dolan hat ve sırayla yanan adımlar
- İşletim sisteminde "hareketi azalt" açıksa otomatik animasyonların tamamı kapanır.
- **Responsive:** 320 px'lik küçük telefonlardan 1920 px'lik ekranlara kadar yatay kaydırma olmadan çalışır. Mobilde filtreler alttan açılan bir panelde, diş haritası çeyrek sekmeleriyle kullanılır.

## 7. Teknik yapı

| Teknoloji | Ne için |
|---|---|
| Next.js 16 (App Router) + React 19 | Sayfalar statik olarak üretilir, hızlı açılır |
| TypeScript | Hastane, doktor, yorum ve yazı veri modelleri tiplidir |
| Tailwind CSS 4 | Renk, yazı ve boşluk değerleri `src/app/globals.css` içinde |
| Motion | Animasyonlar |
| Zustand | Demo veri katmanı (tarayıcıda saklama) |
| Zod | Form doğrulama |
| Fuse.js | Hatalı yazıma dayanıklı arama |
| Vitest + Playwright | Birim testleri ve tarayıcı testleri |

### Klasörler

```
src/app/(site)/        herkese açık sayfalar
src/app/admin/         yönetim paneli
src/components/        arayüz bileşenleri (odontogram, puan sekmeleri, yorumlar, filtreler, ana sayfa animasyonları)
src/data/              seed içerik: hastaneler, doktorlar (hastane başına bir dosya), yorumlar, makaleler, kullanıcılar
src/lib/repo/          veri erişim katmanı
src/lib/moderation.ts  otomatik yorum denetimi
docs/                  görsel prompt'ları, maliyet analizi, veritabanı şeması
supabase/schema.sql    ileriki aşama için önerilen veritabanı şeması
scripts/               görsel prompt dosyasını üreten betik
```

### Veriler nerede saklanıyor? (önemli)

Prototip sunucu ya da veritabanı kullanmaz. İçerik kodla birlikte gelir; kayıtlar, yorumlar ve yönetici değişiklikleri **tarayıcının yerel deposunda** (`localStorage`, anahtar `dentraco-v1`) tutulur.

- Bir bilgisayarda yazılan yorum, başka bir bilgisayardan giren yöneticiye görünmez.
- **Sunumda yorumu yazma ve onaylama işini aynı tarayıcıda yapın.**
- Her şeyi başa almak için: Yönetim paneli → Ayarlar → **Demo verilerini sıfırla**.
- Gerçek kullanıma geçmek için Supabase planı hazır: `docs/VERITABANI_SEMASI.md` ve `supabase/schema.sql`. Arayüz veriye tek bir katmandan (`src/lib/repo/`) eriştiği için geçiş bu klasörle sınırlıdır.

## 8. Görseller (Gemini)

- Tüm prompt'lar `docs/GORSEL_PROMPTLARI.md` dosyasındadır. Her görsel için dosya yolu, sitede kullanıldığı yer, oran, çözünürlük, prompt, kaçınılacaklar listesi ve alt metin yazılıdır.
- **Toplam 64 görsel:**

  | Grup | Adet | Oran | Klasör |
  |---|---|---|---|
  | Doktor portreleri | 40 | 4:5 | `public/images/doktorlar/` |
  | Hastane dış cephe | 8 | 16:9 | `public/images/hastaneler/` |
  | Tedavi odası | 8 | 4:3 | `public/images/hastaneler/` |
  | Makale kapakları | 8 | 16:9 | `public/images/rehber/` |

- Gemini çıktısını PNG indirin, WebP'ye çevirin (`cwebp -q 82 ...`) ve **tablodaki dosya adıyla birebir** kaydedin.
- 64 görselin tamamı üretildi ve eklendi. Bir görsel eksik olursa (ör. admin panelinden yeni hekim eklenince) site otomatik yer tutucu (baş harfler, diş silüeti, ark deseni) gösterir; dosya eklenince kod değişikliği gerekmez.
- Paylaşım görseli (OG) ve site ikonu kodla üretilir, Gemini gerekmez.
- Admin panelinden doktor ekleyip prompt dosyasını güncellemek isterseniz `pnpm prompts` komutunu çalıştırın. Betik yalnızca koddaki seed veriyi okur; tarayıcıda eklenen kayıtları görmez.

## 9. Neler test edildi?

- Lint ve tip kontrolü hatasız; 23 birim testi geçiyor (moderasyon, puan hesabı, Türkçe arama, seed verinin tutarlılığı, güvenli yönlendirme ve link kontrolü).
- Production build 80 sayfayı hatasız üretiyor (`sitemap.xml` ve `robots.txt` dahil).
- `pnpm audit`: bilinen güvenlik açığı yok.
- Güvenlik başlıkları: Content-Security-Policy, X-Frame-Options, HSTS, Referrer-Policy ve Permissions-Policy her sayfada gönderiliyor. Tarayıcı testinde CSP hiçbir şeyi engellemedi; OpenStreetMap haritası çalışıyor.
- Giriş sayfasındaki `?next=` adresi yalnızca site içi yolları kabul ediyor; `//site.com` ya da `/\site.com` gibi dışarı yönlendirme denemeleri yok sayılıyor.
- Admin'in girdiği kaynak linkleri yalnızca `http(s)` ise link oluyor; `javascript:` gibi adresler düz metin kalıyor.
- Responsive kontrolü: 320, 360, 390, 414, 768, 1024, 1280, 1440 ve 1920 px genişliklerde tüm sayfalarda yatay taşma yok.
- Tarayıcıda uçtan uca akış:
  1. Kayıt
  2. Kişisel veri içeren yorumun engellenmesi
  3. Yorum gönderme
  4. Profilde "Onay bekliyor"
  5. Yönetici onayı
  6. Yorumun profilde yayımlanması
  7. Admin'den doktor ekleme
  8. Demo sıfırlama
- Konsolda hata yok.
- Klavyeyle diş haritası gezinmesi, mobil filtre paneli ve "hareketi azalt" modu kontrol edildi.

## 10. Maliyet özeti

| Senaryo | Maliyet |
|---|---|
| Okul projesi (Vercel Hobby + ücretsiz `*.vercel.app` adresi) | **0 TL** |
| `.com` alan adı (Cloudflare Registrar) | ≈ 10–11 $ / yıl |
| `.com.tr` alan adı (yerli kayıt kuruluşları) | ≈ 450–600 TL / yıl |
| Gerçek veritabanı (Supabase Free / Pro) | 0 TL / ≈ 25 $ ay |
| Ticari kullanım (Vercel Pro) | ≈ 20 $ / ay / kullanıcı |

Fiyatlar Ekim 2026 itibarıyla yaklaşıktır. Bir kısmı üçüncü taraf kaynaklardan derlenmiştir; satın almadan önce sağlayıcının kendi sayfasından doğrulayın. Ayrıntı ve kaynaklar: `docs/MALIYET_VE_BARINDIRMA.md`.

## 11. Sıradaki adımlar

1. Gemini ile görsellerin üretilip `public/images/` altına eklenmesi
2. İsteğe bağlı: Supabase ile gerçek üyelik ve veritabanına geçiş

Site Vercel'de (Hobby planı, ücretsiz) yayında. GitHub reposu Vercel'e bağlı olduğu için `main` dalına yapılan her push otomatik olarak yeniden yayımlanır.
