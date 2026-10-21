"use client";

import Link from "next/link";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronRight, Info } from "lucide-react";
import { DoctorPortrait } from "@/components/doctor/doctor-portrait";
import { ArticlePlaceholder } from "@/components/home/sections";
import { NotFoundBlock } from "@/components/ui/not-found-block";
import { SmartImage } from "@/components/ui/smart-image";
import { specialtyById } from "@/data/specialties";
import { doctorName, formatDate } from "@/lib/format";
import { useArticle, useArticles, useDoctors, useHydrated, useSession } from "@/lib/repo";
import { slugify } from "@/lib/slug";

export function ArticleView({ slug }: { slug: string }) {
  const article = useArticle(slug);
  const hydrated = useHydrated();
  const me = useSession();
  const doctors = useDoctors();
  const others = useArticles().filter((a) => a.slug !== slug).slice(0, 3);
  const headings = useMemo(() => (article ? [...article.body.matchAll(/^## (.+)$/gm)].map((m) => m[1]) : []), [article]);

  if (!article || (!article.published && me?.role !== "admin")) {
    return hydrated ? (
      <NotFoundBlock title="Bu yazı bulunamadı" text="Yazı kaldırılmış ya da henüz yayımlanmamış olabilir." href="/saglik-rehberi" cta="Rehbere dön" />
    ) : (
      <div className="page h-[60vh]" />
    );
  }
  const reviewer = doctors.find((d) => d.id === article.reviewerId);

  return (
    <article className="pb-24">
      <header className="page pt-6">
        <nav aria-label="Konum" className="mb-8 flex items-center gap-1 text-sm text-ink-soft">
          <Link href="/saglik-rehberi" className="hover:text-ink hover:underline">
            Sağlık rehberi
          </Link>
          <ChevronRight className="size-3.5" />
          <span>{article.category}</span>
        </nav>
        {!article.published && <p className="mb-4 inline-flex rounded-full bg-amber-soft px-3 py-1 text-sm text-[#8a5a12]">Taslak — yalnızca yöneticiler görebilir</p>}
        <h1 className="display-tight max-w-4xl text-[clamp(2.5rem,6vw,4.75rem)] leading-[0.95] font-semibold text-balance">{article.title}</h1>
        <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-ink-soft">{article.summary}</p>
        <p className="mt-5 text-sm text-ink-soft">
          Son güncelleme {formatDate(article.updatedAt)} — {article.readingMinutes} dk okuma
        </p>
        <SmartImage src={article.cover} alt="" sizes="(min-width: 1240px) 1176px, 100vw" priority className="mt-10 aspect-[16/9] rounded-[var(--radius-panel)] sm:aspect-[21/9]" placeholder={<ArticlePlaceholder />} />
      </header>

      <div className="page mt-12 grid gap-12 lg:grid-cols-[240px_1fr_260px]">
        <aside className="hidden lg:block">
          <nav aria-label="İçindekiler" className="sticky top-24">
            <p className="text-sm font-medium">İçindekiler</p>
            <ol className="mt-3 space-y-2 border-l border-line text-sm">
              {headings.map((h) => (
                <li key={h}>
                  <a href={`#${slugify(h)}`} className="-ml-px block border-l border-transparent pl-4 text-ink-soft hover:border-curing hover:text-ink">
                    {h}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="article-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h2 id={slugify(String(children))}>{children}</h2>,
              }}
            >
              {article.body}
            </ReactMarkdown>
          </div>
          <section aria-labelledby="kaynaklar" className="mt-14 max-w-[68ch] border-t border-line pt-6">
            <h2 id="kaynaklar" className="font-semibold">
              Kaynaklar
            </h2>
            <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
              {article.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-curing-deep hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          {reviewer && (
            <Link href={`/doktorlar/${reviewer.slug}`} className="group block rounded-[var(--radius-panel)] bg-enamel p-4">
              <p className="text-xs text-ink-faint">Uzman görüşü</p>
              <div className="mt-3 flex items-center gap-3">
                <DoctorPortrait doctor={reviewer} sizes="56px" transition={false} className="w-14 shrink-0 rounded-xl" />
                <div>
                  <p className="font-semibold leading-snug group-hover:underline">{doctorName(reviewer)}</p>
                  <p className="text-sm text-ink-soft">{specialtyById[reviewer.specialty]?.name}</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-faint">Kurgusal hekim; yazı okul projesi kapsamında hazırlanmıştır.</p>
            </Link>
          )}
          <div className="flex gap-3 rounded-[var(--radius-panel)] bg-curing-soft p-4 text-sm text-ink">
            <Info className="mt-0.5 size-4 shrink-0 text-curing" />
            <p>Bu içerik genel bilgilendirme amaçlıdır; muayenenin ve hekim önerisinin yerini tutmaz.</p>
          </div>
        </aside>
      </div>

      {others.length > 0 && (
        <section className="page mt-20" aria-labelledby="diger">
          <h2 id="diger" className="display-tight text-3xl font-semibold">
            Rehberden diğer yazılar
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            {others.map((a) => (
              <li key={a.id}>
                <Link href={`/saglik-rehberi/${a.slug}`} className="group block border-t border-ink pt-4">
                  <p className="text-sm text-curing-deep">{a.category}</p>
                  <p className="mt-1 text-lg leading-snug font-semibold group-hover:underline">{a.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
