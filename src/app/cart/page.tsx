import Image from "next/image";
import { CheckoutButton } from "@/components/checkout-button";
import { SiteFrame } from "@/components/site-frame";
import { activities, highlightedSelectionIds, hotels } from "@/data/demo-data";
import { findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";
import { formatDateRange, formatCurrency } from "@/lib/format";
import { clampTravelers, normalizeTravelWindow } from "@/lib/travel";
import { computePuzzleProgress } from "@/lib/puzzle-engine";

function getString(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function getOptionalString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

function parseSelectedIds(value: string | string[] | undefined, fallback: string[]) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return fallback;
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export default async function CartPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hotel = findHotelOrFallback(getString(params.hotel, hotels[0].slug));
  const travelers = clampTravelers(getString(params.travelers, "2"));
  const normalizedWindow = normalizeTravelWindow(getOptionalString(params.start), getOptionalString(params.end));
  const scopedActivities = getActivitiesByDestination(hotel.destinationSlug);
  const selectedActivityIds = parseSelectedIds(params.selected, highlightedSelectionIds);
  const result = computePuzzleProgress({
    hotel,
    selectedActivityIds,
    activities: scopedActivities.length > 0 ? scopedActivities : activities,
    travelers,
  });

  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
              Panier
            </h1>
            <div className="mt-5 grid gap-3">
              {result.selectedActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4"
                >
                  <div>
                    <div className="font-semibold text-[var(--ink-950)]">{activity.name}</div>
                    <div className="text-sm text-[var(--ink-700)]">{activity.duration}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-[var(--ink-700)]">{travelers} voyageurs</div>
                    <div className="text-lg font-semibold text-[var(--ink-950)]">
                      {formatCurrency(activity.pricePerTraveler * travelers)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-sm">
            <div className="relative h-40">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
            <div className="space-y-4 p-5">
              <div className="text-xl font-semibold text-[var(--ink-950)]">{hotel.name}</div>
              <div className="text-sm text-[var(--ink-700)]">
                Bonus Stay {result.progress}% {result.unlocked ? "debloque" : "en cours"}
              </div>
              <div className="text-sm text-[var(--ink-700)]">
                {formatDateRange(normalizedWindow.start, normalizedWindow.end)}
              </div>

              <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
                <div className="text-sm text-[var(--ink-700)]">Total a payer</div>
                <div className="mt-2 text-3xl font-semibold text-[var(--ink-950)]">
                  {formatCurrency(result.totalClientAmount)}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[var(--ink-700)]">
                <div>{travelers} voyageurs</div>
                <div>Hebergement bonus masque cote client</div>
              </div>

              <CheckoutButton />
            </div>
          </aside>
        </div>
      </section>
    </SiteFrame>
  );
}
