import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--ink-900)]">
      <SiteHeader />
      <main className="pb-12">{children}</main>
      <SiteFooter />
    </div>
  );
}
