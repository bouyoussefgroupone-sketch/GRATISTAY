"use client";

import { useRouter } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";
import { buildRouteWithParams } from "@/lib/travel";

export function CheckoutButton({
  hotelSlug,
  start,
  end,
  travelers,
  selectedIds,
}: {
  hotelSlug: string;
  start: string;
  end: string;
  travelers: number;
  selectedIds: string[];
}) {
  const router = useRouter();

  const startCheckout = () => {
    const confirmationHref = buildRouteWithParams("/confirmation", {
      hotel: hotelSlug,
      start,
      end,
      travelers,
      selected: selectedIds.join(","),
    });
    const user = getCurrentDemoUser();

    if (!user) {
      router.push(`/account?intent=checkout&next=${encodeURIComponent(confirmationHref)}`);
      return;
    }

    router.push(confirmationHref);
  };

  return (
    <button
      onClick={startCheckout}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white"
    >
      Payer et confirmer
    </button>
  );
}
