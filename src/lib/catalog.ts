import { activities, destinations, hotels } from "@/data/demo-data";

export function findDestination(slug?: string) {
  return destinations.find((destination) => destination.slug === slug) ?? destinations[0];
}

export function getHotelsByDestination(destinationSlug: string) {
  return hotels.filter((hotel) => hotel.destinationSlug === destinationSlug);
}

export function findHotel(slug?: string) {
  return hotels.find((hotel) => hotel.slug === slug);
}

export function findHotelOrFallback(slug?: string, destinationSlug?: string) {
  return (
    findHotel(slug) ??
    hotels.find((hotel) => hotel.destinationSlug === destinationSlug) ??
    hotels[0]
  );
}

export function getActivitiesByDestination(destinationSlug: string) {
  const scopedActivities = activities.filter(
    (activity) => activity.destinationSlug === destinationSlug,
  );

  return scopedActivities.length > 0
    ? scopedActivities
    : activities.filter((activity) => activity.destinationSlug === destinations[0].slug);
}
