"use client";

import { Bell, Activity } from "lucide-react";
import { MOCK_ALERTS, MOCK_ACTIVITIES } from "@/lib/constants";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const severityConfig = {
  safe: { icon: CheckCircle, color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  danger: { icon: XCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
};

export default function RightPanel() {
  return (
    <aside
      className="fixed right-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] w-[320px] flex-col border-l border-white/10 backdrop-blur-xl"
      style={{ background: "rgba(13, 20, 36, 0.95)" }}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto p-6">
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4 text-[#94a3b8]" />
            <h3 className="text-sm font-semibold text-[#94a3b8]">Notifications</h3>
          </div>
          <div className="space-y-3">
            {MOCK_ALERTS.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;
              return (
                <div
                  key={alert.id}
                  className="glass-card flex gap-3 p-3 transition-shadow"
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
                      <p className="mt-0.5 text-xs text-[#94a3b8]">Rule: {alert.matchedRule}</p>
                    )}
                    <p className="mt-0.5 text-[10px] text-[#94a3b8]/80">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#94a3b8]" />
            <h3 className="text-sm font-semibold text-[#94a3b8]">Activities</h3>
          </div>
          <div className="space-y-2">
            {MOCK_ACTIVITIES.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2.5 rounded-xl p-2.5 text-sm transition-colors hover:bg-white/5"
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
      </div>
    </aside>
  );
}
