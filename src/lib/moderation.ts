import type { FlagType, ModerationFlag } from "./types";

// Hakaret listesi kasıtlı olarak kısa tutuldu; gerçek kullanımda yönetici panelinden genişletilebilir.
// Kökler normalize edilmiş biçimdedir (Türkçe karakterler sadeleştirilmiş).
const insultStems = [
  "salak",
  "aptal",
  "gerizekali",
  "beceriksiz",
  "ahmak",
  "dangalak",
  "serefsiz",
  "yavsak",
  "haysiyetsiz",
  "kepaze",
  "rezil",
  "pislik",
  "adi herif",
  "hayvan herif",
  "sahtekar",
];
const insultExact = ["mal", "okuz", "hiyar"];

const adWords = [
  "indirim",
  "kampanya",
  "promosyon",
  "kupon",
  "dm at",
  "dmden",
  "whatsapp",
  "takip edin",
  "instagram",
  "telegram",
  "bedava",
  "en ucuz",
  "tikla",
];

const trMap: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u" };
const leet: Record<string, string> = { "0": "o", "1": "i", "3": "e", "4": "a", "5": "s", "7": "t", "@": "a", $: "s" };

function normalizeForInsults(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (c) => trMap[c] ?? c)
    .replace(/[013457@$]/g, (c) => leet[c] ?? c)
    .replace(/\b(\w)[.\-_*\s](?=\w\b)/g, "$1") // "s.a.l.a.k" → "salak"
    .replace(/(\w)\1{2,}/g, "$1"); // "salaaak" → "salak"
}

function tcknValid(digits: string) {
  if (!/^[1-9]\d{10}$/.test(digits)) return false;
  const d = digits.split("").map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  const d10 = (((odd * 7 - even) % 10) + 10) % 10;
  const d11 = d.slice(0, 10).reduce((a, b) => a + b, 0) % 10;
  return d10 === d[9] && d11 === d[10];
}

const patterns: { type: FlagType; label: string; re: RegExp; test?: (m: string) => boolean }[] = [
  { type: "kisisel_veri", label: "E-posta adresi", re: /[\w.+-]+@[\w-]+\.[\w.-]+/g },
  { type: "kisisel_veri", label: "IBAN", re: /\bTR\s?\d{2}(?:\s?\d{4}){5}\s?\d{2}\b/gi },
  {
    type: "kisisel_veri",
    label: "T.C. kimlik numarası",
    re: /\b\d{11}\b/g,
    test: (m) => tcknValid(m),
  },
  { type: "kisisel_veri", label: "Cep telefonu", re: /(?:\+?90[\s-]?)?\(?0?5\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g },
  { type: "kisisel_veri", label: "Sabit telefon", re: /\b0?[2-4]\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/g },
  { type: "reklam", label: "Bağlantı (URL)", re: /\b(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|net|org|info|biz|io|co)(?:\.tr)?\b/gi },
  { type: "reklam", label: "Sosyal medya kullanıcı adı", re: /(?:^|\s)@[a-z0-9_.]{3,}/gi },
  { type: "spam", label: "Tekrarlanan karakter", re: /(.)\1{4,}/g },
];

export function moderate(text: string, previousBodies: string[] = []): ModerationFlag[] {
  const flags: ModerationFlag[] = [];
  const seen = new Set<string>();
  const push = (f: ModerationFlag) => {
    const key = `${f.type}:${f.match.toLocaleLowerCase("tr-TR")}`;
    if (seen.has(key)) return;
    seen.add(key);
    flags.push(f);
  };

  const emailRanges: string[] = [];
  for (const p of patterns) {
    for (const m of text.matchAll(p.re)) {
      const match = m[0].trim();
      if (p.test && !p.test(match)) continue;
      // E-posta içindeki alan adını ayrıca reklam olarak işaretleme.
      if (p.label === "E-posta adresi") emailRanges.push(match);
      if (p.type === "reklam" && emailRanges.some((e) => e.includes(match.replace(/^@/, "")))) continue;
      push({ type: p.type, match, label: p.label });
    }
  }

  const normalized = normalizeForInsults(text);
  for (const stem of insultStems) {
    const re = new RegExp(`\\b${stem}\\w*`, "g");
    for (const m of normalized.matchAll(re)) push({ type: "hakaret", match: m[0], label: "Hakaret içeren ifade" });
  }
  for (const word of insultExact) {
    const re = new RegExp(`(?:^|[^\\w])(${word})(?=$|[^\\w])`, "g");
    for (const m of normalized.matchAll(re)) push({ type: "hakaret", match: m[1], label: "Hakaret içeren ifade" });
  }

  const lower = normalizeForInsults(text);
  for (const w of adWords) {
    if (lower.includes(w)) push({ type: "reklam", match: w, label: "Reklam ifadesi" });
  }

  const letters = text.replace(/[^a-zA-ZçğıöşüÇĞİÖŞÜ]/g, "");
  const upper = text.replace(/[^A-ZÇĞİÖŞÜ]/g, "");
  if (letters.length >= 20 && upper.length / letters.length > 0.6) {
    const run = text.match(/[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ\s,]{10,}/);
    push({ type: "spam", match: (run?.[0] ?? text.slice(0, 30)).trim(), label: "Tamamı büyük harf" });
  }

  const compact = (s: string) => s.toLocaleLowerCase("tr-TR").replace(/\s+/g, " ").trim();
  if (previousBodies.some((b) => compact(b) === compact(text))) {
    push({ type: "spam", match: text.slice(0, 40), label: "Aynı içerik daha önce gönderilmiş" });
  }

  return flags;
}

export function hasBlockingFlags(flags: ModerationFlag[]) {
  return flags.some((f) => f.type === "kisisel_veri");
}

export function maskText(text: string, flags: ModerationFlag[]) {
  let out = text;
  for (const f of flags) {
    if (f.type === "spam" && f.label !== "Tekrarlanan karakter") continue;
    const escaped = f.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(escaped, "gi"), (m) => (f.type === "spam" ? m[0] : "•".repeat(Math.min(m.length, 8))));
  }
  return out;
}

export const flagTypeLabel: Record<FlagType, string> = {
  hakaret: "Hakaret",
  reklam: "Reklam",
  spam: "Spam",
  kisisel_veri: "Kişisel veri",
};
