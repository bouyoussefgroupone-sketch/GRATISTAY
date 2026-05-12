import { activities } from "@/data/demo-data";
import { formatCurrency } from "@/lib/format";

export default function AdminActivitiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Catalogue
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Activites
        </h1>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--ink-600)]">
            <tr>
              <th className="px-5 py-4 font-medium">Activite</th>
              <th className="px-5 py-4 font-medium">Categorie</th>
              <th className="px-5 py-4 font-medium">Prix client</th>
              <th className="px-5 py-4 font-medium">Cout fournisseur</th>
              <th className="px-5 py-4 font-medium">Contribution</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id} className="border-t border-[var(--line)]">
                <td className="px-5 py-4 font-medium text-[var(--ink-950)]">{activity.name}</td>
                <td className="px-5 py-4 text-[var(--ink-700)]">{activity.categoryKey}</td>
                <td className="px-5 py-4 text-[var(--ink-700)]">
                  {formatCurrency(activity.pricePerTraveler)}
                </td>
                <td className="px-5 py-4 text-[var(--ink-700)]">
                  {formatCurrency(activity.supplierCostPerTraveler)}
                </td>
                <td className="px-5 py-4 text-[var(--ink-700)]">{activity.puzzleContribution} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
