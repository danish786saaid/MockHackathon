"use client";

import { Shield, TrendingUp, Zap } from "lucide-react";
import type { RiskLevel } from "./onboarding-types";

const options: {
  id: RiskLevel;
  label: string;
  description: string;
  Icon: typeof Shield;
}[] = [
  {
    id: "conservative",
    label: "Conservative",
    description: "Preserve capital. Prefer stable assets and low volatility.",
    Icon: Shield,
  },
  {
    id: "moderate",
    label: "Moderate",
    description: "Balance growth and risk. Mix of stable and growth assets.",
    Icon: TrendingUp,
  },
  {
    id: "aggressive",
    label: "Aggressive",
    description: "Maximize growth. Higher tolerance for volatility.",
    Icon: Zap,
  },
];

type Props = {
  value: RiskLevel | null;
  onChange: (value: RiskLevel) => void;
};

export default function RiskStep({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Risk tolerance</h2>
        <p className="mt-1 text-sm text-[#78716c]">
          We&apos;ll use this to tailor alerts and suggestions.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {options.map(({ id, label, description, Icon }) => {
          const isSelected = value === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`glass-card p-5 text-left transition-all ${
                isSelected
                  ? "ring-2 ring-[#ea580c]/50 border-[#ea580c]/30"
                  : "hover:border-white/[0.12]"
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl mb-3 ${
                  isSelected ? "text-white" : "text-[#a8a29e]"
                }`}
                style={
                  isSelected
                    ? { background: "linear-gradient(135deg, #ea580c, #f59e0b)" }
                    : { background: "rgba(255,255,255,0.06)" }
                }
              >
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-white">{label}</h3>
              <p className="mt-1 text-xs text-[#78716c]">{description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
