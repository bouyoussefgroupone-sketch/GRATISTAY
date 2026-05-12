import { bookingRecords } from "@/data/demo-data";
import { formatCurrency, formatDateRange, paymentTone } from "@/lib/format";

export default function AdminBookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Operations
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Reservations
        </h1>
      </div>

      <div className="space-y-4">
        {bookingRecords.map((booking) => (
          <article
            key={booking.reference}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                  {booking.reference}
                </div>
                <div className="mt-2 text-xl font-semibold text-[var(--ink-950)]">
                  {booking.customerName}
                </div>
                <div className="mt-2 text-sm text-[var(--ink-700)]">
                  {booking.destinationLabel} - {booking.hotelName}
                </div>
                <div className="mt-1 text-sm text-[var(--ink-600)]">
                  {formatDateRange(booking.startDate, booking.endDate)}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentTone(booking.paymentStatus)}`}>
                  {booking.paymentStatus}
                </span>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--ink-700)]">
                  {booking.status}
                </span>
                <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--ink-700)]">
                  Bonus {booking.bonusProgress}%
                </span>
                <span className="text-lg font-semibold text-[var(--ink-950)]">
                  {formatCurrency(booking.totalPaid)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
