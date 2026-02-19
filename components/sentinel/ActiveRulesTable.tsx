"use client";

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Rule = { id: string; rule: string; status: "active" | "paused" };

const FILTERS = ["All", "Active", "Paused"];

export default function ActiveRulesTable() {
  const user = useUser();
  const [activeFilter, setActiveFilter] = useState("All");
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase
      .channel("realtime:rules")
      .on("postgres_changes", { event: "*", schema: "public", table: "rules" }, () => {
        fetchRules();
      })
      .subscribe();

    async function fetchRules() {
      const { data, error } = await supabase.from("rules").select("id, rule, status").eq("user_id", user.id).order("created_at", { ascending: false });

      if (!error && data?.length) {
        setRules(data as Rule[]);
      } else {
        setRules([]);
      }
      setLoading(false);
    }
    fetchRules();

    return () => channel.unsubscribe();
  }, [user?.id]);

  const filtered = rules.filter((r) => activeFilter === "All" || (activeFilter === "Active" && r.status === "active") || (activeFilter === "Paused" && r.status === "paused"));

  if (!loading && rules.length === 0) {
    return (
      <div className="glass-card h-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="text-base font-semibold text-white">Active Rules</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-[#94a3b8]">No rules. Run the Supabase schema.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-card h-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <h3 className="text-base font-semibold text-white">Active Rules</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-7 py-5">
        <h3 className="text-base font-semibold text-white">Active Rules</h3>
        <div className="flex gap-0.5 rounded-lg border border-white/[0.06] bg-white/[0.02] p-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f ? "text-white" : "text-[#78716c] hover:text-[#a8a29e]"
              }`}
              style={activeFilter === f ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" } : undefined}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((rule) => (
          <div
            key={rule.id}
            className="flex items-center gap-4 border-b border-white/[0.04] px-7 py-4 transition-colors hover:bg-white/[0.02]"
          >
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.1)" : "rgba(168, 162, 158, 0.08)",
              }}
            >
              <Shield className="h-4 w-4" style={{ color: rule.status === "active" ? "#22c55e" : "#78716c" }} />
            </div>
            <p className="flex-1 text-sm text-[#a8a29e]">{rule.rule}</p>
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.1)" : "rgba(168, 162, 158, 0.08)",
                color: rule.status === "active" ? "#22c55e" : "#78716c",
              }}
            >
              {rule.status === "active" ? "Active" : "Paused"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
