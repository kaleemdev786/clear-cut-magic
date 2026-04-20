import { createFileRoute, Link } from "@tanstack/react-router";
import { Image, Zap, CreditCard, Trash2, Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · ClearCUT AI" },
      { name: "description", content: "Your usage, history, and subscription." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Today", value: "7", sub: "of unlimited", icon: Zap },
  { label: "This month", value: "184", sub: "images processed", icon: Image },
  { label: "Credits", value: "250", sub: "available", icon: CreditCard },
];

const history = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  name: `image-${i + 1}.png`,
  date: `${i + 1} day${i === 0 ? "" : "s"} ago`,
}));

function Dashboard() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-muted-foreground">Here's what's happening with your account.</p>
          </div>
          <Link
            to="/app"
            className="rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            New cutout
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">{s.label}</div>
                <s.icon className="h-4 w-4 text-secondary" />
              </div>
              <div className="mt-3 text-3xl font-bold">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent images</h2>
              <span className="text-xs text-muted-foreground">Auto-deleted after 7 days</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {history.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-lg checkerboard">
                      <Image className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{h.name}</div>
                      <div className="text-xs text-muted-foreground">{h.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-card p-6 shadow-glow">
            <div className="text-sm text-muted-foreground">Current plan</div>
            <div className="mt-1 text-2xl font-bold text-brand-gradient">Pro</div>
            <div className="mt-1 text-sm text-muted-foreground">Renews on Jan 1, 2026</div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Images</span><span>Unlimited</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Quality</span><span>HD</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">History</span><span>7 days</span></div>
            </div>
            <Link
              to="/pricing"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Manage subscription
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
