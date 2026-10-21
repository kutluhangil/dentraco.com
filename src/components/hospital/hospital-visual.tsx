"use client";

import { SmartImage } from "@/components/ui/smart-image";
import type { Hospital } from "@/lib/types";

export function HospitalPlaceholder({ hospital, variant = "dis" }: { hospital: Hospital; variant?: "dis" | "ic" }) {
  // İç içe diş arkları: her hastane için farklı açıklıkta, aynı motif.
  const spread = 30 + (hospital.chairs % 7) * 4;
  return (
    <div className="relative h-full w-full" style={{ background: variant === "dis" ? hospital.shade : "#e2eae8" }}>
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {Array.from({ length: 7 }, (_, i) => (
          <path
            key={i}
            d={`M ${60 - i * 6} ${40 + i * 18} Q 200 ${-spread + i * 26} ${340 + i * 6} ${40 + i * 18}`}
            fill="none"
            stroke="#0f2a33"
            strokeOpacity={0.05 + i * 0.012}
            strokeWidth={1.4}
            transform={`translate(0 ${70 + i * 4})`}
          />
        ))}
      </svg>
      <span className="absolute bottom-3 left-4 text-xs font-medium text-ink/50">
        {hospital.district}, {hospital.city}
      </span>
    </div>
  );
}

export function HospitalImage({
  hospital,
  variant = "dis",
  sizes,
  className = "",
  priority,
}: {
  hospital: Hospital;
  variant?: "dis" | "ic";
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <SmartImage
      src={variant === "dis" ? hospital.image : hospital.interiorImage}
      alt={variant === "dis" ? `${hospital.name} binası ve girişi (temsili)` : `${hospital.name} tedavi odası (temsili)`}
      sizes={sizes}
      priority={priority}
      className={className}
      placeholder={<HospitalPlaceholder hospital={hospital} variant={variant} />}
    />
  );
}
