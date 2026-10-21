import type { Metadata } from "next";
import { ArticleIndex } from "@/components/article/article-index";
import { PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Sağlık rehberi",
  description: "Diş çürüğü, kanal tedavisi, diş eti hastalıkları, implant, ortodonti ve ağız hijyeni üzerine kaynakçalı yazılar.",
};

export default function GuidePage() {
  return (
    <>
      <PageIntro title="Sağlık rehberi">
        Ağız ve diş sağlığı üzerine, uzman hekimlerin gözden geçirdiği ve güvenilir kaynaklara dayanan yazılar. Tanı ve tedavi için her zaman diş
        hekiminize danışın.
      </PageIntro>
      <div className="page pb-24">
        <ArticleIndex />
      </div>
    </>
  );
}
