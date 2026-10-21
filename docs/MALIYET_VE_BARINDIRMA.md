# Alan adı ve barındırma maliyet analizi

> Fiyatlar Ekim 2026 itibarıyla yaklaşık değerlerdir; kur, vergi ve kampanyalara göre değişir. Satın almadan önce sağlayıcının kendi fiyat sayfasından doğrulayın.

## Kısa sonuç

| Senaryo | Kurulum | Yıllık maliyet |
|---|---|---|
| **Okul projesi (önerilen)** | Vercel Hobby + ücretsiz `*.vercel.app` adresi, veriler tarayıcıda | **0 TL** |
| Okul projesi + özel alan adı | Vercel Hobby + `.com` (Cloudflare Registrar) | ≈ 10–11 $ |
| Gerçek veritabanıyla prototip | Vercel Hobby + Supabase Free | 0 TL (Supabase projesi 1 hafta işlemsiz kalırsa duraklar) |
| Canlı ve ticari kullanım | Vercel Pro + Supabase Pro + `.com.tr` | ≈ 45 $/ay + ≈ 450–600 TL/yıl |

## Barındırma (hosting)

| Sağlayıcı | Plan | Fiyat | Notlar |
|---|---|---|---|
| Vercel | Hobby | Ücretsiz | Yalnızca kişisel ve ticari olmayan kullanım. Next.js ile sıfır yapılandırma, otomatik HTTPS, her commit için önizleme adresi. Aylık yaklaşık 100 GB veri aktarımı ve 1 milyon istek sınırı (kaynaklar arasında hesaplama sınırları farklı verilmiş). |
| Vercel | Pro | 20 $/kullanıcı/ay | Ticari kullanım için gerekli; ≈ 1 TB veri aktarımı, aşımlar kullanım başına faturalanır. |
| Netlify | Free | Ücretsiz | Next.js desteği var; App Router özelliklerinde Vercel kadar doğrudan değil. |
| Cloudflare Pages / Workers | Free | Ücretsiz | Next.js için OpenNext adaptörü gerekir; kurulum daha teknik. |

**Seçim:** Vercel Hobby. Proje Next.js ile yazıldığı için ek ayar gerektirmez ve okul projesi “ticari olmayan kullanım” şartını karşılar.

## Alan adı

| Uzantı | Nereden | Yaklaşık fiyat | Notlar |
|---|---|---|---|
| `.com` | Cloudflare Registrar | ≈ 10,5 $/yıl | Maliyetine satış, yenileme fiyatı aynı. DNS ücretsiz. |
| `.com` | Diğer uluslararası firmalar | 10–20 $/yıl | İlk yıl kampanyalı, yenileme daha pahalı olabilir. |
| `.com.tr` | TRABİS'e kayıtlı yerli kayıt kuruluşları | ≈ 450–600 TL/yıl | 2022'den beri belge şartı yok (TRABİS). Firmalar arası fiyat farkı büyük; ilk yıl ve yenileme ücretini ayrı kontrol edin. |
| `.tr` | Yerli kayıt kuruluşları | Firmaya göre değişir | Daha kısa ama daha az bilinen uzantı. |

Alan adı Vercel'e bağlanırken yalnızca DNS'te bir `A` ya da `CNAME` kaydı eklenir; SSL sertifikası Vercel tarafından ücretsiz verilir.

## Veritabanı ve kimlik doğrulama (ileriki aşama)

| Sağlayıcı | Plan | Fiyat | Notlar |
|---|---|---|---|
| Supabase | Free | Ücretsiz | 2 proje, 500 MB veritabanı, 50.000 aylık aktif kullanıcı. 1 hafta işlem olmazsa proje duraklatılır. |
| Supabase | Pro | 25 $/ay | Duraklama yok, 8 GB veritabanı, günlük yedek. |

Supabase; PostgreSQL veritabanı, e-posta/şifre ile giriş ve satır düzeyi güvenlik (RLS) sağladığı için bu projenin üyelik, yorum onayı ve yönetici rolleri ihtiyacını tek başına karşılar. Geçiş planı için bkz. `VERITABANI_SEMASI.md`.

## Kaynaklar

- Vercel Hobby planı: https://vercel.com/docs/plans/hobby
- Vercel fiyatları (2026, üçüncü taraf özet): https://dev.to/nayankyada/vercel-pricing-2026-what-you-actually-pay-for-a-real-nextjs-project-33md
- Supabase fiyatları (2026, üçüncü taraf özet): https://makerkit.dev/blog/saas/supabase-pricing
- Cloudflare .com fiyatı takibi: https://domainoffer.net/tld/com/cloudflare
- .com.tr fiyat aralığı (2026): https://www.karekod.org/blog/?p=16404
