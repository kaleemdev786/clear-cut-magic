import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function BeforeAfter({ before, after, className = "" }) {
  const [pos, setPos] = reactExports.useState(50);
  const ref = reactExports.useRef(null);
  const dragging = reactExports.useRef(false);
  const move = reactExports.useCallback((clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: `relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl border border-border bg-card shadow-card ${className}`,
      onMouseMove: (e) => dragging.current && move(e.clientX),
      onMouseUp: () => dragging.current = false,
      onMouseLeave: () => dragging.current = false,
      onTouchMove: (e) => move(e.touches[0].clientX),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 checkerboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: after,
            alt: "After background removal",
            className: "h-full w-full object-cover",
            draggable: false
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 overflow-hidden",
            style: { clipPath: `inset(0 ${100 - pos}% 0 0)` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: before,
                alt: "Before",
                className: "h-full w-full object-cover",
                draggable: false
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-0 bottom-0 w-0.5 bg-white shadow-glow",
            style: { left: `${pos}%` },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "aria-label": "Drag to compare",
                onMouseDown: () => dragging.current = true,
                onTouchStart: () => dragging.current = true,
                className: "absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-brand-gradient text-white shadow-glow",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m9 7-5 5 5 5M15 7l5 5-5 5", strokeLinecap: "round", strokeLinejoin: "round" }) })
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-3 left-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur", children: "Before" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute top-3 right-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur", children: "After" })
      ]
    }
  );
}
export {
  BeforeAfter as B
};
