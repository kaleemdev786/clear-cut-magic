import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg tracking-tight">
            ClearCUT <span className="text-brand-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/app"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Tool
          </Link>
          <Link
            to="/pricing"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Pricing
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            to="/app"
            className="inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Try free
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} ClearCUT AI. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/pricing" className="hover:text-foreground">Pricing</Link>
          <Link to="/login" className="hover:text-foreground">Sign in</Link>
          <a href="#" className="hover:text-foreground">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
