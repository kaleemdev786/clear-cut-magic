import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

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
  { count: 50, price: "$5" },
  { count: 250, price: "$20" },
  { count: 1000, price: "$60" },
];

function PricingPage() {
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
                  <div className="text-sm text-muted-foreground">${(parseInt(c.price.slice(1)) / c.count).toFixed(2)}/image</div>
                </div>
                <button className="rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow">
                  {c.price}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          Need an enterprise plan? <Link to="/" className="text-foreground underline">Contact us</Link>.
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
