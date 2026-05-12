import { activities, highlightedSelectionIds } from "@/data/demo-data";
import { findDestination, findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";
import { computePuzzleProgress } from "@/lib/puzzle-engine";
import { buildRouteWithParams, clampTravelers, normalizeTravelWindow } from "@/lib/travel";
import type { Activity, Destination, Hotel } from "@/types/domain";

const supportContacts: Record<string, string> = {
  marrakech: "+212 5 24 00 22 44",
  istanbul: "+90 212 555 01 19",
  lisbonne: "+351 21 440 92 10",
};

const timeSlots = ["Jour 1 - 14:00", "Jour 1 - 19:30", "Jour 2 - 10:00", "Jour 2 - 20:00"];

export interface DemoItineraryItem {
  name: string;
  time: string;
  location: string;
  partner: string;
}

export interface DemoCheckoutDetails {
  reference: string;
  voucherCode: string;
  hotel: Hotel;
  destination: Destination;
  startDate: string;
  endDate: string;
  travelers: number;
  totalPaid: number;
  bonusProgress: number;
  unlocked: boolean;
  paymentStatus: "paid";
  selectedIds: string[];
  selectedActivities: Activity[];
  itinerary: DemoItineraryItem[];
  supportPhone: string;
  pdfHref: string;
}

export function parseSelectedIdsParam(
  value: string | string[] | undefined,
  fallback: string[] = highlightedSelectionIds,
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return fallback;
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function buildDemoReference(seed: string) {
  let hash = 0;

  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 90000;
  }

  return `GST-DEMO-${String(hash + 10000).padStart(5, "0")}`;
}

export function buildDemoCheckoutDetails(input: {
  hotelSlug?: string;
  start?: string;
  end?: string;
  travelers?: number | string;
  selected?: string | string[];
}) {
  const hotel = findHotelOrFallback(input.hotelSlug);
  const destination = findDestination(hotel.destinationSlug);
  const travelers = clampTravelers(input.travelers, 2);
  const travelWindow = normalizeTravelWindow(input.start, input.end);
  const scopedActivities = getActivitiesByDestination(hotel.destinationSlug);
  const selectedIds = parseSelectedIdsParam(input.selected);
  const availableActivities = scopedActivities.length > 0 ? scopedActivities : activities;
  const result = computePuzzleProgress({
    hotel,
    selectedActivityIds: selectedIds,
    activities: availableActivities,
    travelers,
  });
  const safeSelectedActivities =
    result.selectedActivities.length > 0 ? result.selectedActivities : availableActivities.slice(0, 4);
  const reference = buildDemoReference(
    [hotel.slug, travelWindow.start, travelWindow.end, travelers, selectedIds.join(",")].join("|"),
  );
  const voucherCode = `${reference.replace(/[^A-Z0-9]/g, "").slice(-10)}-PDF`;
  const itinerary = safeSelectedActivities.map((activity, index) => ({
    name: activity.name,
    time: timeSlots[index] ?? `Jour ${Math.floor(index / 2) + 1} - ${index % 2 === 0 ? "10:00" : "18:00"}`,
    location: activity.meetingPoint,
    partner: activity.partner,
  }));

  return {
    reference,
    voucherCode,
    hotel,
    destination,
    startDate: travelWindow.start,
    endDate: travelWindow.end,
    travelers,
    totalPaid: result.totalClientAmount,
    bonusProgress: result.progress,
    unlocked: result.unlocked,
    paymentStatus: "paid" as const,
    selectedIds,
    selectedActivities: safeSelectedActivities,
    itinerary,
    supportPhone: supportContacts[destination.slug] ?? "+33 1 84 80 42 42",
    pdfHref: buildRouteWithParams("/api/demo-pdf", {
      hotel: hotel.slug,
      start: travelWindow.start,
      end: travelWindow.end,
      travelers,
      selected: selectedIds.join(","),
    }),
  };
}
