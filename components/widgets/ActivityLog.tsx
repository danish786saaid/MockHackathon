"use client";

import { Activity } from "lucide-react";
import { MOCK_ACTIVITIES } from "@/lib/constants";

export default function ActivityLog() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-[#94a3b8]" />
        <h3 className="text-sm font-semibold text-[#94a3b8]">Activities</h3>
      </div>
      <div className="space-y-1.5">
        {MOCK_ACTIVITIES.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 rounded-xl p-2 text-sm transition-colors hover:bg-white/5"
          >
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "#3b82f6" }} />
            <div>
              <p className="text-[#94a3b8]">{item.action}</p>
              <p className="text-xs text-[#94a3b8]/70">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
