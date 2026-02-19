"use client";

import { useState } from "react";
import { Zap } from "lucide-react";

export default function CircuitBreakerPanel() {
  const [simulated, setSimulated] = useState(false);

  const handleSimulate = () => {
    setSimulated(true);
    setTimeout(() => setSimulated(false), 3000);
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Zap className="h-5 w-5 text-[#22d3ee]" />
        <h3 className="text-sm font-semibold text-[#94a3b8]">Circuit Breaker</h3>
      </div>
      <p className="mb-4 text-xs text-[#94a3b8]">
        When AI detects a high-risk event matching your rules, a mock transaction can be triggered.
      </p>
      <button
        onClick={handleSimulate}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold text-white transition-colors hover:opacity-90"
        style={{ background: "#3b82f6" }}
      >
        {simulated ? "Transaction Simulated ✓" : "Simulate Circuit Breaker"}
      </button>
      {simulated && (
        <p className="mt-3 text-center text-xs" style={{ color: "#22c55e" }}>
          Mock action completed. No real funds moved.
        </p>
      )}
    </div>
  );
}
