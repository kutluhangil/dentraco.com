export type SpecialtyId =
  | "cerrahi"
  | "radyoloji"
  | "endodonti"
  | "ortodonti"
  | "pedodonti"
  | "periodontoloji"
  | "protetik"
  | "restoratif"
  | "genel";

export type Title = "Dt." | "Uzm. Dt." | "Dr. Dt." | "Dr. Öğr. Üyesi" | "Doç. Dr." | "Prof. Dr.";

export type TreatmentId =
  | "muayene"
  | "dolgu"
  | "kanal"
  | "dis-tasi"
  | "beyazlatma"
  | "implant"
  | "ortodonti"
  | "seffaf-plak"
  | "protez"
  | "zirkonyum"
  | "lamina"
  | "cekim"
  | "yirmilik"
  | "dis-eti"
  | "cocuk"
  | "fissur"
  | "radyoloji"
  | "gulus-tasarimi"
  | "bruksizm"
  | "acil";

export interface Specialty {
  id: SpecialtyId;
  name: string;
  short: string;
  practitioner: string;
  description: string;
}

export interface Treatment {
  id: TreatmentId;
  name: string;
  specialties: SpecialtyId[];
}

export interface OpeningHours {
  days: string;
  hours: string;
}

export interface Hospital {
  id: string;
  slug: string;
  name: string;
  type: "Diş Hastanesi" | "Ağız ve Diş Sağlığı Merkezi" | "Diş Polikliniği" | "Diş Kliniği";
  city: string;
  district: string;
  /** Semt (ör. Balat); filtrelerde ve kısa konum gösteriminde kullanılır. */
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  coords: [number, number];
  founded: number;
  chairs: number;
  summary: string;
  about: string[];
  treatments: TreatmentId[];
  amenities: string[];
  hours: OpeningHours[];
  uniformColor: string;
  shade: string;
  image: string;
  interiorImage: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  start: number;
  end: number;
  note?: string;
}

export interface ExperienceItem {
  role: string;
  place: string;
  start: number;
  end: number | null;
  detail?: string;
}

export interface CertificateItem {
  name: string;
  issuer: string;
  year: number;
}

export interface Doctor {
  id: string;
  slug: string;
  title: Title;
  firstName: string;
  lastName: string;
  gender: "kadın" | "erkek";
  specialty: SpecialtyId;
  hospitalId: string;
  birthYear: number;
  graduationYear: number;
  languages: string[];
  headline: string;
  about: string[];
  education: EducationItem[];
  thesis?: string;
  experience: ExperienceItem[];
  certificates: CertificateItem[];
  memberships: string[];
  publications: string[];
  focus: TreatmentId[];
  workingDays: string[];
  appearance: string;
  image: string;
}

export type ReviewStatus = "pending" | "published" | "rejected";
export type TargetType = "doctor" | "hospital";

export type FlagType = "hakaret" | "reklam" | "spam" | "kisisel_veri";

export interface ModerationFlag {
  type: FlagType;
  match: string;
  label: string;
}

export interface Review {
  id: string;
  targetType: TargetType;
  targetId: string;
  userId: string;
  authorName: string;
  rating: number;
  title: string;
  body: string;
  treatment?: TreatmentId;
  visitDate?: string;
  createdAt: string;
  status: ReviewStatus;
  rejectReason?: string;
  moderatedBy?: string;
  moderatedAt?: string;
  flags: ModerationFlag[];
  isSample: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  reviewerId: string;
  updatedAt: string;
  readingMinutes: number;
  cover: string;
  body: string;
  sources: { label: string; url: string }[];
  published: boolean;
}

export type Role = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
  suspended: boolean;
}

export interface ToothInfo {
  fdi: number;
  name: string;
  kind: "kesici" | "köpek" | "küçük azı" | "büyük azı" | "yirmi yaş";
  primary: boolean;
  concerns: string[];
  treatments: TreatmentId[];
  specialties: SpecialtyId[];
}
