import Image from "next/image";
import { Clock3, MapPin, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import type { Activity } from "@/types/domain";

export function ActivityCard({
  activity,
  selected,
  onToggle,
}: {
  activity: Activity;
  selected: boolean;
  onToggle: (activityId: string) => void;
}) {
  return (
    <article className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
      <div className="flex flex-col gap-4 p-4 sm:flex-row">
        <div className="relative h-36 w-full overflow-hidden rounded-2xl sm:h-28 sm:w-36">
          <Image
            src={activity.imageUrl}
            alt={activity.name}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-500)]">
              {activity.partner}
            </div>
            <h3 className="mt-1 text-lg font-semibold text-[var(--ink-950)]">
              {activity.name}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{activity.summary}</p>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[var(--ink-700)]">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {activity.duration}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {activity.meetingPoint}
            </span>
          </div>
        </div>

        <div className="flex min-w-36 flex-row items-end justify-between gap-3 sm:flex-col sm:items-end">
          <div className="text-right">
            <div className="text-xl font-semibold text-[var(--ink-950)]">
              {formatCurrency(activity.pricePerTraveler)}
            </div>
            <div className="text-xs text-[var(--ink-600)]">par voyageur</div>
          </div>

          <button
            onClick={() => onToggle(activity.id)}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              selected
                ? "bg-[var(--brand-50)] text-[var(--brand-700)]"
                : "bg-[var(--brand-700)] text-white hover:bg-[var(--brand-600)]"
            }`}
          >
            <Plus className={`h-4 w-4 ${selected ? "rotate-45" : ""}`} />
            {selected ? "Retire" : "Ajouter"}
          </button>
        </div>
      </div>
    </article>
  );
}
