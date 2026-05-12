"use client";

import { useDeferredValue, useState, useTransition } from "react";
import { Search } from "lucide-react";
import { ActivityListCard } from "@/components/activity-list-card";
import { StickyBonusSummary } from "@/components/sticky-bonus-summary";
import { categories } from "@/data/demo-data";
import { formatCurrency } from "@/lib/format";
import { computePuzzleProgress } from "@/lib/puzzle-engine";
import type { Activity, Hotel } from "@/types/domain";

export function PuzzleBuilder({
  hotel,
  activities,
  initialSelection,
  travelers,
  start,
  end,
}: {
  hotel: Hotel;
  activities: Activity[];
  initialSelection: string[];
  travelers: number;
  start: string;
  end: string;
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelection);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const visibleActivities = activities.filter((activity) => {
    const matchesCategory = activity.categoryKey === activeCategory;
    const matchesQuery =
      !normalizedQuery ||
      activity.name.toLowerCase().includes(normalizedQuery) ||
      activity.summary.toLowerCase().includes(normalizedQuery) ||
      activity.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery;
  });

  const result = computePuzzleProgress({
    hotel,
    selectedActivityIds: selectedIds,
    activities,
    travelers,
  });

  const toggleActivity = (activityId: string) => {
    startTransition(() => {
      setSelectedIds((current) =>
        current.includes(activityId)
          ? current.filter((id) => id !== activityId)
          : [...current, activityId],
      );
    });
  };

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)]">
                Choisissez vos activites
              </h1>
              <p className="mt-1 text-sm text-[var(--ink-700)]">Ajoutez vos experiences.</p>
            </div>

            <label className="flex min-w-72 items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-700)]">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Rechercher une activite"
                className="w-full bg-transparent outline-none"
              />
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => {
              const count = selectedIds.filter((id) =>
                activities.some(
                  (activity) => activity.id === id && activity.categoryKey === category.key,
                ),
              ).length;

              return (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category.key
                      ? "border-[var(--brand-700)] bg-[var(--brand-50)] text-[var(--brand-700)]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-700)]"
                  }`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="space-y-4">
            {visibleActivities.map((activity) => (
              <ActivityListCard
                key={activity.id}
                activity={activity}
                selected={selectedIds.includes(activity.id)}
                onToggle={toggleActivity}
              />
            ))}
          </div>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <StickyBonusSummary
              hotel={hotel}
              result={result}
              start={start}
              end={end}
              travelers={travelers}
            />
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-4 bottom-4 z-30 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 shadow-[0_20px_50px_rgba(15,23,40,0.18)] md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              Puzzle
            </div>
            <div className="text-lg font-semibold text-[var(--ink-950)]">{result.progress}%</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--ink-500)]">
              Total
            </div>
            <div className="text-lg font-semibold text-[var(--ink-950)]">
              {formatCurrency(result.totalClientAmount)}
            </div>
          </div>
        </div>
        {isPending ? (
          <div className="mt-2 text-xs text-[var(--ink-600)]">Mise a jour...</div>
        ) : null}
      </div>
    </section>
  );
}
