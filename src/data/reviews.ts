import type { Review, SpecialtyId, TreatmentId } from "@/lib/types";
import { doctors } from "./doctors";
import { hospitals } from "./hospitals";

// Tüm örnek yorumlar prototip için yazılmıştır; gerçek hasta deneyimi değildir.
// Sabit tohumlu üretici sayesinde her derlemede aynı yorumlar aynı hedeflere düşer.

type Sample = { rating: number; title: string; body: string; treatment?: TreatmentId };

const doctorPool: Record<SpecialtyId, Sample[]> = {
  genel: [
    { rating: 5, title: "Sabırlı ve açıklayıcı", body: "Yıllardır diş hekimine gitmekten kaçınıyordum. İlk randevuda sadece muayene yapıldı, ne yapılacağı tek tek anlatıldı. İkinci seansta iki dolgum yapıldı, hiç acele edilmedi.", treatment: "dolgu" },
    { rating: 5, title: "Diş taşı temizliği çok rahattı", body: "Diş taşı temizliğinde hassasiyetim olduğunu söyledim, ara ara durup sordu. Sonrasında evde nasıl fırçalamam gerektiğini ayna karşısında gösterdi.", treatment: "dis-tasi" },
    { rating: 4, title: "Acil ağrıda aynı gün baktı", body: "Gece başlayan ağrı için sabah aradım, öğlen randevu verdiler. Geçici tedavi yapıldı ve kanal için uzmana yönlendirildim. Bekleme biraz uzun sürdü ama ilgi iyiydi.", treatment: "acil" },
    { rating: 4, title: "Güler yüzlü", body: "Kontrol için gittim, panoramik röntgen çekildi ve küçük bir çürük tespit edildi. Fiyat bilgisi önceden net verildi, sürpriz olmadı.", treatment: "muayene" },
    { rating: 3, title: "İşlem iyi, randevu zor", body: "Yapılan dolgudan memnunum ancak randevu almak için iki hafta beklemem gerekti. Hekim ilgiliydi ama sekreterlik tarafı biraz karışıktı.", treatment: "dolgu" },
    { rating: 5, title: "Çocuğum kadar ben de rahat ettim", body: "Eşim ve ben aynı gün kontrol olduk. İkimize de ayrı ayrı vakit ayrıldı, gereksiz tedavi önerilmedi. Altı ay sonra hatırlatma mesajı geldi.", treatment: "muayene" },
  ],
  endodonti: [
    { rating: 5, title: "Kanal tedavisinden korkmayın", body: "Kanal tedavisi denince çok korkuyordum. Uyuşturma iyi yapıldı, işlem boyunca hiçbir şey hissetmedim. Mikroskopla çalışıldığını ve her aşamanın röntgenle kontrol edildiğini gördüm.", treatment: "kanal" },
    { rating: 5, title: "Başka yerde çekilsin denen dişim kurtuldu", body: "Daha önce kanal tedavisi yapılmış dişim tekrar ağrımaya başlamıştı ve çekim önerilmişti. Tomografiyle bakıldı, kaçırılmış bir kanal bulundu. Yeniden tedaviden sonra şikâyetim kalmadı.", treatment: "kanal" },
    { rating: 4, title: "İşini çok titiz yapıyor", body: "Tedavi iki seans sürdü, her seans bir saati geçti ama sonuç çok iyi. Sonrasında birkaç gün hafif hassasiyet oldu, önceden söylendiği için endişelenmedim.", treatment: "kanal" },
    { rating: 4, title: "Gece ağrısı için acil randevu", body: "Zonklayan ağrıyla aradım, aynı gün akşam saatinde baktılar. İlk müdahaleden sonra rahatladım. Kalıcı dolgu için ayrı randevu gerekti.", treatment: "acil" },
    { rating: 2, title: "Tedavi iyi ama iletişim zayıf", body: "Kanal tedavisinin kendisinde sorun yaşamadım fakat tedavi sonrası kron gerekip gerekmediğini tam anlayamadım. Sorularıma kısa cevaplar aldım, biraz daha açıklama beklerdim.", treatment: "kanal" },
    { rating: 5, title: "Sevk edildim, rapor geri gönderildi", body: "Kendi diş hekimim zor bir kanal olduğu için buraya yönlendirdi. Tedavi bitince hem bana hem hekimime röntgenleriyle rapor gönderildi. Çok profesyonel.", treatment: "kanal" },
  ],
  ortodonti: [
    { rating: 5, title: "Şeffaf plakla 14 ayda bitti", body: "Otuz yaşında ortodonti tedavisine başlamaktan çekiniyordum. Başta dijital simülasyonla sonuç gösterildi, takvim neredeyse aynen tuttu. Kontroller hep zamanında yapıldı.", treatment: "seffaf-plak" },
    { rating: 5, title: "Kızımın tedavisi çok iyi takip edildi", body: "On iki yaşındaki kızım tel tedavisi gördü. Her kontrolde hem ona hem bize ne yapıldığı anlatıldı. Fırçalama konusunda da çocuğu motive ettiler.", treatment: "ortodonti" },
    { rating: 4, title: "Sonuçtan memnunum", body: "Tel tedavim yaklaşık iki yıl sürdü. İlk haftalarda ağrı oldu ama önerilen yumuşak beslenme işe yaradı. Pekiştirme plağının önemi defalarca vurgulandı.", treatment: "ortodonti" },
    { rating: 3, title: "Süre uzadı", body: "Tedavi başta söylenenden altı ay kadar uzun sürdü. Bunun kısmen benim plakları düzenli takmamamdan kaynaklandığı açıkça söylendi, haklılar ama yine de biraz yoruldum.", treatment: "seffaf-plak" },
    { rating: 5, title: "Çapraşıklık tamamen düzeldi", body: "Alt ön dişlerimdeki çapraşıklık yüzünden gülerken elimi ağzıma kapatıyordum. Tedavi bitince ilk fotoğrafımı rahatça çektirdim. Teşekkürler.", treatment: "ortodonti" },
    { rating: 4, title: "Gerçekçi bilgilendirme", body: "Yetişkin olduğum için tedavinin sınırlarını dürüstçe anlattı, mucize vaat edilmedi. Bu yaklaşım bana güven verdi.", treatment: "seffaf-plak" },
  ],
  periodontoloji: [
    { rating: 5, title: "Diş eti kanamam geçti", body: "Fırçalarken sürekli kanama oluyordu. Derin temizlik iki seansta yapıldı, sonrasında kontrol randevusu verildi. Üç ay sonra kanama tamamen durmuştu.", treatment: "dis-eti" },
    { rating: 4, title: "Greft işlemi beklediğimden kolaydı", body: "Diş eti çekilmesi için greft yapıldı. İlk birkaç gün damakta hassasiyet oldu ama verilen talimatlarla rahat atlattım. Sonuç çok doğal görünüyor.", treatment: "dis-eti" },
    { rating: 5, title: "Ağız kokusu sorunum çözüldü", body: "Uzun süredir ağız kokusundan rahatsızdım. Sebebin diş eti cepleri olduğu anlaşıldı, tedaviden sonra fark net. Ara yüz fırçası kullanmayı burada öğrendim.", treatment: "dis-tasi" },
    { rating: 3, title: "Kontroller sık", body: "Tedavi iyi gidiyor ama üç ayda bir kontrol biraz zorluyor. Gerekçesi anlatıldı, yine de çalışan biri için randevu saatleri daha esnek olabilirdi.", treatment: "dis-eti" },
    { rating: 5, title: "İmplant çevresindeki iltihap tedavi edildi", body: "Başka yerde yapılan implantımın çevresinde şişlik vardı. Temizlik ve takip ile iltihap geriledi. İmplant bakımı konusunda çok faydalı bilgiler aldım.", treatment: "implant" },
  ],
  protetik: [
    { rating: 5, title: "Zirkonyum kronlar çok doğal", body: "Üst ön dişlerime zirkonyum kron yapıldı. Renk seçimi gün ışığında yapıldı, provada değişiklik istediğimde hiç itiraz edilmedi. Kimse fark etmiyor.", treatment: "zirkonyum" },
    { rating: 4, title: "Annemin protezi tam oturdu", body: "Yetmiş beş yaşındaki annemin tam protezi yenilendi. Birkaç kez ayar için gitmemiz gerekti ama her seferinde sabırla ilgilenildi. Artık rahat yemek yiyebiliyor.", treatment: "protez" },
    { rating: 5, title: "İmplant üstü köprü", body: "Cerrah ve protez uzmanı birlikte planladı. Geçici dişlerle bir süre kullandım, sonra kalıcıya geçildi. Isırma ve konuşmada hiçbir sorun yok.", treatment: "implant" },
    { rating: 4, title: "Gece plağı işe yaradı", body: "Sabahları çene ağrısıyla uyanıyordum. Diş sıkma tespit edildi ve gece plağı hazırlandı. İki hafta içinde ağrılar belirgin azaldı.", treatment: "bruksizm" },
    { rating: 2, title: "Fiyat beklentimin üzerindeydi", body: "Yapılan işin kalitesinden şikâyetim yok fakat toplam tutar ilk konuşulandan yüksek çıktı. Ek işlemlerin sebebi açıklandı ama önceden yazılı plan isterdim.", treatment: "zirkonyum" },
    { rating: 5, title: "Dijital ölçü harika", body: "Ölçü maddesiyle bulantı yaşadığım için hep çekiniyordum. Ağız içi tarayıcıyla ölçü alındı, birkaç gün içinde kronum hazırdı.", treatment: "zirkonyum" },
  ],
  restoratif: [
    { rating: 5, title: "Ön dişimdeki kırık iz bırakmadan düzeldi", body: "Düşüp ön dişimi kırmıştım. Tek seansta kompozitle onarıldı, renk o kadar iyi tuttu ki hangi diş olduğunu ben bile ayırt edemiyorum.", treatment: "dolgu" },
    { rating: 5, title: "Gülüş tasarımı öncesi prova çok iyiydi", body: "Laminaya karar vermeden önce ağzımda geçici bir prova yapıldı. Aynada sonucu görünce rahatladım. Diş kesimi minimumda tutuldu.", treatment: "gulus-tasarimi" },
    { rating: 4, title: "Beyazlatma sonrası hassasiyet kısa sürdü", body: "Ofis tipi beyazlatma yaptırdım. İki gün kadar soğuk hassasiyeti oldu, önceden söylendiği için sorun etmedim. Sonuç doğal bir beyazlık.", treatment: "beyazlatma" },
    { rating: 4, title: "Eski amalgam dolgularım değişti", body: "Eski siyah dolgularım beyaz dolgularla değiştirildi. Hangi dolgunun gerçekten değişmesi gerektiği tek tek anlatıldı, sağlam olanlara dokunulmadı.", treatment: "dolgu" },
    { rating: 3, title: "Biraz uzun sürdü", body: "Estetik dolgu işlemi beklediğimden uzun sürdü ve uzun süre ağzım açık kaldı. Sonuç güzel ama ara verilmesini isterdim.", treatment: "dolgu" },
    { rating: 5, title: "Aralıklar kapandı", body: "Ön dişlerimdeki aralık yıllardır canımı sıkıyordu. Diş kesmeden kompozitle kapatıldı. Fotoğraflarda artık rahatça gülüyorum.", treatment: "gulus-tasarimi" },
  ],
  cerrahi: [
    { rating: 5, title: "Gömülü yirmi yaş dişim sorunsuz çekildi", body: "Tomografide sinire yakın olduğu görüldü, riskler önceden anlatıldı. Operasyon kırk dakika sürdü, ertesi gün telefonla aranıp durumum soruldu. Şişlik üç günde indi.", treatment: "yirmilik" },
    { rating: 5, title: "Kemik grefti ve implant", body: "Kemiğim yetersiz olduğu için önce greft yapıldı. Süreç uzun ama her aşama baştan planlanmıştı. Bugün implantlarımla rahatça yemek yiyorum.", treatment: "implant" },
    { rating: 4, title: "Güven veren bir cerrah", body: "İmplant ameliyatından çok korkuyordum. Ameliyat günü her adım anlatıldı, ağrı hissetmedim. Sonraki birkaç gün ağrı kesiciyle idare ettim.", treatment: "implant" },
    { rating: 3, title: "Bekleme salonu kalabalıktı", body: "Ameliyat iyi geçti, cerrahtan memnunum. Ancak randevu saatimden bir saat sonra içeri alındım. Cerrahi öncesi bekleme insanı geriyor.", treatment: "yirmilik" },
    { rating: 5, title: "Sinüs yükseltme sonrası implant", body: "Başka iki klinik implant yapılamayacağını söylemişti. Burada sinüs yükseltme yapıldı ve altı ay sonra implantlar yerleştirildi. Çok teşekkür ederim.", treatment: "implant" },
  ],
  pedodonti: [
    { rating: 5, title: "Oğlum artık diş hekiminden korkmuyor", body: "Beş yaşındaki oğlum önceki deneyiminden sonra ağzını açmıyordu. İlk randevu tamamen tanışma olarak geçti. Üçüncü randevuda iki dolgusu sorunsuz yapıldı.", treatment: "cocuk" },
    { rating: 5, title: "Fissür örtücü ve flor uygulaması", body: "Altı yaş dişleri çıkınca fissür örtücü yapıldı. Kızım işlemi oyun gibi algıladı. Bize de evde dikkat etmemiz gerekenler anlatıldı.", treatment: "fissur" },
    { rating: 4, title: "Genel anestezi süreci iyi yönetildi", body: "Çok sayıda çürüğü olan üç yaşındaki kızımın tedavisi genel anestezi altında yapıldı. Anestezi uzmanı ve hekim bizi ayrıntılı bilgilendirdi. Gün içinde eve döndük.", treatment: "cocuk" },
    { rating: 4, title: "Yer tutucu yapıldı", body: "Süt dişi erken çekilince yer tutucu takıldı. Neden gerektiği resimlerle anlatıldı. Kontrollere düzenli çağırıyorlar.", treatment: "cocuk" },
    { rating: 3, title: "Bekleme alanı küçük", body: "Hekim çocuklarla çok iyi iletişim kuruyor ama bekleme alanı küçük, sıra beklerken çocuklar sıkılıyor. Tedavi tarafında sorun yok.", treatment: "cocuk" },
  ],
  radyoloji: [
    { rating: 5, title: "Tomografi sonuçları ayrıntılı anlatıldı", body: "İmplant öncesi tomografi çekildi. Rapor sadece hekimime gönderilmekle kalmadı, bana da ekranda kemik yapım gösterilerek anlatıldı.", treatment: "radyoloji" },
    { rating: 4, title: "Hızlı ve düzenli", body: "Panoramik röntgen için randevusuz gittim, on dakikada çekim tamamlandı. Rapor aynı gün e-postayla geldi.", treatment: "radyoloji" },
    { rating: 5, title: "Gereksiz çekim yapılmadı", body: "Başka bir klinik tomografi istemişti. Burada önce panoramik yeterli mi diye bakıldı, gerekmediği açıklandı. Bu dürüstlük çok hoşuma gitti.", treatment: "radyoloji" },
    { rating: 4, title: "Kist şüphesi erken fark edildi", body: "Rutin röntgende çenemde bir gölge fark edildi ve tomografiyle değerlendirildi. Hemen cerrahi bölüme yönlendirildim. Erken teşhis için teşekkürler.", treatment: "radyoloji" },
  ],
};

const hospitalPool: Sample[] = [
  { rating: 5, title: "Temiz ve düzenli", body: "Klinik çok temiz, sterilizasyon paketlerinin önümde açıldığını gördüm. Resepsiyon güler yüzlü, randevu saatine uyuldu." },
  { rating: 4, title: "Ulaşımı kolay", body: "Toplu taşımaya yakın olması büyük avantaj. Bekleme salonu ferah. Bazen telefonla ulaşmak zor olabiliyor." },
  { rating: 5, title: "Tüm aile buraya geliyoruz", body: "Çocuklarım için de eşim ve benim için de farklı uzmanlar aynı yerde. Randevularımızı art arda verebiliyorlar, büyük kolaylık." },
  { rating: 3, title: "Hekimler iyi, bekleme uzun", body: "Tedaviden memnun kaldım ancak randevu saatinden sonra yarım saat bekledim. Yoğun saatlerde bu süre uzayabiliyor." },
  { rating: 4, title: "Fiyatlar önceden açıkça söylendi", body: "Tedavi planı yazılı olarak verildi ve fiyatlar baştan belliydi. Ödeme seçenekleri anlatıldı." },
  { rating: 5, title: "Acil durumda yardımcı oldular", body: "Hafta sonu diş ağrısıyla aradım, aynı gün bakıldı. Sonrasındaki tedaviler de planlı ilerledi." },
  { rating: 2, title: "Otopark sorunu", body: "Tedaviden şikâyetim yok fakat binanın çevresinde park yeri bulmak çok zor. Anlaşmalı otoparkın da kapasitesi yetersiz kaldı." },
  { rating: 4, title: "Modern cihazlar", body: "Ağız içi tarayıcıyla ölçü alındı, röntgen aynı katta çekildi. Her şey tek yerde olunca başka yere gitmek gerekmiyor." },
  { rating: 5, title: "Engelli erişimi düşünülmüş", body: "Tekerlekli sandalye kullanan babamla gittik. Rampa ve asansör sorunsuzdu, tedavi odasında da yardımcı oldular." },
  { rating: 3, title: "Resepsiyon yoğun", body: "Hekimler ilgiliydi ama resepsiyonda işlemler biraz yavaş ilerledi. Sigorta evrakları için iki kez gitmem gerekti." },
  { rating: 4, title: "Çocuklar için hoş bir ortam", body: "Çocuk bekleme alanı oğlumun dikkatini dağıttı, içeri girerken ağlamadı. Personel çocuklara karşı sabırlı." },
  { rating: 5, title: "Hatırlatma mesajları çok iyi", body: "Kontrol zamanım geldiğinde mesaj geldi, randevumu da mesajla değiştirebildim. Pratik bir sistem kurmuşlar." },
];

const firstNames = ["Ayşe", "Mehmet", "Fatma", "Mustafa", "Emine", "Ahmet", "Hatice", "Ali", "Zehra", "Hüseyin", "Elif", "Hasan", "Merve", "İbrahim", "Esra", "Murat", "Seda", "Ömer", "Büşra", "Kemal", "Gül", "Sinan", "Ebru", "Tarık", "Nazlı", "Ozan", "Dilek", "Berk", "Sevgi", "Umut"];
const initials = "ABÇDEGHİKLMNÖPRSŞTUYZ";

function rng(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function pick<T>(items: T[], count: number, rand: () => number): T[] {
  const pool = [...items];
  const out: T[] = [];
  while (out.length < count && pool.length) out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
  return out;
}

function dateFor(rand: () => number) {
  // 2024-11 ile 2026-10 arası
  const start = Date.UTC(2024, 10, 1);
  const end = Date.UTC(2026, 9, 15);
  return new Date(start + rand() * (end - start));
}

function build(targetType: Review["targetType"], targetId: string, samples: Sample[], rand: () => number): Review[] {
  return samples.map((s, i) => {
    const created = dateFor(rand);
    const visit = new Date(created.getTime() - rand() * 1000 * 60 * 60 * 24 * 40);
    const name = `${firstNames[Math.floor(rand() * firstNames.length)]} ${initials[Math.floor(rand() * initials.length)]}.`;
    return {
      id: `ornek-${targetType}-${targetId}-${i + 1}`,
      targetType,
      targetId,
      userId: `ornek-kullanici-${Math.floor(rand() * 400)}`,
      authorName: name,
      rating: s.rating,
      title: s.title,
      body: s.body,
      treatment: s.treatment,
      visitDate: `${visit.getUTCFullYear()}-${String(visit.getUTCMonth() + 1).padStart(2, "0")}`,
      createdAt: created.toISOString(),
      status: "published",
      moderatedBy: "admin",
      moderatedAt: created.toISOString(),
      flags: [],
      isSample: true,
    };
  });
}

const doctorReviews = doctors.flatMap((d) => {
  const rand = rng(d.id);
  const count = 3 + Math.floor(rand() * 4);
  return build("doctor", d.id, pick(doctorPool[d.specialty], count, rand), rand);
});

const hospitalReviews = hospitals.flatMap((h) => {
  const rand = rng(h.id);
  const count = 4 + Math.floor(rand() * 4);
  return build("hospital", h.id, pick(hospitalPool, count, rand), rand);
});

// Moderasyon kuyruğunu göstermek için bekleyen örnekler.
const pendingSamples: Review[] = [
  {
    id: "ornek-bekleyen-1",
    targetType: "doctor",
    targetId: "can-yildirim",
    userId: "u-ornek-deniz",
    authorName: "Deniz A.",
    rating: 5,
    title: "Kanal tedavim çok rahat geçti",
    body: "Kanal tedavisinden çok korkuyordum ama hiçbir şey hissetmedim. İşlem sonrası verilen bilgilendirme de çok faydalıydı, herkese tavsiye ederim.",
    treatment: "kanal",
    visitDate: "2026-09",
    createdAt: "2026-10-18T09:12:00.000Z",
    status: "pending",
    flags: [],
    isSample: true,
  },
  {
    id: "ornek-bekleyen-2",
    targetType: "hospital",
    targetId: "dentaris",
    userId: "u-ornek-reklam",
    authorName: "Kampanya D.",
    rating: 5,
    title: "En ucuz implant burada değil!",
    body: "Bu fiyatlara implant yaptırmayın, www.ucuzimplant-ornek.com adresinde %50 indirim kampanyası var, hemen DM atın @ucuzimplant",
    createdAt: "2026-10-19T14:40:00.000Z",
    status: "pending",
    flags: [
      { type: "reklam", match: "www.ucuzimplant-ornek.com", label: "Bağlantı (URL)" },
      { type: "reklam", match: "indirim kampanyası", label: "Reklam ifadesi" },
      { type: "reklam", match: "@ucuzimplant", label: "Sosyal medya kullanıcı adı" },
    ],
    isSample: true,
  },
  {
    id: "ornek-bekleyen-3",
    targetType: "doctor",
    targetId: "oguz-yavuz",
    userId: "u-ornek-ofkeli",
    authorName: "Serdar K.",
    rating: 1,
    title: "BERBAT!!!!!!",
    body: "BERBAT BİR DENEYİMDİ, HEKİM TAM BİR BECERİKSİZ!!!!!! Sakın gitmeyin, randevu saatinde içeri alınmadım bile.",
    createdAt: "2026-10-20T07:55:00.000Z",
    status: "pending",
    flags: [
      { type: "hakaret", match: "beceriksiz", label: "Hakaret içeren ifade" },
      { type: "spam", match: "!!!!!!", label: "Tekrarlanan karakter" },
      { type: "spam", match: "BERBAT BİR DENEYİMDİ", label: "Tamamı büyük harf" },
    ],
    isSample: true,
  },
  {
    id: "ornek-bekleyen-4",
    targetType: "hospital",
    targetId: "sedef",
    userId: "u-ornek-selin",
    authorName: "Selin T.",
    rating: 4,
    title: "Kısa bekleme süresi",
    body: "Randevu saatinde içeri alındım ve muayene için yeterince zaman ayrıldı. Klinik merkezi bir yerde ama binanın asansörü küçük.",
    visitDate: "2026-10",
    createdAt: "2026-10-20T16:20:00.000Z",
    status: "pending",
    flags: [],
    isSample: true,
  },
];

export const sampleReviews: Review[] = [...doctorReviews, ...hospitalReviews, ...pendingSamples];
