import { useCallback, useRef, useState } from "react";

interface BeforeAfterProps {
  before: string;
  after: string;
  className?: string;
}

export function BeforeAfter({ before, after, className = "" }: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  }, []);

  return (
    <div
      ref={ref}
      className={`relative aspect-[3/2] w-full select-none overflow-hidden rounded-2xl border border-border bg-card shadow-card ${className}`}
      onMouseMove={(e) => dragging.current && move(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => move(e.touches[0].clientX)}
    >
      {/* After (with checkerboard underneath to show transparency) */}
      <div className="absolute inset-0 checkerboard">
        <img
          src={after}
          alt="After background removal"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Before clipped */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt="Before"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-glow"
        style={{ left: `${pos}%` }}
      >
        <button
          type="button"
          aria-label="Drag to compare"
          onMouseDown={() => (dragging.current = true)}
          onTouchStart={() => (dragging.current = true)}
          className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full bg-brand-gradient text-white shadow-glow"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="pointer-events-none absolute top-3 left-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur">
        Before
      </div>
      <div className="pointer-events-none absolute top-3 right-3 rounded-md bg-background/70 px-2 py-1 text-xs font-medium backdrop-blur">
        After
      </div>
    </div>
  );
}
