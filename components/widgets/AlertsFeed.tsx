"use client";

import { useState, useEffect } from "react";
import { Bell, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Alert = { id: string; title: string; severity: "safe" | "warning" | "danger"; matched_rule: string | null; created_at: string };

const severityConfig = {
  safe: { icon: CheckCircle, color: "#22c55e", bg: "rgba(34, 197, 94, 0.15)" },
  warning: { icon: AlertTriangle, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" },
  danger: { icon: XCircle, color: "#ef4444", bg: "rgba(239, 68, 68, 0.15)" },
};

function formatTime(iso: string) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hour${diff >= 120 ? "s" : ""} ago`;
  return `${Math.floor(diff / 1440)} day${diff >= 2880 ? "s" : ""} ago`;
}

export default function AlertsFeed() {
  const user = useUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = supabase;
    const userId = user?.id;
    if (!client || !userId) return;
    const channel = client
      .channel("realtime:alerts")
      .on("postgres_changes", { event: "*", schema: "public", table: "alerts" }, (payload) => {
        if (payload.eventType === "INSERT" && payload.new) {
          setAlerts((prev) => [payload.new as Alert, ...prev]);
        }
      })
      .subscribe();

    async function fetchAlerts() {
      if (!client) {
        setLoading(false);
        return;
      }
      const { data, error } = await client
        .from("alerts")
        .select("id, title, severity, matched_rule, created_at")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data?.length) {
        setAlerts(data as Alert[]);
      } else {
        setAlerts([]);
      }
      setLoading(false);
    }
    fetchAlerts();

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  if (loading) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-4 w-4 text-[#94a3b8]" />
          <h3 className="text-sm font-semibold text-[#94a3b8]">Notifications</h3>
        </div>
        <div className="flex items-center gap-2 py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
          <span className="text-xs text-[#94a3b8]">Loading alerts...</span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Bell className="h-4 w-4 text-[#94a3b8]" />
        <h3 className="text-sm font-semibold text-[#94a3b8]">Notifications</h3>
      </div>
      {alerts.length === 0 ? (
        <p className="py-4 text-xs text-[#94a3b8]">No alerts. Run the Supabase schema.</p>
      ) : (
      <div className="space-y-2">
        {alerts.map((alert) => {
          const config = severityConfig[alert.severity] ?? severityConfig.safe;
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
                  {alert.matched_rule && (
                    <p className="mt-1 text-xs text-[#94a3b8]">Rule: {alert.matched_rule}</p>
                  )}
                  <p className="mt-1 text-[10px] text-[#94a3b8]/80">{formatTime(alert.created_at)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </section>
  );
}
