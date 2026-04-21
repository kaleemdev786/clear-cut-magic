import { createFileRoute, Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getCurrentUser, addCredits, recordOrder } from "@/lib/app-state";
import { openRazorpayCheckout } from "@/lib/razorpay";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · ClearCUT AI" },
      { name: "description", content: "Free plan, Pro subscription, and credit packs for ClearCUT AI." },
    ],
  }),
  component: PricingPage,
});

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Try it today, no card required.",
    features: ["3 images / day", "Standard quality", "PNG download", "Auto-delete in 1 hour"],
    cta: "Start free",
  },
  {
    name: "Pro",
    price: "$12",
    amount: 999,
    currency: "INR" as const,
    credits: 200,
    desc: "For freelancers and creators.",
    features: ["Unlimited images", "HD quality", "7-day history", "Priority queue", "Email support"],
    cta: "Upgrade to Pro",
    featured: true,
  },
  {
    name: "Business",
    price: "$39",
    desc: "For teams and ecommerce stores.",
    features: ["Everything in Pro", "API access", "Bulk processing", "Team seats", "Dedicated support"],
    cta: "Contact sales",
  },
];

const credits = [
  { count: 50, priceLabel: "$5", amount: 199, currency: "INR" as const },
  { count: 250, priceLabel: "$20", amount: 699, currency: "INR" as const },
  { count: 1000, priceLabel: "$60", amount: 1999, currency: "INR" as const },
];

function PricingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<
    { label: string; amount: number; currency: "USD" | "INR"; credits: number; priceLabel?: string } | null
  >(null);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "pro") {
      beginCheckout({ label: "Pro Plan", amount: 999, currency: "INR", credits: 200, priceLabel: "$12" });
      return;
    }
    if (params.get("plan") === "business") {
      setError("For Business plan, please contact sales from the section below.");
      const enterprise = document.getElementById("enterprise-contact");
      enterprise?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const beginCheckout = (item: {
    label: string;
    amount: number;
    currency: "USD" | "INR";
    credits: number;
    priceLabel?: string;
  }) => {
    if (!getCurrentUser()) {
      navigate({ to: "/signup" });
      return;
    }
    setError(null);
    setSelected(item);
  };

  const handlePay = async () => {
    const user = getCurrentUser();
    if (!user || !selected) return;
    const selectedItem = selected;

    setIsPaying(true);
    setError(null);
    // Close dialog first so Radix overlay does not block viewport.
    setSelected(null);
    try {
      const result = await openRazorpayCheckout({
        amount: selectedItem.amount,
        currency: selectedItem.currency,
        name: "ClearCUT AI",
        description: selectedItem.label,
        prefill: { name: user.name, email: user.email },
      });

      addCredits(user.id, selectedItem.credits);
      recordOrder({
        userId: user.id,
        plan: selectedItem.label,
        amount: selectedItem.amount,
        currency: selectedItem.currency,
        creditsAdded: selectedItem.credits,
        paymentId: result.razorpay_payment_id,
      });
      navigate({
        to: "/payment-success",
        search: {
          plan: selectedItem.label,
          credits: String(selectedItem.credits),
          paymentId: result.razorpay_payment_id,
        },
      });
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "Payment failed. Please try again.");
      setSelected(selectedItem);
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing that scales with you.</h1>
          <p className="mt-4 text-muted-foreground">
            Pick a subscription, or buy credits as you go.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 ${
                p.featured ? "border-accent bg-card shadow-glow" : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-8 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.desc}</div>
              <div className="mt-2 text-2xl font-semibold">{p.name}</div>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-5xl font-bold">{p.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <ul className="mt-7 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  if (p.name === "Pro") {
                    beginCheckout({
                      label: "Pro Plan",
                      amount: p.amount,
                      currency: p.currency,
                      credits: p.credits,
                      priceLabel: p.price,
                    });
                    return;
                  }
                  navigate({ to: p.name === "Business" ? "/" : "/signup" });
                }}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:scale-[1.01] ${
                  p.featured ? "bg-brand-gradient text-white shadow-glow" : "border border-border hover:bg-muted"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Or buy credits</h2>
            <p className="mt-2 text-muted-foreground">One credit = one image. Never expire.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {credits.map((c) => (
              <div key={c.count} className="flex items-center justify-between rounded-2xl border border-border bg-card p-6">
                <div>
                  <div className="text-2xl font-bold">{c.count} credits</div>
                  <div className="text-sm text-muted-foreground">${(c.amount / c.count).toFixed(2)}/image</div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    beginCheckout({
                      label: `${c.count} Credit Pack`,
                      amount: c.amount,
                      currency: c.currency,
                      credits: c.count,
                      priceLabel: c.priceLabel,
                    })
                  }
                  className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow"
                >
                  {c.priceLabel}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="enterprise-contact" className="mt-16 text-center text-sm text-muted-foreground">
          Need an enterprise plan?{" "}
          <a href="mailto:sales@clearcut.ai" className="text-foreground underline">
            Contact sales
          </a>
          .
        </div>
      </main>
      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete payment</DialogTitle>
            <DialogDescription>
              {selected ? `${selected.label} - ${selected.priceLabel ?? "$0"} for ${selected.credits} credits.` : ""}
            </DialogDescription>
          </DialogHeader>
          {error && <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <button
            type="button"
            onClick={handlePay}
            disabled={!selected || isPaying}
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
          >
            {isPaying ? "Opening Razorpay..." : "Pay with Razorpay"}
          </button>
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </div>
  );
}
