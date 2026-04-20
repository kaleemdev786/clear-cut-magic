import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, a as SiteFooter } from "./site-chrome-CeIm9KkS.mjs";
import { C as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const plans = [{
  name: "Free",
  price: "$0",
  desc: "Try it today, no card required.",
  features: ["3 images / day", "Standard quality", "PNG download", "Auto-delete in 1 hour"],
  cta: "Start free"
}, {
  name: "Pro",
  price: "$12",
  desc: "For freelancers and creators.",
  features: ["Unlimited images", "HD quality", "7-day history", "Priority queue", "Email support"],
  cta: "Upgrade to Pro",
  featured: true
}, {
  name: "Business",
  price: "$39",
  desc: "For teams and ecommerce stores.",
  features: ["Everything in Pro", "API access", "Bulk processing", "Team seats", "Dedicated support"],
  cta: "Contact sales"
}];
const credits = [{
  count: 50,
  price: "$5"
}, {
  count: 250,
  price: "$20"
}, {
  count: 1e3,
  price: "$60"
}];
function PricingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold tracking-tight sm:text-5xl", children: "Pricing that scales with you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground", children: "Pick a subscription, or buy credits as you go." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid gap-6 lg:grid-cols-3", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative rounded-2xl border p-8 ${p.featured ? "border-accent bg-card shadow-glow" : "border-border bg-card"}`, children: [
        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-8 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white", children: "Most popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: p.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-2xl font-semibold", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl font-bold", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/mo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-7 space-y-3 text-sm", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success" }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `mt-8 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-transform hover:scale-[1.01] ${p.featured ? "bg-brand-gradient text-white shadow-glow" : "border border-border hover:bg-muted"}`, children: p.cta })
      ] }, p.name)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold sm:text-3xl", children: "Or buy credits" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "One credit = one image. Never expire." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-3", children: credits.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-2xl border border-border bg-card p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold", children: [
              c.count,
              " credits"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
              "$",
              (parseInt(c.price.slice(1)) / c.count).toFixed(2),
              "/image"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow", children: c.price })
        ] }, c.count)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 text-center text-sm text-muted-foreground", children: [
        "Need an enterprise plan? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "text-foreground underline", children: "Contact us" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  PricingPage as component
};
