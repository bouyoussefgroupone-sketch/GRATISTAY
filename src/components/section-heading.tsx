import type { ReactNode } from "react";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--ink-950)] md:text-4xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{subtitle}</p>
        ) : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
