import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/payment-success")({
  head: () => ({
    meta: [
      { title: "Payment successful · ClearCUT AI" },
      { name: "description", content: "Your Razorpay payment was successful." },
    ],
  }),
  component: PaymentSuccessPage,
});

function PaymentSuccessPage() {
  const search = useSearch({ from: "/payment-success" });
  const plan = typeof search.plan === "string" ? search.plan : "Purchase";
  const credits = typeof search.credits === "string" ? search.credits : "0";
  const paymentId = typeof search.paymentId === "string" ? search.paymentId : "-";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-card">
          <h1 className="text-3xl font-bold">Thank you for your payment.</h1>
          <p className="mt-2 text-muted-foreground">Your credits have been added successfully.</p>
          <div className="mt-8 space-y-2 rounded-2xl border border-border bg-background p-5 text-left text-sm">
            <p><span className="text-muted-foreground">Plan:</span> {plan}</p>
            <p><span className="text-muted-foreground">Credits added:</span> {credits}</p>
            <p><span className="text-muted-foreground">Payment ID:</span> {paymentId}</p>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app" className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
              Start editing
            </Link>
            <Link to="/dashboard" className="rounded-xl border border-border bg-background px-5 py-2.5 text-sm font-semibold hover:bg-muted">
              View profile
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
