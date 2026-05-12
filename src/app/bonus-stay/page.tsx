import { PuzzleBuilder } from "@/components/puzzle-builder";
import { SiteFrame } from "@/components/site-frame";
import { highlightedSelectionIds } from "@/data/demo-data";
import { findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";

function getString(value: string | string[] | undefined, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

export default async function BonusStayPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const hotel = findHotelOrFallback(getString(params.hotel, "riad-horizon-marrakech"));
  const travelers = Number(getString(params.travelers, "2"));
  const start = getString(params.start, "2026-06-14");
  const end = getString(params.end, "2026-06-17");
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
