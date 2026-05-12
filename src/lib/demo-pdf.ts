import fs from "node:fs/promises";
import path from "node:path";
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFImage,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import { bookingRecords, destinations, hotels } from "@/data/demo-data";
import type { DemoCheckoutDetails } from "@/lib/demo-checkout";
import { formatCurrency, formatFriendlyDate } from "@/lib/format";

type DemoExperience = {
  name: string;
  time: string;
  location: string;
  partner: string;
};

const bookingExperiences: Record<string, DemoExperience[]> = {
  "GST-2026-00412": [
    {
      name: "Transfert prive aeroport",
      time: "Jour 1 - 14:00",
      location: "Aeroport Marrakech-Menara",
      partner: "Atlas Mobility",
    },
    {
      name: "Rituel hammam signature",
      time: "Jour 1 - 18:30",
      location: "Spa Azur",
      partner: "Spa Azur",
    },
    {
      name: "Visite guidee Medina",
      time: "Jour 2 - 10:00",
      location: "Jemaa el-Fna",
      partner: "Marrakech Stories",
    },
    {
      name: "Diner show Oasis",
      time: "Jour 2 - 20:00",
      location: "Oasis Club",
      partner: "Oasis Club",
    },
  ],
  "GST-2026-00413": [
    {
      name: "Transfert Bosphore prive",
      time: "Jour 1 - 15:00",
      location: "Aeroport d'Istanbul",
      partner: "Golden Horn Mobility",
    },
    {
      name: "Croisiere sunset Bosphore",
      time: "Jour 1 - 19:30",
      location: "Pont de Galata",
      partner: "Bosphore Stories",
    },
    {
      name: "Hammam heritage",
      time: "Jour 2 - 11:00",
      location: "Hammam Karakoy",
      partner: "Ottoman Wellness",
    },
    {
      name: "Diner rooftop Galata",
      time: "Jour 2 - 20:30",
      location: "Galata Skyline",
      partner: "Galata Skyline",
    },
  ],
  "GST-2026-00414": [
    {
      name: "Food tour Baixa",
      time: "Jour 1 - 17:00",
      location: "Baixa",
      partner: "Taste Lisboa",
    },
    {
      name: "Atelier pastel de nata",
      time: "Jour 2 - 10:30",
      location: "Chiado Lab",
      partner: "Lisbon Atelier",
    },
    {
      name: "Croisiere sunset Tage",
      time: "Jour 2 - 19:00",
      location: "Cais do Sodre",
      partner: "Tagus Moments",
    },
    {
      name: "Late checkout lifestyle",
      time: "Jour 3 - 13:00",
      location: "Rivera House Lisbonne",
      partner: "Rivera House",
    },
  ],
};

const supportContacts: Record<string, string> = {
  marrakech: "+212 5 24 00 22 44",
  istanbul: "+90 212 555 01 19",
  lisbonne: "+351 21 440 92 10",
};

const palette = {
  brand: rgb(0.07, 0.44, 0.48),
  brandSoft: rgb(0.93, 0.97, 0.97),
  text: rgb(0.06, 0.09, 0.15),
  muted: rgb(0.39, 0.45, 0.53),
  line: rgb(0.86, 0.89, 0.91),
  white: rgb(1, 1, 1),
};

interface ResolvedPdfPayload {
  booking: {
    reference: string;
    startDate: string;
    endDate: string;
    travelers: number;
    totalPaid: number;
    paymentStatus: string;
    bonusProgress: number;
  };
  hotel: (typeof hotels)[number];
  destination: (typeof destinations)[number];
  experiences: DemoExperience[];
  voucherCode: string;
  supportPhone: string;
}

function wrapText(text: string, maxWidth: number, font: PDFFont, size: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }

    current = word;
  }

  if (current) {
    lines.push(current);
  }

  return lines;
}

function drawWrappedText(page: PDFPage, options: {
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  font: PDFFont;
  size: number;
  color?: ReturnType<typeof rgb>;
  lineHeight?: number;
}) {
  const { text, x, y, maxWidth, font, size, color = palette.text, lineHeight = size * 1.5 } =
    options;
  const lines = wrapText(text, maxWidth, font, size);

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      size,
      font,
      color,
    });
  });

  return y - lines.length * lineHeight;
}

function drawMetaCard(page: PDFPage, options: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: string;
  bold: PDFFont;
}) {
  const { x, y, width, height, label, value, bold } = options;

  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: palette.brandSoft,
    borderColor: palette.line,
    borderWidth: 1,
  });

  page.drawText(label, {
    x: x + 16,
    y: y + height - 18,
    size: 9,
    font: bold,
    color: palette.muted,
  });

  page.drawText(value, {
    x: x + 16,
    y: y + 18,
    size: 13,
    font: bold,
    color: palette.text,
  });
}

function drawFooter(page: PDFPage, font: PDFFont, pageNumber: number) {
  page.drawLine({
    start: { x: 48, y: 38 },
    end: { x: 547, y: 38 },
    color: palette.line,
    thickness: 1,
  });

  page.drawText("GRATISTAY", {
    x: 48,
    y: 22,
    size: 10,
    font,
    color: palette.muted,
  });

  page.drawText(`Page ${pageNumber}`, {
    x: 505,
    y: 22,
    size: 10,
    font,
    color: palette.muted,
  });
}

async function embedLocalImage(pdf: PDFDocument, imageUrl: string) {
  const imagePath = path.join(process.cwd(), "public", imageUrl.replace(/^\//, ""));
  const bytes = await fs.readFile(imagePath);
  const extension = path.extname(imagePath).toLowerCase();

  if (extension === ".png") {
    return pdf.embedPng(bytes);
  }

  return pdf.embedJpg(bytes);
}

function findBookingPayload(reference: string): ResolvedPdfPayload | null {
  const booking = bookingRecords.find((entry) => entry.reference === reference);
  if (!booking) {
    return null;
  }

  const hotel = hotels.find((entry) => entry.name === booking.hotelName) ?? hotels[0];
  const destination =
    destinations.find((entry) => entry.slug === hotel.destinationSlug) ?? destinations[0];
  const experiences = bookingExperiences[reference] ?? [];
  const voucherCode = `${reference.replace(/[^A-Z0-9]/g, "").slice(-8)}-BV`;

  return {
    booking,
    hotel,
    destination,
    experiences,
    voucherCode,
    supportPhone: supportContacts[destination.slug] ?? "+33 1 84 80 42 42",
  };
}

function buildFilename(reference: string) {
  return `gratistay-${reference.toLowerCase()}.pdf`;
}

async function renderTravelPdf(payload: ResolvedPdfPayload | null) {
  if (!payload) {
    return null;
  }

  const pdf = await PDFDocument.create();
  const regular = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const hotelImage: PDFImage = await embedLocalImage(pdf, payload.hotel.imageUrl);

  const cover = pdf.addPage([595.28, 841.89]);
  cover.drawImage(hotelImage, {
    x: 0,
    y: 455,
    width: 595.28,
    height: 386.89,
  });
  cover.drawRectangle({
    x: 0,
    y: 455,
    width: 595.28,
    height: 386.89,
    color: rgb(0.04, 0.08, 0.13),
    opacity: 0.45,
  });
  cover.drawRectangle({
    x: 48,
    y: 118,
    width: 499,
    height: 268,
    color: palette.white,
    borderColor: palette.line,
    borderWidth: 1,
  });
  cover.drawText("GRATISTAY", {
    x: 48,
    y: 792,
    size: 13,
    font: bold,
    color: palette.white,
  });
  cover.drawText("Carnet de voyage", {
    x: 48,
    y: 758,
    size: 30,
    font: bold,
    color: palette.white,
  });
  cover.drawText(payload.destination.label, {
    x: 48,
    y: 726,
    size: 18,
    font: regular,
    color: palette.white,
  });
  cover.drawText(payload.booking.reference, {
    x: 48,
    y: 690,
    size: 12,
    font: bold,
    color: palette.white,
  });
  cover.drawText(payload.hotel.name, {
    x: 72,
    y: 332,
    size: 26,
    font: bold,
    color: palette.text,
  });
  cover.drawText("Hebergement Bonus Stay", {
    x: 72,
    y: 358,
    size: 11,
    font: bold,
    color: palette.brand,
  });
  drawWrappedText(cover, {
    text: `${formatFriendlyDate(payload.booking.startDate)} au ${formatFriendlyDate(payload.booking.endDate)} - ${payload.booking.travelers} voyageurs`,
    x: 72,
    y: 304,
    maxWidth: 420,
    font: regular,
    size: 13,
    color: palette.muted,
  });
  drawWrappedText(cover, {
    text: "Votre sejour comprend l'hotel partenaire, vos experiences confirmees, les informations utiles et le contact support.",
    x: 72,
    y: 254,
    maxWidth: 430,
    font: regular,
    size: 12,
    color: palette.text,
  });
  cover.drawRectangle({
    x: 72,
    y: 150,
    width: 451,
    height: 56,
    color: palette.brandSoft,
    borderColor: palette.line,
    borderWidth: 1,
  });
  cover.drawText("Code dossier", {
    x: 92,
    y: 183,
    size: 10,
    font: bold,
    color: palette.muted,
  });
  cover.drawText(payload.voucherCode, {
    x: 92,
    y: 160,
    size: 18,
    font: bold,
    color: palette.text,
  });
  drawFooter(cover, regular, 1);

  const summary = pdf.addPage([595.28, 841.89]);
  summary.drawText("Resume du voyage", {
    x: 48,
    y: 782,
    size: 24,
    font: bold,
    color: palette.text,
  });
  summary.drawText("Informations principales", {
    x: 48,
    y: 756,
    size: 11,
    font: bold,
    color: palette.brand,
  });
  drawMetaCard(summary, {
    x: 48,
    y: 658,
    width: 152,
    height: 82,
    label: "DATES",
    value: `${formatFriendlyDate(payload.booking.startDate)} - ${formatFriendlyDate(payload.booking.endDate)}`,
    bold,
  });
  drawMetaCard(summary, {
    x: 220,
    y: 658,
    width: 152,
    height: 82,
    label: "VOYAGEURS",
    value: `${payload.booking.travelers} pers.`,
    bold,
  });
  drawMetaCard(summary, {
    x: 392,
    y: 658,
    width: 155,
    height: 82,
    label: "TOTAL",
    value: formatCurrency(payload.booking.totalPaid),
    bold,
  });

  summary.drawText("Hotel partenaire", {
    x: 48,
    y: 612,
    size: 16,
    font: bold,
    color: palette.text,
  });
  summary.drawRectangle({
    x: 48,
    y: 438,
    width: 499,
    height: 150,
    color: palette.white,
    borderColor: palette.line,
    borderWidth: 1,
  });
  summary.drawImage(hotelImage, {
    x: 62,
    y: 452,
    width: 150,
    height: 122,
  });
  summary.drawText(payload.hotel.name, {
    x: 230,
    y: 548,
    size: 18,
    font: bold,
    color: palette.text,
  });
  summary.drawText(`${payload.destination.label} - ${payload.hotel.district}`, {
    x: 230,
    y: 526,
    size: 12,
    font: regular,
    color: palette.muted,
  });
  drawWrappedText(summary, {
    text: payload.hotel.overview,
    x: 230,
    y: 496,
    maxWidth: 290,
    font: regular,
    size: 11,
    color: palette.text,
    lineHeight: 16,
  });
  summary.drawText(`Suite: ${payload.hotel.roomLabel}`, {
    x: 230,
    y: 454,
    size: 11,
    font: bold,
    color: palette.brand,
  });

  summary.drawText("Points utiles", {
    x: 48,
    y: 394,
    size: 16,
    font: bold,
    color: palette.text,
  });
  const usefulPoints = [
    `Statut paiement: ${payload.booking.paymentStatus}`,
    `Progression Bonus Stay: ${payload.booking.bonusProgress}%`,
    `Support destination: ${payload.supportPhone}`,
    `Reference hotel/voucher: ${payload.voucherCode}`,
  ];
  usefulPoints.forEach((item, index) => {
    summary.drawRectangle({
      x: 48,
      y: 338 - index * 48,
      width: 499,
      height: 36,
      color: palette.brandSoft,
      borderColor: palette.line,
      borderWidth: 1,
    });
    summary.drawText(item, {
      x: 64,
      y: 351 - index * 48,
      size: 11,
      font: regular,
      color: palette.text,
    });
  });
  drawFooter(summary, regular, 2);

  const experiencesPage = pdf.addPage([595.28, 841.89]);
  experiencesPage.drawText("Experiences et planning", {
    x: 48,
    y: 782,
    size: 24,
    font: bold,
    color: palette.text,
  });
  experiencesPage.drawText("Selection client", {
    x: 48,
    y: 756,
    size: 11,
    font: bold,
    color: palette.brand,
  });

  payload.experiences.forEach((experience, index) => {
    const y = 668 - index * 140;

    experiencesPage.drawRectangle({
      x: 48,
      y,
      width: 499,
      height: 112,
      color: palette.white,
      borderColor: palette.line,
      borderWidth: 1,
    });
    experiencesPage.drawRectangle({
      x: 48,
      y: y + 74,
      width: 499,
      height: 38,
      color: palette.brandSoft,
      borderColor: palette.line,
      borderWidth: 1,
    });
    experiencesPage.drawText(experience.name, {
      x: 66,
      y: y + 84,
      size: 16,
      font: bold,
      color: palette.text,
    });
    experiencesPage.drawText(experience.time, {
      x: 66,
      y: y + 54,
      size: 11,
      font: bold,
      color: palette.brand,
    });
    experiencesPage.drawText(`Lieu: ${experience.location}`, {
      x: 66,
      y: y + 34,
      size: 11,
      font: regular,
      color: palette.text,
    });
    experiencesPage.drawText(`Partenaire: ${experience.partner}`, {
      x: 66,
      y: y + 16,
      size: 11,
      font: regular,
      color: palette.muted,
    });
  });

  experiencesPage.drawText("Contact support GRATISTAY", {
    x: 48,
    y: 120,
    size: 15,
    font: bold,
    color: palette.text,
  });
  drawWrappedText(experiencesPage, {
    text: `Disponible pour modifications, vouchers et assistance voyage: ${payload.supportPhone}`,
    x: 48,
    y: 96,
    maxWidth: 470,
    font: regular,
    size: 11,
    color: palette.muted,
  });
  drawFooter(experiencesPage, regular, 3);

  return {
    bytes: await pdf.save(),
    filename: buildFilename(payload.booking.reference),
  };
}

export async function generateDemoTravelPdf(reference: string) {
  return renderTravelPdf(findBookingPayload(reference));
}

export async function generateCheckoutTravelPdf(details: DemoCheckoutDetails) {
  return renderTravelPdf({
    booking: {
      reference: details.reference,
      startDate: details.startDate,
      endDate: details.endDate,
      travelers: details.travelers,
      totalPaid: details.totalPaid,
      paymentStatus: details.paymentStatus,
      bonusProgress: details.bonusProgress,
    },
    hotel: details.hotel,
    destination: details.destination,
    experiences: details.itinerary,
    voucherCode: details.voucherCode,
    supportPhone: details.supportPhone,
  });
}
