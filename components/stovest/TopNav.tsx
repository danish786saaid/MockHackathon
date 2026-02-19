"use client";

import { Search, Bell, Settings } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function TopNav() {
  const user = useUser();

  const displayName = user?.name || "User";
  const displayEmail = user?.email || "";
  const initials = (user?.name || "U").split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-white/10 px-6 bg-[#0f1114]/95 backdrop-blur">
      <div className="flex items-center gap-8">
        <span className="text-xl font-semibold text-white">Stovest</span>
        <nav className="flex gap-6">
          <a href="#" className="text-sm text-white hover:text-[#60a5fa]">Market</a>
          <a href="#" className="text-sm text-white hover:text-[#60a5fa]">Wallets</a>
          <a href="#" className="text-sm text-white hover:text-[#60a5fa]">Tools</a>
        </nav>
      </div>

      <div className="flex flex-1 max-w-xl mx-6 items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Ask stocks ai anything"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-sm text-white placeholder-[#64748b] focus:border-[#3b82f6]/50 focus:outline-none"
          />
          <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/></svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <Settings className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 pl-2 pr-4 py-1.5">
          <div className="h-8 w-8 rounded-full bg-[#3b82f6] flex items-center justify-center text-xs font-bold text-white">{initials}</div>
          <div>
            <p className="text-sm font-medium text-white">{displayName}</p>
            <p className="text-xs text-[#94a3b8]">{displayEmail || "—"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
