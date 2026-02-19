"use client";

import { useState, useEffect } from "react";
import { Bell, Activity } from "lucide-react";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Alert = { id: string; title: string; severity: "safe" | "warning" | "danger"; matched_rule: string | null; created_at: string };
type ActivityItem = { id: string; action: string; created_at: string };

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

export default function RightPanel() {
  const user = useUser();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel("realtime:right-panel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "alerts" }, (payload) => {
        if (payload.new) setAlerts((prev) => [payload.new as Alert, ...prev]);
      })
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activities" }, (payload) => {
        if (payload.new) setActivities((prev) => [payload.new as ActivityItem, ...prev]);
      })
      .subscribe();

    Promise.all([
      supabase.from("alerts").select("id, title, severity, matched_rule, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
      supabase.from("activities").select("id, action, created_at").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
    ]).then(([alertsRes, activitiesRes]) => {
      if (!alertsRes.error && alertsRes.data?.length) {
        setAlerts(alertsRes.data as Alert[]);
      } else {
        setAlerts([]);
      }
      if (!activitiesRes.error && activitiesRes.data?.length) {
        setActivities(activitiesRes.data as ActivityItem[]);
      } else {
        setActivities([]);
      }
      setLoadingAlerts(false);
      setLoadingActivities(false);
    });

    return () => channel.unsubscribe();
  }, [user?.id]);

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
          {loadingAlerts ? (
            <div className="flex items-center gap-2 py-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
              <span className="text-xs text-[#94a3b8]">Loading...</span>
            </div>
          ) : alerts.length === 0 ? (
            <p className="py-4 text-xs text-[#94a3b8]">No alerts yet. Run the Supabase schema to add data.</p>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => {
                const config = severityConfig[alert.severity] ?? severityConfig.safe;
                const Icon = config.icon;
                return (
                  <div key={alert.id} className="glass-card flex gap-3 p-3 transition-shadow">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl" style={{ background: config.bg }}>
                      <Icon className="h-4 w-4" style={{ color: config.color }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{alert.title}</p>
                      {alert.matched_rule && (
                        <p className="mt-0.5 text-xs text-[#94a3b8]">Rule: {alert.matched_rule}</p>
                      )}
                      <p className="mt-0.5 text-[10px] text-[#94a3b8]/80">{formatTime(alert.created_at)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-[#94a3b8]" />
            <h3 className="text-sm font-semibold text-[#94a3b8]">Activities</h3>
          </div>
          {loadingActivities ? (
            <div className="flex items-center gap-2 py-4">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
              <span className="text-xs text-[#94a3b8]">Loading...</span>
            </div>
          ) : activities.length === 0 ? (
            <p className="py-4 text-xs text-[#94a3b8]">No activities yet. Run the Supabase schema to add data.</p>
          ) : (
            <div className="space-y-2">
              {activities.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-2.5 rounded-xl p-2.5 text-sm transition-colors hover:bg-white/5"
                >
                  <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "#3b82f6" }} />
                  <div>
                    <p className="text-[#94a3b8]">{item.action}</p>
                    <p className="text-xs text-[#94a3b8]/70">{formatTime(item.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </aside>
  );
}
