import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Mail, Lock, User } from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account · ClearCUT AI" },
      { name: "description", content: "Create your free ClearCUT AI account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          ClearCUT AI
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Free forever. No credit card needed.</p>

        <form className="mt-6 space-y-3" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Name</span>
            <div className="relative mt-1">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="Jane Doe"
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <div className="relative mt-1">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
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
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
              />
            </div>
          </label>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
