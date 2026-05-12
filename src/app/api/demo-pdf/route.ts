import { NextResponse } from "next/server";
import { z } from "zod";
import { generateDemoTravelPdf } from "@/lib/demo-pdf";

const querySchema = z.object({
  reference: z.string().min(5),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    reference: searchParams.get("reference"),
  });

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Reference de reservation invalide.",
      },
      { status: 400 },
    );
  }

  const pdf = await generateDemoTravelPdf(parsed.data.reference);

  if (!pdf) {
    return NextResponse.json(
      {
        error: "Reservation introuvable pour ce carnet.",
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
