// docs/GORSEL_PROMPTLARI.md dosyasını seed veriden üretir.
// Çalıştırma: pnpm prompts
import { writeFileSync } from "node:fs";
import { articles } from "../src/data/articles";
import { doctors } from "../src/data/doctors";
import { hospitals } from "../src/data/hospitals";
import { specialtyById } from "../src/data/specialties";

const YEAR = 2026;

const style = `Visual style: editorial clinical photography, calm and trustworthy, never stock-photo cheesy.
Palette: cool porcelain grey-green (#EEF3F2) and white surfaces, deep petrol ink (#0F2A33) for darks and shadows,
warm ivory tooth-shade accents (#F3EAD7, #EBDDBF), exactly one small electric "curing-light" blue (#2D4BFF) detail.
Light: soft diffused daylight, gentle contrast, no harsh specular highlights. Color grade: cool neutral, slightly desaturated, clean whites.
Camera: full-frame look, natural perspective, shallow depth of field where noted. Realistic textures.`;

const negative = `text, letters, logos, watermarks, readable signage, brand names, oversaturated colors, teal-and-orange grade,
plastic or airbrushed skin, uncanny teeth, exaggerated smile, braces on adults unless stated, blood, open mouths, intraoral close-ups,
medical gore, celebrity likeness, extra fingers, distorted hands, duplicated objects, fisheye distortion, vignette, HDR halos`;

const architecture: Record<string, string> = {
  mine: "ground floor and first floor of a renovated early-twentieth-century Samatya apartment building in Istanbul's Fatih district, pale stucco facade with tall windows and a small wrought-iron balcony, on a quiet sloping cobbled side street with a plane tree, a discreet blank frosted-glass sign plate beside the entrance",
  dentaris:
    "a six-storey medical building in Sirkeci, Istanbul's historic peninsula, a restored late-Ottoman stone facade with tall arched windows on the lower floors and a discreet modern glass extension above, wide entrance canopy, the Bosphorus entrance glimpsed softly at the edge of frame, late-morning light, blank backlit sign band above the entrance",
  kokyapi:
    "a carefully renovated 1970s apartment block in Çapa, Fatih, Istanbul with beige travertine cladding and balconies, the clinic occupies the fourth floor with large windows, street-level view with linden trees and parked scooters",
  korfez:
    "a restored four-storey row house on the Golden Horn waterfront in Balat, Istanbul, with a colorful but muted pastel facade, bay windows and wooden shutters, the Golden Horn water and a few seagulls glimpsed at the edge of frame, soft bright daylight",
  kavis:
    "a contemporary mid-rise office plaza near the Topkapı city walls in Fatih, Istanbul, warm grey fiber-cement panels and a curved glass corner, small landscaped forecourt with grasses, a fragment of the old Byzantine stone walls faintly visible in the background",
  lara: "a bright white modern dental hospital on the Yenikapı seafront in Fatih, Istanbul, with deep horizontal sun-shading louvers, a few young plane trees, the Sea of Marmara and a distant ship on the horizon, clear coastal light and a pale blue sky",
  porsuk:
    "a three-storey modern building with light brick and large windows on a busy avenue in Laleli, Fatih, Istanbul, a modern tram softly blurred passing in front, plane trees along the sidewalk, soft afternoon light",
  sedef:
    "a restored eighteenth-century stone han building near the Grand Bazaar in Mercan, Fatih, Istanbul, arched windows with dark green frames and a heavy wooden entrance door, worn cobblestones, a mosque dome softly out of focus in the background, overcast soft light",
};

// Tedavi odaları birbirinin kopyası gibi durmasın diye: oda boyutu, malzeme, manzara, kamera açısı ve uzmanlığı gösteren tek bir cihaz değişir.
// Haritada olmayan hastane (ör. Mine) genel tarifle üretilir.
const interiors: Record<string, string> = {
  dentaris:
    "Spacious, clinical, hospital-grade room seen frontally and symmetrically from the doorway. A dental chair with deep petrol (#0F2A33) upholstery in the center, a ceiling-mounted operating light and a ceiling-mounted monitor with a blank dark screen, light grey terrazzo floor, matte porcelain white cabinetry along one wall, a frosted glass partition with a sliding door on the left. Behind the chair a wide window shows the domes and stone rooftops of the historic peninsula under late-morning light",
  kokyapi:
    "Intimate, focused room on the fourth floor of a renovated 1970s apartment building, photographed from a corner at a slightly lower angle. A dental chair with deep petrol (#0F2A33) upholstery, and beside it a white dental operating microscope on a ceiling-mounted arm as the clear focal point. Warm light oak floor, walls in cool porcelain grey-green, a narrow run of matte white cabinetry. A medium window with a sheer curtain shows green linden tree branches and the facade of the apartment building across the street; no sea view",
  korfez:
    "Friendly, homely room inside a restored nineteenth-century row house, photographed from the side. One wall is exposed old brick painted soft white, the floor is pale whitewashed wooden boards, cabinetry in matte porcelain white. A dental chair with deep petrol (#0F2A33) upholstery, a small low stool for a child next to it and a simple wooden shelf with a few plain wooden toys. A small bay window with open wooden shutters gives a narrow glimpse of the Golden Horn water. Soft, gentle daylight; no cartoon decorations",
  kavis:
    "Contemporary, technical room inside an office plaza near the city walls, photographed from behind the dental chair at a three-quarter angle. Polished light grey concrete floor, a floor-to-ceiling glass corner window, matte porcelain white cabinetry. A dental chair with deep petrol (#0F2A33) upholstery and next to it a slim cart with an intraoral scanner and a monitor with a blank screen. Through an internal glass wall, a small dental lab with a milling machine is softly out of focus. Outside the window: city rooftops and a fragment of old stone walls, no sea. Cool, even daylight",
  lara:
    "Generous, airy room in a seafront hospital, photographed wide from the far corner. A long horizontal ribbon window shows the Sea of Marmara and a distant ship on the horizon in clear coastal light. Light wooden slat ceiling, pale stone-look floor, matte porcelain white cabinetry. A dental chair with deep petrol (#0F2A33) upholstery, a patient vital-signs monitor on a stand with a blank screen for sedation, and a soft upholstered armchair for a companion in the corner",
  porsuk:
    "Medium-sized room on the first floor of a modern building on a busy avenue, photographed straight on from the side wall. One accent wall of light cream brick, light grey vinyl floor, matte porcelain white cabinetry. A dental chair with deep petrol (#0F2A33) upholstery and on a wall shelf a neat row of white plaster orthodontic study models. A tall window with a sheer curtain looks down onto plane tree leaves and a softly blurred modern tram on the street below; no sea. Warm soft afternoon light",
  sedef:
    "Small boutique room inside a restored eighteenth-century stone han near the Grand Bazaar. A low brick barrel-vaulted ceiling and thick whitewashed stone walls contrast with modern equipment. Photographed from a low angle toward a single deep arched window with a dark green frame and a deep stone reveal, overcast soft light falling in. Dark wooden floor, a short run of matte porcelain white cabinetry, a dental chair with deep petrol (#0F2A33) upholstery in the center and a compact overhead operating light. No sea or skyline view, only a stone courtyard wall outside",
};

const covers: Record<string, string> = {
  "dis-curukleri":
    "a single realistic ivory molar model standing on a porcelain-colored surface next to three sugar cubes, one sugar cube slightly crumbled, soft side light, minimal still life",
  "kanal-tedavisi":
    "a neat row of fine endodontic files with colored handles laid on a sterile matte tray beside a small dental mirror, overhead flat-lay, clean negative space",
  "dis-tasi-temizligi":
    "an ultrasonic scaler handpiece and a few interchangeable tips arranged on a folded petrol-colored cloth, a glass of water with soft reflections, side light",
  "dis-eti-hastaliklari":
    "a high-quality anatomical dental model of a lower jaw showing healthy pink gums, on a pale porcelain surface, macro still life with shallow depth of field",
  implant:
    "a titanium dental implant screw with abutment standing upright next to an ivory crown model, on a matte porcelain pedestal, precise product-style still life",
  ortodonti: "a set of clear aligners resting beside an open minimal aligner case on a porcelain-colored surface, soft daylight, gentle reflections in the plastic",
  "agiz-hijyeni":
    "two soft-bristle toothbrushes, a coil of dental floss and a small interdental brush arranged in a tidy grid on a pale porcelain surface, overhead flat-lay",
  "koruyucu-dis-hekimligi":
    "a small child's toothbrush, a tiny pea-sized dab of toothpaste on it, and a small dental mirror on a soft ivory surface, warm but clean light, playful but calm",
};

// Veride forma rengi "türkçe (english) scrubs" biçiminde; prompt'a yalnızca İngilizce kısım girer.
function uniformEn(value: string) {
  const m = value.match(/\(([^)]+)\)\s*(.*)/);
  return m ? `${m[1]} ${m[2]}`.trim() : value;
}

function ageOf(birthYear: number) {
  return YEAR - birthYear;
}

const out: string[] = [];
const push = (s = "") => out.push(s);

push("# Dentraco — Görsel üretim rehberi (Gemini)");
push();
push("> Bu dosya `pnpm prompts` komutuyla seed veriden otomatik üretilir. Elle düzenlemek yerine `scripts/gorsel-promptlari.ts` dosyasını güncelleyin.");
push();
push("Sitedeki tüm görseller aynı görsel dili paylaşmalı: soğuk porselen zemin, petrol mürekkebi gölgeler, fildişi diş tonları ve **tek bir** elektrik mavisi ayrıntı.");
push("Görseller henüz eklenmediğinde site otomatik yer tutucu gösterir; aşağıdaki dosya adlarıyla `public/` altına koyduğunuzda kod değişikliği gerekmeden görünürler.");
push();
push("## Nasıl kullanılır");
push();
push("1. Gemini'de görsel üretim modunu açın (Gemini uygulaması ya da Google AI Studio, görüntü üretim modeli).");
push("2. Her görsel için **Ortak stil bloğu + görsele özel prompt**'u birlikte yapıştırın. Negatif listeyi \"Avoid:\" diye sona ekleyin.");
push("3. En-boy oranını prompt'taki değere ayarlayın (AI Studio'da *Aspect ratio* seçeneği; Gemini uygulamasında prompt içinde belirtilmiştir).");
push("4. Çıktıyı PNG olarak indirin, belirtilen boyuta kırpın/ölçekleyin ve WebP'ye dönüştürün:");
push();
push("```bash");
push("# Bir kez: brew install webp   (ya da: npx @squoosh/cli)");
push("cwebp -q 82 -resize 1200 1500 girdi.png -o public/images/doktorlar/elif-arslan.webp");
push("```");
push();
push("5. Dosyayı tablodaki yola tam adıyla kaydedin. Büyük/küçük harf ve Türkçe karakter kullanmayın.");
push("6. Aynı hastanenin doktorlarını art arda üretin; Gemini'ye \"aynı stüdyo ışığı ve fonla devam et\" diyerek tutarlılığı artırın.");
push();
push("## Ortak stil bloğu (her prompt'un başına)");
push();
push("```text");
push(style);
push("```");
push();
push("## Negatif liste (her prompt'un sonuna)");
push();
push("```text");
push(`Avoid: ${negative}`);
push("```");
push();
push("## Özet");
push();
push("| Grup | Adet | Oran | Üretim | Sitede kullanılan boyut | Klasör |");
push("|---|---|---|---|---|---|");
push(`| Doktor portreleri | ${doctors.length} | 4:5 | 1536×1920 | 1200×1500 WebP | \`public/images/doktorlar/\` |`);
push(`| Hastane dış cephe | ${hospitals.length} | 16:9 | 1920×1080 | 1920×1080 WebP | \`public/images/hastaneler/\` |`);
push(`| Hastane tedavi odası | ${hospitals.length} | 4:3 | 1600×1200 | 1600×1200 WebP | \`public/images/hastaneler/\` |`);
push(`| Rehber kapakları | ${articles.length} | 16:9 | 1920×1080 | 1600×900 WebP | \`public/images/rehber/\` |`);
push();
push("Sosyal medya paylaşım görseli (OG) kodla üretilir; Gemini gerekmez.");
push();

push("## 1. Doktor portreleri");
push();
push("**Kurgu:** Aynı stüdyo, aynı fon, aynı ışık. Omuz hizası kadraj, kamera göz hizasında, yüz kadrajın üst üçte birinde. Her hastanenin forması farklı renktedir; böylece aynı ekipten hekimler sayfada bir arada tutarlı görünür. Kişiler kurgusaldır, gerçek bir kişiye benzememelidir.");
push();
push("**Sitede nerede:** doktor kartları (ana sayfa, listeler; ~280 px), profil sol sütunu (340 px), liste satırları (88 px küçük resim), makale \"uzman görüşü\" kutusu (56 px). Yüz merkezde kalmalı ki küçük kırpmalarda da okunur olsun.");
push();
for (const h of hospitals) {
  push(`### ${h.name} — ${h.neighborhood}, ${h.district}`);
  push();
  push(`Forma: ${h.uniformColor}`);
  push();
  for (const d of doctors.filter((x) => x.hospitalId === h.id)) {
    const senior = ["Prof. Dr.", "Doç. Dr.", "Dr. Öğr. Üyesi"].includes(d.title);
    push(`#### ${d.title} ${d.firstName} ${d.lastName} — ${specialtyById[d.specialty].name}`);
    push();
    push(`- **Dosya:** \`public${d.image}\``);
    push("- **Oran / çözünürlük:** 4:5 dikey — üret 1536×1920, kaydet 1200×1500 WebP");
    push(`- **Alt metin:** ${d.title} ${d.firstName} ${d.lastName} temsili portresi`);
    push();
    push("```text");
    push(
      `Editorial studio headshot of a fictional ${ageOf(d.birthYear)}-year-old ${d.appearance}, working as a dentist. ` +
        `Wearing ${uniformEn(h.uniformColor)}${senior && !h.uniformColor.includes("white coat") ? " under an open crisp white lab coat" : ""}, a slim electric blue (#2D4BFF) pen clipped to the chest pocket. ` +
        `Head-and-shoulders crop, body turned slightly, face toward camera, calm confident expression with a soft closed-mouth smile. ` +
        `Plain seamless backdrop in cool porcelain grey-green (#EEF3F2). Large soft key light from camera left, subtle fill, faint rim light. ` +
        `Natural skin texture, realistic hair, 85mm lens at f/2.8, shallow depth of field. Vertical 4:5 aspect ratio.`,
    );
    push("```");
    push();
  }
}

push("## 2. Hastane dış cephe görselleri");
push();
push("**Sitede nerede:** hastane profilinin kapak görseli (geniş, 16:9), ana sayfadaki \"merkezler\" şeridi ve hastane listesi (16:10'a kırpılır — önemli öğeleri merkezde tutun).");
push();
for (const h of hospitals) {
  push(`### ${h.name}`);
  push();
  push(`- **Dosya:** \`public${h.image}\``);
  push("- **Oran / çözünürlük:** 16:9 yatay — üret ve kaydet 1920×1080 WebP");
  push(`- **Alt metin:** ${h.name} binası ve girişi (temsili)`);
  push();
  push("```text");
  push(
    `Architectural exterior photograph of a fictional dental ${h.type === "Diş Hastanesi" ? "hospital" : "clinic"}: ${architecture[h.id]}. ` +
      `Eye-level view from across the street, slight three-quarter angle, verticals corrected. A few passers-by softly blurred and unidentifiable. ` +
      `Calm, clean, trustworthy mood; the facade tones lean toward ivory and porcelain, shadows toward deep petrol. ` +
      `One small electric blue (#2D4BFF) accent such as a door handle or a bicycle. No readable text anywhere. Horizontal 16:9 aspect ratio.`,
  );
  push("```");
  push();
}

push("## 3. Hastane tedavi odası görselleri");
push();
push("**Sitede nerede:** hastane profilinde kapak görselinin sağındaki ikinci görsel (masaüstünde dikeye yakın kırpılır, mobilde 16:9). Koltuğu kadrajın ortasına yerleştirin.");
push();
for (const h of hospitals) {
  push(`### ${h.name} — tedavi odası`);
  push();
  push(`- **Dosya:** \`public${h.interiorImage}\``);
  push("- **Oran / çözünürlük:** 4:3 yatay — üret ve kaydet 1600×1200 WebP");
  push(`- **Alt metin:** ${h.name} tedavi odası (temsili)`);
  push();
  push("```text");
  const room =
    interiors[h.id] ??
    "A dental chair with deep petrol (#0F2A33) upholstery in the center, an overhead operating light, a compact instrument tray, cabinetry in matte porcelain white, walls in cool porcelain grey-green, large window with sheer curtain letting in soft daylight";
  push(
    `Interior photograph of an empty, spotless modern dental treatment room in a ${h.type === "Diş Hastanesi" ? "hospital" : "boutique clinic"} in ${h.neighborhood}, Istanbul. ` +
      `${room}. ` +
      `One small electric blue (#2D4BFF) object, such as a curing light handpiece resting on the tray. No people, no readable text, no logos. ` +
      `Wide-angle 24mm, straight verticals, calm and hygienic atmosphere. Horizontal 4:3 aspect ratio.`,
  );
  push("```");
  push();
}

push("## 4. Sağlık rehberi kapakları");
push();
push("**Sitede nerede:** rehber listesi (16:10 kart), makale sayfası kapağı (masaüstünde 21:9'a kırpılır — nesneyi yatay ortada ve dikey merkezde tutun), ana sayfa rehber bölümü.");
push();
for (const a of articles) {
  push(`### ${a.title}`);
  push();
  push(`- **Dosya:** \`public${a.cover}\``);
  push("- **Oran / çözünürlük:** 16:9 yatay — üret 1920×1080, kaydet 1600×900 WebP");
  push("- **Alt metin:** (dekoratif — boş bırakılır)");
  push();
  push("```text");
  push(
    `Minimal editorial still life photograph: ${covers[a.slug] ?? "dental care objects arranged on a porcelain surface"}. ` +
      `Background a seamless cool porcelain grey-green (#EEF3F2) with generous empty space on both sides for wide cropping. ` +
      `Soft directional daylight from the left, delicate shadows tinted deep petrol. Exactly one small electric blue (#2D4BFF) element in the scene. ` +
      `No hands, no mouths, no text. Horizontal 16:9 aspect ratio.`,
  );
  push("```");
  push();
}

push("## Kontrol listesi");
push();
push("- [ ] Tüm dosyalar `.webp`, adları tablodakiyle birebir aynı");
push("- [ ] Portrelerde fon ve ışık aynı; yüzler kadrajın ortasında");
push("- [ ] Hiçbir görselde okunabilir yazı, logo ya da marka yok");
push("- [ ] Her görselde yalnızca bir mavi ayrıntı var");
push("- [ ] Dosya boyutları: portre < 250 KB, geniş görseller < 400 KB");
push("- [ ] `pnpm dev` ile kontrol: yer tutucuların yerine fotoğraflar geliyor");
push();

writeFileSync(new URL("../docs/GORSEL_PROMPTLARI.md", import.meta.url), out.join("\n"));
console.log(`docs/GORSEL_PROMPTLARI.md yazıldı (${doctors.length + hospitals.length * 2 + articles.length} görsel).`);
