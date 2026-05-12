"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { adminNavigation } from "@/lib/site-config";

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink-900)]">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-[var(--line)] bg-[var(--surface)] p-6 lg:border-r lg:border-b-0">
          <Link href="/admin" className="block rounded-3xl border border-[var(--line)] bg-[var(--surface-muted)] p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
              GRATISTAY
            </div>
            <div className="mt-2 text-2xl font-semibold text-[var(--ink-950)]">Admin</div>
            <div className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
              Catalogue, reservations, support, campagnes et regles Bonus Stay.
            </div>
          </Link>

          <nav className="mt-8 grid gap-2">
            {adminNavigation.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--brand-800)] text-white"
                      : "text-[var(--ink-700)] hover:bg-[var(--surface-muted)] hover:text-[var(--ink-950)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
