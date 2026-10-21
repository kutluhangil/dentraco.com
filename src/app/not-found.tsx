import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NotFoundBlock } from "@/components/ui/not-found-block";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <NotFoundBlock title="Bu sayfa çekilmiş" text="Aradığınız sayfa yok ya da taşınmış. Aramayı kullanın ya da ana sayfaya dönün." href="/" cta="Ana sayfaya dön" />
      </main>
      <Footer />
    </>
  );
}
