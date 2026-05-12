import { AccountShell } from "@/components/account-shell";
import { SiteFrame } from "@/components/site-frame";

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const nextPath = typeof params.next === "string" ? params.next : null;
  const paymentState = typeof params.payment === "string" ? params.payment : null;
  const intent = typeof params.intent === "string" ? params.intent : null;

  return (
    <SiteFrame>
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <AccountShell nextPath={nextPath} paymentState={paymentState} intent={intent} />
        </div>
      </section>
    </SiteFrame>
  );
}
