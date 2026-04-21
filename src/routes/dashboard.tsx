import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Image, Zap, CreditCard, Download } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import {
  getCurrentUser,
  incrementDownloadCount,
  listOrdersForUser,
  listProcessedImages,
  subscribeToAppState,
  type AppOrder,
  type ProcessedImage,
} from "@/lib/app-state";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · ClearCUT AI" },
      { name: "description", content: "Your usage, history, and subscription." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [history, setHistory] = useState<ProcessedImage[]>([]);
  const [orders, setOrders] = useState<AppOrder[]>([]);

  useEffect(() => {
    const refresh = () => {
      const current = getCurrentUser();
      setUser(current);
      setHistory(current ? listProcessedImages(current.id) : []);
      setOrders(current ? listOrdersForUser(current.id) : []);
    };
    refresh();
    return subscribeToAppState(refresh);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Sign in required</h1>
          <p className="mt-2 text-muted-foreground">Please sign in to view your profile, orders, and download history.</p>
          <Link to="/login" className="mt-6 inline-flex rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
            Go to sign in
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const stats = [
    { label: "Today", value: String(history.length), sub: "images processed", icon: Zap },
    { label: "Total history", value: String(history.length), sub: "stored cutouts", icon: Image },
    { label: "Credits", value: String(user.credits), sub: "available", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-muted-foreground">Here's what's happening with your account, {user.name}.</p>
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
                      <div className="text-sm font-medium">Cutout image</div>
                      <div className="text-xs text-muted-foreground">{new Date(h.createdAt).toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Downloads: {h.downloads}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={h.url}
                      download
                      onClick={() => incrementDownloadCount(h.id)}
                      className="grid h-8 w-8 place-items-center rounded-lg hover:bg-muted"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-card p-6 shadow-glow">
            <div className="text-sm text-muted-foreground">Current plan</div>
            <div className="mt-1 text-2xl font-bold text-brand-gradient">{orders[0]?.plan ?? "Free"}</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Last payment: {orders[0] ? new Date(orders[0].createdAt).toLocaleDateString() : "No purchases yet"}
            </div>
            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Orders</span><span>{orders.length}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total downloads</span><span>{history.reduce((sum, item) => sum + item.downloads, 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Payment gateway</span><span>Razorpay</span></div>
            </div>
            <Link
              to="/pricing"
              className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold hover:bg-muted"
            >
              Manage subscription
            </Link>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Order details</h2>
          <div className="mt-4 space-y-3">
            {orders.length === 0 && <p className="text-sm text-muted-foreground">No orders yet.</p>}
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-border bg-background p-3 text-sm">
                <p><span className="text-muted-foreground">Plan:</span> {order.plan}</p>
                <p><span className="text-muted-foreground">Amount:</span> {order.currency} {order.amount}</p>
                <p><span className="text-muted-foreground">Credits added:</span> {order.creditsAdded}</p>
                <p><span className="text-muted-foreground">Payment ID:</span> {order.paymentId}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
