import Image from "next/image";
import Link from "next/link";
import { BedDouble, MapPin, Sparkles, Star } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Hotel } from "@/types/domain";

interface HotelResultCardProps {
  hotel: Hotel;
  start: string;
  end: string;
  travelers: string;
}

export function HotelResultCard({
  hotel,
  start,
  end,
  travelers,
}: HotelResultCardProps) {
  const bonusHref = `/bonus-stay?hotel=${hotel.slug}&travelers=${travelers}&start=${start}&end=${end}`;

  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
      <div className="grid gap-0 lg:grid-cols-[300px_1fr_220px]">
        <div className="relative min-h-60">
          <Image
            src={hotel.imageUrl}
            alt={hotel.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 300px"
          />
        </div>

        <div className="space-y-5 p-5 md:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                {hotel.tier}
              </div>
              <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                {hotel.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-[var(--ink-700)]">
                <MapPin className="h-4 w-4" />
                {hotel.district}
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--brand-700)] px-3 py-2 text-right text-white">
              <div className="flex items-center gap-1 text-base font-semibold">
                <Star className="h-4 w-4 fill-current" />
                {hotel.rating}
              </div>
              <div className="mt-1 text-[11px] text-white/72">{hotel.reviewCount} avis</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge tone="sand">Bonus eligible</Badge>
            {hotel.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
              >
                {feature}
              </span>
            ))}
          </div>

          <p className="text-sm leading-6 text-[var(--ink-700)]">{hotel.overview}</p>

          <div className="grid gap-3 text-sm text-[var(--ink-700)] md:grid-cols-2">
            <div className="inline-flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              {hotel.roomLabel}
            </div>
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {hotel.nightsIncluded} nuits bonus
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between border-t border-[var(--line)] bg-[var(--surface-muted)] p-5 lg:border-t-0 lg:border-l">
          <div>
            <div className="text-sm font-semibold text-[var(--ink-950)]">Hebergement offert via Bonus Stay</div>
            <div className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
              Selectionnez vos activites pour debloquer le sejour.
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href={`/hotels/${hotel.slug}`}
              className="inline-flex w-full items-center justify-center rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--surface)]"
            >
              Voir cet hotel
            </Link>
            <Link
              href={bonusHref}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[var(--brand-700)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-600)]"
            >
              Choisir cet hotel
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
