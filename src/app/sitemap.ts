import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { doctors } from "@/data/doctors";
import { hospitals } from "@/data/hospitals";

const base = "https://dentraco.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/doktorlar", "/hastaneler", "/saglik-rehberi", "/proje-hakkinda"].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
  return [
    ...pages,
    ...hospitals.map((h) => ({ url: `${base}/hastaneler/${h.slug}`, priority: 0.7 })),
    ...doctors.map((d) => ({ url: `${base}/doktorlar/${d.slug}`, priority: 0.6 })),
    ...articles
      .filter((a) => a.published)
      .map((a) => ({ url: `${base}/saglik-rehberi/${a.slug}`, lastModified: a.updatedAt, priority: 0.6 })),
  ];
}
