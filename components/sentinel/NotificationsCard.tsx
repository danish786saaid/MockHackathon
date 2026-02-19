"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Alert = { id: string; title: string; severity: "safe" | "warning" | "danger"; matched_rule: string | null; created_at: string };

const severityConfig = {
  safe: { icon: CheckCircle, color: "#22c55e", bg: "rgba(34, 197, 94, 0.1)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.1)" },
  danger: { icon: XCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.1)" },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hour${diff >= 120 ? "s" : ""} ago`;
  return `${Math.floor(diff / 1440)} day${diff >= 2880 ? "s" : ""} ago`;
}

export default function NotificationsCard() {
  const user = useUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("alerts")
      .select("id, title, severity, matched_rule, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data?.length) setAlerts(data as Alert[]);
        else setAlerts([]);
        setLoading(false);
      });
  }, [user?.id]);

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
        <h3 className="text-base font-semibold text-white">Notifications</h3>
        <span className="rounded-full bg-[#ea580c]/10 px-2.5 py-1 text-[11px] font-medium text-[#ea580c]">
          {alerts.length} new
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#ea580c] border-t-transparent" />
          </div>
        ) : alerts.length === 0 ? (
          <p className="px-7 py-8 text-sm text-[#78716c]">No alerts yet.</p>
        ) : alerts.map((alert) => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <div
              key={alert.id}
              className="flex gap-3.5 border-b border-white/[0.04] px-7 py-4 transition-colors hover:bg-white/[0.02]"
            >
              <div
                className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{ background: config.bg }}
              >
                <Icon className="h-4 w-4" style={{ color: config.color }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white leading-snug">{alert.title}</p>
                {alert.matched_rule && (
                  <p className="mt-0.5 text-[11px] text-[#78716c]">Rule: {alert.matched_rule}</p>
                )}
                <p className="mt-1 text-[11px] text-[#78716c]/70">{formatTime(alert.created_at)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
