import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Badge } from "@/components/badge";
import type { Hotel } from "@/types/domain";

export function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-soft)]">
      <div className="relative h-56">
        <Image
          src={hotel.imageUrl}
          alt={hotel.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,18,30,0.62)] via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge tone="sand">Bonus Stay</Badge>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[var(--ink-950)]">{hotel.name}</h3>
            <div className="mt-1 flex items-center gap-2 text-sm text-[var(--ink-700)]">
              <MapPin className="h-4 w-4" />
              {hotel.district}
            </div>
          </div>
          <div className="rounded-xl bg-[var(--brand-800)] px-2.5 py-2 text-center text-white">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Star className="h-4 w-4 fill-current" />
              {hotel.rating}
            </div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/70">
              {hotel.reviewCount} avis
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {hotel.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
            >
              {feature}
            </span>
          ))}
        </div>

        <p className="text-sm leading-6 text-[var(--ink-700)]">{hotel.atmosphere}</p>

        <div className="flex gap-3">
          <Link
            href={`/hotels/${hotel.slug}`}
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--surface-muted)]"
          >
            Voir
          </Link>
          <Link
            href={`/bonus-stay?hotel=${hotel.slug}&travelers=2`}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
          >
            Choisir
          </Link>
        </div>
      </div>
    </article>
  );
}
