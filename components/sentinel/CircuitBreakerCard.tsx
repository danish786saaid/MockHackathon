"use client";

import { useState } from "react";
import { Zap, ArrowRight } from "lucide-react";

export default function CircuitBreakerCard() {
  const [simulated, setSimulated] = useState(false);

  const handleSimulate = () => {
    setSimulated(true);
    setTimeout(() => setSimulated(false), 3000);
  };

  return (
    <div className="glass-card flex items-center justify-between gap-8 p-7">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" style={{ background: "rgba(234, 88, 12, 0.1)" }}>
          <Zap className="h-5 w-5 text-[#ea580c]" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white">Circuit Breaker</h3>
          <p className="mt-0.5 text-sm text-[#78716c]">
            {simulated
              ? "Mock transaction simulated. No real funds moved."
              : "AI detects high-risk events and triggers protective actions matching your rules."}
          </p>
        </div>
      </div>

      <button
        onClick={handleSimulate}
        className="group flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}
      >
        {simulated ? "Simulated ✓" : "Simulate"}
        {!simulated && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </button>
    </div>
  );
}
