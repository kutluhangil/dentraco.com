import type { Metadata } from "next";
import { Suspense } from "react";
import { ArticleView } from "@/components/article/article-view";
import { articles } from "@/data/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/saglik-rehberi/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return a ? { title: a.title, description: a.summary } : { title: "Sağlık rehberi" };
}

async function Content({ params }: { params: PageProps<"/saglik-rehberi/[slug]">["params"] }) {
  const { slug } = await params;
  return <ArticleView slug={slug} />;
}

export default function ArticlePage({ params }: PageProps<"/saglik-rehberi/[slug]">) {
  return (
    <Suspense fallback={<div className="page h-[70vh]" />}>
      <Content params={params} />
    </Suspense>
  );
}
