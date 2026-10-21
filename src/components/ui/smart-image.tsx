"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Görsel dosyası henüz yoksa (Gemini ile üretilip public/images'e konmadıysa) yer tutucuyu gösterir.
 * Dosya eklendiğinde kod değişikliği gerekmeden fotoğraf yer tutucunun üzerinde belirir.
 */
export function SmartImage({
  src,
  alt,
  sizes,
  placeholder,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  placeholder: ReactNode;
  className?: string;
  priority?: boolean;
}) {
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;
    if (img?.complete) setState(img.naturalWidth > 0 ? "loaded" : "failed");
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0" aria-hidden={state === "loaded"}>
        {placeholder}
      </div>
      {state !== "failed" && (
        <Image
          ref={ref}
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
          className={`object-cover transition-opacity duration-500 ${state === "loaded" ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
