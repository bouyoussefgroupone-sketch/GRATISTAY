import type { AdminMetric } from "@/types/domain";

const accentClass = {
  teal: "bg-[#e7f8f7] text-[#0f766e]",
  amber: "bg-[#fff4db] text-[#b45309]",
  rose: "bg-[#fff0f5] text-[#be185d]",
};

export function MetricCard({ metric }: { metric: AdminMetric }) {
  return (
    <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm text-[var(--ink-600)]">{metric.label}</div>
        <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${accentClass[metric.tone]}`}>
          KPI
        </span>
      </div>
      <div className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
        {metric.value}
      </div>
      <div className="mt-3 text-sm text-[var(--ink-700)]">{metric.change}</div>
    </div>
  );
}
