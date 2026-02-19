"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, Settings, Shield, LogOut } from "lucide-react";
import { useAuth, initials } from "@/lib/auth-context";
import { useTranslation } from "@/lib/i18n/use-translation";

const navItems = [
  { labelKey: "nav.dashboard" as const, href: "/" },
  { labelKey: "nav.rules" as const, href: "/rules" },
  { labelKey: "nav.portfolio" as const, href: "/portfolio" },
  { labelKey: "nav.market" as const, href: "/market" },
];

export default function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    router.push("/login");
    router.refresh();
  }

  const displayName = user?.name ?? "Guest";
  const displayHandle = user?.handle ?? "@guest";
  const initialsStr = user ? initials(user.name) : "G";

  return (
    <header className="topbar sticky top-0 z-50 border-b border-white/[0.06] backdrop-blur-xl" style={{ background: "rgba(12, 10, 9, 0.85)", WebkitBackdropFilter: "blur(40px) saturate(1.4)" }}>
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-8">
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}>
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-theme-primary text-lg font-semibold tracking-tight">Sentinel</span>
          </Link>

          <nav className="flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive ? "text-white" : "nav-inactive"
                  }`}
                  style={isActive ? { background: "rgba(234, 88, 12, 0.15)", color: "#f97316" } : undefined}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Search */}
        <div className="flex max-w-md flex-1 mx-8">
          <div className="relative w-full">
            <Search className="icon-muted absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              placeholder={t("nav.searchPlaceholder")}
              className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-theme-primary placeholder-[var(--text-muted)] transition-colors focus:border-[#ea580c]/30 focus:outline-none focus:bg-white/[0.05]"
            />
            <kbd className="kbd absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-[#78716c]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="icon-muted relative rounded-lg p-2.5 text-[#a8a29e] transition-colors hover:bg-white/[0.05] hover:text-theme-primary">
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
          </button>
          <Link href="/settings" className="icon-muted rounded-lg p-2.5 text-[#a8a29e] transition-colors hover:bg-white/[0.05] hover:text-theme-primary" aria-label="Settings">
            <Settings className="h-[18px] w-[18px]" />
          </Link>

          <div className="ml-2 relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] py-1.5 pl-1.5 pr-4 hover:bg-white/[0.05] transition-colors"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}
              >
                {initialsStr}
              </div>
              <div className="hidden sm:block text-left">
                <p className="user-name text-sm font-medium leading-tight text-theme-primary">{displayName}</p>
                <p className="user-handle text-[11px] text-theme-muted">{displayHandle}</p>
              </div>
            </button>
            {userMenuOpen && (
              <div className="dropdown-menu absolute right-0 top-full mt-1 w-48 rounded-xl border border-white/[0.08] bg-[#1c1917] py-1 shadow-xl z-50">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="dropdown-item flex w-full items-center gap-2 px-4 py-2.5 text-sm text-[#a8a29e] hover:bg-white/[0.06] hover:text-white transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  {t("nav.logOut")}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
