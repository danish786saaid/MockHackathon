"use client";

import { useState } from "react";
import { Zap, ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n/use-translation";

export default function CircuitBreakerCard() {
  const { t } = useTranslation();
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
          <h3 className="text-theme-primary text-base font-semibold">{t("dashboard.circuitBreaker")}</h3>
          <p className="text-theme-muted mt-0.5 text-sm">
            {simulated ? t("dashboard.circuitBreakerSimulated") : t("dashboard.circuitBreakerDesc")}
          </p>
        </div>
      </div>

      <button
        onClick={handleSimulate}
        className="group flex shrink-0 items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
        style={{ background: "linear-gradient(135deg, #ea580c, #f59e0b)" }}
      >
        {simulated ? t("dashboard.simulatedDone") : t("dashboard.simulate")}
        {!simulated && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
      </button>
    </div>
  );
}
