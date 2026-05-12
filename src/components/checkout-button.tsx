"use client";

import { useRouter } from "next/navigation";
import { getCurrentDemoUser } from "@/lib/demo-auth";

export function CheckoutButton() {
  const router = useRouter();

  const startCheckout = () => {
    const user = getCurrentDemoUser();

    if (!user) {
      const nextPath = `${window.location.pathname}${window.location.search}`;
      router.push(`/account?intent=checkout&next=${encodeURIComponent(nextPath)}`);
      return;
    }

    router.push("/account?payment=success");
  };

  return (
    <button
      onClick={startCheckout}
      className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--brand-800)] px-4 py-3 text-sm font-semibold text-white"
    >
      Payer la demo
    </button>
  );
}
