import Link from "next/link";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { PuzzleWidget } from "@/components/puzzle-widget";
import { buildRouteWithParams } from "@/lib/travel";
import { formatCurrency, formatDateRange } from "@/lib/format";
import type { Hotel, PuzzleResult } from "@/types/domain";

export function StickyBonusSummary({
  hotel,
  result,
  start,
  end,
  travelers,
  selectedIds,
}: {
  hotel: Hotel;
  result: PuzzleResult;
  start: string;
  end: string;
  travelers: number;
  selectedIds: string[];
}) {
  const visibleRequirements = result.requirements.filter(
    (requirement) => requirement.visibleToCustomer,
  );
  const cartHref = buildRouteWithParams("/cart", {
    hotel: hotel.slug,
    travelers,
    start,
    end,
    selected: selectedIds.join(","),
  });

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-[var(--shadow-strong)]">
      <div className="space-y-4 p-4">
        <div className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-muted)] p-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
            Hotel choisi
          </div>
          <div className="mt-2 text-xl font-semibold text-[var(--ink-950)]">{hotel.name}</div>
          <div className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--ink-700)]">
            <MapPin className="h-4 w-4 text-[var(--ink-500)]" />
            {hotel.district}
          </div>
          <div className="mt-4 grid gap-2 text-sm text-[var(--ink-700)]">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[var(--ink-500)]" />
              {formatDateRange(start, end)}
            </div>
            <div className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--ink-500)]" />
              {travelers} voyageurs
            </div>
          </div>
        </div>

        <PuzzleWidget
          progress={result.progress}
          unlocked={result.unlocked}
          imageUrl={hotel.imageUrl}
        />

        <div className="grid gap-2">
          {visibleRequirements.map((requirement) => (
            <div
              key={requirement.id}
              className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-3 text-sm"
            >
              <span className="text-[var(--ink-700)]">{requirement.label}</span>
              <span className="font-semibold text-[var(--ink-950)]">
                {requirement.current}/{requirement.target}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--ink-700)]">Total activites</span>
            <span className="text-xl font-semibold text-[var(--ink-950)]">
              {formatCurrency(result.totalClientAmount)}
            </span>
          </div>
          <div className="mt-3 text-sm text-[var(--ink-700)]">
            {result.unlocked
              ? "Hebergement debloque."
              : `${Math.max(0, 100 - result.progress)}% restants pour reveler la photo.`}
          </div>
        </div>

        <Link
          href={cartHref}
          className={`inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            result.unlocked
              ? "bg-[var(--brand-800)] text-white hover:bg-[var(--brand-700)]"
              : "bg-[var(--surface-strong)] text-[var(--ink-700)]"
          }`}
        >
          Continuer vers le panier
        </Link>
      </div>
    </div>
  );
}
