"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import { ArticlePlaceholder } from "@/components/home/sections";
import { formatDate } from "@/lib/format";
import { useArticles, useDoctors } from "@/lib/repo";

export function ArticleIndex() {
  const articles = useArticles();
  const doctors = useDoctors();
  const categories = useMemo(() => ["Tümü", ...new Set(articles.map((a) => a.category))], [articles]);
  const [cat, setCat] = useState("Tümü");
  const list = cat === "Tümü" ? articles : articles.filter((a) => a.category === cat);

  return (
    <>
      <div role="tablist" aria-label="Kategori" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`h-10 rounded-full px-4 text-sm ${cat === c ? "bg-ink text-white" : "border border-line bg-enamel text-ink-soft hover:border-ink-faint"}`}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((a) => {
          const reviewer = doctors.find((d) => d.id === a.reviewerId);
          return (
            <li key={a.id}>
              <Link href={`/saglik-rehberi/${a.slug}`} className="group block">
                <SmartImage src={a.cover} alt="" sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 100vw" className="aspect-[16/10] rounded-[var(--radius-panel)]" placeholder={<ArticlePlaceholder />} />
                <p className="mt-4 text-sm text-curing-deep">
                  {a.category} — {a.readingMinutes} dk okuma
                </p>
                <h2 className="mt-1 text-xl leading-snug font-semibold group-hover:underline group-hover:decoration-curing group-hover:underline-offset-4">{a.title}</h2>
                <p className="mt-2 line-clamp-3 text-[0.9375rem] text-ink-soft">{a.summary}</p>
                <p className="mt-3 text-xs text-ink-faint">
                  {reviewer ? `Gözden geçiren: ${reviewer.title} ${reviewer.firstName} ${reviewer.lastName}` : ""} — {formatDate(a.updatedAt)}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
