import type { Metadata } from "next";
import { Suspense } from "react";
import { HospitalDirectory } from "@/components/hospital/hospital-directory";
import { ListSkeleton, PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Hastaneler ve klinikler",
  description: "Ağız ve diş sağlığı merkezlerini şehre, sunulan tedaviye ve onaylı yorum puanına göre karşılaştırın.",
};

export default function HospitalsPage() {
  return (
    <>
      <PageIntro title="Hastaneler ve klinikler">
        Diş hastaneleri, ağız ve diş sağlığı merkezleri, poliklinikler ve klinikler. Sunulan tedavilere göre filtreleyip hekim kadrosunu inceleyin.
      </PageIntro>
      <div className="page pb-24">
        <Suspense fallback={<ListSkeleton rows={5} />}>
          <HospitalDirectory />
        </Suspense>
      </div>
    </>
  );
}
