import type { Article } from "@/lib/types";

export const articlesPart2: Article[] = [
  {
    id: "implant",
    slug: "implant",
    title: "İmplant: kimlere uygun, süreç nasıl işliyor?",
    summary:
      "İmplant, eksik dişi kökünden yerine koyan bir tedavidir. Kimlere uygun olduğunu, tedavinin aşamalarını, iyileşme süresini ve implantın uzun ömürlü olması için gerekenleri anlattık.",
    category: "Tedaviler",
    reviewerId: "haluk-erdem",
    updatedAt: "2026-06-30",
    readingMinutes: 8,
    cover: "/images/rehber/implant.webp",
    published: true,
    sources: [
      { label: "International Team for Implantology (ITI)", url: "https://www.iti.org/" },
      { label: "Avrupa Periodontoloji Federasyonu — Peri-implant diseases", url: "https://www.efp.org/" },
      { label: "Türk Dişhekimleri Birliği", url: "https://www.tdb.org.tr/" },
    ],
    body: `Dental implant, çene kemiğine yerleştirilen ve kaybedilen dişin kökü görevini üstlenen, genellikle titanyum ya da zirkonyumdan yapılmış küçük bir vidadır. Kemikle kaynaştıktan sonra üzerine kron, köprü ya da protez takılır. Doğru planlandığında implantlar uzun yıllar sorunsuz kullanılabilir.

## Kimler implant yaptırabilir?

Bir ya da birden çok dişi eksik olan, çene gelişimi tamamlanmış ve genel sağlığı küçük bir cerrahi işleme uygun olan çoğu yetişkin implant için değerlendirilebilir. Karar verirken şunlara bakılır:

- **Kemik miktarı ve kalitesi:** Dental tomografi ile ölçülür. Yetersizse kemik grefti ya da sinüs yükseltme gerekebilir.
- **Diş eti sağlığı:** Aktif diş eti hastalığı implanttan önce tedavi edilmelidir.
- **Genel sağlık:** Kontrolsüz diyabet, bazı kemik ilaçlarının kullanımı (örneğin bazı bifosfonatlar), baş-boyun bölgesine radyoterapi gibi durumlar ek değerlendirme gerektirir.
- **Sigara:** İyileşmeyi ve uzun dönem başarıyı olumsuz etkiler.

## Tedavi aşamaları

1. **Muayene ve planlama:** Ağız içi muayene, panoramik röntgen ve çoğu durumda tomografi ile implantın konumu, boyutu ve protezin nasıl görüneceği birlikte planlanır.
2. **Hazırlık:** Gerekirse diş çekimi, diş eti tedavisi ya da kemik grefti yapılır.
3. **İmplant cerrahisi:** Lokal anestezi altında diş eti açılır, kemiğe yuva hazırlanır ve implant yerleştirilir. Tek bir implant için işlem çoğu zaman bir saatten kısa sürer.
4. **İyileşme (osseointegrasyon):** İmplantın kemikle kaynaşması genellikle **2–6 ay** sürer. Bu süre kemik kalitesine ve bölgeye göre değişir. Estetik bölgede geçici diş kullanılabilir.
5. **Protez aşaması:** İmplantın üzerine bağlantı parçası (abutment) takılır, ölçü alınır ve kalıcı kron ya da köprü yerleştirilir.

Uygun vakalarda implant, çekimle aynı seansta (immediat implant) yerleştirilebilir ya da implant üzerine kısa sürede geçici diş takılabilir. Bu seçenekler her hasta için uygun değildir ve kemik koşullarına bağlıdır.

## Ameliyat sonrası

- İlk gün soğuk uygulama şişliği azaltır.
- Hekiminizin önerdiği ağrı kesici ve gargaraları kullanın; antibiyotik gerekip gerekmediğine hekim karar verir.
- İlk günlerde sıcak ve sert yiyeceklerden, sigaradan ve ağır egzersizden kaçının.
- Dikiş varsa genellikle 7–14 gün içinde alınır.

## İmplant ömrü ve bakımı

İmplantın kendisi çürümez ama çevresindeki diş eti ve kemik iltihaplanabilir. **Peri-implant mukozit** geri dönüşlüdür; tedavi edilmezse kemik kaybıyla seyreden **peri-implantitise** ilerleyebilir. Bunu önlemek için:

- İmplant çevresini doğal dişler kadar özenle fırçalayın; ara yüz fırçası ya da su jeti kullanın.
- Düzenli kontrollere ve profesyonel temizliğe gidin.
- Diş sıkma alışkanlığınız varsa gece plağı kullanın.
- Sigarayı bırakın.

## Alternatifler

İmplant her zaman tek seçenek değildir. Köprü, hareketli bölümlü protez ya da bazı durumlarda boşluğun ortodontik olarak kapatılması da değerlendirilebilir. Hekiminiz avantaj ve dezavantajları sizinle birlikte tartışmalıdır.

> Bu yazı genel bilgilendirme amaçlıdır. Size uygun tanı ve tedavi için diş hekiminize başvurun.`,
  },
  {
    id: "ortodonti",
    slug: "ortodonti",
    title: "Ortodonti: tel, şeffaf plak ve doğru zamanlama",
    summary:
      "Çapraşık dişler yalnızca estetik bir konu değildir. Ortodontik tedaviye ne zaman başlanmalı, tel ile şeffaf plak arasındaki farklar neler ve tedavi bittikten sonra neden pekiştirme gerekir?",
    category: "Tedaviler",
    reviewerId: "zeynep-kaya",
    updatedAt: "2026-10-02",
    readingMinutes: 7,
    cover: "/images/rehber/ortodonti.webp",
    published: true,
    sources: [
      { label: "American Association of Orthodontists", url: "https://aaoinfo.org/" },
      { label: "British Orthodontic Society", url: "https://www.bos.org.uk/" },
      { label: "Türk Ortodonti Derneği", url: "https://www.tdb.org.tr/" },
    ],
    body: `Ortodonti, dişlerin ve çenelerin konum bozukluklarını tanılayıp tedavi eden diş hekimliği uzmanlık dalıdır. Çapraşık ya da aralıklı dişler temizlemeyi zorlaştırarak çürük ve diş eti hastalığı riskini artırabilir; ısırma bozuklukları dişlerde aşınmaya ve çene ekleminde zorlanmaya yol açabilir.

## Ne zaman başvurmalı?

Uluslararası ortodonti dernekleri çocukların **7 yaş civarında** bir ortodontist tarafından değerlendirilmesini öneriyor. Bu yaşta tedaviye mutlaka başlanmaz; ancak çene gelişimindeki sorunlar ve yer darlığı erkenden fark edilir, en uygun tedavi zamanı planlanır.

Erken (interseptif) tedavi gerektirebilecek durumlar:

- Çapraz kapanış (üst dişlerin alttakilerin içinde kalması)
- Belirgin alt ya da üst çene önde/geride olması
- Parmak emme, ağız solunumu gibi alışkanlıklara bağlı bozukluklar
- Süt dişlerinin erken kaybına bağlı yer kaybı

Yetişkinlerde ise ortodontik tedavi için üst yaş sınırı yoktur; diş eti ve kemik sağlığı uygun olduğu sürece tedavi yapılabilir.

## Tedavi seçenekleri

**Sabit braketler (tel):** Dişlere yapıştırılan metal ya da seramik braketler ve bunlardan geçen tellerle dişler hareket ettirilir. Karmaşık vakalarda en geniş kontrolü sağlar. Seramik braketler daha az fark edilir.

**Şeffaf plaklar:** Dijital planlamayla üretilen, her biri dişleri küçük adımlarla hareket ettiren çıkarılabilir plaklar serisidir. Estetik ve hijyen açısından avantajlıdır; ancak **günde 20–22 saat** takılmadıklarında planlanan hareket gerçekleşmez. Her vaka şeffaf plak için uygun değildir.

**Lingual braketler:** Dişlerin iç yüzüne yapıştırıldığı için dışarıdan görünmez; konuşmaya alışma süreci olabilir.

**Fonksiyonel apareyler:** Büyüme dönemindeki çocuklarda çene gelişimini yönlendirmek için kullanılır.

Bazı iskeletsel bozukluklarda yetişkinlerde ortodonti tek başına yetmez; çene cerrahisi ile birlikte (ortognatik cerrahi) planlama gerekebilir.

## Tedavi ne kadar sürer?

Süre vakanın karmaşıklığına, hastanın yaşına ve tedaviye uyuma göre değişir; çoğu kapsamlı tedavi **12–30 ay** arasında tamamlanır. Kontroller genellikle 4–8 haftada bir yapılır.

## Tedavi sırasında dikkat edilecekler

- Braketler plak birikimini artırır; her yemekten sonra fırçalama ve ara yüz fırçası kullanımı önemlidir.
- Sert ve yapışkan gıdalar braketleri kırabilir.
- Tel takıldıktan ya da sıkıldıktan sonraki birkaç gün dişlerde hassasiyet normaldir.
- Şeffaf plak kullananlar su dışında bir şey içmeden önce plakları çıkarmalıdır.

## Pekiştirme (retansiyon)

Dişler tedavi bittikten sonra eski konumlarına dönme eğilimindedir. Bu nedenle tedavi sonunda dişlerin arka yüzüne ince bir sabit tel yapıştırılır ve/veya gece takılan şeffaf pekiştirme plağı verilir. Pekiştirmenin süresi kişiye göre değişir ve çoğu zaman uzun yıllar sürdürülmesi önerilir.

> Bu yazı genel bilgilendirme amaçlıdır. Size uygun tanı ve tedavi için diş hekiminize başvurun.`,
  },
  {
    id: "agiz-hijyeni",
    slug: "agiz-hijyeni",
    title: "Ağız hijyeni: doğru fırçalama, diş ipi ve macun seçimi",
    summary:
      "Ne kadar süre fırçalamalı, sert fırça daha mı iyi temizler, gargara şart mı? Günlük ağız bakımında en çok merak edilenleri bilimsel önerilerle yanıtladık.",
    category: "Koruyucu",
    reviewerId: "elif-arslan",
    updatedAt: "2026-10-10",
    readingMinutes: 6,
    cover: "/images/rehber/agiz-hijyeni.webp",
    published: true,
    sources: [
      { label: "NHS — How to keep your teeth clean", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/how-to-keep-your-teeth-clean/" },
      { label: "NHS — Fluoride", url: "https://www.nhs.uk/conditions/fluoride/" },
      { label: "Dünya Sağlık Örgütü — Oral health", url: "https://www.who.int/news-room/fact-sheets/detail/oral-health" },
    ],
    body: `Ağız hastalıklarının büyük bölümü, her gün birkaç dakika ayırarak yapılan doğru bakımla önlenebilir. Aşağıdaki öneriler çoğu yetişkin için geçerlidir; özel bir durumunuz varsa (diş eti hastalığı, ortodontik tel, implant, protez) hekiminiz size özel bir program önerebilir.

## Fırçalama

- **Günde iki kez**, biri gece yatmadan önce olmak üzere fırçalayın.
- Her fırçalama yaklaşık **iki dakika** sürmeli.
- Fırçayı diş eti kenarına yaklaşık 45 derece açıyla yerleştirin, küçük dairesel ya da titreşim hareketleriyle tüm yüzeyleri temizleyin.
- Bastırmayın. Sert fırça ve kuvvetli baskı diş eti çekilmesine ve kök yüzeyinde aşınmaya yol açabilir. **Yumuşak ya da orta sertlikte** fırça çoğu kişi için uygundur.
- Fırçanızı ya da elektrikli fırça başlığınızı yaklaşık **üç ayda bir** ya da kılları açıldığında değiştirin.
- Elektrikli ve manuel fırça, doğru kullanıldığında ikisi de etkilidir; elektrikli fırça bazı kişilerde tekniği kolaylaştırabilir.

## Diş macunu

- **Florürlü** macun kullanın. Yetişkinler için genellikle **1350–1500 ppm** florür içeren macunlar önerilir.
- Fırçaladıktan sonra macunu tükürün ama **ağzınızı suyla çalkalamayın**; florürün diş yüzeyinde kalması koruyucu etkisini artırır.
- Beyazlatıcı macunlar yalnızca yüzeysel lekeleri azaltabilir; dişin doğal rengini değiştirmez.

## Diş arası temizliği

Fırça, diş aralarına tam olarak ulaşamaz. Günde bir kez:

- Dar aralıklarda **diş ipi**,
- Daha geniş aralıklarda, köprü ve implant çevresinde **ara yüz fırçası** kullanın.

Doğru ara yüz fırçası boyutunu hekiminize ya da diş hijyenistine sorabilirsiniz. Başlangıçta biraz kanama olabilir; düzenli kullanımla birkaç hafta içinde azalması beklenir.

## Dil temizliği ve gargara

Dilin üst yüzeyi ağız kokusuna neden olan bakterilere ev sahipliği yapabilir; dil temizleyici ya da fırçayla nazikçe temizlenebilir.

Gargaralar fırçalama ve ara yüz temizliğinin yerini tutmaz. Florürlü gargara, çürük riski yüksek kişilerde fırçalamadan farklı bir saatte kullanılabilir. Klorheksidinli gargaralar genellikle kısa süreli ve hekim önerisiyle kullanılmalıdır; uzun kullanımda dişlerde renklenme yapabilir.

## Beslenme

- Şekerli yiyecek ve içecekleri ana öğünlerle sınırlayın; Dünya Sağlık Örgütü serbest şeker tüketiminin günlük enerjinin %10'undan, mümkünse %5'inden az olmasını öneriyor.
- Asitli içecekleri (gazlı içecekler, meyve suları) pipetle ve kısa sürede tüketin; hemen ardından fırçalamak yerine 30–60 dakika bekleyin.
- Susadığınızda su için.

## Kontroller

Sorun hissetmeseniz bile, risk durumunuza göre hekiminizin önerdiği aralıklarla kontrole gidin. Çürük ve diş eti hastalıklarının çoğu erken evrede ağrısızdır.

> Bu yazı genel bilgilendirme amaçlıdır. Size uygun tanı ve tedavi için diş hekiminize başvurun.`,
  },
  {
    id: "koruyucu-dis-hekimligi",
    slug: "koruyucu-dis-hekimligi",
    title: "Koruyucu diş hekimliği: çocukluktan başlayan önlemler",
    summary:
      "Flor vernik, fissür örtücü, düzenli kontrol ve doğru beslenme alışkanlıkları çürüklerin büyük bölümünü önleyebilir. Çocuklar ve yetişkinler için koruyucu uygulamaları bir araya getirdik.",
    category: "Koruyucu",
    reviewerId: "pinar-koc",
    updatedAt: "2026-09-05",
    readingMinutes: 6,
    cover: "/images/rehber/koruyucu-dis-hekimligi.webp",
    published: true,
    sources: [
      { label: "NHS — Children's teeth", url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/" },
      { label: "Avrupa Çocuk Diş Hekimliği Akademisi (EAPD)", url: "https://www.eapd.eu/" },
      { label: "Dünya Sağlık Örgütü — Oral health", url: "https://www.who.int/news-room/fact-sheets/detail/oral-health" },
    ],
    body: `Koruyucu diş hekimliği, hastalık ortaya çıkmadan önce riski azaltmaya odaklanır. Çürük ve diş eti hastalıkları büyük ölçüde önlenebilir hastalıklardır; koruyucu uygulamalar hem ağrıyı hem de ileride gerekebilecek kapsamlı tedavileri azaltır.

## Bebeklik ve erken çocukluk

- **İlk diş muayenesi**, ilk süt dişi çıktığında ya da en geç bir yaş civarında yapılmalıdır.
- İlk diş çıktığı andan itibaren dişler günde iki kez fırçalanmalıdır.
- **3 yaş altında** pirinç tanesi kadar (sürme şeklinde), **3–6 yaş arasında** bezelye tanesi kadar florürlü macun kullanılması önerilir. Macun tükürülmeli, ağız çalkalanmamalıdır.
- Fırçalama, çocuk kendi başına etkili fırçalayabilecek yaşa (genellikle 7–8 yaş) gelene kadar ebeveyn tarafından yapılmalı ya da denetlenmelidir.
- Bebeği biberonla, özellikle şekerli içecek ya da sütle uyutmak **erken çocukluk çağı çürüklerinin** önemli bir nedenidir.

## Flor vernik

Florür, minenin asitlere karşı direncini artırır ve başlangıç çürüklerinin durdurulmasına yardımcı olur. Diş hekimi tarafından dişlere sürülen **flor vernik**, çürük riskine göre yılda iki ya da daha fazla kez uygulanabilir. İşlem ağrısızdır ve birkaç dakika sürer.

## Fissür örtücü

Arka dişlerin çiğneme yüzeylerindeki derin oluklar (fissürler) fırçanın ulaşamadığı ve çürüklerin sık başladığı alanlardır. **Fissür örtücüler**, bu olukları kapatan ince, akışkan bir materyaldir. Genellikle 6 yaş civarında sürmeye başlayan daimi birinci büyük azılara ve ardından ikinci büyük azılara uygulanır. Uygulama için uyuşturma ya da diş kesimi gerekmez. Örtücülerin kontrollerde gözden geçirilmesi gerekir.

## Beslenme alışkanlıkları

- Şekerli yiyecek ve içecekleri ana öğünlerle sınırlayın; gün içinde sık atıştırma çürük riskini artırır.
- Çocuklarda meyve suyu yerine su ve sade süt tercih edin.
- Yapışkan şekerlemeler ve kurutulmuş meyveler dişlere uzun süre tutunabilir.

## Spor ve travmadan korunma

Temas sporları yapan çocuk ve yetişkinler için kişiye özel hazırlanan **ağız koruyucular**, diş kırıklarını ve yerinden çıkmasını önlemeye yardımcı olur. Darbe sonucu yerinden çıkan daimi bir diş, kökünden tutmadan süt ya da tuzlu su içinde korunarak mümkün olan en kısa sürede diş hekimine götürülmelidir.

## Yetişkinlerde koruyucu yaklaşım

- Risk durumuna göre belirlenen aralıklarla kontrol ve profesyonel temizlik
- Diş eti çekilmesi olan yetişkinlerde kök çürüklerine karşı yüksek florürlü macun (hekim önerisiyle)
- Sigaranın bırakılması
- Ağız içinde iki haftadan uzun süren yara, beyaz ya da kırmızı lekelerin hekime gösterilmesi

> Bu yazı genel bilgilendirme amaçlıdır. Size uygun tanı ve tedavi için diş hekiminize başvurun.`,
  },
];
