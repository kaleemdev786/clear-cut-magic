import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, signOut, subscribeToAppState } from "@/lib/app-state";

export function SiteHeader() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser>>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useRouterState({ select: (s) => s.location });
  const currentPathname = location.pathname;
  const currentTab = (location.search as Record<string, unknown> | undefined)?.tab;
  const isToolActive = currentPathname === "/app" && currentTab !== "history";
  const isHistoryActive = currentPathname === "/app" && currentTab === "history";
  const isPricingActive = currentPathname === "/pricing";
  const isDashboardActive = currentPathname === "/dashboard";

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
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-lg tracking-tight whitespace-nowrap">
            ClearCUT <span className="text-brand-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/app"
            search={{ tab: "editor" }}
            className={`text-sm transition-colors hover:text-foreground ${
              isToolActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Tool
          </Link>
          <Link
            to="/pricing"
            className={`text-sm transition-colors hover:text-foreground ${
              isPricingActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/dashboard"
            className={`text-sm transition-colors hover:text-foreground ${
              isDashboardActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/app"
            search={{ tab: "history" }}
            className={`text-sm transition-colors hover:text-foreground ${
              isHistoryActive ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            History
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
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
            search={{ tab: "editor" }}
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

      {mobileMenuOpen && (
        <div className="border-t border-border/50 md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            <div className="grid gap-1">
              <Link
                to="/app"
                search={{ tab: "editor" }}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm hover:bg-muted hover:text-foreground ${
                  isToolActive ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                Tool
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm hover:bg-muted hover:text-foreground ${
                  isPricingActive ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                Pricing
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm hover:bg-muted hover:text-foreground ${
                  isDashboardActive ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/app"
                search={{ tab: "history" }}
                onClick={() => setMobileMenuOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm hover:bg-muted hover:text-foreground ${
                  isHistoryActive ? "bg-muted text-foreground" : "text-muted-foreground"
                }`}
              >
                History
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card p-3">
              <div className="text-xs text-muted-foreground">
                {user ? (
                  <>
                    Signed in as <span className="font-semibold text-foreground">{user.name}</span>
                    <span className="ml-2 rounded-md border border-border bg-background px-2 py-1 font-semibold text-foreground">
                      Credits: {user.credits}
                    </span>
                  </>
                ) : (
                  "Sign in to save your history and credits."
                )}
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to={user ? "/dashboard" : "/login"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {user ? "Dashboard" : "Sign in"}
                </Link>
                {user && (
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Sign out
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
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
