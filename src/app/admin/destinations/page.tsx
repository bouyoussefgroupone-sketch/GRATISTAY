import { destinations } from "@/data/demo-data";

export default function AdminDestinationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Catalogue
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Destinations
        </h1>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {destinations.map((destination) => (
          <article
            key={destination.slug}
            className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm"
          >
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              {destination.country}
            </div>
            <div className="mt-2 text-2xl font-semibold text-[var(--ink-950)]">{destination.city}</div>
            <div className="mt-2 text-sm text-[var(--ink-700)]">{destination.heroTag}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {destination.featuredBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
