import { campaignRecords } from "@/data/demo-data";
import { formatCurrency } from "@/lib/format";

export default function AdminCampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Marketing
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Campagnes
        </h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {campaignRecords.map((campaign) => (
          <article
            key={campaign.name}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
                {campaign.channel}
              </div>
              <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--ink-700)]">
                {campaign.status}
              </span>
            </div>
            <div className="mt-3 text-xl font-semibold text-[var(--ink-950)]">{campaign.name}</div>
            <div className="mt-2 text-sm text-[var(--ink-700)]">{campaign.destinationLabel}</div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
                <div className="text-xs text-[var(--ink-600)]">Budget</div>
                <div className="mt-1 font-semibold text-[var(--ink-950)]">
                  {formatCurrency(campaign.budget)}
                </div>
              </div>
              <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
                <div className="text-xs text-[var(--ink-600)]">Revenu</div>
                <div className="mt-1 font-semibold text-[var(--ink-950)]">
                  {formatCurrency(campaign.revenue)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-[var(--ink-700)]">
              {campaign.conversions} conversions
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
