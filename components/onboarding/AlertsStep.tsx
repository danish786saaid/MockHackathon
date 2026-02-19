"use client";

import type { AlertFrequency, OnboardingData } from "./onboarding-types";

const alertOptions: { key: "priceAlerts" | "riskThreshold" | "ruleTriggers" | "newsSentiment"; label: string }[] = [
  { key: "priceAlerts", label: "Price alerts" },
  { key: "riskThreshold", label: "Risk threshold" },
  { key: "ruleTriggers", label: "Rule triggers" },
  { key: "newsSentiment", label: "News & sentiment" },
];

const frequencies: { value: AlertFrequency; label: string }[] = [
  { value: "realtime", label: "Real-time" },
  { value: "hourly", label: "Hourly digest" },
  { value: "daily", label: "Daily digest" },
];

type AlertsData = NonNullable<OnboardingData["alerts"]>;

type Props = {
  data: OnboardingData["alerts"];
  onChange: (data: AlertsData) => void;
  onSkip: () => void;
};

const defaultAlerts: AlertsData = {
  priceAlerts: true,
  riskThreshold: true,
  ruleTriggers: true,
  newsSentiment: false,
  frequency: "realtime",
};

export default function AlertsStep({ data, onChange, onSkip }: Props) {
  const current = data ?? defaultAlerts;

  function setPartial(partial: Partial<typeof current>) {
    onChange({ ...current, ...partial });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white">Alert preferences</h2>
        <p className="mt-1 text-sm text-[#78716c]">
          Choose what you want to be notified about and how often.
        </p>
      </div>

      <div className="space-y-3">
        {alertOptions.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3"
          >
            <span className="text-sm text-white">{label}</span>
            <button
              type="button"
              onClick={() =>
                setPartial({
                  [key]: !current[key],
                })
              }
              className={`h-5 w-9 rounded-full transition-colors ${
                current[key] ? "bg-[#ea580c]" : "bg-white/10"
              }`}
            >
              <div
                className={`mt-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                  current[key] ? "translate-x-4 ml-0.5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div>
        <label className="mb-2 block text-xs font-medium text-[#a8a29e]">
          Frequency
        </label>
        <div className="flex gap-2 flex-wrap">
          {frequencies.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setPartial({ frequency: value })}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                current.frequency === value
                  ? "text-white"
                  : "text-[#a8a29e] hover:text-white hover:bg-white/[0.06]"
              }`}
              style={
                current.frequency === value
                  ? { background: "rgba(234, 88, 12, 0.2)", color: "#f97316" }
                  : undefined
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="text-sm text-[#78716c] hover:text-[#a8a29e] transition-colors"
      >
        Skip for now
      </button>
    </div>
  );
}
