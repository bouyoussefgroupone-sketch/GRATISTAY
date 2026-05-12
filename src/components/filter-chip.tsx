export function FilterChip({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium ${
        active
          ? "border-[var(--brand-800)] bg-[var(--brand-50)] text-[var(--brand-800)]"
          : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink-700)]"
      }`}
    >
      {label}
    </span>
  );
}
