import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  Download,
  Headphones,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
} from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { buildDemoCheckoutDetails } from "@/lib/demo-checkout";
import { formatCurrency, formatDateRange } from "@/lib/format";

function getOptionalString(value: string | string[] | undefined) {
  return typeof value === "string" ? value : undefined;
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const details = buildDemoCheckoutDetails({
    hotelSlug: getOptionalString(params.hotel),
    start: getOptionalString(params.start),
    end: getOptionalString(params.end),
    travelers: getOptionalString(params.travelers),
    selected: params.selected,
  });

  return (
    <SiteFrame>
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-strong)]">
            <div className="absolute -left-16 top-10 h-48 w-48 rounded-full bg-[rgba(19,113,122,0.10)] blur-3xl" />
            <div className="absolute right-[-80px] top-[-40px] h-56 w-56 rounded-full bg-[rgba(217,123,115,0.08)] blur-3xl" />
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="relative p-8 md:p-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-800)]">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Reservation confirmee
                </div>
                <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)] sm:text-5xl">
                  Votre sejour GRATISTAY est valide.
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--ink-700)]">
                  Paiement recu, dossier cree et carnet de voyage pret a etre telecharge.
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-3">
                  <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                      Reference
                    </div>
                    <div className="mt-2 text-lg font-semibold text-[var(--ink-950)]">
                      {details.reference}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                      Dates
                    </div>
                    <div className="mt-2 text-lg font-semibold text-[var(--ink-950)]">
                      {formatDateRange(details.startDate, details.endDate)}
                    </div>
                  </div>
                  <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                      Total
                    </div>
                    <div className="mt-2 text-lg font-semibold text-[var(--ink-950)]">
                      {formatCurrency(details.totalPaid)}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={details.pdfHref}
                    className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand-800)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
                  >
                    <Download className="h-4 w-4" />
                    Telecharger le PDF
                  </a>
                  <Link
                    href="/account"
                    className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--surface-muted)]"
                  >
                    <UserRound className="h-4 w-4" />
                    Voir mon compte
                  </Link>
                </div>
              </div>

              <div className="p-5 pt-0 lg:p-6 lg:pl-0">
                <div className="relative h-full min-h-[340px] overflow-hidden rounded-[30px] border border-[var(--line)]">
                  <Image
                    src={details.hotel.imageUrl}
                    alt={details.hotel.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 36vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,18,30,0.84)] via-[rgba(10,18,30,0.18)] to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-white">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/70">
                      Hotel confirme
                    </div>
                    <div className="mt-2 text-3xl font-semibold">{details.hotel.name}</div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/82">
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {details.destination.label}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        Bonus Stay {details.bonusProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-[32px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)]">
              <div className="flex flex-col gap-3 border-b border-[var(--line)] pb-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                    Planning
                  </div>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                    Activites confirmees
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-700)]">
                  <Ticket className="h-4 w-4 text-[var(--brand-700)]" />
                  {details.selectedActivities.length} experiences
                </div>
              </div>

              <div className="mt-5 grid gap-4">
                {details.itinerary.map((item, index) => (
                  <article
                    key={`${item.name}-${item.time}`}
                    className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] px-5 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--surface)] text-sm font-semibold text-[var(--brand-800)]">
                        {index + 1}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-semibold text-[var(--ink-950)]">{item.name}</div>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-[var(--ink-700)]">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-[var(--brand-700)]" />
                            {item.time}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[var(--brand-700)]" />
                            {item.location}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-[var(--ink-700)]">{item.partner}</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[30px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                  Resume
                </div>
                <div className="mt-3 text-2xl font-semibold text-[var(--ink-950)]">
                  {details.hotel.name}
                </div>
                <div className="mt-3 space-y-3 text-sm text-[var(--ink-700)]">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[var(--ink-500)]" />
                    {formatDateRange(details.startDate, details.endDate)}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <UserRound className="h-4 w-4 text-[var(--ink-500)]" />
                    {details.travelers} voyageurs
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[var(--brand-700)]" />
                    Dossier {details.unlocked ? "confirme" : "paye, validation en cours"}
                  </div>
                </div>
              </div>

              <div className="rounded-[30px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[var(--shadow-soft)]">
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--brand-700)]">
                  Support
                </div>
                <div className="mt-3 text-2xl font-semibold text-[var(--ink-950)]">
                  Assistance voyage
                </div>
                <div className="mt-3 space-y-3 text-sm text-[var(--ink-700)]">
                  <div className="inline-flex items-center gap-2">
                    <Headphones className="h-4 w-4 text-[var(--brand-700)]" />
                    {details.supportPhone}
                  </div>
                  <div>Carnet PDF, voucher hotel et experiences accessibles des maintenant.</div>
                </div>
                <Link
                  href="/support"
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm font-semibold text-[var(--ink-900)] transition hover:bg-[var(--surface)]"
                >
                  Contacter le support
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
