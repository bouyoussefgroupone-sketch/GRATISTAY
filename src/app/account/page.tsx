import { Download } from "lucide-react";
import { SiteFrame } from "@/components/site-frame";
import { bookingRecords } from "@/data/demo-data";
import { formatCurrency, formatDateRange, paymentTone } from "@/lib/format";

export default function AccountPage() {
  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
              Mes reservations
            </h1>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {bookingRecords.map((booking) => (
                <article
                  key={booking.reference}
                  className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-5"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                    {booking.reference}
                  </div>
                  <div className="mt-2 text-xl font-semibold text-[var(--ink-950)]">
                    {booking.destinationLabel}
                  </div>
                  <div className="mt-2 text-sm text-[var(--ink-700)]">{booking.hotelName}</div>
                  <div className="mt-4 text-sm text-[var(--ink-700)]">
                    {formatDateRange(booking.startDate, booking.endDate)}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[var(--ink-800)]">
                      Bonus {booking.bonusProgress}%
                    </span>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-lg font-semibold text-[var(--ink-950)]">
                      {formatCurrency(booking.totalPaid)}
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-700)] px-4 py-2 text-sm font-semibold text-white">
                      <Download className="h-4 w-4" />
                      PDF
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
