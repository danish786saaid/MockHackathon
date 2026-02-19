"use client";

import { LayoutDashboard, Wallet, BarChart3, TrendingUp, Users, HelpCircle } from "lucide-react";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Portfolio", icon: Wallet, active: false },
  { label: "Analysis", icon: BarChart3, active: false },
  { label: "Market", icon: TrendingUp, active: false },
];

const supportMenu = [
  { label: "Community", icon: Users, active: false },
  { label: "Help & Support", icon: HelpCircle, active: false },
];

export default function LeftSidebar() {
  return (
    <aside className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-white/10 bg-[#0f1114]">
      <div className="flex h-full flex-col p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white">Welcome, Naya</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">Here&apos;s your stock portfolio overview</p>
        </div>

        <nav className="space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">Main Menu</p>
          {mainMenu.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "bg-[#3b82f6] text-white"
                  : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>

        <nav className="mt-8 space-y-1">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#94a3b8]">Support</p>
          {supportMenu.map((item) => (
            <a
              key={item.label}
              href="#"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
