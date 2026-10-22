# Dentraco — Görsel üretim rehberi (Gemini)

> Bu dosya `pnpm prompts` komutuyla seed veriden otomatik üretilir. Elle düzenlemek yerine `scripts/gorsel-promptlari.ts` dosyasını güncelleyin.

Sitedeki tüm görseller aynı görsel dili paylaşmalı: soğuk porselen zemin, petrol mürekkebi gölgeler, fildişi diş tonları ve **tek bir** elektrik mavisi ayrıntı.
Görseller henüz eklenmediğinde site otomatik yer tutucu gösterir; aşağıdaki dosya adlarıyla `public/` altına koyduğunuzda kod değişikliği gerekmeden görünürler.

## Nasıl kullanılır

1. Gemini'de görsel üretim modunu açın (Gemini uygulaması ya da Google AI Studio, görüntü üretim modeli).
2. Her görsel için **Ortak stil bloğu + görsele özel prompt**'u birlikte yapıştırın. Negatif listeyi "Avoid:" diye sona ekleyin.
3. En-boy oranını prompt'taki değere ayarlayın (AI Studio'da *Aspect ratio* seçeneği; Gemini uygulamasında prompt içinde belirtilmiştir).
4. Çıktıyı PNG olarak indirin, belirtilen boyuta kırpın/ölçekleyin ve WebP'ye dönüştürün:

```bash
# Bir kez: brew install webp   (ya da: npx @squoosh/cli)
cwebp -q 82 -resize 1200 1500 girdi.png -o public/images/doktorlar/elif-arslan.webp
```

5. Dosyayı tablodaki yola tam adıyla kaydedin. Büyük/küçük harf ve Türkçe karakter kullanmayın.
6. Aynı hastanenin doktorlarını art arda üretin; Gemini'ye "aynı stüdyo ışığı ve fonla devam et" diyerek tutarlılığı artırın.

## Ortak stil bloğu (her prompt'un başına)

```text
Visual style: editorial clinical photography, calm and trustworthy, never stock-photo cheesy.
Palette: cool porcelain grey-green (#EEF3F2) and white surfaces, deep petrol ink (#0F2A33) for darks and shadows,
warm ivory tooth-shade accents (#F3EAD7, #EBDDBF), exactly one small electric "curing-light" blue (#2D4BFF) detail.
Light: soft diffused daylight, gentle contrast, no harsh specular highlights. Color grade: cool neutral, slightly desaturated, clean whites.
Camera: full-frame look, natural perspective, shallow depth of field where noted. Realistic textures.
```

## Negatif liste (her prompt'un sonuna)

```text
Avoid: text, letters, logos, watermarks, readable signage, brand names, oversaturated colors, teal-and-orange grade,
plastic or airbrushed skin, uncanny teeth, exaggerated smile, braces on adults unless stated, blood, open mouths, intraoral close-ups,
medical gore, celebrity likeness, extra fingers, distorted hands, duplicated objects, fisheye distortion, vignette, HDR halos
```

## Özet

| Grup | Adet | Oran | Üretim | Sitede kullanılan boyut | Klasör |
|---|---|---|---|---|---|
| Doktor portreleri | 40 | 4:5 | 1536×1920 | 1200×1500 WebP | `public/images/doktorlar/` |
| Hastane dış cephe | 8 | 16:9 | 1920×1080 | 1920×1080 WebP | `public/images/hastaneler/` |
| Hastane tedavi odası | 8 | 4:3 | 1600×1200 | 1600×1200 WebP | `public/images/hastaneler/` |
| Rehber kapakları | 8 | 16:9 | 1920×1080 | 1600×900 WebP | `public/images/rehber/` |

Sosyal medya paylaşım görseli (OG) kodla üretilir; Gemini gerekmez.

## 1. Doktor portreleri

**Kurgu:** Aynı stüdyo, aynı fon, aynı ışık. Omuz hizası kadraj, kamera göz hizasında, yüz kadrajın üst üçte birinde. Her hastanenin forması farklı renktedir; böylece aynı ekipten hekimler sayfada bir arada tutarlı görünür. Kişiler kurgusaldır, gerçek bir kişiye benzememelidir.

**Sitede nerede:** doktor kartları (ana sayfa, listeler; ~280 px), profil sol sütunu (340 px), liste satırları (88 px küçük resim), makale "uzman görüşü" kutusu (56 px). Yüz merkezde kalmalı ki küçük kırpmalarda da okunur olsun.

### Mine Ağız ve Diş Sağlığı Merkezi — Samatya, Fatih

Forma: derin petrol mavisi (deep petrol blue) scrubs

#### Dt. Elif Arslan — Genel Diş Hekimliği

- **Dosya:** `public/images/doktorlar/elif-arslan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dt. Elif Arslan temsili portresi

```text
Editorial studio headshot of a fictional 36-year-old Turkish woman, shoulder-length straight dark brown hair tucked behind ears, warm calm expression, no glasses, working as a dentist. Wearing deep petrol blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Can Yıldırım — Endodonti

- **Dosya:** `public/images/doktorlar/can-yildirim.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Can Yıldırım temsili portresi

```text
Editorial studio headshot of a fictional 40-year-old Turkish man, short neatly trimmed black hair, light stubble beard, thin black rectangular glasses, focused friendly look, working as a dentist. Wearing deep petrol blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dr. Dt. Zeynep Kaya — Ortodonti

- **Dosya:** `public/images/doktorlar/zeynep-kaya.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dr. Dt. Zeynep Kaya temsili portresi

```text
Editorial studio headshot of a fictional 42-year-old Turkish woman, chestnut brown hair in a low bun, small gold stud earrings, confident gentle smile, no glasses, working as a dentist. Wearing deep petrol blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Mert Demirtaş — Periodontoloji

- **Dosya:** `public/images/doktorlar/mert-demirtas.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Mert Demirtaş temsili portresi

```text
Editorial studio headshot of a fictional 38-year-old Turkish man, short wavy dark brown hair, clean-shaven, relaxed open expression, no glasses, working as a dentist. Wearing deep petrol blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Selin Aydoğan — Restoratif Diş Tedavisi

- **Dosya:** `public/images/doktorlar/selin-aydogan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Selin Aydoğan temsili portresi

```text
Editorial studio headshot of a fictional 35-year-old Turkish woman, long wavy black hair worn loose over one shoulder, light makeup, bright attentive expression, no glasses, working as a dentist. Wearing deep petrol blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Dentaris Boğaziçi Diş Hastanesi — Sirkeci, Fatih

Forma: kömür grisi (charcoal grey) scrubs

#### Prof. Dr. Haluk Erdem — Ağız, Diş ve Çene Cerrahisi

- **Dosya:** `public/images/doktorlar/haluk-erdem.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Prof. Dr. Haluk Erdem temsili portresi

```text
Editorial studio headshot of a fictional 60-year-old Turkish man, short silver-grey hair, neatly trimmed grey moustache, frameless reading glasses, composed authoritative but kind expression, working as a dentist. Wearing charcoal grey scrubs under an open crisp white lab coat, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Doç. Dr. Nermin Şahin — Protetik Diş Tedavisi

- **Dosya:** `public/images/doktorlar/nermin-sahin.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Doç. Dr. Nermin Şahin temsili portresi

```text
Editorial studio headshot of a fictional 51-year-old Turkish woman, short layered auburn-tinted hair, tortoiseshell glasses, warm professional expression, working as a dentist. Wearing charcoal grey scrubs under an open crisp white lab coat, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Barış Öztürk — Ortodonti

- **Dosya:** `public/images/doktorlar/baris-ozturk.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Barış Öztürk temsili portresi

```text
Editorial studio headshot of a fictional 39-year-old Turkish man, short dark hair with a side part, well-groomed short beard, calm assured expression, no glasses, working as a dentist. Wearing charcoal grey scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dr. Öğr. Üyesi Deniz Korkmaz — Ağız, Diş ve Çene Radyolojisi

- **Dosya:** `public/images/doktorlar/deniz-korkmaz.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dr. Öğr. Üyesi Deniz Korkmaz temsili portresi

```text
Editorial studio headshot of a fictional 43-year-old Turkish woman, straight black bob haircut, minimal round silver glasses, thoughtful composed expression, working as a dentist. Wearing charcoal grey scrubs under an open crisp white lab coat, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Ece Yalçın — Pedodonti

- **Dosya:** `public/images/doktorlar/ece-yalcin.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Ece Yalçın temsili portresi

```text
Editorial studio headshot of a fictional 37-year-old Turkish woman, light brown hair in a high ponytail, playful warm smile, small hoop earrings, no glasses, working as a dentist. Wearing charcoal grey scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Kökyapı Diş Kliniği — Çapa, Fatih

Forma: toprak yeşili (muted sage green) scrubs

#### Dr. Dt. Kerem Aksoy — Endodonti

- **Dosya:** `public/images/doktorlar/kerem-aksoy.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dr. Dt. Kerem Aksoy temsili portresi

```text
Editorial studio headshot of a fictional 46-year-old Turkish man, short salt-and-pepper hair, clean-shaven, black round acetate glasses, calm serious expression with a slight smile, working as a dentist. Wearing muted sage green scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. İrem Çelik — Endodonti

- **Dosya:** `public/images/doktorlar/irem-celik.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. İrem Çelik temsili portresi

```text
Editorial studio headshot of a fictional 36-year-old Turkish woman, dark brown hair in a neat braid over shoulder, fair skin, round gold-rim glasses, gentle concentrated expression, working as a dentist. Wearing muted sage green scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Onur Taşkın — Restoratif Diş Tedavisi

- **Dosya:** `public/images/doktorlar/onur-taskin.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Onur Taşkın temsili portresi

```text
Editorial studio headshot of a fictional 39-year-old Turkish man, short curly dark hair, full but neat short beard, friendly approachable smile, no glasses, working as a dentist. Wearing muted sage green scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dt. Ayşe Nur Bulut — Genel Diş Hekimliği

- **Dosya:** `public/images/doktorlar/ayse-nur-bulut.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dt. Ayşe Nur Bulut temsili portresi

```text
Editorial studio headshot of a fictional 32-year-old Turkish woman wearing a neatly wrapped light grey hijab, soft round face, kind smile, no glasses, working as a dentist. Wearing muted sage green scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Serkan Ateş — Protetik Diş Tedavisi

- **Dosya:** `public/images/doktorlar/serkan-ates.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Serkan Ateş temsili portresi

```text
Editorial studio headshot of a fictional 44-year-old Turkish man, short receding dark hair, trimmed goatee, steady reassuring expression, no glasses, working as a dentist. Wearing muted sage green scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Körfez Gülüş Ağız ve Diş Sağlığı Merkezi — Balat, Fatih

Forma: açık deniz mavisi (soft sea blue) scrubs

#### Uzm. Dt. Melis Ergün — Ortodonti

- **Dosya:** `public/images/doktorlar/melis-ergun.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Melis Ergün temsili portresi

```text
Editorial studio headshot of a fictional 41-year-old Turkish woman, honey-blonde highlighted shoulder-length hair, warm tanned complexion, cheerful confident smile, no glasses, working as a dentist. Wearing soft sea blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Pınar Koç — Pedodonti

- **Dosya:** `public/images/doktorlar/pinar-koc.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Pınar Koç temsili portresi

```text
Editorial studio headshot of a fictional 38-year-old Turkish woman, curly dark brown hair tied back with a few loose curls, freckles, big friendly smile, no glasses, working as a dentist. Wearing soft sea blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dr. Dt. Tolga Sevim — Periodontoloji

- **Dosya:** `public/images/doktorlar/tolga-sevim.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dr. Dt. Tolga Sevim temsili portresi

```text
Editorial studio headshot of a fictional 47-year-old Turkish man, short greying dark hair, short grey-flecked beard, rimless glasses, calm thoughtful expression, working as a dentist. Wearing soft sea blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dt. Burak Gündoğdu — Genel Diş Hekimliği

- **Dosya:** `public/images/doktorlar/burak-gundogdu.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dt. Burak Gündoğdu temsili portresi

```text
Editorial studio headshot of a fictional 34-year-old Turkish man, short dark brown hair with a slight quiff, clean-shaven, easygoing friendly smile, no glasses, working as a dentist. Wearing soft sea blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Gizem Tunç — Restoratif Diş Tedavisi

- **Dosya:** `public/images/doktorlar/gizem-tunc.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Gizem Tunç temsili portresi

```text
Editorial studio headshot of a fictional 36-year-old Turkish woman, sleek straight dark hair in a low ponytail, olive skin, slim black cat-eye glasses, poised friendly look, working as a dentist. Wearing soft sea blue scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Nilüfer Kavis Diş Polikliniği — Topkapı, Fatih

Forma: lacivert (navy) scrubs

#### Uzm. Dt. Cem Karahan — Protetik Diş Tedavisi

- **Dosya:** `public/images/doktorlar/cem-karahan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Cem Karahan temsili portresi

```text
Editorial studio headshot of a fictional 43-year-old Turkish man, short dark hair slightly greying at the temples, clean-shaven, square jaw, confident warm expression, no glasses, working as a dentist. Wearing navy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Emre Kılıç — Ağız, Diş ve Çene Cerrahisi

- **Dosya:** `public/images/doktorlar/emre-kilic.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Emre Kılıç temsili portresi

```text
Editorial studio headshot of a fictional 41-year-old Turkish man, buzz-cut dark hair, dark stubble, athletic build, focused direct gaze with a slight smile, no glasses, working as a dentist. Wearing navy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Hande Özkan — Endodonti

- **Dosya:** `public/images/doktorlar/hande-ozkan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Hande Özkan temsili portresi

```text
Editorial studio headshot of a fictional 37-year-old Turkish woman, wavy auburn hair cut at shoulder length, fair skin, soft green eyes, gentle reassuring smile, no glasses, working as a dentist. Wearing navy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dt. Oğuz Yavuz — Genel Diş Hekimliği

- **Dosya:** `public/images/doktorlar/oguz-yavuz.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dt. Oğuz Yavuz temsili portresi

```text
Editorial studio headshot of a fictional 33-year-old Turkish man, medium-length dark wavy hair pushed back, short trimmed beard, relaxed friendly smile, no glasses, working as a dentist. Wearing navy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Aslı Polat — Ortodonti

- **Dosya:** `public/images/doktorlar/asli-polat.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Aslı Polat temsili portresi

```text
Editorial studio headshot of a fictional 38-year-old Turkish woman, dark brown hair in a sleek bob with side-swept bangs, minimal makeup, poised friendly expression, no glasses, working as a dentist. Wearing navy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Lara Mavi Kıyı Diş Hastanesi — Yenikapı, Fatih

Forma: beyaz önlük ve açık turkuaz (white coat over pale turquoise) scrubs

#### Doç. Dr. Volkan Turan — Ağız, Diş ve Çene Cerrahisi

- **Dosya:** `public/images/doktorlar/volkan-turan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Doç. Dr. Volkan Turan temsili portresi

```text
Editorial studio headshot of a fictional 49-year-old Turkish man, short dark hair greying at the sides, light tan, neatly trimmed short grey beard, calm assured expression, no glasses, working as a dentist. Wearing white coat over pale turquoise scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Sibel Avcı — Protetik Diş Tedavisi

- **Dosya:** `public/images/doktorlar/sibel-avci.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Sibel Avcı temsili portresi

```text
Editorial studio headshot of a fictional 42-year-old Turkish woman, long straight light-brown hair with soft layers, light olive skin, elegant composed smile, no glasses, working as a dentist. Wearing white coat over pale turquoise scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Arda Yücel — Restoratif Diş Tedavisi

- **Dosya:** `public/images/doktorlar/arda-yucel.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Arda Yücel temsili portresi

```text
Editorial studio headshot of a fictional 37-year-old Turkish man, styled short dark-blond hair, light tan, clean-shaven, bright open smile, no glasses, working as a dentist. Wearing white coat over pale turquoise scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Neslihan Doğan — Periodontoloji

- **Dosya:** `public/images/doktorlar/neslihan-dogan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Neslihan Doğan temsili portresi

```text
Editorial studio headshot of a fictional 40-year-old Turkish woman, dark curly hair in a loose half-up style, warm brown eyes, kind attentive expression, thin gold-frame glasses, working as a dentist. Wearing white coat over pale turquoise scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Dr. Dt. Koray Ekinci — Ağız, Diş ve Çene Radyolojisi

- **Dosya:** `public/images/doktorlar/koray-ekinci.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dr. Dt. Koray Ekinci temsili portresi

```text
Editorial studio headshot of a fictional 41-year-old Turkish man, short neat black hair, clean-shaven, black thin-rimmed rectangular glasses, steady analytical expression with a polite smile, working as a dentist. Wearing white coat over pale turquoise scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Porsuk Ortodonti ve İmplant Merkezi — Laleli, Fatih

Forma: bordo (deep burgundy) scrubs

#### Doç. Dr. Levent Aydın — Ortodonti

- **Dosya:** `public/images/doktorlar/levent-aydin.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Doç. Dr. Levent Aydın temsili portresi

```text
Editorial studio headshot of a fictional 50-year-old Turkish man, short grey hair, clean-shaven, rectangular dark-frame glasses, kind grandfatherly but professional expression, working as a dentist. Wearing deep burgundy scrubs under an open crisp white lab coat, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Büşra Kaplan — Ortodonti

- **Dosya:** `public/images/doktorlar/busra-kaplan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Büşra Kaplan temsili portresi

```text
Editorial studio headshot of a fictional 35-year-old Turkish woman, long straight dark hair in a neat low ponytail, round face, soft confident smile, no glasses, working as a dentist. Wearing deep burgundy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Fatih Erol — Ağız, Diş ve Çene Cerrahisi

- **Dosya:** `public/images/doktorlar/fatih-erol.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Fatih Erol temsili portresi

```text
Editorial studio headshot of a fictional 42-year-old Turkish man, short dark brown hair, full well-kept dark beard, broad shoulders, calm friendly expression, no glasses, working as a dentist. Wearing deep burgundy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Derya Kurt — Periodontoloji

- **Dosya:** `public/images/doktorlar/derya-kurt.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Derya Kurt temsili portresi

```text
Editorial studio headshot of a fictional 39-year-old Turkish woman, shoulder-length straight chestnut hair with a center part, light freckles, warm calm smile, no glasses, working as a dentist. Wearing deep burgundy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Cansu Er — Pedodonti

- **Dosya:** `public/images/doktorlar/cansu-er.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Cansu Er temsili portresi

```text
Editorial studio headshot of a fictional 34-year-old Turkish woman, light brown wavy hair in a messy bun, youthful round face, playful warm smile, clear-frame round glasses, working as a dentist. Wearing deep burgundy scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

### Sedef Diş Kliniği — Mercan, Fatih

Forma: sedef beyazı ve gri (pearl white with grey trim) scrubs

#### Dt. Yusuf Kalkan — Genel Diş Hekimliği

- **Dosya:** `public/images/doktorlar/yusuf-kalkan.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Dt. Yusuf Kalkan temsili portresi

```text
Editorial studio headshot of a fictional 38-year-old Turkish man, short black hair, neatly trimmed black beard, strong eyebrows, warm welcoming smile, no glasses, working as a dentist. Wearing pearl white with grey trim scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Merve Altun — Pedodonti

- **Dosya:** `public/images/doktorlar/merve-altun.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Merve Altun temsili portresi

```text
Editorial studio headshot of a fictional 36-year-old Turkish woman, long dark-brown hair in a side braid, light skin, rosy cheeks, gentle cheerful smile, no glasses, working as a dentist. Wearing pearl white with grey trim scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Hakan Uysal — Endodonti

- **Dosya:** `public/images/doktorlar/hakan-uysal.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Hakan Uysal temsili portresi

```text
Editorial studio headshot of a fictional 42-year-old Turkish man, short dark hair with slight receding hairline, clean-shaven, oval steel-frame glasses, calm patient expression, working as a dentist. Wearing pearl white with grey trim scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Gamze Şimşek — Protetik Diş Tedavisi

- **Dosya:** `public/images/doktorlar/gamze-simsek.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Gamze Şimşek temsili portresi

```text
Editorial studio headshot of a fictional 40-year-old Turkish woman, short pixie-cut dark hair, small pearl earrings, warm composed smile, no glasses, working as a dentist. Wearing pearl white with grey trim scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

#### Uzm. Dt. Tuncay Bayram — Restoratif Diş Tedavisi

- **Dosya:** `public/images/doktorlar/tuncay-bayram.webp`
- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP
- **Alt metin:** Uzm. Dt. Tuncay Bayram temsili portresi

```text
Editorial studio headshot of a fictional 44-year-old Turkish man, short cropped greying hair, clean-shaven, laugh lines, friendly confident expression, no glasses, working as a dentist. Wearing pearl white with grey trim scrubs, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.
```

## 2. Hastane dış cephe görselleri

**Sitede nerede:** hastane profilinin kapak görseli (geniş, 16:9), ana sayfadaki "merkezler" şeridi ve hastane listesi (16:10'a kırpılır — önemli öğeleri merkezde tutun).

### Mine Ağız ve Diş Sağlığı Merkezi

- **Dosya:** `public/images/hastaneler/mine-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Mine Ağız ve Diş Sağlığı Merkezi binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: ground floor and first floor of a renovated early-twentieth-century Samatya apartment building in Istanbul's Fatih district, pale stucco facade with tall windows and a small wrought-iron balcony, on a quiet sloping cobbled side street with a plane tree, a discreet blank frosted-glass sign plate beside the entrance. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Dentaris Boğaziçi Diş Hastanesi

- **Dosya:** `public/images/hastaneler/dentaris-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Dentaris Boğaziçi Diş Hastanesi binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental hospital: a six-storey medical building in Sirkeci, Istanbul's historic peninsula, a restored late-Ottoman stone facade with tall arched windows on the lower floors and a discreet modern glass extension above, wide entrance canopy, the Bosphorus entrance glimpsed softly at the edge of frame, late-morning light, blank backlit sign band above the entrance. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Kökyapı Diş Kliniği

- **Dosya:** `public/images/hastaneler/kokyapi-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Kökyapı Diş Kliniği binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: a carefully renovated 1970s apartment block in Çapa, Fatih, Istanbul with beige travertine cladding and balconies, the clinic occupies the fourth floor with large windows, street-level view with linden trees and parked scooters. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Körfez Gülüş Ağız ve Diş Sağlığı Merkezi

- **Dosya:** `public/images/hastaneler/korfez-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Körfez Gülüş Ağız ve Diş Sağlığı Merkezi binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: a restored four-storey row house on the Golden Horn waterfront in Balat, Istanbul, with a colorful but muted pastel facade, bay windows and wooden shutters, the Golden Horn water and a few seagulls glimpsed at the edge of frame, soft bright daylight. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Nilüfer Kavis Diş Polikliniği

- **Dosya:** `public/images/hastaneler/kavis-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Nilüfer Kavis Diş Polikliniği binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: a contemporary mid-rise office plaza near the Topkapı city walls in Fatih, Istanbul, warm grey fiber-cement panels and a curved glass corner, small landscaped forecourt with grasses, a fragment of the old Byzantine stone walls faintly visible in the background. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Lara Mavi Kıyı Diş Hastanesi

- **Dosya:** `public/images/hastaneler/lara-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Lara Mavi Kıyı Diş Hastanesi binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental hospital: a bright white modern dental hospital on the Yenikapı seafront in Fatih, Istanbul, with deep horizontal sun-shading louvers, a few young plane trees, the Sea of Marmara and a distant ship on the horizon, clear coastal light and a pale blue sky. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Porsuk Ortodonti ve İmplant Merkezi

- **Dosya:** `public/images/hastaneler/porsuk-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Porsuk Ortodonti ve İmplant Merkezi binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: a three-storey modern building with light brick and large windows on a busy avenue in Laleli, Fatih, Istanbul, a modern tram softly blurred passing in front, plane trees along the sidewalk, soft afternoon light. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

### Sedef Diş Kliniği

- **Dosya:** `public/images/hastaneler/sedef-dis.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP
- **Alt metin:** Sedef Diş Kliniği binası ve girişi (temsili)

```text
Architectural exterior photograph of a fictional dental clinic: a restored eighteenth-century stone han building near the Grand Bazaar in Mercan, Fatih, Istanbul, arched windows with dark green frames and a heavy wooden entrance door, worn cobblestones, a mosque dome softly out of focus in the background, overcast soft light. Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.
```

## 3. Hastane tedavi odası görselleri

**Sitede nerede:** hastane profilinde kapak görselinin sağındaki ikinci görsel (masaüstünde dikeye yakın kırpılır, mobilde 16:9). Koltuğu kadrajın ortasına yerleştirin.

### Mine Ağız ve Diş Sağlığı Merkezi — tedavi odası

- **Dosya:** `public/images/hastaneler/mine-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Mine Ağız ve Diş Sağlığı Merkezi tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Samatya, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Dentaris Boğaziçi Diş Hastanesi — tedavi odası

- **Dosya:** `public/images/hastaneler/dentaris-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Dentaris Boğaziçi Diş Hastanesi tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a hospital in Sirkeci, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Kökyapı Diş Kliniği — tedavi odası

- **Dosya:** `public/images/hastaneler/kokyapi-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Kökyapı Diş Kliniği tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Çapa, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Körfez Gülüş Ağız ve Diş Sağlığı Merkezi — tedavi odası

- **Dosya:** `public/images/hastaneler/korfez-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Körfez Gülüş Ağız ve Diş Sağlığı Merkezi tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Balat, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight and a hint of Golden Horn view. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Nilüfer Kavis Diş Polikliniği — tedavi odası

- **Dosya:** `public/images/hastaneler/kavis-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Nilüfer Kavis Diş Polikliniği tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Topkapı, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Lara Mavi Kıyı Diş Hastanesi — tedavi odası

- **Dosya:** `public/images/hastaneler/lara-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Lara Mavi Kıyı Diş Hastanesi tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a hospital in Yenikapı, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight and a hint of Marmara sea view. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Porsuk Ortodonti ve İmplant Merkezi — tedavi odası

- **Dosya:** `public/images/hastaneler/porsuk-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Porsuk Ortodonti ve İmplant Merkezi tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Laleli, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

### Sedef Diş Kliniği — tedavi odası

- **Dosya:** `public/images/hastaneler/sedef-ic.webp`
- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP
- **Alt metin:** Sedef Diş Kliniği tedavi odası (temsili)

```text
Interior photograph of an empty, spotless modern dental treatment room in a boutique clinic in Mercan, Istanbul. A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight. One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no screens with text. Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.
```

## 4. Sağlık rehberi kapakları

**Sitede nerede:** rehber listesi (16:10 kart), makale sayfası kapağı (masaüstünde 21:9'a kırpılır — nesneyi yatay ortada ve dikey merkezde tutun), ana sayfa rehber bölümü.

### Diş çürükleri: nasıl başlar, nasıl durdurulur?

- **Dosya:** `public/images/rehber/dis-curukleri.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a single realistic ivory molar model standing on a porcelain-colored surface next to three sugar cubes, one sugar cube slightly crumbled, soft side light, minimal still life. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Kanal tedavisi: adım adım ne yapılıyor?

- **Dosya:** `public/images/rehber/kanal-tedavisi.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a neat row of fine endodontic files with colored handles laid on a sterile matte tray beside a small dental mirror, overhead flat-lay, clean negative space. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Diş taşı temizliği: neden ve ne sıklıkla?

- **Dosya:** `public/images/rehber/dis-tasi-temizligi.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: an ultrasonic scaler handpiece and a few interchangeable tips arranged on a folded petrol-colored cloth, a glass of water with soft reflections, side light. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Diş eti hastalıkları: kanayan diş eti ne anlatıyor?

- **Dosya:** `public/images/rehber/dis-eti-hastaliklari.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a high-quality anatomical dental model of a lower jaw showing healthy pink gums, on a pale porcelain surface, macro still life with shallow depth of field. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### İmplant: kimlere uygun, süreç nasıl işliyor?

- **Dosya:** `public/images/rehber/implant.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a titanium dental implant screw with abutment standing upright next to an ivory crown model, on a matte porcelain pedestal, precise product-style still life. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Ortodonti: tel, şeffaf plak ve doğru zamanlama

- **Dosya:** `public/images/rehber/ortodonti.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a set of clear aligners resting beside an open minimal aligner case on a porcelain-colored surface, soft daylight, gentle reflections in the plastic. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Ağız hijyeni: doğru fırçalama, diş ipi ve macun seçimi

- **Dosya:** `public/images/rehber/agiz-hijyeni.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: two soft-bristle toothbrushes, a coil of dental floss and a small interdental brush arranged in a tidy grid on a pale porcelain surface, overhead flat-lay. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

### Koruyucu diş hekimliği: çocukluktan başlayan önlemler

- **Dosya:** `public/images/rehber/koruyucu-dis-hekimligi.webp`
- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP
- **Alt metin:** (dekoratif — boş bırakılır)

```text
Minimal editorial still life photograph: a small child's toothbrush, a tiny pea-sized dab of toothpaste on it, and a small dental mirror on a soft ivory surface, warm but clean light, playful but calm. Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. No hands, no mouths, no text. Horizontal 16:9 aspect ratio.
```

## Kontrol listesi

- [ ] Tüm dosyalar `.webp`, adları tablodakiyle birebir aynı
- [ ] Portrelerde fon ve ışık aynı; yüzler kadrajın ortasında
- [ ] Hiçbir görselde okunabilir yazı, logo ya da marka yok
- [ ] Her görselde yalnızca bir mavi ayrıntı var
- [ ] Dosya boyutları: portre < 250 KB, geniş görseller < 400 KB
- [ ] `pnpm dev` ile kontrol: yer tutucuların yerine fotoğraflar geliyor
