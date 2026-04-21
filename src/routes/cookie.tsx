import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/cookie")({
  head: () => ({
    meta: [
      { title: "Cookie Policy · ClearCUT AI" },
      { name: "description", content: "Cookie policy for ClearCUT AI." },
    ],
  }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Cookie Policy</h1>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>We use local storage and essential cookies to keep sessions active and persist credits and order history.</p>
          <p>Performance and analytics cookies may be used to improve quality and reliability of this service.</p>
          <p>You can clear browser data anytime to remove stored preferences and local records.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
