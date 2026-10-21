import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Source_Serif_4 } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dentraco.vercel.app"),
  title: {
    default: "Dentraco — Diş hekimi ve klinik rehberi",
    template: "%s · Dentraco",
  },
  description:
    "Diş hekimlerini ve ağız-diş sağlığı merkezlerini uzmanlık, puan ve hasta deneyimine göre inceleyin. Dentraco bir okul projesidir; tüm profiller kurgusaldır.",
  applicationName: "Dentraco",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Dentraco",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#eef3f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${bricolage.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
