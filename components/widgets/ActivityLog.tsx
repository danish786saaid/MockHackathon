"use client";

import { useState, useEffect } from "react";
import { Activity } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type ActivityItem = { id: string; action: string; created_at: string };

function formatTime(iso: string) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diff < 1) return "Just now";
  if (diff < 60) return `${diff} min ago`;
  if (diff < 1440) return `${Math.floor(diff / 60)} hour${diff >= 120 ? "s" : ""} ago`;
  return `${Math.floor(diff / 1440)} day${diff >= 2880 ? "s" : ""} ago`;
}

export default function ActivityLog() {
  const user = useUser();
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel("realtime:activities")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "activities" }, (payload) => {
        if (payload.new) setItems((prev) => [payload.new as ActivityItem, ...prev]);
      })
      .subscribe();

    supabase
      .from("activities")
      .select("id, action, created_at")
      .eq("user_id", user.id)
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
              <p className="text-xs text-[#94a3b8]/70">{formatTime(item.created_at)}</p>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}
