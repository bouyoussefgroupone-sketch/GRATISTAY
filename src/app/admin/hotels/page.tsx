import { hotels } from "@/data/demo-data";
import { formatCurrency } from "@/lib/format";

export default function AdminHotelsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ink-500)]">
          Catalogue
        </div>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[var(--ink-950)]">
          Hotels
        </h1>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--ink-600)]">
            <tr>
              <th className="px-5 py-4 font-medium">Hotel</th>
              <th className="px-5 py-4 font-medium">Zone</th>
              <th className="px-5 py-4 font-medium">Rating</th>
              <th className="px-5 py-4 font-medium">Cout nuit</th>
              <th className="px-5 py-4 font-medium">Valeur indic.</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel) => (
              <tr key={hotel.id} className="border-t border-[var(--line)]">
                <td className="px-5 py-4 font-medium text-[var(--ink-950)]">{hotel.name}</td>
                <td className="px-5 py-4 text-[var(--ink-700)]">{hotel.district}</td>
                <td className="px-5 py-4 text-[var(--ink-700)]">{hotel.rating}</td>
                <td className="px-5 py-4 text-[var(--ink-700)]">
                  {formatCurrency(hotel.internalNightlyCost)}
                </td>
                <td className="px-5 py-4 text-[var(--ink-700)]">
                  {formatCurrency(hotel.indicativePublicValue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
