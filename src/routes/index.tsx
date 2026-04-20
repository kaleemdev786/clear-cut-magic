import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wand2, Zap, ShieldCheck, Download, Image as ImageIcon, ArrowRight, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { BeforeAfter } from "@/components/before-after";
import heroImg from "@/assets/hero-cutout.jpg";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

const features = [
  { icon: Zap, title: "Instant results", desc: "AI processing under 5 seconds, every time." },
  { icon: Wand2, title: "Pixel-perfect edges", desc: "Hair, fur and fine detail preserved." },
  { icon: ShieldCheck, title: "Private by default", desc: "Images auto-delete within 1 hour." },
  { icon: Download, title: "Transparent PNG", desc: "Download print-ready cutouts in one click." },
];

const plans = [
  { name: "Free", price: "$0", desc: "Try it today", features: ["3 images / day", "Standard quality", "PNG download"] },
  { name: "Pro", price: "$12", desc: "For creators", features: ["Unlimited images", "HD quality", "7-day history", "Priority queue"], featured: true },
  { name: "Business", price: "$39", desc: "For teams", features: ["API access", "Team seats", "Bulk processing", "Dedicated support"] },
];

function LandingPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Powered by AI · No signup required
              </div>
              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
                Remove backgrounds<br />
                in <span className="text-brand-gradient">one click.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                ClearCUT AI gives you crisp, transparent cutouts in seconds. Built for ecommerce sellers,
                designers and creators who don't have time to mask.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/app"
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
                >
                  Try it free <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center rounded-xl border border-border bg-card/50 px-6 py-3 text-base font-medium backdrop-blur transition-colors hover:bg-card"
                >
                  See pricing
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                JPG / PNG · up to 10 MB · auto-deleted in 1 hour
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-brand-gradient opacity-30 blur-3xl" />
              <div className="relative rounded-3xl border border-border bg-card p-2 shadow-card">
                <BeforeAfter before={heroImg} after={heroImg} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Everything you need, nothing you don't.</h2>
            <p className="mt-3 text-muted-foreground">
              Built for speed and quality. No editor learning curve.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-glow"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-soft">
                  <f.icon className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Three steps. No friction.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { n: "01", t: "Upload", d: "Drag & drop or paste a JPG/PNG up to 10MB." },
              { n: "02", t: "AI processes", d: "Our model cuts the subject in under 5 seconds." },
              { n: "03", t: "Download", d: "Get a crisp transparent PNG, ready to use." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
                <div className="text-sm font-mono text-brand-gradient">{s.n}</div>
                <div className="mt-2 text-lg font-semibold">{s.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="border-t border-border/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Simple, fair pricing.</h2>
            <p className="mt-3 text-muted-foreground">Start free. Upgrade when you need more.</p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border p-6 ${
                  p.featured
                    ? "border-accent bg-card shadow-glow"
                    : "border-border bg-card"
                }`}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-6 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{p.desc}</div>
                <div className="mt-1 text-2xl font-semibold">{p.name}</div>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-success" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.01] ${
                    p.featured
                      ? "bg-brand-gradient text-white shadow-glow"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  Get {p.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-accent/40 bg-card p-10 text-center shadow-glow sm:p-16">
            <div className="absolute inset-0 -z-10 bg-brand-soft" />
            <ImageIcon className="mx-auto h-10 w-10 text-secondary" />
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Try ClearCUT AI now.</h2>
            <p className="mt-3 text-muted-foreground">No signup. No credit card. Just upload.</p>
            <Link
              to="/app"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]"
            >
              Remove a background <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
