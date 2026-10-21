import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Keşfet",
    links: [
      { href: "/doktorlar", label: "Doktorlar" },
      { href: "/hastaneler", label: "Hastaneler" },
      { href: "/saglik-rehberi", label: "Sağlık rehberi" },
    ],
  },
  {
    title: "Proje",
    links: [
      { href: "/proje-hakkinda", label: "Proje hakkında" },
      { href: "/proje-hakkinda#moderasyon", label: "Yorum ilkeleri" },
      { href: "/proje-hakkinda#maliyet", label: "Alan adı ve barındırma" },
    ],
  },
  {
    title: "Hesap",
    links: [
      { href: "/giris", label: "Giriş yap" },
      { href: "/kayit", label: "Üye ol" },
      { href: "/profil", label: "Profilim" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="no-print mt-auto bg-ink text-white">
      <div className="page grid gap-12 py-14 md:grid-cols-[1.4fr_2fr]">
        <div className="max-w-sm">
          <Logo className="text-white [&_svg]:text-white" />
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Diş hekimlerini ve klinikleri uzmanlık alanı, özgeçmiş ve onaylı hasta yorumlarıyla karşılaştırmanız için hazırlanmış bir rehber
            prototipi.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {columns.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-medium text-white/50">{c.title}</p>
              <ul className="mt-3 space-y-2">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-[0.9375rem] text-white/85 hover:text-white hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page flex flex-col gap-4 py-6 text-[0.8125rem] leading-relaxed text-white/60 md:flex-row md:items-start md:justify-between">
          <p className="max-w-3xl">
            <span className="font-medium text-white/85">Dentraco, bir okul projesi kapsamında hazırlanmış bir prototiptir.</span> Sitedeki
            hastane, doktor, yorum ve iletişim bilgileri kurgusaldır; gerçek kişi ve kurumlarla ilgisi yoktur. Sağlık içerikleri yalnızca genel
            bilgilendirme amaçlıdır ve hekim muayenesinin yerini tutmaz.
          </p>
          <p className="shrink-0">© 2026 Dentraco</p>
        </div>
      </div>
    </footer>
  );
}
