"use client";

import { Bell, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { MOCK_ALERTS } from "@/lib/constants";

const severityConfig = {
  safe: { icon: CheckCircle, color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  danger: { icon: XCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
};

export default function AlertsFeed() {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Bell className="h-4 w-4 text-[#94a3b8]" />
        <h3 className="text-sm font-semibold text-[#94a3b8]">Notifications</h3>
      </div>
      <div className="space-y-2">
        {MOCK_ALERTS.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className="rounded-2xl border border-white/5 p-3 transition-colors hover:bg-white/[0.07]"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <div className="flex gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: config.bg }}
                >
                  <Icon className="h-4 w-4" style={{ color: config.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{alert.title}</p>
                  {alert.matchedRule && (
                    <p className="mt-1 text-xs text-[#94a3b8]">Rule: {alert.matchedRule}</p>
                  )}
                  <p className="mt-1 text-[10px] text-[#94a3b8]/80">{alert.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
