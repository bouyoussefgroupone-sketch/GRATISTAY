import { FilterChip } from "@/components/filter-chip";
import { HotelResultCard } from "@/components/hotel-result-card";
import { SearchBar } from "@/components/search-bar";
import { SectionHeading } from "@/components/section-heading";
import { SiteFrame } from "@/components/site-frame";
import { findDestination, getHotelsByDestination } from "@/lib/catalog";
import { clampTravelers, normalizeTravelWindow } from "@/lib/travel";

function getString(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function getOptionalString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const destination = findDestination(getString(params.destination, "marrakech"));
  const travelers = String(clampTravelers(getString(params.travelers, "2")));
  const normalizedWindow = normalizeTravelWindow(getOptionalString(params.start), getOptionalString(params.end));
  const start = normalizedWindow.start;
  const end = normalizedWindow.end;
  const hotels = getHotelsByDestination(destination.slug);

  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <SearchBar
            destination={destination.slug}
            travelers={travelers}
            start={start}
            end={end}
            compact
          />

          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
            <SectionHeading
              title={destination.label}
              subtitle={`${hotels.length} hotels disponibles`}
            />

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterChip label="Bonus Stay" active />
              <FilterChip label="4 et 5 etoiles" />
              <FilterChip label="Piscine" />
              <FilterChip label="Famille" />
              <FilterChip label="Couple" />
              <FilterChip label="Petit-dejeuner" />
            </div>
          </div>

          <div className="grid gap-4">
            {hotels.map((hotel) => (
              <HotelResultCard
                key={hotel.id}
                hotel={hotel}
                start={start}
                end={end}
                travelers={travelers}
              />
            ))}
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
