"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Shield, Wallet, TrendingUp, Users, HelpCircle } from "lucide-react";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Rules", icon: Shield, href: "/rules" },
  { label: "Portfolio", icon: Wallet, href: "/portfolio" },
  { label: "Market", icon: TrendingUp, href: "/market" },
];

const supportMenu = [
  { label: "Community", icon: Users, href: "#" },
  { label: "Help & Support", icon: HelpCircle, href: "#" },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[260px] border-r border-white/10 backdrop-blur-xl"
      style={{ background: "rgba(13, 20, 36, 0.95)" }}
    >
      <div className="flex h-full flex-col p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white">Welcome, Naya</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">Here&apos;s your risk overview</p>
        </div>

        <nav className="space-y-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">Main Menu</p>
          {mainMenu.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  active ? "text-white" : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
                }`}
                style={active ? { background: "#3b82f6" } : undefined}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <nav className="mt-8 space-y-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">Support</p>
          {supportMenu.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
