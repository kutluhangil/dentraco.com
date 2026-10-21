import type { SpecialtyId, ToothInfo, TreatmentId } from "@/lib/types";

// FDI iki haneli sistem: ilk hane çeyrek (1 üst sağ, 2 üst sol, 3 alt sol, 4 alt sağ;
// süt dişlerinde 5–8), ikinci hane orta hattan itibaren sıra.
const quadrantName: Record<number, string> = {
  1: "Üst sağ",
  2: "Üst sol",
  3: "Alt sol",
  4: "Alt sağ",
  5: "Üst sağ",
  6: "Üst sol",
  7: "Alt sol",
  8: "Alt sağ",
};

const permanentNames = [
  "orta kesici",
  "yan kesici",
  "köpek dişi",
  "birinci küçük azı",
  "ikinci küçük azı",
  "birinci büyük azı",
  "ikinci büyük azı",
  "üçüncü büyük azı (20 yaş)",
];

const primaryNames = ["süt orta kesici", "süt yan kesici", "süt köpek dişi", "süt birinci azı", "süt ikinci azı"];

type Profile = Pick<ToothInfo, "kind" | "concerns" | "treatments" | "specialties">;

const profiles: Record<ToothInfo["kind"], Profile> = {
  kesici: {
    kind: "kesici",
    concerns: ["Renk değişimi", "Kırık veya aşınma", "Çapraşıklık", "Aralık (diastema)"],
    treatments: ["dolgu", "lamina", "beyazlatma", "seffaf-plak", "gulus-tasarimi"],
    specialties: ["restoratif", "ortodonti", "protetik"],
  },
  köpek: {
    kind: "köpek",
    concerns: ["Gömülü kalma", "Diş eti çekilmesi", "Sıralama bozukluğu"],
    treatments: ["ortodonti", "dis-eti", "dolgu", "zirkonyum"],
    specialties: ["ortodonti", "periodontoloji", "restoratif"],
  },
  "küçük azı": {
    kind: "küçük azı",
    concerns: ["Ara yüz çürükleri", "Hassasiyet", "Diş eti çekilmesi"],
    treatments: ["dolgu", "kanal", "zirkonyum", "dis-eti"],
    specialties: ["restoratif", "endodonti", "periodontoloji"],
  },
  "büyük azı": {
    kind: "büyük azı",
    concerns: ["Derin çürük", "Zonklayan ağrı", "Kırık dolgu", "Diş kaybı"],
    treatments: ["kanal", "dolgu", "zirkonyum", "implant", "cekim"],
    specialties: ["endodonti", "restoratif", "cerrahi", "protetik"],
  },
  "yirmi yaş": {
    kind: "yirmi yaş",
    concerns: ["Gömülü veya yarı gömülü diş", "Perikoronit (diş eti iltihabı)", "Komşu dişe baskı"],
    treatments: ["yirmilik", "cekim", "radyoloji"],
    specialties: ["cerrahi", "radyoloji"],
  },
};

const primaryProfile: Profile = {
  kind: "büyük azı",
  concerns: ["Süt dişi çürüğü", "Erken diş kaybı", "Diş fırçalama alışkanlığı"],
  treatments: ["cocuk", "fissur", "dolgu"],
  specialties: ["pedodonti"],
};

function kindFor(position: number): ToothInfo["kind"] {
  if (position <= 2) return "kesici";
  if (position === 3) return "köpek";
  if (position <= 5) return "küçük azı";
  if (position <= 7) return "büyük azı";
  return "yirmi yaş";
}

function build(quadrant: number, position: number): ToothInfo {
  const primary = quadrant >= 5;
  const fdi = quadrant * 10 + position;
  if (primary) {
    const kind: ToothInfo["kind"] = position <= 2 ? "kesici" : position === 3 ? "köpek" : "büyük azı";
    return {
      fdi,
      name: `${quadrantName[quadrant]} ${primaryNames[position - 1]}`,
      primary,
      ...primaryProfile,
      kind,
    };
  }
  const kind = kindFor(position);
  return {
    fdi,
    name: `${quadrantName[quadrant]} ${permanentNames[position - 1]}`,
    primary,
    ...profiles[kind],
  };
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1);

export const permanentTeeth: ToothInfo[] = [1, 2, 3, 4].flatMap((q) => range(8).map((p) => build(q, p)));
export const primaryTeeth: ToothInfo[] = [5, 6, 7, 8].flatMap((q) => range(5).map((p) => build(q, p)));

export const gumArea: { name: string; concerns: string[]; treatments: TreatmentId[]; specialties: SpecialtyId[] } = {
  name: "Diş eti",
  concerns: ["Fırçalarken kanama", "Şişlik ve kızarıklık", "Ağız kokusu", "Diş eti çekilmesi"],
  treatments: ["dis-tasi", "dis-eti", "implant"],
  specialties: ["periodontoloji"],
};
