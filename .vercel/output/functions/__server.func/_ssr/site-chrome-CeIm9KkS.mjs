import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Sparkles } from "../_libs/lucide-react.mjs";
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg tracking-tight", children: [
        "ClearCUT ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "AI" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-8 md:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app",
          className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
          activeProps: { className: "text-foreground" },
          children: "Tool"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/pricing",
          className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
          activeProps: { className: "text-foreground" },
          children: "Pricing"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/dashboard",
          className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
          activeProps: { className: "text-foreground" },
          children: "Dashboard"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "hidden rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline-flex",
          children: "Sign in"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/app",
          className: "inline-flex items-center rounded-lg bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]",
          children: "Try free"
        }
      )
    ] })
  ] }) });
}
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/50 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ClearCUT AI. All rights reserved."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "hover:text-foreground", children: "Pricing" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "hover:text-foreground", children: "Sign in" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy" })
    ] })
  ] }) });
}
export {
  SiteHeader as S,
  SiteFooter as a
};
