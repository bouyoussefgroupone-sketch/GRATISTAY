import type { ReactNode } from "react";

const toneClasses = {
  sand: "bg-[var(--brand-50)] text-[var(--brand-800)] ring-1 ring-[#c8e7e6]",
  teal: "bg-[#e8f7f4] text-[#0f6c67] ring-1 ring-[#c8ebe5]",
  amber: "bg-[#fff5e6] text-[#94640f] ring-1 ring-[#efd7a7]",
  rose: "bg-[#fff1f1] text-[#b95f67] ring-1 ring-[#f4ccd2]",
  plum: "bg-[#f3f2ff] text-[#5c5acc] ring-1 ring-[#dbd8ff]",
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
