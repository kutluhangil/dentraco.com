"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Plus } from "lucide-react";
import { useQueryState } from "@/components/filters/filter-ui";
import { toast } from "@/components/ui/toast";
import { doctorName, formatDate } from "@/lib/format";
import { repo, useAllArticles, useDoctors } from "@/lib/repo";
import { matchesQuery } from "@/lib/search";
import { slugify } from "@/lib/slug";
import type { Article } from "@/lib/types";
import { AdminTitle, btn } from "./admin-shell";
import { ConfirmDelete, FormSection, Input, Select, TableToolbar, TextArea, lines } from "./form-kit";

export function ArticleManager() {
  const { get, set } = useQueryState();
  const editing = get("duzenle");
  const articles = useAllArticles();
  if (editing) return <ArticleForm key={editing} initial={articles.find((a) => a.id === editing)} onDone={() => set({ duzenle: null })} />;
  return <ArticleTable onEdit={(id) => set({ duzenle: id })} />;
}

function ArticleTable({ onEdit }: { onEdit: (id: string) => void }) {
  const articles = useAllArticles();
  const [q, setQ] = useState("");
  const list = useMemo(() => articles.filter((a) => !q || matchesQuery([a.title, a.category], q)), [articles, q]);
  return (
    <>
      <AdminTitle title="Sağlık yazıları" sub={`${articles.filter((a) => a.published).length} yayında, ${articles.filter((a) => !a.published).length} taslak`} />
      <TableToolbar
        q={q}
        setQ={setQ}
        placeholder="Başlık ara"
        action={
          <button type="button" onClick={() => onEdit("yeni")} className={btn.primary}>
            <Plus className="size-4" /> Yazı ekle
          </button>
        }
      />
      <div className="overflow-x-auto rounded-[var(--radius-panel)] bg-enamel">
        <table className="w-full min-w-[720px] text-left text-[0.9375rem]">
          <thead className="border-b border-line text-sm text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Başlık</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium">Güncelleme</th>
              <th className="px-4 py-3 text-right font-medium">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {list.map((a) => (
              <tr key={a.id}>
                <td className="px-4 py-3">
                  <Link href={`/saglik-rehberi/${a.slug}`} className="font-medium hover:underline">
                    {a.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-ink-soft">{a.category}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      repo.upsertArticle({ ...a, published: !a.published });
                      toast(a.published ? "Yazı taslağa alındı." : "Yazı yayımlandı.");
                    }}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${a.published ? "bg-fluoride/40 text-fluoride-deep" : "bg-amber-soft text-[#8a5a12]"}`}
                    title="Durumu değiştir"
                  >
                    {a.published ? "Yayında" : "Taslak"}
                  </button>
                </td>
                <td className="px-4 py-3 text-ink-soft">{formatDate(a.updatedAt)}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button type="button" onClick={() => onEdit(a.id)} className="rounded-full px-3 py-1.5 text-sm text-curing-deep hover:bg-curing-soft">
                    Düzenle
                  </button>
                  <ConfirmDelete
                    label={a.title}
                    onConfirm={() => {
                      repo.deleteArticle(a.id);
                      toast("Yazı silindi.", "info");
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ArticleForm({ initial, onDone }: { initial?: Article; onDone: () => void }) {
  const doctors = useDoctors();
  const [a, setA] = useState<Article>(
    initial ?? {
      id: "",
      slug: "",
      title: "",
      summary: "",
      category: "Koruyucu",
      reviewerId: doctors[0]?.id ?? "",
      updatedAt: "",
      readingMinutes: 1,
      cover: "",
      body: "## Giriş\n\n",
      sources: [],
      published: false,
    },
  );
  const [sources, setSources] = useState((initial?.sources ?? []).map((s) => `${s.label} | ${s.url}`).join("\n"));
  const [tab, setTab] = useState<"yaz" | "onizle">("yaz");
  const up = (patch: Partial<Article>) => setA((x) => ({ ...x, ...patch }));
  const words = a.body.trim().split(/\s+/).length;
  const isNew = !initial;

  const save = (published: boolean) => {
    const slug = a.slug || slugify(a.title);
    repo.upsertArticle({
      ...a,
      id: a.id || slug,
      slug,
      published,
      updatedAt: new Date().toISOString().slice(0, 10),
      readingMinutes: Math.max(1, Math.round(words / 180)),
      cover: a.cover || `/images/rehber/${slug}.webp`,
      sources: lines(sources).map((l) => {
        const [label, url] = l.split("|").map((x) => x.trim());
        return { label, url: url ?? "" };
      }),
    });
    toast(published ? "Yazı yayımlandı." : "Taslak kaydedildi.");
    onDone();
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(true);
      }}
    >
      <button type="button" onClick={onDone} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink">
        <ArrowLeft className="size-4" /> Yazılara dön
      </button>
      <AdminTitle
        title={isNew ? "Yeni yazı" : a.title}
        action={
          <div className="flex gap-2">
            <button type="button" onClick={() => save(false)} className={btn.ghost} disabled={!a.title}>
              Taslak olarak kaydet
            </button>
            <button type="submit" className={btn.primary}>
              Yayımla
            </button>
          </div>
        }
      />
      <div className="space-y-4">
        <FormSection title="Künye">
          <Input label="Başlık" value={a.title} onChange={(v) => up({ title: v })} required wide />
          <Select
            label="Kategori"
            value={a.category}
            onChange={(v) => up({ category: v })}
            options={["Tedaviler", "Hastalıklar", "Koruyucu"].map((c) => ({ value: c, label: c }))}
          />
          <Select label="Gözden geçiren hekim" value={a.reviewerId} onChange={(v) => up({ reviewerId: v })} options={doctors.map((d) => ({ value: d.id, label: doctorName(d) }))} />
          <TextArea label="Özet" value={a.summary} onChange={(v) => up({ summary: v })} rows={2} required />
        </FormSection>

        <section className="rounded-[var(--radius-panel)] bg-enamel p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold">Metin</h2>
            <div role="tablist" className="flex gap-1 rounded-full bg-porcelain p-1 text-sm">
              {(["yaz", "onizle"] as const).map((t) => (
                <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`h-8 rounded-full px-3 ${tab === t ? "bg-enamel shadow-sm" : "text-ink-soft"}`}>
                  {t === "yaz" ? "Yaz" : "Önizle"}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Markdown desteklenir: <code>## Ara başlık</code>, <code>**kalın**</code>, <code>- liste</code>, <code>&gt; not</code>. {words} kelime, yaklaşık{" "}
            {Math.max(1, Math.round(words / 180))} dk okuma.
          </p>
          <div className="mt-4">
            {tab === "yaz" ? (
              <TextArea label="İçerik" value={a.body} onChange={(v) => up({ body: v })} rows={22} mono />
            ) : (
              <div className="article-body rounded-[var(--radius-control)] border border-line p-5">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{a.body}</ReactMarkdown>
              </div>
            )}
          </div>
        </section>

        <FormSection title="Kaynaklar">
          <TextArea label="Kaynak listesi" value={sources} onChange={setSources} rows={4} hint="Her satıra: Kaynak adı | https://adres" />
        </FormSection>
      </div>
    </form>
  );
}
