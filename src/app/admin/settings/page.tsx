import { categories, puzzleRules } from "@/data/demo-data";
import { formatCurrency, formatPercent } from "@/lib/format";
import { roleLabels, rolePermissions } from "@/lib/permissions";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Reglages
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Regles puzzle et roles
        </h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="text-lg font-semibold text-[var(--ink-950)]">Bonus Stay</div>
          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <div className="text-xs text-[var(--ink-600)]">Services essentiels mini</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--ink-950)]">
                {puzzleRules.minEssentialSelections}
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <div className="text-xs text-[var(--ink-600)]">Activites mini</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--ink-950)]">
                {puzzleRules.minActivities}
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <div className="text-xs text-[var(--ink-600)]">Panier mini</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--ink-950)]">
                {formatCurrency(puzzleRules.minCartAmount)}
              </div>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <div className="text-xs text-[var(--ink-600)]">Marge mini</div>
              <div className="mt-1 text-2xl font-semibold text-[var(--ink-950)]">
                {formatPercent(puzzleRules.minMarginRate)}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category.key}
                className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
              >
                {category.name}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="text-lg font-semibold text-[var(--ink-950)]">Roles et permissions</div>
          <div className="mt-5 space-y-4">
            {Object.entries(rolePermissions).map(([role, permissions]) => (
              <article key={role} className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                <div className="font-semibold text-[var(--ink-950)]">
                  {roleLabels[role as keyof typeof roleLabels]}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {permissions.length === 0 ? (
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink-700)]">
                      Espace client uniquement
                    </span>
                  ) : (
                    permissions.map((permission) => (
                      <span
                        key={permission}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-[var(--ink-700)]"
                      >
                        {permission}
                      </span>
                    ))
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
