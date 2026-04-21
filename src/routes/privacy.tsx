import { createFileRoute } from "@tanstack/react-router";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy · ClearCUT AI" },
      { name: "description", content: "Privacy policy for ClearCUT AI." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          <p>We collect account information you provide, including your name and email.</p>
          <p>Uploaded images are processed to remove backgrounds and are shown in your account history.</p>
          <p>Payments are processed by Razorpay. We do not store full card details on this application.</p>
          <p>You can request deletion of your account data by contacting support.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
