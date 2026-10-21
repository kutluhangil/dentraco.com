const trMap: Record<string, string> = { ç: "c", ğ: "g", ı: "i", ö: "o", ş: "s", ü: "u", â: "a", î: "i", û: "u" };

// "İ".toLowerCase() Türkçe dışı yerel ayarda "i̇" üretir; tr-TR ile küçültüp aksanları sadeleştiriyoruz.
export function normalizeTr(input: string) {
  return input
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşüâîû]/g, (c) => trMap[c] ?? c)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesQuery(haystack: string[], query: string) {
  const q = normalizeTr(query);
  if (!q) return true;
  const text = normalizeTr(haystack.join(" "));
  return q.split(" ").every((part) => text.includes(part));
}
