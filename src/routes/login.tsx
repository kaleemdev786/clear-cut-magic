import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Mail, Lock } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · ClearCUT AI" },
      { name: "description", content: "Sign in to your ClearCUT AI account." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-brand-gradient opacity-90" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15 backdrop-blur">
              <Sparkles className="h-4 w-4" />
            </span>
            ClearCUT AI
          </Link>
          <div>
            <h2 className="text-3xl font-bold">"Cut my product photo in 4 seconds. Replaced our $99/mo tool."</h2>
            <p className="mt-3 text-white/80">Maya · Shopify seller</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="mb-8 flex items-center gap-2 font-semibold lg:hidden">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient">
              <Sparkles className="h-4 w-4 text-white" />
            </span>
            ClearCUT AI
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to ClearCUT AI.</p>

          <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted">
            <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#fff" d="M21.35 11.1H12v3.2h5.35c-.23 1.45-1.7 4.25-5.35 4.25-3.22 0-5.85-2.67-5.85-5.95s2.63-5.95 5.85-5.95c1.83 0 3.05.78 3.75 1.45l2.55-2.45C16.85 3.95 14.65 3 12 3 6.95 3 2.85 7.1 2.85 12.15S6.95 21.3 12 21.3c6.93 0 9.05-4.85 9.05-7.45 0-.5-.05-.88-.15-1.25z"/></svg>
            Continue with Google
          </button>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />or<div className="h-px flex-1 bg-border" />
          </div>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Email</span>
              <div className="relative mt-1">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none transition-colors focus:border-accent focus:ring-brand"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">Password</span>
              <div className="relative mt-1">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none transition-colors focus:border-accent focus:ring-brand"
                />
              </div>
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here? <Link to="/signup" className="font-medium text-foreground hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
