import { describe, expect, it } from "vitest";
import { summarize, weightedScore } from "@/lib/rating";
import { matchesQuery, normalizeTr } from "@/lib/search";
import { slugify } from "@/lib/slug";
import type { Review } from "@/lib/types";

const r = (rating: number, status: Review["status"] = "published") =>
  ({ rating, status, targetType: "doctor", targetId: "x" }) as Review;

describe("summarize", () => {
  it("yalnızca yayımlanmış yorumları sayar", () => {
    const s = summarize([r(5), r(4), r(1, "pending"), r(2, "rejected")]);
    expect(s.count).toBe(2);
    expect(s.average).toBe(4.5);
    expect(s.distribution).toEqual([0, 0, 0, 1, 1]);
  });

  it("az yorumlu profilleri ortalamaya çeker", () => {
    expect(weightedScore(summarize([r(5)]))).toBeLessThan(weightedScore(summarize([r(5), r(5), r(5), r(5), r(5), r(4)])));
  });
});

describe("türkçe arama", () => {
  it("İ/ı/ş farklarını tolere eder", () => {
    expect(normalizeTr("İSTANBUL Şişli Işık")).toBe("istanbul sisli isik");
    expect(matchesQuery(["Uzm. Dt. İrem Çelik", "Endodonti"], "irem celik")).toBe(true);
    expect(matchesQuery(["Kökyapı Diş Kliniği"], "kokyapi")).toBe(true);
    expect(matchesQuery(["Kökyapı"], "ortodonti")).toBe(false);
  });

  it("slug üretir", () => {
    expect(slugify("Ayşe Nur Bulut")).toBe("ayse-nur-bulut");
    expect(slugify("İrem Çelik")).toBe("irem-celik");
  });
});
