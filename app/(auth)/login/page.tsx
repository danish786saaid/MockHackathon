"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n/use-translation";

const inputClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder-[#78716c] transition-colors focus:border-[#ea580c]/30 focus:outline-none focus:bg-white/[0.05]";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError(t("auth.enterEmail"));
      return;
    }
    if (!password) {
      setError(t("auth.enterPassword"));
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
      router.push("/");
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
          {t("auth.signIn")}
        </h1>
        <p className="mt-1 text-sm text-[#78716c]">
          {t("auth.welcomeBackSignIn")}
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
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="rounded border-white/[0.2] bg-white/[0.05] text-[#ea580c] focus:ring-[#ea580c]/50"
            />
            <span className="text-sm text-[#a8a29e]">{t("auth.rememberMe")}</span>
          </label>
          <Link
            href="#"
            className="text-sm text-[#f97316] hover:text-[#ea580c] transition-colors"
          >
            {t("auth.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl py-3 text-sm font-medium text-white transition-opacity disabled:opacity-60"
          style={{
            background: "linear-gradient(135deg, #ea580c, #f59e0b)",
          }}
        >
          {loading ? t("auth.signingIn") : t("auth.signIn")}
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
        {t("auth.signInWithGoogle")}
      </button>

      <p className="mt-6 text-center text-sm text-[#78716c]">
        {t("auth.noAccount")}{" "}
        <Link
          href="/register"
          className="font-medium text-[#f97316] hover:text-[#ea580c] transition-colors"
        >
          {t("auth.signUp")}
        </Link>
      </p>
    </div>
  );
}
