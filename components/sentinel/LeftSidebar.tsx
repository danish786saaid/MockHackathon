"use client";

import { LayoutDashboard, Shield, Wallet, TrendingUp, Users, HelpCircle } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const mainMenu = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Rules", icon: Shield, active: false },
  { label: "Portfolio", icon: Wallet, active: false },
  { label: "Market", icon: TrendingUp, active: false },
];

const supportMenu = [
  { label: "Community", icon: Users, active: false },
  { label: "Help & Support", icon: HelpCircle, active: false },
];

export default function LeftSidebar() {
  const user = useUser();
  const userName = user?.name ? user.name.split(" ")[0] : "User";

  return (
    <aside
      className="fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-[260px] border-r border-white/10 backdrop-blur-xl"
      style={{ background: "rgba(13, 20, 36, 0.95)" }}
    >
      <div className="flex h-full flex-col p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white">Welcome, {userName}</h2>
          <p className="mt-1 text-sm text-[#94a3b8]">Here&apos;s your risk overview</p>
        </div>

        <nav className="space-y-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">Main Menu</p>
          {mainMenu.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                item.active ? "text-white" : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
              }`}
              style={item.active ? { background: "#3b82f6" } : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </a>
          ))}
        </nav>

        <nav className="mt-8 space-y-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">Support</p>
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
