import { NextResponse } from "next/server";
import { z } from "zod";
import { supportTickets } from "@/data/demo-data";

const ticketSchema = z.object({
  email: z.email(),
  subject: z.string().min(5),
  topic: z.enum([
    "probleme_paiement",
    "modification_reservation",
    "annulation",
    "probleme_activite",
    "probleme_hotel",
    "demande_information",
    "autre",
  ]),
  message: z.string().min(20),
  bookingReference: z.string().optional(),
});

export async function GET() {
  return NextResponse.json({
    tickets: supportTickets,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ticketSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const createdReference = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;

  return NextResponse.json(
    {
      reference: createdReference,
      status: "open",
      message:
        "Ticket created. The support team can now assign, comment, and link the request to a booking.",
    },
    { status: 201 },
  );
}
