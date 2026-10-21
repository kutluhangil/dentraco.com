import { Suspense } from "react";
import { ArticleManager } from "@/components/admin/article-manager";

export const metadata = { title: "Sağlık yazıları" };

export default function Page() {
  return (
    <Suspense>
      <ArticleManager />
    </Suspense>
  );
}
