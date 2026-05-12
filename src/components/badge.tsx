import type { ReactNode } from "react";

const toneClasses = {
  sand: "bg-[var(--brand-50)] text-[var(--brand-700)] ring-1 ring-[#cfe0ff]",
  teal: "bg-[#e7f8f7] text-[#0f766e] ring-1 ring-[#bce6e1]",
  amber: "bg-[#fff5df] text-[#a16207] ring-1 ring-[#fde7b4]",
  rose: "bg-[#fff0f5] text-[#be185d] ring-1 ring-[#ffc8dc]",
  plum: "bg-[#f3efff] text-[#6d28d9] ring-1 ring-[#ddd2ff]",
};

export function Badge({
  children,
  tone = "sand",
}: {
  children: ReactNode;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
