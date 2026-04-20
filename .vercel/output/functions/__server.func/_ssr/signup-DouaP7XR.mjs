import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { S as Sparkles, U as User, M as Mail, L as Lock } from "../_libs/lucide-react.mjs";
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
function SignupPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-8 flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-white" }) }),
      "ClearCUT AI"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "Create your account" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Free forever. No credit card needed." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "mt-6 space-y-3", onSubmit: (e) => e.preventDefault(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, placeholder: "Jane Doe", className: "w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, placeholder: "you@example.com", className: "w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, placeholder: "At least 8 characters", className: "w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow", children: "Create account" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
      "Already have an account? ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-medium text-foreground hover:underline", children: "Sign in" })
    ] })
  ] }) });
}
export {
  SignupPage as component
};
