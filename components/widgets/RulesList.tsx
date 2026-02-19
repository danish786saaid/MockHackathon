"use client";

import { useState, useEffect } from "react";
import { Shield } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/contexts/UserContext";

type Rule = { id: string; rule: string; status: "active" | "paused" };

export default function RulesList() {
  const user = useUser();
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    supabase
      .from("rules")
      .select("id, rule, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length) setRules(data as Rule[]);
        else setRules([]);
        setLoading(false);
      });
  }, [user?.id]);

  if (!loading && rules.length === 0) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4">
          <h3 className="text-sm font-semibold text-[#94a3b8]">Active Rules</h3>
        </div>
        <div className="py-8 text-center text-sm text-[#94a3b8]">No rules. Run the Supabase schema.</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-card overflow-hidden">
        <div className="border-b border-white/10 px-6 py-4">
          <h3 className="text-sm font-semibold text-[#94a3b8]">Active Rules</h3>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#3b82f6] border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-white/10 px-6 py-4">
        <h3 className="text-sm font-semibold text-[#94a3b8]">Active Rules</h3>
        <p className="text-xs text-[#94a3b8]/80">Plain English safety rules monitored by AI</p>
      </div>
      <div className="divide-y divide-white/5">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-white/5"
          >
            <div
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: rule.status === "active" ? "rgba(34, 197, 94, 0.2)" : "rgba(148, 163, 184, 0.15)",
              }}
            >
              <Shield
                className="h-4 w-4"
                style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-white">{rule.rule}</p>
              <span
                className="mt-1 inline-block text-xs font-medium"
                style={{ color: rule.status === "active" ? "#22c55e" : "#94a3b8" }}
              >
                {rule.status === "active" ? "Active" : "Paused"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
