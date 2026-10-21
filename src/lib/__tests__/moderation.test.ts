import { describe, expect, it } from "vitest";
import { hasBlockingFlags, maskText, moderate } from "@/lib/moderation";

const types = (text: string) => moderate(text).map((f) => f.type);

describe("moderate", () => {
  it("temiz yorumu işaretlemez", () => {
    expect(moderate("Kanal tedavim çok rahat geçti, hekim her adımı anlattı.")).toEqual([]);
  });

  it("cep telefonunu kişisel veri olarak engeller", () => {
    const flags = moderate("Bilgi için 0532 123 45 67 numarasını arayın");
    expect(flags.map((f) => f.type)).toContain("kisisel_veri");
    expect(hasBlockingFlags(flags)).toBe(true);
  });

  it("geçerli T.C. kimlik numarasını yakalar, rastgele 11 haneyi yakalamaz", () => {
    expect(types("TC no 10000000146")).toContain("kisisel_veri");
    expect(types("Kod 12345678901 idi")).not.toContain("kisisel_veri");
  });

  it("e-posta ve IBAN yakalar", () => {
    expect(types("yazın: ornek@posta.com")).toContain("kisisel_veri");
    expect(types("TR33 0006 1005 1978 6457 8413 26")).toContain("kisisel_veri");
  });

  it("e-posta alan adını ayrıca reklam saymaz", () => {
    expect(types("yazın: ornek@posta.com")).not.toContain("reklam");
  });

  it("URL ve reklam ifadesini işaretler", () => {
    const t = types("www.ornek-klinik.com adresinde indirim var");
    expect(t).toContain("reklam");
    expect(hasBlockingFlags(moderate("www.ornek-klinik.com"))).toBe(false);
  });

  it("hakaret varyantlarını yakalar", () => {
    expect(types("tam bir s.a.l.a.k")).toContain("hakaret");
    expect(types("SALAAAK")).toContain("hakaret");
    expect(types("beceriksizin teki")).toContain("hakaret");
    expect(types("normal bir malzeme")).not.toContain("hakaret");
  });

  it("büyük harf ve tekrar spamini işaretler", () => {
    expect(types("BU KLİNİK GERÇEKTEN ÇOK KÖTÜYDÜ BİLGİNİZE")).toContain("spam");
    expect(types("harika!!!!!!")).toContain("spam");
  });

  it("aynı içeriğin tekrarını işaretler", () => {
    expect(moderate("Aynı yorum", ["aynı   yorum"]).map((f) => f.type)).toContain("spam");
  });

  it("maskeler", () => {
    const text = "Bu adam salak";
    expect(maskText(text, moderate(text))).not.toContain("salak");
  });
});
