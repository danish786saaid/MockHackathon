"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";
import { usePreferences } from "@/contexts/PreferencesContext";
import { formatRelativeTime } from "@/lib/format-date";

type ActivityItem = { id: string; action: string; created_at: string };

export default function ActivityLog() {
  const user = useUser();
  const { timezone } = usePreferences();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = user?.id;
    if (!supabase || !userId) return;
    const channel = supabase
      .channel("realtime:activities")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activities" }, (payload) => {
        if (payload.new) setItems((prev) => [payload.new as ActivityItem, ...prev]);
      })
      .subscribe();

    supabase
      .from("activities")
      .select("id, action, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data?.length) setItems(data as ActivityItem[]);
        else setItems([]);
        setLoading(false);
      });

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id]);

  if (loading) {
    return (
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Activity className="h-4 w-4 text-[#94a3b8]" />
          <h3 className="text-sm font-semibold text-[#94a3b8]">Activities</h3>
        </div>
        <div className="flex items-center gap-2 py-4">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
          <span className="text-xs text-[#94a3b8]">Loading...</span>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-[#94a3b8]" />
        <h3 className="text-sm font-semibold text-[#94a3b8]">Activities</h3>
      </div>
      {items.length === 0 ? (
        <p className="py-4 text-xs text-[#94a3b8]">No activities. Run the Supabase schema.</p>
      ) : (
      <div className="space-y-1.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-2.5 rounded-xl p-2 text-sm transition-colors hover:bg-white/5"
          >
            <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ background: "#3b82f6" }} />
            <div>
              <p className="text-[#94a3b8]">{item.action}</p>
              <p className="text-xs text-[#94a3b8]/70">{formatRelativeTime(item.created_at, timezone)}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}
