"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Check } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import OnboardingProgress from "@/components/onboarding/OnboardingProgress";
import ProfileStep from "@/components/onboarding/ProfileStep";
import RiskStep from "@/components/onboarding/RiskStep";
import PortfolioStep from "@/components/onboarding/PortfolioStep";
import AlertsStep from "@/components/onboarding/AlertsStep";
import {
  DEFAULT_ONBOARDING_DATA,
  type OnboardingData,
  type RiskLevel,
} from "@/components/onboarding/onboarding-types";

const TOTAL_STEPS = 4;

export default function OnboardingPage() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(DEFAULT_ONBOARDING_DATA);

  if (!user) {
    router.replace("/login");
    return null;
  }

  function handleNext() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleFinish() {
    completeOnboarding();
    router.push("/");
    router.refresh();
  }

  const isLastWizardStep = step === TOTAL_STEPS;
  const showFinish = step === TOTAL_STEPS + 1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex justify-center mb-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-[#a8a29e] hover:text-white transition-colors"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                background: "linear-gradient(135deg, #ea580c, #f59e0b)",
              }}
            >
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Sentinel</span>
          </Link>
        </div>

        <div className="glass-card p-8">
          {showFinish ? (
            <div className="text-center py-4">
              <div
                className="mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-6"
                style={{
                  background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                }}
              >
                <Check className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                You&apos;re all set!
              </h2>
              <p className="mt-2 text-sm text-[#78716c] max-w-sm mx-auto">
                Your preferences are saved. Head to the dashboard to start
                monitoring your portfolio.
              </p>
              <button
                type="button"
                onClick={handleFinish}
                className="mt-8 w-full rounded-xl py-3 text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                }}
              >
                Go to Dashboard
              </button>
            </div>
          ) : (
            <>
              <OnboardingProgress current={step as 1 | 2 | 3 | 4} />

              {step === 1 && (
                <ProfileStep
                  data={data.profile}
                  onChange={(profile) =>
                    setData((d) => ({ ...d, profile }))
                  }
                />
              )}
              {step === 2 && (
                <RiskStep
                  value={data.risk}
                  onChange={(risk: RiskLevel) =>
                    setData((d) => ({ ...d, risk }))
                  }
                />
              )}
              {step === 3 && (
                <PortfolioStep
                  selected={data.portfolio}
                  onChange={(portfolio) =>
                    setData((d) => ({ ...d, portfolio }))
                  }
                  onSkip={() => setData((d) => ({ ...d, portfolio: [] }))}
                />
              )}
              {step === 4 && (
                <AlertsStep
                  data={data.alerts}
                  onChange={(alerts) =>
                    setData((d) => ({ ...d, alerts }))
                  }
                  onSkip={() => setData((d) => ({ ...d, alerts: null }))}
                />
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="rounded-xl border border-white/[0.12] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-[#a8a29e] transition-colors hover:bg-white/[0.06] hover:text-white disabled:opacity-40 disabled:pointer-events-none"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() =>
                    isLastWizardStep ? setStep(TOTAL_STEPS + 1) : handleNext()
                  }
                  className="rounded-xl px-5 py-2.5 text-sm font-medium text-white"
                  style={{
                    background: "linear-gradient(135deg, #ea580c, #f59e0b)",
                  }}
                >
                  {isLastWizardStep ? "Complete" : "Next"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
