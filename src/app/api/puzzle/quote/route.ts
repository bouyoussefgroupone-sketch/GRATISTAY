import { NextResponse } from "next/server";
import { z } from "zod";
import { findHotelOrFallback, getActivitiesByDestination } from "@/lib/catalog";
import { computePuzzleProgress, customerSafePuzzleView } from "@/lib/puzzle-engine";

const quoteSchema = z.object({
  hotelSlug: z.string().min(1),
  selectedActivityIds: z.array(z.string()).default([]),
  travelers: z.number().int().min(1).max(8).default(2),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = quoteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const hotel = findHotelOrFallback(parsed.data.hotelSlug);
  const scopedActivities = getActivitiesByDestination(hotel.destinationSlug);
  const result = computePuzzleProgress({
    hotel,
    selectedActivityIds: parsed.data.selectedActivityIds,
    activities: scopedActivities,
    travelers: parsed.data.travelers,
  });

  return NextResponse.json(customerSafePuzzleView(result));
}
