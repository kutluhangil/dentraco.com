import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a href="#icerik" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        İçeriğe geç
      </a>
      <Header />
      <main id="icerik" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
