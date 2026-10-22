import type { Doctor, Hospital } from "./types";

const ratingFormat = new Intl.NumberFormat("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Istanbul" });
const monthFormat = new Intl.DateTimeFormat("tr-TR", { month: "long", year: "numeric", timeZone: "UTC" });

export const CURRENT_YEAR = 2026;

/** Kısa konum: "Balat, Fatih". Semt girilmemiş eski kayıtlarda yalnızca ilçe döner. */
export function hospitalPlace(h: Pick<Hospital, "neighborhood" | "district">) {
  return [h.neighborhood, h.district].filter(Boolean).join(", ");
}

export function formatRating(value: number) {
  return ratingFormat.format(value);
}

export function formatDate(iso: string) {
  return dateFormat.format(new Date(iso));
}

export function formatMonth(yyyyMm: string) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return monthFormat.format(new Date(Date.UTC(y, m - 1, 1)));
}

export function doctorName(d: Pick<Doctor, "title" | "firstName" | "lastName">) {
  return `${d.title} ${d.firstName} ${d.lastName}`;
}

export function experienceYears(d: Pick<Doctor, "graduationYear">) {
  return CURRENT_YEAR - d.graduationYear;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(-2)
    .map((p) => p[0]?.toLocaleUpperCase("tr-TR"))
    .join("");
}

export function plural(count: number, word: string) {
  return `${count.toLocaleString("tr-TR")} ${word}`;
}

export function telHref(phone: string) {
  return `tel:+9${phone.replace(/\D/g, "")}`;
}
