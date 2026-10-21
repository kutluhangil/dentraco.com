import type { ToothInfo } from "@/lib/types";

export interface ToothShape {
  fdi: number;
  kind: ToothInfo["kind"];
  x: number;
  y: number;
  rotate: number;
  w: number;
  d: number;
  labelX: number;
  labelY: number;
  arch: "upper" | "lower";
}

// Mezio-distal genişlikler (yaklaşık mm, orta hattan geriye doğru) ve ağız içi derinlik.
const permanentWidths = [8.6, 6.6, 7.6, 7, 6.6, 10.2, 9.6, 9];
const permanentDepths = [6.4, 6.2, 7.8, 8.6, 8.6, 10.6, 10.2, 9.6];
const primaryWidths = [6.4, 5.2, 6.8, 7.6, 9.4];
const primaryDepths = [5.2, 5, 6.4, 8.4, 9.6];

export const VIEW = { w: 640, h: 520 };
const CY = { upper: 222, lower: 298 };
const SPAN = 91;

function kindOf(position: number, primary: boolean): ToothInfo["kind"] {
  if (position <= 2) return "kesici";
  if (position === 3) return "köpek";
  if (primary) return "büyük azı";
  if (position <= 5) return "küçük azı";
  if (position <= 7) return "büyük azı";
  return "yirmi yaş";
}

/**
 * Dişleri iki elips yayı üzerine yerleştirir. Görüntü hekim bakışıdır:
 * hastanın sağı ekranın solundadır (FDI 1. ve 4. çeyrekler solda).
 */
export function layoutArch(primary: boolean): ToothShape[] {
  const widths = primary ? primaryWidths : permanentWidths;
  const depths = primary ? primaryDepths : permanentDepths;
  const total = widths.reduce((a, b) => a + b, 0);
  const spanDeg = SPAN;
  const rx = primary ? 168 : 222;
  const ry = primary ? 128 : 165;
  const scale = primary ? 6.6 : 5.3;
  const shapes: ToothShape[] = [];

  for (const arch of ["upper", "lower"] as const) {
    const cy = CY[arch];
    const cx = VIEW.w / 2;
    // Orta hattan başlayıp her iki yöne yürü.
    for (const side of [-1, 1] as const) {
      let acc = 0;
      widths.forEach((w, i) => {
        const centerDeg = ((acc + w / 2) / total) * spanDeg;
        acc += w;
        // Üst ark: orta hat -90°, alt ark: +90°. side=-1 ekranın solu.
        const base = arch === "upper" ? -90 : 90;
        const deg = arch === "upper" ? base + side * centerDeg : base - side * centerDeg;
        const t = (deg * Math.PI) / 180;
        const x = cx + rx * Math.cos(t);
        const y = cy + ry * Math.sin(t);
        // Elips normali
        const nx = Math.cos(t) / rx;
        const ny = Math.sin(t) / ry;
        const normalDeg = (Math.atan2(ny, nx) * 180) / Math.PI;
        const nlen = Math.hypot(nx, ny);
        const labelOffset = (depths[i] * scale) / 2 + 16;
        const quadrant = arch === "upper" ? (side === -1 ? 1 : 2) : side === -1 ? 4 : 3;
        const q = primary ? quadrant + 4 : quadrant;
        shapes.push({
          fdi: q * 10 + i + 1,
          kind: kindOf(i + 1, primary),
          x,
          y,
          rotate: normalDeg + 90,
          w: w * scale * 0.9,
          d: depths[i] * scale,
          labelX: x + (nx / nlen) * labelOffset,
          labelY: y + (ny / nlen) * labelOffset,
          arch,
        });
      });
    }
  }
  return shapes;
}

/** Diş tipine göre, merkezde (0,0) duran oklüzal (çiğneme yüzeyi) silüet. */
export function toothPath(kind: ToothInfo["kind"], w: number, d: number) {
  const hw = w / 2;
  const hd = d / 2;
  switch (kind) {
    case "kesici":
      return `M ${-hw} ${-hd * 0.35} Q ${-hw} ${-hd} 0 ${-hd} Q ${hw} ${-hd} ${hw} ${-hd * 0.35} L ${hw * 0.78} ${hd * 0.6} Q ${hw * 0.6} ${hd} 0 ${hd} Q ${-hw * 0.6} ${hd} ${-hw * 0.78} ${hd * 0.6} Z`;
    case "köpek":
      return `M 0 ${-hd} Q ${hw * 1.05} ${-hd * 0.7} ${hw} ${0} Q ${hw * 0.8} ${hd} 0 ${hd} Q ${-hw * 0.8} ${hd} ${-hw} 0 Q ${-hw * 1.05} ${-hd * 0.7} 0 ${-hd} Z`;
    case "küçük azı":
      return `M ${-hw} 0 Q ${-hw} ${-hd} 0 ${-hd} Q ${hw} ${-hd} ${hw} 0 Q ${hw} ${hd} 0 ${hd} Q ${-hw} ${hd} ${-hw} 0 Z`;
    default: {
      const r = Math.min(hw, hd) * 0.55;
      return `M ${-hw + r} ${-hd} L ${hw - r} ${-hd} Q ${hw} ${-hd} ${hw} ${-hd + r} L ${hw} ${hd - r} Q ${hw} ${hd} ${hw - r} ${hd} L ${-hw + r} ${hd} Q ${-hw} ${hd} ${-hw} ${hd - r} L ${-hw} ${-hd + r} Q ${-hw} ${-hd} ${-hw + r} ${-hd} Z`;
    }
  }
}

/** Çiğneme yüzeyindeki oluk çizgileri. */
export function groovePath(kind: ToothInfo["kind"], w: number, d: number) {
  const hw = w / 2;
  const hd = d / 2;
  if (kind === "küçük azı") return `M ${-hw * 0.45} 0 L ${hw * 0.45} 0`;
  if (kind === "büyük azı" || kind === "yirmi yaş")
    return `M ${-hw * 0.55} ${-hd * 0.05} Q 0 ${hd * 0.15} ${hw * 0.55} ${-hd * 0.05} M ${-hw * 0.05} ${-hd * 0.55} L ${hw * 0.05} ${hd * 0.55}`;
  return "";
}

export function gumArcPath(arch: "upper" | "lower", primary: boolean) {
  const rx = primary ? 168 : 222;
  const ry = primary ? 128 : 165;
  const cy = CY[arch];
  const cx = VIEW.w / 2;
  const span = (SPAN + 5) * (Math.PI / 180);
  const base = arch === "upper" ? -Math.PI / 2 : Math.PI / 2;
  const a0 = base - span;
  const a1 = base + span;
  const p0 = [cx + rx * Math.cos(a0), cy + ry * Math.sin(a0)];
  const p1 = [cx + rx * Math.cos(a1), cy + ry * Math.sin(a1)];
  return `M ${p0[0]} ${p0[1]} A ${rx} ${ry} 0 1 1 ${p1[0]} ${p1[1]}`;
}
