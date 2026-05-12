import Link from "next/link";
import { Compass, Headphones, Sparkles } from "lucide-react";
import { HotelCard } from "@/components/hotel-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { SiteFrame } from "@/components/site-frame";
import { destinations, hotels } from "@/data/demo-data";

export default function Home() {
  return (
    <SiteFrame>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-soft)] md:p-10">
            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[rgba(19,113,122,0.18)] blur-3xl" />
            <div className="absolute -bottom-16 left-24 h-40 w-40 rounded-full bg-[rgba(217,123,115,0.12)] blur-3xl" />
            <div className="relative">
              <div className="inline-flex rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                Bonus Stay
              </div>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] sm:text-5xl">
                Reservez un hotel, composez vos activites, revelez votre sejour.
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-700)]">
                Une experience plus vivante, plus claire et plus directe pour vos city breaks.
              </p>
              <div className="mt-8 max-w-5xl">
                <SearchBar />
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {[
                  { icon: Compass, label: "Hotels eligibles et experiences" },
                  { icon: Sparkles, label: "Progression visible en temps reel" },
                  { icon: Headphones, label: "Support et parcours testables" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="inline-flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[rgba(255,255,255,0.78)] px-4 py-3 text-sm font-medium text-[var(--ink-800)] backdrop-blur"
                  >
                    <item.icon className="h-4 w-4 text-[var(--brand-700)]" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[var(--shadow-soft)]">
            <div className="grid gap-3 md:grid-cols-3">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/search?destination=${destination.slug}&travelers=2`}
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
                href={`/search?destination=${destination.slug}&travelers=2`}
                className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-soft)]"
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
        <div className="mx-auto max-w-7xl rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Search first, mobile first, parcours rapide
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Bonus Stay avec revelation photo hotel
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]">
              Compte, support et panier de demonstration relies
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
