import type { AdminMetric } from "@/types/domain";

const accentClass = {
  teal: "bg-[#e8f7f4] text-[#0f6c67]",
  amber: "bg-[#fff5e6] text-[#94640f]",
  rose: "bg-[#fff1f1] text-[#b95f67]",
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
