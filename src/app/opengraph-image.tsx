import { ImageResponse } from "next/og";

export const alt = "Dentraco — diş hekimi ve klinik rehberi (okul projesi)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const shades = ["#F3EAD7", "#EBDDBF", "#E1CDA6", "#F5EEDD", "#E6D7B4"];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#EEF3F2", padding: 72, color: "#0F2A33" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
          {shades.map((c, i) => (
            <div key={c} style={{ width: 44, height: 110 - i * 8, background: i === 4 ? "#2D4BFF" : c, borderRadius: "6px 6px 999px 999px" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>Doğru diş hekimini, dişinden başlayarak bulun.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#4A6470" }}>dentraco — okul projesi, tüm profiller kurgusaldır</div>
        </div>
      </div>
    ),
    size,
  );
}
