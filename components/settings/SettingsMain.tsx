"use client";

import { useAuth } from "@/lib/auth-context";
import { usePreferences } from "@/contexts/PreferencesContext";
import { useTranslation } from "@/lib/i18n/use-translation";
import { useRouter } from "next/navigation";
import {
  User,
  Bell,
  Shield,
  Palette,
  Key,
  AlertTriangle,
  Trash2,
  Unplug,
  LogOut,
} from "lucide-react";
import { useState } from "react";

const selectClass =
  "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm focus:border-[#ea580c]/30 focus:outline-none appearance-none cursor-pointer bg-[length:1rem] bg-[position:right_0.75rem_center] bg-no-repeat pr-10 text-[var(--text-primary)]";
const selectBg =
  'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2378716c\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")';

const TIMEZONE_OPTIONS: { value: string; label: string }[] = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern (US)" },
  { value: "America/Los_Angeles", label: "Pacific (US)" },
  { value: "Europe/London", label: "London" },
  { value: "Asia/Singapore", label: "Singapore" },
];

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.06]">
        <Icon className="h-4 w-4 text-[var(--text-secondary)]" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--text-secondary)]">{title}</h3>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 glass-subtle rounded-xl px-4 py-3 cursor-pointer">
      <span className="text-sm text-[var(--text-primary)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative h-6 w-10 shrink-0 rounded-full transition-colors ${checked ? "bg-[#ea580c]" : "bg-white/[0.12]"}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? "left-5" : "left-1"}`}
        />
      </button>
    </label>
  );
}

function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[a-zA-Z]/.test(password)) errors.push("At least one letter");
  if (!/\d/.test(password)) errors.push("At least one number");
  return { valid: errors.length === 0, errors };
}

export default function SettingsMain() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, locale, timezone, setTheme, setLocale, setTimezone } = usePreferences();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [rulesTriggered, setRulesTriggered] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const displayName = user?.name ?? "Guest";
  const displayEmail = user?.email ?? "guest@example.com";
  const displayHandle = user?.handle ?? "@guest";

  function handleSignOut() {
    logout();
    router.push("/login");
    router.refresh();
  }

  function handleChangePasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError(null);
    const validation = validatePassword(newPassword);
    if (!validation.valid) {
      setPasswordError(validation.errors.join(". "));
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match.");
      return;
    }
    if (!currentPassword.trim()) {
      setPasswordError("Please enter your current password.");
      return;
    }
    setPasswordSuccess(true);
    setTimeout(() => {
      setChangePasswordOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess(false);
    }, 800);
  }

  const inputClass =
    "w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[#ea580c]/30 focus:outline-none";

  return (
    <main className="mx-auto max-w-[1440px] px-8 pb-12 pt-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{t("settings.title")}</h1>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{t("settings.subtitle")}</p>
      </div>

      <div className="bento-grid">
        {/* Profile - 6 col */}
        <div className="col-span-6">
          <div className="glass-card flex h-full flex-col p-6">
            <SectionHeader icon={User} title={t("settings.profile")} />
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.displayName")}</label>
                <input type="text" defaultValue={displayName} className={inputClass} />
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.email")}</label>
                <input type="email" defaultValue={displayEmail} className={inputClass} />
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.handle")}</label>
                <input type="text" defaultValue={displayHandle} className={inputClass} />
              </div>
              <button
                type="button"
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors"
                style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}
              >
                {t("settings.saveProfile")}
              </button>
            </div>
          </div>
        </div>

        {/* Notifications - 6 col */}
        <div className="col-span-6">
          <div className="glass-card flex h-full flex-col p-6">
            <SectionHeader icon={Bell} title={t("settings.notifications")} />
            <div className="space-y-3">
              <Toggle label={t("settings.emailNotifications")} checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
              <Toggle label={t("settings.pushAlerts")} checked={pushAlerts} onChange={() => setPushAlerts(!pushAlerts)} />
              <Toggle label={t("settings.riskAlerts")} checked={riskAlerts} onChange={() => setRiskAlerts(!riskAlerts)} />
              <Toggle label={t("settings.rulesTriggered")} checked={rulesTriggered} onChange={() => setRulesTriggered(!rulesTriggered)} />
              <Toggle label={t("settings.weeklyDigest")} checked={weeklyDigest} onChange={() => setWeeklyDigest(!weeklyDigest)} />
              <Toggle label={t("settings.marketingEmails")} checked={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} />
            </div>
          </div>
        </div>

        {/* Security - 6 col */}
        <div className="col-span-6">
          <div className="glass-card flex h-full flex-col p-6">
            <SectionHeader icon={Shield} title={t("settings.security")} />
            <div className="space-y-4">
              <Toggle label={t("settings.twoFactor")} checked={twoFactorEnabled} onChange={() => setTwoFactorEnabled(!twoFactorEnabled)} />
              <button
                type="button"
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
                onClick={() => setChangePasswordOpen(true)}
              >
                {t("settings.changePassword")}
              </button>
              <p className="text-[10px] text-[var(--text-muted)]">{t("settings.activeSessionsNote")}</p>
            </div>
          </div>
        </div>

        {/* Preferences - 6 col */}
        <div className="col-span-6">
          <div className="glass-card flex h-full flex-col p-6">
            <SectionHeader icon={Palette} title={t("settings.preferences")} />
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.theme")}</label>
                <select
                  className={selectClass}
                  style={{ backgroundImage: selectBg }}
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "dark" | "light")}
                >
                  <option value="dark">{t("settings.dark")}</option>
                  <option value="light">{t("settings.light")}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.language")}</label>
                <select
                  className={selectClass}
                  style={{ backgroundImage: selectBg }}
                  value={locale}
                  onChange={(e) => setLocale(e.target.value as "en" | "yue")}
                >
                  <option value="en">{t("settings.english")}</option>
                  <option value="yue">{t("settings.cantonese")}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.timezone")}</label>
                <select
                  className={selectClass}
                  style={{ backgroundImage: selectBg }}
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {TIMEZONE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.currency")}</label>
                <select className={selectClass} style={{ backgroundImage: selectBg }} defaultValue="usd">
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="gbp">GBP</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Connections / API - 6 col */}
        <div className="col-span-6">
          <div className="glass-card flex h-full flex-col p-6">
            <SectionHeader icon={Key} title={t("settings.connectionsApi")} />
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.apiKey")}</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value="sk_live_••••••••••••••••••••"
                    readOnly
                    className={`flex-1 ${inputClass} text-[var(--text-muted)]`}
                  />
                  <button
                    type="button"
                    className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors shrink-0"
                  >
                    {t("settings.reveal")}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.webhookUrl")}</label>
                <input
                  type="url"
                  placeholder="https://your-server.com/webhook"
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
              >
                {t("settings.regenerateApiKey")}
              </button>
            </div>
          </div>
        </div>

        {/* Terminate account - full width */}
        <div className="col-span-12">
          <div className="glass-card flex flex-col p-6 border-[#ef4444]/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ef4444]/10">
                <AlertTriangle className="h-4 w-4 text-[#ef4444]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)]">{t("settings.terminateAccount")}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-white/[0.15] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-white/[0.06] hover:text-[var(--text-primary)] transition-colors"
              >
                <Unplug className="h-4 w-4" />
                {t("settings.deactivateAccount")}
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-2.5 text-sm font-medium text-[#ef4444] hover:bg-[#ef4444]/20 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                {t("settings.deleteAccount")}
              </button>
            </div>
            <p className="mt-3 text-[10px] text-[var(--text-muted)]">{t("settings.terminateWarning")}</p>
            <button
              type="button"
              onClick={handleSignOut}
              className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
            >
              <LogOut className="h-4 w-4" />
              {t("settings.signOut")}
            </button>
          </div>
        </div>
      </div>

      {/* Change password modal */}
      {changePasswordOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          aria-modal="true"
          role="dialog"
          aria-label="Change password"
          onClick={() => !passwordSuccess && setChangePasswordOpen(false)}
        >
          <div
            className="glass-card w-full max-w-md flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/[0.08] p-4">
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">{t("settings.changePassword")}</h2>
              <button
                type="button"
                onClick={() => !passwordSuccess && setChangePasswordOpen(false)}
                className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-white/[0.06] hover:text-[var(--text-primary)]"
                aria-label="Close"
              >
                <span className="text-xl leading-none">&times;</span>
              </button>
            </div>
            <form onSubmit={handleChangePasswordSubmit} className="p-4 space-y-4">
              <p className="text-[10px] text-[var(--text-muted)]">{t("settings.passwordRequirements")}</p>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.currentPassword")}</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  autoComplete="current-password"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.newPassword")}</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{t("settings.confirmPassword")}</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                  autoComplete="new-password"
                />
              </div>
              {passwordError && <p className="text-xs text-[#ef4444]">{passwordError}</p>}
              {passwordSuccess && <p className="text-xs text-[#22c55e]">{t("settings.passwordUpdated")}</p>}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setChangePasswordOpen(false)}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:bg-white/[0.06] transition-colors"
                >
                  {t("settings.cancel")}
                </button>
                <button
                  type="submit"
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-colors"
                  style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}
                >
                  {t("settings.updatePassword")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
