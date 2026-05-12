import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Star } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { destinations, hotels } from "@/data/demo-data";
import { findHotel } from "@/lib/catalog";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export default async function HotelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hotel = findHotel(slug);

  if (!hotel) {
    notFound();
  }

  const destination =
    destinations.find((item) => item.slug === hotel.destinationSlug) ?? destinations[0];

  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
            <div className="relative min-h-[360px] overflow-hidden rounded-[32px]">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,23,40,0.7)] to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-sm font-medium">{destination.label}</div>
                <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{hotel.name}</h1>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/85">
                  <span className="inline-flex items-center gap-2">
                    <Star className="h-4 w-4 fill-current" />
                    {hotel.rating} sur {hotel.reviewCount} avis
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {hotel.district}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                Bonus Stay
              </div>
              <div className="mt-3 text-2xl font-semibold text-[var(--ink-950)]">
                Hebergement offert via activites
              </div>
              <div className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                Panier activites, bonus hotel, confirmation rapide.
              </div>
              <div className="mt-6 space-y-3">
                <div className="inline-flex items-center gap-2 text-sm text-[var(--ink-700)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-700)]" />
                  {hotel.nightsIncluded} nuits bonus eligibles
                </div>
              </div>
              <Link
                href={`/bonus-stay?hotel=${hotel.slug}&travelers=2&start=2026-06-14&end=2026-06-17`}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--brand-700)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-600)]"
              >
                Construire ce sejour
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {hotel.galleryUrls.map((imageUrl, index) => (
              <div key={`${imageUrl}-${index}`} className="relative min-h-52 overflow-hidden rounded-3xl">
                <Image
                  src={imageUrl}
                  alt={`${hotel.name} ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-[var(--ink-950)]">A retenir</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {hotel.features.concat(hotel.includedHighlights).map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-800)]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                Fiche hotel
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--ink-950)]">
                {hotel.atmosphere}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{hotel.overview}</p>
              <div className="mt-5 space-y-2 text-sm text-[var(--ink-700)]">
                <div>Chambre: {hotel.roomLabel}</div>
                <div>Capacite: jusqu a {hotel.maxGuests} personnes</div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
