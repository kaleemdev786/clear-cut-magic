import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useDropzone } from "../_libs/react-dropzone.mjs";
import { S as SiteHeader, a as SiteFooter } from "./site-chrome-CeIm9KkS.mjs";
import { B as BeforeAfter } from "./before-after-DPVmLhxM.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { b as CloudUpload, H as History, c as CircleAlert, d as LoaderCircle, D as Download, R as RotateCcw, S as Sparkles, e as Link$1, T as Trash2 } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/prop-types.mjs";
import "../_libs/file-selector.mjs";
import "tslib";
import "../_libs/attr-accept.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
const N8N_WEBHOOK_URL = "https://arrowhead1.app.n8n.cloud/webhook/c2b25272-2e90-4212-b388-76695b279e2c";
const HISTORY_STORAGE_KEY = "clearcut:history";
const MAX_HISTORY_ITEMS = 12;
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getBase64ImageFromResponse = (payload) => {
  if (!payload || typeof payload !== "object") return null;
  const candidateKeys = ["image", "imageBase64", "base64", "data", "output", "result"];
  for (const key of candidateKeys) {
    const value = payload[key];
    if (typeof value !== "string") continue;
    if (value.startsWith("data:image/")) return value;
    if (/^[A-Za-z0-9+/=\r\n]+$/.test(value) && value.length > 200) {
      return `data:image/png;base64,${value.replace(/\s/g, "")}`;
    }
  }
  return null;
};
const getUrlFromResponse = (payload) => {
  if (!payload) return null;
  if (typeof payload === "string") {
    const trimmed = payload.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return null;
  }
  if (Array.isArray(payload)) {
    for (const item of payload) {
      const nested = getUrlFromResponse(item);
      if (nested) return nested;
    }
    return null;
  }
  if (typeof payload !== "object") return null;
  const obj = payload;
  const directCandidates = [obj.url, obj.imageUrl, obj.resultUrl, obj.secure_url];
  for (const candidate of directCandidates) {
    if (typeof candidate === "string" && /^https?:\/\//i.test(candidate.trim())) {
      return candidate.trim();
    }
  }
  const nestedCandidates = [obj.data, obj.result, obj.body];
  for (const candidate of nestedCandidates) {
    const nested = getUrlFromResponse(candidate);
    if (nested) return nested;
  }
  return null;
};
const sendToWebhookAndGetProcessedImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file, file.name);
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    body: formData
  });
  if (!response.ok) {
    const body = await response.text();
    const message = body.trim().slice(0, 220);
    throw new Error(message ? `Webhook failed (${response.status}): ${message}` : `Webhook failed with status ${response.status}`);
  }
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.startsWith("image/")) {
    const blob = await response.blob();
    return {
      imageUrl: URL.createObjectURL(blob),
      revokeOnCleanup: true
    };
  }
  const rawBody = await response.text();
  let parsedBody = rawBody;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
  }
  if (typeof parsedBody !== "string" && parsedBody && typeof parsedBody === "object") {
    const base64Image = getBase64ImageFromResponse(parsedBody);
    if (base64Image) {
      return {
        imageUrl: base64Image,
        revokeOnCleanup: false
      };
    }
  }
  const remoteUrl = getUrlFromResponse(parsedBody);
  if (remoteUrl) {
    return {
      imageUrl: remoteUrl,
      revokeOnCleanup: false
    };
  }
  if (typeof parsedBody === "string") {
    try {
      const reparsed = JSON.parse(parsedBody);
      if (reparsed && typeof reparsed === "object") {
        const nestedUrl = getUrlFromResponse(reparsed);
        if (nestedUrl) return {
          imageUrl: nestedUrl,
          revokeOnCleanup: false
        };
      }
    } catch {
    }
  }
  throw new Error("Webhook response did not include an image.");
};
function ToolPage() {
  const [activeTab, setActiveTab] = reactExports.useState("editor");
  const [status, setStatus] = reactExports.useState("idle");
  const [original, setOriginal] = reactExports.useState(null);
  const [processed, setProcessed] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [history, setHistory] = reactExports.useState([]);
  const [isDownloading, setIsDownloading] = reactExports.useState(false);
  const originalUrlRef = reactExports.useRef(null);
  const processedBlobUrlRef = reactExports.useRef(null);
  const persistHistory = reactExports.useCallback((nextHistory) => {
    setHistory(nextHistory);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(nextHistory));
  }, []);
  const addToHistory = reactExports.useCallback((url) => {
    if (!/^https?:\/\//i.test(url)) return;
    const nextItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      url,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const nextHistory = [nextItem, ...history.filter((item) => item.url !== url)].slice(0, MAX_HISTORY_ITEMS);
    persistHistory(nextHistory);
  }, [history, persistHistory]);
  const downloadImage = reactExports.useCallback(async (url, filename = "clearcut-result.png") => {
    setIsDownloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to download image (${response.status})`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      const fallbackLink = document.createElement("a");
      fallbackLink.href = url;
      fallbackLink.download = filename;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
    } finally {
      setIsDownloading(false);
    }
  }, []);
  const reset = () => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    if (processedBlobUrlRef.current) {
      URL.revokeObjectURL(processedBlobUrlRef.current);
      processedBlobUrlRef.current = null;
    }
    setStatus("idle");
    setOriginal(null);
    setProcessed(null);
    setError(null);
  };
  const handleFile = reactExports.useCallback(async (file) => {
    setError(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      setStatus("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File too large — max 10 MB.");
      setStatus("error");
      return;
    }
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    originalUrlRef.current = url;
    setOriginal(url);
    if (processedBlobUrlRef.current) {
      URL.revokeObjectURL(processedBlobUrlRef.current);
      processedBlobUrlRef.current = null;
    }
    setProcessed(null);
    setStatus("uploading");
    try {
      await pause(500);
      setStatus("processing");
      const {
        imageUrl,
        revokeOnCleanup
      } = await sendToWebhookAndGetProcessedImage(file);
      if (revokeOnCleanup) {
        processedBlobUrlRef.current = imageUrl;
      }
      await pause(600);
      setProcessed(imageUrl);
      setStatus("done");
      addToHistory(imageUrl);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Background removal failed. Please try again.";
      setError(message);
      setStatus("error");
    }
  }, [addToHistory]);
  const handlePaste = reactExports.useCallback((event) => {
    const items = event.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (!item.type.startsWith("image/")) continue;
      const file = item.getAsFile();
      if (!file) continue;
      event.preventDefault();
      handleFile(file);
      return;
    }
  }, [handleFile]);
  reactExports.useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return;
      const validHistory = parsed.filter((item) => item && typeof item.id === "string" && typeof item.url === "string" && /^https?:\/\//i.test(item.url) && typeof item.createdAt === "string");
      setHistory(validHistory.slice(0, MAX_HISTORY_ITEMS));
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);
  reactExports.useEffect(() => () => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    if (processedBlobUrlRef.current) {
      URL.revokeObjectURL(processedBlobUrlRef.current);
      processedBlobUrlRef.current = null;
    }
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop: (files) => files[0] && handleFile(files[0]),
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": []
    },
    maxFiles: 1,
    multiple: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl font-bold tracking-tight sm:text-4xl", children: [
          "Drop an image, get a ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "transparent cutout." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "JPG, PNG or WebP · max 10 MB · auto-deleted in 1 hour" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-card p-2 sm:w-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "editor", className: "gap-2 rounded-lg px-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-4 w-4" }),
            " Editor"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "history", className: "gap-2 rounded-lg px-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-4 w-4" }),
            " History (",
            history.length,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "editor", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: status === "idle" || status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getRootProps(), className: `group relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all sm:p-20 ${isDragActive ? "border-accent bg-brand-soft shadow-glow" : "border-border bg-card hover:border-accent/60 hover:bg-brand-soft"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...getInputProps() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient shadow-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "h-7 w-7 text-white" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg font-semibold", children: isDragActive ? "Drop it here" : "Drag & drop an image" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "or click to browse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-6 inline-flex items-center rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow", children: "Choose file" })
          ] }),
          error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
            error
          ] })
        ] }, "drop") : status === "uploading" || status === "processing" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, exit: {
          opacity: 0
        }, className: "rounded-3xl border border-border bg-card p-12 text-center shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mx-auto h-12 w-12 animate-spin text-secondary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg font-semibold", children: status === "uploading" ? "Uploading…" : "AI is removing the background…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Usually under 5 seconds." }),
          original && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: original, alt: "Uploading preview", className: "mx-auto mt-6 max-h-64 rounded-xl border border-border opacity-50" })
        ] }, "loader") : /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "space-y-6", children: [
          original && processed && /* @__PURE__ */ jsxRuntimeExports.jsx(BeforeAfter, { before: original, after: processed }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", disabled: !processed || isDownloading, onClick: () => processed && downloadImage(processed), className: "inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
              " ",
              isDownloading ? "Downloading..." : "Download PNG"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: reset, className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-4 w-4" }),
              " Try another"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-accent/40 bg-brand-soft p-5 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto h-5 w-5 text-secondary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm", children: [
              "Loving it? ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", className: "font-semibold text-brand-gradient", children: "Upgrade to Pro" }),
              " for unlimited HD cutouts."
            ] })
          ] })
        ] }, "result") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "history", className: "mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: history.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: history.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3 shadow-card", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.url, alt: "Background removed result", className: "aspect-[3/2] w-full rounded-xl object-cover checkerboard", loading: "lazy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs text-muted-foreground", children: new Date(item.createdAt).toLocaleString() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: item.url, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: "h-3.5 w-3.5" }),
                " Open URL"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => downloadImage(item.url), className: "inline-flex items-center gap-1 rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
                " Download"
              ] })
            ] })
          ] }, item.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => persistHistory([]), className: "inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            " Clear history"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 text-center shadow-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Your processed image URLs will appear here and stay available after page refresh." })
        ] }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ToolPage as component
};
