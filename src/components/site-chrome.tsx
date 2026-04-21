import { Link } from "@tanstack/react-router";
import { Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut, subscribeToAppState } from "@/lib/app-state";

export function SiteHeader() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    return subscribeToAppState(() => setUser(getCurrentUser()));
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = localStorage.getItem("clearcut:theme");
    const nextTheme = storedTheme === "light" ? "light" : "dark";
    root.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
    setThemeReady(true);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    localStorage.setItem("clearcut:theme", nextTheme);
    setTheme(nextTheme);
  };

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
          <Link
            to="/app"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            History
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {user && (
            <span className="hidden rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold sm:inline-flex">
              Credits: {user.credits}
            </span>
          )}
          <Link
            to={user ? "/dashboard" : "/login"}
            className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            {user ? "Dashboard" : "Sign in"}
          </Link>
          {user && (
            <button
              type="button"
              onClick={signOut}
              className="hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Sign out
            </button>
          )}
          <Link
            to="/app"
            className="inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Try free
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            {themeReady && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
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
          <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link to="/cookie" className="hover:text-foreground">Cookie</Link>
        </div>
      </div>
    </footer>
  );
}
