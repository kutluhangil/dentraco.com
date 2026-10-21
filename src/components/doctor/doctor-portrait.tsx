"use client";

import { ViewTransition } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { doctorName, initials } from "@/lib/format";
import type { Doctor } from "@/lib/types";

const shades = ["#F3EAD7", "#EBDDBF", "#F5EEDD", "#E6D7B4", "#E1CDA6"];

function shadeFor(id: string) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return shades[h % shades.length];
}

export function PortraitPlaceholder({ doctor }: { doctor: Doctor }) {
  return (
    <div className="relative flex h-full w-full items-end justify-start p-4" style={{ background: shadeFor(doctor.id) }}>
      <svg viewBox="0 0 100 125" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path
          d="M28 52c0-14 11-20 22-17 11-3 22 3 22 17 0 9-3 14-5 19l-3 22c-1 6-8 6-9 0l-3-16c-1-3-2-4-4-4s-3 1-4 4l-3 16c-1 6-8 6-9 0l-3-22c-2-5-5-10-5-19Z"
          fill="none"
          stroke="#0f2a33"
          strokeOpacity="0.09"
          strokeWidth="1.2"
        />
      </svg>
      <span className="display-tight relative text-[clamp(2rem,9cqw,3.5rem)] leading-none font-semibold text-ink/80">
        {initials(`${doctor.firstName} ${doctor.lastName}`)}
      </span>
    </div>
  );
}

export function DoctorPortrait({
  doctor,
  sizes,
  className = "",
  priority,
  transition = true,
}: {
  doctor: Doctor;
  sizes: string;
  className?: string;
  priority?: boolean;
  transition?: boolean;
}) {
  const image = (
    <SmartImage
      src={doctor.image}
      alt={`${doctorName(doctor)} temsili portresi`}
      sizes={sizes}
      priority={priority}
      className={`@container aspect-[4/5] ${className}`}
      placeholder={<PortraitPlaceholder doctor={doctor} />}
    />
  );
  if (!transition) return image;
  return (
    <ViewTransition name={`doktor-${doctor.id}`} share="morph" default="none">
      {image}
    </ViewTransition>
  );
}
