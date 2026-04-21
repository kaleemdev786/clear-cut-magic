import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Loader2, Download, RotateCcw, Sparkles, AlertCircle, History, Link as LinkIcon, Trash2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { BeforeAfter } from "@/components/before-after";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  addProcessedImage,
  consumeCredit,
  getCurrentUser,
  incrementDownloadCount,
  listProcessedImages,
  refundCredit,
  subscribeToAppState,
  type ProcessedImage,
} from "@/lib/app-state";

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
const N8N_WEBHOOK_URL = "https://arrowhead1.app.n8n.cloud/webhook/c2b25272-2e90-4212-b388-76695b279e2c";

const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getBase64ImageFromResponse = (payload: unknown): string | null => {
  if (!payload || typeof payload !== "object") return null;

  const candidateKeys = ["image", "imageBase64", "base64", "data", "output", "result"];
  for (const key of candidateKeys) {
    const value = (payload as Record<string, unknown>)[key];
    if (typeof value !== "string") continue;
    if (value.startsWith("data:image/")) return value;
    if (/^[A-Za-z0-9+/=\r\n]+$/.test(value) && value.length > 200) {
      return `data:image/png;base64,${value.replace(/\s/g, "")}`;
    }
  }

  return null;
};

const getUrlFromResponse = (payload: unknown): string | null => {
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

  const obj = payload as Record<string, unknown>;
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

const sendToWebhookAndGetProcessedImage = async (file: File): Promise<{ imageUrl: string; revokeOnCleanup: boolean }> => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  const response = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text();
    const message = body.trim().slice(0, 220);
    throw new Error(
      message
        ? `Webhook failed (${response.status}): ${message}`
        : `Webhook failed with status ${response.status}`,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.startsWith("image/")) {
    const blob = await response.blob();
    return { imageUrl: URL.createObjectURL(blob), revokeOnCleanup: true };
  }

  const rawBody = await response.text();
  let parsedBody: unknown = rawBody;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    // Keep raw text; URL extraction below supports plain string payloads.
  }

  if (typeof parsedBody !== "string" && parsedBody && typeof parsedBody === "object") {
    const base64Image = getBase64ImageFromResponse(parsedBody);
    if (base64Image) {
      return { imageUrl: base64Image, revokeOnCleanup: false };
    }
  }

  const remoteUrl = getUrlFromResponse(parsedBody);
  if (remoteUrl) {
    return { imageUrl: remoteUrl, revokeOnCleanup: false };
  }

  // Some n8n webhook responses are JSON-stringified multiple times.
  if (typeof parsedBody === "string") {
    try {
      const reparsed = JSON.parse(parsedBody);
      if (reparsed && typeof reparsed === "object") {
        const nestedUrl = getUrlFromResponse(reparsed);
        if (nestedUrl) return { imageUrl: nestedUrl, revokeOnCleanup: false };
      }
    } catch {
      // Not JSON; no further parsing possible.
    }
  }

  throw new Error("Webhook response did not include an image.");
};

function ToolPage() {
  const [activeTab, setActiveTab] = useState<"editor" | "history">("editor");
  const [status, setStatus] = useState<Status>("idle");
  const [original, setOriginal] = useState<string | null>(null);
  const [processed, setProcessed] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ProcessedImage[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [latestImageId, setLatestImageId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const originalUrlRef = useRef<string | null>(null);
  const processedBlobUrlRef = useRef<string | null>(null);

  const addToHistory = useCallback(
    (url: string) => {
      if (!currentUser) return;
      const image = addProcessedImage(currentUser.id, url);
      setLatestImageId(image.id);
      setHistory(listProcessedImages(currentUser.id));
    },
    [currentUser],
  );

  const downloadImage = useCallback(async (url: string, filename = "clearcut-result.png", imageId?: string) => {
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
      if (imageId) incrementDownloadCount(imageId);
    } catch {
      // Fallback keeps existing behavior if direct fetch is blocked.
      const fallbackLink = document.createElement("a");
      fallbackLink.href = url;
      fallbackLink.download = filename;
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      fallbackLink.remove();
      if (imageId) incrementDownloadCount(imageId);
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
    setLatestImageId(null);
  };

  const handleFile = useCallback(async (file: File) => {
    setError(null);
    const user = getCurrentUser();
    if (!user) {
      setError("Please sign in to remove backgrounds and track your credits.");
      setStatus("error");
      return;
    }
    const creditResult = consumeCredit(user.id, 1);
    if (!creditResult.ok) {
      setError("You do not have enough credits. Please buy more credits from pricing.");
      setStatus("error");
      return;
    }
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
      const { imageUrl, revokeOnCleanup } = await sendToWebhookAndGetProcessedImage(file);
      if (revokeOnCleanup) {
        processedBlobUrlRef.current = imageUrl;
      }
      await pause(600);
      setProcessed(imageUrl);
      setStatus("done");
      addToHistory(imageUrl);
    } catch (err) {
      refundCredit(user.id, 1);
      const message = err instanceof Error ? err.message : "Background removal failed. Please try again.";
      setError(message);
      setStatus("error");
    }
  }, [addToHistory]);

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
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
    },
    [handleFile],
  );

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) setHistory(listProcessedImages(user.id));
  }, []);

  useEffect(() => subscribeToAppState(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    setHistory(user ? listProcessedImages(user.id) : []);
  }), []);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handlePaste]);

  useEffect(() => () => {
    if (originalUrlRef.current) {
      URL.revokeObjectURL(originalUrlRef.current);
      originalUrlRef.current = null;
    }
    if (processedBlobUrlRef.current) {
      URL.revokeObjectURL(processedBlobUrlRef.current);
      processedBlobUrlRef.current = null;
    }
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
          <p className="mt-2 text-sm text-muted-foreground">
            {currentUser ? `Credits left: ${currentUser.credits}` : "Please sign in to start removing backgrounds."}
          </p>
        </div>

        <div className="mt-10">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as "editor" | "history")}
            className="space-y-4"
          >
            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-xl bg-card p-2 sm:w-fit">
              <TabsTrigger value="editor" className="gap-2 rounded-lg px-4 py-2">
                <UploadCloud className="h-4 w-4" /> Editor
              </TabsTrigger>
              <TabsTrigger value="history" className="gap-2 rounded-lg px-4 py-2">
                <History className="h-4 w-4" /> History ({history.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="mt-0">
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
                    {original && processed && <BeforeAfter before={original} after={processed} />}

                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        disabled={!processed || isDownloading}
                        onClick={() =>
                          processed && downloadImage(processed, "clearcut-result.png", latestImageId ?? undefined)
                        }
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
                      >
                        <Download className="h-4 w-4" /> {isDownloading ? "Downloading..." : "Download PNG"}
                      </button>
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
            </TabsContent>

            <TabsContent value="history" className="mt-0">
              <div className="space-y-4">
                {history.length > 0 ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {history.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-border bg-card p-3 shadow-card">
                          <img
                            src={item.url}
                            alt="Background removed result"
                            className="aspect-[3/2] w-full rounded-xl object-cover checkerboard"
                            loading="lazy"
                          />
                          <p className="mt-3 text-xs text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted"
                            >
                              <LinkIcon className="h-3.5 w-3.5" /> Open URL
                            </a>
                            <button
                              type="button"
                              onClick={() => downloadImage(item.url, "clearcut-result.png", item.id)}
                              className="inline-flex items-center gap-1 rounded-lg bg-brand-gradient px-3 py-1.5 text-xs font-medium text-white"
                            >
                              <Download className="h-3.5 w-3.5" /> Download
                            </button>
                          </div>
                          <p className="mt-2 text-xs text-muted-foreground">Downloads: {item.downloads}</p>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-card">
                    <History className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Your processed image URLs will appear here and stay available after page refresh.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
