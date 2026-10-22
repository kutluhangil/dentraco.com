import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/profil", "/giris", "/kayit"] },
    sitemap: "https://dentraco.vercel.app/sitemap.xml",
  };
}
