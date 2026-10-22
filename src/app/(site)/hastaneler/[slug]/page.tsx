import type { Metadata } from "next";
import { Suspense } from "react";
import { HospitalProfile } from "@/components/hospital/hospital-profile";
import { hospitals } from "@/data/hospitals";

export function generateStaticParams() {
  return hospitals.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/hastaneler/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const h = hospitals.find((x) => x.slug === slug);
  if (!h) return { title: "Hastane" };
  return { title: `${h.name} — ${[h.neighborhood, h.district].filter(Boolean).join(", ")}`, description: h.summary };
}

async function Content({ params }: { params: PageProps<"/hastaneler/[slug]">["params"] }) {
  const { slug } = await params;
  return <HospitalProfile slug={slug} />;
}

export default function HospitalPage({ params }: PageProps<"/hastaneler/[slug]">) {
  return (
    <Suspense fallback={<div className="page h-[70vh]" />}>
      <Content params={params} />
    </Suspense>
  );
}
