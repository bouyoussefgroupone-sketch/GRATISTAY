import { NextResponse } from "next/server";
import { z } from "zod";
import { buildDemoCheckoutDetails } from "@/lib/demo-checkout";
import { generateCheckoutTravelPdf, generateDemoTravelPdf } from "@/lib/demo-pdf";

const querySchema = z.object({
  reference: z.string().min(5),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsedReference = querySchema.safeParse({
    reference: searchParams.get("reference"),
  });

  const pdf = parsedReference.success
    ? await generateDemoTravelPdf(parsedReference.data.reference)
    : await generateCheckoutTravelPdf(
        buildDemoCheckoutDetails({
          hotelSlug: searchParams.get("hotel") ?? undefined,
          start: searchParams.get("start") ?? undefined,
          end: searchParams.get("end") ?? undefined,
          travelers: searchParams.get("travelers") ?? undefined,
          selected: searchParams.get("selected") ?? undefined,
        }),
      );

  if (!pdf) {
    return NextResponse.json(
      {
        error: "Carnet PDF introuvable pour cette reservation.",
      },
      { status: 404 },
    );
  }

  const bytes = Uint8Array.from(pdf.bytes);
  const body = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(body).set(bytes);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdf.filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
