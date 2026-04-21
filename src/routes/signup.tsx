import { createFileRoute, Link } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Mail, Lock, User } from "lucide-react";
import { setSessionUserId, upsertUserFromAuth } from "@/lib/app-state";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account · ClearCUT AI" },
      { name: "description", content: "Create your free ClearCUT AI account." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getFriendlySignUpError = (message: string) => {
    const normalized = message.toLowerCase();
    if (normalized.includes("email rate limit exceeded")) {
      return "Account already requested recently. Try signing in, or verify your email from inbox.";
    }
    return message;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setError(null);
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email: normalizedEmail,
      password,
      options: {
        data: {
          full_name: trimmedName,
        },
      },
    });

    if (signUpError) {
      const normalizedError = signUpError.message.toLowerCase();
      if (normalizedError.includes("email rate limit exceeded")) {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (!signInError && signInData.user) {
          upsertUserFromAuth({
            id: signInData.user.id,
            email: signInData.user.email ?? normalizedEmail,
            name: (signInData.user.user_metadata?.full_name as string | undefined) ?? trimmedName,
          });
          setSessionUserId(signInData.user.id);
          navigate({ to: "/dashboard" });
          setIsSubmitting(false);
          return;
        }

        const loginError = signInError?.message.toLowerCase() ?? "";
        if (loginError.includes("email not confirmed")) {
          setError("Your account is already created but email is not confirmed yet. Check your inbox and spam, then sign in.");
          setIsSubmitting(false);
          return;
        }
      }

      setError(getFriendlySignUpError(signUpError.message));
      setIsSubmitting(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Unable to create account. Please try again.");
      setIsSubmitting(false);
      return;
    }

    if (!data.session) {
      setError("Signup successful. Please verify your email, then sign in.");
      setIsSubmitting(false);
      return;
    }

    const { error: profileError } = await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: normalizedEmail,
        full_name: trimmedName,
      },
      { onConflict: "id" },
    );

    if (profileError) {
      setError(profileError.message);
      setIsSubmitting(false);
      return;
    }

    upsertUserFromAuth({
      id: user.id,
      email: user.email ?? normalizedEmail,
      name: trimmedName,
    });
    setSessionUserId(user.id);
    navigate({ to: "/dashboard" });
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient shadow-glow">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          ClearCUT AI
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Free forever. No credit card needed.</p>

        <form className="mt-6 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Name</span>
            <div className="relative mt-1">
              <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                required
                placeholder="Jane Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <div className="relative mt-1">
              <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs font-medium text-muted-foreground">Password</span>
            <div className="relative mt-1">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password"
                required
                placeholder="At least 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-accent"
              />
            </div>
          </label>
          {error && (
            <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-brand-gradient px-4 py-2.5 text-sm font-semibold text-white shadow-glow"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="font-medium text-foreground hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
