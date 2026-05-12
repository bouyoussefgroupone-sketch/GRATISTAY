import { PuzzleBuilder } from "@/components/puzzle-builder";
import { SiteFrame } from "@/components/site-frame";
import { highlightedSelectionIds } from "@/data/demo-data";
import { findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";
import { clampTravelers, normalizeTravelWindow } from "@/lib/travel";

function getString(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function getOptionalString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function BonusStayPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hotel = findHotelOrFallback(getString(params.hotel, "riad-horizon-marrakech"));
  const travelers = clampTravelers(getString(params.travelers, "2"));
  const normalizedWindow = normalizeTravelWindow(getOptionalString(params.start), getOptionalString(params.end));
  const start = normalizedWindow.start;
  const end = normalizedWindow.end;
  const destinationActivities = getActivitiesByDestination(hotel.destinationSlug);
  const initialSelection = highlightedSelectionIds.filter((activityId) =>
    destinationActivities.some((activity) => activity.id === activityId),
  );

  return (
    <SiteFrame>
      <PuzzleBuilder
        hotel={hotel}
        activities={destinationActivities}
        initialSelection={initialSelection}
        travelers={travelers}
        start={start}
        end={end}
      />
    </SiteFrame>
  );
}
