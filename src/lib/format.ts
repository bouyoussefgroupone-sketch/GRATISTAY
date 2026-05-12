import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { roleLabels } from "@/lib/permissions";
import type { PaymentStatus, RoleKey, SupportStatus } from "@/types/domain";

export function formatCurrency(value: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatFriendlyDate(isoDate: string) {
  return format(new Date(isoDate), "d MMM yyyy", { locale: fr });
}

export function formatDateRange(startDate: string, endDate: string) {
  return `${formatFriendlyDate(startDate)} - ${formatFriendlyDate(endDate)}`;
}

export function formatRole(role: RoleKey) {
  return roleLabels[role];
}

export function paymentTone(status: PaymentStatus) {
  if (status === "paid") return "bg-emerald-100 text-emerald-800";
  if (status === "pending") return "bg-amber-100 text-amber-800";
  if (status === "failed") return "bg-rose-100 text-rose-800";
  return "bg-zinc-200 text-zinc-700";
}

export function supportTone(status: SupportStatus) {
  if (status === "resolved" || status === "closed") return "bg-emerald-100 text-emerald-800";
  if (status === "waiting_partner") return "bg-sky-100 text-sky-800";
  if (status === "waiting_customer") return "bg-amber-100 text-amber-800";
  return "bg-rose-100 text-rose-800";
}
