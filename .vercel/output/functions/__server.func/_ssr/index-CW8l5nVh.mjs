import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as SiteHeader, a as SiteFooter } from "./site-chrome-CeIm9KkS.mjs";
import { B as BeforeAfter } from "./before-after-DPVmLhxM.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { A as ArrowRight, Z as Zap, W as WandSparkles, f as ShieldCheck, D as Download, C as Check, I as Image } from "../_libs/lucide-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const heroImg = "/assets/hero-cutout-Bqc1sPFI.jpg";
const features = [{
  icon: Zap,
  title: "Instant results",
  desc: "AI processing under 5 seconds, every time."
}, {
  icon: WandSparkles,
  title: "Pixel-perfect edges",
  desc: "Hair, fur and fine detail preserved."
}, {
  icon: ShieldCheck,
  title: "Private by default",
  desc: "Images auto-delete within 1 hour."
}, {
  icon: Download,
  title: "Transparent PNG",
  desc: "Download print-ready cutouts in one click."
}];
const plans = [{
  name: "Free",
  price: "$0",
  desc: "Try it today",
  features: ["3 images / day", "Standard quality", "PNG download"]
}, {
  name: "Pro",
  price: "$12",
  desc: "For creators",
  features: ["Unlimited images", "HD quality", "7-day history", "Priority queue"],
  featured: true
}, {
  name: "Business",
  price: "$39",
  desc: "For teams",
  features: ["API access", "Team seats", "Bulk processing", "Dedicated support"]
}];
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 sm:pt-24 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid items-center gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }),
          "Powered by AI · No signup required"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-4xl font-bold tracking-tight sm:text-6xl", children: [
          "Remove backgrounds",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "one click." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-xl text-lg text-muted-foreground", children: "ClearCUT AI gives you crisp, transparent cutouts in seconds. Built for ecommerce sellers, designers and creators who don't have time to mask." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]", children: [
            "Try it free ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "inline-flex items-center rounded-xl border border-border bg-card/50 px-6 py-3 text-base font-medium backdrop-blur transition-colors hover:bg-card", children: "See pricing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-muted-foreground", children: "JPG / PNG · up to 10 MB · auto-deleted in 1 hour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, transition: {
        duration: 0.7,
        delay: 0.1
      }, className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-brand-gradient opacity-30 blur-3xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative rounded-3xl border border-border bg-card p-2 shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfter, { before: heroImg, after: heroImg }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Everything you need, nothing you don't." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Built for speed and quality. No editor learning curve." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group rounded-2xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-glow", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-11 w-11 place-items-center rounded-xl bg-brand-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "h-5 w-5 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-semibold", children: f.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: f.desc })
      ] }, f.title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Three steps. No friction." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
        n: "01",
        t: "Upload",
        d: "Drag & drop or paste a JPG/PNG up to 10MB."
      }, {
        n: "02",
        t: "AI processes",
        d: "Our model cuts the subject in under 5 seconds."
      }, {
        n: "03",
        t: "Download",
        d: "Get a crisp transparent PNG, ready to use."
      }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-mono text-brand-gradient", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-lg font-semibold", children: s.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: s.d })
      ] }, s.n)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-t border-border/50 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-2xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold sm:text-4xl", children: "Simple, fair pricing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Start free. Upgrade when you need more." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid gap-6 lg:grid-cols-3", children: plans.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative rounded-2xl border p-6 ${p.featured ? "border-accent bg-card shadow-glow" : "border-border bg-card"}`, children: [
        p.featured && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-3 left-6 rounded-full bg-brand-gradient px-3 py-1 text-xs font-semibold text-white", children: "Most popular" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: p.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-2xl font-semibold", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold", children: p.price }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "/mo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-3 text-sm", children: p.features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success" }),
          feat
        ] }, feat)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", className: `mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.01] ${p.featured ? "bg-brand-gradient text-white shadow-glow" : "border border-border bg-background hover:bg-muted"}`, children: [
          "Get ",
          p.name
        ] })
      ] }, p.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-3xl border border-accent/40 bg-card p-10 text-center shadow-glow sm:p-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-brand-soft" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "mx-auto h-10 w-10 text-secondary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-bold sm:text-4xl", children: "Try ClearCUT AI now." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "No signup. No credit card. Just upload." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/app", className: "mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-7 py-3.5 text-base font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]", children: [
        "Remove a background ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  LandingPage as component
};
