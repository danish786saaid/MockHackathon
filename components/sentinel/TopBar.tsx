"use client";

import { Search, Bell, Settings } from "lucide-react";

export default function TopBar() {
  return (
    <header
      className="sticky top-0 z-50 flex h-14 items-center justify-between gap-4 border-b border-white/10 px-6 backdrop-blur-xl"
      style={{ background: "rgba(10, 15, 26, 0.95)" }}
    >
      <div className="flex items-center gap-8">
        <span className="text-xl font-semibold text-white">Sentinel AI</span>
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
            placeholder="Ask Sentinel AI anything"
            className="w-full rounded-xl border border-white/10 py-2.5 pl-10 pr-10 text-sm text-white placeholder-[#64748b] focus:border-[#3b82f6]/50 focus:outline-none"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-lg p-2 text-[#94a3b8] hover:bg-white/10 hover:text-white">
          <Settings className="h-5 w-5" />
        </button>
        <div
          className="flex items-center gap-3 rounded-xl border border-white/10 pl-2 pr-4 py-1.5"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #22d3ee)" }}
          >
            NR
          </div>
          <div>
            <p className="text-sm font-medium text-white">Naya Rochel</p>
            <p className="text-xs text-[#94a3b8]">rachel@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
