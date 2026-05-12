import Image from "next/image";
import { ShieldCheck, Sparkles } from "lucide-react";
import { CheckoutButton } from "@/components/checkout-button";
import { SiteFrame } from "@/components/site-frame";
import { activities, hotels } from "@/data/demo-data";
import { findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";
import { parseSelectedIdsParam } from "@/lib/demo-checkout";
import { formatDateRange, formatCurrency } from "@/lib/format";
import { clampTravelers, normalizeTravelWindow } from "@/lib/travel";
import { computePuzzleProgress } from "@/lib/puzzle-engine";

function getString(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function getOptionalString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
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
  const selectedActivityIds = parseSelectedIdsParam(params.selected);
  const result = computePuzzleProgress({
    hotel,
    selectedActivityIds,
    activities: scopedActivities.length > 0 ? scopedActivities : activities,
    travelers,
  });

  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
            <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-800)]">
                  Etape finale
                </div>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                  Verifiez votre panier
                </h1>
                <p className="mt-2 text-sm text-[var(--ink-700)]">
                  Paiement demo, confirmation immediate et carnet PDF pret apres validation.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-700)]">
                <Sparkles className="h-4 w-4 text-[var(--brand-700)]" />
                Bonus Stay {result.progress}% {result.unlocked ? "debloque" : "en cours"}
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {result.selectedActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[var(--surface)] text-sm font-semibold text-[var(--brand-800)]">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--ink-950)]">{activity.name}</div>
                      <div className="mt-1 text-sm text-[var(--ink-700)]">
                        {activity.duration} · {activity.partner}
                      </div>
                    </div>
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

          <aside className="overflow-hidden rounded-[32px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-strong)]">
            <div className="relative h-52">
              <Image
                src={hotel.imageUrl}
                alt={hotel.name}
                fill
                className="object-cover"
                sizes="360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,18,30,0.76)] via-[rgba(10,18,30,0.08)] to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  Hotel confirme apres paiement
                </div>
                <div className="mt-2 text-2xl font-semibold">{hotel.name}</div>
                <div className="mt-1 text-sm text-white/78">{hotel.district}</div>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="text-sm text-[var(--ink-700)]">
                {formatDateRange(normalizedWindow.start, normalizedWindow.end)}
              </div>

              <div className="rounded-[24px] bg-[var(--surface-muted)] p-4">
                <div className="text-sm text-[var(--ink-700)]">Total a payer</div>
                <div className="mt-2 text-3xl font-semibold text-[var(--ink-950)]">
                  {formatCurrency(result.totalClientAmount)}
                </div>
              </div>

              <div className="space-y-2 text-sm text-[var(--ink-700)]">
                <div>{travelers} voyageurs</div>
                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[var(--brand-700)]" />
                  Confirmation immediate et PDF disponible ensuite
                </div>
              </div>

              <CheckoutButton
                hotelSlug={hotel.slug}
                start={normalizedWindow.start}
                end={normalizedWindow.end}
                travelers={travelers}
                selectedIds={selectedActivityIds}
              />
            </div>
          </aside>
        </div>
      </section>
    </SiteFrame>
  );
}
