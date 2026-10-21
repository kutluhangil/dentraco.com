import type { Metadata } from "next";
import { Suspense } from "react";
import { DoctorProfile } from "@/components/doctor/doctor-profile";
import { specialtyById } from "@/data/specialties";
import { doctors } from "@/data/doctors";
import { doctorName } from "@/lib/format";

export function generateStaticParams() {
  return doctors.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/doktorlar/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const d = doctors.find((x) => x.slug === slug);
  if (!d) return { title: "Hekim profili" };
  return {
    title: `${doctorName(d)} — ${specialtyById[d.specialty].name}`,
    description: d.headline,
  };
}

async function Content({ params }: { params: PageProps<"/doktorlar/[slug]">["params"] }) {
  const { slug } = await params;
  return <DoctorProfile slug={slug} />;
}

export default function DoctorPage({ params }: PageProps<"/doktorlar/[slug]">) {
  return (
    <Suspense fallback={<div className="page h-[70vh]" />}>
      <Content params={params} />
    </Suspense>
  );
}
