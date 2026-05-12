import { supportTickets } from "@/data/demo-data";
import { formatFriendlyDate, supportTone } from "@/lib/format";

export default function AdminSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Operations
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Support
        </h1>
      </div>

      <div className="space-y-4">
        {supportTickets.map((ticket) => (
          <article
            key={ticket.reference}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                  {ticket.reference}
                </div>
                <div className="mt-2 text-xl font-semibold text-[var(--ink-950)]">{ticket.subject}</div>
                <div className="mt-2 text-sm text-[var(--ink-700)]">
                  {ticket.customerName} - {ticket.linkedBooking}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${supportTone(ticket.status)}`}>
                  {ticket.status}
                </span>
                <span className="text-sm text-[var(--ink-600)]">
                  {formatFriendlyDate(ticket.lastUpdate)}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
