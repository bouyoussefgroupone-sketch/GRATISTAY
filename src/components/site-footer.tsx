import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[var(--ink-700)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="font-medium text-[var(--ink-950)]">GRATISTAY</div>
        <div className="flex flex-wrap gap-4">
          <Link href="/search">Destinations</Link>
          <Link href="/bonus-stay?hotel=riad-horizon-marrakech">Bonus Stay</Link>
          <Link href="/support">Support</Link>
          <Link href="/admin">Admin</Link>
        </div>
        <div>Secure booking demo</div>
      </div>
    </footer>
  );
}
