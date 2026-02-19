"use client";

import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { MOCK_ALERTS } from "@/lib/constants";

const severityConfig = {
  safe: { icon: CheckCircle, color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  danger: { icon: XCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
};

export default function NotificationsCard() {
  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
        <h3 className="text-base font-semibold text-white">Notifications</h3>
        <span className="rounded-full bg-[#ea580c]/10 px-2.5 py-1 text-[11px] font-medium text-[#ea580c]">
          {MOCK_ALERTS.length} new
        </span>
      </div>
      <div className="flex-1 overflow-y-auto">
        {MOCK_ALERTS.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className="flex gap-3 border-b border-white/[0.04] px-6 py-3 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
                style={{ background: config.bg }}
              >
                <Icon className="h-4 w-4" style={{ color: config.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{alert.title}</p>
                {alert.matchedRule && (
                  <p className="mt-0.5 text-xs text-[#a8a29e]">Rule: {alert.matchedRule}</p>
                )}
                <p className="mt-0.5 text-[10px] text-[#78716c]">{alert.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
