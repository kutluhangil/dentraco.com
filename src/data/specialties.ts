import type { Specialty, SpecialtyId, Treatment, TreatmentId } from "@/lib/types";

export const specialties: Specialty[] = [
  {
    id: "genel",
    name: "Genel Diş Hekimliği",
    short: "Genel",
    practitioner: "Diş Hekimi",
    description: "Muayene, dolgu, diş taşı temizliği ve koruyucu uygulamalar gibi temel tedaviler.",
  },
  {
    id: "endodonti",
    name: "Endodonti",
    short: "Endodonti",
    practitioner: "Endodontist",
    description: "Diş pulpası (sinir) ve kök kanalı hastalıklarının tanısı ve tedavisi.",
  },
  {
    id: "ortodonti",
    name: "Ortodonti",
    short: "Ortodonti",
    practitioner: "Ortodontist",
    description: "Diş ve çene düzensizliklerinin tel, şeffaf plak ve apareylerle düzeltilmesi.",
  },
  {
    id: "periodontoloji",
    name: "Periodontoloji",
    short: "Periodontoloji",
    practitioner: "Periodontolog",
    description: "Diş eti ve dişi destekleyen dokuların hastalıkları; diş eti cerrahisi.",
  },
  {
    id: "protetik",
    name: "Protetik Diş Tedavisi",
    short: "Protez",
    practitioner: "Protez Uzmanı",
    description: "Eksik dişlerin kron, köprü, implant üstü ve hareketli protezlerle yerine konması.",
  },
  {
    id: "restoratif",
    name: "Restoratif Diş Tedavisi",
    short: "Restoratif",
    practitioner: "Restoratif Diş Tedavisi Uzmanı",
    description: "Çürük ve kırık dişlerin estetik dolgu, inley/onley ve laminalarla onarılması.",
  },
  {
    id: "cerrahi",
    name: "Ağız, Diş ve Çene Cerrahisi",
    short: "Cerrahi",
    practitioner: "Çene Cerrahı",
    description: "Diş çekimi, gömülü diş operasyonları, implant cerrahisi ve kemik grefti.",
  },
  {
    id: "pedodonti",
    name: "Pedodonti",
    short: "Çocuk",
    practitioner: "Çocuk Diş Hekimi",
    description: "0–14 yaş arası çocukların süt ve daimi dişlerinin bakımı ve tedavisi.",
  },
  {
    id: "radyoloji",
    name: "Ağız, Diş ve Çene Radyolojisi",
    short: "Radyoloji",
    practitioner: "Radyolog",
    description: "Panoramik röntgen, dental tomografi ve ağız içi lezyonların teşhisi.",
  },
];

export const specialtyById = Object.fromEntries(specialties.map((s) => [s.id, s])) as Record<
  SpecialtyId,
  Specialty
>;

export const treatments: Treatment[] = [
  { id: "muayene", name: "Muayene ve kontrol", specialties: ["genel", "radyoloji"] },
  { id: "dolgu", name: "Kompozit dolgu", specialties: ["restoratif", "genel", "pedodonti"] },
  { id: "kanal", name: "Kanal tedavisi", specialties: ["endodonti", "genel"] },
  { id: "dis-tasi", name: "Diş taşı temizliği", specialties: ["periodontoloji", "genel"] },
  { id: "beyazlatma", name: "Diş beyazlatma", specialties: ["restoratif", "genel"] },
  { id: "implant", name: "İmplant", specialties: ["cerrahi", "periodontoloji", "protetik"] },
  { id: "ortodonti", name: "Telli ortodonti", specialties: ["ortodonti"] },
  { id: "seffaf-plak", name: "Şeffaf plak", specialties: ["ortodonti"] },
  { id: "protez", name: "Hareketli protez", specialties: ["protetik"] },
  { id: "zirkonyum", name: "Zirkonyum kron", specialties: ["protetik", "restoratif"] },
  { id: "lamina", name: "Porselen lamina", specialties: ["protetik", "restoratif"] },
  { id: "cekim", name: "Diş çekimi", specialties: ["cerrahi", "genel"] },
  { id: "yirmilik", name: "Gömülü 20 yaş dişi", specialties: ["cerrahi"] },
  { id: "dis-eti", name: "Diş eti tedavisi", specialties: ["periodontoloji"] },
  { id: "cocuk", name: "Çocuk diş tedavisi", specialties: ["pedodonti"] },
  { id: "fissur", name: "Fissür örtücü ve flor", specialties: ["pedodonti", "genel"] },
  { id: "radyoloji", name: "Panoramik röntgen ve tomografi", specialties: ["radyoloji"] },
  { id: "gulus-tasarimi", name: "Gülüş tasarımı", specialties: ["restoratif", "protetik"] },
  { id: "bruksizm", name: "Diş sıkma ve gece plağı", specialties: ["protetik", "cerrahi"] },
  { id: "acil", name: "Acil diş ağrısı", specialties: ["genel", "endodonti"] },
];

export const treatmentById = Object.fromEntries(treatments.map((t) => [t.id, t])) as Record<
  TreatmentId,
  Treatment
>;
