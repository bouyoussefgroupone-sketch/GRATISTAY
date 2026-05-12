import { SiteFrame } from "@/components/site-frame";
import { supportTickets } from "@/data/demo-data";
import { formatFriendlyDate, supportTone } from "@/lib/format";

export default function SupportPage() {
  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
              Support
            </h1>
            <div className="mt-6 space-y-4">
              {supportTickets.map((ticket) => (
                <article
                  key={ticket.reference}
                  className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-[var(--ink-950)]">
                        {ticket.subject}
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--ink-600)]">
                        {ticket.reference} - {ticket.linkedBooking}
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${supportTone(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-[var(--ink-700)]">
                    Derniere mise a jour: {formatFriendlyDate(ticket.lastUpdate)}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
            <div className="text-xl font-semibold text-[var(--ink-950)]">Nouveau ticket</div>
            <div className="mt-5 grid gap-4">
              <input
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Sujet"
              />
              <select className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none">
                <option>Probleme de paiement</option>
                <option>Modification reservation</option>
                <option>Annulation</option>
                <option>Probleme activite</option>
                <option>Probleme hotel</option>
                <option>Demande d&apos;information</option>
              </select>
              <textarea
                className="min-h-40 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 outline-none"
                placeholder="Expliquez votre demande"
              />
              <button className="rounded-2xl bg-[var(--brand-700)] px-4 py-3 text-sm font-semibold text-white">
                Envoyer au support
              </button>
            </div>
          </aside>
        </div>
      </section>
    </SiteFrame>
  );
}
