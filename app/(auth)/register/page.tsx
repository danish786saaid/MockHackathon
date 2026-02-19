"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n/use-translation";

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder-[#78716c] transition-colors focus:border-[#ea580c]/30 focus:outline-none focus:bg-white/[0.05]";

function passwordStrength(pwd: string): { score: number; label: string } {
  if (!pwd) return { score: 0, label: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  const labels = ["Weak", "Fair", "Good", "Strong", "Very strong"];
  return { score: Math.min(score, 5), label: labels[Math.min(score, 5) - 1] || "" };
}

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const strength = useMemo(() => passwordStrength(password), [password]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError(t("auth.enterName"));
      return;
    }
    if (!email.trim()) {
      setError(t("auth.enterEmail"));
      return;
    }
    if (password.length < 8) {
      setError(t("settings.passwordRequirements"));
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!terms) {
      setError("Please accept the terms and privacy policy");
      return;
    }
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      router.push("/onboarding");
      router.refresh();
    } catch {
      setError(t("auth.somethingWrong"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass-card p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          {t("auth.createAccount")}
        </h1>
        <p className="mt-1 text-sm text-[#78716c]">
          {t("auth.getStartedSubtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <p className="text-sm text-[#ef4444] rounded-lg bg-[#ef4444]/10 px-3 py-2">
            {error}
          </p>
        )}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
            {t("auth.name")}
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              autoComplete="name"
              placeholder="Naya Rochel"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
            {t("auth.email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
            {t("auth.password")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          {password && (
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex gap-0.5 flex-1 max-w-[120px]">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full bg-white/10"
                    style={{
                      backgroundColor:
                        i <= strength.score
                          ? strength.score <= 2
                            ? "#ef4444"
                            : strength.score <= 3
                              ? "#f59e0b"
                              : "#22c55e"
                          : undefined,
                    }}
                  />
                ))}
              </div>
              <span className="text-xs text-[#78716c]">{strength.label}</span>
            </div>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-[#a8a29e]">
            {t("settings.confirmPassword")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            className="mt-0.5 rounded border-white/[0.2] bg-white/[0.05] text-[#ea580c] focus:ring-[#ea580c]/50"
          />
          <span className="text-sm text-[#a8a29e]">
            I agree to the{" "}
            <Link href="#" className="text-[#f97316] hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#f97316] hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-3 text-sm font-medium text-white transition-opacity disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #ea580c, #f59e0b)",
          }}
        >
          {loading ? t("auth.creatingAccount") : t("auth.createAccount")}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.06]" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-[#1c1917] px-3 text-[#78716c]">
            {t("auth.orContinueWith")}
          </span>
        </div>
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm text-[#a8a29e] transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        <Shield className="h-4 w-4" />
        {t("auth.signUpWithGoogle")}
      </button>

      <p className="mt-6 text-center text-sm text-[#78716c]">
        {t("auth.hasAccount")}{" "}
        <Link
          href="/login"
          className="font-medium text-[#f97316] hover:text-[#ea580c] transition-colors"
        >
          {t("auth.signIn")}
        </Link>
      </p>
    </div>
  );
}
