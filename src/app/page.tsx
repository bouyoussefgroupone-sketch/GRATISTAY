import Link from "next/link";
import { Building2, ShieldCheck, Sparkles } from "lucide-react";
import { HotelCard } from "@/components/hotel-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { SiteFrame } from "@/components/site-frame";
import { destinations, hotels } from "@/data/demo-data";

export default function Home() {
  return (
    <SiteFrame>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-sm md:p-10">
              <div className="inline-flex rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                Bonus Stay
              </div>
              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] sm:text-5xl">
                Recherchez un hotel. Ajoutez vos activites. Debloquez le sejour.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-700)]">
                Une interface simple, rapide et orientee conversion.
              </p>
              <div className="mt-8">
                <SearchBar />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {["Hotels eligibles", "4 pieces puzzle", "Paiement securise"].map((item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-sm text-[var(--ink-800)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                {
                  icon: Building2,
                  title: "Hotels partenaires",
                  copy: "Choix direct et rapide.",
                },
                {
                  icon: Sparkles,
                  title: "Puzzle Bonus Stay",
                  copy: "4 pieces a completer.",
                },
                {
                  icon: ShieldCheck,
                  title: "Paiement simple",
                  copy: "Panier clair, paiement rapide.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm"
                >
                  <item.icon className="h-8 w-8 text-[var(--brand-700)]" />
                  <div className="mt-4 text-lg font-semibold text-[var(--ink-950)]">
                    {item.title}
                  </div>
                  <div className="mt-2 text-sm text-[var(--ink-700)]">{item.copy}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-3">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/search?destination=${destination.slug}&travelers=2&start=2026-06-14&end=2026-06-17`}
                  className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--brand-500)] hover:bg-[var(--surface)]"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                    {destination.country}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-[var(--ink-950)]">
                    {destination.city}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Destinations populaires"
            subtitle="Des sejours courts, simples a comprendre et faciles a reserver."
          />

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.slug}
                href={`/search?destination=${destination.slug}&travelers=2&start=2026-06-14&end=2026-06-17`}
                className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${destination.imageUrl})` }}
                />
                <div className="space-y-3 p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                    {destination.country}
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--ink-950)]">
                    {destination.city}
                  </h3>
                  <p className="text-sm leading-6 text-[var(--ink-700)]">{destination.heroTag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Hotels mis en avant"
            subtitle="Des fiches plus directes, plus visuelles et plus proches d'un OTA."
          />
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {hotels.slice(0, 3).map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Hotels partenaires
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Activites par categorie
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Paiement securise
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
