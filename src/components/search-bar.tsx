import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { destinations } from "@/data/demo-data";

interface SearchBarProps {
  action?: string;
  destination?: string;
  start?: string;
  end?: string;
  travelers?: string;
  compact?: boolean;
}

export function SearchBar({
  action = "/search",
  destination = "marrakech",
  start = "2026-06-14",
  end = "2026-06-17",
  travelers = "2",
  compact = false,
}: SearchBarProps) {
  const wrapperClass = compact
    ? "rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm"
    : "rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_20px_60px_rgba(15,23,40,0.08)]";
  const fieldClass = compact
    ? "rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3"
    : "rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3.5";

  return (
    <form action={action} className={wrapperClass}>
      <div className="grid gap-3 xl:grid-cols-[1.4fr_1fr_1fr_0.9fr_auto]">
        <label className={fieldClass}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
            <MapPin className="h-4 w-4" />
            Destination
          </div>
          <select
            name="destination"
            defaultValue={destination}
            className="mt-2 w-full bg-transparent text-sm font-medium text-[var(--ink-950)] outline-none"
          >
            {destinations.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className={fieldClass}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
            <CalendarDays className="h-4 w-4" />
            Arrivee
          </div>
          <input
            type="date"
            name="start"
            defaultValue={start}
            className="mt-2 w-full bg-transparent text-sm font-medium text-[var(--ink-950)] outline-none"
          />
        </label>

        <label className={fieldClass}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
            <CalendarDays className="h-4 w-4" />
            Depart
          </div>
          <input
            type="date"
            name="end"
            defaultValue={end}
            className="mt-2 w-full bg-transparent text-sm font-medium text-[var(--ink-950)] outline-none"
          />
        </label>

        <label className={fieldClass}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
            <Users className="h-4 w-4" />
            Voyageurs
          </div>
          <input
            type="number"
            min="1"
            max="8"
            name="travelers"
            defaultValue={travelers}
            className="mt-2 w-full bg-transparent text-sm font-medium text-[var(--ink-950)] outline-none"
          />
        </label>

        <button className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--brand-700)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-600)]">
          <Search className="h-4 w-4" />
          Rechercher
        </button>
      </div>
    </form>
  );
}
