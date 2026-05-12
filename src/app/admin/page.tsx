import { MetricCard } from "@/components/admin/metric-card";
import { adminMetrics, auditHighlights, bookingRecords } from "@/data/demo-data";
import { formatCurrency } from "@/lib/format";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Dashboard principal
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Vue operationnelle GRATISTAY
        </h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-4">
        {adminMetrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="text-lg font-semibold text-[var(--ink-950)]">Reservations recentes</div>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-[var(--ink-500)]">
                <tr>
                  <th className="pb-3 font-medium">Reference</th>
                  <th className="pb-3 font-medium">Client</th>
                  <th className="pb-3 font-medium">Destination</th>
                  <th className="pb-3 font-medium">Montant</th>
                </tr>
              </thead>
              <tbody>
                {bookingRecords.map((booking) => (
                  <tr key={booking.reference} className="border-t border-[var(--line)]">
                    <td className="py-4 font-medium text-[var(--ink-950)]">{booking.reference}</td>
                    <td className="py-4 text-[var(--ink-700)]">{booking.customerName}</td>
                    <td className="py-4 text-[var(--ink-700)]">{booking.destinationLabel}</td>
                    <td className="py-4 text-[var(--ink-950)]">{formatCurrency(booking.totalPaid)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="text-lg font-semibold text-[var(--ink-950)]">Historique sensible</div>
          <div className="mt-5 space-y-3">
            {auditHighlights.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-4 text-sm text-[var(--ink-700)]"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
