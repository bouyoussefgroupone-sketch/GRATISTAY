"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { destinations } from "@/data/demo-data";
import {
  addDaysToIsoDate,
  buildRouteWithParams,
  clampTravelers,
  getDefaultTravelWindow,
  getTodayIsoDate,
  normalizeTravelWindow,
  validateTravelWindow,
} from "@/lib/travel";

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
  start,
  end,
  travelers = "2",
  compact = false,
}: SearchBarProps) {
  const router = useRouter();
  const defaultWindow = getDefaultTravelWindow();
  const [form, setForm] = useState(() => {
    const normalizedWindow = normalizeTravelWindow(start, end);

    return {
      destination,
      start: normalizedWindow.start,
      end: normalizedWindow.end,
      travelers,
    };
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const today = getTodayIsoDate();
  const wrapperClass = compact
    ? "rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm"
    : "rounded-[28px] border border-[var(--line)] bg-[rgba(255,255,255,0.92)] p-4 shadow-[var(--shadow-strong)] backdrop-blur";
  const fieldClass = compact
    ? "rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3"
    : "rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3.5";

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateTravelWindow(form.start, form.end);
    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError("");
    startTransition(() => {
      router.push(
        buildRouteWithParams(action, {
          destination: form.destination,
          start: form.start,
          end: form.end,
          travelers: clampTravelers(form.travelers),
        }),
      );
    });
  };

  return (
    <form onSubmit={submitSearch} className={wrapperClass}>
      <div className="grid gap-3 xl:grid-cols-[1.4fr_1fr_1fr_0.9fr_auto]">
        <label className={fieldClass}>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-600)]">
            <MapPin className="h-4 w-4" />
            Destination
          </div>
          <select
            name="destination"
            value={form.destination}
            onChange={(event) => setForm((current) => ({ ...current, destination: event.target.value }))}
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
            min={today}
            value={form.start || defaultWindow.start}
            onChange={(event) => {
              const nextStart = event.target.value;
              setForm((current) => ({
                ...current,
                start: nextStart,
                end: current.end <= nextStart ? addDaysToIsoDate(nextStart, 1) : current.end,
              }));
            }}
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
            min={form.start || today}
            value={form.end || defaultWindow.end}
            onChange={(event) => setForm((current) => ({ ...current, end: event.target.value }))}
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
            value={form.travelers}
            onChange={(event) => setForm((current) => ({ ...current, travelers: event.target.value }))}
            className="mt-2 w-full bg-transparent text-sm font-medium text-[var(--ink-950)] outline-none"
          />
        </label>

        <button
          disabled={isPending}
          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[var(--brand-800)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Search className="h-4 w-4" />
          {isPending ? "Ouverture..." : "Rechercher"}
        </button>
      </div>

      {error ? <div className="mt-3 text-sm font-medium text-[var(--danger-500)]">{error}</div> : null}
    </form>
  );
}
