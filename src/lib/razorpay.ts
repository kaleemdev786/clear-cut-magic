type RazorpaySuccess = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

type RazorpayCheckoutInput = {
  amount: number;
  currency: "USD" | "INR";
  name: string;
  description: string;
  prefill?: { name?: string; email?: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

const loadRazorpayScript = async () => {
  if (typeof window === "undefined") return false;
  if (window.Razorpay) return true;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
    document.body.appendChild(script);
  });

  return Boolean(window.Razorpay);
};

export const openRazorpayCheckout = async (
  input: RazorpayCheckoutInput,
): Promise<RazorpaySuccess> => {
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined;
  if (!key) {
    throw new Error("Missing VITE_RAZORPAY_KEY_ID in environment.");
  }

  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    throw new Error("Razorpay SDK is unavailable.");
  }

  return new Promise<RazorpaySuccess>((resolve, reject) => {
    const razorpay = new window.Razorpay({
      key,
      amount: Math.round(input.amount * 100),
      currency: input.currency,
      name: input.name,
      description: input.description,
      prefill: input.prefill ?? {},
      handler: (response: RazorpaySuccess) => resolve(response),
      modal: {
        ondismiss: () => reject(new Error("Payment popup closed.")),
      },
      theme: {
        color: "#6366f1",
      },
    });
    razorpay.open();
  });
};
