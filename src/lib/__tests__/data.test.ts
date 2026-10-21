import { describe, expect, it } from "vitest";
import { articles } from "@/data/articles";
import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";
import { sampleReviews } from "@/data/reviews";

describe("seed veri", () => {
  it("8 hastane, her birinde 5 doktor", () => {
    expect(hospitals).toHaveLength(8);
    expect(doctors).toHaveLength(40);
    for (const h of hospitals) expect(doctors.filter((d) => d.hospitalId === h.id)).toHaveLength(5);
  });

  it("slug'lar benzersiz", () => {
    expect(new Set(doctors.map((d) => d.slug)).size).toBe(40);
  });

  it("makale hakemleri mevcut doktorlar", () => {
    expect(articles).toHaveLength(8);
    for (const a of articles) expect(doctors.some((d) => d.id === a.reviewerId)).toBe(true);
  });

  it("yorumlar var olan hedeflere bağlı ve tümü örnek", () => {
    for (const rv of sampleReviews) {
      const pool = rv.targetType === "doctor" ? doctors : hospitals;
      expect(pool.some((x) => x.id === rv.targetId)).toBe(true);
      expect(rv.isSample).toBe(true);
    }
  });

  it("mezuniyet yaşı ve eğitim yılları tutarlı", () => {
    for (const d of doctors) {
      expect(d.graduationYear - d.birthYear).toBeGreaterThanOrEqual(22);
      expect(d.graduationYear - d.birthYear).toBeLessThanOrEqual(25);
      expect(d.education[0].end).toBe(d.graduationYear);
    }
  });
});
