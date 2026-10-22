import { describe, expect, it } from "vitest";
import { safeHttpUrl, safeNext } from "@/lib/url";

describe("safeNext", () => {
  it("site içi yolları kabul eder", () => {
    expect(safeNext("/doktorlar/elif-arslan#yorumlar")).toBe("/doktorlar/elif-arslan#yorumlar");
  });

  it("başka siteye giden adresleri reddeder", () => {
    for (const bad of [null, "", "https://evil.com", "//evil.com", "/\\evil.com", "javascript:alert(1)"]) {
      expect(safeNext(bad)).toBeNull();
    }
  });
});

describe("safeHttpUrl", () => {
  it("http(s) adreslerini geçirir", () => {
    expect(safeHttpUrl("https://www.who.int/news-room")).toBe("https://www.who.int/news-room");
  });

  it("tehlikeli şemaları ve bozuk adresleri reddeder", () => {
    for (const bad of ["javascript:alert(1)", " JavaScript:alert(1)", "data:text/html,x", "www.who.int", ""]) {
      expect(safeHttpUrl(bad)).toBeNull();
    }
  });
});
