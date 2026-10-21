"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LayoutDashboard, LogOut, Menu, Search, UserRound, X } from "lucide-react";
import { repo, useHydrated, useSession } from "@/lib/repo";
import { initials } from "@/lib/format";
import { Logo } from "./logo";
import { SearchDialog } from "./search-dialog";

const nav = [
  { href: "/doktorlar", label: "Doktorlar" },
  { href: "/hastaneler", label: "Hastaneler" },
  { href: "/saglik-rehberi", label: "Sağlık rehberi" },
  { href: "/proje-hakkinda", label: "Proje" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`no-print sticky top-0 z-50 transition-[background-color,box-shadow] duration-200 ${
          scrolled || open ? "bg-porcelain/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md" : "bg-porcelain"
        }`}
      >
        <div className="page flex h-16 items-center gap-3 sm:gap-6">
          <Link href="/" aria-label="Dentraco ana sayfa" className="shrink-0" onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav aria-label="Ana menü" className="hidden md:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`rounded-full px-3.5 py-2 text-[0.9375rem] transition-colors ${
                        active ? "bg-ink text-white" : "text-ink-soft hover:bg-porcelain-deep hover:text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full border border-line bg-enamel px-3.5 text-sm text-ink-soft transition-colors hover:border-ink-faint hover:text-ink lg:w-56"
            >
              <Search className="size-4" />
              <span className="hidden lg:inline">Doktor, klinik, tedavi</span>
              <kbd className="ml-auto hidden rounded border border-line px-1.5 text-[0.6875rem] text-ink-faint lg:inline">⌘K</kbd>
              <span className="sr-only lg:hidden">Ara</span>
            </button>
            <AccountButton />
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-ink hover:bg-porcelain-deep md:hidden"
              aria-expanded={open}
              aria-controls="mobil-menu"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              id="mobil-menu"
              aria-label="Mobil menü"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100dvh - 4rem)", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
              className="overflow-hidden bg-porcelain md:hidden"
            >
              <ul className="page flex flex-col pt-4">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display-tight flex items-center justify-between py-4 text-3xl font-medium"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function AccountButton() {
  const hydrated = useHydrated();
  const me = useSession();
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menu]);

  if (!hydrated) return <span className="size-10 rounded-full bg-porcelain-deep" aria-hidden="true" />;

  if (!me) {
    return (
      <Link
        href="/giris"
        className="flex h-10 items-center gap-1.5 rounded-full bg-ink px-3 text-sm font-medium text-white transition-colors hover:bg-curing min-[360px]:px-4"
      >
        <UserRound className="size-4 min-[360px]:hidden" aria-hidden="true" />
        <span className="max-[359px]:sr-only">Giriş yap</span>
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={menu}
        onClick={() => setMenu((v) => !v)}
        className="grid size-10 place-items-center rounded-full bg-curing text-sm font-semibold text-white"
      >
        {initials(me.name)}
        <span className="sr-only">Hesap menüsü</span>
      </button>
      <AnimatePresence>
        {menu && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-[var(--radius-control)] border border-line bg-enamel p-1.5 shadow-[0_16px_40px_-16px_rgb(15_42_51/0.35)]"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-medium">{me.name}</p>
              <p className="truncate text-xs text-ink-soft">{me.email}</p>
            </div>
            <MenuLink href="/profil" onClick={() => setMenu(false)} icon={<UserRound className="size-4" />}>
              Profilim ve yorumlarım
            </MenuLink>
            {me.role === "admin" && (
              <MenuLink href="/admin" onClick={() => setMenu(false)} icon={<LayoutDashboard className="size-4" />}>
                Yönetim paneli
              </MenuLink>
            )}
            <button
              role="menuitem"
              type="button"
              onClick={() => {
                repo.logout();
                setMenu(false);
                router.push("/");
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-gum hover:bg-gum-soft"
            >
              <LogOut className="size-4" /> Çıkış yap
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({ href, icon, children, onClick }: { href: string; icon: React.ReactNode; children: React.ReactNode; onClick: () => void }) {
  return (
    <Link role="menuitem" href={href} onClick={onClick} className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm hover:bg-porcelain">
      {icon}
      {children}
    </Link>
  );
}
