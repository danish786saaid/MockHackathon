"use client";

import {
  LayoutDashboard,
  Shield,
  Wallet,
  Settings,
  MessageSquare,
  HelpCircle,
  Search,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Rules", icon: Shield },
  { label: "Portfolio", icon: Wallet },
];

const settingsItems = [
  { label: "Messages", icon: MessageSquare },
  { label: "Settings", icon: Settings },
  { label: "Help Centre", icon: HelpCircle },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col border-r border-white/5 backdrop-blur-xl"
      style={{ background: "rgba(13, 20, 36, 0.95)" }}
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white shadow-lg"
            style={{ background: "linear-gradient(135deg, #3b82f6, #22d3ee)" }}
          >
            TA
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-white">Taha Ahmad</p>
            <p className="text-xs text-[#94a3b8]">Lead Designer</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-xl border border-white/10 py-2.5 pl-10 pr-12 text-sm text-white placeholder-[#64748b] focus:border-[#3b82f6]/50 focus:outline-none"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-[#94a3b8]">
            ⌘K
          </kbd>
        </div>

        <nav className="space-y-1">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
            Dashboards
          </p>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                item.active
                  ? "text-white"
                  : "text-[#94a3b8] hover:bg-white/5 hover:text-white"
              }`}
              style={item.active ? { background: "#3b82f6" } : undefined}
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0 opacity-70" />
            </button>
          ))}
        </nav>

        <nav className="space-y-1">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#94a3b8]">
            Settings
          </p>
          {settingsItems.map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm text-[#94a3b8] transition-colors hover:bg-white/5 hover:text-white"
            >
              <span className="flex items-center gap-3">
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto border-t border-white/5 p-6">
        <p className="text-sm font-semibold text-[#22d3ee]">Sentinel AI</p>
        <p className="text-xs text-[#94a3b8]">Risk Controller</p>
      </div>
    </aside>
  );
}
