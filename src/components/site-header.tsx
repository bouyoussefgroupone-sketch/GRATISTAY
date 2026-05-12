import Link from "next/link";
import { Search } from "lucide-react";
import { publicNavigation } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[rgba(244,247,251,0.92)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--brand-700)] text-sm font-bold tracking-[0.22em] text-white">
            GS
          </div>
          <div>
            <div className="text-lg font-semibold tracking-[0.14em] text-[var(--ink-950)]">
              GRATISTAY
            </div>
            <div className="text-xs text-[var(--ink-600)]">Travel booking with Bonus Stay</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {publicNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--ink-800)] transition hover:text-[var(--ink-950)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/search?destination=marrakech&travelers=2"
            className="hidden items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm font-medium text-[var(--ink-800)] transition hover:bg-[var(--surface-muted)] md:inline-flex"
          >
            <Search className="h-4 w-4" />
            Rechercher
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand-700)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-600)]"
          >
            Connexion
          </Link>
        </div>
      </div>
    </header>
  );
}
