import type { Metadata } from "next";
import { Suspense } from "react";
import { DoctorDirectory } from "@/components/doctor/doctor-directory";
import { ListSkeleton, PageIntro } from "@/components/ui/page-intro";

export const metadata: Metadata = {
  title: "Diş hekimleri",
  description: "40 diş hekimini uzmanlık alanı, hastane ve onaylı yorum puanına göre filtreleyin.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageIntro title="Diş hekimleri">
        Uzmanlık alanına, çalıştığı merkeze ve onaylı yorum puanına göre filtreleyin. Her profilde hekimin eğitimi, deneyimi ve çalıştığı merkez yer alır.
      </PageIntro>
      <div className="page pb-24">
        <Suspense fallback={<ListSkeleton />}>
          <DoctorDirectory />
        </Suspense>
      </div>
    </>
  );
}
