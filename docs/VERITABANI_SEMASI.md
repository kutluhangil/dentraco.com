# Veritabanı şeması ve Supabase geçiş planı

Prototip şu an verileri tarayıcıda (`localStorage`, anahtar `dentraco-v1`) tutar. Arayüz bileşenleri veriye yalnızca `src/lib/repo/` üzerinden eriştiği için gerçek bir arka uca geçiş bu klasörle sınırlıdır. Uygulanması gereken sözleşme `src/lib/repo/contract.ts` dosyasındadır.

## Tablolar

| Tablo | Amaç | Önemli alanlar |
|---|---|---|
| `profiles` | Supabase `auth.users` ile 1-1 kullanıcı profili | `id` (auth uid), `name`, `role` (`user` / `admin`), `suspended` |
| `hospitals` | Hastane ve klinikler | `slug`, `name`, `type`, `city`, `district`, `neighborhood` (semt), `address`, `phone`, `treatments text[]`, `hours jsonb` |
| `doctors` | Hekim profilleri | `slug`, `hospital_id`, `title`, `specialty`, `graduation_year`, `about text[]`, `education jsonb`, `experience jsonb`, `certificates jsonb` |
| `reviews` | Yorumlar | `target_type`, `target_id`, `user_id`, `rating 1–5`, `title`, `body`, `status`, `flags jsonb`, `reject_reason`, `is_sample` |
| `articles` | Sağlık yazıları | `slug`, `title`, `summary`, `body` (markdown), `reviewer_id`, `published`, `sources jsonb` |

Ortalama puanlar bir görünümden (`rating_summaries`) yalnızca `status = 'published'` yorumlar üzerinden hesaplanır.

## Güvenlik kuralları (RLS)

- Herkes: yayımlanmış yorumları, hastaneleri, hekimleri ve yayımlanmış yazıları okuyabilir.
- Giriş yapmış kullanıcı: yalnızca kendi adına, `status = 'pending'` olarak yorum ekleyebilir; kendi yorumlarını (her durumda) okuyabilir.
- Yönetici (`profiles.role = 'admin'`): tüm tablolarda ekleme, güncelleme, silme ve yorum onayı.
- Moderasyon kontrolü (kişisel veri engeli) sunucuda da tekrarlanmalıdır: `src/lib/moderation.ts` bir Edge Function'a ya da bir veritabanı tetikleyicisine taşınabilir.

## Geçiş adımları

1. Supabase'de proje oluşturun, `supabase/schema.sql` dosyasını SQL editöründe çalıştırın.
2. Seed verisini aktarın (`src/data/*` dosyalarından JSON üretip `insert` ile).
3. `src/lib/repo/` altına `contract.ts` sözleşmesini uygulayan bir `supabase.ts` yazın; okuma kancalarını (`useDoctors`, `useSummaries` …) bu kaynağa bağlayın.
4. Vercel'de `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` ortam değişkenlerini tanımlayın.
5. Demo hesaplarını ve “Demo verilerini sıfırla” ayarını kaldırın.
