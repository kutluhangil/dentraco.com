/**
 * Girişten sonra dönülecek adres yalnızca site içi bir yol olabilir.
 * "//evil.com" ve "/\evil.com" tarayıcıda başka bir siteye gider; ikisi de reddedilir.
 */
export function safeNext(next: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return null;
  return next;
}

/** Admin'in girdiği kaynak linkleri: yalnızca http(s) adresleri link olur, "javascript:" gibi şemalar düz metin kalır. */
export function safeHttpUrl(url: string) {
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.href : null;
  } catch {
    return null;
  }
}
