"use client";

const steps = [
  { label: "Profile", num: 1 },
  { label: "Risk", num: 2 },
  { label: "Portfolio", num: 3 },
  { label: "Alerts", num: 4 },
];

export default function OnboardingProgress({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-between gap-2 mb-8">
      {steps.map((step, i) => {
        const isActive = i + 1 === current;
        const isPast = i + 1 < current;
        return (
          <div key={step.num} className="flex flex-1 items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "text-white"
                    : isPast
                      ? "text-white"
                      : "text-[#78716c] border border-white/[0.2]"
                }`}
                style={
                  isActive || isPast
                    ? { background: "linear-gradient(135deg, #ea580c, #f59e0b)" }
                    : undefined
                }
              >
                {isPast ? "✓" : step.num}
              </div>
              <span
                className={`hidden sm:inline text-sm font-medium ${
                  isActive ? "text-white" : isPast ? "text-[#a8a29e]" : "text-[#78716c]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 rounded ${
                  isPast ? "bg-[#ea580c]/50" : "bg-white/[0.08]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
