import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Loader2, Download, RotateCcw, Sparkles, AlertCircle } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { BeforeAfter } from "@/components/before-after";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Background Remover · ClearCUT AI" },
      { name: "description", content: "Upload an image and remove its background instantly with AI." },
    ],
  }),
  component: ToolPage,
});

type Status = "idle" | "uploading" | "processing" | "done" | "error";

function ToolPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setStatus("idle");
    setOriginal(null);
    setProcessed(null);
    setError(null);
  };

  const handleFile = useCallback((file: File) => {
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
    const url = URL.createObjectURL(file);
    setOriginal(url);
    setStatus("uploading");
    // Simulated pipeline — wire to real backend later
    setTimeout(() => setStatus("processing"), 600);
    setTimeout(() => {
      setProcessed(url); // demo: same image; real pipeline returns transparent PNG
      setStatus("done");
    }, 2400);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && handleFile(files[0]),
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Drop an image, get a <span className="text-brand-gradient">transparent cutout.</span>
          </h1>
          <p className="mt-3 text-muted-foreground">JPG, PNG or WebP · max 10 MB · auto-deleted in 1 hour</p>
        </div>

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {status === "idle" || status === "error" ? (
              <motion.div
                key="drop"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div
                  {...getRootProps()}
                  className={`group relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all sm:p-20 ${
                    isDragActive
                      ? "border-accent bg-brand-soft shadow-glow"
                      : "border-border bg-card hover:border-accent/60 hover:bg-brand-soft"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient shadow-glow">
                    <UploadCloud className="h-7 w-7 text-white" />
                  </div>
                  <p className="mt-5 text-lg font-semibold">
                    {isDragActive ? "Drop it here" : "Drag & drop an image"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
                  <button className="mt-6 inline-flex items-center rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow">
                    Choose file
                  </button>
                </div>

                {error && (
                  <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}
              </motion.div>
            ) : status === "uploading" || status === "processing" ? (
              <motion.div
                key="loader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl border border-border bg-card p-12 text-center shadow-card"
              >
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-secondary" />
                <p className="mt-4 text-lg font-semibold">
                  {status === "uploading" ? "Uploading…" : "AI is removing the background…"}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Usually under 5 seconds.</p>
                {original && (
                  <img
                    src={original}
                    alt="Uploading preview"
                    className="mx-auto mt-6 max-h-64 rounded-xl border border-border opacity-50"
                  />
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {original && processed && (
                  <BeforeAfter before={original} after={processed} />
                )}

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={processed ?? "#"}
                    download="clearcut-result.png"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
                  >
                    <Download className="h-4 w-4" /> Download PNG
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-muted"
                  >
                    <RotateCcw className="h-4 w-4" /> Try another
                  </button>
                </div>

                <div className="rounded-2xl border border-accent/40 bg-brand-soft p-5 text-center">
                  <Sparkles className="mx-auto h-5 w-5 text-secondary" />
                  <p className="mt-2 text-sm">
                    Loving it? <Link to="/pricing" className="font-semibold text-brand-gradient">Upgrade to Pro</Link> for unlimited HD cutouts.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
